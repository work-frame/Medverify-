const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected ✅'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Report Schema
const reportSchema = new mongoose.Schema({
  nafdacNumber: String,
  drugName: String,
  location: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
})

const Report = mongoose.model('Report', reportSchema)

// Mock NAFDAC drug database
const drugDatabase = {
  "A4-0123": {
    status: "verified",
    drugName: "Coartem 80mg",
    manufacturer: "Novartis Nigeria Ltd",
    nafdacNumber: "A4-0123",
    expiryDate: "2027-06",
    batchNumber: "BN20240112",
    category: "Antimalarial",
    dosageForm: "Tablet",
  },
  "B3-4567": {
    status: "verified",
    drugName: "Amoxicillin 500mg",
    manufacturer: "Emzor Pharmaceuticals",
    nafdacNumber: "B3-4567",
    expiryDate: "2026-11",
    batchNumber: "BN20230987",
    category: "Antibiotic",
    dosageForm: "Capsule",
  },
  "C1-7890": {
    status: "verified",
    drugName: "Paracetamol 500mg",
    manufacturer: "May & Baker Nigeria Plc",
    nafdacNumber: "C1-7890",
    expiryDate: "2027-03",
    batchNumber: "BN20241456",
    category: "Analgesic",
    dosageForm: "Tablet",
  },
  "D2-1122": {
    status: "verified",
    drugName: "Metformin 850mg",
    manufacturer: "Fidson Healthcare Plc",
    nafdacNumber: "D2-1122",
    expiryDate: "2026-08",
    batchNumber: "BN20240023",
    category: "Antidiabetic",
    dosageForm: "Tablet",
  },
  "E5-3344": {
    status: "verified",
    drugName: "Lisinopril 10mg",
    manufacturer: "GlaxoSmithKline Nigeria",
    nafdacNumber: "E5-3344",
    expiryDate: "2027-01",
    batchNumber: "BN20240789",
    category: "Antihypertensive",
    dosageForm: "Tablet",
  },
  "F6-5566": {
    status: "verified",
    drugName: "Artemether 20mg",
    manufacturer: "Swipha Nigeria Ltd",
    nafdacNumber: "F6-5566",
    expiryDate: "2027-04",
    batchNumber: "BN20240345",
    category: "Antimalarial",
    dosageForm: "Tablet",
  },
  "G7-7788": {
    status: "verified",
    drugName: "Ciprofloxacin 500mg",
    manufacturer: "Pharma-Deko Plc",
    nafdacNumber: "G7-7788",
    expiryDate: "2026-10",
    batchNumber: "BN20240567",
    category: "Antibiotic",
    dosageForm: "Tablet",
  },
  "H8-9900": {
    status: "verified",
    drugName: "Omeprazole 20mg",
    manufacturer: "Chi Pharmaceuticals Ltd",
    nafdacNumber: "H8-9900",
    expiryDate: "2027-02",
    batchNumber: "BN20240678",
    category: "Antacid",
    dosageForm: "Capsule",
  },
  "I9-1234": {
    status: "verified",
    drugName: "Amlodipine 5mg",
    manufacturer: "Drugfield Pharmaceuticals",
    nafdacNumber: "I9-1234",
    expiryDate: "2026-12",
    batchNumber: "BN20240890",
    category: "Antihypertensive",
    dosageForm: "Tablet",
  },
  "J1-5678": {
    status: "verified",
    drugName: "Azithromycin 500mg",
    manufacturer: "Hovid Nigeria Ltd",
    nafdacNumber: "J1-5678",
    expiryDate: "2027-05",
    batchNumber: "BN20240912",
    category: "Antibiotic",
    dosageForm: "Tablet",
  },
  "K2-3456": {
    status: "verified",
    drugName: "Vitamin C 1000mg",
    manufacturer: "Emzor Pharmaceuticals",
    nafdacNumber: "K2-3456",
    expiryDate: "2027-08",
    batchNumber: "BN20241234",
    category: "Supplement",
    dosageForm: "Tablet",
  },
  "L3-6789": {
    status: "verified",
    drugName: "Diclofenac 50mg",
    manufacturer: "May & Baker Nigeria Plc",
    nafdacNumber: "L3-6789",
    expiryDate: "2026-09",
    batchNumber: "BN20240456",
    category: "Anti-inflammatory",
    dosageForm: "Tablet",
  },
  "M4-2345": {
    status: "verified",
    drugName: "Metronidazole 400mg",
    manufacturer: "Fidson Healthcare Plc",
    nafdacNumber: "M4-2345",
    expiryDate: "2027-07",
    batchNumber: "BN20241567",
    category: "Antibiotic",
    dosageForm: "Tablet",
  },
  "N5-8901": {
    status: "verified",
    drugName: "Ibuprofen 400mg",
    manufacturer: "Emzor Pharmaceuticals",
    nafdacNumber: "N5-8901",
    expiryDate: "2027-09",
    batchNumber: "BN20241678",
    category: "Analgesic",
    dosageForm: "Tablet",
  },
  "O6-4567": {
    status: "verified",
    drugName: "Doxycycline 100mg",
    manufacturer: "Pharma-Deko Plc",
    nafdacNumber: "O6-4567",
    expiryDate: "2026-07",
    batchNumber: "BN20240234",
    category: "Antibiotic",
    dosageForm: "Capsule",
  },
}

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MedVerify API is running ✅' })
})

// Verify route
app.get('/api/verify/:nafdacNumber', (req, res) => {
  const { nafdacNumber } = req.params
  const drug = drugDatabase[nafdacNumber.toUpperCase()]

  if (!drug) {
    return res.json({
      status: 'unverified',
      nafdacNumber,
      message: 'Drug not found in NAFDAC registry',
    })
  }

  res.json(drug)
})

// Report route
app.post('/api/report', async (req, res) => {
  const { nafdacNumber, drugName, location, description } = req.body
  try {
    const report = new Report({ nafdacNumber, drugName, location, description })
    await report.save()
    console.log('🚩 Report saved to MongoDB:', report)
    res.json({ message: 'Report received. Thank you.' })
  } catch (err) {
    console.error('Error saving report:', err)
    res.status(500).json({ message: 'Failed to save report' })
  }
})

app.listen(PORT, () => {
  console.log(`MedVerify server running on port ${PORT} ✅`)
})
