import { Component, computed, inject, Input, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITag, ICategory } from '../../modals/irecipe';
import { RecipeService } from '../../services/recipe.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {

  tags: ITag[] = [];
  categories: ICategory[] = [];
  recipeData: any;
  message: string | undefined;
  imgSrc: any = '';
  files: File[] = [];
  pathImg: string = 'https://upskilling-egypt.com:3006/';
  isUpdatedPage: boolean = false;
  recipeId: any;
  private readonly _SharedService = inject(SharedService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _RecipeService = inject(RecipeService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  /*======================================================== Handling Dropzone =========================================================================*/
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
    console.log(this.imgSrc);
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  /*======================================================== Get All Tags And All Categories =========================================================================*/
  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }
  getAllTags() {
    this._SharedService.getTags().subscribe({
      next: (res) => {
        // console.log(res);
        this.tags = res;
      },
    });
  }
  getAllCategories() {
    this._SharedService.getCategories().subscribe({
      next: (res) => {
        // console.log(res);
        this.categories = res.data;
      },
    });
  }
  /*======================================================== Add New Recipe  ============================================================================================*/
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
    recipeImage: new FormControl(null),
  });

  onSubmit(data: FormGroup) {
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('tagId', data.value.tagId);
    myData.append('recipeImage', this.imgSrc);
  // myData.append('recipeImage', this.croppedImage.changingThisBreaksApplicationSecurity);
  myData.append('recipeImage', this.myBlob);



    console.log(data.value);

    // console.log(this.files[0]);
    console.log(this.croppedImage);



    this._RecipeService.onAddRecipe(myData).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message);
      },
      complete: () => {
        this._ToastrService.success('The recipe created successfully');
        this._Router.navigate(['/dashboard/admin/recipes']);
      },
    });
  }




myFile: any
myBlob: any
imgC :any
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: any) {
  this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event);
  // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.blob);
// console.log(this.sanitizer.bypassSecurityTrustUrl(event));
// console.log(this.sanitizer.bypassSecurityTrustUrl(event.blob));

// this.myBlob = this.sanitizer.bypassSecurityTrustUrl(event.blob)
// this.imgC = this.sanitizer.bypassSecurityTrustResourceUrl(this.myBlob)

// this.myFile = this.sayhi(this.croppedImage,  )
  // event.blob can be used to upload the cropped image
}
imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
  console.log(this.croppedImage);

    // cropper ready
}
loadImageFailed() {
    // show message
}












}
