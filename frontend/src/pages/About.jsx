import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='border-t border-neutral-200 pt-10 text-center text-2xl'>
        <Title text1={'ABOUT'} text2={'US'} />
        <h1 className='prata-regular text-4xl text-neutral-950 sm:text-5xl'>Built Around Better Everyday Wear</h1>
      </div>

      <div className='my-12 grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center'>
        <img className='w-full rounded-lg border border-neutral-200 object-cover shadow-sm' src={assets.about_img} alt="About Forever" />
        <div className='flex flex-col justify-center gap-6 leading-7 text-neutral-600'>
          <p>Welcome to Forever, where quality, style, and convenience come together in a focused shopping experience.</p>
          <p>We curate everyday essentials and seasonal pieces with a clear standard: clean design, dependable materials, and value customers can trust.</p>
          <div className='rounded-lg border border-neutral-200 bg-white p-6 shadow-sm'>
            <b className='text-neutral-950'>Our Mission</b>
            <p className='mt-3'>To make online shopping simple, secure, and enjoyable, from discovery to delivery.</p>
          </div>
        </div>
      </div>

      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='mb-16 grid gap-4 text-sm md:grid-cols-3'>
        <div className='rounded-lg border border-neutral-200 bg-white p-7 shadow-sm'>
          <b className='text-neutral-950'>Quality Assurance</b>
          <p className='mt-4 leading-7 text-neutral-500'>Every product is reviewed for comfort, finish, and everyday usefulness.</p>
        </div>
        <div className='rounded-lg border border-neutral-200 bg-white p-7 shadow-sm'>
          <b className='text-neutral-950'>Convenience</b>
          <p className='mt-4 leading-7 text-neutral-500'>A clean storefront, quick cart flow, and reliable order journey.</p>
        </div>
        <div className='rounded-lg border border-neutral-200 bg-white p-7 shadow-sm'>
          <b className='text-neutral-950'>Customer Care</b>
          <p className='mt-4 leading-7 text-neutral-500'>Helpful support that keeps the experience clear after checkout.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
