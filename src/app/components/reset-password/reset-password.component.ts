import {Component, OnInit} from '@angular/core';
import {ToastService} from "angular-toastify";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userEmail;
  isDisabled:boolean = false;

  constructor(public authService: AuthService,
              private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
  }

  sendResetPasswordEmail(userEmail): void {
    this.isDisabled = true;
    userEmail = this.userEmail
    this.authService
      .sendResetPasswordEmail(userEmail)
      .toPromise()
      .then(res => this.toast.success(res['message']))
      .catch((err) => {
        this.isDisabled = false;
        this.toast.error(err.error['message'])
        }
      );
  }
}
