import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentServiceService {


  documentUploadUrl="https://localhost:7078/api/Doc"

  constructor(private http:HttpClient) { }


public uploadDocument(data:any)
{
  return this.http.post(this.documentUploadUrl,data)
}


}
