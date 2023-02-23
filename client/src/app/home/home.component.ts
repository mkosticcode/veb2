import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDisplay } from './../shared/models/product-models/product-display.model';
import { ToastrService } from 'ngx-toastr';
import { AddOrder } from './../shared/models/order-models/add-order.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  products : ProductDisplay[] = [];
  orders:AddOrder[]=[];
  constructor(private router: Router, private toastr: ToastrService, private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts().subscribe( 
     (data:ProductDisplay[]) =>{
        this.products = data;
     },
     error =>{
      this.toastr.error("Error");
     }

    )

  }

  onClickDetails(id:number,name:string,price:number){
    let role:number=Number(localStorage.getItem('role'));
    if(role!=1){
      this.toastr.error("Cant order");
      return ;
    }
    let ao = new AddOrder();
    ao.id=id;ao.name=name;ao.price=price;
    this.orders.push(ao);
    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  onModify() {
    this.router.navigate(['/user/modification']);
  }
  onVerify() {
    this.router.navigate(['/user/verify']);
  }
  onAddProduct() {
    this.router.navigate(['/product/add-product']);
  }
  onHistoryOrders() {
    this.router.navigate(['/order/history']);
  }
  onCurrentOrders() {
    localStorage.setItem('currentOrder',JSON.stringify(this.orders));
    this.router.navigate(['/order/current']);
  }
  onAvailableOrders() {
    this.router.navigate(['/order/available']);
  }
}
