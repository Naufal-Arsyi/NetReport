/**
 * 10 penyebab utama gangguan WiFi beserta rekomendasi penanganan.
 *
 * Kolom `dispatch` menentukan apakah teknisi perlu hadir:
 *   - "self"   → Klien dapat menangani sendiri (panduan diberikan)
 *   - "remote" → Teknisi menangani dari jarak jauh (SSH / web admin)
 *   - "onsite" → Teknisi harus datang ke lokasi (cek fisik diperlukan)
 *
 * @type {{
 *   id: string;
 *   nama: string;
 *   dispatch: "self" | "remote" | "onsite";
 *   solusi: string;
 * }[]}
 */
export const PENYEBAB = [
  {
    id: "P01",
    nama: "Bandwidth penuh / overload pengguna",
    dispatch: "self",
    solusi:
      "Batasi jumlah perangkat aktif. Jadwalkan aktivitas berat (update, backup) di luar jam kerja. Pertimbangkan upgrade paket bandwidth.",
  },
  {
    id: "P02",
    nama: "Gangguan dari ISP",
    dispatch: "remote",
    solusi:
      "Teknisi akan mengecek status layanan ISP dan melakukan eskalasi tiket ke provider. Klien cukup menunggu konfirmasi.",
  },
  {
    id: "P03",
    nama: "Router overload",
    dispatch: "remote",
    solusi:
      "Teknisi akan melakukan restart terjadwal, optimasi konfigurasi QoS, dan memantau beban router via dashboard remote.",
  },
  {
    id: "P04",
    nama: "Access Point rusak",
    dispatch: "onsite",
    solusi:
      "Teknisi harus hadir untuk inspeksi fisik AP, penggantian unit, atau re-mounting di posisi optimal.",
  },
  {
    id: "P05",
    nama: "Kabel LAN putus / longgar",
    dispatch: "onsite",
    solusi:
      "Teknisi harus hadir untuk pengecekan dan penggantian kabel, konektor RJ45, atau patch panel.",
  },
  {
    id: "P06",
    nama: "DHCP bermasalah",
    dispatch: "remote",
    solusi:
      "Teknisi akan merestart DHCP server, memperluas pool IP, atau memperbarui lease time dari jarak jauh.",
  },
  {
    id: "P07",
    nama: "Konflik IP Address",
    dispatch: "remote",
    solusi:
      "Teknisi akan mengidentifikasi IP yang konflik via ARP table, menetapkan static IP atau memperbaiki konfigurasi DHCP.",
  },
  {
    id: "P08",
    nama: "Interferensi sinyal WiFi",
    dispatch: "self",
    solusi:
      "Ubah channel WiFi ke channel yang tidak ramai (1, 6, atau 11 untuk 2.4GHz). Aktifkan band 5GHz jika tersedia. Jauhkan router dari microwave/Bluetooth.",
  },
  {
    id: "P09",
    nama: "DNS bermasalah",
    dispatch: "self",
    solusi:
      "Ubah DNS ke 8.8.8.8 / 1.1.1.1 di pengaturan jaringan. Flush DNS cache: ipconfig /flushdns (Windows) atau sudo dscacheutil -flushcache (Mac).",
  },
  {
    id: "P10",
    nama: "Perangkat client bermasalah (Modem)",
    dispatch: "onsite",
    solusi:
      "Teknisi akan memeriksa device fisik, update driver network adapter, atau melakukan replacement jika diperlukan.",
  },
  {
    id: "P11",
    nama: "DNS bermasalah",
    dispatch: "remote",
    solusi:
      "Teknisi akan mengubah DNS server ke public DNS (8.8.8.8, 1.1.1.1) atau restart DNS service dari jarak jauh.",
  },
  {
    id: "P12",
    nama: "Firmware router bermasalah",
    dispatch: "remote",
    solusi:
      "Teknisi akan melakukan update firmware router, rollback ke versi stabil, atau reset konfigurasi dari jarak jauh.",
  },
  {
    id: "P13",
    nama: "Adaptor/power router tidak stabil",
    dispatch: "onsite",
    solusi:
      "Teknisi harus hadir untuk inspeksi fisik, penggantian power adapter, atau perbaikan koneksi power.",
  },
  {
    id: "P14",
    nama: "Firewall atau blokir website",
    dispatch: "remote",
    solusi:
      "Teknisi akan mengecek firewall rules, whitelist/blacklist domain, atau adjust blocking policy dari jarak jauh.",
  },
  {
    id: "P15",
    nama: "Konfigurasi router salah",
    dispatch: "remote",
    solusi:
      "Teknisi akan mereview & memperbaiki konfigurasi router, QoS settings, atau network topology dari dashboard admin.",
  },
  {
    id: "P16",
    nama: "TX RX power tidak cukup (standar)",
    dispatch: "remote",
    solusi:
      "Teknisi akan mengoptimalkan TX/RX power levels di wireless settings untuk jangkauan lebih baik.",
  },
  {
    id: "P17",
    nama: "Kabel tertekuk",
    dispatch: "onsite",
    solusi:
      "Teknisi harus hadir untuk inspeksi & penggantian kabel LAN yang tertekuk atau rusak.",
  },
];

/** Metadata tampilan per jenis dispatch */
export const DISPATCH_META = {
  self: {
    label: "Mandiri",
    desc: "Klien dapat menangani sendiri",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    textColor: "#065F46",
  },
  remote: {
    label: "Remote",
    desc: "Teknisi tangani dari jarak jauh",
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    textColor: "#0C4A6E",
  },
  onsite: {
    label: "Onsite",
    desc: "Teknisi harus datang ke lokasi",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    textColor: "#7F1D1D",
  },
};
