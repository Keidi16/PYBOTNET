import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JWT } from 'src/helpers/jwt.helper';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();

    const permission = await this.userCanDoAction(
      headers?.authorization,
      requiredRoles,
    );

    return permission;
  }

  async userCanDoAction(
    authorization: string,
    requiredRoles: Role[],
  ): Promise<boolean> {
    if (authorization === undefined) return false;

    const token = authorization.split(' ')[1];

    let id: string;

    try {
      const { sub } = this.jwtService.verify(token, {
        secret: JWT.SECRET_KEY,
      });

      id = sub;
    } catch (error) {
      throw new UnauthorizedException('Token expirado!');
    }

    const { roles } = await this.prisma.user.findUnique({
      where: { id },
    });

    const userHasPermission = requiredRoles.some((role) =>
      roles.includes(role),
    );

    if (!userHasPermission) {
      throw new ForbiddenException(
        'Você não possui permissão para efectuar essa acção.',
      );
    }

    return userHasPermission;
  }
}
