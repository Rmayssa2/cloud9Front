export class ConsultationFile{
    id?:string;
    doctorNotes?:string;
    prescriptionId?:string;
    appointmentId?:string;
    appointmentDate?:Date;

    constructor(id:string,note:string,prescription:string,appointment:string,date:Date){
        this.id=id;
        this.doctorNotes=note;
        this.appointmentId=appointment;
        this.prescriptionId=prescription;
        this.appointmentDate=date;
    }
}