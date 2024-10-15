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
  emailConfirmationLink: z.string().url(),
});
export type UserEmailConfirmationProps = z.infer<typeof schema>;

const UserEmailConfirmation = ({
  emailConfirmationLink,
}: UserEmailConfirmationProps) => {
  return (
    <MainLayout>
      <MjmlSection background-color='white' padding='30px 40px'>
        <MjmlColumn width='100%'>
          <MjmlText fontWeight='bold'>Confirm your email</MjmlText>
          <MjmlSpacer />
          <MjmlText>
            Congratulations! You're almost there. Please confirm your email to
            proceed to the next step!
          </MjmlText>
          <MjmlSpacer />
          <CTAButton link={emailConfirmationLink} label='Confirm Email' />
        </MjmlColumn>
      </MjmlSection>
    </MainLayout>
  );
};

export default {
  schema,
  template: UserEmailConfirmation,
};
