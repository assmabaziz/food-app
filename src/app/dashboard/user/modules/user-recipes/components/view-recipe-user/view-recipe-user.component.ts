import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewRecipeComponent } from 'src/app/dashboard/admin/modules/recipes/components/view-recipe/view-recipe.component';

@Component({
  selector: 'app-view-recipe-user',
  templateUrl: './view-recipe-user.component.html',
  styleUrls: ['./view-recipe-user.component.scss']
})
export class ViewRecipeUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  baseUrlImg: string = 'https://upskilling-egypt.com:3006/'
  onNoClick(): void {
    this.dialogRef.close();
  }
}
