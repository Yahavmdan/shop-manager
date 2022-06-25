import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  token = localStorage.getItem('token');

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('userType') === '2' || !localStorage.getItem('userType')) {
      this.router.navigate(['/no-permission-page']).then()
      return false
    }
    return localStorage.getItem('userType') === '1';
  }

}
