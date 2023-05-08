import { Role } from "./role.model";

export class User
{
  idUser?: number;
  username?: string;
  email?: string;
  password?: string;
  imageProfile?: string;
  phonenumber?: string;
  isverified?: number;
  speciality?: string;
  gender?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  age?: string;
  education?: string;
  certificate?: string;
  firstName?: string;
  lastName?: string;
  hourForWorkingStart?: string;
  hourForWorkingEnd?: string;
  city?: string;
  postCode?: string;
  role ?: Role[];
}
