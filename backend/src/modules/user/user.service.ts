import database from '../../lib/db.server';
import { ProfileUpdatePayload } from './user.model';

const userService = {
  updateProfile: async (id: number, data: ProfileUpdatePayload) => {
    return await database.user.update({
      where: {
        accountId: id,
      },
      data: {
        fullName: data.name,
        gender: data.gender,
        identifierCode: '',
        avatar: data.image,
        dob: data.dob,
        numberPhone: data.numberPhone,
      },
      include: { account: true },
    });
  },
};
export default userService;
