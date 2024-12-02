import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategoryName } from '../modals/icategories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}
  private readonly _HttpClient = inject(HttpClient);

  onGetAllCategories(data: any): Observable<any> {
    return this._HttpClient.get('Category', {
      params: data,
    });
  }
  onGetCategoryById(id:number) {
    return this._HttpClient.get(`Category/${id}`);
  }
  onAddCategory(CatName: string): Observable<any> {
    return this._HttpClient.post('Category/',  { name: CatName });
  }
  onEditCategory(id:number|undefined,CatName: string): Observable<any> {
    return this._HttpClient.put(`Category/${id}`, {name: CatName});
  }
  onDeleteCategory(id: number | undefined): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`);
  }

}
