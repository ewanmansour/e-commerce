import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/shop-context'
import Title from './Title';
import FeaturedCarousel from './FeaturedCarousel';

const LastestCollection = () => {

    const { products, productsLoading } = useContext(ShopContext);
    const latestProducts = useMemo(() => products.slice(0, 10), [products]);

    return (
        <section className='py-16 sm:py-20'>
            <div className='mx-auto max-w-2xl text-center text-3xl'>
                <Title
                    text1={'LATEST'}
                    text2={'COLLECTIONS'}
                />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Fresh arrivals curated for easy outfits, clean silhouettes, and reliable everyday wear.
                </p>
            </div>
            {productsLoading && latestProducts.length === 0
                ? <p className='mt-10 rounded-lg border border-neutral-200 bg-white py-10 text-center text-sm text-neutral-500'>Loading latest products...</p>
                : <FeaturedCarousel products={latestProducts} />}

        </section>
    )
}

export default LastestCollection
