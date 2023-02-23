import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderDisplay } from './models/order-models/order-display.model';
import { CreateOrder } from './models/order-models/create-order.model';
import { VerifyExecute } from './models/user-models/verify-execute.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient) { }

  
  getOrders() : Observable<OrderDisplay[]> {
    return this.http.get<OrderDisplay[]>(environment.serverURL + '/api/orders/all');
  }
  getAvailable() : Observable<OrderDisplay[]> {
    return this.http.get<OrderDisplay[]>(environment.serverURL + '/api/orders/available');
  }
  get(email:string) :Observable<Object> {
    return this.http.get<Object>(environment.serverURL + `/api/orders/${email}`);
  }
  add(order:CreateOrder[],email:string) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + `/api/orders/${email}`, order);
  }
  deliver(data:VerifyExecute) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + '/api/orders/deliver',data);
  }
  RemainingTime(id:number) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + '/api/orders/RemainingTime',id);
  }
}