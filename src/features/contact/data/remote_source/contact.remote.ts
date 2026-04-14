import { apiGet, apiPost } from '@/core/api/config/http-client';
import { ApiResult } from '@/core/api/types/api-response.types';
import { ContactInfo } from '../../domain/types/contact.type';
import { CONTACT_ENDPOINTS } from './contact.endpoint';

async function getContacts(sessionID: string): Promise<ApiResult<ContactInfo[]>> {
  const result = await apiGet<{ contacts: ContactInfo[] }>(CONTACT_ENDPOINTS.GET_CONTACTS, {
    params: {
      sessionId: sessionID,
    },
  });

  if (result.success) {
    const collator = new Intl.Collator('id');

    const data = result.data.contacts
      .filter((contact) => contact.id.server === 'c.us') // hanya kontak personal
      .sort((a, b) => {
        const nameA = a.name ?? a.pushname;
        const nameB = b.name ?? b.pushname;

        // kalau dua-duanya kosong
        if (!nameA && !nameB) return 0;

        // kosong taruh bawah
        if (!nameA) return 1;
        if (!nameB) return -1;

        return collator.compare(nameA, nameB);
      });

    return { success: true, data };
  }

  return { success: false, error: result.error };
}

/**
 *
 * @param id harus yang memiliki akhiran server misal (12314****@c.us)
 */
async function getContactByID(sessionID: string, id: string): Promise<ApiResult<ContactInfo>> {
  const result = await apiPost<{ contact: ContactInfo }>(
    CONTACT_ENDPOINTS.GET_CONTACT_BY_ID,
    JSON.stringify({
      contactId: id,
    }),
    {
      params: {
        sessionId: sessionID,
      },
    }
  );

  if (result.success) {
    return { success: true, data: result.data.contact };
  }

  return { success: false, error: result.error };
}

// untuk mendapatkan total kontak yang tersimpan di device atau langsung dari akun wa
// misal kontak yang disimpan di wa tapi di hp gk
// bukan total kontak yang pernah saling chattingan
async function getTotalContacts(sessionID: string): Promise<ApiResult<number>> {
  const result = await apiGet<{ contacts: Array<any> }>(CONTACT_ENDPOINTS.GET_CONTACTS, {
    params: { sessionId: sessionID },
  });

  if (result.success) {
    // kita filter untuk yang termasuk my contact saja yang muncul
    const contacts = result.data.contacts.filter((contact: any) => contact.isMyContact);
    return { success: true, data: contacts.length };
  }

  return { success: false, error: result.error };
}

export const ContactRemote = { getContacts, getContactByID, getTotalContacts };
