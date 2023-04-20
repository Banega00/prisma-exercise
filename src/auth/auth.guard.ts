import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import CustomError from "src/helper/custom-error";
import { HelperService } from "src/helper/helper.service";
import { ErrorStatusCode } from "src/helper/status-codes";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly helperService: HelperService, private readonly reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        //validate JWT token
        const token = request.cookies.token;
        // const token = request.headers.authorization?.split('Bearer ')[1];

        if (!token) throw new CustomError({ status: 401, code: ErrorStatusCode.UNAUTHORIZED });

        
        const jwtPayload = this.helperService.verifyJWT(token)
        
        if (!jwtPayload) throw new CustomError({ status: 401, code: ErrorStatusCode.UNAUTHORIZED });

        //Role checking
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        //route requires certain roles
        if(roles && roles.length > 0){
            if(!jwtPayload.role || !roles.includes(jwtPayload.role)) throw new CustomError({ status: 403, code: ErrorStatusCode.FORBIDDEN } )
        }

        response.locals.user = jwtPayload;

        return true;
    }
}