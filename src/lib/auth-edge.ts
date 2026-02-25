import { ADMIN_COOKIE_NAME } from './auth-constants';

export function getCookieName() {
  return ADMIN_COOKIE_NAME;
}

function base64urlToBytes(b64url: string): Uint8Array {
  const pad = b64url.length % 4 === 0 ? '' : '='.repeat(4 - (b64url.length % 4));
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToBase64url(bytes: ArrayBuffer): string {
  const u8 = new Uint8Array(bytes);
  let bin = '';
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  const b64 = btoa(bin);
  return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  try {
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return false;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payloadB64));
    const expectedB64 = bytesToBase64url(sig);

    if (expectedB64 !== sigB64) return false;

    const payloadBytes = base64urlToBytes(payloadB64);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { iat?: number };
    if (!payload?.iat) return false;

    const ageMs = Date.now() - payload.iat;
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return ageMs >= 0 && ageMs < sevenDays;
  } catch {
    return false;
  }
}