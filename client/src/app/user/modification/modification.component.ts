import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Registration } from 'src/app/shared/models/user-models/registration.model';
import { Router } from '@angular/router';
import { Login } from '../../shared/models/user-models/login.model';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
  type;
  registrationForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    BirthDay: new FormControl('', Validators.required),
    Adress: new FormControl('', Validators.required),

  });

  constructor(public service: UserService, private router: Router, private fb:FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null)
      this.router.navigateByUrl('/home');

      this.service.getUserByEmail(localStorage.getItem('email')).subscribe(
        (data:Registration ) =>{
          console.log(data);
          this.registrationForm.patchValue({
            Name:data.name, 
            UserName:data.username ,
            Email:data.email ,
            LastName:data.lastName ,
            BirthDay:data.birthDay ,
            Adress:data.adress 
          }); if(data.type==1){this.type="User";}else if(data.type==2){this.type="Delivery"}else if(data.type==3){this.type="Admin"}
        },
        error=>{
          alert("Error");
        }
      )
  }
  onSubmit() {
    let regModel = new Registration();
    regModel.name = this.registrationForm.controls['Name'].value
    regModel.email = this.registrationForm.controls['Email'].value
    regModel.lastName = this.registrationForm.controls['LastName'].value
    regModel.username = this.registrationForm.controls['UserName'].value
    regModel.password = this.registrationForm.controls['Password'].value
    let num:number=-1;
    if(this.registrationForm.controls['Role'].value==1){num=1;}else if(this.registrationForm.controls['Role'].value==2){num=2;}else if(this.registrationForm.controls['Role'].value==3){num=3;}
    regModel.type = num;
    console.log(regModel.type);
    regModel.birthDay = this.registrationForm.controls['BirthDay'].value
    regModel.adress = this.registrationForm.controls['Adress'].value

    this.service.update(regModel,localStorage.getItem('email')).subscribe(
      data =>{
        localStorage.setItem('email',regModel.email);
        this.router.navigateByUrl("/user/login");
      },
      error=>{
        this.toastr.error("Error.");
      }
    );
    
  }

}
