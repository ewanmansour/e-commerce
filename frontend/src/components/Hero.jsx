import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Hero = () => {
    const heroRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-hero-item]', {
                y: 28,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className='relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen overflow-hidden bg-neutral-950'>
            <div className='relative min-h-[550px] sm:min-h-[640px] lg:min-h-[700px]'>
                <img className='absolute inset-0 h-full w-full object-cover object-center lg:object-top opacity-80' src={assets.hero3} alt="Latest clothing arrivals" />
                <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent'></div>
                <div className='relative flex min-h-[550px] items-end px-4 pb-16 sm:min-h-[640px] sm:px-[5vw] sm:pb-24 md:px-[7vw] lg:min-h-[700px] lg:px-[9vw]'>
                    <div className='max-w-2xl text-white'>
                        <div data-hero-item className='flex items-center gap-2 mb-3'>
                            <span className='w-8 h-px bg-white/60'></span>
                            <p className='text-xs font-bold uppercase tracking-[0.3em] text-white/80'>{t('hero.kicker')}</p>
                        </div>
                        <h1 data-hero-item className='prata-regular text-5xl leading-tight sm:text-6xl lg:text-7xl font-light tracking-wide text-neutral-50'>{t('hero.title')}</h1>
                        <p data-hero-item className='mt-5 max-w-lg text-sm leading-7 text-neutral-200/90 sm:text-base font-light'>
                            {t('hero.body')}
                        </p>
                        <div data-hero-item className='mt-9 flex flex-wrap gap-4'>
                            <Link to='/collection' className='rounded-full bg-white px-7.5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-neutral-950 transition-all duration-200 hover:bg-neutral-100 hover:shadow-[0_8px_30px_rgb(255,255,255,0.25)] active:scale-97'>{t('hero.shop')}</Link>
                            <Link to='/about' className='rounded-full border border-white/35 px-7.5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xs transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-97'>{t('hero.story')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
