import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className='mt-12 border-t border-neutral-200/50 bg-[#faf9f6] -mx-4 px-4 transition-all duration-300 sm:mx-[-5vw] sm:px-[5vw] md:mx-[-7vw] md:px-[7vw] lg:mx-[-9vw] lg:px-[9vw]'>
            <div className='mx-auto max-w-7xl grid grid-cols-2 gap-x-4 gap-y-6 py-6 text-xs sm:text-sm lg:grid-cols-4 lg:gap-10 lg:py-16'>

                {/* Column 1: Brand & Socials */}
                <div className='col-span-2 lg:col-span-1 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 sm:gap-5'>
                    <div className='flex flex-col gap-3 sm:gap-5'>
                        <Link to='/' className='inline-block w-fit transition-opacity hover:opacity-90'>
                            <img src={assets.logof} className='w-16 sm:w-24' alt="Forever" />
                        </Link>
                        <p className='hidden lg:block leading-5 sm:leading-6 text-neutral-500 max-w-xs'>
                            {t('footer.description')}
                        </p>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-2.5 shrink-0'>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                           className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-xs active:scale-95'
                           aria-label="Facebook">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                           className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-xs active:scale-95'
                           aria-label="Instagram">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                           className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-xs active:scale-95'
                           aria-label="Twitter">
                            <svg className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                           className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-all duration-200 hover:scale-110 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-xs active:scale-95'
                           aria-label="Youtube">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 2: Company */}
                <div className='col-span-1'>
                    <h3 className='mb-2 sm:mb-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800'>
                        {t('footer.company')}
                    </h3>
                    <ul className='flex flex-col gap-2 sm:gap-3 text-neutral-500'>
                        <li>
                            <Link to='/' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link to='/about' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('nav.about')}
                            </Link>
                        </li>
                        <li>
                            <Link to='/collection' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('nav.collection')}
                            </Link>
                        </li>
                        <li>
                            <Link to='/contact' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('nav.contact')}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Customer Service */}
                <div className='col-span-1'>
                    <h3 className='mb-2 sm:mb-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800'>
                        {t('footer.customerService')}
                    </h3>
                    <ul className='flex flex-col gap-2 sm:gap-3 text-neutral-500'>
                        <li>
                            <a href='#' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('footer.delivery')}
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('footer.privacyPolicy')}
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('footer.returns')}
                            </a>
                        </li>
                        <li>
                            <a href='#' className='hover:text-neutral-950 transition-colors duration-200 inline-block py-0.5'>
                                {t('footer.faqs')}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div className='col-span-2 lg:col-span-1'>
                    <h3 className='mb-2 sm:mb-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800'>
                        {t('footer.getInTouch')}
                    </h3>
                    <ul className='flex flex-col gap-2 sm:gap-4 text-neutral-500'>
                        <li className='flex items-start gap-2 sm:gap-3'>
                            <MapPin size={14} className='text-neutral-400 mt-0.5 shrink-0 sm:size-[17px]' />
                            <span>{t('footer.address')}</span>
                        </li>
                        <li>
                            <a href='tel:+12223334445' className='flex items-center gap-2 sm:gap-3 hover:text-neutral-950 transition-colors duration-200'>
                                <Phone size={14} className='text-neutral-400 shrink-0 sm:size-[17px]' />
                                <span>+1-222-333-4445</span>
                            </a>
                        </li>
                        <li>
                            <a href='mailto:support@forever.com' className='flex items-center gap-2 sm:gap-3 hover:text-neutral-950 transition-colors duration-200'>
                                <Mail size={14} className='text-neutral-400 shrink-0 sm:size-[17px]' />
                                <span>support@forever.com</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Copyright */}
            <div className='border-t border-neutral-200/50 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-neutral-400'>
                <p>
                    {t('footer.rights')}
                </p>
                <div className='flex gap-4 sm:gap-6'>
                    <a href='#' className='hover:text-neutral-950 transition-colors'>{t('footer.privacyPolicy')}</a>
                    <a href='#' className='hover:text-neutral-950 transition-colors'>{t('footer.delivery')}</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer