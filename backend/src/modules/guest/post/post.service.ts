import database from '../../../lib/db.server';

const postGuestService = {
  get: async (id: number): Promise<any> => {
    return await database.post.findUnique({
      where: {
        id,
      },
      include: {
        booking: {
          include: {
            Court: {
              include: {
                TypeCourt: true,
                Branches: {
                  include: {
                    attributeBranches: true,
                    address: true,
                    account: true,
                  },
                },
              },
            },
            bookingInfo: true,
          },
        },
        memberPost: true,
        invitation: true,
      },
    });
  },
};

export default postGuestService;
