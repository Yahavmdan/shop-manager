import { Component, OnInit } from '@angular/core';
import { ToastService } from "angular-toastify";
import { DataService } from "../../services/data.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers = []
  users = []
  userType = sessionStorage.getItem('userType');
  token = sessionStorage.getItem('token');

  constructor(private toast: ToastService,
              private dataService: DataService,
              public authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsersData();
    if (this.token) {
      this.authService.getTokenType(this.token)
    }
  }

  getUsersData() {
    this.dataService.getUsersData().subscribe((res: any) => {
      this.users = res;
      this.allUsers = res;
    });
  }

  deleteUserData(id: any) {
    let answer = confirm('Are you sure you want to delete?');
    if (answer) {
      this.dataService.deleteUserData(id).toPromise().then(()=> {
        this.toast.success('User was deleted');
        this.getUsersData()
      }).catch((err)=>{
        this.toast.error(err.error);
      });
    }
  }

  goToEdit(id: any) {
    this.router.navigate([`/edit-user/${id}`]).then();
  }

  search(searchValue: string | number) {
    this.dataService.searchUserData(searchValue).subscribe((res: any) => {
      this.users = res;
      if (!searchValue) {
        this.users = this.allUsers;
      }
    });
  }

}
