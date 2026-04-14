# 📱 Monitoring WhatsApp Automation — Frontend

Dashboard berbasis web untuk memantau dan mengelola sesi WhatsApp Web melalui REST API [wwebjs-api](https://github.com/irxyad/wwebjs-api). API yang digunakan merupakan hasil fork dan telah di adjust sedikit untuk menyesuaikan kebutuhan frontend ini.

**Source:** https://github.com/avoylenko/wwebjs-api

## 🖼️ Preview

![Preview-1](https://raw.githubusercontent.com/irxyad/project-assets/274895fc5db2824ad5dadddf4cf13daf495f7fc9/assets/monitoring-whatsapp/preview-1.jpg)

![Preview-2](https://raw.githubusercontent.com/irxyad/project-assets/274895fc5db2824ad5dadddf4cf13daf495f7fc9/assets/monitoring-whatsapp/preview-2.jpg)

## 📌 Tentang Proyek

Aplikasi web ini berfungsi sebagai antarmuka monitoring dan layanan untuk instance WhatsApp Web yang dikelola oleh backend `wwebjs-api`. Fitur utama meliputi manajemen multi-sesi, pengiriman pesan, manajemen kontak, dan lainnya.

## 🧱 Tech Stack

| Layer            | Teknologi                    |
| ---------------- | ---------------------------- |
| Framework        | React + TypeScript           |
| State Management | Zustand                      |
| HTTP Client      | Axios                        |
| Styling          | Tailwind CSS                 |
| Build Tool       | Vite                         |
| Environment      | `development` / `production` |

## ⚙️ Konfigurasi Environment

Proyek ini mendukung dua flavor: **development** dan **production**.

### `.env.development`

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=your_dev_api_key_here
VITE_APP_NAME=name_app
VITE_FLAVOR=development
```

### `.env.production`

```env
VITE_API_BASE_URL=https://your-production-server.com
VITE_API_KEY=your_prod_api_key_here
VITE_APP_NAME=name_app
VITE_FLAVOR=production
```

## 📄 Lisensi

MIT
