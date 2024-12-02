import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { SharedService } from '../services/shared.service';
import { IGroup, IUser } from '../modals/iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private readonly _Router: Router = inject(Router);
  private readonly _AuthService = inject(AuthServiceService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _SharedService = inject(SharedService);

  passwordShow: boolean = false;
  confirmPasswordShow: boolean = false;
  confirmNewPasswordShow: boolean = false;
  showFormChangePssword: boolean = true;
  userData: IUser = {} as IUser;
  userGroup: IGroup = {} as IGroup;
  imgBaseUrl : string = 'https://upskilling-egypt.com:3006/'
  uppdatePasswordForm: FormGroup = this._formBuilder.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      confirmNewPassword: ['', [Validators.required]],
    },
    { validator: [this.checkPassword] } as FormControlOptions
  );

  public get uppdateData(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.uppdatePasswordForm.controls;
  }
  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.getCurrentUser();
    }
  }
  checkPassword(group: AbstractControl) {
    const password = group.get('newPassword');
    const confirmPassword = group.get('confirmNewPassword');
    if (confirmPassword?.value === '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value !== password?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    }
  }
  showForm(): void {
    // this.showFormChangePssword === !this.showFormChangePssword
    if (this.showFormChangePssword === true) {
      this.showFormChangePssword = false;
    } else {
      this.showFormChangePssword = true;
    }
  }
  closeForm(): void {
    // this.showFormChangePssword === !this.showFormChangePssword
    if (this.showFormChangePssword) {
      this.showFormChangePssword = false;
    } else {
      this.showFormChangePssword = true;
    }
  }
  logOut(): void {
    this._Router.navigateByUrl('auth/login');
    localStorage.clear();
  }
  getProfile(): void {
    if (this.userGroup.name === 'SuperAdmin') {
      this._Router.navigateByUrl('dashboard/admin');
    } else if (this.userGroup.name === 'SystemUser') {
      this._Router.navigateByUrl('dashboard/user');
    }
  }
  uppdateUserPassword(form: any): void {
    if (this.uppdatePasswordForm.valid) {
      this._AuthService
        .uppdateUserPassword(this.uppdatePasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success(
              'Password has been updated successfully'
            );
          },
          error: (err) => {
            console.log(err);
            this._ToastrService.error('something went wrong');
          },
        });
    }
    console.log(this.uppdatePasswordForm.value);
  }
  getCurrentUser(): void {
    this._SharedService.onGetCurrentUser().subscribe({
      next: (res) => {
        // console.log(res);
        this.userData = res
        this.userGroup = res.group
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
