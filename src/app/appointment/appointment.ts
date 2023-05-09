import { User } from "../models/user.model";
import { Type } from "./type";

export class  Appointment{
  idAppointment! : number ;
  type!: Type;
  dateStart!: Date;
  dateEnd!: Date;
  patient!: any;
  doctor!: any;

}