import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user';
import {ToastService} from 'angular-toastify';
import {Regexp} from "../../models/regex";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user = new User();
  token = null;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }


  checkRegex(): boolean {
    if (!Regexp.password.test(this.user.password)) {
      this.toast.error('Password has to be at least 8 characters long and has to contain at' +
        ' least 1 uppercase letter, lowercase letter, a number and a spacial sign.');
      return false;
    }
    if (!Regexp.name.test(this.user.name)) {
      this.toast.error('Name has to be provided in English characters only');
      return false;
    }
    if (!Regexp.email.test(this.user.email)) {
      this.toast.error('You have entered an invalid email address');
      return false;
    }
    return true;
  }

  createUser(): void {
    if (!this.user.is_admin) {
      this.user.is_admin = false;
    }
    if (!this.checkRegex()) {
      return;
    }
    this.authService
      .createUser(this.user)
      .toPromise()
      .then((res: any) => {
        this.token = localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        // location.href = '/products';
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      });
  }
}
