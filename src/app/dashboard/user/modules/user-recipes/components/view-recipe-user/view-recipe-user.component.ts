import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewRecipeComponent } from 'src/app/dashboard/admin/modules/recipes/components/view-recipe/view-recipe.component';
import { SystemUserServiceService } from '../../services/system-user-service.service';
import { ToastrService } from 'ngx-toastr';

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
  private readonly _SystemUserServiceService =inject(SystemUserServiceService)
  private readonly _ToastrService =inject(ToastrService)

  baseUrlImg: string = 'https://upskilling-egypt.com:3006/'
  addToFav(id:number){
    this._SystemUserServiceService.onAddTofav(id).subscribe({
      next:(res)=> {
        console.log(res);
      }, error:(err)=> {
        console.log(err);
      }, complete:()=> {
        this._ToastrService.success('Recipe Added to fav')
      }
    })
      }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
