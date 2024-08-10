export interface TypeCourtHostServiceCreatePayload {
  accountId: number;
  name: string;
  image?: string;
  description?: string;
  attributeCourtIds?: number[];
  priceTypeCourt?: {
    startTime: Date;
    endTime: Date;
    times: number;
    price: number;
  }[];
}
