import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormControlOptions, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  msgError: any = '';
  msgSuccess: any = '';
  passwordShow: boolean = false;
  confirmPasswordShow: boolean = false;
  userEmail: any =localStorage.getItem('userMail')
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _ToastrService = inject(ToastrService);
  private _Router : Router = inject(Router)
  private readonly _formBuilder = inject(FormBuilder)

  resetPasswordForm: FormGroup = this._formBuilder.group(
    {
      email: new FormControl(`${this.userEmail}`),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        ),
      ]),
      confirmPassword: new FormControl(''),
      seed: new FormControl('', [Validators.required]),
    },
    { validator: [this.checkPassword] } as FormControlOptions
  );
  public get formReset(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.resetPasswordForm.controls;
  }
  onResetPassword(form: any): void {

    if (this.resetPasswordForm.valid) {
      this._AuthServiceService.resetPassword(form.value).subscribe({
        next: (response) => {
          let finalRes = new Map(Object.entries(response));
          for (let [key, msg] of finalRes) {
            this.msgSuccess = msg
          }
          this._AuthServiceService.getProfile()
          // if(localStorage.getItem('userGroup') ==='SuperAdmin'){
          //   this._Router.navigateByUrl('dashboard/admin')
          // }else if (localStorage.getItem('userGroup') === 'userSystem'){
          //   this._Router.navigateByUrl('dashboard/user')
          // }
        },
        error: (err) => {
          let mapErrors = new Map(
            Object.entries(err.error.additionalInfo.errors)
          );
          for (const [erro, msg] of mapErrors) {
            this._ToastrService.error(JSON.stringify(erro + `:` + msg));
          }
        },
        complete: () => {
          this._ToastrService.success(this.msgSuccess);
          localStorage.removeItem('userMail')
          this._Router.navigateByUrl('auth/login')

        },
      });
    }
  }
  checkPassword(group: AbstractControl) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (confirmPassword?.value === '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value !== password?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    }
  }
// ngOnInit(): void {
//   console.log(localStorage.getItem('userMail'));

// }
}
