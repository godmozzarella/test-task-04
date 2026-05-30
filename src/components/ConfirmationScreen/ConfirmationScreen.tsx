import type { BookingFormData } from '@/types/booking';
import { formatDateForDisplay } from '@/utils/date';
import s from './ConfirmationScreen.module.scss';

interface ConfirmationScreenProps {
  booking: BookingFormData;
  onReset: () => void;
}

export function ConfirmationScreen({
  booking,
  onReset,
}: ConfirmationScreenProps) {
  const details = [
    { label: 'Имя', value: booking.name },
    { label: 'Дата', value: formatDateForDisplay(booking.date) },
    { label: 'Время', value: booking.time },
    { label: 'Гостей', value: String(booking.guests) },
  ];

  return (
    <div className={s.screen}>
      <div className={s.icon} aria-hidden>
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 className={s.title}>Столик забронирован</h2>
      <p className={s.subtitle}>Ждём вас в гости</p>

      <dl className={s.details}>
        {details.map(({ label, value }) => (
          <div className={s.row} key={label}>
            <dt className={s.term}>{label}</dt>
            <dd className={s.value}>{value}</dd>
          </div>
        ))}
      </dl>

      <button type="button" className={s.reset} onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
