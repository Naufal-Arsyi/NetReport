/**
 * Rule base sistem pakar gangguan WiFi — Forward Chaining + Certainty Factor.
 *
 * Format BARU: Setiap rule menghubungkan MULTIPLE gejala ke SATU penyebab dengan CF expert (0.0-1.0).
 *
 * Logika Matching:
 * - Jika gejala yang dipilih user cocok dengan SALAH SATU dari gejala dalam rule,
 *   maka rule ini bisa berkontribusi pada diagnosis penyebab tersebut.
 *
 * Sumber: Relasi_CF dari sistem_pakar_gangguan_wifi.xlsx
 *
 * @type {{ penyebab: string; gejala: string[]; bobot: number }[]}
 */
export const RULES = [
  // ─── R01 · P01: Bandwidth penuh / overload pengguna ─────────────────────────
  // Ciri khas: lambat, lag, game DC, buffering, saat banyak device
  {
    penyebab: "P01",
    gejala: ["G01", "G08", "G13", "G20", "G21", "G27", "G28", "G30", "G41"],
    bobot: 0.8,
  },

  // ─── R02 · P03: Router overload / ISP gateway issues ────────────────────────
  // Ciri khas: semua device disconnect, modem issue, internet putus total
  {
    penyebab: "P03",
    gejala: ["G04", "G06", "G11", "G15", "G16", "G17", "G29", "G38", "G39", "G40"],
    bobot: 0.7,
  },

  // ─── R03 · P04: Access Point / router hardware rusak ───────────────────────
  // Ciri khas: restart sendiri, panas, freeze, config tidak bisa disimpan
  {
    penyebab: "P04",
    gejala: ["G09", "G14", "G24", "G30", "G43", "G48"],
    bobot: 0.6,
  },

  // ─── R04 · P05: Kabel putus / longgar ─────────────────────────────────────
  // Ciri khas: sinyal lemah, band disconnection, RF issue
  {
    penyebab: "P05",
    gejala: ["G05", "G25", "G36", "G37", "G46", "G49"],
    bobot: 0.9,
  },

  // ─── R05 · P06: DHCP bermasalah ───────────────────────────────────────────
  // Ciri khas: putus-nyambung, kabel longgar, no LAN light
  {
    penyebab: "P06",
    gejala: ["G03", "G06", "G33", "G34", "G38", "G50"],
    bobot: 0.9,
  },

  // ─── R06 · P07: Konflik IP Address ────────────────────────────────────────
  // Ciri khas: semua device dapat IP sama, DHCP gagal, connection failed
  {
    penyebab: "P07",
    gejala: ["G06", "G23", "G31", "G42"],
    bobot: 0.7,
  },

  // ─── R07 · P08: Interferensi sinyal WiFi ─────────────────────────────────
  // Ciri khas: tidak connect, IP conflict, DHCP timeout
  {
    penyebab: "P08",
    gejala: ["G02", "G18", "G23", "G31"],
    bobot: 0.8,
  },

  // ─── R08 · P09: Jarak perangkat terlalu jauh ───────────────────────────────
  // Ciri khas: sinyal lemah, lag, koneksi putus microwave
  {
    penyebab: "P09",
    gejala: ["G05", "G08", "G25", "G49"],
    bobot: 0.8,
  },

  // ─── R09 · P10: Perangkat client bermasalah ────────────────────────────────
  // Ciri khas: sinyal lemah, lambat, wired ok but WiFi bad
  {
    penyebab: "P10",
    gejala: ["G05", "G25", "G41", "G46"],
    bobot: 0.7,
  },

  // ─── R10 · P11: DNS bermasalah ────────────────────────────────────────────
  // Ciri khas: satu device problem, frequent reconnect, DHCP failed
  {
    penyebab: "P11",
    gejala: ["G07", "G19", "G42"],
    bobot: 0.9,
  },

  // ─── R11 · P12: Firmware router bermasalah ────────────────────────────────
  // Ciri khas: website tidak buka, DNS lambat, HTTPS gagal
  {
    penyebab: "P12",
    gejala: ["G10", "G26", "G32", "G45"],
    bobot: 0.6,
  },

  // ─── R12 · P13: Adaptor/power router tidak stabil ────────────────────────
  // Ciri khas: router restart, freeze, config tidak tersimpan
  {
    penyebab: "P13",
    gejala: ["G09", "G24", "G43", "G48"],
    bobot: 0.7,
  },

  // ─── R13 · P14: Firewall / website blocking ────────────────────────────────
  // Ciri khas: router restart, panas, modem unstable
  { penyebab: "P14", gejala: ["G09", "G14", "G35"], bobot: 0.5 },

  // ─── R14 · P15: Konfigurasi router salah ────────────────────────────────────
  // Ciri khas: website tertentu terblokir, DNS issue, HTTPS error
  { penyebab: "P15", gejala: ["G10", "G22", "G45"], bobot: 0.5 },

  // ─── R15 · P16: TX RX power tidak cukup ───────────────────────────────────
  // Ciri khas: WiFi muncul tapi no internet, DNS slow, no access
  { penyebab: "P16", gejala: ["G17", "G29", "G31", "G48"], bobot: 0.5 },

  // ─── R16 · P17: Kabel tertekuk ────────────────────────────────────────────
  // Ciri khas: LOS indicator red/blinking, modem indicator issues
  { penyebab: "P17", gejala: ["G11", "G39", "G40"], bobot: 0.5 },

  // ─── R17 · P18: (Unknown) ─────────────────────────────────────────────────
  // Ciri khas: intermittent connection, cable longgar, LAN no light
  { penyebab: "P18", gejala: ["G03", "G33", "G34", "G50"], bobot: 0.5 },
];
