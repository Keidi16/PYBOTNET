import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, IP: string) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const userInfo = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (userInfo.companyId) {
      await this.prisma.session.create({
        data: {
          userId: user.id,
          username: userInfo.username,
          deviceIP: IP,
          companyId: userInfo.companyId,
        },
      });
    }

    return {
      user: {
        id: userInfo.id,
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        roles: userInfo.roles,
        avatar: userInfo.avatar,
        emailVerified: !!userInfo.emailVerifiedAt,
        hasCompany: !!userInfo.companyId,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async userLogged(id: string) {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: { id },
      });

      return {
        id: userInfo.id,
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        roles: userInfo.roles,
        avatar: userInfo.avatar,
        emailVerified: !!userInfo.emailVerifiedAt,
        hasCompany: !!userInfo.companyId,
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }

  async changePassword(id: string, changePassword: ChangePasswordDto) {
    try {
      const { password } = await this.prisma.user.findUnique({
        where: { id },
      });

      const passwordIsMatch = compareSync(
        changePassword.currentPassword,
        password,
      );

      if (!passwordIsMatch)
        throw new UnauthorizedException('A senha actual está incorrecta!');

      console.log(changePassword);

      await this.prisma.user.update({
        where: { id },
        data: {
          password: hashSync(changePassword.newPassword, 10),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
