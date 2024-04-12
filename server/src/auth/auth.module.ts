import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/helpers/jwt.helper';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: JWT.SECRET_KEY,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
