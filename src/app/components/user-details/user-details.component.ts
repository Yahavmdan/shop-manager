import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userName:string
  userEmail:string

  constructor() { }

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('email')
    this.userName =  sessionStorage.getItem('name')
  }

}
