import { applyDecimalScale } from '../../core/utils/number.utils';

describe('number.util', () => {
  describe('applyDecimalScale', () => {
    test('should work for number 0 and decimal scale 0', () => {
      expect(applyDecimalScale(0, 0)).toEqual(['0', '']);
    });

    test('should work for number 0 and decimal scale 1', () => {
      expect(applyDecimalScale(0, 1)).toEqual(['0', '0']);
    });

    test('should work for number 0 and decimal scale 2', () => {
      expect(applyDecimalScale(0, 2)).toEqual(['0', '00']);
    });

    test('should work for number 0 and decimal scale -1', () => {
      expect(applyDecimalScale(0, -1)).toEqual(['00', '']);
    });

    test('should work for number 0 and decimal scale -2', () => {
      expect(applyDecimalScale(0, -2)).toEqual(['000', '']);
    });

    test('should work for number 1 and decimal scale 0', () => {
      expect(applyDecimalScale(1, 0)).toEqual(['1', '']);
    });

    test('should work for number 1 and decimal scale 1', () => {
      expect(applyDecimalScale(1, 1)).toEqual(['0', '1']);
    });

    test('should work for number 1 and decimal scale 2', () => {
      expect(applyDecimalScale(1, 2)).toEqual(['0', '01']);
    });

    test('should work for number 1 and decimal scale -1', () => {
      expect(applyDecimalScale(1, -1)).toEqual(['10', '']);
    });

    test('should work for number 1 and decimal scale -2', () => {
      expect(applyDecimalScale(1, -2)).toEqual(['100', '']);
    });

    test('should work for number -1 and decimal scale 0', () => {
      expect(applyDecimalScale(-1, 0)).toEqual(['-1', '']);
    });

    test('should work for number -1 and decimal scale 1', () => {
      expect(applyDecimalScale(-1, 1)).toEqual(['-0', '1']);
    });

    test('should work for number -1 and decimal scale 2', () => {
      expect(applyDecimalScale(-1, 2)).toEqual(['-0', '01']);
    });

    test('should work for number -1 and decimal scale -1', () => {
      expect(applyDecimalScale(-1, -1)).toEqual(['-10', '']);
    });

    test('should work for number -1 and decimal scale -2', () => {
      expect(applyDecimalScale(-1, -2)).toEqual(['-100', '']);
    });

    test('should work for number 123.45 and decimal scale 0', () => {
      expect(applyDecimalScale(123.45, 0)).toEqual(['123', '45']);
    });

    test('should work for number 123.45 and decimal scale 1', () => {
      expect(applyDecimalScale(123.45, 1)).toEqual(['12', '345']);
    });

    test('should work for number 123.45 and decimal scale 2', () => {
      expect(applyDecimalScale(123.45, 2)).toEqual(['1', '2345']);
    });

    test('should work for number 123.45 and decimal scale -1', () => {
      expect(applyDecimalScale(123.45, -1)).toEqual(['1234', '5']);
    });

    test('should work for number 123.45 and decimal scale -2', () => {
      expect(applyDecimalScale(123.45, -2)).toEqual(['12345', '']);
    });

    test('should work for number -123.45 and decimal scale 0', () => {
      expect(applyDecimalScale(-123.45, 0)).toEqual(['-123', '45']);
    });

    test('should work for number -123.45 and decimal scale 1', () => {
      expect(applyDecimalScale(-123.45, 1)).toEqual(['-12', '345']);
    });

    test('should work for number -123.45 and decimal scale 2', () => {
      expect(applyDecimalScale(-123.45, 2)).toEqual(['-1', '2345']);
    });

    test('should work for number -123.45 and decimal scale -1', () => {
      expect(applyDecimalScale(-123.45, -1)).toEqual(['-1234', '5']);
    });

    test('should work for number -123.45 and decimal scale -2', () => {
      expect(applyDecimalScale(-123.45, -2)).toEqual(['-12345', '']);
    });

    test('should work for string "123.45" and decimal scale 0', () => {
      expect(applyDecimalScale('123.45', 0)).toEqual(['123', '45']);
    });

    test('should work for string "123.45" and decimal scale 1', () => {
      expect(applyDecimalScale('123.45', 1)).toEqual(['12', '345']);
    });

    test('should work for string "123.45" and decimal scale 2', () => {
      expect(applyDecimalScale('123.45', 2)).toEqual(['1', '2345']);
    });

    test('should work for string "123.45" and decimal scale -1', () => {
      expect(applyDecimalScale('123.45', -1)).toEqual(['1234', '5']);
    });

    test('should work for string "123.45" and decimal scale -2', () => {
      expect(applyDecimalScale('123.45', -2)).toEqual(['12345', '']);
    });

    test('should fail for NaN', () => {
      expect(() => applyDecimalScale(NaN, 0)).toThrow();
    });
  });
});
