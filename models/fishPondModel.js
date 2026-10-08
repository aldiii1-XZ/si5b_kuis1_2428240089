// =====================================================================
// Model: data kolam ikan + seluruh logika pengolahannya.
// Tidak ada req dan res di sini (murni data dan fungsi).
// =====================================================================

// data awal (array di memori) - field: kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar
let fishPonds = [
  { id: 1, kodeKolam: 'K-01', jenisIkan: 'lele', jumlahBibit: 3000, luasM2: 24, tanggalTebar: '2026-08-15' },
  { id: 2, kodeKolam: 'K-02', jenisIkan: 'nila', jumlahBibit: 2500, luasM2: 30, tanggalTebar: '2026-08-20' },
  { id: 3, kodeKolam: 'K-03', jenisIkan: 'lele', jumlahBibit: 4000, luasM2: 36, tanggalTebar: '2026-09-01' },
];

// penanda id berikutnya (id terakhir + 1)
let nextId = 4;

// ambil semua data; bila jenisIkan diberikan, saring dulu
function getAll(jenisIkan) {
  if (jenisIkan) {
    return fishPonds.filter((k) => k.jenisIkan.toLowerCase() === jenisIkan.toLowerCase());
  }
  return fishPonds;
}

// cari satu data berdasarkan id
function getById(id) {
  return fishPonds.find((k) => k.id === id);
}

// tambah data baru; id dibuat otomatis oleh model
function create(data) {
  const baru = { id: nextId++, ...data };
  fishPonds.push(baru);
  return baru;
}

// ganti seluruh data pada id tertentu (id tetap); bila tidak ada -> null
function update(id, data) {
  const index = fishPonds.findIndex((k) => k.id === id);
  if (index === -1) return null;
  const diubah = { id, ...data };
  fishPonds[index] = diubah;
  return diubah;
}

// hapus data pada id tertentu; bila tidak ada -> null
function remove(id) {
  const index = fishPonds.findIndex((k) => k.id === id);
  if (index === -1) return null;
  const terhapus = fishPonds.splice(index, 1)[0];
  return terhapus;
}

// validasi field wajib; mengembalikan pesan error (string) atau null bila valid
function validate(body) {
  const { kodeKolam, jenisIkan, jumlahBibit, luasM2, tanggalTebar } = body;
  if (!kodeKolam) return 'Field kodeKolam wajib diisi';
  if (!jenisIkan) return 'Field jenisIkan wajib diisi';
  if (jumlahBibit === undefined || jumlahBibit === null || jumlahBibit === '') return 'Field jumlahBibit wajib diisi';
  if (luasM2 === undefined || luasM2 === null || luasM2 === '') return 'Field luasM2 wajib diisi';
  if (!tanggalTebar) return 'Field tanggalTebar wajib diisi';
  if (typeof jumlahBibit !== 'number') return 'Field jumlahBibit harus berupa angka';
  if (typeof luasM2 !== 'number') return 'Field luasM2 harus berupa angka';
  return null;
}

// ekspor semua fungsi untuk dipakai controller
module.exports = { getAll, getById, create, update, remove, validate };
