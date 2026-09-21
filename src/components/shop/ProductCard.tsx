'use client';

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  sku: string;
  curtainType: string;
  basePrice: number;
  discountPrice?: number | null;
  categoryName?: string;
  brandName?: string;
  brandLogo?: string | null;
  tag?: { name: string; badgeColor: string } | null;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export default function ProductCard({
  name,
  slug,
  sku,
  curtainType,
  basePrice,
  discountPrice,
  categoryName,
  brandName,
  tag,
  imageUrl = '/static/sample/tulle_sample.jpg',
  rating = 5,
  reviewCount = 0,
}: ProductCardProps) {
  const hasDiscount = discountPrice && discountPrice < basePrice;
  const currentPrice = hasDiscount ? discountPrice : basePrice;

  return (
    <Link
      href={`/urun/${slug}`}
      className="group flex flex-col bg-white border border-[#d7d7db] hover:border-[#C5A059] transition-all duration-200 rounded-xl p-2.5 overflow-hidden shadow-xs hover:shadow-md"
    >
      {/* 1. Ürün Görsel Alanı (20px radius per designer.md) */}
      <div className="relative aspect-4/5 w-full bg-[#e9e9ec] rounded-[20px] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Sol Üst Rozet */}
        {tag && (
          <span
            style={{ backgroundColor: tag.badgeColor }}
            className="absolute top-2.5 left-2.5 text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs"
          >
            {tag.name}
          </span>
        )}

        {/* İndirim Rozeti (Signal Red #ff0000) */}
        {hasDiscount && (
          <span className="absolute top-2.5 right-2.5 bg-[#ff0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            %{Math.round(((basePrice - discountPrice) / basePrice) * 100)} İNDİRİM
          </span>
        )}
      </div>

      {/* 2. Bilgi Alanı */}
      <div className="p-2 pt-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Kategori ve Marka */}
          <div className="text-[11px] text-[#49495a] font-medium mb-1 flex items-center justify-between">
            <span>{categoryName || 'Özel Ölçü'}</span>
            {brandName && <span className="font-semibold text-[#151523]">{brandName}</span>}
          </div>

          {/* Ürün Adı */}
          <h3 className="text-xs sm:text-sm font-bold text-[#151523] line-clamp-2 leading-snug group-hover:text-[#C5A059] transition-colors">
            {name}
          </h3>

          {/* Yıldız / Değerlendirme (Signature Violet #C5A059 stars) */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-[#C5A059]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-3.5 h-3.5 ${star <= (reviewCount > 0 ? rating : 5) ? 'fill-current' : 'text-[#d7d7db]'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#151523]">
              {rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-[#49495a]">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Fiyat Alanı */}
        <div className="pt-2.5 border-t border-[#e9e9ec] flex items-end justify-between">
          <div>
            <span className="text-[10px] text-[#49495a] block font-medium">Birim Fiyat</span>
            <div className="flex items-baseline gap-1.5">
              {hasDiscount && (
                <span className="text-xs text-[#49495a] line-through">
                  ₺{basePrice.toFixed(2)}
                </span>
              )}
              <span className={`text-sm sm:text-base font-bold ${hasDiscount ? 'text-[#ff0000]' : 'text-[#151523]'}`}>
                ₺{currentPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <span className="text-xs text-[#C5A059] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Ölçü Seçin →
          </span>
        </div>
      </div>
    </Link>
  );
}