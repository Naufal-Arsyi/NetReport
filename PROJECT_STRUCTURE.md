# WiFi Troubleshooting Expert System - Project Structure

## Directory Organization

Proyek React telah diorganisir ke dalam struktur yang rapi sesuai dengan konvensi Vite + React:

```
wifi_troubleshoot/
├── src/
│   ├── main.jsx                    # Entry point React (ReactDOM.createRoot)
│   ├── App.jsx                     # Root component dengan routing global
│   │
│   ├── data/                       # Data files & configuration
│   │   ├── gejala.js              # 10 gejala WiFi dengan CF levels
│   │   ├── penyebab.js            # 10 penyebab & dispatch metadata
│   │   ├── rules.js               # Forward Chaining rules (~30+ rules)
│   │   └── mockCases.js           # Mock case data untuk dashboard teknisi
│   │
│   ├── utils/                      # Utility functions
│   │   └── cfEngine.js            # calcCF() dan getMatchedGejala() functions
│   │
│   ├── components/                 # Reusable React components
│   │   └── Modal.jsx              # Modal overlay component
│   │
│   ├── pages/                      # Page components
│   │   ├── Landing.jsx            # Home page + tech login
│   │   ├── Symptoms.jsx           # Symptom selection form
│   │   ├── Results.jsx            # Diagnosis results display
│   │   └── Technician.jsx         # Dashboard untuk teknisi
│   │
│   └── styles/                     # CSS files
│       ├── global.css             # Design tokens, reset, shared UI
│       ├── landing.css            # Landing page styling
│       ├── symptoms.css           # Symptoms page styling
│       ├── results.css            # Results page styling
│       └── technician.css         # Technician dashboard styling
│
├── index.html                      # HTML template (loads /src/main.jsx)
├── package.json                    # Dependencies & build scripts
├── vite.config.js                  # Vite configuration
├── README.md                       # This file
│
├── expert_system_database.py       # Master Python database (data layer)
├── generate_database.py            # Excel generator script
└── wifi_expert_system.ipynb        # Jupyter notebook dengan CF algorithm
```

## File Locations & Purposes

### Entry Point

- **src/main.jsx** - React entry point, calls ReactDOM.createRoot()

### Root Component

- **src/App.jsx** - Manages routing (landing|symptoms|results|tech), global state

### Pages (4 routes)

- **src/pages/Landing.jsx** - Landing page dengan feature list + login modal teknisi
- **src/pages/Symptoms.jsx** - Form untuk memilih gejala + input perusahaan
- **src/pages/Results.jsx** - Diagnosis hasil (top-3 penyebab dengan CF scores)
- **src/pages/Technician.jsx** - Dashboard teknisi untuk case management

### Data Layer

- **src/data/gejala.js** - Array 10 gejala, CF levels, labels
- **src/data/penyebab.js** - Array 10 penyebab, dispatch meta (colors, labels)
- **src/data/rules.js** - Forward Chaining rules (~30+ rules)
- **src/data/mockCases.js** - Mock case data untuk demo

### Utilities

- **src/utils/cfEngine.js** - `calcCF()` engine, `getMatchedGejala()` helper

### Components

- **src/components/Modal.jsx** - Reusable modal overlay

### Styles

- **src/styles/global.css** - CSS tokens, reset, shared components
- **src/styles/landing.css** - Landing page specific styles
- **src/styles/symptoms.css** - Symptoms selection styles
- **src/styles/results.css** - Results display styles
- **src/styles/technician.css** - Technician dashboard styles

## Import Paths

After migration, import paths are:

```javascript
// In pages/
import { GEJALA } from "../data/gejala.js";
import { calcCF } from "../utils/cfEngine.js";
import Modal from "../components/Modal.jsx";
import "../styles/global.css";

// In App.jsx
import Landing from "./pages/Landing.jsx";
```

## Build & Run

```bash
# Development
npm run dev

# Production build
npm run build

# Preview built app
npm run preview
```

## Expert System Flow

1. **Landing** - User selects "Laporkan Gangguan" → goes to Symptoms
2. **Symptoms** - User fills company info, selects gejala with CF confidence
3. **Analyze** - Triggers `calcCF(selected)` from cfEngine.js
4. **Results** - Shows top-3 penyebab ranked by CF score, dispatch recommendation
5. **Reset** - Back to Symptoms for new report

### Technician Dashboard

- **Login** - Username: "teknisi", password: any (demo)
- **Cases List** - Shows all mock cases with status & dispatch type
- **Detail Panel** - Clicking case shows full details + action buttons
- **WhatsApp** - Send update via Qontak API (mock)

## Key Features

✅ **Forward Chaining** - Telusuri rules yang match dengan gejala  
✅ **Certainty Factor** - CF_combined = CF_old + CF_curr × (1 - CF_old)  
✅ **Dispatch Decision** - Sistem tentukan self/remote/onsite based on diagnosis  
✅ **Print Receipt** - Export diagnosis ke PDF  
✅ **WhatsApp Integration** - Qontak API untuk update status  
✅ **Responsive Design** - Mobile-friendly UI

## Next Steps

- Replace mock data with real backend API
- Implement actual Qontak WhatsApp integration
- Add case persistence (database)
- Enhance CF algorithm with multi-evidence combination
