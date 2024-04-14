import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from "crypto-js";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const secretKey = "1234";
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const [encodedPayload, signature] = authHeader.split('.');
    //  const calculatedSignature = crypto.HmacSHA256(encodedPayload, secretKey).toString();

    // if (signature !== calculatedSignature) {
    //   throw new UnauthorizedException('Firma inválida');
    // }

    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);


    if (!this.allowedRoles.includes(payload.rol)) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return true;
  }
}