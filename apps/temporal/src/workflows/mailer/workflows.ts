import type { EmailTemplateArgs, EmailTemplateKey } from '@repo/mjml';
import * as workflow from '@temporalio/workflow';

import type * as activities from './activities';

const {
  validateSendEmailWorkflowOptions,
  sendEmailActivity,
  renderMjmlTemplateToHtmlActivity,
} = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export async function SendEmailWorkflow<T extends EmailTemplateKey>(
  args: string,
) {
  const opts = await validateSendEmailWorkflowOptions<T>(args);
  const html = await renderMjmlTemplateToHtmlActivity({
    templateKey: opts.templateKey,
    templateArgs: opts.templateArgs as EmailTemplateArgs<T>,
  });
  await sendEmailActivity({ ...opts, html });
}
