import {
  Injectable,
  PayloadTooLargeException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { getMineType } from 'src/helpers/get-mainType.helper';

@Injectable()
export class FileValidationPipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  constructor(private readonly contentTypes: ContentType[]) {}

  transform(file: Express.Multer.File | undefined): Express.Multer.File | null {
    if (file === undefined) return null;

    const VALID_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

    const fileExtension = file.originalname.split('.');
    const lastFileExtension = fileExtension[fileExtension.length - 1];

    if (!VALID_EXTENSIONS.includes(lastFileExtension))
      throw new UnprocessableEntityException('');

    const unitArray = new Uint8Array(file.buffer);

    const bytes: string[] = [];

    unitArray.forEach((uint) => bytes.push(uint.toString(16)));

    const hex = bytes.join('').toUpperCase();
    const mineType = getMineType(hex.substring(0, 8));

    if (!this.contentTypes.includes(mineType))
      throw new UnprocessableEntityException('');

    if (file.size > MAX_SIZE) throw new PayloadTooLargeException('');

    console.log(file.size);
    return file;
  }
}

type ContentType = 'image/jpeg' | 'image/png';

const MAX_SIZE = 1024 * 1024 * 3;
