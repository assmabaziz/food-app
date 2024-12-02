import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  private _Router = inject(Router)
  backHome(): void {
    if(localStorage.getItem('userToken')) {
      this._Router.navigateByUrl('dashboard/home')
    }else {
      this._Router.navigateByUrl('auth/login')
    }
  }
}
