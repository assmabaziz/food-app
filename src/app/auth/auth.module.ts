import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RequestGeneratePasswordComponent } from './components/request-generate-password/request-generate-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RequestGeneratePasswordComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    SharedModule
  ]
})
export class AuthModule { }
