'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  User, 
  X, 
  Menu, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  Package, 
  Ruler, 
  HelpCircle,
  LogOut,
  MapPin,
  Settings
} from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenAuth?: () => void;
}

interface MobileMenuCategory {
  id: string;
  name: string;
  slug: string;
  children?: { id: string; name: string; slug: string }[];
}

export default function Header({ cartCount = 0, onOpenCart, onOpenAuth }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategories, setMobileCategories] = useState<MobileMenuCategory[]>([]);
  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; surname: string; email: string } | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/shop/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setMobileCategories(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/admin/products?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.data.slice(0, 5));
      }
    } catch {
      setSearchResults([]);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-[#d7d7db] sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-4 sm:gap-6">
          {/* Sol: Hamburger Butonu (Mobil) & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 -ml-1 rounded-lg hover:bg-[#e9e9ec] text-[#151523] md:hidden cursor-pointer"
              aria-label="Kategorileri Göster"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/images/logo.svg"
                alt="Plise Perde Bursa"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Orta: Search Bar (designer.md spec: 1px #d7d7db border, 8px radius, icon #C5A059, focus #C5A059) */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative flex items-center border border-[#d7d7db] focus-within:border-[#C5A059] rounded-lg bg-white h-[42px] transition-colors">
              <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Plise perde modeli, kumaş türü veya ürün kodu arayın..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-full pl-10 pr-9 text-sm text-[#151523] placeholder:text-[#b9b9c1] bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setIsSearching(false);
                  }}
                  className="absolute right-2.5 text-[#49495a] hover:text-[#151523]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Canlı Arama Sonuç Dropdown */}
            {isSearching && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#d7d7db] shadow-card-elevated p-1.5 z-50 divide-y divide-[#e9e9ec]">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/urun/${item.slug}`}
                    onClick={() => setIsSearching(false)}
                    className="flex items-center gap-3 p-2 hover:bg-[#FAF5EB] rounded-lg transition"
                  >
                    <img
                      src={item.images?.[0]?.imageUrl || '/uploads/products/plise_beyaz_petek.jpg'}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-[8px] border border-[#d7d7db] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#151523] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#49495a]">{item.category?.name} • {item.sku}</p>
                    </div>
                    <span className="text-xs font-bold text-[#C5A059] shrink-0">
                      ₺{item.basePrice.toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Aksiyonlar: Sipariş Takip, Hesabım & Sepet */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/siparis-takip"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#151523] hover:text-[#C5A059] transition"
            >
              <Package className="w-4 h-4 text-[#49495a]" />
              <span>Sipariş Takibi</span>
            </Link>

            {currentUser ? (
              <div 
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <Link
                  href="/hesabim"
                  className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-bold text-[#151523] hover:text-[#C5A059] transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[11px] font-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#49495a]" />
                </Link>

                {userDropdownOpen && (
                  <div className="absolute top-full right-0 min-w-[210px] bg-white border border-[#d7d7db] shadow-card-elevated rounded-xl p-1.5 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-[#e9e9ec] mb-1">
                      <p className="text-xs font-bold text-[#151523] truncate">{currentUser.name} {currentUser.surname}</p>
                      <p className="text-[10px] text-[#49495a] truncate">{currentUser.email}</p>
                    </div>
                    <Link
                      href="/hesabim"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#49495a] hover:text-[#C5A059] hover:bg-[#FAF5EB] rounded-lg"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Hesap Özeti</span>
                    </Link>
                    <Link
                      href="/hesabim/siparisler"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#49495a] hover:text-[#C5A059] hover:bg-[#FAF5EB] rounded-lg"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Siparişlerim</span>
                    </Link>
                    <Link
                      href="/hesabim/adresler"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#49495a] hover:text-[#C5A059] hover:bg-[#FAF5EB] rounded-lg"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Kayıtlı Adreslerim</span>
                    </Link>
                    <Link
                      href="/hesabim/profil"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#49495a] hover:text-[#C5A059] hover:bg-[#FAF5EB] rounded-lg"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Profil & Şifre</span>
                    </Link>
                    <div className="pt-1 mt-1 border-t border-[#e9e9ec]">
                      <button
                        type="button"
                        onClick={async () => {
                          await fetch('/api/auth/logout', { method: 'POST' });
                          setCurrentUser(null);
                          setUserDropdownOpen(false);
                          window.location.href = '/';
                        }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#ff0000] hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#151523] hover:text-[#C5A059] transition cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#49495a]" />
                  <span className="hidden sm:inline">Giriş Yap / Üye Ol</span>
                </button>
              </div>
            )}

            {/* Primary Violet Button with Signal Red Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#C5A059] hover:bg-[#B88E28] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-cta transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sepetim</span>
              {cartCount > 0 && (
                <span className="bg-[#ff0000] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobilde Arama Çubuğu */}
        <div className="px-4 pb-2.5 md:hidden">
          <div className="relative flex items-center border border-[#d7d7db] focus-within:border-[#C5A059] rounded-lg bg-white h-9">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Plise perde veya kumaş ara..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-full pl-9 pr-8 text-xs text-[#151523] placeholder:text-[#b9b9c1] bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setIsSearching(false);
                }}
                className="absolute right-2.5 text-[#49495a]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobil Arama Sonuçları */}
          {isSearching && searchResults.length > 0 && (
            <div className="mt-1 bg-white border border-[#d7d7db] shadow-card-elevated p-1 z-50 divide-y divide-[#e9e9ec] rounded-xl">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/urun/${item.slug}`}
                  onClick={() => setIsSearching(false)}
                  className="flex items-center gap-2.5 p-2 hover:bg-[#FAF5EB] transition rounded-lg"
                >
                  <img
                    src={item.images?.[0]?.imageUrl || '/uploads/products/plise_beyaz_petek.jpg'}
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded-md border border-[#d7d7db] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-[#151523] truncate">{item.name}</p>
                    <p className="text-[9px] text-[#49495a]">{item.category?.name}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#C5A059] shrink-0">
                    ₺{item.basePrice.toFixed(2)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MOBİL DRAWER MENÜ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Karartma Katmanı */}
          <div
            className="fixed inset-0 bg-[#151523]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Çekmece */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Çekmece Başlığı */}
            <div className="p-4 border-b border-[#d7d7db] flex items-center justify-between bg-[#FAF5EB]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <img
                  src="/images/logo.svg"
                  alt="Plise Perde Bursa"
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-[#49495a] hover:text-[#151523]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menü Listesi (Anasayfa, Ürünlerimiz, Hakkımızda, İletişim) */}
            <div className="p-4 flex-1 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#49495a] block mb-2 px-1">
                  Menü
                </span>
                <nav className="divide-y divide-[#e9e9ec]">
                  {/* 1. Anasayfa */}
                  <div className="py-2 px-1">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold text-[#151523] hover:text-[#C5A059] transition block"
                    >
                      ANASAYFA
                    </Link>
                  </div>

                  {/* 2. Ürünlerimiz */}
                  <div className="py-2 px-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/kategori/plise-perdeler"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-bold text-[#151523] hover:text-[#C5A059] transition flex-1 flex items-center gap-1.5"
                      >
                        <span>ÜRÜNLERİMİZ</span>
                        <span className="text-[9px] bg-[#FAF5EB] text-[#C5A059] border border-[#EADBBA] px-2 py-0.5 rounded-full font-bold">
                          PLİSE
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedCatId(expandedCatId === 'all' ? null : 'all')}
                        className="p-1.5 text-[#49495a] hover:text-[#151523] cursor-pointer"
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedCatId === 'all' ? 'rotate-90 text-[#C5A059]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {expandedCatId === 'all' && (
                      <div className="pl-2 pr-1 py-2 mt-2 space-y-1 bg-[#FAF5EB]/50 border border-[#EADBBA] rounded-xl animate-in fade-in">
                        {mobileCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/kategori/${cat.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between py-1.5 px-2 text-xs font-semibold text-[#49495a] hover:text-[#C5A059] hover:bg-white rounded-lg transition"
                          >
                            <span>{cat.name}</span>
                            <ChevronRight className="w-3 h-3 text-[#b9b9c1]" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Hakkımızda */}
                  <div className="py-2 px-1">
                    <Link
                      href="/sayfalar/hakkimizda"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold text-[#151523] hover:text-[#C5A059] transition block"
                    >
                      HAKKIMIZDA
                    </Link>
                  </div>

                  {/* 4. İletişim */}
                  <div className="py-2 px-1">
                    <Link
                      href="/sayfalar/iletisim"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold text-[#151523] hover:text-[#C5A059] transition block"
                    >
                      İLETİŞİM
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Kurumsal / Yardım Linkleri */}
              <div className="pt-2 border-t border-[#d7d7db] space-y-2 text-xs font-medium text-[#49495a]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b9b9c1] block px-1">
                  Müşteri Rehberi
                </span>
                <Link
                  href="/sayfalar/perde-olcusu-nasil-alinir"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-1 text-[#151523] hover:text-[#C5A059]"
                >
                  <Ruler className="w-4 h-4 text-[#C5A059]" />
                  <span>Perde Ölçü Rehberi</span>
                </Link>
                <Link
                  href="/siparis-takip"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-1 text-[#151523] hover:text-[#C5A059]"
                >
                  <Package className="w-4 h-4 text-[#49495a]" />
                  <span>Sipariş Takibi</span>
                </Link>
                <Link
                  href="/sayfalar/sikca-sorulan-sorular"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-1 text-[#151523] hover:text-[#C5A059]"
                >
                  <HelpCircle className="w-4 h-4 text-[#49495a]" />
                  <span>Sıkça Sorulan Sorular</span>
                </Link>
              </div>
            </div>

            {/* Alt Telefon Destek Butonu */}
            <div className="p-4 border-t border-[#d7d7db] bg-[#FAF5EB]">
              <a
                href="tel:+905327263474"
                className="flex items-center justify-center gap-2 bg-[#151523] hover:bg-[#151523]/90 text-white py-2.5 rounded-xl text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>0532 726 34 74</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}