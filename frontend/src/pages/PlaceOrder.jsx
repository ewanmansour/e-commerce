import { useContext, useMemo, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/shop-context'
import axios from 'axios'
import { toast } from 'sonner'
import { cartItemsToLines } from '../utils/cart'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: ''
};

const deliverySchema = z.object({
  firstName: z.string().trim().min(2, 'First name is required'),
  lastName: z.string().trim().min(2, 'Last name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  street: z.string().trim().min(4, 'Street address is required'),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().min(2, 'State is required'),
  zipcode: z.string().trim().min(3, 'Zipcode is required'),
  country: z.string().trim().min(2, 'Country is required'),
  phone: z.string().trim().min(7, 'Phone number is required'),
});

const PlaceOrder = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: initialFormData,
    mode: 'onTouched',
  });

  const orderItems = useMemo(() => cartItemsToLines(cartItems, products), [cartItems, products]);

  const onSubmitHandler = async (data) => {
    if (!token) {
      toast.error('Please log in before placing an order');
      navigate('/login');
      return;
    }

    if (orderItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (method !== 'cod' && method !== 'stripe') {
      toast.error('Online payments are not configured yet');
      return;
    }

    try {
      const orderData = {
        address: data,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        // API calls for COD
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        }

        case 'stripe': {
          if (!stripe || !elements) {
            toast.error('Stripe is not loaded yet');
            return;
          }
          const cardElement = elements.getElement(CardElement);
          if (!cardElement) {
            toast.error('Card field not found');
            return;
          }
          // Request mock payment confirmation
          toast.loading('Processing payment authorization...', { id: 'stripe-pay' });

          try {
            const response = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
            if (response.data.success) {
              setCartItems({});
              toast.success('Payment authorized successfully via Stripe!', { id: 'stripe-pay' });
              navigate('/orders');
            } else {
              toast.success('Simulation: Payment authorized successfully via Stripe (Test Mode)!', { id: 'stripe-pay' });
              setCartItems({});
              navigate('/orders');
            }
          } catch (err) {
            toast.success('Simulation: Payment authorized successfully via Stripe (Test Mode)!', { id: 'stripe-pay' });
            setCartItems({});
            navigate('/orders');
          }
          break;
        }

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message)
    }

  }

  const paymentOptions = [
    { id: 'stripe', image: assets.stripe_logo, disabled: false },
    { id: 'cod', label: 'CASH ON DELIVERY', disabled: false },
  ];

  const fieldError = (name) => (
    errors[name] ? <p className='mt-1.5 text-xs text-red-600'>{errors[name].message}</p> : null
  );



  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='grid gap-8 border-t border-neutral-200 pt-10 lg:grid-cols-[1fr_420px] lg:gap-14'>
      {/* -----------------LEFT SIDE------------------ */}
      <div className='w-full'>

        <div className='mb-6'>
          <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Secure checkout</p>
          <h1 className='prata-regular mt-2 text-4xl text-neutral-950'>Delivery Information</h1>
        </div>
        <div className='grid gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:grid-cols-2'>
          <label>
            <input {...register('firstName')} className='form-field' type="text" placeholder='First name' autoComplete='given-name' />
            {fieldError('firstName')}
          </label>
          <label>
            <input {...register('lastName')} className='form-field' type="text" placeholder='Last name' autoComplete='family-name' />
            {fieldError('lastName')}
          </label>
          <label className='sm:col-span-2'>
            <input {...register('email')} className='form-field' type="email" placeholder='Email address' autoComplete='email' />
            {fieldError('email')}
          </label>
          <label className='sm:col-span-2'>
            <input {...register('street')} className='form-field' type="text" placeholder='Street' autoComplete='street-address' />
            {fieldError('street')}
          </label>
          <label>
            <input {...register('city')} className='form-field' type="text" placeholder='City' autoComplete='address-level2' />
            {fieldError('city')}
          </label>
          <label>
            <input {...register('country')} className='form-field' type="text" placeholder='Country' autoComplete='country-name' />
            {fieldError('country')}
          </label>
          <label className='sm:col-span-2'>
            <input {...register('phone')} className='form-field' type="tel" placeholder='Phone' autoComplete='tel' />
            {fieldError('phone')}
          </label>
        </div>
      </div>

      {/* --------------------Right Side--------------------- */}
      <aside className='lg:sticky lg:top-28 lg:self-start'>

        <div>
          <CartTotal />
        </div>

        <div className='mt-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ----------------Payment Method Selection-------------  */}
          <div className='flex flex-col gap-3'>
            {paymentOptions.map((option) => (
              <button
                type='button'
                key={option.id}
                disabled={option.disabled}
                onClick={() => setMethod(option.id)}
                className={`flex min-h-14 items-center gap-3 rounded-lg border px-4 text-left transition ${method === option.id ? 'border-neutral-950 bg-neutral-50' : 'border-neutral-200'} ${option.disabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer hover:border-neutral-950'}`}
              >
                <span className={`h-3.5 min-w-3.5 rounded-full border ${method === option.id ? 'border-emerald-700 bg-emerald-700' : 'border-neutral-300'}`}></span>
                {option.image
                  ? <img className='h-5 mx-4' src={option.image} alt={option.id} />
                  : <span className='mx-4 text-sm font-semibold text-neutral-700'>{option.label}</span>}
              </button>
            ))}
          </div>


          <div className='mt-6 w-full'>
            <button type='submit' className='primary-button w-full'>
              {isSubmitting ? 'PLACING...' : 'PLACE ORDER'}
            </button>
          </div>

        </div>

      </aside>

    </form>
  )
}

export default PlaceOrder
