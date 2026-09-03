import React from 'react';
import { CCTVReport } from '../types/report';
import { exportSingleReportToExcel } from '../utils/excelHandler';
import { Printer, Download, Edit3, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface PrintableReportProps {
  report: CCTVReport;
  onClose: () => void;
  onEdit?: (report: CCTVReport) => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ report, onClose, onEdit }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container */}
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl my-auto">
        
        {/* Top Action Bar (Hidden during print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-md">
              {report.nomorLaporan}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
              report.status === 'approved' 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                : report.status === 'submitted'
                ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {report.status === 'approved' ? 'Disetujui' : report.status === 'submitted' ? 'Menunggu Spv' : 'Draft'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(report)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => exportSingleReportToExcel(report)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export XLSX</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/20 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official A4 Printable Document Body */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:max-h-none print:overflow-visible">
          
          {/* Header Kop Resmi */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
            <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
              SAHID SUDIRMAN CENTER
            </h1>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
              BUILDING MANAGEMENT — CCTV CONTROL ROOM DEPARTMENT
            </p>
            <div className="mt-3 inline-block bg-slate-900 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded">
              LAPORAN HASIL PEMERIKSAAN REKAMAN CCTV
            </div>
          </div>

          {/* Section 1 */}
          <div className="mb-5">
            <div className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-bold uppercase border border-slate-400">
              1. IDENTITAS PERMINTAAN & PEMERIKSAAN CCTV
            </div>
            <table className="w-full text-xs border-collapse border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="w-1/4 p-2 font-semibold bg-slate-100 border-r border-slate-300">NO. LAPORAN</td>
                  <td className="w-1/4 p-2 font-mono font-bold text-slate-900 border-r border-slate-300">{report.nomorLaporan}</td>
                  <td className="w-1/4 p-2 font-semibold bg-slate-100 border-r border-slate-300">TANGGAL LAPORAN</td>
                  <td className="w-1/4 p-2">{report.tanggalLaporan}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">NAMA PELAPOR</td>
                  <td className="p-2 font-semibold border-r border-slate-300">{report.namaPelapor}</td>
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">NIK / NO. PASPOR</td>
                  <td className="p-2 font-mono">{report.nikPaspor || '-'}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">PERUSAHAAN / TENANT</td>
                  <td className="p-2 border-r border-slate-300">{report.perusahaan || '-'}</td>
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">NO. KONTAK</td>
                  <td className="p-2 font-mono">{report.noTelepon || '-'}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">LOKASI TITIK CCTV</td>
                  <td className="p-2 border-r border-slate-300">{report.lokasiCCTV}</td>
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">NO. & VIEW KAMERA</td>
                  <td className="p-2">{report.nomorKamera} — {report.viewCamera}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2 */}
          <div className="mb-5">
            <div className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-bold uppercase border border-slate-400">
              2. DATA KEJADIAN
            </div>
            <table className="w-full text-xs border-collapse border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="w-1/4 p-2 font-semibold bg-slate-100 border-r border-slate-300">HARI / TANGGAL</td>
                  <td className="w-1/4 p-2 border-r border-slate-300">{report.hariTanggalKejadian}</td>
                  <td className="w-1/4 p-2 font-semibold bg-slate-100 border-r border-slate-300">WAKTU KEJADIAN</td>
                  <td className="w-1/4 p-2 font-mono font-bold">{report.waktuKejadian}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">LOKASI KEJADIAN</td>
                  <td className="p-2 border-r border-slate-300 font-medium">{report.lokasiKejadian}</td>
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">KATEGORI INSIDEN</td>
                  <td className="p-2 font-medium">{report.kategoriKejadian}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold bg-slate-100 border-r border-slate-300">JENIS / RINCIAN KEJADIAN</td>
                  <td colSpan={3} className="p-2 font-semibold text-slate-900">{report.jenisKejadian}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3 */}
          <div className="mb-5">
            <div className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-bold uppercase border border-slate-400">
              3. HASIL PEMERIKSAAN REKAMAN & KRONOLOGI (TIMELINE)
            </div>
            <div className="border border-slate-300 p-3 space-y-3">
              {report.timeline.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Urutan Waktu Kronologi:</div>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      {report.timeline.map((item, idx) => (
                        <tr key={item.id || idx} className="border-b border-slate-200">
                          <td className="w-28 py-1.5 pr-2 font-mono font-bold text-slate-800 align-top">{item.waktu}</td>
                          <td className="py-1.5 pl-2 text-slate-700 align-top">{item.aktivitas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Identitas Orang / Kendaraan:</span>
                  <p className="mt-0.5 text-slate-800">{report.identitasOrangKendaraan || '-'}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Barang yang Terlibat:</span>
                  <p className="mt-0.5 text-slate-800">{report.barangTerlibat || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Durasi Video:</span>
                  <p className="font-mono">{report.durasiVideo}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">File Rekaman:</span>
                  <p>{report.fileRekamanCCTV}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Laporan Polisi:</span>
                  <p>{report.buktiKepolisian || 'Tidak terlampir'}</p>
                </div>
              </div>

              {report.screenshotUrls && report.screenshotUrls.length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Lampiran Screenshot CCTV:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {report.screenshotUrls.map((url, idx) => (
                      <div key={idx} className="border border-slate-300 rounded overflow-hidden aspect-video bg-slate-100">
                        <img src={url} alt={`Bukti ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-5">
            <div className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-bold uppercase border border-slate-400">
              4. ANALISA PEMERIKSAAN
            </div>
            <div className="border border-slate-300 p-3 space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-700">Temuan Penting:</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-800">
                  {report.temuanPenting.filter(t => t.trim()).map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="font-semibold text-slate-700">Dugaan Penyebab:</span>
                  <p className="mt-0.5 text-slate-800">{report.dugaanPenyebab}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Keterbatasan Rekaman (Blind Spot):</span>
                  <p className="mt-0.5 text-slate-800">{report.keterbatasanRekaman || 'Tidak ada keterbatasan.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-6">
            <div className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-bold uppercase border border-slate-400">
              5. KESIMPULAN & REKOMENDASI TINDAK LANJUT
            </div>
            <div className="border border-slate-300 p-3 space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-700">Ringkasan Hasil Pemeriksaan:</span>
                <p className="mt-0.5 text-slate-800 font-medium">{report.ringkasanPemeriksaan}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-700">Rekomendasi Tindak Lanjut:</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-800">
                  {report.rekomendasiTindakLanjut.filter(r => r.trim()).map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6: Signatures */}
          <div className="mb-2">
            <p className="text-[11px] text-slate-600 italic mb-4 text-center">
              "Laporan ini kami buat sebagai bentuk dokumentasi dan Evaluasi sistem CCTV Gedung Sahid Sudirman Center."
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              {/* Petugas */}
              <div className="border border-slate-300 p-3 rounded flex flex-col justify-between h-32">
                <div className="font-bold text-slate-800">Petugas</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Diverifikasi</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">{report.petugasCCTV.jabatan || 'CCTV Staf'}</div>
                </div>
              </div>

              {/* Spv */}
              <div className="border border-slate-300 p-3 rounded flex flex-col justify-between h-32">
                <div className="font-bold text-slate-800">Mengetahui</div>
                <div className={`text-[11px] font-semibold flex items-center justify-center gap-1 ${
                  report.spvOperasional.approved ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {report.spvOperasional.approved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Pending Review</span>
                    </>
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{report.spvOperasional.jabatan || 'Spv. Oprasional'}</div>
                </div>
              </div>

              {/* Chief */}
              <div className="border border-slate-300 p-3 rounded flex flex-col justify-between h-32">
                <div className="font-bold text-slate-800">Menyetujui</div>
                <div className={`text-[11px] font-semibold flex items-center justify-center gap-1 ${
                  report.srChiefOperasional.approved ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {report.srChiefOperasional.approved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Pending Approval</span>
                    </>
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{report.srChiefOperasional.jabatan || 'Sr.Chief Oprasional'}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
