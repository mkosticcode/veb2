import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ModificationComponent } from './user/modification/modification.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { OrderComponent } from './order/order.component';
import { AvailableOrderComponent } from './order/available/available.component';
import { HistoryOrderComponent } from './order/history/history.component';
import { CurrentOrderComponent } from './order/current/current.component';
import { VerifyComponent } from './user/verify/verify.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'modification', component: ModificationComponent,canActivate:[AuthGuard] },
      { path: 'verify', component: VerifyComponent,canActivate:[AuthGuard] }

    ]
  },
  {
    path: 'product', component: ProductComponent,
    children: [
      { path: 'add-product', component: AddProductComponent,canActivate:[AuthGuard] },
     
    ]
  },
  {
    path: 'order', component: OrderComponent,
    children: [
      { path: 'available', component: AvailableOrderComponent,canActivate:[AuthGuard] },
      { path: 'history', component: HistoryOrderComponent ,canActivate:[AuthGuard] },
      { path: 'current', component: CurrentOrderComponent,canActivate:[AuthGuard] },
     
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
  //{path:'user-details/:email',component:UserDetailsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
