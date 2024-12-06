import { Component, inject } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { IProfile } from './modals/iprofile';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
private readonly _SharedService = inject(SharedService)
userData: IProfile = {} as IProfile
imgBaseUrl : string = 'https://upskilling-egypt.com:3006/'
ngOnInit(): void {
  this._SharedService.onGetCurrentUser().subscribe({
    next:(res)=> {
      console.log(res);
      this.userData = res
    },error:(err)=> {
      console.log(err);
    }
  })
}
}
