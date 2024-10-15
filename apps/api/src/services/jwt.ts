import jwt from 'jsonwebtoken';
import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import env from 'src/services/env';
import { v4 as uuidv4 } from 'uuid';

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  REDIS_URL,
} = env;

let client: RedisClientType;
async function init(): Promise<void> {
  try {
    client = createClient({ url: REDIS_URL });
    client.on('error', (err) => {
      console.error('JWT Redis Client Error', err);
    });
    await client.connect();
  } catch (err) {
    console.error('Fail to init the jwt Redis connection:', err);
    throw err;
  }
}

interface Payload {
  role: 'user' | 'admin';
  uuid: string;
}

function generateAccessToken(payload: Payload): string {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  return token;
}

function verifyAccessToken(token: string): Payload | null {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as Payload;
    return payload;
  } catch (err) {
    return null;
  }
}

async function verifyRefreshToken(token: string): Promise<Payload | null> {
  try {
    const jwtid = await client.get(token);

    if (!jwtid) {
      console.error('Refresh token not found in Redis');
      return null;
    }

    let payload: Payload | null = null;
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as Payload;
    } catch (err) {
      console.error('Invalid refresh token');
    }

    if (token) await destroy(token);

    return payload;
  } catch (err) {
    console.error('Error verifying refresh token:', err);
    throw err;
  }
}

async function generateRefreshToken(payload: Payload): Promise<string> {
  const jwtid = uuidv4();
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    jwtid,
  });
  try {
    await client.set(token, jwtid, { EX: REFRESH_TOKEN_EXPIRY });
  } catch (err) {
    console.error('Error saving refresh token in Redis:', err);
    throw err;
  }

  return token;
}

async function destroy(token: string): Promise<void> {
  try {
    await client.del(token);
  } catch (err) {
    console.error('Error deleting refresh token in Redis:', err);
    throw err;
  }
}

export default {
  init,
  destroy,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
