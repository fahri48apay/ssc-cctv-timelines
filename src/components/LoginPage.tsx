import React, { useState } from 'react';
import { AuthUser, PRESET_USERS, UserRole } from '../types/auth';
import { 
  Shield, 
  User, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff,
  ArrowRight
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !pin.trim()) {
      setError('Harap isi username / kode jabatan dan PIN.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const match = PRESET_USERS.find(
        p => (p.user.username.toLowerCase() === username.trim().toLowerCase() ||
              p.user.badgeNumber.toLowerCase() === username.trim().toLowerCase() ||
              p.user.roleTitle.toLowerCase() === username.trim().toLowerCase()) &&
             p.pin === pin.trim()
      );

      if (match) {
        onLogin(match.user);
      } else {
        setError('Kredensial tidak valid. Silakan pilih jabatan dari opsi cepat di bawah atau periksa kembali input.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickLogin = (preset: typeof PRESET_USERS[0]) => {
    setUsername(preset.user.username);
    setPin(preset.pin);
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      onLogin(preset.user);
    }, 250);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'chief':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'spv':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'operator':
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Live CCTV Signal Status Bar */}
      <div className="z-10 mb-6 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-md">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wider uppercase font-semibold text-emerald-400">SSC SURVEILLANCE SYSTEM</span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">SECURE GATEWAY</span>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Main Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              SSC CCTV Timelines
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Portal Akses Berdasarkan Jabatan Operasional
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Username / Jabatan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. operator.cctv, spv.operasional"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                PIN Akses
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Default: 1234"
                  maxLength={10}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-sm text-white placeholder-slate-600 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk Sistem</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Role Selection / Fast Switch */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pilih Jabatan (Login Cepat)
              </span>
              <span className="text-[11px] text-cyan-400/80 font-mono">PIN: 1234</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {PRESET_USERS.map((item) => (
                <button
                  key={item.user.id}
                  onClick={() => handleQuickLogin(item)}
                  type="button"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {item.user.roleTitle}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.user.badgeNumber} • {item.user.username}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-md border font-medium ${getRoleBadgeColor(item.user.role)}`}>
                    Pilih
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SSC CCTV Command & Security Center. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
