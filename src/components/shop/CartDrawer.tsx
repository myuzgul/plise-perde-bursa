'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface CartDrawerProps {
  freeShippingThreshold?: number;
}

export default function CartDrawer({ freeShippingThreshold: initialThreshold = 1500 }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, isDrawerOpen, closeDrawer } = useCart();
  const [threshold, setThreshold] = React.useState<number>(initialThreshold);

  React.useEffect(() => {
    fetch('/api/settings/public')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.free_shipping_threshold) {
          setThreshold(Number(d.data.free_shipping_threshold));
        }
      })
      .catch(() => {});
  }, []);

  if (!isDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Arkaplan Karartma */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col font-sans">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-slate-900" />
              <h2 className="text-sm font-bold text-slate-900">Alışveriş Sepetim ({items.length})</h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1 text-slate-400 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Ücretsiz Kargo İlerleme Çubuğu */}
          <div className="p-3 bg-[#FAF5EB]/50 border-b border-[#d7d7db] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#49495a]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Ücretsiz Kargo:</span>
                  </span>
                  <span className="text-[#151523] font-bold">₺{remainingForFreeShipping.toFixed(2)} daha ekleyin</span>
                </div>
                <div className="w-full h-1.5 bg-[#e9e9ec] overflow-hidden rounded-full">
                  <div
                    className="h-full bg-[#C5A059] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bu siparişinizde KARGO ÜCRETSİZ!</span>
              </div>
            )}
          </div>

          {/* Sepet Kalemleri Listesi */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-[#e9e9ec]">
            {items.length > 0 ? (
              items.map((item) => {
                const snap = item.calculationResult.selectedOptionsSnapshot as Record<string, any>;
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-xl border border-[#d7d7db] shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#151523] line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#868694] hover:text-[#ff0000] transition p-0.5 cursor-pointer"
                            title="Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Ölçü & Perde Detayları */}
                        <div className="mt-1 text-[11px] text-[#49495a] space-y-0.5">
                          <div className="font-semibold text-[#151523] font-mono">
                            {item.width} x {item.height} cm ({item.calculationResult.calculatedArea} {item.calculationResult.areaUnit === 'SQM' ? 'm²' : 'm'})
                          </div>
                          {snap.pleatLabel && <div>Pile: {snap.pleatLabel}</div>}
                          {snap.caseType && <div>Kasa: {snap.caseType === 'CLOSED' ? 'Kapalı Kasa' : 'Açık Kasa'}</div>}
                          {snap.chainType && <div>Zincir: {snap.chainType === 'METAL' ? 'Metal' : 'Plastik'}</div>}
                          {snap.mechanismDirection && <div>Yön: {snap.mechanismDirection === 'RIGHT' ? 'Sağ' : 'Sol'}</div>}
                          {snap.skirtCut && <div>Etek: Dilimli {snap.withBeads ? '+ Boncuk' : ''}</div>}
                          {item.note && <div className="text-amber-800 text-[10px]">Not: {item.note}</div>}
                        </div>
                      </div>

                      {/* Adet & Fiyat */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e9e9ec]">
                        <div className="flex items-center border border-[#d7d7db] rounded-lg bg-white overflow-hidden text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-[#FAF5EB] text-[#151523] font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 font-bold text-[#151523] text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-[#FAF5EB] text-[#151523] font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#151523]">
                          ₺{item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-[#868694]">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-[#d7d7db]" />
                <p className="text-xs font-bold text-[#151523]">Sepetinizde ürün bulunmuyor</p>
                <p className="text-[11px] text-[#49495a] mt-0.5">Perde modellerini inceleyerek sepete ekleyebilirsiniz.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#d7d7db] bg-white space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#151523]">
                <span>Ara Toplam:</span>
                <span className="text-base font-bold text-[#151523]">₺{subtotal.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/sepet"
                  onClick={closeDrawer}
                  className="py-3 px-3 rounded-xl border border-[#d7d7db] bg-white hover:bg-[#FAF5EB] text-[#151523] text-xs font-bold text-center transition"
                >
                  Sepete Git
                </Link>
                <Link
                  href="/odeme"
                  onClick={closeDrawer}
                  className="py-3 px-3 rounded-xl bg-[#C5A059] hover:bg-[#B88E28] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                >
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}