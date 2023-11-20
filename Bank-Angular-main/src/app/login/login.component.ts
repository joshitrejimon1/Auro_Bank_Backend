import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DataServiceService } from '../service/data-service.service';
//import {jwt_decod} as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginUserForm=new FormGroup(
  {
    UserName:new FormControl('',[Validators.required]),
    Password :new FormControl('',[Validators.required])
  }
) 



get userValidator()
{
  return this.loginUserForm.get('UserName')
}
get passwordValidator()
{
  return this.loginUserForm.get('Password')
}

token:any='';
headers:any;
user:any;
showErrorMessage:any;
constructor(private auth:UserServiceService,private route:Router,private datas:DataServiceService){}

  submitData(data:any)
  {

    this.auth.login(data).subscribe(
      {
       
        next:(response)=>
      {

       this.headers=response.headers.get('jwt');
       this.headers=JSON.parse(this.headers) 

       this.user=response.body;

       console.log(this.headers);
       localStorage.setItem("token",this.headers)

       //store data service values
       this.datas.userId=this.user.userId
       this.datas.userName=this.user.userName

       console.log("userId",this.datas.userId);
       console.log("userName",this.datas.userName);
       console.log("roleName",this.user.roleName);
       
       
        
     
         if (this.user.roleName==="Admin") {

        
          this.route.navigateByUrl('/admin');
        } else if (this.user.roleName=== 'Customer') {
          
          this.route.navigateByUrl('/customer');
        } 
      },
      error:(errorResponce:HttpErrorResponse)=>
      {
        console.log(errorResponce);
        console.log("error happende");
        this.showErrorMessage=true
        
      }
    }
    )
  }

  RefreshLogin()
  {
    location.reload();
  }


}
