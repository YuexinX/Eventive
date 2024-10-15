import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { ServiceError } from 'src/interfaces/error';
import {
  usersTable,
  type DbUser,
  type NewDbUser,
  type UpdateDbUser,
} from 'src/schemas/users.schema';
import { database } from 'src/services/database';
import env from 'src/services/env';
import jwt from 'src/services/jwt';
import temporal from 'src/services/temporal';
import { identities } from 'src/utils/mailer';

import type { EmailConfirmDto } from './dto/email-confirm.dto';
import type { LoginUserDto } from './dto/login-user.dto';
import type { newPasswordDto } from './dto/new-password.dto';
import type { ReadUserDto } from './dto/read-user.dto';
import type { RefreshUserTokenDto } from './dto/refresh-user-token';
import type { RegisterUserDto } from './dto/register-user.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

const { WEB_URL } = env;
class UsersService {
  async loginUser(opts: LoginUserDto) {
    const { email, password } = opts;
    const foundUser = await database.query.users.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!foundUser) {
      throw new ServiceError('User not found', 'NOT_FOUND');
    }

    const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordValid) {
      throw new ServiceError('Invalid password', 'BAD_REQUEST');
    }

    const { accessToken, refreshToken } =
      await this.generateUserJwtTokens(foundUser);

    return { accessToken, refreshToken, user: foundUser };
  }

  async readUser(opts: ReadUserDto) {
    const uuid = opts.uuid;
    const foundUser = await database.query.users.findFirst({
      where: eq(usersTable.uuid, uuid),
    });
    return { user: foundUser };
  }

  async registerUser(opts: RegisterUserDto) {
    const { name, email, password } = opts;

    return database.transaction(async (tx) => {
      const duplicateUser = await tx.query.users.findFirst({
        where: eq(usersTable.email, email),
      });
      if (duplicateUser) {
        throw new ServiceError('User already exists', 'BAD_REQUEST');
      }

      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const emailConfirmToken = nanoid(64);
      const newDbUser: NewDbUser = {
        email,
        password: hashedPassword,
        emailConfirmToken,
        name,
      };
      const [createdUser] = await tx
        .insert(usersTable)
        .values(newDbUser)
        .returning();

      await temporal.startSendEmailWorkflow({
        from: identities.welcome.address,
        sender: identities.welcome.name,
        subject: 'Email Confirmation',
        to: [email],
        templateKey: 'UserEmailConfirmation',
        templateArgs: {
          emailConfirmationLink: `${WEB_URL}/confirm-email?token=${emailConfirmToken}`,
        },
      });

      const { accessToken, refreshToken } =
        await this.generateUserJwtTokens(createdUser);
      return {
        accessToken,
        refreshToken,
        createdUser,
      };
    });
  }

  async resetPassword(opts: ResetPasswordDto) {
    const { email } = opts;
    const foundUser = await database.query.users.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!foundUser) {
      throw new ServiceError('User not found', 'NOT_FOUND');
    }

    const resetPasswordToken = nanoid(64);

    await database
      .update(usersTable)
      .set({
        passwordResetToken: resetPasswordToken,
        passwordResetTokenSentAt: new Date(),
      })
      .where(eq(usersTable.email, email));

    await temporal.startSendEmailWorkflow({
      from: identities.doNotReply.address,
      sender: identities.doNotReply.name,
      subject: 'Reset Your Password',
      to: [email],
      templateKey: 'UserResetPassword',
      templateArgs: {
        resetPasswordLink: `${WEB_URL}/new-password?token=${resetPasswordToken}`,
      },
    });

    return;
  }

  async updateUser(uuid: string, opts: UpdateUserDto) {
    const { name, password } = opts;

    const { user: foundUser } = await this.readUser({ uuid });
    if (!foundUser) {
      throw new ServiceError('User not found', 'NOT_FOUND');
    }

    const updateDbUser: UpdateDbUser = {
      name,
    };

    if (password) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      updateDbUser.password = hashedPassword;
    }

    const [updatedUser] = await database
      .update(usersTable)
      .set(updateDbUser)
      .where(eq(usersTable.uuid, uuid))
      .returning();

    return updatedUser;
  }

  async SetNewPassword(opts: newPasswordDto) {
    const { token, password } = opts;

    const foundUser = await database.query.users.findFirst({
      where: eq(usersTable.passwordResetToken, token),
    });

    if (!foundUser) {
      throw new ServiceError('Invalid Reset Link', 'BAD_REQUEST');
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newPassword = hashedPassword;

    await database
      .update(usersTable)
      .set({ password: newPassword })
      .where(eq(usersTable.passwordResetToken, token));
  }

  async refreshUserToken(opts: RefreshUserTokenDto) {
    const { refreshToken } = opts;
    const payload = await jwt.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new ServiceError('Invalid refresh token', 'BAD_REQUEST');
    }

    const uuid = payload.uuid;
    const { user: foundUser } = await this.readUser({ uuid });

    if (!foundUser) {
      throw new ServiceError('User not found', 'NOT_FOUND');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateUserJwtTokens(foundUser);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async generateUserJwtTokens(user: DbUser) {
    const accessToken = jwt.generateAccessToken({
      uuid: user.uuid,
      role: 'user',
    });
    const refreshToken = await jwt.generateRefreshToken({
      uuid: user.uuid,
      role: 'user',
    });

    return { accessToken, refreshToken };
  }

  async confirmUserEmail(opts: EmailConfirmDto) {
    const { token } = opts;
    const foundUser = await database.query.users.findFirst({
      where: eq(usersTable.emailConfirmToken, token),
    });
    if (!foundUser) {
      throw new ServiceError('Invalid token', 'BAD_REQUEST');
    }
    await database
      .update(usersTable)
      .set({ isEmailConfirmed: true, emailConfirmedAt: new Date() })
      .where(eq(usersTable.emailConfirmToken, token));

    return;
  }
}

export const usersService = new UsersService();
