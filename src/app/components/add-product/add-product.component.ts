import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from "../../services/auth.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Regexp } from "../../models/regex";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  isDisabled: boolean = false;
  addProductForm: UntypedFormGroup

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private toast: ToastService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      'name':        [ null, [Validators.required, Validators.pattern(Regexp.name)] ],
      'description': [ null, [Validators.pattern('^[a-z]{0,15}$')] ],
      'price':       [ null, [Validators.required] ],
      'img':         [ null ],
    });
    this.addProductForm.markAsUntouched()
  }

  createData() {
    this.addProductForm.markAllAsTouched()
    this.isDisabled = true;
    this.dataService
      .createData(this.addProductForm.getRawValue())
      .toPromise()
      .then(() => this.router.navigate(['/products']))
      .catch(() => {
        this.isDisabled = false;
        this.toast.error('Please make sure that you filled everything correctly')
      });
  }

}
