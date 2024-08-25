const dateUtils = {
  getLastWeekend(date: Date): {
    lastSaturday: Date;
    lastSunday: Date;
  } {
    // Lấy ngày trong tuần (0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy)
    const dayOfWeek = date.getDay();

    // Tính ngày Chủ Nhật tuần trước
    const lastSunday = new Date(date);
    lastSunday.setDate(date.getDate() - dayOfWeek);

    // Tính ngày Thứ Bảy tuần trước
    const lastSaturday = new Date(lastSunday);
    lastSaturday.setDate(lastSunday.getDate() + 6);

    return { lastSaturday, lastSunday };
  },

  timeToDate(time: string): Date {
    // Tạo đối tượng Date mới với ngày hiện tại
    const currentDate = new Date();
    // Tách giờ và phút từ chuỗi
    const [hours, minutes] = time.split(':').map(Number);
    // Cập nhật giờ và phút cho đối tượng Date
    currentDate.setHours(Number(hours), Number(minutes), 0, 0); // giờ, phút, giây, milliseconds
    return currentDate;
  },

  getDateStartAndEndOfMonth(date: Date): {
    gte: Date;
    lt: Date;
  } {
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month == 1) {
      return {
        gte: new Date(year - 1, 12, 1),
        lt: new Date(year, month, 1),
      };
    } else {
      return {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }
  },

  getList12Month(): Date[] {
    //  - lấy được tháng hiện tại new Date
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    // - lấy được 1 mảng 12 tháng gần nhất
    const listMonth = [];
    const listMonthPrevious = [];
    for (let index = 0; index < 12; index++) {
      if (index > month) {
        listMonthPrevious.push(new Date(year - 1, index));
      } else {
        listMonth.push(new Date(year, index));
      }
    }
    // sắp xếp lại mảng trên theo cái kia
    return [...listMonthPrevious, ...listMonth];
  },
  areHoursWithinOpeningClosingHours(
    startTimeStr: Date,
    endTimeStr: Date,
    openingHours: string,
    closingHours: string
  ): boolean {
    const openingTime = new Date(
      `1970-01-01T${openingHours}:00Z`
    ).getTime();
    const closingTime = new Date(
      `1970-01-01T${closingHours}:00Z`
    ).getTime();

    const startTime =
      new Date(startTimeStr).getUTCHours() * 60 +
      new Date(startTimeStr).getUTCMinutes();
    const endTime =
      new Date(endTimeStr).getUTCHours() * 60 +
      new Date(endTimeStr).getUTCMinutes();

    const openingMinutes =
      new Date(openingTime).getUTCHours() * 60 +
      new Date(openingTime).getUTCMinutes();
    const closingMinutes =
      new Date(closingTime).getUTCHours() * 60 +
      new Date(closingTime).getUTCMinutes();

    return startTime >= openingMinutes && endTime <= closingMinutes;
  },
};
export default dateUtils;
