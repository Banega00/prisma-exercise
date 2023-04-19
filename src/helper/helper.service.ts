import { Injectable } from "@nestjs/common";
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class HelperService {

    hashPassword(password: string, salt?: string) {
        salt = salt || randomBytes(16).toString('hex');
        const hash = createHash('sha256');
        hash.update(password + salt);
        return `${salt}$${hash.digest('hex')}`;
    }

    verifyPassword(password: string, hashedPassword: string) {
        const [salt, passwordHashPart] = hashedPassword.split('$');
        const hash = createHash('sha256');
        hash.update(password + salt);
        const hashedInputPassword = hash.digest('hex');
        return hashedInputPassword === passwordHashPart;
    }
}