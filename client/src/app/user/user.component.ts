import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

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
