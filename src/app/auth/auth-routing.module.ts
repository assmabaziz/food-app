import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestGeneratePasswordComponent } from './components/request-generate-password/request-generate-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

const routes: Routes = [{ path: '', redirectTo: 'login',pathMatch:'full', title: 'Login'},
  { path: 'login', component: AuthComponent, title: 'Login' },
  {path:'register', component: RegisterComponent, title: 'Register'},
  {path:'requestGeneratePassword', component: RequestGeneratePasswordComponent , title: 'Forgot Password'},
  {path:'resetPassword', component: ResetPasswordComponent , title: 'Reset Password'},
  {path: 'confirm', component: ConfirmEmailComponent, title: 'Confirm Email'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
