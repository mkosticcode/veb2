import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
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
    this.router.navigate(['/order/current']);
  }
  onAvailableOrders() {
    this.router.navigate(['/order/available']);
  }
}
