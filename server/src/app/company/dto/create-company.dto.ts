import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateCompanyDto {
  @IsNotEmpty({ message: MessagesHelper.NAME_EMPTY })
  name: string;

  @IsNotEmpty({ message: MessagesHelper.EMAIL_EMPY })
  @IsEmail(undefined, { message: MessagesHelper.ISNOT_EMAIL })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.WEBSITE_EMPTY })
  @Matches(RegExHelper.WEBSITE, { message: MessagesHelper.WEBSITE_ISNOT })
  website: string;

  @IsNotEmpty({ message: MessagesHelper.DESC_EMPTY })
  description: string;
}
