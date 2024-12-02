import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private readonly _HttpClient= inject(HttpClient)
  sideBarChanged: WritableSignal<boolean> = signal(true);
  onToggleSideBar(walo : WritableSignal<boolean>):void {
   walo.update(value=> !value)
   }
onToggle():void {
  this.sideBarChanged.update(value => !value)
}

getTags(): Observable<any> {
  return this._HttpClient.get('tag');
}
getCategories(): Observable<any> {
  return this._HttpClient.get('Category', { params: {pageSize: 500}});
}
onGetUserById(id: number): Observable<any> {
  return this._HttpClient.get(`Users/${id}`)
}
onGetCurrentUser():Observable<any> {
  return this._HttpClient.get(`Users/currentUser`)
}
}
