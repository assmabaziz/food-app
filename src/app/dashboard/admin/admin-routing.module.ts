import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddRecipeComponent } from './modules/recipes/components/add-recipe/add-recipe.component';
import { EditRecipComponent } from './modules/recipes/components/edit-recip/edit-recip.component';
import { ViewRecipeComponent } from './modules/recipes/components/view-recipe/view-recipe.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
