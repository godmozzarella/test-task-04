'use client';

import { useForm } from 'react-hook-form';
import type { BookingFormData } from '@/types/booking';
import { MAX_GUESTS, MIN_GUESTS, TIME_SLOTS } from '@/utils/constants';
import { getMaxDateISO, getTodayISO } from '@/utils/date';
import { formatPhone } from '@/utils/phone';
import {
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
} from '@/utils/validation';
import { Field } from './Field';
import s from './BookingForm.module.scss';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
}

const GUEST_OPTIONS = Array.from(
  { length: MAX_GUESTS - MIN_GUESTS + 1 },
  (_, index) => MIN_GUESTS + index,
);

export function BookingForm({ onSubmit, isSubmitting }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({ mode: 'onBlur' });

  // handleSubmit прогоняет валидацию и вызывает onSubmit только на валидных данных.
  const handleFormSubmit = handleSubmit((data) => onSubmit(data));

  const controlClass = (hasError: boolean) =>
    hasError ? `${s.control} ${s.controlError}` : s.control;

  // Телефон регистрируем отдельно, чтобы наложить маску поверх onChange.
  const phoneField = register('phone', {
    validate: (value) => validatePhone(value) ?? true,
  });

  return (
    <form className={s.form} onSubmit={handleFormSubmit} noValidate>
      <Field label="Имя гостя" htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          placeholder="Ваше имя"
          aria-invalid={!!errors.name}
          className={controlClass(!!errors.name)}
          {...register('name', { validate: (value) => validateName(value) ?? true })}
        />
      </Field>

      <Field label="Телефон" htmlFor="phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          placeholder="+7 (999) 676-67-67"
          aria-invalid={!!errors.phone}
          className={controlClass(!!errors.phone)}
          {...phoneField}
          onChange={(event) => {
            event.target.value = formatPhone(event.target.value);
            phoneField.onChange(event);
          }}
        />
      </Field>

      <Field label="Дата" htmlFor="date" error={errors.date?.message}>
        <input
          id="date"
          type="date"
          min={getTodayISO()}
          max={getMaxDateISO()}
          aria-invalid={!!errors.date}
          className={controlClass(!!errors.date)}
          {...register('date', { validate: (value) => validateDate(value) ?? true })}
        />
      </Field>

      <Field label="Время" htmlFor="time" error={errors.time?.message}>
        <select
          id="time"
          defaultValue=""
          aria-invalid={!!errors.time}
          className={controlClass(!!errors.time)}
          {...register('time', { required: 'Выберите время' })}
        >
          <option value="" disabled>
            Выберите время
          </option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Количество гостей"
        htmlFor="guests"
        error={errors.guests?.message}
      >
        <select
          id="guests"
          defaultValue=""
          aria-invalid={!!errors.guests}
          className={controlClass(!!errors.guests)}
          {...register('guests', {
            valueAsNumber: true,
            validate: (value) => validateGuests(value) ?? true,
          })}
        >
          <option value="" disabled>
            Выберите количество
          </option>
          {GUEST_OPTIONS.map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </Field>

      <button type="submit" className={s.submit} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={s.spinner} aria-hidden />
            Бронирую…
          </>
        ) : (
          'Забронировать'
        )}
      </button>
    </form>
  );
}
