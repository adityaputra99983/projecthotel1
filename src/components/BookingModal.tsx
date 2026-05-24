'use client';

import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  waNumber: string;
}

export default function BookingModal({ isOpen, onClose, waNumber }: BookingModalProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [roomType, setRoomType] = useState('Forest Suite');

  if (!isOpen) return null;

  const handleBook = () => {
    const message = `Halo Hutan Lembah, saya ingin booking:\nKamar: ${roomType}\nCheck-in: ${checkIn || '-'}\nCheck-out: ${checkOut || '-'}\nTamu: ${guestCount} orang`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative bg-gradient-to-b from-green-950 via-emerald-950 to-green-950 rounded-3xl p-8 w-full max-w-md border border-green-500/20 shadow-2xl shadow-green-500/10"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-6">Booking Kamar</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-green-300 mb-1 block">Tipe Kamar</label>
            <select
              value={roomType}
              onChange={e => setRoomType(e.target.value)}
              className="w-full bg-white/5 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition appearance-none"
            >
              <option value="Forest Suite">Forest Suite</option>
              <option value="Valley Deluxe">Valley Deluxe</option>
              <option value="Canopy Lodge">Canopy Lodge</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-green-300 mb-1 block">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className="w-full bg-white/5 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div>
              <label className="text-sm text-green-300 mb-1 block">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className="w-full bg-white/5 border border-green-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-green-300 mb-1 block">Jumlah Tamu</label>
            <div className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-2 border border-green-500/20">
              <button
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
              >−</button>
              <span className="text-white font-semibold flex-1 text-center">{guestCount}</span>
              <button
                onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition"
              >+</button>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/20 hover:scale-[1.02] transition-all duration-300 mt-2"
          >
            Pesan via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
