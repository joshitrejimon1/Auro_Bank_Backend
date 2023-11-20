import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  accountFilterTransactionUrl="https://localhost:7078/api/Account/TransactionFilter";

  accountRequestAdminUrl="https://localhost:7078/api/Account/customerAccountRequest";

  getAccountRequestUrl= "https://localhost:7078/api/Account/accounRequest";

  getAccountIdByCustomerIdUrl="https://localhost:7078/api/Account/customerIdAccountIdget"

 
  setAccountInterestAdminUrl="https://localhost:7078/api/Account/AccountIntrestUpdate"

  activateAccountByIdUrl="https://localhost:7078/api/Account/activeId"

  acceptAccountRequestUrl="https://localhost:7078/api/Account"
  constructor(private http:HttpClient) { }

public AccountFilter(id:any)
{
  return this.http.get(this.accountFilterTransactionUrl+"/"+id);
}

public RequestAccount(data:any)
{
  return this.http.post(this.accountRequestAdminUrl,data)
}
public ShowAccountRequest()
{
  return this.http.get(this.getAccountRequestUrl)
}

public setAccountInterest(data:any)
{
  return this.http.post(this.setAccountInterestAdminUrl,data)
}

public AccountIdGetByCustomerId(id:any)
{
  return this.http.get(this.getAccountIdByCustomerIdUrl+"/"+id)
}

public ActivateAccountById(id:any)
{
  return this.http.get(this.activateAccountByIdUrl+"/"+id)
}
public AcceptAccountRequest(accountNumber: number) {
  return this.http.put(`${this.acceptAccountRequestUrl}/${accountNumber}/activate`, null);
}

}

