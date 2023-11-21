import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DocumentServiceService } from "src/app/service/document-service.service";

@Component({
  selector: "app-customer-document",
  templateUrl: "./customer-document.component.html",
  styleUrls: ["./customer-document.component.css"],
})
export class CustomerDocumentComponent {
  customerDocumentForm = new FormGroup({
    DocumentType: new FormControl("", Validators.required),
    DocumentFile: new FormControl(null, Validators.required),
    CustomerId: new FormControl(0, Validators.required),
  });

  get TypeValidator() {
    return this.customerDocumentForm.get("DocumentType");
  }

  get FileValidator() {
    return this.customerDocumentForm.get("DocumentFile");
  }

  get customerValidator() {
    return this.customerDocumentForm.get("CustomerId");
  }

  constructor(private auth: DocumentServiceService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.customerDocumentForm.patchValue({ DocumentFile: file });
  }

  submitData() {
    const formData = new FormData();
    formData.append(
      "CustomerId",
      this.customerDocumentForm.get("CustomerId")?.value?.toString() ?? ""
    );
    formData.append(
      "DocumentType",
      this.customerDocumentForm.get("DocumentType")?.value?.toString() ?? ""
    );
    const documentFile = this.customerDocumentForm.get("DocumentFile")?.value as File | null | undefined;
  
    if (documentFile instanceof File) {
      formData.append("DocumentFile", documentFile);
    }
  
    this.auth.uploadDocument(formData).subscribe({
      next: (res) => {
        console.log(res);
        // Display a popup alert after successful document upload
        window.alert("Document uploaded successfully!");
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }
  
}
