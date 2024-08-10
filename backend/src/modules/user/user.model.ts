import { Gender } from '@prisma/client';

export interface ProfileUpdatePayload {
  name?: string;
  dob?: Date;
  numberPhone?: string;
  image?: string;
  gender?: Gender;
}
