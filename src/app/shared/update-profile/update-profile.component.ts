import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlOptions,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { SharedService } from '../services/shared.service';
import { IUser } from '../modals/iuser';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {
  userData: IUser = {} as IUser;

  msgError: any = '';
  msgSuccess: any = '';
  passwordShow: boolean = false;
  confirmPasswordShow: boolean = false;
  files: File[] = [];
  imgSrc: any;
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _SharedService = inject(SharedService);

  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  updateProfileForm: FormGroup = this._formBuilder.group(
    {
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      profileImage: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: [this.checkPassword] } as FormControlOptions
  );

  ngOnInit(): void {
    this._SharedService.onGetCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    // console.log(this.files[0]);
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  public get formRegister(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.updateProfileForm.controls;
  }
  updateUserProfile(form: any): void {
    let formdata = new FormData();
    formdata.append('userName', form.value.userName);
    formdata.append('email', form.value.email);
    formdata.append('country', form.value.country);
    formdata.append('phoneNumber', form.value.phoneNumber);
    formdata.append('password', form.value.password);
    formdata.append('confirmPassword', form.value.confirmPassword);
    formdata.append('profileImage', this.imgSrc );
    this._SharedService.updateCurrentProfile(formdata).subscribe({
      next:(res)=> {
        console.log(res);

      }, error:(err)=> {
        console.log(err);
        this._ToastrService.error (err.error.additionalInfo.message)

      },complete:()=> {
        this._ToastrService.success('profile updated successfully')
        this._Router.navigate(['/dashboard/home'])
      }
    })
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
  innerClick(event: Event) {
    event.stopPropagation();
  }
}
