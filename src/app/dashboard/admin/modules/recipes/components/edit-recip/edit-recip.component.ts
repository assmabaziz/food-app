import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ITag, ICategory } from '../../modals/irecipe';

@Component({
  selector: 'app-edit-recip',
  templateUrl: './edit-recip.component.html',
  styleUrls: ['./edit-recip.component.scss']
})
export class EditRecipComponent {
private readonly _RecipeService = inject(RecipeService)
private readonly _SharedService= inject(SharedService)
private readonly _ToastrService = inject(ToastrService)
private readonly _Router = inject(Router)
private readonly _ActivatedRoute = inject(ActivatedRoute)

imgSrc: any = ''
tags: ITag[] = [];
categories: ICategory[] = [];
recipeData: any;
baseImgUrl: string = 'https://upskilling-egypt.com:3006/';
recipeId: any;
/*======================================================== Handling Dropzone =========================================================================*/
files: File[] = [];
onSelect(event: any) {
  this.files.push(...event.addedFiles);
  this.imgSrc = this.files[0];

}
onRemove(event: any) {
  this.files.splice(this.files.indexOf(event), 1);
}
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
    recipeImage: new FormControl(null),
  });

/*======================================================== Get All Tags And All Categories =========================================================================*/
ngOnInit() {
  this.getAllTags();
  this.getAllCategories();
  this.recipeId = this._ActivatedRoute.snapshot.params['id'];
  this.getRecipeById(this.recipeId)
}
onSubmit(data: FormGroup) {
  console.log(data.value);
  let myData = new FormData();
  myData.append('name', data.value.name);
  myData.append('price', data.value.price);
  myData.append('description', data.value.description);
  myData.append('categoriesIds', data.value.categoriesIds);
  myData.append('tagId', data.value.tagId);
  myData.append('recipeImage', this.imgSrc);
  this.editRecip(this.recipeId, myData);
}
getAllTags() {
  this._SharedService.getTags().subscribe({
    next: (res) => {
      // console.log(res);
      this.tags = res;
    },
  });
}
getAllCategories() {
  this._SharedService.getCategories().subscribe({
    next: (res) => {
      // console.log(res);
      this.categories = res.data;
    },
  });
}
getRecipeById(id: number) {
  this._RecipeService.onGetRecipeById(this.recipeId).subscribe({
    next: (res) => {
      this.recipeData = res;
    },
    error: (err) => {
    },
    complete: () => {
        this.imgSrc = this.baseImgUrl+this.recipeData.imagePath;
        this.recipeForm.patchValue({
        name: this.recipeData?.name,
        price: this.recipeData?.price,
        description: this.recipeData?.description,
        tagId: this.recipeData?.tag.id,
        categoriesIds: this.recipeData?.category[0].id
      })
    }
  });
}
  editRecip(id:number,formData:FormData){
    this._RecipeService.onEditRecipe(id,formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.message);
        this._ToastrService.error(err.error.message);
      },
      complete: () => {
        this._ToastrService.success('Recipe was modified');
        this._Router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }

}
