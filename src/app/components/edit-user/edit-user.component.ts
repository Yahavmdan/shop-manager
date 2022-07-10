import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Regexp } from "../../models/regex";
import { DataService } from "../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "angular-toastify";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isDisabled: boolean = false;
  user
  id = this.route.snapshot.params['id'];
  editUserForm: UntypedFormGroup

  constructor( private dataService: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private toast: ToastService,
               private fb: UntypedFormBuilder) { }

  ngOnInit() {

    this.getData()

    this.editUserForm = this.fb.group({
      'name':     [ null, [Validators.required, Validators.pattern(Regexp.name)] ],
      'email':    [ null, [Validators.pattern(Regexp.email)] ],
    });

    this.editUserForm.markAsUntouched()
  }

  getData() {
    this.id = this.route.snapshot.params['id'];
    this.dataService.getUserById(this.id).subscribe((res) => {
      this.user = res;
      this.editUserForm.patchValue(this.user)
    });
  }

  editData() {
    this.editUserForm.markAllAsTouched()
    if (this.editUserForm.invalid) {
      this.toast.error('Please make sure that you filled everything correctly')
      return;
    }
    this.isDisabled = true;
    this.dataService
      .editUserData(this.id, this.editUserForm.getRawValue())
      .toPromise()
      .then(() => {
        this.router.navigate(['/users'])
      })
      .catch(() => {
        this.isDisabled = false;
        this.toast.error('Please make sure that you filled everything correctly')
      });
  }


}
