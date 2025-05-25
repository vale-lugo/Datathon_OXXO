const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM venta ORDER BY tienda_id, mes_id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching venta:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
