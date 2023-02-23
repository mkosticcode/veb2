import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ModificationComponent } from './user/modification/modification.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { OrderComponent } from './order/order.component';
import { CurrentOrderComponent } from './order/current/current.component';
import { AvailableOrderComponent } from './order/available/available.component';
import { HistoryOrderComponent } from './order/history/history.component';
import { VerifyComponent } from './user/verify/verify.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
      {  
        id: FacebookLoginProvider.PROVIDER_ID,  
        provider: new FacebookLoginProvider('app -id')  
      },  
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('')  
      }  
    ]  
  );  
  return config;  
}  
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ModificationComponent,
    ProductComponent,
    AddProductComponent,
    OrderComponent,
    CurrentOrderComponent,
    AvailableOrderComponent,
    HistoryOrderComponent,
    VerifyComponent
  ],
  imports: [
  
  BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:environment.allowedDomains
      }
    }),
    FormsModule
  ],
  providers: [
    CookieService,
    UserService, 
    //{
   // provide: HTTP_INTERCEPTORS,
   // useClass: AuthInterceptor,
   // multi: true,
    //},
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
