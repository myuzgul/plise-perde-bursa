import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, FileText, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

interface StaticPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.staticPage.findUnique({
    where: { slug },
  });

  if (!page) return { title: 'Sayfa Bulunamadı' };

  return {
    title: page.seoTitle || `${page.title} - Plise Perde Bursa`,
    description: page.seoDesc || `${page.title} hakkında detaylı bilgi.`,
  };
}

export default async function DynamicStaticPage({ params }: StaticPageProps) {
  const { slug } = await params;

  const page = await prisma.staticPage.findUnique({
    where: { slug },
  });

  if (!page || !page.isActive) {
    notFound();
  }

  const allPages = await prisma.staticPage.findMany({
    where: { isActive: true },
    select: { title: true, slug: true },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>Kurumsal Rehber</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900">{page.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sol Menü: Kurumsal Linkler */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-[#d7d7db] shadow-xs">
            <h3 className="text-xs font-bold text-[#151523] uppercase tracking-wider mb-4 border-l-2 border-[#C5A059] pl-2.5">
              Bilgi Merkezi
            </h3>
            <ul className="space-y-1.5 text-xs font-semibold">
              {allPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/sayfalar/${p.slug}`}
                    className={`block px-3 py-2 rounded-lg transition ${
                      p.slug === slug
                        ? 'bg-[#151523] text-white shadow-xs'
                        : 'text-[#49495a] hover:bg-[#FAF5EB] hover:text-[#151523]'
                    }`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF5EB] p-5 rounded-xl border border-[#d7d7db] text-xs text-[#151523] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#C5A059]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Yardıma mı İhtiyacınız Var?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#49495a]">
              Ölçü alma veya kumaş seçimi konusunda uzman perde danışmanlarımızla hemen iletişime geçebilirsiniz.
            </p>
            <a
              href="tel:+905327263474"
              className="inline-block font-bold text-[#C5A059] text-xs mt-1 hover:underline"
            >
              📞 0532 726 34 74
            </a>
          </div>
        </aside>

        {/* Sağ İçerik Alanı */}
        <article className="md:col-span-8 lg:col-span-9 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100">
            {page.title}
          </h1>

          <div
            className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}