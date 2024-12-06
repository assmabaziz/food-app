import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor() {}

  private readonly _HttpClient = inject(HttpClient);

  onGetFav(): Observable<any> {
    return this._HttpClient.get(`userRecipe`);
  }
  onDeleteFav(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }
}
