import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user";
import { Regexp } from "../../models/regex";
import { ToastService } from "angular-toastify";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  isPasswordVisible: boolean;

  user = new User()
  token: string;

  constructor(public authService:AuthService,
              private route: ActivatedRoute,
              private toast: ToastService,
              private router: Router
) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['token']) {
      this.token = this.route.snapshot.queryParams['token']
      sessionStorage.setItem('token' , this.token);
      this.authService.getTokenType(this.token)
    }
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token')
      this.authService.getTokenType(this.token)
    }
    this.authService.getTokenType(this.token)
  }

  setPasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  resetPassword(data) {
    if (!Regexp.password.test(this.user.password)) {
      this.toast.error('Password has to be at least 8 characters long and has to contain at' +
        ' least 1 uppercase letter, lowercase letter, a number and a spacial sign.');
      return;
    }
    if (this.user.password !== this.user.password_confirmation) {
      this.toast.error('Passwords must be identical');
      return;
    }
    this.authService.resetPassword({newPassword: data , token: this.token})
      .toPromise()
      .then(()=> {
        this.toast.success('Your password has been changed successfully, you will be transferred to the log-in page shortly');
        setTimeout(() => {
          this.router.navigate(['/login']).then()
        },3000);
      });
  }

}
