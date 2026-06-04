import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/shop-context'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { cartItemsToLines } from '../utils/cart';
import { formatCurrency } from '../utils/format';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const cartData = useMemo(() => cartItemsToLines(cartItems, products), [cartItems, products]);

  return (
    <div className='border-t border-neutral-200 pt-12'>

      <div className='mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
        <div>
          <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Checkout bag</p>
          <h1 className='prata-regular mt-2 text-4xl text-neutral-950'>Your Cart</h1>
        </div>
        <p className='text-sm text-neutral-500'>{cartData.length} items</p>
      </div>

      <div className='hidden'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm'>
        {
          cartData.map((item) => (
              <div key={`${item._id}-${item.size}`} className='grid grid-cols-[1fr_auto] items-center gap-4 border-b border-neutral-100 p-4 text-neutral-700 last:border-b-0 sm:grid-cols-[1fr_120px_48px] sm:p-5'>
                <div className='flex items-start gap-6'>
                  <img className='h-24 w-20 rounded-lg bg-neutral-100 object-cover sm:h-28 sm:w-24' src={item.image[0]} alt={item.name} />
                  <div>
                    <p className='text-sm font-semibold text-neutral-950 sm:text-base'>{item.name}</p>
                    <div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500'>
                      <p className='font-medium text-neutral-950'>{formatCurrency(item.price, currency)}</p>
                      <p className='rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1'>Size {item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => updateQuantity(item._id, item.size, e.target.value)} className='h-11 w-16 rounded-lg border border-neutral-200 px-3 text-center text-sm outline-none focus:border-neutral-950' type="number" min={1} value={item.quantity} />
                <button onClick={() => updateQuantity(item._id, item.size, 0)} className='flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:border-red-600' aria-label='Remove item'>
                  <img className='w-4' src={assets.bin_icon} alt="" />
                </button>
              </div>
          ))
        }
        {cartData.length === 0 && (
          <p className='py-14 text-center text-sm text-neutral-500'>Your cart is empty.</p>
        )}
      </div>

      <div className='my-12 flex justify-end sm:my-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button disabled={cartData.length === 0} onClick={() => navigate('/place-order')} className='primary-button mt-6 w-full sm:w-auto'>Proceed to Checkout</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart
