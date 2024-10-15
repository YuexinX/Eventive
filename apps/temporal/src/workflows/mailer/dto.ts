import {
  emailTemplate,
  type EmailTemplateArgs,
  type EmailTemplateKey,
} from '@repo/mjml';
import { z } from 'zod';

export const attachmentZod = z.object({
  filename: z.string(),
  path: z.string(),
});

export type Attachment = z.infer<typeof attachmentZod>;

const shared = {
  /** The e-mail address of the sender. */
  from: z.string().email(),
  /** An e-mail address that will appear on the Sender: field */
  sender: z.string().min(1),
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
  to: z.array(z.string().email()),
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
  cc: z.array(z.string().email()).optional(),
  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
  bcc: z.array(z.string().email()).optional(),
  /** Comma separated list or an array of e-mail addresses that will appear on the Reply-To: field */
  replyTo: z.array(z.string().email()).optional(),
  /** The message-id this message is replying */
  inReplyTo: z.string().min(1).optional(),
  /** Message-id list (an array or space separated string) */
  references: z.array(z.string().min(1)).optional(),
  /** The subject of the e-mail */
  subject: z.string().min(1),
  /** The plaintext version of the message */
  text: z.string().min(1).optional(),
  /** An array of attachment objects */
  attachments: z.array(attachmentZod).optional(),
};

export const sendEmailActivityOptionsZod = z.object({
  ...shared,
  /** The HTML version of the message */
  html: z.string().min(1),
});
export type SendEmailActivityOptions = z.infer<
  typeof sendEmailActivityOptionsZod
>;

export const sendEmailWorkflowOptionsZod = z.object({
  ...shared,
  templateKey: z.custom<EmailTemplateKey>((value) => {
    if (typeof value === 'string' && value in emailTemplate) {
      return value;
    }
    return false;
  }, 'Invalid template key'),
  templateArgs: z.any(),
});
export type SendEmailWorkflowOptions<T extends EmailTemplateKey> = z.infer<
  typeof sendEmailWorkflowOptionsZod
> & { templateKey: T; templateArgs: EmailTemplateArgs<T> };
