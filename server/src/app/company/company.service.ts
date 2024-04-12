import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto, user: any) {
    try {
      const { companyId } = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: { companyId: true },
      });

      if (companyId)
        throw new ForbiddenException(
          'Não é permitido possuir mais de duas empresas.',
        );

      await this.prisma.company.create({
        data: {
          name: createCompanyDto.name,
          email: createCompanyDto.email,
          website: createCompanyDto.website,
          description: createCompanyDto.description,
          emplooyes: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return;
    } catch (error) {}
  }

  async getMyCompany(userId: string) {
    try {
      const { companyId } = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!companyId) throw new NotFoundException('');

      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
        select: {
          id: true,
          name: true,
          website: true,
          email: true,
          description: true,
          deleted: true,
        },
      });

      if (!company) throw new NotFoundException('');

      return company;
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    await this.prisma.user.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        username: createAdminDto.username,
        password: bcrypt.hashSync(createAdminDto.password, 10),
        roles: createAdminDto.roles,
      },
    });

    return;
  }

  async findAll() {
    return await this.prisma.company.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
