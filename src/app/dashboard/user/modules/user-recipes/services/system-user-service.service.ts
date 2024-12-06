import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemUserServiceService {
  constructor() {}
  private readonly _HttpClient = inject(HttpClient);
  onGetAllRecipes(myParms: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: myParms });
  }
  onGetRecipeById(id:number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }
  onAddRecipe(recipeData: FormData): Observable<any> {
    return this._HttpClient.post('Recipe', recipeData);
  }
  onEditRecipe(id:number,data: any): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
  }
  onDeleteRecipe(id:number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`);
  }
  onAddTofav(id: number): Observable<any> {
    return this._HttpClient.post(`userRecipe`, { recipeId: id });
  }

}
