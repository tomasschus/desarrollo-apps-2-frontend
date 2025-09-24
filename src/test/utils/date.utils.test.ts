import {
  incrementDateByDays,
  getDaysInMonth,
} from '../../core/utils/date.utils';

describe('date.utils', () => {
  describe('getDaysInMonth', () => {
    test('should return the correct number of days for January', () => {
      const date = new Date(2023, 0, 5);
      expect(getDaysInMonth(date)).toBe(31);
    });

    test('should return the correct number of days for February', () => {
      const date = new Date(2023, 1, 6);
      expect(getDaysInMonth(date)).toBe(28);
    });

    test('should return the correct number of days for February in a leap year', () => {
      const date = new Date(2024, 1, 10);
      expect(getDaysInMonth(date)).toBe(29);
    });

    test('should return the correct number of days for April', () => {
      const date = new Date(2023, 3, 22);
      expect(getDaysInMonth(date)).toBe(30);
    });

    test('should return the correct number of days for December', () => {
      const date = new Date(2023, 11, 30);
      expect(getDaysInMonth(date)).toBe(31);
    });
  });

  describe('incrementDateByDays', () => {
    test('should add days correctly', () => {
      const date = new Date(2023, 0, 1);
      const result = incrementDateByDays(date, 5);
      expect(result).toEqual(new Date(2023, 0, 6));
    });

    test('should handle negative values correctly', () => {
      const date = new Date(2023, 0, 15);
      const result = incrementDateByDays(date, -10);
      expect(result).toEqual(new Date(2023, 0, 5));
    });

    test('should handle month rollover correctly', () => {
      const date = new Date(2023, 0, 31);
      const result = incrementDateByDays(date, 3);
      expect(result).toEqual(new Date(2023, 1, 3));
    });

    test('should handle year rollover correctly', () => {
      const date = new Date(2023, 11, 31);
      const result = incrementDateByDays(date, 3);
      expect(result).toEqual(new Date(2024, 0, 3));
    });

    test('should handle leap year correctly', () => {
      const date = new Date(2024, 1, 28);
      const result = incrementDateByDays(date, 1);
      expect(result).toEqual(new Date(2024, 1, 29));
    });

    test('should return a new Date object', () => {
      const date = new Date(2023, 0, 1);
      const result = incrementDateByDays(date, 0);
      expect(result).not.toBe(date);
      expect(result).toEqual(date);
    });
  });
});
