import dateUtils from './date';

describe('dateUtils', () => {
  describe('getLastWeekend', () => {
    it('should return the last Saturday and Sunday of the week', () => {
      const date = new Date('2024-08-15'); // Thứ Năm, 15/08/2024
      const { lastSaturday, lastSunday } =
        dateUtils.getLastWeekend(date);

      expect(lastSaturday.toDateString()).toBe(
        new Date('2024-08-17').toDateString()
      ); // Thứ Bảy, 10/08/2024
      expect(lastSunday.toDateString()).toBe(
        new Date('2024-08-11').toDateString()
      ); // Chủ Nhật, 11/08/2024
    });
  });

  describe('timeToDate', () => {
    it('should convert time string to Date object with correct hours and minutes', () => {
      const time = '14:30';
      const result = dateUtils.timeToDate(time);

      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });
  });

  describe('getDateStartAndEndOfMonth', () => {
    it('should return the start and end of the previous month', () => {
      const date = new Date('2024-08-15'); // Tháng 8, 2024
      const { gte, lt } = dateUtils.getDateStartAndEndOfMonth(date);

      expect(gte.toDateString()).toBe(
        new Date('2024-07-01').toDateString()
      );
      expect(lt.toDateString()).toBe(
        new Date('2024-08-01').toDateString()
      );
    });

    it('should return the correct start and end when the month is January', () => {
      const date = new Date('2024-01-15'); // Tháng 1, 2024
      const { gte, lt } = dateUtils.getDateStartAndEndOfMonth(date);

      expect(gte.toDateString()).toBe(
        new Date('2023-12-01').toDateString()
      );
      expect(lt.toDateString()).toBe(
        new Date('2024-01-01').toDateString()
      );
    });
  });

  describe('getList12Month', () => {
    it('should return the last 12 months starting from the current month', () => {
      const result = dateUtils.getList12Month();
      expect(result).toHaveLength(12);
      expect(result[0].getMonth()).toBe(new Date().getMonth() + 1);
    });
  });

  describe('areHoursWithinOpeningClosingHours', () => {
    it('should return true if the times are within opening and closing hours', () => {
      const startTime = new Date('2024-08-15T09:00:00Z');
      const endTime = new Date('2024-08-15T17:00:00Z');
      const openingHours = '08:00';
      const closingHours = '18:00';

      const result = dateUtils.areHoursWithinOpeningClosingHours(
        startTime,
        endTime,
        openingHours,
        closingHours
      );

      expect(result).toBe(true);
    });

    it('should return false if the times are outside opening and closing hours', () => {
      const startTime = new Date('2024-08-15T07:00:00Z');
      const endTime = new Date('2024-08-15T19:00:00Z');
      const openingHours = '08:00';
      const closingHours = '18:00';

      const result = dateUtils.areHoursWithinOpeningClosingHours(
        startTime,
        endTime,
        openingHours,
        closingHours
      );

      expect(result).toBe(false);
    });
  });
});
