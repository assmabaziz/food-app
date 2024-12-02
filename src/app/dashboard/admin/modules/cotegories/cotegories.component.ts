import { MatDialog } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import {
  ICategories,
  ICategoryDetails,
  ICategoryList,
  ICategoryName,
} from './modals/icategories';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from '../../../../shared/delete-dialog/delete.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';

@Component({
  selector: 'app-cotegories',
  templateUrl: './cotegories.component.html',
  styleUrls: ['./cotegories.component.scss'],
})
export class CotegoriesComponent {
  public _MatDialog = inject(MatDialog);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ToastrService = inject(ToastrService);
  listCategories: ICategories[] = [];
  fullResponce: ICategoryList | undefined;
  pageSize: number = 10;
  pageNumber: number = 1;
  valueSearch: string = '';
  categoryName: ICategoryName = {} as ICategoryName;
  categoryDetails: ICategoryDetails = {} as ICategoryDetails;
  ngOnInit(): void {
    this.getAllCategories();
  }
  openDialog(): void {
    const dialogRef = this._MatDialog.open(AddEditCategoryComponent, {
      data: {},
      width: '25%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCategory(result);
      }
    });
  }
  getAllCategories(): void {
    let myParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.valueSearch,
    };
    this._CategoriesService.onGetAllCategories(myParams).subscribe({
      next: (res) => {
        // console.log(res);
        this.listCategories = res?.data;
        this.fullResponce = res;
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
  addCategory(catName: string): void {
    this._CategoriesService.onAddCategory(catName).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'error!');
      },
      complete: () => {
        this._ToastrService.success('category added successfully');
        this.getAllCategories();
      },
    });
  }
  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    catName: ICategories
  ): void {
    const dialogRef = this._MatDialog.open(DeleteComponent, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: catName,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletCategory(result.id);
      }
    });
  }
  deletCategory(id: number): void {
    this._CategoriesService.onDeleteCategory(id).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        // console.log(err);
        this._ToastrService.error(err.error.message, 'error!');
      },
      complete: () => {
        this._ToastrService.error('category removed');
        this.getAllCategories();
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllCategories();
  }
  openDialogEdit(data: ICategories) {
    const dialogRef = this._MatDialog.open(AddEditCategoryComponent, {
      data: data,
      width: '30%',

    });
    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.editCategory(data.id, result);
      }
    });
  }
  editCategory(id:number,data: string) {
    this._CategoriesService.onEditCategory(id, data).subscribe({
      next: (res) => {
        // console.log(res);
        this._ToastrService.success('Category modified');
      },
      error: (err) => {
        // console.log(err.error.message);
        this._ToastrService.error(err.error.message);
      },
      complete: () => {
        this.getAllCategories();
      },
    });
  }
  openDialogView(data: ICategories): void {
    const dialogRef = this._MatDialog.open(ViewCategoryComponent, {
      data: data,
      width: '30%',
    });

    this.getCategoryById(data.id);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  getCategoryById(id: number): void {
    this._CategoriesService.onGetCategoryById(id).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
