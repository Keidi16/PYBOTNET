import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateAdminDto {
  @IsNotEmpty({ message: MessagesHelper.NAME_EMPTY })
  name: string;

  @IsNotEmpty({ message: MessagesHelper.ISNOT_EMAIL })
  @IsEmail(undefined, { message: MessagesHelper.EMAIL_EMPY })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.USERNAME_EMPTY })
  username: string;

  @IsNotEmpty({ message: MessagesHelper.PASSWORD_EMPTY })
  @Matches(RegExHelper.PASSWORD, { message: MessagesHelper.PASSWORD_INVALID })
  password: string;

  @IsNotEmpty({ message: MessagesHelper.ROLE_EMPTY })
  roles: Role[];
}
