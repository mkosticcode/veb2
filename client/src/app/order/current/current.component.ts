import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ToastrService } from 'ngx-toastr';
import { AddOrder } from 'src/app/shared/models/order-models/add-order.model';
import { CreateOrder } from 'src/app/shared/models/order-models/create-order.model';
import { OrderDisplay } from 'src/app/shared/models/order-models/order-display.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentOrderComponent implements OnInit {
  remainingTime:number=-1;
  orders:CreateOrder[]=[];
  addedOrders:AddOrder[]=[];
  totalPrice:number=0;
  orderForm = new FormGroup({  
    Comment: new FormControl('', Validators.required),
    Adress: new FormControl('', Validators.required),

  });

  constructor(private router: Router, private toastr: ToastrService, private service: OrderService) { }

  ngOnInit() {
    setInterval(()=> { this.remainingTime=this.remainingTime-1},1000 );
    this.service.RemainingTime(Number(localStorage.getItem('idOrder'))).subscribe(
      data =>{
        this.remainingTime=Number(data)
      },
      error=>{
        this.toastr.error("Error");
      }
    );
   if(Number(localStorage.getItem('role'))==1){
   this.addedOrders=JSON.parse(localStorage.getItem('currentOrder'));
   let ao:AddOrder;
   do{
   ao=this.addedOrders.pop();
   //console.log(ao);
   if(ao==undefined){break;}
   let od=this.orders.find(x=>x.id==ao.id);
   if(od!=undefined){
    od.amount+=1;
    this.totalPrice+=od.price;
   }
   else{
    let odNew = new CreateOrder();
    odNew.id=ao.id;odNew.amount=1;odNew.price=ao.price;odNew.name=ao.name;
    this.totalPrice+=ao.price;
    this.orders.push(odNew);
   }
  }while(ao!=undefined) 
  }
  else{
   
  }
 }
  onSubmit() {
   
    this.orders[0].comment= this.orderForm.controls['Comment'].value    
    this.orders[0].adress = this.orderForm.controls['Adress'].value
    this.service.add(this.orders,localStorage.getItem('email')).subscribe(
      data =>{
        localStorage.setItem('idOrder',data.toString());
        this.router.navigateByUrl("/home");
      },
      error=>{
        this.toastr.error("Error");
      }
    );
    
  }
}
