import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Router} from '@angular/router';
import {Product} from 'src/app/models/product';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  product = new Product();

  isDisabled:boolean = false;

  constructor(
    private dataService: DataService,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  createData() {
    this.isDisabled = true;
    this.dataService
      .createData(this.product)
      .toPromise()
      .then((res) => {
        this.router.navigate(['/products']);
      })
      .catch((err) => {
        this.isDisabled = false;
        this.toast.error(err.error.message);
      });
  }
}
