export interface IData {
  link: string,
  icon: string,
  text: string,
  isActive : boolean,
}
export interface IProfileadmin {
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

