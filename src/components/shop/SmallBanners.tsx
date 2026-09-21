'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Scissors } from 'lucide-react';

export default function SmallBanners() {
  return (
    <section className="py-10 space-y-12">
      {/* 1. Güven & Avantaj Barı */}
      <div className="border border-[#d7d7db] rounded-xl bg-white p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FAF5EB] rounded-lg shrink-0 text-[#C5A059]">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151523]">Milimetrik Özel Dikim</h4>
            <p className="text-[11px] text-[#49495a] mt-0.5 leading-snug">Pencerenize tam uyan atölye işçiliği</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FAF5EB] rounded-lg shrink-0 text-[#C5A059]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151523]">Ücretsiz & Sigortalı Kargo</h4>
            <p className="text-[11px] text-[#49495a] mt-0.5 leading-snug">1.500 TL üzeri tüm siparişlerde</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FAF5EB] rounded-lg shrink-0 text-[#C5A059]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151523]">24 Ay Mekanizma Garantisi</h4>
            <p className="text-[11px] text-[#49495a] mt-0.5 leading-snug">1. sınıf alüminyum ve çelik ray</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#FAF5EB] rounded-lg shrink-0 text-[#C5A059]">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151523]">Birebir Değişim Güvencesi</h4>
            <p className="text-[11px] text-[#49495a] mt-0.5 leading-snug">Üretim kusurlarında ücretsiz yenileme</p>
          </div>
        </div>
      </div>

      {/* 2. 3'lü Editoryal Koleksiyon Bannerları (20px radius per designer.md) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/kategori/plise-perdeler"
          className="group relative h-56 rounded-[20px] overflow-hidden bg-[#151523] p-6 flex flex-col justify-between text-white border border-[#d7d7db] hover:border-[#C5A059] transition-all shadow-xs"
        >
          <img
            src="/uploads/products/plise_beyaz_petek.jpg"
            alt="Cam Balkon Plise"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#151523] bg-white px-2.5 py-0.5 rounded-full">
              CAM BALKON & PVC
            </span>
            <h3 className="text-lg font-bold mt-2 leading-tight text-white">
              Kancalı & Vidalı Plise Perdeler
            </h3>
            <p className="text-xs text-[#b9b9c1] mt-1">Delmeden 10 dakikada kolay montaj</p>
          </div>
          <span className="relative z-10 text-xs font-bold text-[#DFCE9E] group-hover:text-white flex items-center gap-1 transition-colors">
            Koleksiyonu İncele <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/kategori/ciftli-sistem-tul-stor"
          className="group relative h-56 rounded-[20px] overflow-hidden bg-[#151523] p-6 flex flex-col justify-between text-white border border-[#d7d7db] hover:border-[#C5A059] transition-all shadow-xs"
        >
          <img
            src="/uploads/products/zebra_simli_etekli.jpg"
            alt="Çiftli Sistem"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#151523] bg-white px-2.5 py-0.5 rounded-full">
              ÇİFT İŞLEVLİ SİSTEMLER
            </span>
            <h3 className="text-lg font-bold mt-2 leading-tight text-white">
              Tül + Karartma Stor Tek Kasada
            </h3>
            <p className="text-xs text-[#b9b9c1] mt-1">Gündüz tül zarafeti, gece tam karartma</p>
          </div>
          <span className="relative z-10 text-xs font-bold text-[#DFCE9E] group-hover:text-white flex items-center gap-1 transition-colors">
            Fiyat Hesapla <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/kategori/fon-perdeler"
          className="group relative h-56 rounded-[20px] overflow-hidden bg-[#151523] p-6 flex flex-col justify-between text-white border border-[#d7d7db] hover:border-[#C5A059] transition-all shadow-xs"
        >
          <img
            src="/uploads/products/fon_lacivert_kadife.jpg"
            alt="Lüks Fon Perdeler"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#151523] bg-white px-2.5 py-0.5 rounded-full">
              SALON & YATAK ODASI
            </span>
            <h3 className="text-lg font-bold mt-2 leading-tight text-white">
              Dökümlü Kadife & Keten Fonlar
            </h3>
            <p className="text-xs text-[#b9b9c1] mt-1">Tek kanat ve çift kanat seçenekleriyle</p>
          </div>
          <span className="relative z-10 text-xs font-bold text-[#DFCE9E] group-hover:text-white flex items-center gap-1 transition-colors">
            Modelleri Gör <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}