import { ValidRoles } from '@prisma/client';

export type User = {
  id: string;
  username: string;
  apartment?: string;
  email: string;
  roles: ValidRoles[];
};
