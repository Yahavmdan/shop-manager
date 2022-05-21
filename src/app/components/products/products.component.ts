import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = []
  token = localStorage.getItem('token');

  constructor(
    private toast: ToastService,
    private dataService: DataService,
    private router: Router
  ) {
    this.router.navigate(['/products']).then();
  }

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.dataService.getData().subscribe((res:any) => {
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

  search(name: any) {
    this.dataService.searchData(name.target.value).subscribe((res:any) => {
      this.products = res;

      if (name.target.value === '') {
        this.ngOnInit();
      }
    });
  }
}
