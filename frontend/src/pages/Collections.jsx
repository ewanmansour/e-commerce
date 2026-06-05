import { useContext, useMemo, useRef, useState, useEffect } from 'react'
import { ShopContext } from '../context/shop-context'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';
import gsap from 'gsap';

const categories = ['Men', 'Women', 'Kids'];
const subCategories = ['Topwear', 'Bottomwear', 'Winterwear'];

const Collections = () => {

    const { products, search } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    const catogoryRef = useRef(null)

    const toggleValue = (value, setter) => {
        setter((current) => (
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        ));
    };

    useEffect(() => {
        if (showFilter) {
            gsap.from('[data-category-item]', {
                x: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power4.out",
            });
        }
    }, [showFilter]);
    const filteredProducts = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return products
            .filter((item) => category.length === 0 || category.includes(item.category))
            .filter((item) => subCategory.length === 0 || subCategory.includes(item.subCategory))
            .filter((item) => !normalizedSearch || item.name.toLowerCase().includes(normalizedSearch))
            .slice()
            .sort((a, b) => {
                if (sortType === 'low-high') return a.price - b.price;
                if (sortType === 'high-low') return b.price - a.price;
                return 0;
            });
    }, [category, products, search, sortType, subCategory]);


    return (
        <div ref={catogoryRef} className='border-t border-neutral-200 pt-10 sm:pt-12'>
            <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
                <div>
                    <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Shop by style</p>
                    <h1 className='prata-regular mt-2 text-4xl text-neutral-950 sm:text-5xl'>All Collections</h1>
                </div>
                <p className='text-sm text-neutral-500'>{filteredProducts.length} products</p>
            </div>

            <div className='flex flex-col gap-8 sm:flex-row sm:gap-10'>

                {/* -----Filter options ----- */}
                <aside className='min-w-64'>
                    <p
                        onClick={() => setShowFilter(!showFilter)}
                        className="inline-flex cursor-pointer items-center gap-2 border border-gray-500 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-[0.18em] text-neutral-950"
                    >Filters
                        <img src={assets.dropdown_icon} className={`h-4 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
                    </p>

                    {/*----------- Category Filter ---------*/}
                    <div data-category-item className={`mt-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}>
                        <p className='mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500'>Categories</p>
                        <div className='flex flex-col gap-3 text-sm text-neutral-700'>
                            {categories.map((item) => (
                                <label className='flex items-center gap-3' key={item}>
                                    <input className='h-4 w-4 accent-emerald-700' type="checkbox" value={item} onChange={() => toggleValue(item, setCategory)} />{item}
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* ---------SubCategory Filter-------- */}
                    <div data-category-item className={`my-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}>
                        <p className='mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500'>Type</p>
                        <div className='flex flex-col gap-3 text-sm text-neutral-700'>
                            {subCategories.map((item) => (
                                <label className='flex items-center gap-3' key={item}>
                                    <input className='h-4 w-4 accent-emerald-700' type="checkbox" value={item} onChange={() => toggleValue(item, setSubCategory)} />{item}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>
                {/* --------Right Side -------- */}
                <div className='flex-1'>

                    <div className='mb-6 flex items-center justify-between gap-4'>
                        <Title text1={'PRODUCT'} text2={'GRID'} />
                        {/* ------product sort-------*/}
                        <select onChange={(e) => setSortType(e.target.value)} className='min-h-11 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-700 outline-none focus:border-neutral-950' >
                            <option value="relevant" >Sort by : Relevant</option>
                            <option value="low-high">Sort by : Low to High</option>
                            <option value="high-low">Sort by : High to Low</option>
                        </select>
                    </div>

                    {/* -----Map Product----- */}
                    <div className='grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4'>
                        {
                            filteredProducts.map((item) => (
                                <ProductItems key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                            ))
                        }
                    </div>
                    {filteredProducts.length === 0 && (
                        <p className='rounded-lg border border-neutral-200 bg-white py-12 text-center text-sm text-neutral-500'>No products match the selected filters.</p>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Collections
