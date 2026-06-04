import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductItems from './ProductItems';

const FeaturedCarousel = ({ products = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className='mt-10'>
      <div className='mb-4 flex justify-end gap-2'>
        <button
          type='button'
          onClick={scrollPrev}
          className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950'
          aria-label='Previous products'
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type='button'
          onClick={scrollNext}
          className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950'
          aria-label='Next products'
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-4'>
          {products.map((item) => (
            <div className='min-w-[68%] sm:min-w-[38%] md:min-w-[28%] lg:min-w-[19%]' key={item._id}>
              <ProductItems id={item._id} image={item.image} name={item.name} price={item.price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
