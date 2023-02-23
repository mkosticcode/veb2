import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { AddProduct } from 'src/app/shared/models/product-models/add-product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
  });

  constructor(public service: ProductService, private router: Router, private fb:FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
  }
  onSubmit() {
    let regModel = new AddProduct();
    regModel.name = this.addForm.controls['Name'].value
    regModel.description = this.addForm.controls['Description'].value
    regModel.price = this.addForm.controls['Price'].value
   
    this.service.add(regModel).subscribe(
      data =>{
       
      },
      error=>{
        this.toastr.error("Error");
      }
    );
    
  }
}
