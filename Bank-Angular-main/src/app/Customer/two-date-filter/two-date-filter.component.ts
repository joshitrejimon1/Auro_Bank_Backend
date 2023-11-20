import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-two-date-filter',
  templateUrl: './two-date-filter.component.html',
  styleUrls: ['./two-date-filter.component.css']
})
export class TwoDateFilterComponent {

  dateFilterForm = new FormGroup({
    date: new FormControl('',[Validators.required]),
    endDate: new FormControl('',[Validators.required]),
    accountNumber:new FormControl('')
  });


  get startDateValidator()
  {
    return this.dateFilterForm.get('date')
  }
  
  get endDateValidator()
  {
    return this.dateFilterForm.get('endDate')
  }


  dateNotFound=false;
  transactions: any;
  accountId=this.datas.accountId;
  constructor(private auth:CustomerServiceService,private datas:DataServiceService){}



  onSubmit(data:any)
  {
    this.auth.twoDateFilter(data).subscribe(
      {
        next:(datas)=>
        {
          console.log(datas);
          this.transactions =datas;
        },
        error:(err:HttpErrorResponse)=> 
        {
          console.log(err);
          console.log("no date found");
         this.dateNotFound=true
          
          
        }
      }
    )
  }


  refreshFun()
  {
    location.reload()
  }

}
