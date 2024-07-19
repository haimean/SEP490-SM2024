export interface ReviewCreateInput {
  accountSendId: number;
  accountRecipientId: number;
  rating: number;
  comment: string;
}
