import { toast } from 'sonner'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        toast.success('Thanks for subscribing.');
        event.currentTarget.reset();
    }

    return (
        <section className='rounded-2xl border border-neutral-800/80 bg-linear-to-b from-neutral-900 to-neutral-950 px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16'>
            <h2 className='prata-regular text-2xl sm:text-3xl font-light tracking-wide text-neutral-50'>Subscribe & Save 20%</h2>
            <p className='mx-auto mt-3 max-w-lg text-xs sm:text-sm leading-6 text-neutral-400 font-light'>Get new arrivals, seasonal edits, and private offers in your inbox.</p>
            <form onSubmit={onSubmitHandler} className='mx-auto mt-8 flex w-full max-w-md flex-col gap-2 rounded-xl bg-neutral-900/60 p-1.5 border border-neutral-800 sm:flex-row backdrop-blur-xs'>
                <input className='min-h-11 flex-1 rounded-lg px-4 text-sm text-white placeholder-neutral-500 bg-transparent outline-none focus:bg-neutral-800/40 transition-all duration-200' type='email' placeholder='Enter your email' required />
                <button className='min-h-11 rounded-lg bg-neutral-50 px-6 text-xs font-bold uppercase tracking-[0.16em] text-neutral-950 transition-all duration-200 hover:bg-white hover:scale-102 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-98 cursor-pointer' type='submit'>Subscribe</button>
            </form>
        </section>
    )
}

export default NewsLetterBox
