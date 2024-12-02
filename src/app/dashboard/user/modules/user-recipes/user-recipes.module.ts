import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipesRoutingModule } from './user-recipes-routing.module';
import { UserRecipesComponent } from './user-recipes.component';
import { ViewRecipeUserComponent } from './components/view-recipe-user/view-recipe-user.component';


@NgModule({
  declarations: [
    UserRecipesComponent,
    ViewRecipeUserComponent
  ],
  imports: [
    CommonModule,
    UserRecipesRoutingModule,
    SharedModule
  ]
})
export class UserRecipesModule { }
