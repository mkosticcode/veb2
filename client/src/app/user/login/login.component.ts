import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../../shared/models/user-models/login.model';
import { Token } from 'src/app/shared/models/user-models/token.model';
import { Registration } from 'src/app/shared/models/user-models/registration.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
  });
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit() {
    let login:Login = new Login();
    login.email = this.loginForm.controls['email'].value;
    login.password = this.loginForm.controls['password'].value;
    this.service.login(login).subscribe(
      (data : Token) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', login.email);
        this.service.getUserByEmail(login.email).subscribe(  (data : Registration) => {
        localStorage.setItem('role', data.type.toString());
        this.router.navigateByUrl('/home');
      });
      },
      error => {
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      }
    );
  }
}
