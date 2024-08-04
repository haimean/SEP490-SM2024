import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const statsService = {
  getMonthlyStats: async (branchId: number, month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const startOfPrevMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0);

    const currentMonthBookings = await prisma.booking.findMany({
      where: {
        Court: {
          branchesId: branchId,
        },
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        isDelete: false,
      },
      include: {
        Court: true,
      },
    });

    const prevMonthBookings = await prisma.booking.findMany({
      where: {
        Court: {
          branchesId: branchId,
        },
        startTime: {
          gte: startOfPrevMonth,
          lte: endOfPrevMonth,
        },
        isDelete: false,
      },
      include: {
        Court: true,
      },
    });

    const currentMonthTotalRevenue = currentMonthBookings.reduce((acc, booking) => acc + booking.price, 0);
    const prevMonthTotalRevenue = prevMonthBookings.reduce((acc, booking) => acc + booking.price, 0);

    const currentMonthTotalBookings = currentMonthBookings.length;
    const prevMonthTotalBookings = prevMonthBookings.length;

    const revenueChangePercentage = prevMonthTotalRevenue
      ? ((currentMonthTotalRevenue - prevMonthTotalRevenue) / prevMonthTotalRevenue) * 100
      : null;
    const bookingChangePercentage = prevMonthTotalBookings
      ? ((currentMonthTotalBookings - prevMonthTotalBookings) / prevMonthTotalBookings) * 100
      : null;

    return {
      currentMonthTotalRevenue,
      prevMonthTotalRevenue,
      revenueChangePercentage,
      currentMonthTotalBookings,
      prevMonthTotalBookings,
      bookingChangePercentage,
    };
  },

  getBranchUsageRevenue: async (branchId: number, month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const courts = await prisma.court.findMany({
      where: {
        branchesId: branchId,
      },
      include: {
        booking: {
          where: {
            startTime: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          select: {
            price: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    const usageRevenue = courts.map(court => {
      const totalRevenue = court.booking.reduce((acc, booking) => acc + booking.price, 0);
      const totalUsage = court.booking.length;
      return {
        courtName: court.name,
        totalRevenue,
        totalUsage,
      };
    });

    return usageRevenue;
  },

  getCourtUsageByDay: async (courtId: number, month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const bookings = await prisma.booking.findMany({
      where: {
        courtId: courtId,
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        isDelete: false,
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const usageByDay = Array(7).fill(0); // Khởi tạo mảng chứa số giờ sử dụng theo từng ngày trong tuần
    const bookingsByDay = Array(7).fill(0); // Khởi tạo mảng chứa số lượt đặt theo từng ngày trong tuần

    bookings.forEach((booking) => {
      const dayOfWeek = booking.startTime.getDay();
      const usageHours = (booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60); // Chuyển đổi thời gian sử dụng sang giờ
      usageByDay[dayOfWeek] += usageHours;
      bookingsByDay[dayOfWeek] += 1;
    });

    return { usageByDay, bookingsByDay };
  },

  getCourtUsageByHour: async (courtId: number, month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const bookings = await prisma.booking.findMany({
      where: {
        courtId: courtId,
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        isDelete: false,
      },
    });

    const usageByHour = Array(24 * 7).fill(0); // Tạo mảng 7 ngày, mỗi ngày 24 giờ

    bookings.forEach((booking) => {
      const startDay = booking.startTime.getDay();
      const startHour = new Date(booking.startTime).getHours();
      const endHour = new Date(booking.endTime).getHours();

      for (let hour = startHour; hour <= endHour; hour++) {
        usageByHour[startDay * 24 + hour]++;
      }
    });

    return usageByHour;
  },
};

export default statsService;
