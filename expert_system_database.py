"""
Script untuk membuat Excel file dengan database sistem pakar WiFi troubleshooting
"""

import pandas as pd
from io import BytesIO

# We'll create Excel files using pandas ExcelWriter

# ============================================================================
# SHEET 1: GANGGUAN (DISTURBANCES)
# ============================================================================
ws_gangguan = wb.create_sheet("Gangguan", 0)

gangguan_data = [
    ["Kode", "Nama Gangguan", "Deskripsi", "Severity", "Keterangan"],
    [
        "G01",
        "Koneksi WiFi Lambat",
        "Kecepatan internet WiFi di bawah standar",
        "medium",
        "Sering terjadi, biasanya bisa diatasi dengan optimization",
    ],
    [
        "G02",
        "Putus Koneksi Berulang",
        "WiFi terputus dan tersambung kembali secara berkali-kali",
        "high",
        "Critical, perlu investigasi segera",
    ],
    [
        "G03",
        "Sinyal Lemah",
        "Kekuatan sinyal WiFi sangat rendah di lokasi tertentu",
        "low",
        "Tergantung lokasi, bisa diatasi dengan repositioning AP",
    ],
    [
        "G04",
        "Latensi Tinggi",
        "Delay/ping tinggi saat mengakses internet",
        "medium",
        "Berdampak pada user experience VoIP dan gaming",
    ],
    [
        "G05",
        "Masalah Resolusi DNS",
        "Tidak bisa mengakses website atau akses lambat saat DNS lookup",
        "medium",
        "Bisa diatasi dengan ganti DNS server",
    ],
    [
        "G06",
        "Masalah DHCP (IP Assignment)",
        "Perangkat tidak mendapat IP address atau mendapat IP invalid",
        "high",
        "Perlu restart DHCP server atau AP",
    ],
    [
        "G07",
        "AP Overheating",
        "Perangkat Access Point panas dan performa menurun",
        "high",
        "Risk: Hardware damage, perlu penggantian",
    ],
    [
        "G08",
        "Gangguan Interferensi",
        "Sinyal WiFi terganggu oleh perangkat elektronik lain",
        "medium",
        "Bisa diatasi dengan perubahan channel",
    ],
    [
        "G09",
        "Kegagalan Autentikasi",
        "Perangkat tidak bisa login ke WiFi atau password terus error",
        "high",
        "Security issue, segera verifikasi",
    ],
    [
        "G10",
        "Kemacetan Bandwidth",
        "Bandwidth penuh, banyak perangkat terhubung, koneksi lambat",
        "high",
        "Perlu QoS management dan user education",
    ],
]

for row_idx, row_data in enumerate(gangguan_data, 1):
    for col_idx, value in enumerate(row_data, 1):
        cell = ws_gangguan.cell(row=row_idx, column=col_idx, value=value)

        if row_idx == 1:  # Header row
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center_align
        else:
            cell.alignment = Alignment(
                horizontal="left", vertical="top", wrap_text=True
            )

        cell.border = border

# Set column widths
ws_gangguan.column_dimensions["A"].width = 8
ws_gangguan.column_dimensions["B"].width = 25
ws_gangguan.column_dimensions["C"].width = 40
ws_gangguan.column_dimensions["D"].width = 12
ws_gangguan.column_dimensions["E"].width = 40

# Set row heights
for row in ws_gangguan.iter_rows(min_row=1, max_row=len(gangguan_data)):
    row[0].row_dimension.height = 30 if row[0].row == 1 else 40

# ============================================================================
# SHEET 2: PENYEBAB (CAUSES)
# ============================================================================
ws_penyebab = wb.create_sheet("Penyebab", 1)

