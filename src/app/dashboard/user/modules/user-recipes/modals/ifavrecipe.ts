export interface IFavrecipe {
  category: IFavcategory[],
  creationDate:string,
  description: string
  id:number,
  imagePath:string
  modificationDate:string,
  name:string
  price:number
  tag:IFavtag

}
export interface IFavdata {
  creationDate:string,
  id:number,
  modificationDate:string,
  recipe:IFavrecipe,
}

export interface IFavcategory {
  name:string
  id:number,
  modificationDate:string,
  creationDate:string,

}
export interface IFavtag {
  name:string
  id:number,
  modificationDate:string,
  creationDate:string,
}
