// sort-imports-ignore
import env from 'src/services/env';

import { NativeConnection, Worker } from '@temporalio/worker';
import { queues, type Queue } from 'src/shared';
import * as mailerActivities from 'src/workflows/mailer/activities';

const { TEMPORAL_NAMESPACE, TEMPORAL_URL } = env;

async function createAndRunWorker(
  taskQueueName: Queue,
  connection: NativeConnection,
) {
  const worker = await Worker.create({
    connection,
    namespace: TEMPORAL_NAMESPACE,
    taskQueue: taskQueueName,
    workflowsPath: new URL(import.meta.resolve('./workflows/index.js'))
      .pathname,
    activities: {
      ...mailerActivities,
    },
  });

  await worker.run();
}

async function run() {
  const connection = await NativeConnection.connect({
    address: TEMPORAL_URL,
    // TLS and gRPC metadata configuration goes here.
  });

  const workerPromises = queues.map((queue) =>
    createAndRunWorker(queue, connection),
  );
  await Promise.all(workerPromises);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
