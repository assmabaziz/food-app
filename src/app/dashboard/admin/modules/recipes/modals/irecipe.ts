export interface IRecipeList {
  category: ICategory[],
  creationDate: string,
  description: string,
  id: number,
  imagePath: string,
  modificationDate: string,
  name: string,
  price: number,
  tag: ITag
}
export interface IRecipeData {
  data: IRecipeList[],
  pageNumber:number,
  totalNumberOfPages: number,
  totalNumberOfRecords: number
}
export interface ICategory {
creationDate : string
id : number
modificationDate : string
name : string
}
export interface ITag {
  id:number,
  name:string,
  creationDate:string,
  modificationDate:string,
}
export interface IEditrecipe {
  category: ICategory[],
  creationDate: string,
  id: number,
  imagePath: string,
  price: number,
  tag: ITag,
  description: string,
  modificationDate: string,
  name: string
}
