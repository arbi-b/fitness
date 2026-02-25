import crypto from 'node:crypto';
import { ADMIN_COOKIE_NAME } from './auth-constants';

export function getCookieName() {
  return ADMIN_COOKIE_NAME;
}

function base64url(input: Buffer | string) {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64url(b64url: string) {
  const pad = b64url.length % 4 === 0 ? '' : '='.repeat(4 - (b64url.length % 4));
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return Buffer.from(b64, 'base64');
}

function hmac(secret: string, data: string) {
  return crypto.createHmac('sha256', secret).update(data).digest();
}

export function createSessionToken() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('Missing ADMIN_SECRET');

  const payload = { iat: Date.now() };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sigB64 = base64url(hmac(secret, payloadB64));
  return `${payloadB64}.${sigB64}`;
}

export function verifySessionToken(token: string) {
  try {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return false;

    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return false;

    const expected = hmac(secret, payloadB64);
    const got = fromBase64url(sigB64);

    if (expected.length !== got.length) return false;
    if (!crypto.timingSafeEqual(expected, got)) return false;

    const payload = JSON.parse(fromBase64url(payloadB64).toString('utf8')) as { iat?: number };
    if (!payload?.iat) return false;

    const ageMs = Date.now() - payload.iat;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return ageMs >= 0 && ageMs < sevenDays;
  } catch {
    return false;
  }
}

export function isPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error('Missing ADMIN_PASSWORD');

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}