penyebab_data = [
    ["Kode", "Penyebab", "Jenis", "CF Range Min", "CF Range Max", "Solusi"],
    [
        "P01",
        "Jarak jauh dari AP",
        "hardware",
        0.6,
        0.8,
        "Pindahkan AP lebih dekat atau tambah AP",
    ],
    [
        "P02",
        "Antena AP rusak atau tidak optimal",
        "hardware",
        0.7,
        0.9,
        "Ganti antena AP",
    ],
    [
        "P03",
        "Channel WiFi tidak optimal/penuh",
        "configuration",
        0.5,
        0.7,
        "Cek dan ubah WiFi channel",
    ],
    [
        "P04",
        "Bandwidth settings tidak sesuai",
        "configuration",
        0.4,
        0.6,
        "Optimalkan setting bandwidth 20MHz/40MHz",
    ],
    [
        "P05",
        "Daya transmit AP terlalu rendah",
        "configuration",
        0.6,
        0.8,
        "Tingkatkan TX power di AP settings",
    ],
    [
        "P06",
        "Kabel Ethernet rusak atau lepas",
        "hardware",
        0.8,
        0.95,
        "Periksa dan perbaiki kabel Ethernet",
    ],
    [
        "P07",
        "Router/AP mengalami overheating",
        "hardware",
        0.7,
        0.9,
        "Bersihkan AP, pastikan ventilasi baik",
    ],
    [
        "P08",
        "Firmware AP tidak up-to-date",
        "software",
        0.5,
        0.7,
        "Update firmware AP ke versi terbaru",
    ],
    [
        "P09",
        "Interferensi dari perangkat 2.4GHz lain",
        "environmental",
        0.6,
        0.8,
        "Ubah WiFi channel ke frekuensi yang lebih sepi",
    ],
    [
        "P10",
        "ISP/Provider koneksi internet bermasalah",
        "external",
        0.75,
        0.95,
        "Hubungi ISP, check ISP status",
    ],
    [
        "P11",
        "Jumlah user terlalu banyak (> 30 devices)",
        "load",
        0.6,
        0.85,
        "Limit koneksi per device, implementasi QoS",
    ],
    [
        "P12",
        "DNS Server tidak responsif",
        "service",
        0.65,
        0.85,
        "Ganti DNS server (8.8.8.8 atau 1.1.1.1)",
    ],
    [
        "P13",
        "DHCP Server sedang bermasalah",
        "service",
        0.7,
        0.9,
        "Restart DHCP service atau AP",
    ],
    [
        "P14",
        "IP Address range penuh/habis",
        "configuration",
        0.65,
        0.85,
        "Extend IP range atau optimize IP allocation",
    ],
    [
        "P15",
        "Perangkat klien mengalami hardware/driver problem",
        "client",
        0.5,
        0.75,
        "Update driver network card klien",
    ],
    [
        "P16",
        "MAC filtering aktif dan device MAC tidak terdaftar/terblokir",
        "security",
        0.8,
        0.95,
        "Register MAC address device atau disable MAC filter",
    ],
    [
        "P17",
        "Password WiFi salah, belum disimpan, atau kedaluwarsa",
        "security",
        0.75,
        0.95,
        "Verifikasi password WiFi dan pastikan input benar",
    ],
    [
        "P18",
        "Kapasitas memori AP penuh/RAM terbatas",
        "hardware",
        0.6,
        0.8,
        "Restart AP untuk clear memory",
    ],
    [
        "P19",
        "WPS aktif dan ada autentikasi issue",
        "security",
        0.4,
        0.6,
        "Disable WPS jika tidak diperlukan",
    ],
    [
        "P20",
        "Thermal throttling pada AP",
        "hardware",
        0.7,
        0.9,
        "Kurangi beban AP atau tingkatkan ventilasi",
    ],
    [
        "P21",
        "MAC spoofing atau MAC address collision terjadi",
        "security",
        0.65,
        0.85,
        "Periksa MAC uniqueness, disable MAC spoofing jika ada",
    ],
    [
        "P22",
        "WPA2/WPA3 encryption mismatch antara AP dan device",
        "security",
        0.7,
        0.9,
        "Sesuaikan encryption standard di AP atau device",
    ],
    [
        "P23",
        "SSID tersembunyi (hidden network) atau broadcast setting tidak sesuai",
        "configuration",
        0.6,
        0.8,
        "Enable SSID broadcast atau input SSID hidden secara manual",
    ],
]

for row_idx, row_data in enumerate(penyebab_data, 1):
    for col_idx, value in enumerate(row_data, 1):
        cell = ws_penyebab.cell(row=row_idx, column=col_idx, value=value)

        if row_idx == 1:  # Header row
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center_align
        else:
            if col_idx in [4, 5]:  # CF columns
                cell.alignment = center_align
            else:
                cell.alignment = Alignment(
                    horizontal="left", vertical="top", wrap_text=True
                )

        cell.border = border

# Set column widths
ws_penyebab.column_dimensions["A"].width = 8
ws_penyebab.column_dimensions["B"].width = 35
ws_penyebab.column_dimensions["C"].width = 15
ws_penyebab.column_dimensions["D"].width = 12
ws_penyebab.column_dimensions["E"].width = 12
ws_penyebab.column_dimensions["F"].width = 35

# ============================================================================
# SHEET 3: RULES
# ============================================================================
ws_rules = wb.create_sheet("Rules", 2)

