import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipesComponent } from './user-recipes.component';
import { ViewRecipeUserComponent } from './components/view-recipe-user/view-recipe-user.component';

const routes: Routes = [{ path: '', component: UserRecipesComponent },
  {path: "viewRecipe/:id", component: ViewRecipeUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRecipesRoutingModule { }
