export interface ICategories {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
export interface ICategoryName {
  name: string;
}
export interface ICategoryDetails {
  creationDate?: string;
  id?: number;
  modificationDate?: string;
  name?: string;
}
export interface ICategoryList {
  pageNumber: number,
  pageSize: number,
  totalNumberOfRecords: number,
  totalNumberOfPages:number,
  data: ICategories[]
}
