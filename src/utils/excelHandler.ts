import * as XLSX from 'xlsx';
import { CCTVReport } from '../types/report';

export function exportSingleReportToExcel(report: CCTVReport): void {
  const wb = XLSX.utils.book_new();

  const wsData: (string | number)[][] = [
    ['JUMLAH CCTV GEDUNG SAHID SUDIRMAN CENTER', '', '', ''],
    ['', '', '', ''],
    ['AREA CCTV', 'JUMLAH CCTV', 'JUMLAH', 'KETERANGAN'],
    ['INDOOR', '', '', 'NORMAL'],
    ['OUTDOOR', '', '', 'NORMAL'],
    ['JUMLAH KESELURUHAN CCTV', '', '', ''],
    ['', '', '', ''],
    ['LAPORAN HASIL PEMERIKSAAN REKAMAN CCTV', '', '', ''],
    ['', '', '', ''],
    ['1. IDENTITAS PERMINTAAN & PEMERIKSAAN CCTV', '', '', ''],
    ['NO. LAPORAN', 'TANGGAL LAPORAN', 'NAMA PELAPOR', 'LOKASI CCTV', 'VIEW CAMERA'],
    [report.nomorLaporan, report.tanggalLaporan, report.namaPelapor, report.lokasiCCTV, report.viewCamera],
    ['', '', '', ''],
    ['2. DATA KEJADIAN', '', '', ''],
    ['HARI/TANGGAL', 'WAKTU KEJADIAN', 'LOKASI KEJADIAN', 'JENIS KEJADIAN', 'KATEGORI'],
    [report.hariTanggalKejadian, report.waktuKejadian, report.lokasiKejadian, report.jenisKejadian, report.kategoriKejadian],
    ['', '', '', ''],
    ['3. HASIL PEMERIKSAAN REKAMAN', '', '', ''],
    ['KRONOLOGI ( Timeline )', 'Aktivitas yang Terekam', 'Identitas Orang / Kendaraan', 'Barang yang Terlibat'],
    [
      report.timeline.map(t => `${t.waktu} ${t.aktivitas}`).join('\n'),
      report.aktivitasTerekam,
      report.identitasOrangKendaraan,
      report.barangTerlibat
    ],
    ['', '', '', ''],
    ['BUKTI PENDUKUNG', '', '', ''],
    ['Durasi Video', 'File Rekaman CCTV', 'Nomor Camera CCTV', 'Bukti Kepolisian'],
    [report.durasiVideo, report.fileRekamanCCTV, report.nomorKamera, report.buktiKepolisian || 'Tidak terlampir'],
    ['', '', '', ''],
    ['4. ANALISA PEMERIKSAAN', '', '', ''],
    ['Temuan Penting', 'Dugaan Penyebab Kejadian', 'Keterbatasan Rekaman ( Jika Ada )', ''],
    [
      report.temuanPenting.join('\n'),
      report.dugaanPenyebab,
      report.keterbatasanRekaman || 'Tidak ada',
      ''
    ],
    ['', '', '', ''],
    ['5. KESIMPULAN & REKOMENDASI', '', '', ''],
    ['Ringkasan Hasil Pemeriksaan CCTV', 'Rekomendasi & Tindak Lanjut', '', ''],
    [
      report.ringkasanPemeriksaan,
      report.rekomendasiTindakLanjut.join('\n'),
      '',
      ''
    ],
    ['', '', '', ''],
    ['6. PENUTUP & PENGESAHAN', '', '', ''],
    ['Laporan ini kami buat sebagai bentuk dokumentasi dan Evaluasi sistem CCTV Gedung SSC.'],
    ['', '', '', ''],
    ['Petugas', 'Mengetahui', '', 'Menyetujui'],
    ['', '', '', ''],
    ['', '', '', ''],
    [
      report.petugasCCTV.jabatan || 'CCTV Staf',
      report.spvOperasional.jabatan || 'Spv. Oprasional',
      '',
      report.srChiefOperasional.jabatan || 'Sr.Chief Oprasional'
    ]
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 30 },
    { wch: 35 },
    { wch: 30 },
    { wch: 35 },
    { wch: 25 }
  ];

  const sheetName = report.bulan.substring(0, 3) || 'LAPORAN';
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const cleanFilename = report.nomorLaporan.replace(/[^a-zA-Z0-9_-]/g, '_');
  XLSX.writeFile(wb, `${cleanFilename}.xlsx`);
}

