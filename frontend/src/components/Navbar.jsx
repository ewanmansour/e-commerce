import { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/shop-context';
import { ChevronLeft, Languages, LogOut, Menu, Package, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInterfaceStore } from '../store/interfaceStore';
import { cn } from '../utils/cn';

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/collection', labelKey: 'nav.collection' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
];

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const toggleLanguage = useInterfaceStore((state) => state.toggleLanguage);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <header className={cn(
      'sticky top-0 z-40 -mx-4 border-b px-4 backdrop-blur-md transition-all duration-300 sm:mx-[-5vw] sm:px-[5vw] md:mx-[-7vw] md:px-[7vw] lg:mx-[-9vw] lg:px-[9vw]',
      scrolled
        ? 'border-neutral-200/60 bg-[#fbfaf7]/90 shadow-sm'
        : 'border-black/4 bg-[#fbfaf7]/80'
    )}>
      <div className={cn(
        'flex items-center justify-between font-medium transition-all duration-300',
        scrolled ? 'py-2.5' : 'py-3.5'
      )}>
        <Link to='/' aria-label='Forever home' className='transition-all duration-200 hover:opacity-90 active:scale-98'>
          <img src={assets.logof} className='w-13 sm:w-20' alt="Forever" />
        </Link>

        <ul className='hidden rounded-full border border-neutral-200/80 bg-white/70 p-1 text-sm text-neutral-600 shadow-xs backdrop-blur-xs sm:flex'>
          {navLinks.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              className={({ isActive }) => cn(
                'rounded-full px-4.5 py-1.5 font-medium transition-all duration-200',
                isActive ? 'bg-neutral-950 text-white shadow-xs' : 'hover:bg-neutral-100 hover:text-neutral-950',
              )}
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </ul>

        <div className='flex items-center gap-2.5 sm:gap-3.5'>

          <button onClick={() => setShowSearch(prev => !prev)} className='flex h-9.5 w-9.5 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-700 transition-all duration-200 hover:scale-105 hover:border-neutral-950 hover:text-neutral-950 hover:shadow-xs active:scale-95' aria-label={t('search.open')}>
            <Search size={16} />
          </button>
          <div className='group relative'>
            <button onClick={() => token ? null : navigate('/login')} className='flex h-9.5 w-9.5 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-700 transition-all duration-200 hover:scale-105 hover:border-neutral-950 hover:text-neutral-950 hover:shadow-xs active:scale-95' aria-label='Account'>
              <UserRound size={16} />
            </button>
            {/* Dropdown menu */}
            {token &&
              <div className='dropdown-menu absolute right-0 hidden pt-3 group-hover:block transition-all duration-300'>
                <div className='flex w-44 flex-col gap-1.5 rounded-xl border border-neutral-200/80 bg-white/95 p-2 text-sm text-neutral-600 shadow-xl backdrop-blur-xs'>
                  <p className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-950 font-medium'><UserRound size={15} />{t('nav.account')}</p>
                  <p onClick={() => navigate('/orders')} className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-950 font-medium'><Package size={15} />{t('nav.orders')}</p>
                  <hr className='border-neutral-100 my-0.5' />
                  <p onClick={logout} className='flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 font-medium'><LogOut size={15} />{t('nav.logout')}</p>
                </div>
              </div>
            }

          </div>
          <Link to='/cart' className='relative flex h-9.5 w-9.5 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-700 transition-all duration-200 hover:scale-105 hover:border-neutral-950 hover:text-neutral-950 hover:shadow-xs active:scale-95' aria-label='Cart'>
            <ShoppingBag size={16} />
            <span className='absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[9px] font-bold text-white shadow-xs'>{getCartCount()}</span>

          </Link>
          <button onClick={() => setVisible(true)} className='flex h-9.5 w-9.5 items-center justify-center rounded-full border border-neutral-200 bg-white sm:hidden' aria-label='Open menu'>
            <Menu size={16} />
          </button>
        </div>
        {/* Mobile menu backdrop overlay */}
        <div
          onClick={() => setVisible(false)}
          className={cn(
            'fixed inset-0 z-40 bg-transparent sm:hidden',
            visible ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        />

        {/* sidebar menu for small screen */}
        <div className={cn(
          'fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transform-gpu transition-transform duration-300 ease-in-out sm:hidden flex flex-col text-neutral-700 will-change-transform',
          visible ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        )}>
          <div className='flex h-full flex-col'>
            {/* Header / Back button */}
            <div
              onClick={() => setVisible(false)}
              className='flex cursor-pointer items-center gap-3 border-b border-neutral-200/60 bg-neutral-100/40 p-5 transition-colors hover:bg-neutral-100/80 active:bg-neutral-200/50'
            >
              <ChevronLeft size={18} />
              <p className='font-medium text-neutral-800'>Back</p>
            </div>

            {/* Nav links */}
            <div className='flex flex-col py-4 gap-1 bg-white rounded-2xl'>
              {navLinks.map((link) => (
                <NavLink
                  onClick={() => setVisible(false)}
                  className={({ isActive }) => cn(
                    'mx-4 my-1 flex items-center rounded-xl px-5 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200',
                    isActive
                      ? 'bg-neutral-950 text-white shadow-md'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 hover:shadow-xs'
                  )}
                  to={link.to}
                  key={link.to}
                >
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar
