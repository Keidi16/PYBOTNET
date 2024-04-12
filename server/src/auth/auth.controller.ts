import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password';
import { ApiKeyGuard } from './guards/api.key.guard';

@UseGuards(ApiKeyGuard)
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any, @Ip() ip: any) {
    return await this.authService.login(req.user, ip);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-logged')
  async userLogged(@Req() req: any) {
    return await this.authService.userLogged(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  async changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(
      req.user.id,
      changePasswordDto,
    );
  }
}
