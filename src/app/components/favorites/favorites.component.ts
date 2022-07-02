import { Component, OnInit } from '@angular/core';
import { ToastService } from "angular-toastify";
import { DataService } from "../../services/data.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  products = []
  favoriteProducts = []
  userType = sessionStorage.getItem('userType');
  token = sessionStorage.getItem('token');

  constructor(    private toast: ToastService,
                  private dataService: DataService,
                  public authService: AuthService,
                  private router: Router) { }

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData() {
    this.dataService.getData().subscribe((res: any) => {
      this.products = res;
      this.getFavorites()
    })
  }

  getFavorites() {
    this.products.forEach((product) => {
      for (let localStorageKey in localStorage) {
        if (localStorageKey == product.id) {
          let parseProduct = localStorage.getItem(product.id)
          let favoriteProduct = JSON.parse(parseProduct)
          this.favoriteProducts.push(favoriteProduct)
        }
      }
    })
  }

  removeFavorite(product) {
    localStorage.removeItem(product.id)
    location.reload()
  }

}
