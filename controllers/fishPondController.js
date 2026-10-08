// =====================================================================
// Controller: menangani request (req), memanggil model, lalu mengirim
// response (res). Validasi field wajib juga dijahit di sini.
// =====================================================================

const fishPondModel = require('../models/fishPondModel');

// GET /fish-ponds (mendukung filter ?jenisIkan=...)
function getAll(req, res) {
  const { jenisIkan } = req.query;
  const data = fishPondModel.getAll(jenisIkan);
  res.json(data);
}

// GET /fish-ponds/:id
function getById(req, res) {
  // id dari alamat berupa teks, harus diubah ke angka dulu
  const id = parseInt(req.params.id);
  const kolam = fishPondModel.getById(id);

  if (!kolam) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.json(kolam);
}

// POST /fish-ponds
function create(req, res) {
  // validasi field wajib (validasi ada di controller, bukan di model)
  const error = fishPondModel.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error,
      data: null,
    });
  }

  const { kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar } = req.body;
  const baru = fishPondModel.create({ kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar });

  res.status(201).json({
    status: 'success',
    message: 'Data berhasil ditambahkan',
    data: baru,
  });
}

// PUT /fish-ponds/:id
function update(req, res) {
  const id = parseInt(req.params.id);

  // cek dulu apakah id-nya ada
  if (!fishPondModel.getById(id)) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  // validasi seluruh field wajib
  const error = fishPondModel.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error,
      data: null,
    });
  }

  const { kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar } = req.body;
  const diubah = fishPondModel.update(id, { kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar });

  res.status(200).json({
    status: 'success',
    message: `Data kolam dengan id ${id} berhasil diubah`,
    data: diubah,
  });
}

// DELETE /fish-ponds/:id
function remove(req, res) {
  const id = parseInt(req.params.id);
  const terhapus = fishPondModel.remove(id);

  if (!terhapus) {
    return res.status(404).json({
      status: 'error',
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  // 204 No Content: sukses tanpa isi respons
  res.status(204).send();
}

// ekspor seluruh fungsi controller
module.exports = { getAll, getById, create, update, remove };
