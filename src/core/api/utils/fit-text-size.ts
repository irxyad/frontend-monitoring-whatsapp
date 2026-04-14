// utils buat auto size jika karaakternya terlalu panjang
// dan sizenya dapat dikondisikan

/**
 * nyesuain ukuran teks berdasarkan panjang karakter.
 *
 * contoh threshold:
 * { maxLength: 3, className: 'text-lg' }
 *
 * artinya: jika panjang karakter <= 3, maka akan make size 'text-lg'.
 * selain dari ittu maka akan make size dari className.
 */
export function fitTextSize(
  value: string | number,
  thresholds: { maxLength: number; className: string }[] = [{ maxLength: 2, className: 'text-xl' }]
): string {
  const length = String(value).length;
  return (
    thresholds.find((t) => length <= t.maxLength)?.className ??
    thresholds[thresholds.length - 1].className
  );
}
