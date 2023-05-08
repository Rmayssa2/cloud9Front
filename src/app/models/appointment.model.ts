export class Appointment{
    idAppointment:string
    type:string
    dateStart:Date;
    patient:string;
    patientId:string;
    consultationFileId:string;
    constructor(idAppointment:string,type:string,date:Date,patient:string,patientId:string,consultationFileId:string){
        this.idAppointment = idAppointment;
        this.type = type;
        this.dateStart = date;
        this.patient = patient;
        this.patientId = patientId;
        this.consultationFileId = consultationFileId
    }
}