export interface IUser {
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
