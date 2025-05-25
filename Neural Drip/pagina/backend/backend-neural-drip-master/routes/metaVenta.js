const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM meta_venta ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching meta_venta:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
