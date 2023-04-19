import { randomBytes, createHash } from 'crypto';

// Function to hash a password with a given salt
export function hashPassword(password: string, salt?: string) {
  salt = salt || randomBytes(16).toString('hex');
  const hash = createHash('sha256');
  hash.update(password + salt);
  return `${salt}$${hash.digest('hex')}`;
}

export function verifyPassword(password: string, hashedPassword: string) {
    const salt = hashedPassword.split('$')[0];
    const hash = createHash('sha256');
    hash.update(password + salt);
    const hashedInputPassword = hash.digest('hex');
    return hashedInputPassword === hashedPassword;
}