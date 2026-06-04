import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className='mt-24 border-t border-neutral-100 bg-neutral-50'>
            <div className='mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr]'>

                {/* Logo + Description */}
                <div>
                    <img src={assets.logof} className='mb-5 w-25 opacity-90' alt="" />
                    <p className='leading-7 text-neutral-400 md:w-2/3'>
                        A modern essentials store focused on clean design, dependable quality, and a smooth shopping experience.
                    </p>
                </div>

                {/* Company */}
                <div>
                    <p className='mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500'>
                        Company
                    </p>
                    <ul className='flex flex-col gap-2 text-neutral-400'>
                        <li className='hover:text-neutral-600 transition-colors cursor-pointer'>Home</li>
                        <li className='hover:text-neutral-600 transition-colors cursor-pointer'>About Us</li>
                        <li className='hover:text-neutral-600 transition-colors cursor-pointer'>Delivery</li>
                        <li className='hover:text-neutral-600 transition-colors cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <p className='mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500'>
                        Get In Touch
                    </p>
                    <ul className='flex flex-col gap-2 text-neutral-400'>
                        <li className='hover:text-neutral-600 transition-colors'>+1-222-333-4445</li>
                        <li className='hover:text-neutral-600 transition-colors'>youremail@gmial.com</li>
                    </ul>
                </div>

            </div>

            {/* Bottom */}
            <div className='border-t border-neutral-100'>
                <p className='py-5 text-center text-xs text-neutral-400'>
                    Copyright 2026 — All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer