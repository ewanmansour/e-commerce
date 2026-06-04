import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/shop-context'
import Title from './Title';
import ProductItems from './ProductItems';

const RelatedProducts = ({ category, subCategory, currentProductId }) => {

    const { products } = useContext(ShopContext);

    const related = useMemo(() => (
        products
            .filter((item) => item._id !== currentProductId)
            .filter((item) => category === item.category && subCategory === item.subCategory)
            .slice(0, 5)
    ), [category, currentProductId, products, subCategory]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}

            </div>

        </div>
    )
}

export default RelatedProducts
