import { User } from "../home/user";
import { Type } from "./type";

export class  Appointment{
    idAppointment! : number ;
    type!: Type;
  dateStart!: Date;
    dateEnd!: Date;
    patient!: User;
    doctor!: User;

}