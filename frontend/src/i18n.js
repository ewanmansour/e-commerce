import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        collection: 'Collection',
        about: 'About',
        contact: 'Contact',
        account: 'Account',
        orders: 'Orders',
        logout: 'Logout',
        language: 'AR',
      },
      hero: {
        kicker: 'New Season Edit',
        title: 'MY STORE',
        body: 'Refined everyday pieces, clean silhouettes, and reliable wardrobe staples built for repeat wear.',
        shop: 'Shop Collection',
        story: 'Our Story',
      },
      search: {
        open: 'Open search',
        placeholder: 'Search products',
      },
      footer: {
        description: 'A modern essentials store focused on clean design, dependable quality, and a smooth shopping experience.',
        company: 'Company',
        customerService: 'Customer Service',
        delivery: 'Delivery Info',
        privacyPolicy: 'Privacy Policy',
        returns: 'Returns & Exchanges',
        faqs: 'FAQs',
        getInTouch: 'Get In Touch',
        rights: 'Copyright 2026 — All rights reserved.',
        address: '123 E-Commerce Blvd, Suite 100',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        collection: 'المجموعة',
        about: 'من نحن',
        contact: 'تواصل',
        account: 'الحساب',
        orders: 'الطلبات',
        logout: 'خروج',
        language: 'EN',
      },
      hero: {
        kicker: 'تشكيلة الموسم',
        title: 'أساسيات Forever',
        body: 'قطع يومية أنيقة، قصات نظيفة، وخيارات يعتمد عليها في كل مرة.',
        shop: 'تسوق المجموعة',
        story: 'قصتنا',
      },
      search: {
        open: 'افتح البحث',
        placeholder: 'ابحث عن المنتجات',
      },
      footer: {
        description: 'متجر أساسيات عصري يركز على التصميم النظيف، الجودة الموثوقة، وتجربة تسوق سلسة ورائعة.',
        company: 'الشركة',
        customerService: 'خدمة العملاء',
        delivery: 'معلومات التوصيل',
        privacyPolicy: 'سياسة الخصوصية',
        returns: 'الاسترجاع والاستبدال',
        faqs: 'الأسئلة الشائعة',
        getInTouch: 'اتصل بنا',
        rights: 'حقوق الطبع والنشر ٢٠٢٦ — جميع الحقوق محفوظة.',
        address: '١٢٣ شارع التجارة الإلكترونية، جناح ١٠٠',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
