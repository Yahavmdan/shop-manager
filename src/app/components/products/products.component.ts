import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  products = []
  userType = sessionStorage.getItem('userType');
  token = sessionStorage.getItem('token');

  constructor(
    private toast: ToastService,
    private dataService: DataService,
    public authService: AuthService,
    private router: Router
  ) {
    this.router.navigate(['/products']).then();
  }

  ngOnInit(): void {
    if (this.token) {
      this.authService.getTokenType(this.token)
    }
  }

  search(searchValue: string | number) {
    this.dataService.searchData(searchValue).subscribe((res: any) => {
      this.products = res;
    });
  }

}
