'use client';

import { useState } from 'react';
import { BookingForm } from '@/components/BookingForm/BookingForm';
import { ConfirmationScreen } from '@/components/ConfirmationScreen/ConfirmationScreen';
import type { BookingFormData } from '@/types/booking';
import s from './page.module.scss';

export default function Home() {
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  return (
    <main className={s.page}>
      <section className={s.card}>
        {booking ? (
          <ConfirmationScreen
            booking={booking}
            onReset={() => setBooking(null)}
          />
        ) : (
          <>
            <header className={s.header}>
              <p className={s.brand}>SAVEUR</p>
              <h1 className={s.heading}>Бронирование столика</h1>
              <p className={s.lead}>Заполните форму — подтверждение придёт сразу.</p>
            </header>
            <BookingForm onSuccess={setBooking} />
          </>
        )}
      </section>
    </main>
  );
}
