import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {


  userType
  sub: Subscription = new Subscription()
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.sub.add(this.authService.user$.subscribe(type => this.userType = type));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home'])
  }
}
