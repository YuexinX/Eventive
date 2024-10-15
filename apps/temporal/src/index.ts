import * as mailer from 'src/workflows/mailer/workflows';

const workflows = {
  ...mailer,
};

export type Workflow = keyof typeof workflows;
