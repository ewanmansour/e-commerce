import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Eye } from 'lucide-react';
import { ShopContext } from '../context/shop-context';
import { useQuickViewStore } from '../store/useQuickViewStore';
import { formatCurrency } from '../utils/format';
import { toast } from 'sonner';

const QuickViewModal = () => {
  const { isOpen, productId, closeQuickView } = useQuickViewStore();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');

  // Find product details
  const product = products.find((p) => p._id === productId);

  // Reset size selection when product changes
  useEffect(() => {
    setSelectedSize('');
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    addToCart(product._id, selectedSize);
    toast.success(`${product.name} (Size: ${selectedSize}) added to cart!`);
    closeQuickView();
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-900 hover:text-neutral-900"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Left: Product Image */}
          <div className="relative aspect-square w-full bg-neutral-50 md:w-1/2">
            <img
              src={product.image?.[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {product.category} / {product.subCategory}
              </span>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-neutral-900">
                {product.name}
              </h2>
              <p className="mt-3 text-2xl font-semibold text-neutral-950">
                {formatCurrency(product.price, currency)}
              </p>
              <p className="mt-4 text-sm leading-6 text-neutral-500 line-clamp-3">
                {product.description}
              </p>

              {/* Sizes Selection */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Select Size
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-10 min-w-11 rounded-lg border text-xs font-semibold transition ${
                        size === selectedSize
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-800"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
