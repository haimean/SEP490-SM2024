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
