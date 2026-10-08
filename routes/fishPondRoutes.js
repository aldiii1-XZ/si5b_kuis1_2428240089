// =====================================================================
// Route: memetakan alamat ke fungsi controller memakai express.Router().
// POST, PUT, DELETE dilindungi middleware cekApiKey.
// =====================================================================

const express = require('express');
const router = express.Router();

const fishPondController = require('../controllers/fishPondController');
const cekApiKey = require('../middlewares/cekApiKey');

// GET /fish-ponds dan /fish-ponds/:id (bisa juga difilter ?jenisIkan=...)
router.get('/', fishPondController.getAll);
router.get('/:id', fishPondController.getById);

// POST, PUT, DELETE wajib membawa header x-api-key
router.post('/', cekApiKey, fishPondController.create);
router.put('/:id', cekApiKey, fishPondController.update);
router.delete('/:id', cekApiKey, fishPondController.remove);

// ekspor router untuk dipasang di app.js
module.exports = router;
