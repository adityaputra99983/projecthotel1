'use client';

import Image from "next/image";

export default function Home() {
  const waNumber = "6281234567890";
  
  const openWA = (message: string) => {
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">HL</span>
            </div>
            <span className="text-xl font-bold text-green-800">HutanLembah</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-green-800 hover:text-green-600 text-sm font-medium">Tentang</a>
            <a href="#rooms" className="text-green-800 hover:text-green-600 text-sm font-medium">Kamar</a>
            <a href="#amenities" className="text-green-800 hover:text-green-600 text-sm font-medium">Fasilitas</a>
            <a href="#experience" className="text-green-800 hover:text-green-600 text-sm font-medium">Pengalaman</a>
          </div>
          <button className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition" onClick={() => openWA("Halo Hutan Lembah, saya ingin booking hotel")}>
            Pesan
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex items-center justify-center text-white relative">
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
          alt="Forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/60"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-green-200">Hotel & Spa Resort</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Hutan Lembah</h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">Hotel butik di tengah hutan hujan Jawa — dimana ketenangan menemukanmu</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-800 px-8 py-3 rounded-full font-medium hover:bg-green-50 transition">Lihat Kamar</button>
            <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-green-800 transition">Video Tour</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[350px]">
              <Image
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
                alt="Room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-600 text-white rounded-lg p-3">
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-xs">Rating</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-green-600 text-sm font-medium tracking-wider uppercase">Tentang Kami</p>
              <h2 className="text-3xl md:text-4xl text-green-900 font-bold">Menginapur di<br/><span className="text-green-600">Pelukan Alam</span></h2>
              <p className="text-gray-600 leading-relaxed">Hutan Lembah adalah hotel butik di jantung hutan hujan Jawa. Setiap kamar dirancang dengan material alami dari kayu lokal, menawarkan kenyamanan modern tanpa meninggalkan sentuhan alam.</p>
              <div className="flex gap-8 pt-2">
                <div><p className="text-3xl text-green-800 font-bold">15</p><p className="text-gray-500 text-sm">Kamar</p></div>
                <div><p className="text-3xl text-green-800 font-bold">98%</p><p className="text-gray-500 text-sm">Tamu Puas</p></div>
                <div><p className="text-3xl text-green-800 font-bold">5★</p><p className="text-gray-500 text-sm">Pelayanan</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="py-20 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-medium tracking-wider uppercase mb-2">Kamar</p>
            <h2 className="text-3xl md:text-4xl text-green-900 font-bold">Pilih Kamar Favorit</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Forest Suite", price: "1.500.000", size: "45m²", bed: "1 King", popular: true },
              { name: "Valley Deluxe", price: "1.200.000", size: "35m²", bed: "1 Queen", popular: false },
              { name: "Canopy Lodge", price: "2.000.000", size: "55m²", bed: "2 Double", popular: false },
            ].map((room, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative h-44">
                  <Image
                    src={i === 0 ? "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" : i === 1 ? "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80" : "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {room.popular && <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">Terlaris</div>}
                  <div className="absolute bottom-3 left-3"><p className="text-white/80 text-xs">Mulai</p><p className="text-white font-bold">Rp {room.price}</p></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-green-900 font-semibold">{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{room.bed} • {room.size}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>2 Tamu</span><span>Balkon</span>
                  </div>
                  <button className="w-full bg-green-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition" onClick={() => openWA(`Halo Hutan Lembah, saya ingin booking ${room.name}`)}>Pesan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20 px-6 bg-green-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-400 text-sm font-medium tracking-wider uppercase mb-2">Fasilitas</p>
            <h2 className="text-3xl md:text-4xl font-bold">Kemewahan di Tengah Hutan</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "Spa Wellness", desc: "Pijat tradisional" },
              { name: "Kolam Panas", desc: "Jacuzzi view hutan" },
              { name: "Restoran", desc: "Makanan organik" },
              { name: "Hiking", desc: "Jalur hutan" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition">
                <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-green-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[350px] order-2">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
                alt="Nature"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl"
              />
            </div>
            <div className="space-y-4 order-1">
              <p className="text-green-600 text-sm font-medium tracking-wider uppercase">Pengalaman</p>
              <h2 className="text-3xl md:text-4xl text-green-900 font-bold">Rasakan<br/><span className="text-green-600">Keajaiban Alam</span></h2>
              <p className="text-gray-600">Setiap aktivitas dirancang untuk membantumu terhubung dengan alam.</p>
              <div className="space-y-2">
                {["Sunrise Walk", "Forest Yoga", "Campfire Night", "Cooking Class"].map((exp, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center"><svg className="w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                    <span className="text-green-900 font-medium text-sm">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 text-sm font-medium tracking-wider uppercase mb-2">Testimoni</p>
            <h2 className="text-3xl md:text-4xl text-green-900 font-bold">Apa Kata Tamu</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah", city: "Jakarta", text: "Suara burung di pagi hari, udara segar — semuanya sempurna!" },
              { name: "Budi", city: "Bandung", text: "Tempat perfect untuk melarikan diri dari kota!" },
              { name: "Wati", city: "Surabaya", text: "Liburan keluarga terbaik! Sangat menikmati." },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                <p className="text-gray-600 text-sm mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{t.name[0]}</div>
                  <div><p className="text-green-900 text-sm font-medium">{t.name}</p><p className="text-gray-500 text-xs">{t.city}</p></div>
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