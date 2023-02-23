import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductDisplay } from './models/product-models/product-display.model';
import { AddProduct } from './models/product-models/add-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }

  
  getProducts() : Observable<ProductDisplay[]> {
    return this.http.get<ProductDisplay[]>(environment.serverURL + '/api/products/all');
  }
  add(product:AddProduct) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + '/api/products', product);
  }
  
}
