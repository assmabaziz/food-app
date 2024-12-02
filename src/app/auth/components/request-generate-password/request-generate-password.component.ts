import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-request-generate-password',
  templateUrl: './request-generate-password.component.html',
  styleUrls: ['./request-generate-password.component.scss'],
})
export class RequestGeneratePasswordComponent {
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _ToastrService = inject(ToastrService);
  private _Router: Router = inject(Router);
  responseUser: string = ''

  requestResetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });


  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.requestResetPasswordForm.controls;
  }
  onRequestPesetPassword(data: FormGroup): void {
    if (this.requestResetPasswordForm.valid) {
      this._AuthServiceService.requestResetPassword(data.value).subscribe({
        next: (response) => {
          let finalRes = new Map(Object.entries(response));
          for (let [key, msg] of finalRes) {
            this.responseUser = msg
          }

        },
        error: (err) => {
          this._ToastrService.error(err);
        },
        complete: () => {
          this._ToastrService.success(this.responseUser);
          this._Router.navigateByUrl('auth/resetPassword')
          localStorage.setItem('userMail', this.requestResetPasswordForm.value.email)
        },
      });
    }
  }
}