export function exportAllReportsToWorkbook(reports: CCTVReport[]): void {
  const wb = XLSX.utils.book_new();

  const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'] as const;

  months.forEach(month => {
    const monthReports = reports.filter(r => r.bulan === month);
    if (monthReports.length === 0) return;

    const rows: (string | number)[][] = [
      ['LAPORAN HASIL PEMERIKSAAN REKAMAN CCTV - BULAN ' + month, '', '', '', ''],
      ['No. Laporan', 'Tanggal', 'Nama Pelapor', 'Lokasi', 'Jenis Kejadian', 'Status']
    ];

    monthReports.forEach(r => {
      rows.push([
        r.nomorLaporan,
        r.tanggalLaporan,
        r.namaPelapor,
        r.lokasiKejadian,
        r.jenisKejadian,
        r.status.toUpperCase()
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 25 }, { wch: 30 }, { wch: 40 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws, month);
  });

  XLSX.writeFile(wb, `LAPORAN_PETUGAS_CCTV_SSC_2026.xlsx`);
}

export async function parseExcelToReports(file: File): Promise<Partial<CCTVReport>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const importedReports: Partial<CCTVReport>[] = [];

        workbook.SheetNames.forEach((sheetName) => {
          if (sheetName.startsWith('microsoft') || sheetName === 'Sheet1') return;

          const worksheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

          let nomorLaporan = '';
          let tanggalLaporan = '';
          let namaPelapor = '';
          let lokasiCCTV = '';
          let viewCamera = '';
          let hariTanggalKejadian = '';
          let waktuKejadian = '';
          let lokasiKejadian = '';
          let jenisKejadian = '';
          let aktivitasTerekam = '';
          let identitasOrangKendaraan = '';
          let barangTerlibat = '';
          let durasiVideo = '';
          let nomorKamera = '';
          let ringkasanPemeriksaan = '';
          let dugaanPenyebab = '';

          for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i] || [];
            const r0 = String(row[0] || '').trim();

            if (r0.includes('LP/No.')) {
              nomorLaporan = r0;
              tanggalLaporan = String(row[1] || '').trim();
              namaPelapor = String(row[2] || '').trim();
              lokasiCCTV = String(row[3] || '').trim();
              viewCamera = String(row[4] || '').trim();
            }

            if (r0 === 'HARI/TANGGAL' && rawData[i + 1]) {
              const nextRow = rawData[i + 1] || [];
              hariTanggalKejadian = String(nextRow[0] || '').trim();
              waktuKejadian = String(nextRow[1] || '').trim();
              lokasiKejadian = String(nextRow[2] || '').trim();
              jenisKejadian = String(nextRow[3] || '').trim();
            }

            if (r0 === 'KRONOLOGI ( Timeline )' && rawData[i + 1]) {
              const nextRow = rawData[i + 1] || [];
              aktivitasTerekam = String(nextRow[1] || '').trim();
              identitasOrangKendaraan = String(nextRow[2] || '').trim();
              barangTerlibat = String(nextRow[3] || '').trim();
            }

            if (r0 === 'Durasi Video' && rawData[i + 1]) {
              const nextRow = rawData[i + 1] || [];
              durasiVideo = String(nextRow[0] || '').trim();
              nomorKamera = String(nextRow[2] || nextRow[3] || '').trim();
            }

            if (r0.includes('Ringkasan') && rawData[i + 1]) {
              const nextRow = rawData[i + 1] || [];
              ringkasanPemeriksaan = String(nextRow[0] || '').trim();
            }
          }

          if (nomorLaporan || jenisKejadian) {
            importedReports.push({
              id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              bulan: sheetName.toUpperCase() as any,
              tahun: 2026,
              nomorLaporan: nomorLaporan || `LP/No. ${importedReports.length + 1}/${sheetName.substring(0, 3)}/SSC/2026`,
              tanggalLaporan: tanggalLaporan || new Date().toLocaleDateString('id-ID'),
              namaPelapor: namaPelapor || 'Pelapor SSC',
              lokasiCCTV: lokasiCCTV || 'Gedung SSC',
              nomorKamera: nomorKamera || 'CCTV SSC',
              viewCamera: viewCamera || '-',
              hariTanggalKejadian: hariTanggalKejadian || tanggalLaporan,
              waktuKejadian: waktuKejadian || '12:00 WIB',
              lokasiKejadian: lokasiKejadian || lokasiCCTV,
              kategoriKejadian: jenisKejadian.toLowerCase().includes('hilang') ? 'Kehilangan Barang' : 'Kerusakan / Senggolan Kendaraan',
              jenisKejadian: jenisKejadian || 'Pemeriksaan Rekaman CCTV',
              timeline: [],
              aktivitasTerekam: aktivitasTerekam || '-',
              identitasOrangKendaraan: identitasOrangKendaraan || '-',
              barangTerlibat: barangTerlibat || '-',
              durasiVideo: durasiVideo || '15 Menit',
              fileRekamanCCTV: 'Tersimpan',
              temuanPenting: [],
              dugaanPenyebab: dugaanPenyebab || 'Pemeriksaan rutin / investigasi kejadian',
              ringkasanPemeriksaan: ringkasanPemeriksaan || 'Selesai diperiksa oleh tim CCTV',
              rekomendasiTindakLanjut: ['Koordinasi tindak lanjut dengan security'],
              status: 'submitted',
              petugasCCTV: { nama: 'M. Fahri Saleh', jabatan: 'CCTV Staf', tanggal: new Date().toLocaleDateString('id-ID') },
              spvOperasional: { nama: 'Untung Slamet', jabatan: 'Spv. Operasional', tanggal: new Date().toLocaleDateString('id-ID'), approved: false },
              srChiefOperasional: { nama: 'Ali Bambang', jabatan: 'Sr. Chief Operasional', tanggal: new Date().toLocaleDateString('id-ID'), approved: false },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
        });

        resolve(importedReports);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
