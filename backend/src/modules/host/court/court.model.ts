export interface CourtPayload {
  id: number;
  name: string;
  branchesId: number;
  typeCourtId: number;
}

export interface CreateCourt {
  name: string;
  branchesId: number;
  typeCourtId: number;
}
