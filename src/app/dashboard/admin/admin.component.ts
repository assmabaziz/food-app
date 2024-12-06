import { IProfileadmin } from './../modals/idata';
import { Component, inject } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private readonly _SharedService = inject(SharedService)

  adminData: IProfileadmin= {} as IProfileadmin
  imgBaseUrl : string = 'https://upskilling-egypt.com:3006/'

  ngOnInit(): void {
    this._SharedService.onGetCurrentUser().subscribe({
      next:(res)=> {
        console.log(res);
        this.adminData = res
      },error:(err)=> {
        console.log(err);
      }
    })

  }
}
