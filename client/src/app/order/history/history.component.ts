import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../shared/order.service';
import { OrderDisplay } from './../../shared/models/order-models/order-display.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryOrderComponent implements OnInit {
  orders : OrderDisplay[] = [];

  constructor(private router: Router, private toastr: ToastrService, private service: OrderService) { }

  ngOnInit() {
    if(Number(localStorage.getItem('role'))==3){
      this.service.getOrders().subscribe( 
        (data:OrderDisplay[]) =>{
           this.orders = data;
           console.log(data);
        },
        error =>{
         this.toastr.error("Error");
        }
       )
    }
    else{
    this.service.get(localStorage.getItem('email')).subscribe( 
     (data:OrderDisplay[]) =>{
        this.orders = data;
        console.log(data);
     },
     error =>{
      this.toastr.error("Error");
     }
    )
  }
  }
}
