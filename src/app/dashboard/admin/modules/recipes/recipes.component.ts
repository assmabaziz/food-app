import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../cotegories/services/categories.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete-dialog/delete.component';
import { RecipeService } from './services/recipe.service';
import { ICategory, IRecipeData, IRecipeList, ITag } from './modals/irecipe';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  public _MatDialog = inject(MatDialog);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _RecipeService = inject(RecipeService);
  private readonly _SharedService = inject(SharedService);
  private readonly _ToastrService = inject(ToastrService);
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
    this._RecipeService.onGetAllRecipes(myParams).subscribe({
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
  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    recName: any
  ): void {
    // console.log(recName);
    const dialogRef = this._MatDialog.open(DeleteComponent, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: recName,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result);
        this.deletRecipe(result.id);
      }
    });
  }
  deletRecipe(id: number): void {
    this._RecipeService.onDeleteRecipe(id).subscribe({
      next: (res) => {
        // console.log(res);
        // this.listCategories = res.data;
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'error!');
      },
      complete: () => {
        this._ToastrService.error('Recipe removed');
        this.getAllRecipes();
      },
    });
  }
  clearAllFilters(): void {
    this.valueSearch = '';
    this.tagId = 0;
    this.catgoryId = 0;
    this.getAllRecipes()
  }
  openDeleteDialog(recipID: number) {
    const dialogRef = this._MatDialog.open(ViewRecipeComponent, {
      data: { text: 'Recipe', id: recipID },

    });
    console.log(recipID);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this._RecipeService.onGetRecipeById(result)
      }
    });
  }
}
