import React from 'react';
import Link from 'next/link';
import SmallBanners from '@/components/shop/SmallBanners';
import HomepageShowcase from '@/components/shop/HomepageShowcase';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { 
      isActive: true,
      isFeatured: true,
    },
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
    include: {
      category: true,
      brand: true,
      tag: true,
      images: { orderBy: { sortOrder: 'asc' } },
      reviews: {
        where: { isApproved: true },
        select: { rating: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner (TeePublic Design Style: 20px radius, Midnight Ink background, Signature Gold CTA) */}
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-8">
        <div className="relative rounded-[20px] overflow-hidden bg-[#151523] text-white min-h-[380px] sm:min-h-[460px] flex items-center p-6 sm:p-14 border border-[#d7d7db] shadow-sm">
          {/* Arka Plan Gerçek Fotoğraf */}
          <img
            src="/uploads/products/plise_beyaz_petek.jpg"
            alt="Plise Perde Bursa Özel Ölçü"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151523] via-[#151523]/80 to-transparent" />

          {/* Hero Metni */}
          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-widest bg-[#FAF5EB] border border-[#C5A059]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              BURSA ATÖLYESİNDEN DOĞRUDAN SATIŞ
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Cam Balkon & Pencerelere Özel <br className="hidden sm:block" />
              <span className="text-[#DFCE9E]">Plise Perde Sistemleri</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#b9b9c1] mb-6 leading-relaxed">
              İster vidalı ister profil delmeden yapıştırmalı montaj. Petek kumaş, tül plise ve karartma kumaş seçenekleriyle Bursa atölyemizden milimetrik net ölçünüze özel üretim.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/kategori/plise-perdeler"
                className="bg-[#C5A059] hover:bg-[#B88E28] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              >
                Plise Perdeleri Keşfet →
              </Link>
              <Link
                href="/sayfalar/perde-olcusu-nasil-alinir"
                className="bg-white hover:bg-[#FAF5EB] text-[#151523] border border-[#d7d7db] px-5 py-3 rounded-xl text-xs font-bold transition"
              >
                Ölçü Nasıl Alınır?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ana Sayfa Vitrin ve Kategori Filtreli Ürün Listesi */}
      <HomepageShowcase products={products as any} />

      {/* 4. Küçük Kampanya Bannerları & Avantajlar */}
      <div className="max-w-7xl mx-auto px-4">
        <SmallBanners />
      </div>
    </main>
  );
}