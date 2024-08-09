import { Prisma } from '@prisma/client';

export interface PostInputCreate {
  title: string;
  description: string;
  numberMember: number;
  bookingId: number;
  memberPost: Prisma.MemberPostCreateManyPostInput[];
}
