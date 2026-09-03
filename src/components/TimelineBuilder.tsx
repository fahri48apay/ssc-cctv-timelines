import React, { useState } from 'react';
import { TimelineItem } from '../types/report';
import { Plus, Trash2, Clock } from 'lucide-react';

interface TimelineBuilderProps {
  timeline: TimelineItem[];
  onChange: (items: TimelineItem[]) => void;
}

export const TimelineBuilder: React.FC<TimelineBuilderProps> = ({ timeline, onChange }) => {
  const [newTime, setNewTime] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const addTimelineItem = () => {
    if (!newActivity.trim()) return;
    const timeFormatted = newTime.trim() ? (newTime.includes('WIB') ? newTime : `${newTime} WIB`) : 'Waktu terekam';
    const newItem: TimelineItem = {
      id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      waktu: timeFormatted,
      aktivitas: newActivity.trim()
    };
    onChange([...timeline, newItem]);
    setNewTime('');
    setNewActivity('');
  };

  const removeItem = (id: string) => {
    onChange(timeline.filter(t => t.id !== id));
  };

  const updateItem = (id: string, field: 'waktu' | 'aktivitas', value: string) => {
    onChange(timeline.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const addQuickTemplate = (type: 'masuk_keluar' | 'parkir' | 'toilet') => {
    if (type === 'masuk_keluar') {
      onChange([
        ...timeline,
        { id: `t-${Date.now()}-1`, waktu: '08:00 WIB', aktivitas: 'Pelapor/Subjek terpantau masuk melalui akses pintu' },
        { id: `t-${Date.now()}-2`, waktu: '08:15 WIB', aktivitas: 'Aktivitas terekam di area pemeriksaan' },
        { id: `t-${Date.now()}-3`, waktu: '08:30 WIB', aktivitas: 'Subjek terpantau meninggalkan lokasi' }
      ]);
    } else if (type === 'parkir') {
      onChange([
        ...timeline,
        { id: `t-${Date.now()}-1`, waktu: '10:00 WIB', aktivitas: 'Kendaraan merapat dan terparkir di slot parkir' },
        { id: `t-${Date.now()}-2`, waktu: '10:05 WIB', aktivitas: 'Driver keluar dan melakukan aktivitas di sekitar kendaraan' },
        { id: `t-${Date.now()}-3`, waktu: '10:20 WIB', aktivitas: 'Kendaraan keluar meninggalkan area parkir' }
      ]);
    } else if (type === 'toilet') {
      onChange([
        ...timeline,
        { id: `t-${Date.now()}-1`, waktu: '14:00 WIB', aktivitas: 'Pelapor terlihat masuk koridor menuju toilet membawa barang berharga' },
        { id: `t-${Date.now()}-2`, waktu: '14:08 WIB', aktivitas: 'Pelapor keluar dari toilet tanpa membawa barang yang dimaksud' },
        { id: `t-${Date.now()}-3`, waktu: '14:15 WIB', aktivitas: 'Pelapor kembali ke toilet untuk mencari barang tertinggal' }
      ]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
          <Clock className="w-4 h-4" />
          <span>Timeline Kronologi Kejadian Per-Menit</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 mr-1">Preset cepat:</span>
          <button
            type="button"
            onClick={() => addQuickTemplate('parkir')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
          >
            + Parkir
          </button>
          <button
            type="button"
            onClick={() => addQuickTemplate('masuk_keluar')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
          >
            + Akses Drop-off
          </button>
          <button
            type="button"
            onClick={() => addQuickTemplate('toilet')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
          >
            + Koridor/Toilet
          </button>
        </div>
      </div>

      {timeline.length === 0 ? (
        <div className="p-6 border border-dashed border-slate-800 rounded-xl bg-slate-900/50 text-center text-slate-400 text-sm">
          <p>Belum ada titik kronologi kejadian.</p>
          <p className="text-xs text-slate-500 mt-1">Gunakan form di bawah atau pilih preset cepat di atas.</p>
        </div>
      ) : (
        <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-cyan-500/30">
          {timeline.map((item) => (
            <div key={item.id} className="relative group flex items-start gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-lg hover:border-cyan-500/50 transition">
              <span className="absolute -left-[19px] top-4 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
              
              <div className="w-28 shrink-0">
                <input
                  type="text"
                  value={item.waktu}
                  onChange={(e) => updateItem(item.id, 'waktu', e.target.value)}
                  placeholder="08:20 WIB"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 font-semibold outline-none"
                />
              </div>

              <div className="flex-1">
                <textarea
                  rows={2}
                  value={item.aktivitas}
                  onChange={(e) => updateItem(item.id, 'aktivitas', e.target.value)}
                  placeholder="Deskripsi aktivitas yang terpantau kamera CCTV..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded px-2.5 py-1 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-slate-500 hover:text-red-400 p-1.5 transition"
                title="Hapus baris"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input row baru */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="text"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          placeholder="Jam (contoh: 14:20 WIB)"
          className="w-40 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTimelineItem())}
        />
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Aktivitas yang terekam (contoh: Driver membuka pintu mobil)..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTimelineItem())}
        />
        <button
          type="button"
          onClick={addTimelineItem}
          className="flex items-center gap-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah</span>
        </button>
      </div>
    </div>
  );
};
