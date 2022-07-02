import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {

  token = sessionStorage.getItem('token')
  userType = sessionStorage.getItem('userType')

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {

    this.authService.getTokenType(this.token)

    if (!this.userType) {
      this.router.navigate(['/no-permission-page']).then()

      return false;
    }

    return this.userType === '2' || this.userType === '1';
  }

}
