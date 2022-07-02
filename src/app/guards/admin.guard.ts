import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  token = sessionStorage.getItem('token')
  userType = sessionStorage.getItem('userType')

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {

    this.authService.getTokenType(this.token)

    if (this.userType === '2' || !this.userType) {
      this.router.navigate(['/no-permission-page']).then()

      return false;
    }

    return this.userType === '1';
  }

}
