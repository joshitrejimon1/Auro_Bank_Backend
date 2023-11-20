import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountServiceService } from 'src/app/service/account-service.service';

@Component({
  selector: 'app-admin-account-request',
  templateUrl: './admin-account-request.component.html',
  styleUrls: ['./admin-account-request.component.css']
})
export class AdminAccountRequestComponent {

  accounts: any[] = [];
  approvalaccount: any[]=[];

  constructor(private auth:AccountServiceService)
   {
    this.auth.ShowAccountRequest().subscribe(
      {
      next:(data: any) => {
        this.accounts = data;
      },
      error:(error:HttpErrorResponse) => {
        console.error('Error fetching accounts:', error);
      }
    }
    );
   }

   acceptAccount(account: any) {
    // Update the account's isActive in the frontend
    account.isActive = true;

    // Assuming you have a method in your ApiService to activate the account
    this.auth.AcceptAccountRequest(account.accountNumber).subscribe(
      () => {
        // Handle success if needed
      },
      (error: HttpErrorResponse) => {
        console.error('Error activating account:', error);
        // Handle error, show user-friendly message, etc.
      }
    );
  }

   viewDocument(account:any)
   {

   }
    // Assuming you have a method in your ApiService to fetch data
    searchDocument()
    {
      
    }
  
searchCustomerId:any
}