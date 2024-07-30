export interface IReview {
  _id: string;
  userId: string;
  cardId: string;
  reviewDate: string;
  correct: boolean;
  createdAt: string;
  updatedAt: string;
}
