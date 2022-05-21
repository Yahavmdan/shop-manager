import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';
import {DataService} from 'src/app/services/data.service';
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = new User();
  token = null;

  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logInUser() {
    this.dataService
      .logInUser(this.user)
      .toPromise()
      .then((res: any) => {
        this.token = localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        location.href = '/products';
      })
      .catch((err) => {
        this.toast.error(err);
        console.log(err);
      });
  }
}
