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

  URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  checkTokenExistence(data): boolean {
    this.httpClient.post(`${this.URL}/check-token`, data)
      .toPromise()
      .then(res => this.tokenExist = res['responseCode'])
    return this.tokenExist === 1
  }

  createUser(data: any) {
    return this.httpClient.post(`${this.URL}/register`, data, {
      headers: this.header,
    });
  }

  logInUser(data: any) {
    return this.httpClient.post(`${this.URL}/login`, data, {
      headers: this.header,
    });
  }

  sendResetPasswordEmail(email) {
    return this.httpClient.post(`${this.URL}/send-forgot-password-email`, email);
  }

  resetPasswordForm(data) {
    return this.httpClient.post(`${this.URL}/reset-password-form`, data, {
      headers: this.header,
    });
  }

}
