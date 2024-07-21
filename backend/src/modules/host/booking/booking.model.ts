export interface BookingCreateInput {
  accountId: number;
  courtId: number;
  startTime: Date;
  endTime: Date;
  price: number;
  name: string;
  numberPhone: string;
}
