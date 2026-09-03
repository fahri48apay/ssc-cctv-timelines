# 🛡️ SSC CCTV Timelines

Sistem Pelaporan, Investigasi Rekaman, & Manajemen Berita Acara CCTV — **Gedung Sahid Sudirman Center (SSC)**.

Dibangun khusus untuk mendigitalkan alur investigasi CCTV control room dari form Excel manual ke web app modern yang terstruktur, anti-typo, dan terhubung dua arah dengan Spreadsheet (`.xlsx`).

---

## ✨ Fitur Utama

- 📝 **Form 6 Section Resmi**: Form standar investigasi CCTV Gedung SSC lengkap dengan penomoran otomatis `LP/No. XX/MM/SSC/YYYY`.
- ⏱️ **Interactive Timeline Builder**: Rekonstruksi kronologi kejadian per-menit dengan preset cepat (Drop-off, Parkir, Koridor/Toilet).
- 🖨️ **Cetak & Export PDF Berita Acara A4**: Format kop surat resmi SSC dengan 3 kolom paraf pengesahan (Petugas CCTV, Spv Operasional, Sr. Chief Operasional).
- 📊 **Monitoring Hotspot & Blind Spot**: Dashboard analitik pemetaan jenis insiden dan titik kamera yang terhalang.
- 📁 **Arsip & Log Bulanan**: Filter laporan per bulan (Januari–Desember 2026), filter kategori insiden, dan status approval.
- 📑 **Konektivitas Spreadsheet Dua Arah**:
  - **Export XLSX**: Download laporan satuan atau seluruh bulan sekaligus dalam format Excel standar SSC.
  - **Import XLSX**: Baca dan parse file Excel `LAPORAN PETUGAS CCTV.xlsx` lama ke dalam database aplikasi.

---

## 🚀 Cara Menjalankan

```bash
# Masuk ke folder project
cd ~/Timelines

# Install dependencies (jika belum)
npm install

# Jalankan dev server lokal
npm run dev

# Build untuk production
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Slate & Cyan Cyber Security Theme)
- **Icons**: Lucide React
- **Spreadsheet Engine**: SheetJS (`xlsx`) — Client-side XLSX Parser & Generator
- **Storage**: Local-First (localStorage persistence)
