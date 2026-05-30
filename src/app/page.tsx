'use client';

import { useState } from 'react';
import { BookingForm } from '@/components/BookingForm/BookingForm';
import { ConfirmationScreen } from '@/components/ConfirmationScreen/ConfirmationScreen';
import type { BookingFormData, BookingStatus } from '@/types/booking';
import { SUBMIT_DELAY_MS } from '@/utils/constants';
import s from './page.module.scss';

export default function Home() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  const handleSubmit = async (data: BookingFormData) => {
    setStatus('loading');
    // Имитация запроса к серверу.
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));
    setBooking(data);
    setStatus('success');
  };

  const handleReset = () => {
    setBooking(null);
    setStatus('idle');
  };

  return (
    <main className={s.page}>
      <section className={s.card}>
        {status === 'success' && booking ? (
          <ConfirmationScreen booking={booking} onReset={handleReset} />
        ) : (
          <>
            <header className={s.header}>
              <p className={s.brand}>SAVEUR</p>
              <h1 className={s.heading}>Бронирование столика</h1>
              <p className={s.lead}>Заполните форму — подтверждение придёт сразу.</p>
            </header>
            <BookingForm
              onSubmit={handleSubmit}
              isSubmitting={status === 'loading'}
            />
          </>
        )}
      </section>
    </main>
  );
}
