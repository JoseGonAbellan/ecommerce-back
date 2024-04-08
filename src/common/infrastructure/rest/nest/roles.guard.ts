import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const decodedToken = jwt.decode(authHeader);

    if (!this.allowedRoles.includes(decodedToken.roles)) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return true;
  }
}