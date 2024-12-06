import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UpdateProfileComponent } from 'src/app/shared/update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./modules/favorite/favorite.module').then(
        (m) => m.FavoriteModule
      ),
  },
  {
    path: 'user-recipes',
    loadChildren: () =>
      import('./modules/user-recipes/user-recipes.module').then(
        (m) => m.UserRecipesModule
      ),
  },
  {path:'edit-profile', component: UpdateProfileComponent, title: 'update profile'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
