import { router } from 'src/trpc';
import { baseProcedure } from 'src/trpc/procedure';
import { handleServiceCall } from 'src/utils/service';

import { emailConfirmZod } from './dto/email-confirm.dto';
import { loginUsersZod } from './dto/login-user.dto';
import { newPasswordZod } from './dto/new-password.dto';
import { readUserZod } from './dto/read-user.dto';
import { refreshUserTokenZod } from './dto/refresh-user-token';
import { registerUserZod } from './dto/register-user.dto';
import { resetPasswordZod } from './dto/reset-password.dto';
import { updateUserZod } from './dto/update-user.dto';
import { usersService } from './users.service';

export const usersRouter = router({
  me: baseProcedure.meta({ authRequired: true }).query(async (opts) => {
    return handleServiceCall(
      usersService.readUser({ uuid: opts.ctx.user!.uuid }),
    );
  }),
  register: baseProcedure.input(registerUserZod).mutation(async (opts) => {
    return handleServiceCall(usersService.registerUser(opts.input));
  }),

  login: baseProcedure.input(loginUsersZod).mutation(async (opts) => {
    return handleServiceCall(usersService.loginUser(opts.input));
  }),

  reset: baseProcedure.input(resetPasswordZod).mutation(async (opts) => {
    return handleServiceCall(usersService.resetPassword(opts.input));
  }),

  read: baseProcedure
    .meta({ authRequired: true })
    .input(readUserZod)
    .query(async (opts) => {
      return handleServiceCall(usersService.readUser(opts.input));
    }),

  token: baseProcedure.input(refreshUserTokenZod).mutation(async (opts) => {
    return handleServiceCall(usersService.refreshUserToken(opts.input));
  }),

  update: baseProcedure
    .meta({ authRequired: true })
    .input(updateUserZod)
    .mutation(async (opts) => {
      return handleServiceCall(
        usersService.updateUser(opts.ctx.user!.uuid, opts.input),
      );
    }),

  newPassword: baseProcedure.input(newPasswordZod).mutation(async (opts) => {
    return handleServiceCall(usersService.SetNewPassword(opts.input));
  }),

  confirm: baseProcedure.input(emailConfirmZod).mutation(async (opts) => {
    return handleServiceCall(usersService.confirmUserEmail(opts.input));
  }),
});
