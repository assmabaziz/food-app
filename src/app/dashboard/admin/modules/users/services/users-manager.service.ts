import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersManagerService {

  constructor() { }

  private readonly _HttpClient = inject(HttpClient)
  onGetAllUsers(myParms: any): Observable<any> {
    return this._HttpClient.get('Users', { params: myParms });
  }
  onGetUserById(id:number): Observable<any> {
    return this._HttpClient.get(`User/${id}`);
  }
  onDeleteUsers(id:number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`);
  }
}
