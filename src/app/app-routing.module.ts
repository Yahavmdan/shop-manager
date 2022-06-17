import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ResetPasswordFormComponent } from "./components/reset-password-form/reset-password-form.component";
import { NoPermissionComponent } from "./components/no-permission/no-permission.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password-form/:token',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'no-permission-page',
    component: NoPermissionComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
