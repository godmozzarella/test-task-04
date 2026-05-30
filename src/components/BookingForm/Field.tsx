import type { ReactNode } from 'react';
import s from './BookingForm.module.scss';

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className={s.field}>
      <label htmlFor={htmlFor} className={s.label}>
        {label}
      </label>
      {children}
      {error && (
        <span className={s.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
