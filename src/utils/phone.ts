// Форматирует ввод телефона в маску "+7 (999) 676-67-67".
 
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';

  const hasCountryCode = digits.startsWith('7') || digits.startsWith('8');
  const number = (hasCountryCode ? digits.slice(1) : digits).slice(0, 10);

  if (!number) return '+7';

  const area = number.slice(0, 3);
  const prefix = number.slice(3, 6);
  const linePart1 = number.slice(6, 8);
  const linePart2 = number.slice(8, 10);

  let result = '+7';
  if (area) result += ` (${area}`;
  if (area.length === 3) result += ')';
  if (prefix) result += ` ${prefix}`;
  if (linePart1) result += `-${linePart1}`;
  if (linePart2) result += `-${linePart2}`;

  return result;
}
