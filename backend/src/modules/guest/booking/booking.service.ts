import database from '../../../lib/db.server';

const bookingGuestService = {
  getBookingPost: async () => {
    return await database.booking.findMany({
      where: {
        startTime: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
        courtId: {
          not: null,
        },
      },
      include: {
        bookingInfo: true,
        Court: {
          include: {
            Branches: {
              include: {
                attributeBranches: {
                  include: {
                    attributeKeyBranches: true,
                  },
                },
                address: true,
              },
            },
            TypeCourt: true,
          },
        },
      },
    });
  },
};

export default bookingGuestService;
