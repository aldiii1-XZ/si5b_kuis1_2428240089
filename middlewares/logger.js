// =====================================================================
// Middleware logger: mencatat setiap request yang masuk
// (waktu, metode, alamat, dan kode status saat selesai).
// =====================================================================

function logger(req, res, next) {
  // simpan waktu awal untuk menghitung durasi
  const start = Date.now();

  // setelah respons selesai dikirim, catat ringkasannya
  res.on('finish', () => {
    const durasi = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durasi} ms)`
    );
  });

  // lanjut ke middleware/route berikutnya
  next();
}

module.exports = logger;
