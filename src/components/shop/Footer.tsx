'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#151523] text-[#b9b9c1] text-xs border-t border-[#2a2a3c] pt-14 pb-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Kolon 1: Logo & Firma Bilgisi */}
        <div>
          <div className="mb-4 bg-white p-2.5 rounded-xl inline-block shadow-xs">
            <img
              src="/images/logo.svg"
              alt="Plise Perde Bursa"
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-[11px] leading-relaxed text-[#b9b9c1] mb-5">
            Bursa'nın öncü cam balkon ve özel ölçülü plise perde imalat atölyesi. Evinize, ofisinize ve balkonunuza tam uyan milimetrik plise perde sistemleri.
          </p>
          <div className="space-y-2.5 text-[11px]">
            <div className="flex items-center gap-2.5 text-[#e9e9ec]">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <a href="tel:+905327263474" className="hover:text-[#DFCE9E] transition font-medium">0532 726 34 74</a>
            </div>
            <div className="flex items-center gap-2.5 text-[#e9e9ec]">
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <a href="mailto:info@pliseperdebursa.com.tr" className="hover:text-[#DFCE9E] transition font-medium">info@pliseperdebursa.com.tr</a>
            </div>
            <div className="flex items-start gap-2.5 text-[#e9e9ec]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
              <span className="leading-snug">Davutdede, 2. Zümrüt Sk. No:29 D:31, 16000 Yıldırım/BURSA</span>
            </div>
          </div>
        </div>

        {/* Kolon 2: Popüler Kategoriler */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
            Perde Modelleri
          </h4>
          <ul className="space-y-2.5 text-[11px]">
            <li><Link href="/kategori/plise-perdeler" className="text-[#DFCE9E] font-bold hover:text-white transition">★ Plise Perdeler (Cam Balkon)</Link></li>
            <li><Link href="/kategori/tul-perdeler" className="hover:text-[#DFCE9E] transition">Tül Perdeler</Link></li>
            <li><Link href="/kategori/stor-perdeler" className="hover:text-[#DFCE9E] transition">Stor Perdeler</Link></li>
            <li><Link href="/kategori/zebra-perdeler" className="hover:text-[#DFCE9E] transition">Zebra Perdeler</Link></li>
            <li><Link href="/kategori/ciftli-sistem-tul-stor" className="hover:text-[#DFCE9E] transition">Çiftli Sistem Tül + Stor</Link></li>
            <li><Link href="/kategori/fon-perdeler" className="hover:text-[#DFCE9E] transition">Fon Perdeler</Link></li>
            <li><Link href="/kategori/ahsap-jaluziler" className="hover:text-[#DFCE9E] transition">Ahşap Jaluzi Sistemleri</Link></li>
          </ul>
        </div>

        {/* Kolon 3: Müşteri Hizmetleri & Rehberler */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
            Müşteri Hizmetleri
          </h4>
          <ul className="space-y-2.5 text-[11px]">
            <li><Link href="/siparis-takip" className="text-[#DFCE9E] font-bold hover:text-white transition">Sipariş Takibi</Link></li>
            <li><Link href="/sayfalar/perde-olcusu-nasil-alinir" className="hover:text-[#DFCE9E] transition">Perde Ölçüsü Nasıl Alınır?</Link></li>
            <li><Link href="/sayfalar/sikca-sorulan-sorular" className="hover:text-[#DFCE9E] transition">Sıkça Sorulan Sorular</Link></li>
            <li><Link href="/sayfalar/garanti-sartlari" className="hover:text-[#DFCE9E] transition">Garanti ve İade Şartları</Link></li>
            <li><Link href="/sayfalar/kargo-bilgileri" className="hover:text-[#DFCE9E] transition">Kargo ve Teslimat</Link></li>
            <li><Link href="/sayfalar/iletisim" className="hover:text-[#DFCE9E] transition">İletişim & Atölye</Link></li>
          </ul>
        </div>

        {/* Kolon 4: Güvenli Alışveriş */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
            Güvenli Alışveriş
          </h4>
          <p className="text-[11px] text-[#b9b9c1] mb-4 leading-relaxed">
            Tüm siparişleriniz 256-Bit SSL güvenlik sertifikası ve PayTR 3D Secure güvencesiyle korunmaktadır.
          </p>
          <div className="flex flex-wrap gap-2 text-[#e9e9ec] mb-4">
            <span className="px-2.5 py-1 rounded-md bg-[#222234] border border-[#34344d] text-[10px] font-bold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#222234] border border-[#34344d] text-[10px] font-bold flex items-center gap-1.5">
              <CreditCard className="w-3 h-3 text-[#C5A059]" /> PayTR 3D Secure
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#222234] border border-[#34344d] text-[10px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#C5A059]" /> Kapıda Ödeme
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-[#2a2a3c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#868694]">
        <p>© 2026 Plise Perde Bursa. Tüm Hakları Saklıdır.</p>
        <div className="flex gap-4">
          <Link href="/sayfalar/mesafeli-satis-sozlesmesi" className="hover:text-white transition">Mesafeli Satış Sözleşmesi</Link>
          <Link href="/sayfalar/gizlilik-politikasi" className="hover:text-white transition">Gizlilik Politikası</Link>
          <Link href="/panel/login" className="hover:text-[#DFCE9E] font-bold transition">Yönetici Paneli</Link>
        </div>
      </div>
    </footer>
  );
}