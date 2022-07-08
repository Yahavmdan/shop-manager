import { Component, OnInit } from '@angular/core';
import { FilesService } from "../../services/files.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  uploadForm: UntypedFormGroup;
  userName: string
  userEmail: string
  files: any;
  submitted: boolean;
  img: string;
  constructor(private fileService: FilesService,
              private fb: UntypedFormBuilder,
              private toast:ToastService) {
  }

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('email')
    this.userName = sessionStorage.getItem('name')

    this.uploadForm = this.fb.group({
      'img': [null, [Validators.required]],
    });
  }

  fileName(event) {
    this.files = event.target.files[0];
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      this.submitted = false;
    }
    this.submitted = true;
    const formData = new FormData();
    formData.append("image", this.files, this.files.name)
    this.fileService.storePic(formData).toPromise()
      .then( (res) => {
        console.log(res['pic'])
        this.img = res['pic']
      }).catch(err => this.toast.error(err['message']) )
  }

}
