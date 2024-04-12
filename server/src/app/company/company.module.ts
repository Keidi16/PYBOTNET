import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CompanyModule {}
