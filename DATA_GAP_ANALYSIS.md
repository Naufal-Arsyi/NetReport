# 📊 ANALISIS DATA: Excel vs Code Saat Ini

## ✅ GEJALA

### Excel (Actual Data)

Total: 49 gejala (G01 - G49)

**Basic (G01-G10):**

- G01: WiFi terasa lambat
- G02: Tidak bisa terhubung ke WiFi
- G03: WiFi sering putus nyambung
- G04: Internet connected tetapi tidak bisa browsing
- G05: Sinyal WiFi lemah
- G06: Semua perangkat tidak mendapat internet
- G07: Hanya satu perangkat yang bermasalah
- G08: Ping tinggi / lag saat meeting atau gaming
- G09: Router atau access point sering restart sendiri
- G10: Tidak bisa membuka website tertentu

**Extended (G11-G49):**

- G11: indikator LOS Modem Menyala
- G12: Indikator PON Modem Menyala
- G13: WiFi hanya bermasalah pada jam tertentu
- G14: Router terasa sangat panas
- G15: Modem tidak mendapatkan IP WAN
- G16: Lampu internet modem berkedip terus
- G17: WiFi muncul tetapi tidak ada akses internet
- G18: Sering muncul pesan "IP conflict detected"
- G19: Perangkat harus reconnect berkali-kali
- G20: Kecepatan download sangat lambat tetapi upload normal
- G21: Kecepatan upload sangat lambat tetapi download normal
- G22: Website tertentu diblokir atau tidak dapat diakses
- G23: Semua perangkat mendapat IP yang sama
- G24: Router sering freeze/hang
- G25: Sinyal WiFi hilang saat jauh sedikit dari router
- G26: Ping normal tetapi browsing lambat
- G27: Game online disconnect terus
- G28: YouTube buffering terus
- G29: WiFi connect tetapi "No Internet Access"
- G30: Router reboot saat banyak perangkat terhubung
- G31: Tidak bisa mendapatkan alamat IP otomatis
- G32: DNS resolving sangat lambat
- G33: Kabel LAN terasa longgar
- G34: Lampu LAN modem tidak menyala
- G35: Modem sering restart setelah listrik turun
- G36: WiFi 2.4GHz normal tetapi 5GHz hilang
- G37: WiFi 5GHz normal tetapi 2.4GHz bermasalah
- G38: Internet putus saat hujan
- G39: LOS berkedip merah
- G40: PON berkedip tidak normal
- G41: Sinyal WiFi penuh tetapi internet lambat
- G42: DHCP failed pada perangkat
- G43: Router tidak bisa menyimpan konfigurasi
- G44: Sering diminta login ulang hotspot
- G45: Website HTTPS tertentu gagal dibuka
- G46: Internet normal melalui kabel tetapi WiFi lambat
- G47: Ada perangkat asing terhubung ke jaringan
- G48: Router tidak dapat diakses melalui 192.168.x.x
- G49: Koneksi putus saat microwave/perangkat elektronik aktif

### Code Saat Ini

Total: 10 gejala (G01 - G10) ❌ KURANG 39 GEJALA

---

## ✅ PENYEBAB UTAMA (PU)

### Excel (Actual Data)

Total: 18 penyebab (P01 - P18)

- P01: Bandwidth penuh / overload pengguna
- P02: Gangguan dari ISP utama
- P03: Router overload
- P04: Access Point rusak
- P05: Kabel putus / longgar
- P06: DHCP bermasalah
- P07: Konflik IP Address
- P08: Interferensi sinyal WiFi
- P09: Jarak perangkat terlalu jauh
- P10: Perangkat client bermasalah (Modem)
- P11: DNS bermasalah
- P12: Firmware router bermasalah
- P13: Adaptor/power router tidak stabil
- P14: Firewall atau blokir website
- P15: Konfigurasi router salah
- P16: TX RX power tidak cukup (standar)
- P17: Kabel tertekuk
- P18: (dari R17) - belum clear

### Code Saat Ini

Total: 10 penyebab (P01 - P10) ❌ KURANG 8 PENYEBAB

---

## ✅ RULES

### Excel (Actual Data)

Total: 17 rules (R01 - R17)

**Format: Multiple gejala → 1 penyebab dengan CF expert**

- R01: {G01,G08,G13,G20,G21,G27,G28,G30,G41} → P01 (CF: 0.8) | Dispatch: Tidak perlu teknisi
- R02: {G04,G06,G11,G15,G16,G17,G29,G38,G39,G40} → P03 (CF: 0.7) | Dispatch: Remote troubleshooting
- R03: {G09,G14,G24,G30,G43,G48} → P04 (CF: 0.6) | Dispatch: Tidak perlu teknisi
- R04: {G05,G25,G36,G37,G46,G49} → P05 (CF: 0.9) | Dispatch: Tidak perlu teknisi
- R05: {G03,G06,G33,G34,G38,G50} → P06 (CF: 0.9) | Dispatch: Teknisi onsite
- R06: {G06,G23,G31,G42} → P07 (CF: 0.7) | Dispatch: Remote troubleshooting
- R07: {G02,G18,G23,G31} → P08 (CF: 0.8) | Dispatch: Remote troubleshooting
- R08: {G05,G08,G25,G49} → P09 (CF: 0.8) | Dispatch: Tidak perlu teknisi
- R09: {G05,G25,G41,G46} → P10 (CF: 0.7) | Dispatch: Teknisi onsite
- R10: {G07,G19,G42} → P11 (CF: 0.9) | Dispatch: Teknisi onsite
- R11: {G10,G26,G32,G45} → P12 (CF: 0.6) | Dispatch: Tidak perlu teknisi
- R12: {G09,G24,G43,G48} → P13 (CF: 0.7) | Dispatch: Remote troubleshooting
- R13: {G09,G14,G35} → P14 (CF: ?) | Dispatch: ?
- R14: {G10,G22,G45} → P15 (CF: ?) | Dispatch: ?
- R15: {G17,G29,G31,G48} → P16 (CF: ?) | Dispatch: ?
- R16: {G11,G39,G40} → P17 (CF: ?) | Dispatch: ?
- R17: {G03,G33,G34,G50} → P18 (CF: ?) | Dispatch: ?

### Code Saat Ini

Total: ~30+ rules BUT:

- Format: 1 gejala → 1 penyebab (berbeda dengan Excel!)
- Hanya untuk P01-P10 (tidak ada P11-P18)
- CF expert values berbeda ❌ STRUKTUR BERBEDA

---

## 📋 RINGKASAN GAP

| Aspek     | Excel   | Code       | Gap                 |
| --------- | ------- | ---------- | ------------------- |
| Gejala    | 49      | 10         | -39 ⚠️              |
| Penyebab  | 18      | 10         | -8 ⚠️               |
| Rules     | 17      | 30+        | ⚠️ Struktur berbeda |
| CF Expert | Defined | Normalized | ⚠️                  |
| Dispatch  | Yes     | Yes        | ✓                   |

---

## 🔄 REKOMENDASI

**Urgent:**

1. ✅ Add gejala G11-G49 ke data layer
2. ✅ Add penyebab P11-P18 ke data layer
3. ✅ Ubah struktur rules dari (1 gejala → 1 penyebab) ke (multiple gejala → 1 penyebab)
4. ✅ Update CF algorithm untuk handle multiple gejala per rule
5. ✅ Map dispatch type (self/remote/onsite) dari Excel ke code

**Priority:** Pekerjaan ini cukup besar, perlu refactor database layer & algorithm.
