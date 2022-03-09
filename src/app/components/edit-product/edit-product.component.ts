import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ToastService } from 'angular-toastify';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product = new Product();
  id = this.route.snapshot.params['id'];
  data: any;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.dataService.getById(this.id).subscribe((res) => {
      this.data = res;
      this.product = this.data;
    });
  }

  editData() {
    this.dataService
      .editData(this.id, this.product)
      .toPromise()
      .then((res) => {
        this.router.navigate(['/products']);
      })
      .catch((err) => {
        this.toast.error('Please check that you filled everything ');
      });
  }
}
