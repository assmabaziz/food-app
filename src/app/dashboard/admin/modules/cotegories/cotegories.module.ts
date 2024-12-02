import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotegoriesRoutingModule } from './cotegories-routing.module';
import { CotegoriesComponent } from './cotegories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { DeleteComponent } from '../../../../shared/delete-dialog/delete.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';


@NgModule({
  declarations: [
    CotegoriesComponent,
    AddEditCategoryComponent,
    DeleteComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    CotegoriesRoutingModule,
    SharedModule
  ]
})
export class CotegoriesModule { }
