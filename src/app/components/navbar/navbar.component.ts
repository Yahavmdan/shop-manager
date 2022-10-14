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

  userType: number;
  navBarActive = true;
  blurOverlay = false;

  sub: Subscription = new Subscription()

  constructor(private authService: AuthService, private  route: Router) {}

  ngOnInit(): void {
    window.innerWidth >= 768 ? this.navBarActive = true : this.navBarActive = false;
    this.sub.add(this.authService.user$.subscribe(type => this.userType = type));
  }

  navigate(navbar, ham?, url?): void {
    if (navbar?.classList.contains('nav-bar-active')) {
      navbar.classList.remove('nav-bar-active');
      this.navBarActive = !this.navBarActive;
      this.blurOverlay = !this.blurOverlay;
    }
    if (ham) {
      this.navBarActive ? ham.style.transform = 'rotate(180deg)' : ham.style.transform = 'rotate(0deg)';
    }
    if (url) {
      this.route.navigate(url).then();
    }
  }

  activeNav(nav, ham): void {
    nav.classList.toggle('nav-bar-active');
    this.blurOverlay = !this.blurOverlay;
    this.navBarActive = !this.navBarActive;
    this.navBarActive ? ham.style.transform = 'rotate(180deg)' : ham.style.transform = 'rotate(0deg)';

  }

  logout(navbar) {
    let answer = confirm('Are you sure you want to log-out?');
    if (answer) {
      navbar.classList.toggle('nav-bar-active');
      sessionStorage.clear();
      location.href = '/home'
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