rules_data = [
    [
        "Rule ID",
        "Penyebab 1",
        "Penyebab 2",
        "Penyebab 3",
        "Gangguan",
        "CF Rule",
        "Deskripsi",
    ],
    [
        "R001",
        "P01",
        "P03",
        "",
        "G01",
        0.85,
        "Jarak jauh + channel penuh -> WiFi lambat",
    ],
    ["R002", "P10", "", "", "G01", 0.9, "ISP problem -> WiFi lambat"],
    ["R003", "P11", "", "", "G01", 0.8, "User terlalu banyak -> WiFi lambat"],
    [
        "R004",
        "P06",
        "P10",
        "",
        "G02",
        0.9,
        "Kabel rusak + ISP problem -> Putus koneksi",
    ],
    [
        "R005",
        "P07",
        "P20",
        "",
        "G02",
        0.85,
        "Overheating + thermal throttling -> Putus koneksi",
    ],
    ["R006", "P15", "", "", "G02", 0.75, "Driver klien problem -> Putus koneksi"],
    [
        "R007",
        "P01",
        "P09",
        "",
        "G03",
        0.88,
        "Jarak jauh + interferensi -> Sinyal lemah",
    ],
    [
        "R008",
        "P02",
        "P05",
        "",
        "G03",
        0.82,
        "Antena rusak + daya rendah -> Sinyal lemah",
    ],
    ["R009", "P10", "", "", "G04", 0.85, "ISP problem -> Latensi tinggi"],
    ["R010", "P11", "", "", "G04", 0.8, "User terlalu banyak -> Latensi tinggi"],
    [
        "R011",
        "P12",
        "",
        "",
        "G05",
        0.9,
        "DNS server bermasalah -> DNS resolution issue",
    ],
    ["R012", "P10", "", "", "G05", 0.75, "ISP problem -> DNS issue"],
    [
        "R013",
        "P13",
        "P14",
        "",
        "G06",
        0.92,
        "DHCP rusak + IP range penuh -> DHCP problem",
    ],
    ["R014", "P13", "", "", "G06", 0.85, "DHCP server bermasalah -> DHCP problem"],
    [
        "R015",
        "P07",
        "P20",
        "P18",
        "G07",
        0.95,
        "Overheating + thermal throttling + RAM penuh -> AP overheat",
    ],
    ["R016", "P07", "", "", "G07", 0.88, "AP overheating -> AP problem"],
    ["R017", "P09", "", "", "G08", 0.87, "Interferensi 2.4GHz -> Interferensi"],
    ["R018", "P03", "", "", "G08", 0.75, "Channel tidak optimal -> Interferensi"],
    [
        "R019",
        "P16",
        "P17",
        "",
        "G09",
        0.93,
        "MAC filtering + password salah -> Auth fail",
    ],
    ["R020", "P17", "", "", "G09", 0.9, "Password salah -> Authentication failure"],
    [
        "R021",
        "P16",
        "",
        "",
        "G09",
        0.88,
        "MAC filtering blokir device -> Authentication failure",
    ],
    [
        "R022",
        "P22",
        "",
        "",
        "G09",
        0.87,
        "Encryption mismatch -> Authentication failure",
    ],
    ["R023", "P23", "", "", "G09", 0.85, "Hidden SSID issue -> Cannot connect"],
    [
        "R024",
        "P21",
        "",
        "",
        "G09",
        0.82,
        "MAC collision/spoofing -> Authentication failure",
    ],
    ["R025", "P11", "", "", "G10", 0.9, "User terlalu banyak -> Congestion"],
    [
        "R026",
        "P04",
        "",
        "",
        "G10",
        0.8,
        "Bandwidth settings tidak optimal -> Congestion",
    ],
    ["R027", "P08", "", "", "G01", 0.65, "Firmware outdated -> WiFi lambat"],
    ["R028", "P06", "", "", "G01", 0.88, "Kabel Ethernet rusak -> WiFi lambat"],
]

for row_idx, row_data in enumerate(rules_data, 1):
    for col_idx, value in enumerate(row_data, 1):
        cell = ws_rules.cell(row=row_idx, column=col_idx, value=value)

        if row_idx == 1:  # Header row
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center_align
        else:
            if col_idx in [2, 3, 4, 5, 6]:  # Numeric/code columns
                cell.alignment = center_align
            else:
                cell.alignment = Alignment(
                    horizontal="left", vertical="top", wrap_text=True
                )

        cell.border = border

# Set column widths
ws_rules.column_dimensions["A"].width = 10
ws_rules.column_dimensions["B"].width = 12
ws_rules.column_dimensions["C"].width = 12
ws_rules.column_dimensions["D"].width = 12
ws_rules.column_dimensions["E"].width = 10
ws_rules.column_dimensions["F"].width = 10
ws_rules.column_dimensions["G"].width = 45

