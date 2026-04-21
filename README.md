cat > /home/daniel/Documents/Medverify/README.md << 'EOF'
# MedVerify 💊

> Verify your drugs. Protect your life.

MedVerify is a mobile-first web application that allows patients, pharmacists, and community health workers to instantly verify drug authenticity using NAFDAC registration numbers — and report suspected counterfeits.

Built for the **NACOS Buildathon 1.0 — McPherson University Innovation Challenge** under the theme *"Building Scalable Solutions for Nigeria's Digital Future."*

---

## 🌍 Live Demo

🔗 [medverify.vercel.app](https://medverify-psi.vercel.app/)

---

## 🚨 The Problem

- 1 in 10 medical products in Nigeria is counterfeit
- Fake drugs cause treatment failure, drug resistance, and death
- Most Nigerians have no way to verify a drug before consuming it
- NAFDAC has a registry but no consumer-facing verification tool

---

## ✅ The Solution

MedVerify gives every Nigerian a free, instant drug verification tool in their pocket.

- 🔍 Search any NAFDAC number and get instant results
- ✅ See full drug details — manufacturer, batch, expiry, category
- ⚠️ Get clear warnings for unverified or fake drugs
- 🚩 Report suspicious drugs with location and description
- 📱 Works on any phone, any browser, anywhere in Nigeria

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend) + Render (Backend) |
| Version Control | GitHub |

---

## 📁 Project Structure


---

## ✨ Features

- 🔍 **NAFDAC Number Verification** — instant drug lookup against registry
- ✅ **Drug Detail Page** — manufacturer, batch number, expiry, category, dosage form
- ⚠️ **Fake Drug Warning** — clear instructions and NAFDAC hotline for unverified drugs
- 🚩 **Report a Fake** — geotagged community reporting saved to MongoDB Atlas
- 📤 **Share Result** — share verification result via any app or copy to clipboard
- 📱 **Mobile First** — works on any phone, any browser, no app download needed
- 🏓 **Keep-Alive System** — server stays active, no cold start delays during demo
- 🌐 **About Page** — mission, tech stack, buildathon context, NAFDAC contact

---

## 🧪 Test NAFDAC Numbers

| NAFDAC Number | Drug | Result |
|---|---|---|
| A4-0123 | Coartem 80mg | ✅ Verified |
| B3-4567 | Amoxicillin 500mg | ✅ Verified |
| C1-7890 | Paracetamol 500mg | ✅ Verified |
| D2-1122 | Metformin 850mg | ✅ Verified |
| E5-3344 | Lisinopril 10mg | ✅ Verified |
| F6-5566 | Artemether 20mg | ✅ Verified |
| G7-7788 | Ciprofloxacin 500mg | ✅ Verified |
| H8-9900 | Omeprazole 20mg | ✅ Verified |
| I9-1234 | Amlodipine 5mg | ✅ Verified |
| J1-5678 | Azithromycin 500mg | ✅ Verified |
| K2-3456 | Vitamin C 1000mg | ✅ Verified |
| L3-6789 | Diclofenac 50mg | ✅ Verified |
| M4-2345 | Metronidazole 400mg | ✅ Verified |
| N5-8901 | Ibuprofen 400mg | ✅ Verified |
| O6-4567 | Doxycycline 100mg | ✅ Verified |
| FAKE-999 | Unknown | ⚠️ Not Verified |

---

## 🚀 Getting Started

### Option 1 — Use the Live App
Visit [medverify.vercel.app](https://medverify.vercel.app) — no setup needed.

### Option 2 — Run Locally with Docker
Make sure you have [Docker Desktop](https://docker.com) installed.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/medverify.git
cd medverify

# Add your MongoDB connection string
echo "PORT=5000" > server/.env
echo "MONGO_URI=your_mongodb_atlas_uri" >> server/.env

# Start everything
docker compose up --build
```

Open `http://localhost:5173` in your browser.

### Option 3 — Run Locally without Docker

```bash
# Terminal 1 — Backend
cd server
npm install
node index.js

# Terminal 2 — Frontend
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🚨 NAFDAC Hotline

Found a fake drug? Report directly to NAFDAC:

📞 **0800-162-3322** — Toll free · Available 24/7

---

## 👥 Team

Built with ❤️ by a team of developers at McPherson University for NACOS Buildathon 1.0.

---

## 📄 License

MIT License — free to use and build upon.