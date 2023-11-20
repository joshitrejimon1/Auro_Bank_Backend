import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  adminQueryShowUrl="https://localhost:7078/api/Query/adminShowQuery"

  adminReplyQuryUrl="https://localhost:7078/api/Query/adminResponceQuery"

  getByCustomerIdUrl="https://localhost:7078/api/Query/customerId"

  constructor(private http:HttpClient) { }

getRequestQuery()
{
 return this.http.get(this.adminQueryShowUrl);
}

putReplyQuery(data:any)
{
  return this.http.put(this.adminReplyQuryUrl,data);
}
public getCustomerQuery(id:any)
{
  return this.http.get(this.getByCustomerIdUrl+"/"+id);
}


}
