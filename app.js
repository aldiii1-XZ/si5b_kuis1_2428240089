// =====================================================================
// Kuis Refactor - RESTful API Perikanan: Kolam Ikan (Topik 23)
// Resource: /fish-ponds
// Nama  : Aldi Yonatan Rusnawan
// NIM   : 2428240089
// Kelas : SI5B
// =====================================================================

// port server lokal (pakai PORT dari .env bila ada, default 3000)
const PORT = process.env.PORT || 3000;

// impor express, cors, route, dan middleware
const express = require('express');
const cors = require('cors');
const fishPondRoutes = require('./routes/fishPondRoutes');
const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

// buat instance aplikasi express
const app = express();

// middleware untuk membaca body JSON dari request (req.body)
app.use(express.json());

// middleware cors: izinkan API diakses dari domain/origin lain
app.use(cors());

// middleware logger: mencatat setiap request (metode, alamat, status)
app.use(logger);

// halaman depan: info API (JSON)
app.get('/', (req, res) => {
  res.json({
    nama: 'Aldi Yonatan Rusnawan',
    nim: '2428240089',
    topik: '23 - Perikanan: Kolam Ikan',
    resource: '/fish-ponds',
    endpoints: [
      'GET    /fish-ponds',
      'GET    /fish-ponds/:id',
      'GET    /fish-ponds?jenisIkan=lele',
      'POST   /fish-ponds',
      'PUT    /fish-ponds/:id',
      'DELETE /fish-ponds/:id',
    ],
  });
});

// memetakan alamat /fish-ponds ke route yang ada di folder routes
app.use('/fish-ponds', fishPondRoutes);

// middleware 404: menangkap semua alamat yang tidak terdaftar
app.use(notFoundHandler);

// middleware penanganan error terpusat (termasuk JSON rusak)
app.use(errorHandler);

// jalankan server hanya saat file ini dijalankan langsung (lokal)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// ekspor app untuk keperluan lain (deploy/pengujian)
module.exports = app;
