import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from 'src/app/service/data-service.service';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';

@Component({
  selector: 'app-customert-transaction',
  templateUrl: './customert-transaction.component.html',
  styleUrls: ['./customert-transaction.component.css']
})
export class CustomertTransactionComponent {


accountNumber:any



constructor(private auth:TransactionServiceService,private datas:DataServiceService)
{
this.accountNumber=datas.accountId
}

  depositeShow=false
  cardDeposiet(){
   this. depositeShow=true
   this.withdrawShow=false
   this.transferShow=false
  }
  withdrawShow=false
  cardWithdraw(){
    this. depositeShow=false
    this.withdrawShow=true
    this.transferShow=false
  }
  transferShow=false
  cardTransfer(){
    this. depositeShow=false
    this.withdrawShow=false
    this.transferShow=true
  }


//deposite form validation
  depositeForm = new FormGroup({
    accountId: new FormControl(''),
    transactionType: new FormControl('Deposit', Validators.required),
    transactionAmount: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('',Validators.required)
  });
  get accountNumberValidator()
  {
    return this.depositeForm.get('accountId')
  }
  
  get transactionTypeValidator()
  {
    return this.depositeForm.get('transactionType')
  }
  get amountValidator()
  {
    return this.depositeForm.get('transactionAmount')
  }
  
  get descriptionValidator()
  {
    return this.depositeForm.get('description')
  }

// Function to submit the form

onSubmitDeposite(Formdata:any)
{
 this.auth.DepositeAmount(Formdata).subscribe(
  {
    next:(data)=>
    {
      console.log(data);
      alert("Transaction success")
      location.reload();
      
    },
    error:(err:HttpErrorResponse)=>
    {
      console.log(err);
      console.log("error here");
      
      
    }
  }
 )
}
//deposite end


//

withdrawForm = new FormGroup({
  accountId: new FormControl(''),
  transactionType: new FormControl('withdraw', Validators.required),
  transactionAmount: new FormControl('', [Validators.required, Validators.min(0)]),
  description: new FormControl('',Validators.required)
});

get waccountNumberValidator()
{
  return this.withdrawForm.get('accountId')
}

get wtransactionTypeValidator()
{
  return this.withdrawForm.get('transactionType')
}
get wamountValidator()
{
  return this.withdrawForm.get('transactionAmount')
}

get wdescriptionValidator()
{
  return this.withdrawForm.get('description')
}

onSubmitWithdraw(Formdata:any)
{
this.auth.withdrawAmount(Formdata).subscribe(
  {
    next:(data)=>
    {
      console.log(data);
      alert("Transaction success")
      location.reload();
      
    },
    error:(err:HttpErrorResponse)=>
    {
      console.log(err);
      console.log("error here");
    }
  }
)
}

//withdraw end



//transfer Amount
transferForm = new FormGroup({
  accountNumber: new FormControl(''),
  targetAccountNumber: new FormControl('', Validators.required),
  amount: new FormControl('', [Validators.required, Validators.min(0)]),
  description: new FormControl('',Validators.required)
});

get tAccountNumberValidator()
{
  return this.transferForm.get('accountNumber')
}

get targetAccountNumberValidator()
{
  return this.transferForm.get('targetAccountNumber')
}
get tAmountValidator()
{
  return this.transferForm.get('amount')
}

get tDescriptionValidator()
{
  return this.transferForm.get('description')
}
showvalidAccount=false
onSubmitTransfer(FormData:any)
{
this.auth.transferAmount(FormData).subscribe(
  {
    next:(data)=>
    {
      console.log(data);
      alert("Transaction success")
      location.reload();
      
    },
    error:(err:HttpErrorResponse)=>
    {
      console.log(err);
      console.log("error here");
      this.showvalidAccount=true
      
      
    }
  }
)
}

refreshFun()
{
  location.reload()
}


}
