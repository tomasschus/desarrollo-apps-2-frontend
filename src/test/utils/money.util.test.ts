import { formatMoney } from '../../core/utils/money.utils';

describe('money.util', () => {
  describe('formatMoney', () => {
    test('should format number 0 correctly', () => {
      expect(formatMoney(0)).toBe('$ 0,00');
    });

    test('should format number 1 correctly as 1 cent', () => {
      expect(formatMoney(1)).toBe('$ 0,01');
    });

    test('should format number 10 correctly as 10 cents', () => {
      expect(formatMoney(10)).toBe('$ 0,10');
    });

    test('should format number 99 correctly as 99 cents', () => {
      expect(formatMoney(99)).toBe('$ 0,99');
    });

    test('should format number 100 correctly as 1 peso', () => {
      expect(formatMoney(100)).toBe('$ 1,00');
    });

    test('should format number 123 correctly as 1 peso and 23 cents', () => {
      expect(formatMoney(123)).toBe('$ 1,23');
    });

    test('should format number 123456789 correctly as 1.234.567,89 pesos', () => {
      expect(formatMoney(123456789)).toBe('$ 1.234.567,89');
    });

    test('should format number -1 correctly as -1 cent', () => {
      expect(formatMoney(-1)).toBe('-$ 0,01');
    });

    test('should format number -10 correctly as -10 cents', () => {
      expect(formatMoney(-10)).toBe('-$ 0,10');
    });

    test('should format number -99 correctly as -99 cents', () => {
      expect(formatMoney(-99)).toBe('-$ 0,99');
    });

    test('should format number -100 correctly as -1 peso', () => {
      expect(formatMoney(-100)).toBe('-$ 1,00');
    });

    test('should format number 1 correctly as 1 peso with input decimal scale 0', () => {
      expect(formatMoney(1, { inputDecimalScale: 0 })).toBe('$ 1,00');
    });

    test('should format number 1 correctly as 10 cents with input decimal scale 1', () => {
      expect(formatMoney(1, { inputDecimalScale: 1 })).toBe('$ 0,10');
    });

    test('should format number 123 correctly as 1 peso when decimal scale is 0', () => {
      expect(formatMoney(123, { decimalScale: 0 })).toBe('$ 1');
    });

    test('should format number 123 correctly as 1,2 pesos when decimal scale is 1', () => {
      expect(formatMoney(123, { decimalScale: 1 })).toBe('$ 1,2');
    });

    test('should format number 123 correctly as 1,23 pesos when decimal scale is 2', () => {
      expect(formatMoney(123, { decimalScale: 2 })).toBe('$ 1,23');
    });

    test('should format number 199 correctly as 2 pesos when decimal scale is 0', () => {
      expect(formatMoney(199, { decimalScale: 0 })).toBe('$ 2');
    });

    test('should format number 199 correctly as 2,0 pesos when input decimal scale is 1', () => {
      expect(formatMoney(199, { decimalScale: 1 })).toBe('$ 2,0');
    });

    test('should format number 199 correctly as 1,99 pesos when input decimal scale is 2', () => {
      expect(formatMoney(199, { decimalScale: 2 })).toBe('$ 1,99');
    });

    test('should format number -123 correctly as -1 pesos when input decimal scale is 0', () => {
      expect(formatMoney(-123, { decimalScale: 0 })).toBe('-$ 1');
    });

    test('should format number -123 correctly as -1,2 pesos when input decimal scale is 1', () => {
      expect(formatMoney(-123, { decimalScale: 1 })).toBe('-$ 1,2');
    });

    test('should format number -123 correctly as -1,23 pesos when input decimal scale is 2', () => {
      expect(formatMoney(-123, { decimalScale: 2 })).toBe('-$ 1,23');
    });

    test('should format number 123 correctly as 123 pesos with input decimal scale 0', () => {
      expect(formatMoney(123, { inputDecimalScale: 0 })).toBe('$ 123,00');
    });

    test('should format number 123 correctly as 12 pesos and 30 cents with input decimal scale 1', () => {
      expect(formatMoney(123, { inputDecimalScale: 1 })).toBe('$ 12,30');
    });

    test('should swap delimiters when swapDelimiters is true', () => {
      expect(formatMoney(123456789, { swapDelimiters: true })).toBe(
        '$ 1,234,567.89'
      );
    });
  });
});
