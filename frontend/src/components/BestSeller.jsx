import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/shop-context'
import Title from './Title';
import ProductItems from './ProductItems';

const Bestseller = () => {

    const { products } = useContext(ShopContext);
    const bestSeller = useMemo(() => (
        products.filter((item) => item.bestseller).slice(0, 5)
    ), [products]);

    return (
        <section className='border-y border-neutral-200 py-16 sm:py-20'>
            <div className='mx-auto max-w-2xl text-center text-3xl'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Customer favourites selected for comfort, quality, and everyday style.
                </p>

            </div>

            <div className='mt-8 grid grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {
                    bestSeller.map((item) => (
                        <ProductItems key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </section>
    )
}

export default Bestseller
