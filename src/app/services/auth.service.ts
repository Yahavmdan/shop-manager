import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  tokenExist = null
  token = localStorage.getItem('token');

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  URL = 'http://localhost:4200'
  apiURL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  checkTokenExistence(data): boolean {
    this.httpClient.post(`${this.apiURL}/check-token`, data)
      .toPromise()
      .then(res => {
        this.tokenExist = res['responseCode'];
        localStorage.setItem('userType', this.tokenExist);
      })
      .catch(() => {
        if (location.href !== `${this.URL}/home`) {
          this.router.navigate(['no-permission-page']).then()
        }
      })
    return this.tokenExist < 3;
  }

  createUser(data: any) {
    return this.httpClient.post(`${this.apiURL}/register`, data, {
      headers: this.header,
    });
  }

  logInUser(data: any) {
    return this.httpClient.post(`${this.apiURL}/login`, data, {
      headers: this.header,
    });
  }

  sendResetPasswordEmail(email) {
    return this.httpClient.post(`${this.apiURL}/send-forgot-password-email`, email);
  }

  resetPasswordForm(data) {
    return this.httpClient.post(`${this.apiURL}/reset-password-form`, data, {
      headers: this.header,
    });
  }

}
