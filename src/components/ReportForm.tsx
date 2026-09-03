import React, { useState } from 'react';
import { CCTVReport, IncidentCategory, ReportStatus } from '../types/report';
import { TimelineBuilder } from './TimelineBuilder';
import { 
  FileText, Calendar, Camera, User, ShieldAlert, 
  HelpCircle, CheckCircle2, Save, Send, ArrowLeft, Plus, X, Upload
} from 'lucide-react';

interface ReportFormProps {
  initialReport?: CCTVReport;
  onSave: (report: CCTVReport) => void;
  onCancel: () => void;
}

const ROMAN_MONTHS: Record<string, string> = {
  JANUARI: 'I',
  FEBRUARI: 'II',
  MARET: 'III',
  APRIL: 'IV',
  MEI: 'V',
  JUNI: 'VI',
  JULI: 'VII',
  AGUSTUS: 'VIII',
  SEPTEMBER: 'IX',
  OKTOBER: 'X',
  NOVEMBER: 'XI',
  DESEMBER: 'XII'
};

export const ReportForm: React.FC<ReportFormProps> = ({ initialReport, onSave, onCancel }) => {
  const currentMonthIndex = new Date().getMonth();
  const monthNames = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'] as const;
  const currentMonthName = monthNames[currentMonthIndex];

  const [formData, setFormData] = useState<CCTVReport>(() => {
    if (initialReport) return initialReport;

    const defaultReportNo = `LP/No. ${String(Math.floor(Math.random() * 90 + 10))}/${ROMAN_MONTHS[currentMonthName]}/SSC/2026`;
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return {
      id: `report-${Date.now()}`,
      bulan: currentMonthName,
      tahun: 2026,
      nomorLaporan: defaultReportNo,
      tanggalLaporan: today,
      namaPelapor: '',
      nikPaspor: '',
      jenisKelamin: 'Laki-laki',
      pekerjaan: '',
      perusahaan: '',
      noTelepon: '',
      alamat: '',
      lokasiCCTV: '',
      nomorKamera: '',
      viewCamera: '',
      hariTanggalKejadian: today,
      waktuKejadian: '12:00 WIB',
      lokasiKejadian: '',
      kategoriKejadian: 'Kehilangan Barang',
      jenisKejadian: '',
      uraianSingkat: '',
      timeline: [],
      aktivitasTerekam: '',
      identitasOrangKendaraan: '',
      barangTerlibat: '',
      durasiVideo: '15 Menit',
      fileRekamanCCTV: 'Play Back internal tersimpan di server',
      screenshotUrls: [],
      temuanPenting: [''],
      dugaanPenyebab: '',
      keterbatasanRekaman: '',
      ringkasanPemeriksaan: '',
      rekomendasiTindakLanjut: [''],
      buktiKepolisian: 'Tidak terlampir',
      status: 'draft',
      petugasCCTV: {
        nama: 'M. Fahri Saleh',
        jabatan: 'CCTV Staf',
        tanggal: new Date().toLocaleDateString('id-ID')
      },
      spvOperasional: {
        nama: 'Untung Slamet',
        jabatan: 'Spv. Operasional',
        tanggal: new Date().toLocaleDateString('id-ID'),
        approved: false
      },
      srChiefOperasional: {
        nama: 'Ali Bambang',
        jabatan: 'Sr. Chief Operasional',
        tanggal: new Date().toLocaleDateString('id-ID'),
        approved: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });

  const [activeSection, setActiveSection] = useState<number>(1);

  const updateField = <K extends keyof CCTVReport>(field: K, value: CCTVReport[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleArrayChange = (field: 'temuanPenting' | 'rekomendasiTindakLanjut', index: number, value: string) => {
    const list = [...formData[field]];
    list[index] = value;
    updateField(field, list);
  };

  const addArrayItem = (field: 'temuanPenting' | 'rekomendasiTindakLanjut') => {
    updateField(field, [...formData[field], '']);
  };

  const removeArrayItem = (field: 'temuanPenting' | 'rekomendasiTindakLanjut', index: number) => {
    updateField(field, formData[field].filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          const base64 = loadEv.target.result as string;
          setFormData(prev => ({
            ...prev,
            screenshotUrls: [...(prev.screenshotUrls || []), base64]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshotUrls: (prev.screenshotUrls || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (targetStatus: ReportStatus) => {
    const finalReport = {
      ...formData,
      status: targetStatus,
      updatedAt: new Date().toISOString()
    };
    onSave(finalReport);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              {initialReport ? 'Edit Laporan Investigasi CCTV' : 'Buat Laporan Baru'}
            </h1>
            <p className="text-xs text-slate-400">
              Form Berita Acara Pemeriksaan Rekaman CCTV Gedung Sahid Sudirman Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('submitted')}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/20 transition"
          >
            <Send className="w-4 h-4" />
            <span>Kirim ke Spv</span>
          </button>
        </div>
      </div>

      {/* Section Navigator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {[
          { num: 1, label: '1. Identitas', icon: User },
          { num: 2, label: '2. Kejadian', icon: Calendar },
          { num: 3, label: '3. Timeline', icon: Camera },
          { num: 4, label: '4. Analisa', icon: ShieldAlert },
          { num: 5, label: '5. Rekomendasi', icon: HelpCircle },
          { num: 6, label: '6. Pengesahan', icon: CheckCircle2 }
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.num;
          return (
            <button
              key={sec.num}
              type="button"
              onClick={() => setActiveSection(sec.num)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold border transition ${
                isActive 
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/50' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: Identitas Permintaan */}
      {activeSection === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
              IDENTITAS PERMINTAAN & PEMERIKSAAN CCTV
            </h2>
            <p className="text-xs text-slate-400 mt-1">Data surat laporan, pihak pelapor, dan titik kamera yang diinvestigasi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nomor Laporan</label>
              <input
                type="text"
                value={formData.nomorLaporan}
                onChange={(e) => updateField('nomorLaporan', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Bulan Laporan</label>
              <select
                value={formData.bulan}
                onChange={(e) => updateField('bulan', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              >
                {monthNames.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Tanggal Laporan Dibuat</label>
              <input
                type="text"
                value={formData.tanggalLaporan}
                onChange={(e) => updateField('tanggalLaporan', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nama Pelapor *</label>
              <input
                type="text"
                value={formData.namaPelapor}
                onChange={(e) => updateField('namaPelapor', e.target.value)}
                placeholder="Contoh: Yudi Kristanto"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">NIK / No. Paspor</label>
              <input
                type="text"
                value={formData.nikPaspor || ''}
                onChange={(e) => updateField('nikPaspor', e.target.value)}
                placeholder="3275011301820032"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Jenis Kelamin</label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => updateField('jenisKelamin', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Pekerjaan</label>
              <input
                type="text"
                value={formData.pekerjaan || ''}
                onChange={(e) => updateField('pekerjaan', e.target.value)}
                placeholder="Driver / Karyawan / Tenant"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Perusahaan / Tenant</label>
              <input
                type="text"
                value={formData.perusahaan || ''}
                onChange={(e) => updateField('perusahaan', e.target.value)}
                placeholder="PT. MAP / Tenant Lantai 17"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">No. Telepon / WhatsApp</label>
              <input
                type="text"
                value={formData.noTelepon || ''}
                onChange={(e) => updateField('noTelepon', e.target.value)}
                placeholder="087876892560"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Lokasi Titik CCTV</label>
              <input
                type="text"
                value={formData.lokasiCCTV}
                onChange={(e) => updateField('lokasiCCTV', e.target.value)}
                placeholder="Lantai 3 (Parkir Casual)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nomor Kamera CCTV</label>
              <input
                type="text"
                value={formData.nomorKamera}
                onChange={(e) => updateField('nomorKamera', e.target.value)}
                placeholder="CCTV NO 02 / GF No. 07"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">View / Sudut Kamera</label>
              <input
                type="text"
                value={formData.viewCamera}
                onChange={(e) => updateField('viewCamera', e.target.value)}
                placeholder="View lot H3 / Drop-off"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Data Kejadian */}
      {activeSection === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">2</span>
              DATA KEJADIAN
            </h2>
            <p className="text-xs text-slate-400 mt-1">Waktu, tempat spesifik, dan kategori insiden yang dilaporkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Hari / Tanggal Kejadian</label>
              <input
                type="text"
                value={formData.hariTanggalKejadian}
                onChange={(e) => updateField('hariTanggalKejadian', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Waktu Kejadian (WIB)</label>
              <input
                type="text"
                value={formData.waktuKejadian}
                onChange={(e) => updateField('waktuKejadian', e.target.value)}
                placeholder="11:30 WIB"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Lokasi Spesifik Kejadian</label>
              <input
                type="text"
                value={formData.lokasiKejadian}
                onChange={(e) => updateField('lokasiKejadian', e.target.value)}
                placeholder="Parkir Casual Lantai 3 Lot H3"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Kategori Kejadian</label>
              <select
                value={formData.kategoriKejadian}
                onChange={(e) => updateField('kategoriKejadian', e.target.value as IncidentCategory)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              >
                <option value="Kehilangan Barang">Kehilangan Barang</option>
                <option value="Kerusakan / Senggolan Kendaraan">Kerusakan / Senggolan Kendaraan</option>
                <option value="Lift Macet / Emergency">Lift Macet / Emergency</option>
                <option value="Akses / Gangguan Keamanan">Akses / Gangguan Keamanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Rincian Jenis Kejadian</label>
              <input
                type="text"
                value={formData.jenisKejadian}
                onChange={(e) => updateField('jenisKejadian', e.target.value)}
                placeholder="Kehilangan kunci mobil beserta dompet kunci"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Uraian Kejadian Awal</label>
            <textarea
              rows={3}
              value={formData.uraianSingkat || ''}
              onChange={(e) => updateField('uraianSingkat', e.target.value)}
              placeholder="Kronologis awal berdasarkan penuturan pelapor saat datang ke pos CCTV..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-y"
            />
          </div>
        </div>
      )}

      {/* SECTION 3: Hasil Pemeriksaan & Timeline Builder */}
      {activeSection === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
              HASIL PEMERIKSAAN REKAMAN & KRONOLOGI
            </h2>
            <p className="text-xs text-slate-400 mt-1">Penyusunan urutan waktu playback dan barang/objek yang terlibat.</p>
          </div>

          {/* Interactive Timeline Builder */}
          <TimelineBuilder
            timeline={formData.timeline}
            onChange={(items) => updateField('timeline', items)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Aktivitas yang Terekam (Rangkuman)</label>
              <textarea
                rows={2}
                value={formData.aktivitasTerekam}
                onChange={(e) => updateField('aktivitasTerekam', e.target.value)}
                placeholder="Rangkuman aktivitas subjek/pelapor di kamera..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Identitas Orang / Kendaraan yang Terlibat</label>
              <textarea
                rows={2}
                value={formData.identitasOrangKendaraan}
                onChange={(e) => updateField('identitasOrangKendaraan', e.target.value)}
                placeholder="Mobil Hyundai Creta nopol B 2650 PIR / Taksi Blue Bird LL2650"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Barang yang Terlibat</label>
              <input
                type="text"
                value={formData.barangTerlibat}
                onChange={(e) => updateField('barangTerlibat', e.target.value)}
                placeholder="Dompet Kunci / iPhone 14 / Bemper Depan"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Durasi Video Pemeriksaan</label>
              <input
                type="text"
                value={formData.durasiVideo}
                onChange={(e) => updateField('durasiVideo', e.target.value)}
                placeholder="108 Menit / 15 Menit / 46 Detik"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Status File Rekaman CCTV</label>
              <input
                type="text"
                value={formData.fileRekamanCCTV}
                onChange={(e) => updateField('fileRekamanCCTV', e.target.value)}
                placeholder="Tersimpan di storage server CCTV"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          {/* Screenshot Bukti Upload */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Lampiran Screenshot Rekaman CCTV</span>
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold border border-slate-700 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto / Screenshot</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.screenshotUrls && formData.screenshotUrls.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.screenshotUrls.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-950">
                    <img src={url} alt={`Bukti ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-center text-slate-500 text-xs">
                Belum ada screenshot yang dilampirkan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 4: Analisa Pemeriksaan */}
      {activeSection === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">4</span>
              ANALISA PEMERIKSAAN
            </h2>
            <p className="text-xs text-slate-400 mt-1">Temuan kunci, dugaan penyebab kejadian, dan catatan blind spot kamera.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-400 font-medium">Daftar Temuan Penting</label>
              <button
                type="button"
                onClick={() => addArrayItem('temuanPenting')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Poin Temuan</span>
              </button>
            </div>

            {formData.temuanPenting.map((temuan, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 w-5 text-right">{idx + 1}.</span>
                <input
                  type="text"
                  value={temuan}
                  onChange={(e) => handleArrayChange('temuanPenting', idx, e.target.value)}
                  placeholder="Contoh: Kunci tidak terlihat terjatuh saat driver beraktivitas di area view CCTV..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none"
                />
                {formData.temuanPenting.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('temuanPenting', idx)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Dugaan Penyebab Kejadian</label>
              <textarea
                rows={3}
                value={formData.dugaanPenyebab}
                onChange={(e) => updateField('dugaanPenyebab', e.target.value)}
                placeholder="Kelalaian saat meninggalkan kendaraan / kurang hati-hati saat manuver..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Keterbatasan Rekaman (Jika Ada / Blind Spot)</label>
              <textarea
                rows={3}
                value={formData.keterbatasanRekaman || ''}
                onChange={(e) => updateField('keterbatasanRekaman', e.target.value)}
                placeholder="Sudut pandang kamera terhalang tiang/kendaraan (Blind Spot)..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Kesimpulan & Rekomendasi */}
      {activeSection === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">5</span>
              KESIMPULAN & REKOMENDASI TINDAK LANJUT
            </h2>
            <p className="text-xs text-slate-400 mt-1">Kesimpulan akhir hasil pemeriksaan dan rekomendasi ke pihak security/manajemen.</p>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Ringkasan Hasil Pemeriksaan CCTV</label>
            <textarea
              rows={3}
              value={formData.ringkasanPemeriksaan}
              onChange={(e) => updateField('ringkasanPemeriksaan', e.target.value)}
              placeholder="Hasil pemeriksaan visual menunjukkan..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 outline-none resize-y"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-400 font-medium">Rekomendasi & Tindak Lanjut</label>
              <button
                type="button"
                onClick={() => addArrayItem('rekomendasiTindakLanjut')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Rekomendasi</span>
              </button>
            </div>

            {formData.rekomendasiTindakLanjut.map((rek, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 w-5 text-right">{idx + 1}.</span>
                <input
                  type="text"
                  value={rek}
                  onChange={(e) => handleArrayChange('rekomendasiTindakLanjut', idx, e.target.value)}
                  placeholder="Contoh: Pihak Security memfasilitasi mediasi antara kedua belah pihak..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none"
                />
                {formData.rekomendasiTindakLanjut.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('rekomendasiTindakLanjut', idx)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Status Laporan Kepolisian (LP)</label>
            <input
              type="text"
              value={formData.buktiKepolisian || ''}
              onChange={(e) => updateField('buktiKepolisian', e.target.value)}
              placeholder="Menyertakan bukti laporan Kepolisian / Tidak terlampir / Mediasi damai"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
            />
          </div>
        </div>
      )}

      {/* SECTION 6: Pengesahan & Multi-Role Sign-off */}
      {activeSection === 6 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">6</span>
              PENUTUP & PENGESAHAN LAPORAN
            </h2>
            <p className="text-xs text-slate-400 mt-1">Status persetujuan berjenjang: Petugas CCTV, Spv. Operasional, dan Sr. Chief Operasional.</p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 italic">
            "Laporan ini kami buat sebagai bentuk dokumentasi dan Evaluasi sistem CCTV Gedung Sahid Sudirman Center."
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box Petugas CCTV */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Petugas</div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  value={formData.petugasCCTV.jabatan}
                  onChange={(e) => updateField('petugasCCTV', { ...formData.petugasCCTV, jabatan: e.target.value })}
                  placeholder="CCTV Staf"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>
              <div className="text-[11px] text-slate-500 italic">
                * Pembuat laporan Berita Acara
              </div>
            </div>

            {/* Box Spv Operasional */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span>Mengetahui</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${formData.spvOperasional.approved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {formData.spvOperasional.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  value={formData.spvOperasional.jabatan}
                  onChange={(e) => updateField('spvOperasional', { ...formData.spvOperasional, jabatan: e.target.value })}
                  placeholder="Spv. Oprasional"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Status Verifikasi</label>
                <select
                  value={formData.spvOperasional.approved ? 'true' : 'false'}
                  onChange={(e) => updateField('spvOperasional', { ...formData.spvOperasional, approved: e.target.value === 'true' })}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="false">Menunggu Verifikasi</option>
                  <option value="true">Disetujui Spv</option>
                </select>
              </div>
            </div>

            {/* Box Sr Chief Operasional */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center justify-between">
                <span>Menyetujui</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${formData.srChiefOperasional.approved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {formData.srChiefOperasional.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  value={formData.srChiefOperasional.jabatan}
                  onChange={(e) => updateField('srChiefOperasional', { ...formData.srChiefOperasional, jabatan: e.target.value })}
                  placeholder="Sr.Chief Oprasional"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Status Approval Final</label>
                <select
                  value={formData.srChiefOperasional.approved ? 'true' : 'false'}
                  onChange={(e) => {
                    const approved = e.target.value === 'true';
                    updateField('srChiefOperasional', { ...formData.srChiefOperasional, approved });
                    if (approved) updateField('status', 'approved');
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="false">Menunggu Persetujuan</option>
                  <option value="true">Disetujui & Diterbitkan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Between Sections */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          disabled={activeSection === 1}
          onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition"
        >
          &larr; Section Sebelumnya
        </button>

        {activeSection < 6 ? (
          <button
            type="button"
            onClick={() => setActiveSection(prev => Math.min(6, prev + 1))}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-cyan-600/20"
          >
            Lanjut ke Section {activeSection + 1} &rarr;
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSubmit('submitted')}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-emerald-600/20"
          >
            Simpan & Selesaikan Laporan
          </button>
        )}
      </div>
    </div>
  );
};
