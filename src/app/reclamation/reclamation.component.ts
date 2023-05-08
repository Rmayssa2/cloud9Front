import { Component } from '@angular/core';
import { Reclamation } from '../model/reclamation';
import { ReclamationService } from '../service/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  constructor(private reclamationService: ReclamationService) { }
  listreclamation= this.reclamationService.listReclamation;
  
  ngOnInit() {
    this.reclamationService.getReclamations().subscribe(data => {
      this.listreclamation = data;
    });
  }

  deleteReclamation(id: any) {
    console.log(id); // Check the value of livraison

    this.reclamationService.deleteReclamationId(id)
        .subscribe(res => {
          
            console.log("deleteddd");
            window.location.reload(); // Reload the page after the delete
        });
}
  addReclamation(){
    var titleElement:any=document.getElementById("recTitle") as HTMLElement;
    var descElement:any=document.getElementById("recDesc") as HTMLElement;
    var dateElement:any=document.getElementById("recDate") as HTMLElement;
    var recDesc=descElement.value;
    var titlerec=titleElement.value;
    var recDate=dateElement.value;
    console.log(recDate);
    
    this.reclamationService.addReclamation(titlerec,recDesc,recDate).subscribe({
      next: data=>window.location.reload(),
      error: err=>console.log(err)
    })
  }
}
