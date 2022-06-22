import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  token: string;

  constructor(public authService:AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token']
    this.checkToken()
  }

  checkToken() {
    if (this.authService.checkTokenExistence(this.token)) {
      localStorage.setItem('token',this.token )
    }
  }

}
