// =====================================================================
// Server entry: memuat konfigurasi .env (dotenv) lalu menjalankan app.
// =====================================================================

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
