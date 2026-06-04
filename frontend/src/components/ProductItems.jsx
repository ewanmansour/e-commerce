import { useContext } from 'react'
import { ShopContext } from '../context/shop-context'
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';
import { motion as Motion } from 'framer-motion';
import { useQuickViewStore } from '../store/useQuickViewStore';
import { useInterfaceStore } from '../store/interfaceStore';

const ProductItems = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const openQuickView = useQuickViewStore((state) => state.openQuickView);
    const language = useInterfaceStore((state) => state.language);
    const primaryImage = Array.isArray(image) ? image[0] : image;

    const quickViewText = language === 'ar' ? 'عرض سريع' : 'QUICK VIEW';

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openQuickView(id);
    };

    return (
        <Link className='group block cursor-pointer text-neutral-800' to={`/product/${id}`}>
            <Motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                <div className='relative aspect-3/4 overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-xs transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-neutral-300 group-hover:shadow-md'>
                    <img className='h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-106' src={primaryImage} alt={name} />

                    {/* Hover Quick View slide-up bar overlay */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-end opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <button
                            onClick={handleQuickView}
                            type="button"
                            className="w-full bg-neutral-950/90 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xs transition hover:bg-emerald-800 cursor-pointer"
                        >
                            {quickViewText}
                        </button>
                    </div>
                </div>
                <div className='pt-3 px-1.5'>
                    <p className='line-clamp-2 min-h-10 text-xs sm:text-sm font-medium leading-5 text-neutral-700 transition-colors duration-200 group-hover:text-neutral-950'>{name}</p>
                    <div className='mt-1.5 flex items-center justify-between gap-3'>
                        <p className='text-xs sm:text-sm font-bold text-neutral-900'>{formatCurrency(price, currency)}</p>
                        <span className='h-1.5 w-1.5 rounded-full bg-emerald-700 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110'></span>
                    </div>
                </div>
            </Motion.div>
        </Link>
    )
}

export default ProductItems
