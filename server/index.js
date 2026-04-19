const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'MedVerify API is running ✅' });
});

// Drug verification route (placeholder)
app.get('/api/verify/:nafdacNumber', (req, res) => {
  const { nafdacNumber } = req.params;

  // TODO: Replace with real NAFDAC lookup
  res.json({
    nafdacNumber,
    status: 'verified',
    drugName: 'Coartem 80mg',
    manufacturer: 'Novartis Nigeria',
    expiryDate: '2026-12',
    batchNumber: 'BN20240112',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});