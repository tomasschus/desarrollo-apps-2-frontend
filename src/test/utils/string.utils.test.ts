import {
  exchangeChars,
  firstLetterToUpperCase,
  hashCode,
  normalizeDecimalNumber,
  removeAccents,
  toKebabCase,
} from '../../core/utils/string.utils';

describe('string.util', () => {
  describe('hashCode', () => {
    it('should return a hash code from a string', () => {
      expect(hashCode('')).toBe(0);
      expect(hashCode('a')).toBe(97);
      expect(hashCode('abc')).toBe(96354);
      expect(hashCode('abc123')).toBe(-1424436592);
    });
  });

  describe('normalizeDecimalNumber', () => {
    it('should return a string representing the number with a dot as a decimal separator', () => {
      expect(normalizeDecimalNumber('')).toBe('');
      expect(normalizeDecimalNumber('123')).toBe('123');
      expect(normalizeDecimalNumber('123.45')).toBe('123.45');
      expect(normalizeDecimalNumber('123,45')).toBe('123.45');
      expect(normalizeDecimalNumber('123,45.67')).toBe('123.4567');
      expect(normalizeDecimalNumber('abc')).toBe('');
      expect(normalizeDecimalNumber('abc123')).toBe('123');
      expect(normalizeDecimalNumber('abc123!@#')).toBe('123');
    });
  });

  describe('exchangeChars', () => {
    it('should exchange two characters in a string', () => {
      expect(exchangeChars('abc', 'a', 'b')).toBe('bac');
      expect(exchangeChars('abc', 'a', 'c')).toBe('cba');
      expect(exchangeChars('abc', 'b', 'c')).toBe('acb');
      expect(exchangeChars('abc', 'd', 'e')).toBe('abc');
    });
  });

  describe('removeAccents', () => {
    it('should remove accents from a string', () => {
      expect(removeAccents('áéíóú')).toBe('aeiou');
      expect(removeAccents('àèìòù')).toBe('aeiou');
      expect(removeAccents('âêîôû')).toBe('aeiou');
      expect(removeAccents('äëïöü')).toBe('aeiou');
      expect(removeAccents('ãẽĩõũ')).toBe('aeiou');
      expect(removeAccents('āēīōū')).toBe('aeiou');
      expect(removeAccents('ăĕĭŏŭ')).toBe('aeiou');
      expect(removeAccents('ç')).toBe('c');
      expect(removeAccents('ñ')).toBe('n');
    });
  });

  describe('toKebabCase', () => {
    it('should return a kebab case string', () => {
      expect(toKebabCase('')).toBe('');
      expect(toKebabCase('abc')).toBe('abc');
      expect(toKebabCase('abcDef')).toBe('abc-def');
      expect(toKebabCase('abcDefGhi')).toBe('abc-def-ghi');
      expect(toKebabCase('abcDefGhiJkl')).toBe('abc-def-ghi-jkl');
      expect(toKebabCase('abcDefGhiJklMno')).toBe('abc-def-ghi-jkl-mno');
      expect(toKebabCase('abcDefGhiJklMnoPqr')).toBe('abc-def-ghi-jkl-mno-pqr');
      expect(toKebabCase('abcDefGhiJklMnoPqrStu')).toBe(
        'abc-def-ghi-jkl-mno-pqr-stu'
      );
      expect(toKebabCase('abcDefGhiJklMnoPqrStuVwx')).toBe(
        'abc-def-ghi-jkl-mno-pqr-stu-vwx'
      );
      expect(toKebabCase('abcDefGhiJklMnoPqrStuVwxYz')).toBe(
        'abc-def-ghi-jkl-mno-pqr-stu-vwx-yz'
      );
      expect(toKebabCase('abcDefGhiJklMnoPqrStuVwxYzA')).toBe(
        'abc-def-ghi-jkl-mno-pqr-stu-vwx-yz-a'
      );
      expect(toKebabCase('abcDefGhiJklMnoPqrStuVwxYzA')).toBe(
        'abc-def-ghi-jkl-mno-pqr-stu-vwx-yz-a'
      );
    });
  });

  describe('firstLetterToUpperCase', () => {
    it('should return a string with the first letter in uppercase', () => {
      expect(firstLetterToUpperCase('')).toBe('');
      expect(firstLetterToUpperCase('abc')).toBe('Abc');
      expect(firstLetterToUpperCase('abcDef')).toBe('AbcDef');
      expect(firstLetterToUpperCase('abcDefGhi')).toBe('AbcDefGhi');
      expect(firstLetterToUpperCase('abcDefGhiJkl')).toBe('AbcDefGhiJkl');
      expect(firstLetterToUpperCase('abcDefGhiJklMno')).toBe('AbcDefGhiJklMno');
      expect(firstLetterToUpperCase('abcDefGhiJklMnoPqr')).toBe(
        'AbcDefGhiJklMnoPqr'
      );
    });
  });
});
