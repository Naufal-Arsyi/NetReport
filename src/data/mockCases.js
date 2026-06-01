/**
 * Contoh data laporan gangguan WiFi untuk tampilan dashboard teknisi.
 * Di produksi, data ini berasal dari API/database backend.
 *
 * @type {{
 *   id: string;
 *   company: string;
 *   contact: string;
 *   phone: string;
 *   location: string;
 *   date: string;
 *   symptoms: string[];
 *   diagnosis: string;
 *   diagnosisId: string;
 *   dispatch: "self" | "remote" | "onsite";
 *   deadline: string;
 *   status: "pending" | "in_progress" | "done";
 * }[]}
 */
export const MOCK_CASES = [
  {
    id: "NR-2026-001",
    company: "PT Maju Bersama",
    contact: "Hendra Kusuma",
    phone: "081234567890",
    location: "Gedung A Lt. 3 — Jl. Sudirman No. 45, Jakarta",
    date: "2026-05-25",
    symptoms: ["G01", "G08", "G03"],
    diagnosis: "Bandwidth penuh / overload pengguna",
    diagnosisId: "P01",
    dispatch: "self",
    deadline: "Bisa ditangani segera",
    status: "pending",
  },
  {
    id: "NR-2026-002",
    company: "CV Teknologi Nusantara",
    contact: "Sari Dewi",
    phone: "082345678901",
    location: "Kantor Pusat Lt. 1 — Jl. Gatot Subroto, Bandung",
    date: "2026-05-24",
    symptoms: ["G06", "G04"],
    diagnosis: "Gangguan dari ISP",
    diagnosisId: "P02",
    dispatch: "remote",
    deadline: "1–2 jam (eskalasi ISP)",
    status: "in_progress",
  },
  {
    id: "NR-2026-003",
    company: "PT Solusi Digital",
    contact: "Budi Santoso",
    phone: "083456789012",
    location: "Server Room — Jl. Pemuda No. 12, Surabaya",
    date: "2026-05-23",
    symptoms: ["G02", "G05"],
    diagnosis: "Access Point rusak",
    diagnosisId: "P04",
    dispatch: "onsite",
    deadline: "Kunjungan hari ini",
    status: "in_progress",
  },
  {
    id: "NR-2026-004",
    company: "Universitas Harapan",
    contact: "Dr. Anita Rahayu",
    phone: "084567890123",
    location: "Gedung Rektorat — Kampus Utama, Yogyakarta",
    date: "2026-05-22",
    symptoms: ["G04", "G10"],
    diagnosis: "DNS bermasalah",
    diagnosisId: "P09",
    dispatch: "self",
    deadline: "Selesai",
    status: "done",
  },
  {
    id: "NR-2026-005",
    company: "RS Medika Prima",
    contact: "Ahmad Fauzi",
    phone: "085678901234",
    location: "Ruang Administrasi Lt. 2 — Jl. Kesehatan No. 8, Medan",
    date: "2026-05-25",
    symptoms: ["G02", "G06"],
    diagnosis: "Kabel LAN putus / longgar",
    diagnosisId: "P05",
    dispatch: "onsite",
    deadline: "Prioritas tinggi — max 4 jam",
    status: "pending",
  },
];
