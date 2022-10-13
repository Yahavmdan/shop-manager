import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss'],
})
export class Navbar2Component implements OnInit, OnDestroy {


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
    location.href = '/home'
  }
}
