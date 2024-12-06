import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormControlOptions,
  FormBuilder,
} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  msgError: any = '';
  msgSuccess: any = '';
  passwordShow: boolean = false;
  confirmPasswordShow: boolean = false;
  files: File[] = [];
  imgSrc: any;
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  registerForm: FormGroup = this._formBuilder.group(
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
    return this.registerForm.controls;
  }
  onRegister(form: any): void {
    const fileInput = document.getElementById('undefined');
    fileInput?.setAttribute('name', 'file');
    let formdata = new FormData();
    formdata.append('userName', form.value.userName);
    formdata.append('email', form.value.email);
    formdata.append('country', form.value.country);
    formdata.append('phoneNumber', form.value.phoneNumber);
    formdata.append('password', form.value.password);
    formdata.append('confirmPassword', form.value.confirmPassword);
    // formdata.append('profileImage', this.imgSrc );
    if (this.registerForm.valid) {
      this._AuthServiceService.registerUser(formdata).subscribe({
        next: (res) => {
          if (res.message) {
            this.msgSuccess = res.message;
            localStorage.setItem('userMail', form.value.email);
            // console.log(formdata);
          }
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
          setTimeout(() => this._Router.navigateByUrl('auth/confirm'), 1500);
          // console.log(formdata);
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
  innerClick(event: Event) {
    event.stopPropagation();
  }
}
