// =====================================================================
// Middleware penanganan error terpusat.
// notFoundHandler: menangkap semua alamat yang tidak terdaftar -> 404.
// errorHandler   : menangkap error dari seluruh route/middleware
//                  (termasuk body JSON rusak) -> respons JSON rapi.
// Keduanya wajib 4 parameter agar Express mengenalinya sebagai
// error handler.
// =====================================================================

// 404 untuk alamat yang tidak ada (dipasang setelah seluruh route)
function notFoundHandler(req, res) {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
}

// error handler terpusat (wajib 4 parameter)
function errorHandler(err, req, res, next) {
  // body JSON rusak (header application/json tetapi isinya tidak valid)
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({
      status: 'error',
      message: 'Format JSON tidak valid',
      data: null,
    });
  }

  // error lain -> 500 Internal Server Error
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server',
    data: null,
  });
}

module.exports = { notFoundHandler, errorHandler };
