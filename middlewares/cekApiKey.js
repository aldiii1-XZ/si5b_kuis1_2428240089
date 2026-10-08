// =====================================================================
// Middleware cekApiKey: melindungi rute POST, PUT, DELETE.
// Request harus membawa header x-api-key yang sama dengan API_KEY
// di berkas .env. Bila tidak cocok -> 401 Unauthorized.
// =====================================================================

function cekApiKey(req, res, next) {
  const keyDariHeader = req.header('x-api-key');

  // tolak bila header tidak dikirim atau nilainya tidak cocok
  if (!keyDariHeader || keyDariHeader !== process.env.API_KEY) {
    return res.status(401).json({
      status: 'error',
      message: 'Akses ditolak: API key tidak valid atau tidak disertakan',
      data: null,
    });
  }

  // API key cocok -> lanjut ke controller
  next();
}

module.exports = cekApiKey;