# ============================================================================
# SHEET 4: SYMPTOM MAPPING
# ============================================================================
ws_symptoms = wb.create_sheet("Symptom Mapping", 3)

symptom_data = [
    [
        "Symptom ID",
        "Gejala Klien",
        "Penyebab Utama",
        "CF1",
        "Penyebab 2",
        "CF2",
        "Penyebab 3",
        "CF3",
        "Penyebab 4",
        "CF4",
    ],
    ["slow_connection", "WiFi lambat", "P01", 0.7, "P10", 0.85, "P11", 0.8, "P03", 0.6],
    [
        "frequent_disconnect",
        "WiFi sering putus",
        "P06",
        0.85,
        "P10",
        0.75,
        "P07",
        0.8,
        "P15",
        0.7,
    ],
    ["weak_signal", "Sinyal lemah", "P01", 0.85, "P02", 0.8, "P05", 0.7, "P09", 0.75],
    ["high_latency", "Ping/delay tinggi", "P10", 0.85, "P11", 0.8, "P04", 0.65, "", ""],
    ["dns_issue", "DNS lookup lambat", "P12", 0.9, "P10", 0.75, "", "", "", ""],
    [
        "cannot_connect",
        "Device tidak bisa konek",
        "P17",
        0.9,
        "P16",
        0.85,
        "P22",
        0.8,
        "P23",
        0.75,
    ],
    [
        "auth_failure_intermittent",
        "Autentikasi gagal kadang berhasil kadang tidak",
        "P16",
        0.8,
        "P21",
        0.75,
        "P22",
        0.7,
        "",
        "",
    ],
    [
        "mac_blocking_detected",
        "Device MAC terdeteksi tapi terblokir",
        "P16",
        0.95,
        "P21",
        0.7,
        "",
        "",
        "",
        "",
    ],
    [
        "encryption_mismatch",
        "Enkripsi WiFi tidak sesuai dengan device",
        "P22",
        0.9,
        "P17",
        0.6,
        "",
        "",
        "",
        "",
    ],
    [
        "ip_assignment_fail",
        "Device dapat IP invalid",
        "P13",
        0.9,
        "P14",
        0.85,
        "",
        "",
        "",
        "",
    ],
    ["ap_hot", "AP panas", "P07", 0.95, "P20", 0.9, "P18", 0.7, "", ""],
    ["many_devices", "Banyak device terhubung", "P11", 0.9, "P04", 0.7, "", "", "", ""],
    [
        "intermittent_issue",
        "Gangguan intermittent",
        "P06",
        0.7,
        "P09",
        0.75,
        "P15",
        0.8,
        "P08",
        0.6,
    ],
]

for row_idx, row_data in enumerate(symptom_data, 1):
    for col_idx, value in enumerate(row_data, 1):
        cell = ws_symptoms.cell(row=row_idx, column=col_idx, value=value)

        if row_idx == 1:  # Header row
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center_align
        else:
            if col_idx in [4, 6, 8, 10]:  # CF columns
                cell.alignment = center_align
            else:
                cell.alignment = Alignment(
                    horizontal="left", vertical="top", wrap_text=True
                )

        cell.border = border

# Set column widths
ws_symptoms.column_dimensions["A"].width = 18
ws_symptoms.column_dimensions["B"].width = 25
ws_symptoms.column_dimensions["C"].width = 12
ws_symptoms.column_dimensions["D"].width = 6
ws_symptoms.column_dimensions["E"].width = 12
ws_symptoms.column_dimensions["F"].width = 6
ws_symptoms.column_dimensions["G"].width = 12
ws_symptoms.column_dimensions["H"].width = 6
ws_symptoms.column_dimensions["I"].width = 12
ws_symptoms.column_dimensions["J"].width = 6

# ============================================================================
# SHEET 5: CF COMBINATION REFERENCE
# ============================================================================
ws_cf_ref = wb.create_sheet("CF Reference", 4)

