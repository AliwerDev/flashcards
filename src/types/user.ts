export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: string;
  cardsCount?: number;
}
