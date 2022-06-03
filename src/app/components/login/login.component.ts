import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';
import {User} from 'src/app/models/user';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  logInUser() {
    this.authService
      .logInUser(this.user)
      .toPromise()
      .then((res: any) => {
        this.token = localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        location.href = '/products';
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      });
  }
}
