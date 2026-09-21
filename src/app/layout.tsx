import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plise Perde Bursa - Cam Balkon & Özel Ölçü Plise Perde Sistemleri",
  description: "Bursa özel ölçülü plise perde imalatı. Cam balkon, pencere ve kapılar için vidalı ve yapıştırmalı plise perde modelleri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}