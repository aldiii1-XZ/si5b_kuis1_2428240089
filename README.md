# Kuis 1 PAW2 SI5B — Refactor RESTful API Tugas 1

Refactor RESTful API Tugas 1 (Topik 23 — Perikanan: Kolam Ikan, resource `/fish-ponds`)
ke arsitektur backend terstruktur: `routes`, `controllers`, `models`, `middlewares`.

Perilaku API tetap sama seperti Tugas 1, kecuali respons DELETE yang kini
mengikuti templat kuis: `204 No Content` (tanpa isi).

- Nama  : Aldi Yonatan Rusnawan
- NIM   : 2428240089
- Kelas : SI5B

## Menjalankan

```bash
npm install
cp .env.example .env   # lalu isi API_KEY sesuai keinginan
npm start              # atau: npm run dev
```

Server berjalan di `http://localhost:3000` (PORT bisa diubah di `.env`).

## Endpoint

| No | Metode | Alamat | API key | Status sukses | Fungsi |
|----|--------|--------|---------|---------------|--------|
| 1 | GET | `/fish-ponds` | Tidak | 200 | Ambil semua data (filter `?jenisIkan=`) |
| 2 | GET | `/fish-ponds/:id` | Tidak | 200 | Ambil satu data |
| 3 | POST | `/fish-ponds` | Ya | 201 | Tambah data |
| 4 | PUT | `/fish-ponds/:id` | Ya | 200 | Ubah data |
| 5 | DELETE | `/fish-ponds/:id` | Ya | 204 | Hapus data |

Rute POST/PUT/DELETE dilindungi middleware `cekApiKey` (header `x-api-key`).

## Struktur

```
routes/       peta alamat -> controller (express.Router)
controllers/  menangani req/res + validasi
models/       data kolam ikan + fungsi pengolahannya (tanpa req/res)
middlewares/  logger, cekApiKey, errorHandler terpusat (termasuk 404)
```
