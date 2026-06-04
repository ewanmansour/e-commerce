import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/shop-context'
import axios from 'axios';
import { toast } from 'sonner';
import { formatCurrency } from '../utils/format';

const Orders = () => {
  const { backendUrl, currency, navigate, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderLines = useMemo(() => (
    orders.flatMap((order) => (
      order.items.map((item) => ({
        ...item,
        orderId: order._id,
        status: order.status,
        date: order.date,
        paymentMethod: order.paymentMethod,
      }))
    ))
  ), [orders]);

  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Sort chronologically
    const sorted = [...orders].sort((a, b) => a.date - b.date);
    const groups = sorted.reduce((acc, order) => {
      const dateStr = new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      acc[dateStr] = (acc[dateStr] || 0) + Number(order.amount || 0);
      return acc;
    }, {});

    return Object.entries(groups).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [orders]);

  const loadOrders = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, navigate, token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className='border-t border-neutral-200 pt-12'>
      <div className='mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
        <div>
          <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Purchase history</p>
          <h1 className='prata-regular mt-2 text-4xl text-neutral-950'>My Orders</h1>
        </div>
        <button onClick={loadOrders} className='min-h-11 rounded-lg border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950'>Refresh</button>
      </div>


      <div className='space-y-4'>
        {loading && <p className='rounded-lg border border-neutral-200 bg-white py-10 text-center text-sm text-neutral-500'>Loading orders...</p>}
        {!loading && orderLines.length === 0 && (
          <p className='rounded-lg border border-neutral-200 bg-white py-10 text-center text-sm text-neutral-500'>You have not placed any orders yet.</p>
        )}
        {
          orderLines.map((item) => (
            <div key={`${item.orderId}-${item._id}-${item.size}`} className='flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 text-neutral-700 shadow-sm md:flex-row md:items-center md:justify-between'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='h-24 w-20 rounded-lg bg-neutral-100 object-cover sm:w-24' src={item.image?.[0]} alt={item.name} />
                <div>
                  <p className='font-semibold text-neutral-950 sm:text-base'>{item.name}</p>
                  <div className='mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500'>
                    <p className='text-base font-semibold text-neutral-950'>{formatCurrency(item.price, currency)}</p>
                    <p>Qty {item.quantity}</p>
                    <p>Size {item.size}</p>
                  </div>
                  <p className='mt-3 text-neutral-500'>Date: <span>{new Date(item.date).toLocaleDateString()}</span></p>
                  <p className='mt-1 text-neutral-500'>Payment: <span>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='flex items-center justify-between gap-4 md:w-1/3'>
                <div className='flex items-center gap-2'>
                  <span className='h-2 min-w-2 rounded-full bg-emerald-600'></span>
                  <p className='text-sm font-medium md:text-base'>{item.status}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
