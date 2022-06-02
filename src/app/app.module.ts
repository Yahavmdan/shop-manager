import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';

import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    AddProductComponent,
    EditProductComponent,
    HomeComponent,
    TaskComponent,
    FooterComponent,
    LoginComponent,
    SigninComponent,
    CarouselComponent,
    UserDetailsComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularToastifyModule,
    FormsModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