cf_data = [
    ["CF Combination Formula", "Description"],
    ["CF_combined = CF₁ + CF₂(1 - CF₁)", "Kombinasi dua certainty factor"],
    ["", ""],
    ["Example:", ""],
    ["Jika CF₁ = 0.8 dan CF₂ = 0.6", "Maka:"],
    ["CF_combined = 0.8 + 0.6(1 - 0.8)", ""],
    ["CF_combined = 0.8 + 0.6(0.2)", ""],
    ["CF_combined = 0.8 + 0.12", ""],
    ["CF_combined = 0.92", "Hasil kombinasi"],
    ["", ""],
    ["Confidence Levels:", ""],
    ["CF ≥ 0.8", "Sangat Tinggi"],
    ["CF 0.6 - 0.8", "Tinggi"],
    ["CF 0.4 - 0.6", "Sedang"],
    ["CF < 0.4", "Rendah"],
    ["", ""],
    ["Technician Visit Recommendation:", ""],
    ["CF > 0.8 atau High Severity + CF > 0.7", "SANGAT DIREKOMENDASIKAN"],
    ["Multiple Disturbances Detected", "SANGAT DIREKOMENDASIKAN"],
    ["High Severity dengan CF > 0.7", "DIREKOMENDASIKAN"],
    ["Medium Confidence (CF > 0.5)", "PERTIMBANGKAN"],
    ["CF < 0.5", "TIDAK PERLU (coba troubleshoot manual)"],
]

for row_idx, row_data in enumerate(cf_data, 1):
    for col_idx, value in enumerate(row_data, 1):
        cell = ws_cf_ref.cell(row=row_idx, column=col_idx, value=value)

        if row_idx == 1:  # Header row
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center_align
        else:
            cell.alignment = Alignment(
                horizontal="left", vertical="top", wrap_text=True
            )

        cell.border = border

ws_cf_ref.column_dimensions["A"].width = 40
ws_cf_ref.column_dimensions["B"].width = 40

# ============================================================================
# SHEET 6: DOCUMENTATION
# ============================================================================
ws_doc = wb.create_sheet("Documentation", 5)

doc_content = [
    ["SISTEM PAKAR GANGGUAN WiFi - DOKUMENTASI"],
    [""],
    ["TUJUAN SISTEM:"],
    ["Membuat sistem pelaporan gangguan WiFi dari client ke provider untuk:"],
    ["1. Mendiagnosa gangguan WiFi secara otomatis"],
    ["2. Menemukan root cause penyebab gangguan"],
    ["3. Menentukan apakah teknisi perlu berkunjung ke lokasi"],
    [""],
    ["METODOLOGI:"],
    ["- Rule-Based Expert System"],
    ["- Forward Chaining Inference Engine"],
    ["- Certainty Factor (CF) Reasoning"],
    ["- Multi-evidence CF Combination"],
    [""],
    ["KOMPONEN SISTEM:"],
    ["1. Gangguan (G01-G10): 10 kategori gangguan WiFi utama"],
    ["2. Penyebab (P01-P20): 20 jenis penyebab gangguan"],
    ["3. Rules (R001-R024): 24 rules yang menghubungkan penyebab ke gangguan"],
    ["4. Symptom Mapping: Pemetaan gejala klien ke penyebab"],
    [""],
    ["CARA KERJA:"],
    ["1. Klien melaporkan gejala yang dialami"],
    ["2. Sistem memetakan gejala ke penyebab potensial dengan CF values"],
    ["3. Forward chaining engine mengaplikasikan rules untuk diagnosis"],
    ["4. CF values dikombinasikan menggunakan formula: CF = CF₁ + CF₂(1 - CF₁)"],
    ["5. Sistem menghasilkan diagnosis dengan confidence level"],
    ["6. Sistem merekomendasikan apakah perlu kunjungan teknisi"],
    [""],
    ["PENGGUNAAN:"],
    ["- Buka file wifi_expert_system.ipynb di Jupyter Notebook"],
    ["- Jalankan semua cells untuk menginisialisasi sistem"],
    ["- Input gejala klien menggunakan complaint_form.get_complaint_input()"],
    ["- Run forward chaining untuk mendapat diagnosis"],
    ["- Generate report untuk dokumentasi"],
]

for row_idx, row_data in enumerate(doc_content, 1):
    cell = ws_doc.cell(row=row_idx, column=1, value=row_data[0])

    if row_idx == 1:  # Title
        cell.fill = PatternFill(
            start_color="203864", end_color="203864", fill_type="solid"
        )
        cell.font = Font(bold=True, color="FFFFFF", size=12)
        cell.alignment = center_align
    elif row_data[0] in [
        "TUJUAN SISTEM:",
        "METODOLOGI:",
        "KOMPONEN SISTEM:",
        "CARA KERJA:",
        "PENGGUNAAN:",
    ]:
        cell.fill = subheader_fill
        cell.font = subheader_font
    else:
        cell.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)

    cell.border = border

ws_doc.column_dimensions["A"].width = 80

# Save workbook
output_file = r"c:\laragon\www\wifi_troubleshoot\WiFi_Expert_System_Database.xlsx"
wb.save(output_file)
print(f"✓ Excel file created: {output_file}")
print(f"  Sheets: {', '.join(wb.sheetnames)}")
