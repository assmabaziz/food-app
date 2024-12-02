import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotegoriesComponent } from './cotegories.component';

const routes: Routes = [{ path: '', component: CotegoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotegoriesRoutingModule { }
