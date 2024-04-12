import { IsNotEmpty } from 'class-validator';

export class CreateSchedule {
  @IsNotEmpty()
  target: string;

  @IsNotEmpty()
  data: string;

  @IsNotEmpty()
  hour: string;
}
