import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../shared/home/home.component';
import { authGuard } from '../core/guards/auth.guard';
import { userGuard } from '../core/guards/user.guard';
import { adminGuard } from '../core/guards/admin.guard';

const routes: Routes = [{ path: '', component: DashboardComponent, title:'Dashboard', canActivate: [authGuard] , children: [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {
    path: 'admin', canActivate: [adminGuard] ,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user', canActivate: [userGuard] ,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
