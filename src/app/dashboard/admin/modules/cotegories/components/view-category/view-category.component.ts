import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategories } from '../../modals/icategories';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent {
changeDialog: boolean = false;
  catName:string =''

  constructor(
    public dialogRef: MatDialogRef<ViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategories,
  ) {
    if (data !=null) {
      this.catName = data.name
      this.changeDialog = true;
      // console.log(data)
      // console.log(this.catName)
    } else {
      this.changeDialog = false;
      // console.log(data.id)
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
