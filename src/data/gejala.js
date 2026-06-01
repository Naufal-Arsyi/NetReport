/**
 * 10 gejala utama gangguan WiFi jaringan perusahaan.
 * Sumber: dataset sistem_pakar_gangguan_wifi.xlsx
 *
 * @type {{ id: string; nama: string; deskripsi: string }[]}
 */
export const GEJALA = [
  {
    id: "G01",
    nama: "WiFi terasa lambat",
    deskripsi: "Kecepatan unduh/unggah jauh di bawah normal, halaman web lama terbuka",
  },
  {
    id: "G02",
    nama: "Tidak bisa terhubung ke WiFi",
    deskripsi: "Perangkat gagal join SSID, muncul pesan 'Authentication Failed' atau timeout",
  },
  {
    id: "G03",
    nama: "WiFi sering putus-nyambung",
    deskripsi: "Koneksi terputus dan tersambung kembali berulang kali dalam waktu singkat",
  },
  {
    id: "G04",
    nama: "Internet connected tapi tidak bisa browsing",
    deskripsi: "Status terhubung ke WiFi tetapi tidak bisa membuka website apapun",
  },
  {
    id: "G05",
    nama: "Sinyal WiFi lemah / tidak stabil",
    deskripsi: "Indikator sinyal rendah, koneksi tidak stabil meski dekat router",
  },
  {
    id: "G06",
    nama: "Semua perangkat tidak mendapat internet",
    deskripsi: "Seluruh device di jaringan kehilangan akses internet secara bersamaan",
  },
  {
    id: "G07",
    nama: "Hanya satu perangkat yang bermasalah",
    deskripsi: "Perangkat lain berjalan normal, hanya satu unit yang gagal terhubung",
  },
  {
    id: "G08",
    nama: "Ping tinggi / lag saat meeting atau gaming",
    deskripsi: "Latency sangat tinggi (>100ms), video call patah-patah atau game lag berat",
  },
  {
    id: "G09",
    nama: "Router / AP sering restart sendiri",
    deskripsi: "Perangkat jaringan mati dan nyala sendiri tanpa perintah, lampu berkedip tidak normal",
  },
  {
    id: "G10",
    nama: "Tidak bisa membuka website tertentu",
    deskripsi: "Website spesifik tidak dapat diakses meski situs lain berjalan normal",
  },
  {
    id: "G11",
    nama: "Indikator LOS Modem menyala",
    deskripsi: "Lampu LOS (Loss of Signal) pada modem menyala, menandakan signal loss dari ISP",
  },
  {
    id: "G12",
    nama: "Indikator PON Modem menyala",
    deskripsi: "Lampu PON (Power ONline) pada modem bermasalah atau tidak normal",
  },
  {
    id: "G13",
    nama: "WiFi hanya bermasalah pada jam tertentu",
    deskripsi: "Gangguan terjadi hanya pada waktu spesifik (peak hours), normal di luar jam tersebut",
  },
  {
    id: "G14",
    nama: "Router terasa sangat panas",
    deskripsi: "Router atau AP terasa panas saat disentuh, bekerja di atas suhu normal",
  },
  {
    id: "G15",
    nama: "Modem tidak mendapatkan IP WAN",
    deskripsi: "Status modem menunjukkan belum mendapat IP address dari ISP",
  },
  {
    id: "G16",
    nama: "Lampu internet modem berkedip terus",
    deskripsi: "Indikator internet pada modem terus berkedip, belum stabil",
  },
  {
    id: "G17",
    nama: "WiFi muncul tetapi tidak ada akses internet",
    deskripsi: "Perangkat terhubung ke WiFi tapi tidak bisa akses internet",
  },
  {
    id: "G18",
    nama: "Muncul pesan 'IP conflict detected'",
    deskripsi: "Sistem mendeteksi ada perangkat lain menggunakan IP yang sama",
  },
  {
    id: "G19",
    nama: "Perangkat harus reconnect berkali-kali",
    deskripsi: "Perangkat sering terputus dan perlu reconnect manual berulang kali",
  },
  {
    id: "G20",
    nama: "Kecepatan download sangat lambat tapi upload normal",
    deskripsi: "Asimetri kecepatan: download jauh lebih lambat dari upload",
  },
  {
    id: "G21",
    nama: "Kecepatan upload sangat lambat tapi download normal",
    deskripsi: "Asimetri kecepatan: upload jauh lebih lambat dari download",
  },
  {
    id: "G22",
    nama: "Website tertentu diblokir atau tidak dapat diakses",
    deskripsi: "Website spesifik tidak bisa diakses seperti diblokir, tapi situs lain lancar",
  },
  {
    id: "G23",
    nama: "Semua perangkat mendapat IP yang sama",
    deskripsi: "Multiple device memiliki IP address identik, terjadi IP address conflict",
  },
  {
    id: "G24",
    nama: "Router sering freeze/hang",
    deskripsi: "Router tidak responsif terhadap perintah, perlu restart manual",
  },
  {
    id: "G25",
    nama: "Sinyal WiFi hilang saat jauh sedikit dari router",
    deskripsi: "Coverage WiFi sangat terbatas, sinyal hilang meski jarak dekat",
  },
  {
    id: "G26",
    nama: "Ping normal tetapi browsing lambat",
    deskripsi: "Latency rendah tapi kecepatan akses website sangat lambat",
  },
  {
    id: "G27",
    nama: "Game online disconnect terus",
    deskripsi: "Koneksi game putus berkali-kali, tidak bisa bermain lama",
  },
  {
    id: "G28",
    nama: "YouTube buffering terus",
    deskripsi: "Video streaming selalu buffering/loading, tidak smooth",
  },
  {
    id: "G29",
    nama: "WiFi connect tetapi 'No Internet Access'",
    deskripsi: "Terhubung ke WiFi tapi status menunjukkan no internet",
  },
  {
    id: "G30",
    nama: "Router reboot saat banyak perangkat terhubung",
    deskripsi: "Router restart sendiri ketika ada banyak device terkoneksi",
  },
  {
    id: "G31",
    nama: "Tidak bisa mendapatkan alamat IP otomatis",
    deskripsi: "DHCP gagal, perangkat tidak bisa mendapat IP otomatis dari router",
  },
  {
    id: "G32",
    nama: "DNS resolving sangat lambat",
    deskripsi: "Proses resolving nama domain sangat lambat, website lama muncul",
  },
  {
    id: "G33",
    nama: "Kabel LAN terasa longgar",
    deskripsi: "Kabel jaringan longgar atau tidak tersambung dengan baik di konektor",
  },
  {
    id: "G34",
    nama: "Lampu LAN modem tidak menyala",
    deskripsi: "Indikator LAN pada modem tidak aktif atau tidak menyala",
  },
  {
    id: "G35",
    nama: "Modem sering restart setelah listrik turun",
    deskripsi: "Modem restart berulang setelah terjadi pemadaman listrik",
  },
  {
    id: "G36",
    nama: "WiFi 2.4GHz normal tetapi 5GHz hilang",
    deskripsi: "Band 2.4GHz berfungsi normal tapi band 5GHz tidak terdeteksi",
  },
  {
    id: "G37",
    nama: "WiFi 5GHz normal tetapi 2.4GHz bermasalah",
    deskripsi: "Band 5GHz lancar tapi band 2.4GHz hilang atau tidak stabil",
  },
  {
    id: "G38",
    nama: "Internet putus saat hujan",
    deskripsi: "Koneksi terganggu atau putus ketika terjadi hujan",
  },
  {
    id: "G39",
    nama: "LOS berkedip merah",
    deskripsi: "Indikator LOS pada modem berkedip berwarna merah",
  },
  {
    id: "G40",
    nama: "PON berkedip tidak normal",
    deskripsi: "Indikator PON modem berkedip tidak sesuai pola normal",
  },
  {
    id: "G41",
    nama: "Sinyal WiFi penuh tetapi internet lambat",
    deskripsi: "Indikator sinyal penuh tapi kecepatan internet sangat lambat",
  },
  {
    id: "G42",
    nama: "DHCP failed pada perangkat",
    deskripsi: "Perangkat gagal mendapat DHCP lease dari router",
  },
  {
    id: "G43",
    nama: "Router tidak bisa menyimpan konfigurasi",
    deskripsi: "Konfigurasi router berubah sendiri atau tidak tersimpan",
  },
  {
    id: "G44",
    nama: "Sering diminta login ulang hotspot",
    deskripsi: "Frequently prompted untuk login kembali pada hotspot WiFi",
  },
  {
    id: "G45",
    nama: "Website HTTPS tertentu gagal dibuka",
    deskripsi: "Website dengan protokol HTTPS spesifik tidak dapat diakses",
  },
  {
    id: "G46",
    nama: "Internet normal melalui kabel tetapi WiFi lambat",
    deskripsi: "Koneksi via Ethernet lancar tapi WiFi sangat lambat",
  },
  {
    id: "G47",
    nama: "Ada perangkat asing terhubung ke jaringan",
    deskripsi: "Terdeteksi perangkat unknown terhubung ke WiFi",
  },
  {
    id: "G48",
    nama: "Router tidak dapat diakses melalui 192.168.x.x",
    deskripsi: "Interface admin router tidak bisa diakses via IP default",
  },
  {
    id: "G49",
    nama: "Koneksi putus saat microwave/perangkat elektronik aktif",
    deskripsi: "Koneksi WiFi terganggu ketika ada microwave atau elektronik berdaya besar aktif",
  },
  {
    id: "G50",
    nama: "Ping ke gateway timeout",
    deskripsi: "Tidak bisa ping gateway, koneksi ke router bermasalah",
  },
];

/** Tingkat keyakinan user terhadap gejala yang dialami */
export const CF_LEVELS = [0.2, 0.4, 0.6, 0.8, 1.0];

export const CF_LABELS = {
  0.2: "Tidak Yakin",
  0.4: "Kurang Yakin",
  0.6: "Cukup Yakin",
  0.8: "Yakin",
  1.0: "Sangat Yakin",
};
