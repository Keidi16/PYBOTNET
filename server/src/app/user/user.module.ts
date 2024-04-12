import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UserModule {}
