export const queues = ['email-queue'] as const;
export type Queue = (typeof queues)[number];
