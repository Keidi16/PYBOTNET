import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './app/user/user.module';
import { CompanyModule } from './app/company/company.module';
import { LogsModule } from './app/logs/logs.module';
import { LogsMiddleware } from './middleware/logs.middleware';
import { PrismaService } from './libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ScheduleModule } from './app/schedule/schedule.module';
import { PentestModule } from './app/pentest/pentest.module';

@Module({
  imports: [AuthModule, UserModule, CompanyModule, LogsModule, ScheduleModule, PentestModule],
  controllers: [],
  providers: [PrismaService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
