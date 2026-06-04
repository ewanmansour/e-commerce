import { useContext, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ShopContext } from '../context/shop-context';
import Title from './Title';
import { formatCurrency } from '../utils/format';

const CollectionInsights = () => {
  const { products, currency } = useContext(ShopContext);

  const data = useMemo(() => {
    const categories = products.reduce((groups, product) => {
      const current = groups[product.category] || { name: product.category, count: 0, total: 0 };
      current.count += 1;
      current.total += Number(product.price || 0);
      groups[product.category] = current;
      return groups;
    }, {});

    return Object.values(categories).map((item) => ({
      name: item.name,
      products: item.count,
      averagePrice: Math.round(item.total / item.count),
    }));
  }, [products]);

  if (data.length === 0) {
    return null;
  }

  return (
    <section className='border-y border-neutral-200 py-14 sm:py-16'>
      <div className='mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
        <div>
          <Title text1='SHOP' text2='SIGNALS' />
          <h2 className='prata-regular text-3xl text-neutral-950 sm:text-4xl'>Collection Mix</h2>
        </div>
        <p className='max-w-sm text-sm leading-6 text-neutral-500'>
          Category depth and average pricing from the live catalog.
        </p>
      </div>

      <div className='h-72 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke='#e5e5e5' strokeDasharray='3 3' vertical={false} />
            <XAxis dataKey='name' tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#525252' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#525252' }} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: '#f5f5f5' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const averagePrice = payload[0].payload.averagePrice;

                return (
                  <div className='rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm shadow-lg'>
                    <p className='font-semibold text-neutral-950'>{label}</p>
                    <p className='mt-1 text-neutral-500'>{payload[0].value} products</p>
                    <p className='text-neutral-500'>Avg {formatCurrency(averagePrice, currency)}</p>
                  </div>
                );
              }}
            />
            <Bar dataKey='products' radius={[8, 8, 0, 0]} fill='#047857' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CollectionInsights;
