import { STATUS_BLOG } from '@prisma/client';

export interface BlogInput {
  accountId: number;
  title: string;
  content: string;
  image: string;
  status: STATUS_BLOG;
}
