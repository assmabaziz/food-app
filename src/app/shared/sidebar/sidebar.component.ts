import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { IData } from 'src/app/dashboard/modals/idata';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userClass: string | null = '';
  menu: IData[] = [];
  private readonly _Router = inject(Router);
  private readonly _AuthServiceService = inject(AuthServiceService);
  private _SharedService = inject(SharedService);
  valueSideBarChanged:any= this._SharedService.sideBarChanged
  toggleSideBar():void{
    this._SharedService.onToggle()
  }
  isAdmin(): boolean {
    return this._AuthServiceService.role === 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._AuthServiceService.role === 'SystemUser' ? true : false;
  }
  ngOnInit(): void {
    this.userClass = localStorage.getItem('userGroup');
    this.menu = [
      {
        link: '/dashboard/home',
        icon: 'fa-home',
        text: 'home',
        isActive: this.isAdmin() || this.isUser(),
      },
      {
        link: '/dashboard/admin/users',
        icon: 'fa-users',
        text: 'users',
        isActive: this.isAdmin(),
      },
      {
        link: '/dashboard/admin/recipes',
        icon: 'fa-bowl-food',
        text: 'recipes',
        isActive: this.isAdmin(),
      },
      {
        link: '/dashboard/admin/categories',
        icon: 'fa-list',
        text: 'categories',
        isActive: this.isAdmin(),
      },
      {
        link: '/dashboard/user/favorite',
        icon: 'fa-heart',
        text: 'fav',
        isActive: this.isUser(),
      },
      {
        link: '/dashboard/user/user-recipes',
        icon: 'fa-bowl-food',
        text: 'recipes',
        isActive: this.isUser(),
      },
    ];
  }
}

