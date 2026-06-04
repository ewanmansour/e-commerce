import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='border-t border-neutral-200 pt-10 text-center text-2xl'>
        <Title text1={'CONTACT'} text2={'US'} />
        <h1 className='prata-regular text-4xl text-neutral-950 sm:text-5xl'>We Are Here To Help</h1>
      </div>

      <div className='my-12 grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center'>
        <img className='w-full rounded-lg border border-neutral-200 object-cover shadow-sm' src={assets.contact_img} alt="Contact" />
        <div className='rounded-lg border border-neutral-200 bg-white p-7 shadow-sm'>
          <p className='text-xl font-semibold text-neutral-950'>Our Store</p>
          <div className='mt-6 space-y-5 text-sm leading-7 text-neutral-500'>
            <p>MY Studio<br />124 Market Street<br />EGYPT, NY 10001</p>
            <p>Email: support@gmail.com<br />Phone: +1-222-333-4445</p>
            <p>Support hours: Monday to Friday, 9:00 AM - 6:00 PM</p>
          </div>
          <button className='primary-button mt-7'>Contact Support</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
