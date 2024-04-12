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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('api/v1/company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Roles(Role.SUPER, Role.ADMIN)
  @Post()
  create(@Req() req: any, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto, req.user);
  }

  @Roles(Role.SUPER, Role.ADMIN, Role.ANALISTA)
  @Get('my')
  getMyCompany(@Req() req: any) {
    return this.companyService.getMyCompany(req.user.id);
  }

  @Roles(Role.SUPER)
  @Post('admin')
  createAdmin(@Req() req: any, @Body() createAdminDto: CreateAdminDto) {
    return this.companyService.createAdmin(createAdminDto);
  }

  @Roles(Role.SUPER)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Roles(Role.SUPER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
