import { Prisma } from '@prisma/client';

export interface PostInputCreate {
  description: string;
  numberMember: number;
  bookingId: number;
  memberPost: Prisma.MemberPostCreateManyPostInput[];
}
