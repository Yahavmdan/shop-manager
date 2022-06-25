import {Component, OnInit} from '@angular/core';
import {ToastService} from 'angular-toastify';
import {User} from 'src/app/models/user';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean;

  user = new User();
  token = null;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
  }

  setPasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  logInUser() {
    this.authService
      .logInUser(this.user)
      .toPromise()
      .then((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email)
        this.token = res.token;
        this.authService.getAdminToken(this.token);
        setTimeout(() => {
          location.href = '/home';
        }, 1000)
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      });
  }
}
