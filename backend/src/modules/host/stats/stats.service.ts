import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const statsService = {
  getMonthlyStats: async (branchId: number, month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const startOfPrevMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0);
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);

    const currentMonthBookings = await prisma.booking.findMany({
      where: {
        Court: {
          branchesId: branchId,
        },
        startTime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        endTime: {
          lte: currentTime,
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
        endTime: {
          lte: currentTime, // Sử dụng thời gian hiện tại đã điều chỉnh
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
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
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
            endTime: {
              lte: currentTime, // Sử dụng thời gian hiện tại đã điều chỉnh
            },
            isDelete: false,
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

  getCourtUsageByDay: async (courtId: number | string, month: Date, branchId: number) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
    let courtIds: number[] = [];
    if (courtId === "all") {
        const courts = await prisma.court.findMany({
            where: {
                branchesId: branchId,
            },
            select: {
                id: true,
            },
        });
        courtIds = courts.map(court => court.id);
    } else {
        courtIds = [Number(courtId)];
    }

    const bookings = await prisma.booking.findMany({
        where: {
            courtId: {
                in: courtIds,
            },
            startTime: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
            endTime: {
                lte: currentTime,
            },
            isDelete: false,
        },
        select: {
            startTime: true,
            endTime: true,
        },
    });

    const usageByDay = Array(7).fill(0);
    const bookingsByDay = Array(7).fill(0);

    bookings.forEach((booking) => {
        const adjustedStartTime = new Date(booking.startTime.getTime() - 7 * 60 * 60 * 1000);
        const adjustedEndTime = new Date(booking.endTime.getTime() - 7 * 60 * 60 * 1000);

        // Chỉ tính toán khi adjustedEndTime lớn hơn adjustedStartTime
        if (adjustedEndTime > adjustedStartTime) {
            const dayOfWeek = adjustedStartTime.getDay();
            const usageHours = (adjustedEndTime.getTime() - adjustedStartTime.getTime()) / (1000 * 60 * 60);

            usageByDay[dayOfWeek] += usageHours;
            bookingsByDay[dayOfWeek] += 1;
        }
    });

    return { usageByDay, bookingsByDay };
},
  

  getCourtUsageByHour: async (courtId: number | string, month: Date, branchId: number) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
        let courtIds: number[] = [];
    if (courtId === "all") {
        const courts = await prisma.court.findMany({
            where: {
                branchesId: branchId,
            },
            select: {
                id: true,
            },
        });
        courtIds = courts.map(court => court.id);
    } else {
        courtIds = [Number(courtId)];
    }

    const bookings = await prisma.booking.findMany({
        where: {
            courtId: {
                in: courtIds,
            },
            startTime: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
            endTime: {
                lte: currentTime,
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
    
      // const startMinutes = adjustedStartTime.getMinutes();
      // const endMinutes = adjustedEndTime.getMinutes();
    
      // // Tính toán phần thời gian trong giờ đầu tiên
      // usageByHour[startDay * 24 + startHour] += (60 - startMinutes) / 60;
    
      // // Tính toán phần thời gian trong giờ cuối cùng
      // if (startHour !== endHour) {
      //   usageByHour[startDay * 24 + endHour] += endMinutes / 60;
      // }
    
      // for (let hour = startHour + 1; hour < endHour; hour++) {
      //   usageByHour[startDay * 24 + hour]++;
      // }
      console.log(adjustedEndTime.getMinutes() >0);
      
      for (let hour = startHour; hour < endHour; hour++) {
        usageByHour[startDay * 24 + hour] += 1;
      }
      
      if (adjustedEndTime.getMinutes() > 0) {
        usageByHour[startDay * 24 + endHour] += 1;
      }
    });
    

    return usageByHour;
  },
};

export default statsService;
