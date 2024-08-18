import { getRandomInt } from './number';

describe('getRandomInt', () => {
  it('should return a number within the range 0 to max-1', () => {
    const max = 10;
    for (let i = 0; i < 1000; i++) {
      const result = getRandomInt(max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
    }
  });

  it('should return 0 when max is 1', () => {
    const max = 1;
    const result = getRandomInt(max);
    expect(result).toBe(0);
  });

  it('should handle large max values', () => {
    const max = 1000000;
    const result = getRandomInt(max);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(max);
  });

  it('should return a random number within the specified range', () => {
    const max = 5;
    const results = new Set<number>();
    for (let i = 0; i < 1000; i++) {
      results.add(getRandomInt(max));
    }
    // Kiểm tra xem tất cả các giá trị từ 0 đến max-1 đều có thể được tạo ra
    for (let i = 0; i < max; i++) {
      expect(results.has(i)).toBe(true);
    }
  });

  it('should always return an integer', () => {
    const max = 50;
    for (let i = 0; i < 1000; i++) {
      const result = getRandomInt(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});
