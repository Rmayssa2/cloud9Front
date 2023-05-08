export class Prescription{
    id?:string;
    content?:string;
    date?:Date
    constructor(id:string,content:string,date:Date){
        this.id=id;
        this.content=content;
        this.date=date;
    }
}