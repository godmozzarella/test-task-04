'use client';

import { useState } from 'react';
import { BookingForm } from '@/components/BookingForm/BookingForm';
import { ConfirmationScreen } from '@/components/ConfirmationScreen/ConfirmationScreen';
import type { BookingFormData } from '@/types/booking';

export default function Home() {
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  return (
    <main>
      {booking ? (
        <ConfirmationScreen booking={booking} onReset={() => setBooking(null)} />
      ) : (
        <>
          <header>
            <p>SAVEUR</p>
            <h1>Бронирование столика</h1>
            <p>Заполните форму — подтверждение придёт сразу.</p>
          </header>
          <BookingForm onSuccess={setBooking} />
        </>
      )}
    </main>
  );
}
