'use client';

import React from 'react';
import { ShoppingBag, ShieldCheck } from 'lucide-react';
import { CalculationResult } from '@/modules/pricing-engine';

interface PriceSummaryBoxProps {
  calcResult: CalculationResult | null;
  quantity: number;
  setQuantity: (v: number) => void;
  note: string;
  setNote: (v: string) => void;
  onAddToCart: () => void;
}

export default function PriceSummaryBox({
  calcResult,
  quantity,
  setQuantity,
  note,
  setNote,
  onAddToCart,
}: PriceSummaryBoxProps) {
  if (!calcResult) return null;

  return (
    <div className="border border-[#d7d7db] rounded-xl p-5 space-y-4 bg-white shadow-xs">
      <div className="flex items-end justify-between border-b border-[#e9e9ec] pb-3">
        <div>
          <span className="text-[10px] font-bold text-[#49495a] uppercase tracking-wider block">
            HESAPLANAN TOPLAM TUTAR (KDV DAHİL)
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-[#151523] mt-0.5">
            ₺{calcResult.grandTotal.toFixed(2)}
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="font-bold text-[#151523] block font-mono">
            {calcResult.curtainType === 'FIXED_PRICE' ? `${quantity} Adet` : `${calcResult.calculatedArea} ${calcResult.areaUnit === 'SQM' ? 'm²' : 'Metre'}`}
          </span>
          <span className="text-[10px] text-[#49495a]">
            {calcResult.curtainType === 'FIXED_PRICE' ? 'Hazır Standart Ölçü' : 'Net Kesim Ölçüsü'}
          </span>
        </div>
      </div>

      {/* Maliyet Kırılım Dökümü */}
      <div className="space-y-1 text-xs text-[#49495a] bg-[#FAF5EB]/40 p-3 rounded-lg border border-[#d7d7db]">
        <span className="text-[10px] font-bold text-[#151523] block uppercase mb-1">Fiyat Kırılımı:</span>
        {calcResult.breakdown.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{item.label} {item.unit ? `(${item.unit})` : ''}</span>
            <span className="font-bold text-[#151523]">₺{item.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Müşteri Notu */}
      <div>
        <label className="block text-xs font-semibold text-[#151523] mb-1.5">
          Atölye Sipariş Notu (Opsiyonel)
        </label>
        <input
          type="text"
          placeholder="Örn: Salon sol pencere için, 2 cm kısa dikilsin vb."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-[#d7d7db] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-lg px-3 py-2 text-xs bg-white text-[#151523] outline-none transition"
        />
      </div>

      {/* Adet & Sepete Ekle Butonu */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex items-center border border-[#d7d7db] rounded-lg bg-white overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2.5 hover:bg-[#FAF5EB] font-bold text-[#151523] text-sm transition"
          >
            -
          </button>
          <span className="px-3.5 font-bold text-[#151523] text-xs">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2.5 hover:bg-[#FAF5EB] font-bold text-[#151523] text-sm transition"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          className="flex-1 bg-[#C5A059] hover:bg-[#B88E28] text-white py-3.5 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.2)] uppercase tracking-wide"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Sepete Ekle • ₺{calcResult.grandTotal.toFixed(2)}</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#49495a] pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Kişiye Özel Milimetrik Kesim & 24 Ay Mekanizma Garantisi</span>
      </div>
    </div>
  );
}