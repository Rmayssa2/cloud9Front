import { ERole } from './erole';

export class User {
  id!: number;
  username!: string;
  verificationToken!: string;
  picture!: string;
  phonenumber!: string;
  userCode!: string;
  isverified!: number;
  email!: string;
  password!: string;
  role!: ERole;
  constructor() {}
}
