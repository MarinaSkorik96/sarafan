 interface IGeo {
  lat: string;
  lng: string;
 }
 
 interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo[];
 }
 
 export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: number;
  address: IAddress[];
}