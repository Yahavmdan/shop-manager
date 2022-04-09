import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  user = new User();
  token = null;
  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createUser() {
    this.dataService
      .createUser(this.user)
      .toPromise()
      .then((res: any) => {
        this.token = localStorage.setItem('token', res.token);
        location.href = '/products';
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      });
  }
}
