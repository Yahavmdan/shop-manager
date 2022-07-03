import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Regexp } from "../../models/regex";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  isDisabled: boolean = false;
  product
  id = this.route.snapshot.params['id'];
  editProductForm: FormGroup

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.getData()

    this.editProductForm = this.fb.group({
      'name':        [ null, [Validators.required, Validators.pattern(Regexp.name)] ],
      'description': [ null, [Validators.pattern('^[a-z]{0,15}$')] ],
      'price':       [ null, [Validators.required, Validators.pattern(Regexp.numbers)] ],
      'img':         [ null ],
    });

    this.editProductForm.markAsUntouched()
  }

  getData() {
    this.id = this.route.snapshot.params['id'];
    this.dataService.getById(this.id).subscribe((res) => {
      this.product = res;
      this.editProductForm.patchValue(this.product)
    });
  }

  editData() {
    this.editProductForm.markAllAsTouched()
    this.isDisabled = true;
    this.dataService
      .editData(this.id, this.editProductForm.getRawValue())
      .toPromise()
      .then(() => this.router.navigate(['/products']))
      .catch(() => {
        this.isDisabled = false;
        this.toast.error('Please make sure that you filled everything correctly')
      });
  }

}
