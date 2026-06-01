import { PENYEBAB } from "../data/penyebab.js";
import { RULES } from "../data/rules.js";

/**
 * Mesin inferensi Forward Chaining dengan Certainty Factor.
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  ALGORITMA CERTAINTY FACTOR (Shortliffe & Buchanan)     │
 * │                                                         │
 * │  1. CF_expert   = bobot dari rule (sudah 0.0-1.0)       │
 * │  2. Untuk setiap rule: cari gejala yang match dari      │
 * │     gejala yang dipilih user                            │
 * │  3. CF_combined = CF_user × CF_expert  (per gejala)     │
 * │  4. CF_new = CF_old + CF_curr × (1 – CF_old)            │
 * │     → kombinasi sekuensial untuk banyak gejala          │
 * │                                                         │
 * │  Forward Chaining:                                      │
 * │  • Fakta awal : gejala dipilih user dengan confidence   │
 * │  • Inferensi  : telusuri rules yang match (multi-gejala)│
 * │  • Konklusi   : top-3 penyebab dengan CF tertinggi      │
 * └─────────────────────────────────────────────────────────┘
 *
 * @param {Record<string, number>} selected  { [kodeGejala]: nilaiCF (0.2–1.0) }
 * @returns {{ id, nama, dispatch, solusi, cf }[]}  Top-3 penyebab
 */
export function calcCF(selected) {
  const scores = {};

  for (const p of PENYEBAB) {
    let cf = 0;

    for (const rule of RULES) {
      if (rule.penyebab !== p.id) continue;

      // Cari gejala dari rule yang cocok dengan gejala user
      // (rule memiliki multiple gejala)
      const matchedGejala = rule.gejala.filter((g) => selected[g] != null);

      if (matchedGejala.length === 0) continue; // tidak ada gejala yang match

      // Ambil CF dari gejala yang paling tinggi keyakinannya
      const maxCfUser = Math.max(...matchedGejala.map((g) => selected[g]));

      const cfExpert = rule.bobot; // sudah dalam format 0.0-1.0
      const cfCombined = maxCfUser * cfExpert; // evidence per rule

      cf = cf + cfCombined * (1 - cf); // kombinasi sekuensial
    }

    if (cf > 0) scores[p.id] = cf;
  }

  return Object.entries(scores)
    .map(([id, cf]) => ({ ...PENYEBAB.find((p) => p.id === id), cf }))
    .sort((a, b) => b.cf - a.cf)
    .slice(0, 3);
}

/**
 * Mengambil daftar gejala yang cocok dengan penyebab tertentu
 * berdasarkan gejala yang dipilih user.
 *
 * Untuk format multi-gejala per rule, kita collect semua gejala
 * dari rules yang punya penyebab ini dan cocok dengan selected.
 *
 * @param {string} penyebabId
 * @param {Record<string, number>} selected
 * @returns {string[]} Kode gejala yang match
 */
export function getMatchedGejala(penyebabId, selected) {
  const matched = new Set();

  for (const rule of RULES) {
    if (rule.penyebab !== penyebabId) continue;

    // Cari gejala dari rule yang cocok dengan selected
    const matchedInRule = rule.gejala.filter((g) => selected[g] != null);

    // Tambahkan ke set
    matchedInRule.forEach((g) => matched.add(g));
  }

  return Array.from(matched);
}
