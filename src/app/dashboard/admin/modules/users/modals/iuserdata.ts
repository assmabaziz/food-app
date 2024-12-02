export interface IUserdata {
  country: string;
  creationDate: string;
  email: string;
  imagePath: string;
  phoneNumber: string;
  userName: string;
  group: IGroup;
  modificationDate: string;
  id: number;
}
export interface IGroup {
  creationDate: string;
  id: number;
  modificationDate: string;
  name: string;
}
export interface IFullresponse {
  data:IUserdata[]
  pageNumber:number
  pageSize:number
  totalNumberOfPages:number
  totalNumberOfRecords:number
}

