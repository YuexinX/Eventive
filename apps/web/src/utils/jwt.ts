import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  uuid: string;
}

export const isJwtExpired = (token: string) => {
  const payload = decodeJwt(token);
  if (!payload) return true;
  return payload.exp < Date.now() / 1000;
};

export const decodeJwt = (token: string) => {
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload;
  } catch {
    return null;
  }
};
