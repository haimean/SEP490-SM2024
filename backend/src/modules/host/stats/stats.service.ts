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
      // Điều chỉnh múi giờ bằng cách trừ đi 7 giờ
      const adjustedStartTime = new Date(booking.startTime.getTime() - 7 * 60 * 60 * 1000);
      const adjustedEndTime = new Date(booking.endTime.getTime() - 7 * 60 * 60 * 1000);
  
      // Lấy ngày trong tuần sau khi đã điều chỉnh múi giờ
      const dayOfWeek = adjustedStartTime.getDay();
      // Chuyển đổi thời gian sử dụng sang giờ sau khi đã điều chỉnh múi giờ
      const usageHours = (adjustedEndTime.getTime() - adjustedStartTime.getTime()) / (1000 * 60 * 60);
  
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
      // Chuyển đổi thời gian sang mili giây, trừ đi 7 giờ
      const adjustedStartTime = new Date(booking.startTime.getTime() - 7 * 60 * 60 * 1000);
      const adjustedEndTime = new Date(booking.endTime.getTime() - 7 * 60 * 60 * 1000);
    
      // Lấy ngày và giờ sau khi điều chỉnh múi giờ
      const startDay = adjustedStartTime.getDay();
      const startHour = adjustedStartTime.getHours();
      const endHour = adjustedEndTime.getHours();
    
      console.log(startDay, adjustedStartTime, startHour);
    
      for (let hour = startHour; hour <= endHour; hour++) {
        usageByHour[startDay * 24 + hour]++;
      }
    });
    

    return usageByHour;
  },
};

export default statsService;
