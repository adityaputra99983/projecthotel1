'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const waNumber = "6281234567890";
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);
  
  const openWA = (message: string) => {
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fadeIn = (section: string) => visibleSections[section] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  const transition = "transition-all duration-700 ease-out";

  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'} ${transition}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-white font-bold text-sm">HL</span>
            </div>
            <span className="text-xl font-bold text-green-800 tracking-tight">HutanLembah</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Tentang', 'Kamar', 'Fasilitas', 'Pengalaman'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative text-green-800 hover:text-green-600 text-sm font-medium group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300" onClick={() => openWA("Halo Hutan Lembah, saya ingin booking hotel")}>
            Pesan
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex items-center justify-center text-white relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
          alt="Forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-900/50 to-[#f4f7f2]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-sm tracking-[0.3em] uppercase text-green-200">Hotel & Spa Resort</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">Hutan Lembah</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-green-100/90 max-w-2xl mx-auto leading-relaxed">Hotel butik di tengah hutan hujan Jawa — dimana ketenangan menemukanmu</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300">Lihat Kamar</button>
            <button className="border-2 border-white/60 text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-green-800 hover:border-white transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                Video Tour
              </span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[350px] md:h-[450px] group">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <Image
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
                alt="Room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl p-4 shadow-xl">
                <p className="text-3xl font-bold">4.9</p>
                <p className="text-xs opacity-80">Rating Tamu</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-green-100 rounded-full">
                <p className="text-green-700 text-sm font-semibold tracking-wider uppercase">Tentang Kami</p>
              </div>
              <h2 className="text-4xl md:text-5xl text-green-900 font-bold leading-tight">Menginapur di<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Pelukan Alam</span></h2>
              <p className="text-gray-600 leading-relaxed text-lg">Hutan Lembah adalah hotel butik di jantung hutan hujan Jawa. Setiap kamar dirancang dengan material alami dari kayu lokal, menawarkan kenyamanan modern tanpa meninggalkan sentuhan alam.</p>
              <div className="flex gap-10 pt-4">
                {[
                  { num: "15", label: "Kamar" },
                  { num: "98%", label: "Tamu Puas" },
                  { num: "5★", label: "Pelayanan" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl text-green-800 font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">{stat.num}</p>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="py-24 px-6 bg-gradient-to-b from-green-50 to-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-green-100 rounded-full mb-4">
              <p className="text-green-700 text-sm font-semibold tracking-wider uppercase">Kamar</p>
            </div>
            <h2 className="text-4xl md:text-5xl text-green-900 font-bold">Pilih Kamar <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Favorit</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Forest Suite", price: "1.500.000", size: "45m²", bed: "1 King", popular: true, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
              { name: "Valley Deluxe", price: "1.200.000", size: "35m²", bed: "1 Queen", popular: false, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" },
              { name: "Canopy Lodge", price: "2.000.000", size: "55m²", bed: "2 Double", popular: false, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
            ].map((room, i) => (
              <div key={i} className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${room.popular ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                <div className="relative h-56">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {room.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ Terlaris
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white/70 text-xs">Mulai dari</p>
                    <p className="text-white font-bold text-xl">Rp {room.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-green-900 font-bold mb-2">{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{room.bed} • {room.size}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mb-5">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>2 Tamu</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Balkon</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-300" onClick={() => openWA(`Halo Hutan Lembah, saya ingin booking ${room.name}`)}>
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-24 px-6 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
              <p className="text-green-300 text-sm font-semibold tracking-wider uppercase">Fasilitas</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Kemewahan di Tengah <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">Hutan</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Spa Wellness", desc: "Pijat tradisional", icon: "M12 6c-2 0-3 1-3 3 0 1.5 1 2.5 2 3.5S12 14 12 16s1.5 2 3 2 3-1 3-3c0-1.5-1-2.5-2-3.5S14 10 14 8s-1.5-2-3-2z" },
              { name: "Kolam Panas", desc: "Jacuzzi view hutan", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
              { name: "Restoran", desc: "Makanan organik", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
              { name: "Hiking", desc: "Jalur hutan", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            ].map((item, i) => (
              <div key={i} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-white/30">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-green-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[350px] md:h-[450px] group order-2">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
                alt="Nature"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <p className="text-3xl font-bold text-green-600">⭐ 4.9</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
            <div className="space-y-6 order-1">
              <div className="inline-block px-4 py-1.5 bg-green-100 rounded-full">
                <p className="text-green-700 text-sm font-semibold tracking-wider uppercase">Pengalaman</p>
              </div>
              <h2 className="text-4xl md:text-5xl text-green-900 font-bold leading-tight">Rasakan<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Keajaiban Alam</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed">Setiap aktivitas dirancang untuk membantumu terhubung dengan alam.</p>
              <div className="space-y-3">
                {[
                  { name: "Sunrise Walk", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" },
                  { name: "Forest Yoga", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                  { name: "Campfire Night", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
                  { name: "Cooking Class", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
                ].map((exp, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <svg className="w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={exp.icon} /></svg>
                    </div>
                    <span className="text-green-900 font-semibold">{exp.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-green-50 to-white relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-green-100 rounded-full mb-4">
              <p className="text-green-700 text-sm font-semibold tracking-wider uppercase">Testimoni</p>
            </div>
            <h2 className="text-4xl md:text-5xl text-green-900 font-bold">Apa Kata <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Tamu</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah", city: "Jakarta", text: "Suara burung di pagi hari, udara segar — semuanya sempurna!", rating: 5 },
              { name: "Budi", city: "Bandung", text: "Tempat perfect untuk melarikan diri dari kota!", rating: 5 },
              { name: "Wati", city: "Surabaya", text: "Liburan keluarga terbaik! Sangat menikmati.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-green-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">{t.name[0]}</div>
                  <div>
                    <p className="text-green-900 font-bold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-green-900 font-bold mb-4">Siap Merasakan Keajaibannya?</h2>
          <p className="text-gray-600 mb-8">Pesan sekarang dan rasakan pengalaman menginap yang tak terlupakan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition">Pesan Sekarang</button>
            <button className="border border-green-700 text-green-700 px-8 py-3 rounded-full font-medium hover:bg-green-700 hover:text-white transition" onClick={() => openWA("Halo Hutan Lembah, saya ingin bertanya tentang hotel")}>Hubungi Kami</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-green-950 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center"><span className="text-white font-bold text-xs">HL</span></div>
                <span className="font-bold">HutanLembah</span>
              </div>
              <p className="text-green-300 text-sm">Hotel butik di tengah hutan hujan Jawa.</p>
            </div>
            <div><h4 className="font-semibold mb-3 text-green-400 text-sm">Menu</h4><ul className="space-y-2 text-green-300 text-sm"><li>Kamar</li><li>Fasilitas</li><li>Pengalaman</li></ul></div>
            <div><h4 className="font-semibold mb-3 text-green-400 text-sm">Kontak</h4><ul className="space-y-2 text-green-300 text-sm"><li>Malang, Jawa Timur</li><li>+62 812 3456 7890</li></ul></div>
            <div><h4 className="font-semibold mb-3 text-green-400 text-sm">Sosial</h4><div className="flex gap-2">{['X', 'IG', 'FB'].map((s, i) => <div key={i} className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center text-xs">{s}</div>)}</div></div>
          </div>
          <div className="border-t border-green-900 mt-8 pt-6 text-center text-green-400 text-sm">© 2024 Hutan Lembah. All rights reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => openWA("Halo Hutan Lembah, saya ingin bertanya")}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 z-50"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path fill="#25D366" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
          <path fill="#fff" d="M16.85 14.27c-.19-.29-.58-.39-.87-.39-.14-.01-.28-.02-.42-.02-.52 0-1.01.13-1.44.36-.28.15-.63.21-.96.12l-.42-.11c-.33-.09-.78-.27-1.22.12-.44.39-.85.77-1.08.95-.23.18-.41.26-.58.26-.18 0-.38-.08-.58-.28l-.31-.32c-.21-.21-.42-.38-.64-.38-.21 0-.43.14-.65.27l-.65.65c-.21.21-.42.43-.37.75.1.74.52 1.59 1.14 2.21 1.26 1.26 2.73 1.89 4.31 1.89.74 0 1.32-.1 1.68-.22.36-.12.65-.25.76-.5.1-.25.12-.53.12-.76v-.09c0-.63-.36-1.16-.65-1.52z"/>
          <path fill="#fff" d="M10.24 8.99c.19-.06.38-.1.58-.1.2 0 .4.04.6.13.2.09.45.22.72.48.27.26.49.62.49 1.03 0 .4-.2.71-.65 1.03-.45.32-.91.63-1.18.77-.27.14-.51.24-.71.36l-.36.2c-.14.1-.32.19-.51.19-.19 0-.42-.1-.6-.32l-.36-.44c-.24-.3-.48-.62-.66-.62-.18 0-.42.16-.68.35-.26.19-.48.38-.57.38-.09 0-.2-.04-.3-.04l-.64.04c-.21.01-.65.07-1.23.56-.58.49-1.04 1.49-1.04 2.5 0 1.01.85 2.25 1.9 2.96.52.36 1.05.63 1.48.63.43 0 .8-.1 1.03-.27.23-.17.4-.4.54-.63l.21-.36c.09-.15.22-.37.05-.61l-.26-.69z"/>
        </svg>
      </button>
    </div>
  );
}