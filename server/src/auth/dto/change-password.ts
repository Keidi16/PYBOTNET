import { IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Senha actual é um campo obrigatório' })
  @Matches(RegExHelper.PASSWORD, { message: MessagesHelper.PASSWORD_INVALID })
  currentPassword: string;

  @IsNotEmpty({ message: 'Senha actual é um campo obrigatório' })
  @Matches(RegExHelper.PASSWORD, { message: MessagesHelper.PASSWORD_INVALID })
  newPassword: string;
}
