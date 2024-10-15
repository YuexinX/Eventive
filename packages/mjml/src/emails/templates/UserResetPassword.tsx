import {
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react';
import { CTAButton } from 'src/emails/components/CTAButton';
import { MainLayout } from 'src/emails/layouts/MainLayout';
import { z } from 'zod';

const schema = z.object({
  resetPasswordLink: z.string().url(),
});
export type UserResetPasswordProps = z.infer<typeof schema>;

const UserResetPassword = ({ resetPasswordLink }: UserResetPasswordProps) => {
  return (
    <MainLayout>
      <MjmlSection background-color='white' padding='30px 40px'>
        <MjmlColumn width='100%'>
          <MjmlText fontWeight='bold'>Confirm your email</MjmlText>
          <MjmlSpacer />
          <MjmlText>
            Congratulations! You're almost there. Please reset your password to
            proceed to the next step!
          </MjmlText>
          <MjmlSpacer />
          <CTAButton link={resetPasswordLink} label='Reset Password' />
        </MjmlColumn>
      </MjmlSection>
    </MainLayout>
  );
};

export default {
  schema,
  template: UserResetPassword,
};
