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
        title: 'E-COMMERCE',
        body: 'Refined everyday pieces, clean silhouettes, and reliable wardrobe staples built for repeat wear.',
        shop: 'Shop Collection',
        story: 'Our Story',
      },
      search: {
        open: 'Open search',
        placeholder: 'Search products',
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
