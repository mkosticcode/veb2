import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Registration } from 'src/app/shared/models/user-models/registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false; 
  file: File = null; 
  imageSrc;
  imageAlt='iPhone';
  registrationForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    Password2: new FormControl('', [Validators.required, Validators.minLength(4)]),
    BirthDay: new FormControl('', Validators.required),
    Adress: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    Image: new FormControl('', Validators.required),
    ImageSrc: new FormControl('', Validators.required),

  });

  
  constructor(public service: UserService, private router: Router, private fb:FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
   // this.registrationForm.controls['ImageSrc'].('C:\Users\korisnik\Downloads\FXCP3I0X0AAmSm-.jfif');
    let regModel = new Registration();
    regModel.name = this.registrationForm.controls['Name'].value
    regModel.email = this.registrationForm.controls['Email'].value
    regModel.lastName = this.registrationForm.controls['LastName'].value
    regModel.username = this.registrationForm.controls['UserName'].value
    regModel.password = this.registrationForm.controls['Password'].value
    regModel.birthDay = this.registrationForm.controls['BirthDay'].value
    regModel.adress = this.registrationForm.controls['Adress'].value
    if(this.registrationForm.controls['Password'].value!=this.registrationForm.controls['Password2'].value){ this.toastr.error("Error.");return;}
    let num:number=-1;
    if(this.registrationForm.controls['Role'].value==1){num=1;}else if(this.registrationForm.controls['Role'].value==2){num=2;}
    regModel.type = num;
    this.service.register(regModel).subscribe(
      data =>{
        this.router.navigateByUrl("/user/login");
      },
      error=>{
        this.toastr.error("Error.");
      }
    );
    
  }  

}
