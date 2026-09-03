import React from 'react';
import { CCTVReport } from '../types/report';
import { 
  ShieldCheck, Video, EyeOff, 
  MapPin, TrendingUp, CheckCircle, Clock, FileSpreadsheet, Plus
} from 'lucide-react';

interface DashboardStatsProps {
  reports: CCTVReport[];
  onCreateNew: () => void;
  onExportAll: () => void;
  onSelectReport: (report: CCTVReport) => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  reports,
  onCreateNew,
  onExportAll,
  onSelectReport
}) => {
  const totalReports = reports.length;
  const approvedReports = reports.filter(r => r.status === 'approved').length;
  const pendingReports = reports.filter(r => r.status === 'submitted').length;
  const blindSpotReports = reports.filter(r => r.keterbatasanRekaman && r.keterbatasanRekaman.toLowerCase().includes('blind')).length;

  // Group by category
  const categoryCounts: Record<string, number> = {};
  reports.forEach(r => {
    categoryCounts[r.kategoriKejadian] = (categoryCounts[r.kategoriKejadian] || 0) + 1;
  });

  // Group by location hotspots
  const locationCounts: Record<string, number> = {};
  reports.forEach(r => {
    const loc = r.lokasiKejadian || r.lokasiCCTV;
    locationCounts[loc] = (locationCounts[loc] || 0) + 1;
  });

  const sortedLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner / Quick Action */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            CCTV Control Room Active — Gedung Sahid Sudirman Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Monitoring & Investigasi Rekaman CCTV
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Sistem rekapitulasi berita acara, rekonstruksi timeline kejadian per menit, dan pemetaan titik rawan investigasi kamera SSC.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onExportAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Rekap Excel</span>
          </button>
          <button
            type="button"
            onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Investigasi</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalReports}</div>
          <p className="text-[11px] text-slate-400">Total Berita Acara terdaftar</p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Disetujui Chief</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">{approvedReports}</div>
          <p className="text-[11px] text-slate-400">Laporan resmi berparaf</p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Menunggu Review</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">{pendingReports}</div>
          <p className="text-[11px] text-slate-400">Perlu review Spv/Chief</p>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Catatan Blind Spot</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <EyeOff className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">{blindSpotReports}</div>
          <p className="text-[11px] text-slate-400">Area butuh penyesuaian kamera</p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kategori Kejadian */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">Distribusi Jenis Kejadian</h2>
            </div>
            <span className="text-xs text-slate-500">Tahun 2026</span>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalReports) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat}</span>
                    <span className="font-mono text-cyan-400 font-semibold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Titik Hotspot Lokasi Kejadian */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Titik Lokasi Paling Sering Diinvestigasi</h2>
            </div>
            <span className="text-xs text-slate-500">Top Hotspots</span>
          </div>

          <div className="space-y-2.5">
            {sortedLocations.map(([loc, count], idx) => (
              <div key={loc} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{loc}</div>
                    <div className="text-[10px] text-slate-400">Gedung Sahid Sudirman Center</div>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {count} Kasus
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Investigations List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">Laporan Kejadian Terkini</h2>
          </div>
          <span className="text-xs text-slate-400">{reports.length} Laporan Tersimpan</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {reports.slice(0, 4).map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="p-4 sm:p-5 hover:bg-slate-800/50 cursor-pointer transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2 py-0.5 rounded">
                    {report.nomorLaporan}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-300 font-medium">{report.tanggalLaporan}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    report.status === 'approved' 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                  {report.jenisKejadian}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Pelapor: <strong className="text-slate-300">{report.namaPelapor}</strong></span>
                  <span>Lokasi: <strong className="text-slate-300">{report.lokasiKejadian}</strong></span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-cyan-400 font-semibold group-hover:underline">
                  Lihat Berita Acara &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
