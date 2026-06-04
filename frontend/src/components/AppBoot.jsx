import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import i18n from '../i18n';
import { useInterfaceStore } from '../store/interfaceStore';

const AppBoot = () => {
  const location = useLocation();
  const language = useInterfaceStore((state) => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    NProgress.start();
    const timer = window.setTimeout(() => NProgress.done(), 220);

    return () => {
      window.clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default AppBoot;
