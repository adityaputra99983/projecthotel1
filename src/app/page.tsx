'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import LeafParticles from "@/components/LeafParticles";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import BookingModal from "@/components/BookingModal";
import TiltCard from "@/components/TiltCard";
import SectionReveal from "@/components/SectionReveal";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  const waNumber = "6281234567890";
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [headerVisible, setHeaderVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMouse);

    setHeaderVisible(true);

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', onMouse);
      clearInterval(testimonialTimer);
    };
  }, []);

  const openWA = (msg: string) => window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');

  const navItems = [
    { label: 'Tentang', href: '#about' },
    { label: 'Kamar', href: '#rooms' },
    { label: 'Fasilitas', href: '#amenities' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Testimoni', href: '#testimonials' },
  ];

  return (
    <div className="min-h-screen relative">
      <CursorFollower />
      <ScrollProgress />
      <LeafParticles />
      <VideoBackground />
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-green-950/80 backdrop-blur-xl shadow-2xl shadow-green-500/10 translate-y-0'
            : 'bg-transparent translate-y-0'
        } ${headerVisible ? 'opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-green-400/40 group-hover:scale-110 transition-all duration-500 rotate-45 group-hover:rotate-[405deg]">
              <span className="text-white font-bold text-sm -rotate-45">HL</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Hutan<span className="text-green-400">Lembah</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-green-200/80 hover:text-white text-sm font-medium group transition-colors duration-300"
              >
                {item.label}
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-green-400 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group before:absolute before:inset-0 before:rounded-full before:border before:border-green-400/0 before:transition-all before:duration-500 hover:before:border-green-400/60 hover:before:scale-110 hover:before:opacity-0"
            >
              <span className="relative z-10">Pesan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center text-white relative overflow-hidden">
        {/* Extra overlay for text readability over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-[2]" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <SectionReveal direction="up">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-sm tracking-[0.3em] uppercase text-green-300 font-light">Hotel & Spa Resort</p>
            </div>
          </SectionReveal>

          <SectionReveal direction="up" delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight leading-[1.05]">
              <span className="inline-block bg-gradient-to-r from-white via-green-200 via-emerald-200 to-white bg-clip-text text-transparent animate-text-gradient">
                Hutan Lembah
              </span>
            </h1>
          </SectionReveal>

          <SectionReveal direction="up" delay={400}>
            <div className="h-[1px] w-20 mx-auto mb-6 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
          </SectionReveal>

          <SectionReveal direction="up" delay={500}>
            <p className="text-lg md:text-xl text-green-100/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Hotel butik di tengah hutan hujan Jawa — dimana ketenangan menemukanmu
            </p>
          </SectionReveal>

          <SectionReveal direction="up" delay={700}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={() => setBookingOpen(true)}
                className="group relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 before:absolute before:inset-0 before:rounded-full before:border before:border-green-400/0 before:transition-all before:duration-500 hover:before:border-green-400/50 hover:before:scale-110 hover:before:opacity-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Pesan Sekarang
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/0 via-green-400/30 to-emerald-500/0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
              </button>

              <button className="group relative border border-white/20 text-white/80 px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-green-400/50 hover:text-white hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                  Virtual Tour
                </span>
              </button>
            </div>
          </SectionReveal>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-green-400/50 text-xs tracking-[0.2em] uppercase font-light">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-green-400/60 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-green-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="relative h-16 bg-gradient-to-b from-[#050d05] to-[#0a1a0a]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
      </div>

      {/* About */}
      <section id="about" className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-green-950 to-[#0a1a0a]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SectionReveal direction="left">
              <div className="relative">
                <div className="relative h-[400px] md:h-[500px] group rounded-2xl overflow-hidden">
                  <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl" />
                  <div className="relative h-full rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80"
                      alt="Interior"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 glare-overlay" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-6 shadow-2xl shadow-green-500/20 border border-white/10 backdrop-blur-sm">
                  <p className="text-4xl font-bold">4.9</p>
                  <p className="text-xs opacity-80 mt-1">Rating Tamu</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>

            <div className="space-y-6">
              <SectionReveal direction="right">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 rounded-full border border-green-500/20 relative overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                  <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Tentang Kami</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={100}>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  Menginap di<br />
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                    Pelukan Alam
                  </span>
                </h2>
              </SectionReveal>

              <SectionReveal direction="right" delay={200}>
                <p className="text-green-200/60 leading-relaxed text-lg font-light">
                  Hutan Lembah adalah hotel butik di jantung hutan hujan Jawa. Setiap kamar dirancang dengan material alami dari kayu lokal, menawarkan kenyamanan modern tanpa meninggalkan sentuhan alam.
                </p>
              </SectionReveal>

              <SectionReveal direction="right" delay={300}>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  {[
                    { num: "15", label: "Kamar" },
                    { num: "98%", label: "Tamu Puas" },
                    { num: "5★", label: "Pelayanan" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition duration-300">
                      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {stat.num}
                      </p>
                      <p className="text-green-300/50 text-sm font-medium mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal direction="up" delay={400}>
                <button className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3.5 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 mt-4 before:absolute before:inset-0 before:rounded-full before:border before:border-green-400/0 before:transition-all before:duration-500 hover:before:border-green-400/50 hover:before:scale-110 hover:before:opacity-0">
                  <span className="relative z-10 flex items-center gap-2">
                    Jelajahi Lebih Lanjut
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </button>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="py-28 px-6 relative bg-gradient-to-b from-[#0a1a0a] via-green-950/80 to-[#0a1a0a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwxOTcsOTQsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-4 relative overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Kamar</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Pilih Kamar{' '}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                  Favorit
                </span>
              </h2>
              <p className="text-green-200/50 mt-4 max-w-xl mx-auto font-light">
                Setiap kamar menawarkan keunikan dan kenyamanan tersendiri
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Forest Suite", price: "1.500.000", size: "45m²", bed: "1 King Bed", popular: true, desc: "Suite dengan balkon pribadi menghadap hutan", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
              { name: "Valley Deluxe", price: "1.200.000", size: "35m²", bed: "1 Queen Bed", popular: false, desc: "Kamar nyaman dengan pemandangan lembah", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" },
              { name: "Canopy Lodge", price: "2.000.000", size: "55m²", bed: "2 Double Beds", popular: false, desc: "Suite premium dengan kolam pribadi", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" },
            ].map((room, i) => (
              <SectionReveal key={i} direction="up" delay={i * 150}>
                <TiltCard>
                  <div className={`group relative bg-gradient-to-b from-green-900/60 to-green-950/60 rounded-2xl overflow-hidden border transition-all duration-500 ${
                    room.popular
                      ? 'border-green-500/40 shadow-xl shadow-green-500/20'
                      : 'border-green-800/20 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10'
                  }`}>
                    {/* Hover neon border glow */}
                    <div className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      room.popular ? 'bg-gradient-to-b from-green-500/20 via-emerald-500/10 to-green-500/20' : 'bg-gradient-to-b from-green-500/10 via-transparent to-green-500/10'
                    } blur-sm`} />
                    {room.popular && (
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          Terlaris
                        </div>
                      </div>
                    )}

                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={room.img}
                        alt={room.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/20 to-transparent" />
                      <div className="absolute inset-0 glare-overlay" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="text-green-200/70 text-xs font-light uppercase tracking-wider">Mulai dari</p>
                          <p className="text-white font-bold text-2xl">Rp {room.price}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
                          <p className="text-white text-xs font-medium">{room.size}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl text-white font-bold mb-1">{room.name}</h3>
                      <p className="text-green-300/60 text-sm mb-3">{room.desc}</p>
                      <p className="text-green-300/40 text-xs mb-5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {room.bed}
                      </p>

                      <div className="flex gap-3 mb-5">
                        <span className="flex items-center gap-1 text-xs text-green-300/50">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                          Balkon
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-300/50">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          AC
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-300/50">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                          Mini Bar
                        </span>
                      </div>

                      <button
                        onClick={() => openWA(`Halo Hutan Lembah, saya ingin booking ${room.name}`)}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group/btn before:absolute before:inset-0 before:rounded-xl before:border before:border-green-400/0 before:transition-all before:duration-500 hover:before:border-green-400/50 hover:before:scale-110 hover:before:opacity-0"
                      >
                        <span className="relative z-10">Pesan Sekarang</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 blur-xl" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-green-950 to-[#0a1a0a]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm mb-4 relative overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Fasilitas</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Kemewahan di Tengah{' '}
                <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 bg-clip-text text-transparent animate-text-gradient">
                  Hutan
                </span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Spa Wellness", desc: "Pijat tradisional dengan minyak alami", icon: "M12 6c-2 0-3 1-3 3 0 1.5 1 2.5 2 3.5S12 14 12 16s1.5 2 3 2 3-1 3-3c0-1.5-1-2.5-2-3.5S14 10 14 8s-1.5-2-3-2z" },
              { name: "Kolam Panas", desc: "Jacuzzi dengan view hutan", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
              { name: "Restoran", desc: "Makanan organik dari kebun lokal", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
              { name: "Hiking", desc: "Jalur hutan dengan pemandu lokal", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            ].map((item, i) => (
              <SectionReveal key={i} direction="up" delay={i * 100}>
                <div className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/[0.08] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 border border-white/5 hover:border-green-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl mx-auto mb-5 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-500">
                      <svg className="w-8 h-8 text-green-400 group-hover:text-green-300 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{item.name}</h3>
                    <p className="text-green-300/50 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-28 px-6 relative bg-gradient-to-b from-[#0a1a0a] via-green-950/80 to-[#0a1a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-4 relative overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Galeri</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Abadikan{' '}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                  Momen
                </span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80", span: "col-span-2 row-span-2" },
              { src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&q=80", span: "" },
              { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", span: "" },
              { src: "https://images.unsplash.com/photo-1504198266287-1658872e65bb?w=600&q=80", span: "" },
              { src: "https://images.unsplash.com/photo-1511497584788-876760111969?w=600&q=80", span: "" },
            ].map((img, i) => (
              <SectionReveal key={i} direction="up" delay={i * 80}>
                <div className={`relative overflow-hidden rounded-xl group cursor-pointer ${img.span || ''}`}
                  style={{ minHeight: img.span ? '300px' : '180px' }}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery ${i}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 glare-overlay" />
                  <div className="absolute bottom-3 right-3 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 px-6 relative bg-gradient-to-b from-[#0a1a0a] via-green-950 to-[#0a1a0a] overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="max-w-7xl mx-auto relative">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-4 relative overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Testimoni</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Apa Kata{' '}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                  Tamu
                </span>
              </h2>
            </div>
          </SectionReveal>

          {/* Carousel */}
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {[
                  { name: "Sarah", city: "Jakarta", text: "Suara burung di pagi hari, udara segar yang dingin, pemandangan hutan yang hijau — semuanya sempurna di sini! Hidden gem banget.", rating: 5 },
                  { name: "Budi", city: "Bandung", text: "Tempat yang sempurna untuk melarikan diri dari hiruk-pikuk kota. Pelayanannya luar biasa, makanannya enak, pemandangannya bikin tenang.", rating: 5 },
                  { name: "Wati", city: "Surabaya", text: "Liburan keluarga terbaik yang pernah kami lakukan! Anak-anak senang bermain di alam, kami menikmati spa. Highly recommended!", rating: 5 },
                ].map((t, i) => (
                  <div key={i} className="min-w-full px-4">
                    <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl p-10 border border-white/5 text-center">
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(t.rating)].map((_, j) => (
                          <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <p className="text-green-200/80 text-lg mb-8 leading-relaxed max-w-xl mx-auto font-light italic">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full flex items-center justify-center text-green-300 font-bold text-xl border border-green-500/30">
                          {t.name[0]}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold">{t.name}</p>
                          <p className="text-green-300/40 text-sm">{t.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`rounded-full transition-all duration-500 ${
                    currentTestimonial === i
                      ? 'w-8 h-2 bg-green-400'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-green-950 to-[#0a1a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
          <div className="absolute top-1/2 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute top-1/3 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Siap Merasakan{' '}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                Keajaibannya?
              </span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={100}>
            <p className="text-green-200/50 text-lg mb-10 max-w-xl mx-auto font-light">
              Pesan sekarang dan rasakan pengalaman menginap yang tak terlupakan di tengah keindahan hutan Jawa.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setBookingOpen(true)}
                className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 before:absolute before:inset-0 before:rounded-full before:border before:border-green-400/0 before:transition-all before:duration-500 hover:before:border-green-400/50 hover:before:scale-110 hover:before:opacity-0"
              >
                <span className="relative z-10">Pesan Sekarang</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </button>
              <button
                onClick={() => openWA("Halo Hutan Lembah, saya ingin bertanya tentang hotel")}
                className="relative border border-white/10 text-green-300/80 px-10 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:bg-white/5 hover:border-green-400/50 hover:text-white hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm"
              >
                Hubungi Kami
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Experience Section - before footer */}
      <section className="py-28 px-6 relative bg-gradient-to-b from-[#0a1a0a] via-green-950/80 to-green-950 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <SectionReveal direction="left">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 rounded-full border border-green-500/20 relative overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-lg shadow-green-400" />
                  <p className="text-green-300 text-sm font-medium tracking-wider uppercase">Pengalaman</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-shimmer" />
                </div>
              </SectionReveal>
              <SectionReveal direction="left" delay={100}>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  Rasakan<br />
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-text-gradient">
                    Keajaiban Alam
                  </span>
                </h2>
              </SectionReveal>
              <SectionReveal direction="left" delay={200}>
                <p className="text-green-200/60 text-lg leading-relaxed font-light">
                  Setiap aktivitas dirancang untuk membantumu terhubung dengan alam dan menemukan kedamaian batin.
                </p>
              </SectionReveal>
              <SectionReveal direction="left" delay={300}>
                <div className="space-y-3">
                  {[
                    { name: "Sunrise Walk", desc: "Jalan pagi di tengah hutan", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" },
                    { name: "Forest Yoga", desc: "Yoga di bawah kanopi hutan", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                    { name: "Campfire Night", desc: "Malam hangat dengan api unggun", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
                    { name: "Cooking Class", desc: "Memasak masakan tradisional", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                  ].map((exp, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] border border-white/5 hover:border-green-500/20 transition-all duration-300 group cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 group-hover:scale-110 transition-all duration-300 shrink-0">
                        <svg className="w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={exp.icon} /></svg>
                      </div>
                      <div>
                        <span className="text-white font-semibold">{exp.name}</span>
                        <p className="text-green-300/40 text-xs mt-0.5">{exp.desc}</p>
                      </div>
                      <svg className="w-4 h-4 text-green-500/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>

            <SectionReveal direction="right" className="order-1 md:order-2">
              <div className="relative">
                <div className="relative h-[350px] md:h-[500px] group rounded-2xl overflow-hidden">
                  <div className="absolute -inset-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl" />
                  <div className="relative h-full rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80"
                      alt="Nature"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-green-900/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 glare-overlay" />
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-xl rounded-xl p-5 border border-white/10 shadow-xl">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">⭐ 4.9</p>
                  <p className="text-xs text-green-300/50 mt-1">Rating Tertinggi</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 relative overflow-hidden bg-green-950 border-t border-green-800/20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <a href="#" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <span className="text-white font-bold text-sm">HL</span>
                </div>
                <span className="text-lg font-bold text-white">HutanLembah</span>
              </a>
              <p className="text-green-300/40 text-sm leading-relaxed">Hotel butik di tengah hutan hujan Jawa. Nikmati ketenangan dan keindahan alam.</p>
              <div className="flex gap-3 mt-5">
                {['𝕏', '📷', '📘'].map((s, i) => (
                  <div key={i} className="w-9 h-9 bg-white/[0.03] hover:bg-white/[0.08] rounded-full flex items-center justify-center text-sm cursor-pointer transition hover:scale-110 border border-white/5 hover:border-green-500/30">{s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-green-400/80 text-sm uppercase tracking-wider">Menu</h4>
              <ul className="space-y-2.5 text-green-300/40 text-sm">
                {['Kamar', 'Fasilitas', 'Pengalaman', 'Tentang Kami'].map((item, i) => (
                  <li key={i} className="hover:text-green-300 cursor-pointer transition flex items-center gap-2">
                    <span className="w-0.5 h-0.5 bg-green-500/50 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-green-400/80 text-sm uppercase tracking-wider">Kontak</h4>
              <ul className="space-y-3 text-green-300/40 text-sm">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-500/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Malang, Jawa Timur
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-500/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +62 812 3456 7890
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-500/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  hello@hutanlembah.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-green-400/80 text-sm uppercase tracking-wider">Jam Operasional</h4>
              <div className="space-y-2 text-green-300/40 text-sm">
                <p className="flex justify-between"><span>Check-in</span><span className="text-green-300/60">14:00 WIB</span></p>
                <p className="flex justify-between"><span>Check-out</span><span className="text-green-300/60">12:00 WIB</span></p>
                <p className="flex justify-between"><span>Resepsionis</span><span className="text-green-300/60">24 Jam</span></p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800/20 mt-12 pt-8 text-center">
            <p className="text-green-400/30 text-sm">© 2024 Hutan Lembah. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button
        onClick={() => openWA("Halo Hutan Lembah, saya ingin bertanya")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-[360deg] z-50 group before:absolute before:inset-[-3px] before:rounded-full before:border before:border-green-400/30 before:animate-pulse-soft before:pointer-events-none"
      >
        <svg className="w-7 h-7 relative z-10" viewBox="0 0 24 24" fill="none">
          <path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
          <path fill="#25D366" d="M16.85 14.27c-.19-.29-.58-.39-.87-.39-.14-.01-.28-.02-.42-.02-.52 0-1.01.13-1.44.36-.28.15-.63.21-.96.12l-.42-.11c-.33-.09-.78-.27-1.22.12-.44.39-.85.77-1.08.95-.23.18-.41.26-.58.26-.18 0-.38-.08-.58-.28l-.31-.32c-.21-.21-.42-.38-.64-.38-.21 0-.43.14-.65.27l-.65.65c-.21.21-.42.43-.37.75.1.74.52 1.59 1.14 2.21 1.26 1.26 2.73 1.89 4.31 1.89.74 0 1.32-.1 1.68-.22.36-.12.65-.25.76-.5.1-.25.12-.53.12-.76v-.09c0-.63-.36-1.16-.65-1.52z"/>
          <path fill="#fff" d="M10.24 8.99c.19-.06.38-.1.58-.1.2 0 .4.04.6.13.2.09.45.22.72.48.27.26.49.62.49 1.03 0 .4-.2.71-.65 1.03-.45.32-.91.63-1.18.77-.27.14-.51.24-.71.36l-.36.2c-.14.1-.32.19-.51.19-.19 0-.42-.1-.6-.32l-.36-.44c-.24-.3-.48-.62-.66-.62-.18 0-.42.16-.68.35-.26.19-.48.38-.57.38-.09 0-.2-.04-.3-.04l-.64.04c-.21.01-.65.07-1.23.56-.58.49-1.04 1.49-1.04 2.5 0 1.01.85 2.25 1.9 2.96.52.36 1.05.63 1.48.63.43 0 .8-.1 1.03-.27.23-.17.4-.4.54-.63l.21-.36c.09-.15.22-.37.05-.61l-.26-.69z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
      </button>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} waNumber={waNumber} />
    </div>
  );
}
