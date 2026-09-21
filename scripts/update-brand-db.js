const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Updating System Settings ---');

  const settingsToUpsert = [
    {
      key: 'site_title',
      value: 'Plise Perde Bursa - Cam Balkon & Özel Ölçü Plise Perde Sistemleri',
      label: 'Site Başlığı',
      group: 'GENERAL',
      description: 'Site genel başlığı'
    },
    {
      key: 'site_phone',
      value: '0532 726 34 74',
      label: 'Müşteri Hizmetleri & WhatsApp Hattı',
      group: 'GENERAL',
      description: 'Header, footer ve iletişim sayfalarında görünen ana telefon'
    },
    {
      key: 'site_address',
      value: 'Davutdede, 2. Zümrüt Sk. No:29 D:31, 16000 Yıldırım/Bursa',
      label: 'Atölye & Mağaza Adresi',
      group: 'GENERAL',
      description: 'Firma açık adresi'
    },
    {
      key: 'site_email',
      value: 'info@pliseperdebursa.com.tr',
      label: 'İletişim E-Posta Adresi',
      group: 'GENERAL',
      description: 'Müşteri iletişim ve bildirim e-postası'
    },
    {
      key: 'site_slogan',
      value: "Bursa'nın Lider Plise Perde Üreticisi • Özel Ölçü & Kusursuz Uyum",
      label: 'Üst Slogan',
      group: 'GENERAL',
      description: 'Pre-header sol üst slogan'
    },
    {
      key: 'site_discount_bar_text',
      value: 'PLİSE PERDELERDE FABRİKADAN HALKA ÖZEL FİYATLAR',
      label: 'İndirim Çubuğu Metni',
      group: 'GENERAL',
      description: 'Pre-header orta kampanya duyurusu'
    },
    {
      key: 'bank_transfer_accounts',
      value: 'Banka: QNB Finansbank / Halkbank\nAlıcı Ünvanı: Plise Perde Bursa\nIBAN: TR 22 0001 2009 2940 0010 2606 47\nŞube: Bursa Yıldırım Şubesi',
      label: 'Banka Hesap Bilgileri / IBAN',
      group: 'PAYMENT',
      description: 'Havale / EFT için banka hesap bilgileri'
    }
  ];

  for (const s of settingsToUpsert) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, label: s.label, group: s.group, description: s.description },
      create: s
    });
    console.log(`Updated setting: ${s.key} -> ${s.value}`);
  }

  console.log('\n--- Updating Static Pages ---');

  // Hakkımızda
  const hakkimizdaHtml = `
  <div class="space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
    <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80">
      <h3 class="text-base font-bold text-amber-900 mb-2">Bursa'nın Öncü Plise Perde İmalatçısı</h3>
      <p class="text-slate-700">
        <strong>Plise Perde Bursa</strong> olarak, Bursa Yıldırım'daki modern üretim atölyemizde cam balkon, alüminyum doğrama, PVC pencere ve kış bahçeleri için 1. sınıf plise perde sistemleri üretiyoruz.
      </p>
    </div>

    <h3 class="text-sm font-bold text-slate-900 mt-4">Neden Plise Perde Bursa?</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Milimetrik Özel Ölçü:</strong> Her bir kanat pencerenize veya cam balkonunuza tam sıfıra sıfır uyum sağlayacak hassasiyette kesim ve montaj hazırlığı.</li>
      <li><strong>Vidalı veya Yapıştırmalı Montaj Kolaylığı:</strong> Camınızı veya profilinizi delmek istemiyorsanız yüksek mukavemetli yapıştırmalı alüminyum profil seçeneği.</li>
      <li><strong>Isı & Işık Kontrolü:</strong> Güneş ışınlarını kıran tül plise, tam karartma sağlayan blackout petek ve leke tutmaz nano kumaş seçenekleri.</li>
      <li><strong>Fabrikadan Doğrudan Satış:</strong> Aracı olmadan doğrudan üretim atölyemizden en avantajlı fiyat garantisi.</li>
    </ul>

    <h3 class="text-sm font-bold text-slate-900 mt-4">Atölye ve İletişim</h3>
    <p>
      Siparişlerinizi sitemiz üzerinden milimetrik ölçülerinizi girerek 7/24 güvenle oluşturabilir, montaj ve ölçü konusunda uzman ekibimizden doğrudan WhatsApp ve telefon desteği alabilirsiniz.
    </p>
  </div>
  `;

  await prisma.staticPage.upsert({
    where: { slug: 'hakkimizda' },
    update: {
      title: 'Hakkımızda',
      contentHtml: hakkimizdaHtml,
      seoTitle: 'Hakkımızda - Plise Perde Bursa',
      seoDesc: 'Plise Perde Bursa atölyesi ve özel ölçülü cam balkon plise perde imalatı hakkında detaylı bilgi.'
    },
    create: {
      slug: 'hakkimizda',
      title: 'Hakkımızda',
      contentHtml: hakkimizdaHtml,
      seoTitle: 'Hakkımızda - Plise Perde Bursa',
      seoDesc: 'Plise Perde Bursa atölyesi ve özel ölçülü cam balkon plise perde imalatı hakkında detaylı bilgi.'
    }
  });
  console.log('Updated static page: hakkimizda');

  // İletişim
  const iletisimHtml = `
  <div class="space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
    <p>
      <strong>Plise Perde Bursa</strong> müşteri destek ve imalat ekibimiz; ölçü alma, kumaş ve mekanizma seçimi, sipariş takibi ve montaj adımlarında her zaman yanınızdadır.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <h4 class="font-bold text-slate-900 text-sm mb-2">📍 Atölye & Mağaza Adresi</h4>
        <p class="text-slate-600 text-xs">
          Davutdede, 2. Zümrüt Sk. No:29 D:31<br />
          16000 Yıldırım / BURSA
        </p>
      </div>

      <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <h4 class="font-bold text-slate-900 text-sm mb-2">📞 Müşteri Danışma & WhatsApp</h4>
        <p class="text-slate-600 text-xs">
          Telefon / WhatsApp: <a href="tel:+905327263474" class="font-bold text-amber-700 hover:underline">0532 726 34 74</a><br />
          E-Posta: <a href="mailto:info@pliseperdebursa.com.tr" class="font-bold text-amber-700 hover:underline">info@pliseperdebursa.com.tr</a>
        </p>
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
      <h4 class="font-bold text-amber-950 text-sm mb-1">Çalışma Saatleri</h4>
      <p class="text-xs text-amber-900">
        Pazartesi - Cumartesi: 08:30 - 19:30<br />
        Pazar: Kapalı (Web sitemiz üzerinden 7/24 sipariş verebilirsiniz)
      </p>
    </div>
  </div>
  `;

  await prisma.staticPage.upsert({
    where: { slug: 'iletisim' },
    update: {
      title: 'İletişim & Atölye',
      contentHtml: iletisimHtml,
      seoTitle: 'İletişim - Plise Perde Bursa',
      seoDesc: 'Plise Perde Bursa iletişim bilgileri, adres, telefon ve harita konumu.'
    },
    create: {
      slug: 'iletisim',
      title: 'İletişim & Atölye',
      contentHtml: iletisimHtml,
      seoTitle: 'İletişim - Plise Perde Bursa',
      seoDesc: 'Plise Perde Bursa iletişim bilgileri, adres, telefon ve harita konumu.'
    }
  });
  console.log('Updated static page: iletisim');

  // Update remaining static pages: replace any old brand or phone strings
  const allPages = await prisma.staticPage.findMany();
  for (const p of allPages) {
    if (p.slug !== 'hakkimizda' && p.slug !== 'iletisim') {
      let updatedHtml = p.contentHtml
        .replace(/Yazar Perde/g, 'Plise Perde Bursa')
        .replace(/0541 494 51 73/g, '0532 726 34 74')
        .replace(/\+905414945173/g, '+905327263474')
        .replace(/yazarperde@hotmail\.com/g, 'info@pliseperdebursa.com.tr')
        .replace(/Anadolu Mah\. Atıcılar Cd\. No: 1\/A1/g, 'Davutdede, 2. Zümrüt Sk. No:29 D:31');

      if (updatedHtml !== p.contentHtml) {
        await prisma.staticPage.update({
          where: { id: p.id },
          data: { contentHtml: updatedHtml }
        });
        console.log(`Cleaned brand mentions in page: ${p.slug}`);
      }
    }
  }

  console.log('All DB records updated successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
