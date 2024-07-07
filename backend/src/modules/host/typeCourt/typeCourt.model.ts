export interface TypeCourtHostServiceCreatePayload {
  accountId: number;
  name: string;
  image?: string;
  description?: string;
  attributeCourtIds?: number[];
}
