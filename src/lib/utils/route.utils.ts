/**
 * Remove parent path from route
 * Ini digunakan saat ingin navigasi
 */
function removeParent(route: string): string {
  // contoh. /messaging/inbox-and-send
  const parts = route.split('/').filter(Boolean); // filter buat menghilangkan string kosong
  // displit jadi  ['messaging', 'inbox-and-send']

  if (parts.length >= 2) {
    parts.splice(0, 1); // hapus 'messaging'
  }

  // hasil 'inbox-and-send'
  return parts.join('/');
}

export const RouteUtils = {
  removeParent,
};
