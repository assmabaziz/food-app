import { SharedService } from 'src/app/shared/services/shared.service';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete-dialog/delete.component';
import { UsersManagerService } from './services/users-manager.service';
import { IFullresponse, IUserdata } from './modals/iuserdata';
import { ViewUserComponent } from './components/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public _MatDialog = inject(MatDialog);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _UsersManagerService = inject(UsersManagerService);
  private readonly _SharedService = inject(SharedService);

  usersList: IUserdata[] = [];
  fulresponse: IFullresponse = {} as IFullresponse;
  valueSearch: string = '';
  selectSearch: string = '';
  groups: number | string = '';
  length = 50;
  pageIndex = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  pageSizeOptions = [5, 10, 25, 50, 100];
  baseUrlImg: string = 'https://upskilling-egypt.com:3006/';

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.length = e.length;
    this.getAllUsers();
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    let myparams: any = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      groups: this.groups,
    };
    if (this.selectSearch) {
      myparams[this.selectSearch] = this.valueSearch;
    }
    this._UsersManagerService.onGetAllUsers(myparams).subscribe({
      next: (res) => {
        this.usersList = res.data;
        this.fulresponse = res;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    user: IUserdata
  ): void {
    // console.log(recName);
    const dialogRef = this._MatDialog.open(DeleteComponent, {
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: user,
    });
    // console.log(user);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result);
        this.deletUser(result.id);
        // console.log(result);
      }
    });
  }
  deletUser(id: number): void {
    this._UsersManagerService.onDeleteUsers(id).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'error!');
      },
      complete: () => {
        this._ToastrService.error('User removed');
        this.getAllUsers();
      },
    });
  }
  clearAllFilters(): void {
    this.valueSearch = '';
    this.selectSearch = '';
    this.groups = '';
    this.getAllUsers();
  }
  openDialogView(userData: IUserdata): void {
    const dialogRef = this._MatDialog.open(ViewUserComponent, {
      data: userData,
    });
    console.log(userData);

  }
  // getUserById(id: number) {
  //   this._SharedService.onGetUserById(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
