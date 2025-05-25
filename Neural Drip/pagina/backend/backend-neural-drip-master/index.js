const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dim-tienda', require('./routes/dimTienda'));
app.use('/api/meta-venta', require('./routes/metaVenta'));
app.use('/api/venta', require('./routes/venta'));

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
