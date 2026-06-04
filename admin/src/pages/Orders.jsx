import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../config'
import { formatCurrency } from '../utils/format'

const orderStatuses = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for delivery',
    'Delivered'
]

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updatingOrderId, setUpdatingOrderId] = useState('')

    const totalRevenue = useMemo(() => (
        orders.reduce((total, order) => total + Number(order.amount || 0), 0)
    ), [orders])

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })

            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }, [token])

    const updateStatus = async (orderId, status) => {
        try {
            setUpdatingOrderId(orderId)
            const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setOrders((current) => current.map((order) => (
                    order._id === orderId ? response.data.order : order
                )))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setUpdatingOrderId('')
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <div className='space-y-5'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <p className='text-xl font-semibold text-gray-800'>Orders</p>
                    <p className='text-sm text-gray-500'>Review customer orders and update fulfilment status.</p>
                </div>
                <div className='text-sm text-gray-600'>
                    <span className='font-medium'>{orders.length}</span> orders · <span className='font-medium'>{formatCurrency(totalRevenue, currency)}</span> total
                </div>
            </div>

            {loading && <p className='py-8 text-sm text-gray-500'>Loading orders...</p>}
            {!loading && orders.length === 0 && <p className='py-8 text-sm text-gray-500'>No orders found.</p>}

            <div className='flex flex-col gap-4'>
                {orders.map((order) => (
                    <div key={order._id} className='grid gap-4 border bg-white p-4 text-sm md:grid-cols-[1.4fr_1fr_180px]'>
                        <div className='space-y-3'>
                            <div>
                                <p className='font-semibold text-gray-800'>Order #{order._id.slice(-8).toUpperCase()}</p>
                                <p className='text-gray-500'>{new Date(order.date).toLocaleString()}</p>
                            </div>
                            <div className='space-y-1 text-gray-700'>
                                {order.items.map((item) => (
                                    <p key={`${order._id}-${item._id}-${item.size}`}>
                                        {item.name} x {item.quantity} <span className='text-gray-400'>({item.size})</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className='space-y-2 text-gray-600'>
                            <p className='font-medium text-gray-800'>{order.address.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}</p>
                            <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                            <p>{order.address.country}</p>
                            <p>{order.address.phone}</p>
                        </div>

                        <div className='space-y-3'>
                            <div>
                                <p className='text-gray-500'>Amount</p>
                                <p className='text-lg font-semibold text-gray-800'>{formatCurrency(order.amount, currency)}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Payment</p>
                                <p className='font-medium text-gray-800'>{order.paymentMethod}</p>
                            </div>
                            <select
                                value={order.status}
                                disabled={updatingOrderId === order._id}
                                onChange={(event) => updateStatus(order._id, event.target.value)}
                                className='w-full px-3 py-2'
                            >
                                {orderStatuses.map((status) => (
                                    <option value={status} key={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Orders
