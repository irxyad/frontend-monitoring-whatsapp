/**
 * Format timestamp menjadi format human-readable (mirip WhatsApp).
 *
 * Support:
 * - Unix timestamp (seconds / milliseconds)
 * - ISO string
 * - Date object
 *
 * @param input - Timestamp dalam bentuk string, number, atau Date
 * @returns String waktu yang sudah diformat
 *
 * @example
 * formatTimestamp(1775837222)
 * // "Kemarin 17:47"
 *
 * @example
 * formatTimestamp(Date.now() - 5 * 60 * 1000)
 * // "5 menit lalu"
 *
 * @example
 * formatTimestamp(new Date())
 * // "Baru saja"
 *
 * @example
 * formatTimestamp('2026-04-07T09:00:00')
 * // "Senin 09:00"
 *
 * @example
 * formatTimestamp('2025-01-12T10:00:00')
 * // "12 Jan 2025"
 */
function formatTimestamp(input: string | number | Date): string {
  const date = normalizeToDate(input);
  if (!date) return '-';

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 10) return 'Baru saja';

  if (diffMin < 60) return `${diffMin} menit lalu`;

  if (isSameDay(now, date)) {
    return formatTime(date);
  }

  if (isYesterday(now, date)) {
    return `Kemarin ${formatTime(date)}`;
  }

  if (diffDay < 7) {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Normalize berbagai format input menjadi Date.
 */
function normalizeToDate(input: string | number | Date): Date | null {
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

  if (typeof input === 'number') {
    // detect seconds vs milliseconds
    const ms = input < 1e12 ? input * 1000 : input;
    const date = new Date(ms);
    return isNaN(date.getTime()) ? null : date;
  }

  if (typeof input === 'string') {
    const num = Number(input);

    // string number (timestamp)
    if (!isNaN(num)) {
      const ms = num < 1e12 ? num * 1000 : num;
      const date = new Date(ms);
      return isNaN(date.getTime()) ? null : date;
    }

    // ISO string
    const date = new Date(input);
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
}

/**
 * Cek apakah dua tanggal di hari yang sama
 */
function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

/**
 * Cek apakah tanggal adalah kemarin
 */
function isYesterday(now: Date, date: Date) {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return yesterday.toDateString() === date.toDateString();
}

/**
 * Format jam (HH:mm)
 */
function formatTime(date: Date) {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
export const DateUtils = {
  formatTimestamp,
};
