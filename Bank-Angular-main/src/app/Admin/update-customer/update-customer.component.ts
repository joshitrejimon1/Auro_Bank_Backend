import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
fetchSingleData: any={};

  constructor(private auth:CustomerServiceService)
  {
    auth.SHowAllCustomer().subscribe(
    {
     next:(data)=>
     {
      this.dataStore=data
     } ,
     error:(er:HttpErrorResponse)=>
     {
      console.log(er);
      
     }
    })

  }
  
  dataStore:any

 
 store:any

  selectedData(eventIdPass:any)
  {
    this.auth.getCustomerById(eventIdPass.target.value).subscribe(
      {
        next:(data)=>
        {
          console.log("sucess");
          console.log(data);
          
          this.fetchSingleData=data
        },
        error:(err:HttpErrorResponse)=>
        {
          console.log("error here");
          console.log(err);
          
        }
      }
    )
  }






  customerRegisterForm=new FormGroup(
    {
      customerId:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
     
    },
  

  )
  
  get firstNameValidator()
  {
    return this.customerRegisterForm.get('firstName')
  }
  get lastNameValidator()
  {
    return this.customerRegisterForm.get('lastName')
  }

  get emailValidator()
  {
    return this.customerRegisterForm.get('email')
  }
 
  get userValidator()
  {
    return this.customerRegisterForm.get('customerId')
  }


  submitData(data:any)
  {
    this.auth.UpdateCustomer(data).subscribe(
      {
        next:(data)=>
      {
         alert("successfully updated")
         console.log(data);
         
        },
        error:(err:HttpErrorResponse)=>
      {
        console.log(err);
  
      }
      }
    )
  }

}
