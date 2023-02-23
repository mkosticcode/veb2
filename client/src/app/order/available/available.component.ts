import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDisplay } from 'src/app/shared/models/order-models/order-display.model';
import { VerifyExecute } from 'src/app/shared/models/user-models/verify-execute.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableOrderComponent implements OnInit {
  orders : OrderDisplay[] = [];
  constructor(private router: Router, private toastr: ToastrService, private service: OrderService) { }

  ngOnInit() {
    this.service.getAvailable().subscribe( 
      (data:OrderDisplay[]) =>{
         this.orders = data;
         console.log(data);
      },
      error =>{
       this.toastr.error("Error");
      }
     )
  }
  onDeliver(id:number) {
    let ve=new VerifyExecute();
    ve.decision=id;
    ve.email=localStorage.getItem('email');
    this.service.deliver(ve).subscribe( 
      () =>{
        localStorage.setItem('idOrder',id.toString());
       // this.router.navigate([this.router.url])
       this.router.navigate(['/order/current']);
      },
      error =>{
       this.toastr.error("Error");
      }
     )
  }
}
