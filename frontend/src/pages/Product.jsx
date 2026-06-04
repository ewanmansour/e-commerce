import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shop-context';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { formatCurrency } from '../utils/format';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'yet-another-react-lightbox';
import { Expand } from 'lucide-react';


const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [size, setSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const productData = useMemo(() => (
    products.find((item) => item._id === productId)
  ), [productId, products]);

  const productImages = useMemo(() => productData?.image || [], [productData]);
  const galleryItems = useMemo(() => (
    productImages.map((item, index) => ({
      original: item,
      thumbnail: item,
      originalAlt: `${productData?.name || 'Product'} view ${index + 1}`,
      thumbnailAlt: `${productData?.name || 'Product'} thumbnail ${index + 1}`,
    }))
  ), [productData?.name, productImages]);
  const lightboxSlides = useMemo(() => (
    productImages.map((item) => ({ src: item }))
  ), [productImages]);

  useEffect(() => {
    setSize('');
    setSelectedImage(0);
    setLightboxOpen(false);
  }, [productData])

  if (!productData) {
    return (
      <div className='border-t pt-16 text-center text-gray-600'>
        <p className='text-lg font-medium'>Product not found</p>
        <p className='mt-2 text-sm'>The item may have been removed or is still loading.</p>
      </div>
    );
  }

  return (
    <div className='border-t border-neutral-200 pt-10 opacity-100 transition-opacity duration-500 ease-in'>
      {/* --------product Data-------- */}
      <div className='grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14'>
        {/* --------product image------- */}
        <div>
          <div className='product-gallery-shell relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm'>
            <ImageGallery
              items={galleryItems}
              additionalClass='forever-image-gallery'
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={productImages.length > 1}
              showBullets={productImages.length > 1}
              thumbnailPosition='left'
              onSlide={setSelectedImage}
              onClick={() => setLightboxOpen(true)}
            />
            <button
              type='button'
              onClick={() => setLightboxOpen(true)}
              className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-950 hover:text-neutral-950'
              aria-label='Open product image'
            >
              <Expand size={17} />
            </button>
          </div>
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={selectedImage}
            slides={lightboxSlides}
          />
        </div>
        {/* --------------product info-------------- */}
        <div className='lg:sticky lg:top-28 lg:self-start'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>{productData.category} / {productData.subCategory}</p>
          <h1 className='mt-3 text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl'>{productData.name}</h1>
          <div className='mt-4 flex items-center gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <img src={assets.star_icon} alt="" className="w-3.5" key={star} />
            ))}
            <p className='pl-2 text-sm text-gray-500'>122 reviews</p>
          </div>
          <div>
            <p className='mt-6 text-3xl font-semibold'>{formatCurrency(productData.price, currency)}</p>
            <p className='mt-5 max-w-xl leading-7 text-neutral-500'>{productData.description}</p>
            <div className='my-8 flex flex-col gap-4'>
              <p className='text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500'>Select Size</p>
              <div className='flex flex-wrap gap-2'>
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`min-h-11 min-w-12 rounded-lg border px-4 text-sm font-semibold transition ${item === size ? 'border-neutral-950 bg-neutral-950 text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950'}`} key={index}>{item}</button>
                ))}
              </div>
            </div>

            <button onClick={() => addToCart(productData._id, size)} className='min-h-12 w-full rounded-lg bg-neutral-950 px-8 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-800 sm:w-auto'>Add to Cart</button>
            <hr className='mt-8 border-neutral-200 sm:w-4/5' />
            <div className='mt-5 flex flex-col gap-2 text-sm text-neutral-500'>
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------display related products----------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />


    </div>

  )
}

export default Product
