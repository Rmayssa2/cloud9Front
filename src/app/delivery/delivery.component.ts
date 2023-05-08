import { Component } from '@angular/core';
import { DeliveryService } from '../service/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent {
  constructor(private deliveryService: DeliveryService) { }
  listdelivery= this.deliveryService.listDelivey;
  
  ngOnInit() {
    this.deliveryService.getDeliverys().subscribe(data => {
      this.listdelivery = data;
    });
  }

  deleteDelivery(id: any) {
    console.log(id); // Check the value of livraison

    this.deliveryService.deleteDeliveryById(id)
        .subscribe(res => {
          
            console.log("deleteddd");
            window.location.reload(); // Reload the page after the delete
        });
}
}
