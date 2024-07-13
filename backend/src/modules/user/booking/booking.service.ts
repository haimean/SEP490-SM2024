import database from '../../../lib/db.server';

const bookingUserService = {
  remove: async (id: number, accountId: number) => {
    return await database.booking.update({
      where: {
        id,
        accountId,
      },
      data: {
        isDelete: true,
      },
    });
  },
};

export default bookingUserService;
