import ICategory from "./category";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: string;
  cardCount: number;
  reviewsCount: number;
  categories: ICategory[];
}
