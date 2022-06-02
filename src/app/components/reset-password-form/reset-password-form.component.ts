import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

  token = this.route.queryParams

  constructor(public dataService:DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    localStorage.setItem('token', this.route.snapshot.params['token'])
  }

}
