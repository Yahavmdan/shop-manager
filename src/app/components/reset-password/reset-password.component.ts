import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "angular-toastify";
import {AuthService} from "../../services/auth.service";
import {TimeInterval} from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  userEmail: string;
  isDisabled:boolean = false;
  seconds: number = 60;
  interval: number;

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
      .then(res => {
        this.toast.success(res['message']);
        this.isDisabled = true;
        this.interval = setInterval(() => {
          this.seconds = this.seconds - 1;
        }, 1000)
        setTimeout(() => {
          this.isDisabled = false;
        }, 60000)
      })
      .catch((err) => {
          this.isDisabled = false;
          this.toast.error(err.error['message'])
        }
      );
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
