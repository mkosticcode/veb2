import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Verification } from 'src/app/shared/models/user-models/verification.model';
import { VerifyExecute } from 'src/app/shared/models/user-models/verify-execute.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  users : Verification[] = [];
  constructor(private router: Router, private toastr: ToastrService, private service: UserService) { }
  ngOnInit() {
    this.service.getDelivery().subscribe(
      (data:Verification[]) =>{
         this.users = data;
      },
      error =>{
       this.toastr.error("Error");
      }
 
     )
  }
  onClickVerify(email:string){
    let verifyExecute=new VerifyExecute();
    verifyExecute.decision=1;
    verifyExecute.email=email;
    this.service.verify(verifyExecute).subscribe();
  }
  onClickReject(email:string){
    let verifyExecute=new VerifyExecute();
    verifyExecute.decision=0;
    verifyExecute.email=email;
    this.service.verify(verifyExecute).subscribe();
  }
}
