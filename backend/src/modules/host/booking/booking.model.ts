export interface BookingCreateInput {
  accountId: number;
  courtId: number;
  startTime: Date;
  endTime: Date;
  price: number;
  name: string;
  numberPhone: string;
}
export interface BookingUpdateInput {
  id: number;
  startTime: Date;
  endTime: Date;
  price: number;
  name: string;
  numberPhone: string;
}
