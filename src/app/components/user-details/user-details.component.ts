import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userName: string
  userEmail: string
  submitted: boolean;
  img: string;
  data:any;

  constructor() {
  }

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('email')
    this.userName = sessionStorage.getItem('name')
  }


}
