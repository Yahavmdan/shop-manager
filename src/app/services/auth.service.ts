import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  tokenType = null

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  URL = 'https://shop-manager-352819.web.app'
  apiURL = 'https://api-production-2703.up.railway.app/api'

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  getTokenType(data): boolean | Promise<boolean> {
    this.httpClient.post(`${this.apiURL}/check-token`, data)
      .toPromise()
      .then(res => {
        this.tokenType = res['responseCode'];
        this.user$.next(this.tokenType);
        sessionStorage.setItem('userType', this.tokenType);
      })
      .catch(() => {
        if (location.href !== `${this.URL}/home`) {
          this.router.navigate(['no-permission-page']).then()
        }
      })
    return this.tokenType === 1;
  }


  createUser(data: any): Observable<{ user: User, token: string }> {
    return this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/register`, data, {
      headers: this.header,
    });
  }

  logInUser(data: any): Observable<{ user: User, token: string }> {
    return this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/login`, data, {
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
