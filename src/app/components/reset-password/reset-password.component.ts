import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userEmail;

  constructor(public dataService:DataService,
              private toast:ToastService,
              ) {
  }

  ngOnInit(): void {
  }

  sendResetPasswordEmail(userEmail):void {
    userEmail = this.userEmail
    this.dataService
      .sendResetPasswordEmail(userEmail)
      .toPromise()
      .then(res => this.toast.success(res['message']))
      .catch((err) => {
        this.toast.error(err.error['message'])
        console.log(err)
      });
  }
}
