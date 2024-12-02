import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipComponent } from './components/edit-recip/edit-recip.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

const routes: Routes = [{ path: '', component: RecipesComponent},
  {path: "add", component: AddRecipeComponent},
  {path: "edit/:id", component: EditRecipComponent},
  {path: "view/:id", component: ViewRecipeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
