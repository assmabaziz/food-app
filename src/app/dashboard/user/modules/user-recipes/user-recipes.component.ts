import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {
  IRecipeList,
  IRecipeData,
  ICategory,
  ITag,
} from 'src/app/dashboard/admin/modules/recipes/modals/irecipe';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ViewRecipeUserComponent } from './components/view-recipe-user/view-recipe-user.component';
import { SystemUserServiceService } from './services/system-user-service.service';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
})
export class UserRecipesComponent {
  public _MatDialog = inject(MatDialog);
  private readonly _SharedService = inject(SharedService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _SystemUserServiceService = inject(SystemUserServiceService);

  listRecipes: IRecipeList[] = [];
  fullResponce: IRecipeData = {} as IRecipeData;
  recipeCategories: ICategory[] = [];
  recipeTags: ITag[] = [];
  pageSize: number = 10;
  pageNumber: number = 1;
  valueSearch: string = '';
  tagId: number = 0;
  catgoryId: number = 0;
  baseUrlImg: string = 'https://upskilling-egypt.com:3006/';
  categories = new FormControl('');
  tags = new FormControl('');
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllRecipes();
  }
  ngOnInit(): void {
    this.getAllRecipes();
    this.getAllCategories();
    this.getAllTags();
  }
  getAllRecipes(): void {
    let myParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.valueSearch,
      tagId: this.tagId,
      categoryId: this.catgoryId,
    };
    this._SystemUserServiceService.onGetAllRecipes(myParams).subscribe({
      next: (res) => {
        this.listRecipes = res?.data;
        this.fullResponce = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllTags() {
    this._SharedService.getTags().subscribe({
      next: (res) => {
        this.recipeTags = res;
        // console.log(this.recipeTags);
      },
    });
  }
  getAllCategories() {
    this._SharedService.getCategories().subscribe({
      next: (res) => {
        this.recipeCategories = res.data;
      },
    });
  }
  clearAllFilters(): void {
    this.valueSearch = '';
    this.tagId = 0;
    this.catgoryId = 0;
    this.getAllRecipes();
  }
  openDialogViewRecipe(recipeData: IRecipeList) {
    const dialogRef = this._MatDialog.open(ViewRecipeUserComponent, {
      data: recipeData,
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
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
}
