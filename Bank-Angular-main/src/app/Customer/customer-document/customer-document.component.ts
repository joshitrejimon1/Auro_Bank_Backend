import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentServiceService } from 'src/app/service/document-service.service';



@Component({
  selector: 'app-customer-document',
  templateUrl: './customer-document.component.html',
  styleUrls: ['./customer-document.component.css']
})


export class CustomerDocumentComponent {
    customerDocumentForm = new FormGroup({
      DocumentType: new FormControl('', Validators.required),
      DocumentFile: new FormControl(null, Validators.required), // Note: Use null for file input
      CustomerId: new FormControl(0, Validators.required),
    });
  

  get TypeValidator() {
    return this.customerDocumentForm.get('DocumentType');
  }

  get FileValidator() {
    return this.customerDocumentForm.get('DocumentFile');
  }

  get customerValidator() {
    return this.customerDocumentForm.get('CustomerId');
  }

  constructor(private auth:DocumentServiceService){}


  submitData() {
    if (this.customerDocumentForm?.valid) {
      const formData = new FormData();
  
      formData.append('DocumentType', String(this.customerDocumentForm.get('DocumentType')!.value));
  
      const documentFileInput = this.customerDocumentForm.get('DocumentFile') as any;
  
      if (documentFileInput && documentFileInput.files && documentFileInput.files.length > 0) {
        formData.append('DocumentFile', documentFileInput.files[0]);
      }
  
      formData.append('CustomerId', String(this.customerDocumentForm.get('CustomerId')!.value));
  
      this.auth.uploadDocument(formData).subscribe(
        (data) => {
          console.log(data);
          // Handle success response
        },
        (error) => {
          console.error(error);
          // Handle error response, including validation errors
        }
      );
    }
  }
  
  













}
