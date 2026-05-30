import { MAX_BOOKING_DAYS_AHEAD } from './constants';

// Форматирует дату в строку "YYYY-MM-DD" в локальном времени. 
function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Сегодняшняя дата в формате "YYYY-MM-DD" — нижняя граница бронирования. 
export function getTodayISO(): string {
  return toISODate(new Date());
}

// Максимальная дата бронирования (сегодня + MAX_BOOKING_DAYS_AHEAD дней) в формате "YYYY-MM-DD". 
export function getMaxDateISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + MAX_BOOKING_DAYS_AHEAD);
  return toISODate(date);
}

// Преобразует дату в формат "5 июня 2026 г." для читаемости. 
export function formatDateForDisplay(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
