import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token = sessionStorage.getItem('token')
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.token) {
      this.authService.getTokenType(this.token)
    }
  }

}
