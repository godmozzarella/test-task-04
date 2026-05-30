import { describe, expect, it } from 'vitest';
import { formatPhone } from './phone';

describe('formatPhone', () => {
  it('показывает +7 сразу после кода страны', () => {
    expect(formatPhone('8')).toBe('+7');
    expect(formatPhone('7')).toBe('+7');
  });

  it('приводит 8 и 7 к единому формату +7', () => {
    expect(formatPhone('89991234567')).toBe('+7 (999) 123-45-67');
    expect(formatPhone('79991234567')).toBe('+7 (999) 123-45-67');
  });

  it('подставляет код страны для номера без него', () => {
    expect(formatPhone('9991234567')).toBe('+7 (999) 123-45-67');
  });

  it('идемпотентен на уже отформатированном значении', () => {
    expect(formatPhone('+7 (999) 123-45-67')).toBe('+7 (999) 123-45-67');
  });

  it('обрезает лишние цифры до 10', () => {
    expect(formatPhone('899912345678999')).toBe('+7 (999) 123-45-67');
  });

  it('форматирует частичный ввод', () => {
    expect(formatPhone('8999')).toBe('+7 (999)');
    expect(formatPhone('899912')).toBe('+7 (999) 12');
  });

  it('возвращает пустую строку, когда цифр не осталось (стирание)', () => {
    expect(formatPhone('')).toBe('');
    expect(formatPhone('+')).toBe('');
  });
});
