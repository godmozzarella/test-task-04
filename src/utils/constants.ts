// Доступные слоты бронирования: 12:00–22:00 с шагом в час. 
export const TIME_SLOTS = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
] as const;

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 12;

// На сколько дней вперёд можно бронировать. 
export const MAX_BOOKING_DAYS_AHEAD = 90;

// Имитация задержки сети при отправке формы. 
export const SUBMIT_DELAY_MS = 1500;
