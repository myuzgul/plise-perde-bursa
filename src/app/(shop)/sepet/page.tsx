'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  CheckCircle2, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<{ code: string; amount: number; desc: string } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Dinamik Sistem Ayarları (Kargo baremleri)
  const [settings, setSettings] = useState<any>(null);

  React.useEffect(() => {
    fetch('/api/settings/public')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setSettings(data.data);
      })
      .catch(() => {});
  }, []);

  const freeShippingThreshold = settings?.free_shipping_threshold ?? 1500;
  const standardShippingFee = settings?.shipping_fee ?? 99.90;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : standardShippingFee;
  const discountAmount = couponDiscount ? couponDiscount.amount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal, shippingFee }),
      });
      const data = await res.json();
      if (data.success) {
        setCouponDiscount({
          code: data.data.code,
          amount: data.data.discountAmount,
          desc: data.data.descriptionText,
        });
        setCouponCode('');
      } else {
        setCouponError(data.error || 'Geçersiz kupon kodu');
      }
    } catch {
      setCouponError('Kupon uygulanırken bir hata oluştu');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 text-center min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full border border-[#d7d7db] p-8 rounded-xl bg-white shadow-xs">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-[#d7d7db]" />
          <h1 className="text-lg font-bold text-[#151523] mb-1">Sepetiniz Boş</h1>
          <p className="text-xs text-[#49495a] mb-6 leading-relaxed">
            Özel ölçülü perde modellerimizi inceleyebilir, milimetrik ölçülerinize göre fiyat hesaplayarak sepetinize ekleyebilirsiniz.
          </p>
          <Link
            href="/kategori/plise-perdeler"
            className="w-full bg-[#C5A059] hover:bg-[#B88E28] text-white py-3 px-4 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          >
            <span>Perde Modellerini İncele</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Üst Başlık */}
      <div className="flex items-end justify-between border-b border-[#d7d7db] pb-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#151523]">Alışveriş Sepeti</h1>
          <p className="text-xs text-[#49495a]">{items.length} kalem özel ölçü perde</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#868694] hover:text-[#ff0000] font-semibold transition flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Sepeti Temizle</span>
        </button>
      </div>

      {/* Ücretsiz Kargo İlerleme Çubuğu */}
      <div className="border border-[#d7d7db] rounded-xl p-4 bg-[#FAF5EB]/40 mb-6 shadow-xs">
        {remainingForFreeShipping > 0 ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#49495a]">
              <span className="flex items-center gap-1.5 text-[#151523]">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                <span>Ücretsiz Kargo Fırsatı:</span>
              </span>
              <span className="text-[#C5A059] font-bold">₺{remainingForFreeShipping.toFixed(2)} daha ekleyin</span>
            </div>
            <div className="w-full h-1.5 bg-[#e9e9ec] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Tebrikler! ₺{freeShippingThreshold.toLocaleString('tr-TR')} üzeri siparişiniz için KARGO ÜCRETSİZ!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SOL: Sepet Ürünleri Listesi */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border border-[#d7d7db] rounded-xl divide-y divide-[#e9e9ec] overflow-hidden shadow-xs">
            {items.map((item) => {
              const snap = item.calculationResult.selectedOptionsSnapshot as Record<string, any>;
              return (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 bg-white">
                  {/* Fotoğraf */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full sm:w-24 sm:h-28 aspect-4/3 sm:aspect-auto object-cover rounded-xl border border-[#d7d7db] shrink-0"
                  />

                  {/* Detaylar */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#868694] block">{item.sku}</span>
                          <h3 className="text-xs sm:text-sm font-bold text-[#151523]">
                            <Link href={`/urun/${item.slug}`} className="hover:text-[#C5A059] transition">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#868694] hover:text-[#ff0000] transition p-1 cursor-pointer"
                          title="Ürünü Kaldır"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Teknik Ölçü Bilgileri */}
                      <div className="mt-2 text-xs text-[#49495a] space-y-0.5 bg-[#FAF5EB]/40 p-3 rounded-lg border border-[#d7d7db]">
                        <div className="font-bold text-[#151523] font-mono">
                          Ölçü: {item.width} x {item.height} cm ({item.calculationResult.calculatedArea} {item.calculationResult.areaUnit === 'SQM' ? 'm²' : 'm'})
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[#49495a]">
                          {snap.pleatLabel && <span>• Pile: <strong>{snap.pleatLabel}</strong></span>}
                          {snap.caseType && <span>• Kasa: <strong>{snap.caseType === 'CLOSED' ? 'Kapalı Kasa' : 'Açık Kasa'}</strong></span>}
                          {snap.chainType && <span>• Zincir: <strong>{snap.chainType === 'METAL' ? 'Metal' : 'Plastik'}</strong></span>}
                          {snap.mechanismDirection && <span>• Yön: <strong>{snap.mechanismDirection === 'RIGHT' ? 'Sağ' : 'Sol'}</strong></span>}
                          {snap.skirtCut && <span>• Etek: <strong>Dilimli {snap.withBeads ? '+ Boncuk' : ''}</strong></span>}
                          {snap.plisseMeasurementLabel && <span>• Ölçü Tipi: <strong>{snap.plisseMeasurementLabel}</strong></span>}
                          {snap.plisseColorLabel && <span>• Profil Rengi: <strong>{snap.plisseColorLabel}</strong></span>}
                          {snap.mountingLabel && <span>• Montaj: <strong>{snap.mountingLabel}</strong></span>}
                        </div>
                        {item.note && (
                          <div className="text-[11px] text-amber-800 italic mt-1">
                            Not: {item.note}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Adet & Fiyat */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e9e9ec]">
                      <div className="flex items-center border border-[#d7d7db] rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 hover:bg-[#FAF5EB] text-[#151523] font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-[#151523]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 hover:bg-[#FAF5EB] text-[#151523] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#49495a] block">Birim: ₺{item.unitPrice.toFixed(2)}</span>
                        <span className="text-base font-bold text-[#151523]">
                          ₺{item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs font-semibold text-[#151523] hover:text-[#C5A059] inline-flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Alışverişe Devam Et</span>
            </Link>
          </div>
        </div>

        {/* SAĞ: Kupon & Sipariş Özeti */}
        <div className="lg:col-span-4 space-y-6">
          {/* İndirim Kuponu */}
          <div className="border border-[#d7d7db] rounded-xl p-4 bg-white space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#151523] uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>İndirim Kuponu</span>
            </h3>

            {couponDiscount ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                <div>
                  <span className="font-bold">{couponDiscount.code}</span>
                  <span className="block text-[10px] text-emerald-600">{couponDiscount.desc}</span>
                </div>
                <button
                  onClick={() => setCouponDiscount(null)}
                  className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  Kaldır
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kupon Kodu"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-[#d7d7db] focus:border-[#C5A059] rounded-lg px-3 py-2 text-xs uppercase outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode.trim()}
                    className="px-4 py-2 bg-[#151523] hover:bg-[#222234] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Uygula
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-red-500">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Sipariş Özeti */}
          <div className="border border-[#d7d7db] rounded-xl p-5 bg-white space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-[#151523] uppercase tracking-wider border-b border-[#e9e9ec] pb-2">
              Sipariş Özeti
            </h3>

            <div className="space-y-2 text-xs text-[#49495a]">
              <div className="flex justify-between">
                <span>Ara Toplam (KDV Dahil):</span>
                <span className="font-bold text-[#151523]">₺{subtotal.toFixed(2)}</span>
              </div>

              {couponDiscount && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Kupon İndirimi ({couponDiscount.code}):</span>
                  <span>-₺{couponDiscount.amount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Kargo Bedeli:</span>
                {shippingFee === 0 ? (
                  <span className="font-bold text-emerald-600">ÜCRETSİZ</span>
                ) : (
                  <span className="font-bold text-[#151523]">₺{shippingFee.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e9e9ec] flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#151523]">Toplam Tutar:</span>
              <span className="text-2xl font-bold text-[#151523]">
                ₺{grandTotal.toFixed(2)}
              </span>
            </div>

            <Link
              href="/odeme"
              className="w-full bg-[#C5A059] hover:bg-[#B88E28] text-white py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition uppercase tracking-wide shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            >
              <span>Ödeme Adımına Geç</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL ile Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}