import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent {
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  result: string = '';
  accountVerificationForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('userMail')),
    code: new FormControl('', [Validators.required]),
  });
  public get formVerify(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.accountVerificationForm.controls;
  }

  ngOnInit() {
    if (localStorage.getItem('userMail')) {
      this.accountVerificationForm
        .get('email')
        ?.setValue(localStorage.getItem('userMail'));
    }
  }
  onVerify(form: any) {
    if (this.accountVerificationForm.valid) {
      this._AuthServiceService.verifyUserEmail(form.value).subscribe({
        next: (res) => {
          // console.log(this.accountVerificationForm.value);

          // console.log(res);
          this._ToastrService.success("account was succefaly verified");
        },
        error: (err) => {
          // console.log(err);
          this._ToastrService.error(err.message);
        },
        complete: () => {
          setTimeout(() => this._Router.navigateByUrl('auth/login'), 1000);
          localStorage.removeItem('userMail');
        },
      });
    }
  }
}
