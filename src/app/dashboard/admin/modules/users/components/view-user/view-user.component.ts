import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SystemUserServiceService } from 'src/app/dashboard/user/modules/user-recipes/services/system-user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  baseUrlImg: string = 'https://upskilling-egypt.com:3006/'

  onNoClick(): void {
    this.dialogRef.close();
  }
}
