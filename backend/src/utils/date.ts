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
};
export default dateUtils;
