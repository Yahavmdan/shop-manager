import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userType = localStorage.getItem('userType');
  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    location.href = '/home';
  }
}
