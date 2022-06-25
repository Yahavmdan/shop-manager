import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Router} from '@angular/router';
import {ToastService} from 'angular-toastify';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = []
  userType = localStorage.getItem('userType');
  token = localStorage.getItem('token');

  constructor(
    private toast: ToastService,
    private dataService: DataService,
    public authService: AuthService,
    private router: Router
  ) {
    this.router.navigate(['/products']).then();
  }

  ngOnInit(): void {
    this.getProductsData();
    if (this.token) {
      this.authService.getAdminToken(this.token)
    }
  }

  getProductsData() {
    this.dataService.getData().subscribe((res: any) => {
      this.products = res;
    });
  }

  deleteData(id: any) {
    let answer = confirm('Are you sure you want to delete?');
    if (answer) {
      this.dataService.deleteData(id).subscribe(() => {
        this.getProductsData();
      });
      this.toast.success('Product was deleted');
    }
  }

  goToEdit(id: any) {
    this.router.navigate([`/edit/${id}`]).then();
  }

  search(searchValue: string | number) {
    this.dataService.searchData(searchValue).subscribe((res: any) => {
      this.products = res;
      if (!searchValue) {
        this.getProductsData();
      }
    });
  }
}
