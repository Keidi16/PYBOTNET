import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JWT } from 'src/helpers/jwt.helper';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl } = req;

    const { user, session } = await this.getUser(req);

    if (!user || !session) return next();

    const log: CreateLogDto = {
      userName: user.name,
      userEmail: user.email,
      deviceIP: session.deviceIP,
      companyId: user.companyId,
      method: res.req.method,
      endpoint: originalUrl,
      statusCode: res.statusCode,
    };

    if (!isEndpoint(originalUrl)) {
      this.registerLog(log, session.id, user.id);
    }

    if (next) {
      next();
    }
  }

  async registerLog(log: CreateLogDto, sessionId: string, userId: string) {
    await this.prisma.request.create({
      data: {
        userName: log.userName,
        userEmail: log.userEmail,
        deviceIP: log.deviceIP,
        companyId: log.companyId,
        method: log.method,
        endpoint: log.endpoint,
        statusCode: log.statusCode,
        session: {
          connect: {
            id: sessionId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getUser(req: Request) {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];

    try {
      const { sub } = this.jwtService.decode(token);

      await this.jwtService.verify(token, {
        secret: JWT.SECRET_KEY,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: sub },
      });

      const session = await this.prisma.session.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });

      return { user, session };
    } catch (error) {
      return { user: undefined, session: undefined };
    }
  }
}

const ENDPOINTS = [
  '/api/v1/auth/login',
  '/api/v1/auth/user-logged',
  '/api/v1/logs/requests',
  '/api/v1/logs/requests/**',
];

type CreateLogDto = {
  userName: string;
  userEmail: string;
  deviceIP: string;
  companyId: string;
  method: string;
  endpoint: string;
  statusCode: number;
};

function isEndpoint(originalUrl) {
  return ENDPOINTS.some((endpoint) => {
    const regex = new RegExp(`^${endpoint.replace('**', '.*')}`);
    return regex.test(originalUrl);
  });
}
