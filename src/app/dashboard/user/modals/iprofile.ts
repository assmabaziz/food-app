export interface IProfile {
  country:string,
  creationDate:string,
  group: IGroup,
  id:number,
  imagePath:string,
  phoneNumber:string,
  userName:string,
  modificationDate:string,
  email:string
}
export interface IGroup {
  id:number,
  name:string
  creationDate:string,
  modificationDate:string,
}

