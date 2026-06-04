import { ShopContext } from '../context/shop-context'
import Title from './Title';
import { formatCurrency } from '../utils/format';
import { useContext } from 'react';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

    return (
        <div className='w-full rounded-lg border border-neutral-200 bg-white p-5 shadow-sm'>
            <div className='text-xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='mt-2 flex flex-col gap-3 text-sm text-neutral-600'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p className='font-medium text-neutral-950'>{formatCurrency(subtotal, currency)}</p>
                </div>
                <hr className='border-neutral-200' />
                <div className='flex justify-between'>
                    <p>Shipping fee</p>
                    <p className='font-medium text-neutral-950'>{formatCurrency(delivery_fee, currency)}</p>
                </div>
                <hr className='border-neutral-200' />
                <div className='flex justify-between'>
                    <b className='text-neutral-950'>Total</b>
                    <b className='text-neutral-950'>{formatCurrency(total, currency)}</b>

                </div>
            </div>

        </div>
    )
}

export default CartTotal
