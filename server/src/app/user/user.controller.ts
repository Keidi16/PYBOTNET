import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileValidationPipe } from 'src/pipes/file-validation.pipe';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.SUPER, Role.ADMIN)
  @Post()
  create(@Req() req: any, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, req.user.id);
  }

  @Roles(Role.SUPER, Role.ADMIN, Role.ANALISTA)
  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.userService.findAll(
      req.user.id,
      page as number,
      perPage as number,
    );
  }

  // @Roles(Role.SUPER, Role.ADMIN, Role.ADMIN)
  // @Get()
  // searchOne(@Req() req: any) {}

  @Roles(Role.SUPER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(new FileValidationPipe(['image/jpeg', 'image/png']))
    avatar: Express.Multer.File,
  ) {
    return await this.userService.update(
      id,
      req.user.id,
      updateUserDto,
      avatar,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
