import mjmlTohtml from 'mjml';
import ReactDOMServer from 'react-dom/server';

import UserEmailConfirmation, {
  type UserEmailConfirmationProps,
} from './emails/templates/UserEmailConfirmation';
import UserResetPassword, {
  type UserResetPasswordProps,
} from './emails/templates/UserResetPassword';

type MJMLParseResults = ReturnType<typeof mjmlTohtml>;
export function renderReactToMjml(email: React.ReactElement): MJMLParseResults {
  return mjmlTohtml(ReactDOMServer.renderToStaticMarkup(email));
}

interface TemplatePropsMap {
  UserEmailConfirmation: UserEmailConfirmationProps;
  UserResetPassword: UserResetPasswordProps;
}

export type EmailTemplateArgs<T extends EmailTemplateKey> =
  T extends keyof TemplatePropsMap ? TemplatePropsMap[T] : never;

export const emailTemplate = {
  UserEmailConfirmation,
  UserResetPassword,
};
export type EmailTemplateKey = keyof typeof emailTemplate;
