import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { User } from 'src/app/models/user';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

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
    private router: Router
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
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('name', res.user.name);
        sessionStorage.setItem('email', res.user.email)
        sessionStorage.setItem('id', res.user.id)
        this.token = res.token;
        this.router.navigate(['/home'])
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      });
  }
}
