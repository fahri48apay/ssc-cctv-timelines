import React, { useState } from 'react';
import { CCTVReport } from '../types/report';
import { exportSingleReportToExcel } from '../utils/excelHandler';
import { 
  Search, Calendar, FileText, Download, 
  Trash2, Edit3, Eye, CheckCircle2, Clock, Plus
} from 'lucide-react';

interface ArchiveListProps {
  reports: CCTVReport[];
  onSelectReport: (report: CCTVReport) => void;
  onEditReport: (report: CCTVReport) => void;
  onDeleteReport: (id: string) => void;
  onQuickApprove: (id: string, role: 'spv' | 'chief') => void;
  onCreateNew: () => void;
}

const ALL_MONTHS = [
  'SEMUA', 'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 
  'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 
  'OKTOBER', 'NOVEMBER', 'DESEMBER'
] as const;

export const ArchiveList: React.FC<ArchiveListProps> = ({
  reports,
  onSelectReport,
  onEditReport,
  onDeleteReport,
  onQuickApprove,
  onCreateNew
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('SEMUA');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');
  const [selectedStatus, setSelectedStatus] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReports = reports.filter(r => {
    // Month filter
    if (selectedMonth !== 'SEMUA' && r.bulan !== selectedMonth) return false;
    // Category filter
    if (selectedCategory !== 'SEMUA' && r.kategoriKejadian !== selectedCategory) return false;
    // Status filter
    if (selectedStatus !== 'SEMUA' && r.status !== selectedStatus) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        r.nomorLaporan.toLowerCase().includes(q) ||
        r.namaPelapor.toLowerCase().includes(q) ||
        r.jenisKejadian.toLowerCase().includes(q) ||
        r.lokasiKejadian.toLowerCase().includes(q) ||
        r.identitasOrangKendaraan.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span>Arsip Laporan Bulanan</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Database Berita Acara Rekaman CCTV Gedung SSC Tahun 2026
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Laporan Baru</span>
        </button>
      </div>

      {/* Month Scroll Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {ALL_MONTHS.map(m => {
          const isActive = selectedMonth === m;
          const count = m === 'SEMUA' ? reports.length : reports.filter(r => r.bulan === m).length;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMonth(m)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{m}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari no. laporan, nama pelapor, nopol..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 outline-none"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
          >
            <option value="SEMUA">Semua Kategori Insiden</option>
            <option value="Kehilangan Barang">Kehilangan Barang</option>
            <option value="Kerusakan / Senggolan Kendaraan">Kerusakan Kendaraan</option>
            <option value="Lift Macet / Emergency">Lift Macet / Emergency</option>
            <option value="Akses / Gangguan Keamanan">Akses Keamanan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
          >
            <option value="SEMUA">Semua Status Approval</option>
            <option value="approved">Disetujui (Approved)</option>
            <option value="submitted">Menunggu Review Spv</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Reports Table List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">Tidak ada laporan yang sesuai filter.</p>
            <p className="text-xs text-slate-500">Coba ubah filter bulan atau kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="p-4">No. Laporan</th>
                  <th className="p-4">Tanggal & Waktu</th>
                  <th className="p-4">Pelapor & Lokasi</th>
                  <th className="p-4">Rincian Kejadian</th>
                  <th className="p-4">Status & Approval</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-800/40 transition">
                    
                    {/* No. Laporan */}
                    <td className="p-4 font-mono font-bold text-cyan-400 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{report.nomorLaporan}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                        Bulan: {report.bulan}
                      </span>
                    </td>

                    {/* Tanggal & Waktu */}
                    <td className="p-4 align-top">
                      <div className="text-slate-200 font-medium">{report.hariTanggalKejadian}</div>
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold mt-0.5">{report.waktuKejadian}</div>
                    </td>

                    {/* Pelapor & Lokasi */}
                    <td className="p-4 align-top">
                      <div className="font-semibold text-slate-100">{report.namaPelapor}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{report.lokasiKejadian}</div>
                    </td>

                    {/* Rincian Kejadian */}
                    <td className="p-4 align-top max-w-xs">
                      <div className="font-medium text-slate-200 line-clamp-1">{report.jenisKejadian}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{report.identitasOrangKendaraan}</div>
                    </td>

                    {/* Status & Quick Approval */}
                    <td className="p-4 align-top">
                      <div className="space-y-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          report.status === 'approved' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' 
                            : report.status === 'submitted'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {report.status === 'approved' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approved</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>Pending Spv</span>
                            </>
                          )}
                        </span>

                        {/* Quick Spv / Chief Approval buttons */}
                        {report.status === 'submitted' && (
                          <div className="flex items-center gap-1 pt-1">
                            <button
                              type="button"
                              onClick={() => onQuickApprove(report.id, 'spv')}
                              className="text-[10px] px-2 py-0.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded transition"
                              title="Beri Approval Spv & Chief"
                            >
                              ✓ Approve
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="p-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectReport(report)}
                          className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg transition"
                          title="Lihat Berita Acara & Cetak"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => exportSingleReportToExcel(report)}
                          className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-lg transition"
                          title="Export ke XLSX"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditReport(report)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                          title="Edit Laporan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteReport(report.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition"
                          title="Hapus Laporan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
