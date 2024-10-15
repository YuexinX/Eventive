import crypto from 'node:crypto';

export function generateToken(len = 64): string {
  return crypto.randomBytes(len).toString('hex');
}
