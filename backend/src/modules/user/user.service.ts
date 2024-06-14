import database from '../../lib/db.server';
import { ProfileUpdatePayload } from './user.model';

const userService = {
  updateProfile: async (id: number, data: ProfileUpdatePayload) => {
    try {
      return await database.user.update({
        where: {
          accountId: id,
        },
        data: {
          name: data.name,
          dob: data.dob,
          numberPhone: data.numberPhone,
        },
        include: { account: true },
      });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
};
export default userService;
