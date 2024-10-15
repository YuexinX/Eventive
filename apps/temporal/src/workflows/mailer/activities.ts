/* eslint-disable @typescript-eslint/require-await -- activities need to be promise */
import {
  emailTemplate,
  renderReactToMjml,
  type EmailTemplateArgs,
  type EmailTemplateKey,
} from '@repo/mjml';
import * as htmlToText from 'html-to-text';
import nodemailer from 'nodemailer';
import env from 'src/services/env';

import {
  sendEmailActivityOptionsZod,
  sendEmailWorkflowOptionsZod,
  type SendEmailActivityOptions,
  type SendEmailWorkflowOptions,
} from './dto';

const {
  NODE_ENV,
  MAILER_HOST,
  MAILER_PORT,
  MAILER_AUTH_USER,
  MAILER_AUTH_PASS,
} = env;

const transporter = nodemailer.createTransport({
  ...(NODE_ENV === 'development' && { tls: { rejectUnauthorized: false } }),
  host: MAILER_HOST,
  port: MAILER_PORT,
  secure: MAILER_PORT === 465, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: MAILER_AUTH_USER,
    pass: MAILER_AUTH_PASS,
  },
});

export const validateSendEmailWorkflowOptions = async <
  T extends EmailTemplateKey,
>(
  args: string,
) => {
  const opts = sendEmailWorkflowOptionsZod.parse(
    JSON.parse(args),
  ) as SendEmailWorkflowOptions<T>;
  return opts;
};

interface RenderMjmlTemplateToHtmlActivityOptions<T extends EmailTemplateKey> {
  templateKey: T;
  templateArgs: EmailTemplateArgs<T>;
}
export const renderMjmlTemplateToHtmlActivity = async <
  T extends EmailTemplateKey,
>({
  templateKey,
  templateArgs,
}: RenderMjmlTemplateToHtmlActivityOptions<T>) => {
  if (!(templateKey in emailTemplate)) {
    throw new Error(`Template with key ${templateKey} not found`);
  }

  const { template, schema } = emailTemplate[templateKey as EmailTemplateKey];
  const args = schema.parse(templateArgs);

  // @ts-expect-error we already insure the type is correct
  const { html, errors } = renderReactToMjml(template(args));
  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
  return html;
};

export const sendEmailActivity = async (opts: SendEmailActivityOptions) => {
  const info = sendEmailActivityOptionsZod.parse(opts);
  if (!info.text) {
    info.text = htmlToText.convert(info.html);
  }
  await transporter.sendMail(info);
};
