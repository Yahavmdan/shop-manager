import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  tokenType = null
  token = localStorage.getItem('token');

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  URL = 'http://localhost:4200'
  apiURL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  getAdminToken(data): boolean {
    this.httpClient.post(`${this.apiURL}/check-token`, data)
      .toPromise()
      .then(res => {
        this.tokenType = res['responseCode'];
        localStorage.setItem('userType', this.tokenType);
      })
      .catch(() => {
        if (location.href !== `${this.URL}/home`) {
          this.router.navigate(['no-permission-page']).then()
        }
      })
    return this.tokenType === 1;
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

  resetPassword(data) {
    return this.httpClient.put(`${this.apiURL}/reset-password`, data, {
      headers: this.header,
    });
  }

}
