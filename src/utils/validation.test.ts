import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
} from './validation';

describe('validateName', () => {
  it('пропускает корректные имена', () => {
    expect(validateName('Иван')).toBeNull();
    expect(validateName('Анна-Мария')).toBeNull();
    expect(validateName('Mary Jane')).toBeNull();
  });

  it('требует непустое значение', () => {
    expect(validateName('')).toBe('Введите имя');
    expect(validateName('   ')).toBe('Введите имя');
  });

  it('требует минимум 2 символа', () => {
    expect(validateName('И')).toBe('Минимум 2 символа');
  });

  it('запрещает цифры и спецсимволы', () => {
    expect(validateName('Иван1')).toBe('Только буквы, пробелы и дефис');
    expect(validateName('John_Doe')).toBe('Только буквы, пробелы и дефис');
  });
});

describe('validatePhone', () => {
  it('пропускает +7 и 8 форматы', () => {
    expect(validatePhone('+79991234567')).toBeNull();
    expect(validatePhone('89991234567')).toBeNull();
  });

  it('пропускает значение с маской (скобки, пробелы, дефисы)', () => {
    expect(validatePhone('+7 (999) 123-45-67')).toBeNull();
  });

  it('требует непустое значение', () => {
    expect(validatePhone('')).toBe('Введите номер телефона');
  });

  it('отклоняет неполный номер', () => {
    expect(validatePhone('+7999123')).not.toBeNull();
  });

  it('отклоняет номер без кода страны 7/8', () => {
    // 11 цифр, но начинается не с 7/8
    expect(validatePhone('99991234567')).not.toBeNull();
  });

  it('отклоняет 10 цифр (без кода страны)', () => {
    expect(validatePhone('9991234567')).not.toBeNull();
  });
});

describe('validateDate', () => {
  // Замораживаем "сегодня", чтобы тесты были стабильны во времени.
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-30T12:00:00'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('пропускает сегодняшнюю дату', () => {
    expect(validateDate('2026-05-30')).toBeNull();
  });

  it('пропускает границу +90 дней', () => {
    expect(validateDate('2026-08-28')).toBeNull();
  });

  it('требует выбранную дату', () => {
    expect(validateDate('')).toBe('Выберите дату');
  });

  it('отклоняет прошедшую дату', () => {
    expect(validateDate('2026-05-29')).toBe('Дата не может быть в прошлом');
  });

  it('отклоняет дату дальше +90 дней', () => {
    expect(validateDate('2026-08-29')).not.toBeNull();
  });
});

describe('validateGuests', () => {
  it('пропускает границы диапазона 1 и 12', () => {
    expect(validateGuests(1)).toBeNull();
    expect(validateGuests(12)).toBeNull();
  });

  it('пропускает значение внутри диапазона', () => {
    expect(validateGuests(6)).toBeNull();
  });

  it('требует выбранное значение (NaN)', () => {
    expect(validateGuests(NaN)).toBe('Укажите количество гостей');
  });

  it('отклоняет выход за диапазон', () => {
    expect(validateGuests(0)).not.toBeNull();
    expect(validateGuests(13)).not.toBeNull();
  });

  it('отклоняет дробное число', () => {
    expect(validateGuests(2.5)).toBe('Должно быть целое число');
  });
});
