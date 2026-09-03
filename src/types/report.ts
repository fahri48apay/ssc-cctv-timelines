export type IncidentCategory = 
  | 'Kehilangan Barang'
  | 'Kerusakan / Senggolan Kendaraan'
  | 'Lift Macet / Emergency'
  | 'Akses / Gangguan Keamanan'
  | 'Lainnya';

export type ReportStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface TimelineItem {
  id: string;
  waktu: string;
  aktivitas: string;
}

export interface OfficerSignature {
  nama: string;
  jabatan: string;
  tanggal: string;
  approved?: boolean;
  catatan?: string;
  signatureImage?: string;
}

export interface CCTVReport {
  id: string;
  bulan: 'JANUARI' | 'FEBRUARI' | 'MARET' | 'APRIL' | 'MEI' | 'JUNI' | 'JULI' | 'AGUSTUS' | 'SEPTEMBER' | 'OKTOBER' | 'NOVEMBER' | 'DESEMBER';
  tahun: number;
  
  // 1. Identitas Permintaan & Pemeriksaan CCTV
  nomorLaporan: string; // e.g., "LP/No. 19/VII/SSC/2026"
  tanggalLaporan: string;
  namaPelapor: string;
  nikPaspor?: string;
  jenisKelamin?: 'Laki-laki' | 'Perempuan';
  pekerjaan?: string;
  perusahaan?: string;
  noTelepon?: string;
  alamat?: string;
  lokasiCCTV: string; // e.g., "Lantai 3 ( Parkir casual )"
  nomorKamera: string; // e.g., "CCTV NO 02", "GF No. 07"
  viewCamera: string; // e.g., "View lot H3", "Selasar Starbuck"

  // 2. Data Kejadian
  hariTanggalKejadian: string;
  waktuKejadian: string;
  lokasiKejadian: string;
  kategoriKejadian: IncidentCategory;
  jenisKejadian: string; // Rincian teks spesifik
  uraianSingkat?: string;

  // 3. Hasil Pemeriksaan Rekaman
  timeline: TimelineItem[];
  aktivitasTerekam: string;
  identitasOrangKendaraan: string;
  barangTerlibat: string;
  durasiVideo: string;
  fileRekamanCCTV: string; // Status file rekaman / penyimpanan
  screenshotUrls?: string[];

  // 4. Analisa Pemeriksaan
  temuanPenting: string[];
  dugaanPenyebab: string;
  keterbatasanRekaman?: string; // Blind spot / sudut pandang terhalang

  // 5. Kesimpulan & Rekomendasi
  ringkasanPemeriksaan: string;
  rekomendasiTindakLanjut: string[];
  buktiKepolisian?: string;

  // 6. Penutup & Pengesahan
  status: ReportStatus;
  petugasCCTV: OfficerSignature;
  spvOperasional: OfficerSignature;
  srChiefOperasional: OfficerSignature;

  createdAt: string;
  updatedAt: string;
}

export interface CCTVCameraStats {
  area: 'INDOOR' | 'OUTDOOR';
  jumlah: number;
  keterangan: 'NORMAL' | 'MAINTENANCE' | 'OFFLINE';
}
