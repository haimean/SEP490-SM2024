export interface BranchesHostServiceCreate {
  name: string;
  accountId: number;
  addressLongitude: string;
  addressLatitude: string;
  description?: string;
  image?: string;
  attributeBranches: number[];
  court: number[];
}
