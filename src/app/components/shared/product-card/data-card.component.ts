import {Component, Input, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from "../../../services/auth.service";


@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
})
export class DataCardComponent implements OnInit {

  @Input() data = [];

  userType = sessionStorage.getItem('userType');
  token = sessionStorage.getItem('token');

  constructor(
    private toast: ToastService,
    private dataService: DataService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.dataService.getData().subscribe((res: any) => {
      this.data = res;
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

  setFavorite(product) {
    localStorage.setItem(product.id, JSON.stringify(product))
    this.toast.success('Product was added to favorites');
  }

}
