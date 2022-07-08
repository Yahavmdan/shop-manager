import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ToastService } from 'angular-toastify';
import { Regexp } from "../../models/regex";
import { AuthService } from "../../services/auth.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  isPasswordVisible: boolean;

  signUpForm: UntypedFormGroup

  user = new User();
  token = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      'name':                  [ null, [Validators.required, Validators.pattern(Regexp.name)] ],
      'password':              [ null, [Validators.required, Validators.pattern(Regexp.password)] ],
      'password_confirmation': [ null, [Validators.required, Validators.pattern(Regexp.password)] ],
      'email':                 [ null, [Validators.required, Validators.pattern(Regexp.email)] ],
      'is_admin':              [ null ],
    });
    this.signUpForm.markAsUntouched()
  }

  setPasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  async createUser(): Promise<Object> {
    try {
      this.signUpForm.markAllAsTouched()
      const res = await this.authService.createUser(this.signUpForm.getRawValue()).toPromise()
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('id', res.user.id);
      sessionStorage.setItem('name', this.signUpForm.get('name').value);
      sessionStorage.setItem('email', this.signUpForm.get('email').value);
      this.authService.getTokenType(res.token)
      this.router.navigate(['/home'])
      return res;
    } catch (err) {
      console.log('dfs')
      return err;
    }
  }

}
