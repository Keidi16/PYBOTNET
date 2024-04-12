import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export const ADMIN_DATA = {
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  username: process.env.ADMIN_USERNAME,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  roles: <Role[]>['super'],
};
