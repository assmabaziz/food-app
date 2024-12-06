import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { FavoritesService } from './services/favorites.service';
import { IFavdata, IFavrecipe } from '../user-recipes/modals/ifavrecipe';
import { IRecipeData } from 'src/app/dashboard/admin/modules/recipes/modals/irecipe';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
private readonly _FavoritesService = inject(FavoritesService)
private readonly _ToastrService = inject(ToastrService)

deleted: boolean = true
responseData: IFavdata[]=[]
imgBaseUrl : string = 'https://upskilling-egypt.com:3006/'
ngOnInit(): void {
  this.getAllFav()
}
getAllFav():void {
this._FavoritesService.onGetFav().subscribe({
  next:(res)=> {
    console.log(res);
    // console.log(res.data.recipe);

    this.responseData = res.data
    console.log(this.responseData);


  }, error:(err) => {
    console.log(err);
  }
})
}
deleteFav(id: number) {
  this._FavoritesService.onDeleteFav(id).subscribe({
    next: (resp) => {
      this._ToastrService.error('item removed from fav')
      this.deleted= false
      this.getAllFav();
    }
  })

}
}
