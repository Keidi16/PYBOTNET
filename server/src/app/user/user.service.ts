import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { supabase } from 'src/libs/supabase';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, id: string) {
    try {
      const { companyId } = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!companyId) {
        // throw new Exception
      }

      await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          username: createUserDto.username,
          password: bcrypt.hashSync(createUserDto.password, 10),
          roles: createUserDto.roles,
          company: {
            connect: {
              id: companyId,
            },
          },
        },
      });

      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(userId: string, page: number, perPage: number) {
    try {
      const skip = page > 0 ? perPage * (page - 1) : 0;

      const companyId = await this.getCompanyId(userId);

      if (!companyId) {
        throw new NotFoundException('Não foi possível encontrar a sua empresa');
      }

      const [total, data] = await Promise.all([
        this.prisma.user.count({
          where: { companyId },
        }),
        this.prisma.user.findMany({
          where: { companyId },
          orderBy: { createdAt: 'desc' },
          take: perPage,
          skip,
        }),
      ]);

      const lastPage = Math.ceil(total / perPage);

      return {
        data,
        meta: {
          total,
          lastPage,
          currentPage: page,
          perPage,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { company: true },
      });

      return user;
    } catch (error) {}
  }

  async update(
    id: string,
    userId: string,
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
  ) {
    try {
      if (id !== userId)
        throw new ForbiddenException(
          'Não é permitido alterar as informações de outro usuário',
        );

      let { avatar: photo } = await this.prisma.user.findUnique({
        where: { id },
        select: { avatar: true },
      });

      if (avatar) {
        const photoUUID = randomBytes(10).toString('hex');

        try {
          await supabase.storage
            .from('uploads')
            .upload(`rex/${photoUUID}`, avatar.buffer);
          photo = photoUUID;
        } catch (error) {
          throw new InternalServerErrorException(
            'Erro ao realizar upload da foto',
          );
        }
      }

      await this.prisma.user.update({
        where: { id },
        data: {
          avatar: photo,
          ...updateUserDto,
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return;
    } catch (error) {}
  }

  async getCompanyId(userId: string) {
    try {
      const { companyId } = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      return companyId;
    } catch (error) {}
  }
}
