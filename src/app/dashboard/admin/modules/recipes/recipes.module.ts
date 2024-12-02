import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipComponent } from './components/edit-recip/edit-recip.component';


@NgModule({
  declarations: [
    RecipesComponent,
    ViewRecipeComponent,
    AddRecipeComponent,
    EditRecipComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDropzoneModule
  ]
})
export class RecipesModule { }
