import { type EmailTemplateKey } from '@repo/mjml';
import { type Workflow } from '@temporal';
import { type Queue } from '@temporal/shared';
import { type SendEmailWorkflowOptions } from '@temporal/workflows/dto';
import { Client, Connection } from '@temporalio/client';
import { nanoid } from 'nanoid';
import env from 'src/services/env';

const { TEMPORAL_URL, TEMPORAL_NAMESPACE } = env;

let client: Client | undefined;

async function init() {
  if (client) {
    return client;
  }

  try {
    const connection = await Connection.connect({ address: TEMPORAL_URL });
    client = new Client({
      connection,
      namespace: TEMPORAL_NAMESPACE,
    });
  } catch (err) {
    console.error('Fail to init the Temporal connection:', err);
    throw err;
  }
}

function getClient() {
  if (!client) {
    throw new Error('Temporal client is not initialized');
  }

  return client;
}

function startSendEmailWorkflow<T extends EmailTemplateKey>(
  opts: SendEmailWorkflowOptions<T>,
) {
  const temporalClient = getClient();
  const args = JSON.stringify(opts);

  const queue: Queue = 'email-queue';
  const workflow: Workflow = 'SendEmailWorkflow';
  const handle = temporalClient.workflow.start(workflow, {
    taskQueue: queue as string,
    args: [args],
    workflowId: `send-email-workflow-${nanoid()}`,
  });

  return handle;
}

export default {
  init,
  getClient,
  startSendEmailWorkflow,
};
