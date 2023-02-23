import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserDisplay } from './models/user-models/user-display.model';
import { Login } from './models/user-models/login.model';
import { Token } from './models/user-models/token.model';
import { Registration } from './models/user-models/registration.model';
import { Verification } from './models/user-models/verification.model';
import { VerifyExecute } from './models/user-models/verify-execute.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  login(login:Login) :Observable<Token> {
    return this.http.post<Token>(environment.serverURL + '/api/users/login', login);
  }

  register(registration:Registration) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + '/api/users', registration);
  }
  update(registration:Registration, email:string) :Observable<Object> {
    return this.http.put<Object>(environment.serverURL + `/api/users/${email}`, registration);
  }

  getUsers() : Observable<UserDisplay[]> {
    return this.http.get<UserDisplay[]>(environment.serverURL + '/api/users/all');
  }
  getDelivery() : Observable<Verification[]> {
    return this.http.get<Verification[]>(environment.serverURL + '/api/users/getDelivery');
  }

  getUserByEmail(email:string) : Observable<Registration> {
    return this.http.get<Registration>(environment.serverURL + `/api/users/${email}`);
  }
  verify(ver:VerifyExecute) :Observable<Object> {
    return this.http.post<Object>(environment.serverURL + "/api/users/verify/", ver);
  }
}
