'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Truck, ShieldCheck } from 'lucide-react';

interface PreHeaderProps {
  slogan?: string;
  discountText?: string;
  phone?: string;
}

export default function PreHeader({
  slogan = "Bursa'nın Lider Plise Perde Üreticisi • Özel Ölçü & Kusursuz Uyum",
  discountText = 'PLİSE PERDELERDE FABRİKADAN HALKA ÖZEL FİYATLAR • 1.500 TL ÜZERİ ÜCRETSİZ KARGO',
  phone = '0532 726 34 74',
}: PreHeaderProps) {
  return (
    <div className="bg-[#C5A059] text-white text-[12px] sm:text-[13px] py-2 px-4 border-b border-[#B88E28]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        {/* Sol: Slogan */}
        <div className="hidden lg:flex items-center gap-2 text-white/90 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#EADBBA]" />
          <span>{slogan}</span>
        </div>

        {/* Orta: Kampanya Duyuru Şeridi */}
        <div className="flex items-center gap-2 font-bold text-white mx-auto lg:mx-0 tracking-wide">
          <Truck className="w-4 h-4 text-[#EADBBA]" />
          <span>{discountText}</span>
        </div>

        {/* Sağ: Sipariş Takibi & Müşteri Hattı */}
        <div className="hidden sm:flex items-center gap-4 text-white/90 text-xs font-semibold">
          <Link href="/siparis-takip" className="hover:text-white hover:underline transition">
            Sipariş Takibi
          </Link>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-1.5 text-white hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-[#EADBBA]" />
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-bold">{phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}