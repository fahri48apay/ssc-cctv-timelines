import React, { useState, useEffect } from 'react';
import { CCTVReport } from './types/report';
import { AuthUser } from './types/auth';
import { INITIAL_REPORTS } from './data/seedReports';
import { DashboardStats } from './components/DashboardStats';
import { ReportForm } from './components/ReportForm';
import { ArchiveList } from './components/ArchiveList';
import { PrintableReport } from './components/PrintableReport';
import { LoginPage } from './components/LoginPage';
import { exportAllReportsToWorkbook, parseExcelToReports } from './utils/excelHandler';
import { 
  Shield, LayoutDashboard, Calendar, 
  Upload, Download, Plus, CheckCircle2, AlertCircle,
  LogOut, User as UserIcon
} from 'lucide-react';

const STORAGE_KEY = 'ssc_cctv_reports_v1';
const AUTH_KEY = 'ssc_cctv_auth_user_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load auth state', e);
    }
    return null;
  });

  const [reports, setReports] = useState<CCTVReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load reports from storage', e);
    }
    return INITIAL_REPORTS;
  });

  const [currentView, setCurrentView] = useState<'dashboard' | 'form' | 'archive'>('dashboard');
  const [editingReport, setEditingReport] = useState<CCTVReport | undefined>(undefined);
  const [viewingReport, setViewingReport] = useState<CCTVReport | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to save reports to storage', e);
    }
  }, [reports]);

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist auth user', e);
    }
    showNotification(`Akses diberikan: ${user.roleTitle} (${user.badgeNumber})`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Failed to remove auth session', e);
    }
    showNotification('Anda telah berhasil keluar dari sistem.', 'info');
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveReport = (report: CCTVReport) => {
    setReports(prev => {
      const exists = prev.some(r => r.id === report.id);
      if (exists) {
        return prev.map(r => (r.id === report.id ? report : r));
      } else {
        return [report, ...prev];
      }
    });

    setEditingReport(undefined);
    setCurrentView('archive');
    showNotification(`Laporan ${report.nomorLaporan} berhasil disimpan!`);
  };

  const handleDeleteReport = (id: string) => {
    if (window.confirm('Yakin ingin menghapus laporan ini?')) {
      setReports(prev => prev.filter(r => r.id !== id));
      showNotification('Laporan berhasil dihapus.', 'info');
    }
  };

  const handleQuickApprove = (id: string, role: 'spv' | 'chief') => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === id) {
          const updated = { ...r };
          if (role === 'spv') {
            updated.spvOperasional = {
              ...updated.spvOperasional,
              approved: true,
              tanggal: new Date().toLocaleDateString('id-ID')
            };
            updated.srChiefOperasional = {
              ...updated.srChiefOperasional,
              approved: true,
              tanggal: new Date().toLocaleDateString('id-ID')
            };
            updated.status = 'approved';
          }
          return updated;
        }
        return r;
      })
    );
    showNotification('Laporan telah disetujui & diverifikasi!', 'success');
  };

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await parseExcelToReports(file);
      if (imported.length > 0) {
        setReports(prev => {
          const newReports = [...(imported as CCTVReport[]), ...prev];
          const seen = new Set<string>();
          return newReports.filter(r => {
            if (seen.has(r.nomorLaporan)) return false;
            seen.add(r.nomorLaporan);
            return true;
          });
        });
        showNotification(`Berhasil mengimpor ${imported.length} laporan dari Excel!`, 'success');
      } else {
        showNotification('Tidak ada laporan yang terbaca dari file Excel.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal membaca file Excel. Pastikan format sesuai.', 'info');
    }
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case 'chief':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'spv':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 border border-cyan-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl animate-fade-in text-xs font-semibold">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-cyan-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              <span>SSC CCTV TIMELINES</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-cyan-950 text-cyan-400 border border-cyan-800/50 rounded">
                v1.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Gedung Sahid Sudirman Center</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => { setCurrentView('dashboard'); setEditingReport(undefined); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => { setCurrentView('archive'); setEditingReport(undefined); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'archive'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Arsip Laporan</span>
          </button>

          <button
            type="button"
            onClick={() => { setCurrentView('form'); setEditingReport(undefined); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentView === 'form' && !editingReport
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buat Baru</span>
          </button>
        </nav>

        {/* User Info & Actions */}
        <div className="flex items-center gap-2.5">
          {/* User Role Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-200 leading-none">{currentUser.roleTitle}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{currentUser.badgeNumber}</div>
            </div>
            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded border font-medium ${getRoleBadgeClasses(currentUser.role)}`}>
              {currentUser.shift || 'Online'}
            </span>
          </div>

          <label className="cursor-pointer flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition">
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Import</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelImport}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => exportAllReportsToWorkbook(reports)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 rounded-xl text-xs font-semibold transition"
            title="Download Semua Laporan Format Excel"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold transition"
            title="Keluar dari sistem"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {currentView === 'dashboard' && (
          <DashboardStats
            reports={reports}
            onCreateNew={() => {
              setEditingReport(undefined);
              setCurrentView('form');
            }}
            onExportAll={() => exportAllReportsToWorkbook(reports)}
            onSelectReport={(rep) => setViewingReport(rep)}
          />
        )}

        {currentView === 'archive' && (
          <ArchiveList
            reports={reports}
            onSelectReport={(rep) => setViewingReport(rep)}
            onEditReport={(rep) => {
              setEditingReport(rep);
              setCurrentView('form');
            }}
            onDeleteReport={handleDeleteReport}
            onQuickApprove={handleQuickApprove}
            onCreateNew={() => {
              setEditingReport(undefined);
              setCurrentView('form');
            }}
          />
        )}

        {currentView === 'form' && (
          <ReportForm
            initialReport={editingReport}
            onSave={handleSaveReport}
            onCancel={() => {
              setEditingReport(undefined);
              setCurrentView('archive');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        <p>
          SSC CCTV Timelines &copy; 2026 — Sistem Investigasi &amp; Berita Acara Rekaman CCTV Gedung Sahid Sudirman Center.
        </p>
      </footer>

      {/* Modal Printable Report (A4 Berita Acara) */}
      {viewingReport && (
        <PrintableReport
          report={viewingReport}
          onClose={() => setViewingReport(null)}
          onEdit={(rep) => {
            setViewingReport(null);
            setEditingReport(rep);
            setCurrentView('form');
          }}
        />
      )}
    </div>
  );
}
