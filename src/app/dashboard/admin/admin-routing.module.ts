import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UpdateProfileComponent } from 'src/app/shared/update-profile/update-profile.component';
const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/cotegories/cotegories.module').then(
        (m) => m.CotegoriesModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {path:'edit-profile', component: UpdateProfileComponent, title: 'update profile'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
