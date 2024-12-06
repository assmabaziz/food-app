import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent{
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _ToastrService = inject(ToastrService);
  private _Router : Router = inject(Router)
  passwordShow: boolean = false;

  logInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
  });
  public get formData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.logInForm.controls;
  }
  onLogin(data: FormGroup): void {
    if(this.logInForm.valid){
      this._AuthServiceService.loginUser(data.value).subscribe({
        next: (response) => {
          localStorage.setItem('userToken', response.token)
          this._AuthServiceService.getProfile()
        },
        error: (err) => {
          this._ToastrService.error(err.error.message)
        },complete:()=>{
          this._ToastrService.success('You have been successfully loged in')
          this._Router.navigate(['/dashboard'])
        }
       });
    }
  }
}
