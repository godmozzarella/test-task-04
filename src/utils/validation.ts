import { MAX_BOOKING_DAYS_AHEAD, MAX_GUESTS, MIN_GUESTS } from './constants';
import { getMaxDateISO, getTodayISO } from './date';

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s-]+$/;

//Валидация на имя 
export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Введите имя';
  if (trimmed.length < 2) return 'Минимум 2 символа';
  if (!NAME_PATTERN.test(trimmed)) return 'Только буквы, пробелы и дефис';
  return null;
}

// Валидация на номер телефона
export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Введите номер телефона';
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }
  return 'Введите корректный номер: +7 или 8, 10 цифр';
}

//Валидация на дату бронирования
export function validateDate(value: string): string | null {
  if (!value) return 'Выберите дату';
  if (value < getTodayISO()) return 'Дата не может быть в прошлом';
  if (value > getMaxDateISO()) {
    return `Не позднее ${MAX_BOOKING_DAYS_AHEAD} дней от сегодня`;
  }
  return null;
}

//Валидация на гостей
export function validateGuests(value: number): string | null {
  if (Number.isNaN(value)) return 'Укажите количество гостей';
  if (!Number.isInteger(value)) return 'Должно быть целое число';
  if (value < MIN_GUESTS || value > MAX_GUESTS) {
    return `От ${MIN_GUESTS} до ${MAX_GUESTS} гостей`;
  }
  return null;
}
