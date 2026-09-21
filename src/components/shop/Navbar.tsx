'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Sparkles, Layers, Phone } from 'lucide-react';

interface MenuChildCategory {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
}

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  children?: MenuChildCategory[];
  _count?: { products: number };
}

const FALLBACK_CATEGORIES: MenuCategory[] = [
  { id: '1', name: 'PLİSE PERDELER', slug: 'plise-perdeler' },
  { id: '2', name: 'TÜL PERDELER', slug: 'tul-perdeler' },
  { id: '3', name: 'STOR PERDELER', slug: 'stor-perdeler' },
  { id: '4', name: 'ZEBRA PERDELER', slug: 'zebra-perdeler' },
  { id: '5', name: 'ÇİFTLİ SİSTEM (TÜL+STOR)', slug: 'ciftli-sistem-tul-stor' },
  { id: '6', name: 'FON PERDELER', slug: 'fon-perdeler' },
  { id: '7', name: 'AHŞAP JALUZİ', slug: 'ahsap-jaluziler' },
];

export default function Navbar() {
  const [categories, setCategories] = useState<MenuCategory[]>(FALLBACK_CATEGORIES);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeChildCat, setActiveChildCat] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/shop/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const sorted = [...data.data].sort((a: any, b: any) => {
            if (a.slug.includes('plise')) return -1;
            if (b.slug.includes('plise')) return 1;
            return 0;
          });
          setCategories(sorted);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="bg-white border-b border-[#d7d7db] relative hidden md:block z-30">
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between">
        {/* Pill Navigation (designer.md spec: 100px radius, 8px 16px padding, 14px font) */}
        <div className="flex items-center gap-2">
          {/* 1. ANASAYFA */}
          <Link
            href="/"
            className="py-2 px-4 rounded-full text-sm font-medium text-[#151523] hover:text-[#C5A059] hover:bg-[#FAF5EB] transition-all"
          >
            ANASAYFA
          </Link>

          {/* 2. ÜRÜNLERİMİZ */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => {
              setDropdownOpen(false);
              setActiveChildCat(null);
            }}
          >
            <Link
              href="/kategori/plise-perdeler"
              className={`py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                dropdownOpen
                  ? 'text-[#C5A059] bg-[#FAF5EB] border border-[#EADBBA]'
                  : 'text-[#151523] border border-transparent hover:text-[#C5A059] hover:bg-[#FAF5EB]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>ÜRÜNLERİMİZ</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-[#C5A059]' : 'text-[#49495a]'
                }`}
              />
            </Link>

            {/* Dropdown Menu (12px radius, 1px #d7d7db border, elevated shadow) */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#d7d7db] shadow-card-elevated rounded-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#e9e9ec] mb-1 flex items-center justify-between text-[11px] font-bold text-[#49495a] uppercase tracking-wider">
                  <span>Perde Modelleri</span>
                  <span className="text-[#C5A059] font-bold">{categories.length} Model</span>
                </div>

                <div className="space-y-1 max-h-[380px] overflow-y-auto">
                  {categories.map((cat) => {
                    const isPlise = cat.slug.includes('plise');
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                      <div
                        key={cat.id}
                        className="relative"
                        onMouseEnter={() => hasChildren && setActiveChildCat(cat.id)}
                      >
                        <Link
                          href={`/kategori/${cat.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className={`group flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition ${
                            isPlise
                              ? 'bg-[#FAF5EB] text-[#C5A059] border border-[#EADBBA]'
                              : 'text-[#151523] hover:text-[#C5A059] hover:bg-[#FAF5EB]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{cat.name}</span>
                            {isPlise && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-[#C5A059] text-white px-2 py-0.5 rounded-full">
                                Popüler
                              </span>
                            )}
                          </div>
                          {hasChildren ? (
                            <ChevronRight className="w-3.5 h-3.5 text-[#b9b9c1] group-hover:text-[#C5A059] transition" />
                          ) : (
                            <span className="text-[10px] text-[#b9b9c1] group-hover:text-[#C5A059]">→</span>
                          )}
                        </Link>

                        {/* Subcategories */}
                        {hasChildren && activeChildCat === cat.id && (
                          <div className="absolute top-0 left-full ml-1 w-[220px] bg-white border border-[#d7d7db] shadow-card-elevated rounded-xl p-2 z-50">
                            <div className="px-2 py-1 text-[10px] font-bold text-[#49495a] uppercase border-b border-[#e9e9ec] mb-1">
                              {cat.name} Çeşitleri
                            </div>
                            {cat.children?.map((child) => (
                              <Link
                                key={child.id}
                                href={`/kategori/${child.slug}`}
                                onClick={() => setDropdownOpen(false)}
                                className="block px-2.5 py-1.5 text-xs font-medium text-[#151523] hover:text-[#C5A059] hover:bg-[#FAF5EB] rounded-lg transition"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-[#e9e9ec]">
                  <Link
                    href="/kategori/plise-perdeler"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold text-center text-white bg-[#C5A059] hover:bg-[#B88E28] rounded-xl transition shadow-cta"
                  >
                    Tüm Plise Modellerini İncele →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. HAKKIMIZDA */}
          <Link
            href="/sayfalar/hakkimizda"
            className="py-2 px-4 rounded-full text-sm font-medium text-[#151523] hover:text-[#C5A059] hover:bg-[#FAF5EB] transition-all"
          >
            HAKKIMIZDA
          </Link>

          {/* 4. İLETİŞİM */}
          <Link
            href="/sayfalar/iletisim"
            className="py-2 px-4 rounded-full text-sm font-medium text-[#151523] hover:text-[#C5A059] hover:bg-[#FAF5EB] transition-all"
          >
            İLETİŞİM
          </Link>
        </div>

        {/* Sağ: Ölçü Rehberi & Telefon (Pill & Link) */}
        <div className="flex items-center gap-3">
          <Link
            href="/sayfalar/perde-olcusu-nasil-alinir"
            className="py-1.5 px-3.5 text-xs font-semibold text-[#151523] hover:text-[#C5A059] bg-[#FAF5EB] border border-[#EADBBA] rounded-full flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ÖLÇÜ REHBERİ</span>
          </Link>

          <a
            href="tel:+905327263474"
            className="flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:text-[#B88E28] transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>0532 726 34 74</span>
          </a>
        </div>
      </div>
    </nav>
  );
}