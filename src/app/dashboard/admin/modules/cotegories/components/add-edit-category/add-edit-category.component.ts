import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRecipeList } from '../../../recipes/modals/irecipe';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  changeDialog: boolean = false;
  catName:string =''
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecipeList,
  ) {
    if (data.id !=null) {
      this.catName = data.name
      this.changeDialog = true;
    } else {
      this.changeDialog = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
