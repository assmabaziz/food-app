import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ITag, ICategory, IEditrecipe } from '../../modals/irecipe';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
private readonly _RecipeService = inject(RecipeService)
private readonly _ActivatedRoute = inject(ActivatedRoute)
recipeData: IEditrecipe = {} as IEditrecipe
pathImg: string = 'https://upskilling-egypt.com:3006/';
recipeId: number = 0;
imgSrc: any;

ngOnInit(): void {
  this.recipeId = this._ActivatedRoute.snapshot.params['id'];
  console.log(this.recipeId);
  this.getRecipeById(this.recipeId)

}

  getRecipeById(id: number) {
    this._RecipeService.onGetRecipeById(this.recipeId).subscribe({
      next: (res) => {
        this.recipeData = res;
        console.log(res);
      },
      error: (err) => {
      }
    });
  }








  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
