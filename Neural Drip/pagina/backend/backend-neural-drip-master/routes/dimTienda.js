const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM temp_dim_tienda ORDER BY tienda_id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching dim_tienda:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
