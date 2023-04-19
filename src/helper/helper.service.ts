import { Injectable } from "@nestjs/common";
import { randomBytes, createHash } from 'crypto';
import { sign, verify, SignOptions as JWTSignOptions } from 'jsonwebtoken';
import { configService } from "src/config/config.service";
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

    signJWT(payload: any, options?: JWTSignOptions) {
        const token = sign(payload, configService.env.jwt_secret, options);
        return token;
    }

    verifyJWT = (token: string):{ id: number, email: string, role?: string } | false => {
        try{
            return verify(token, configService.env.jwt_secret) as any;
        }catch(error){
            return false;
        }
    }
}