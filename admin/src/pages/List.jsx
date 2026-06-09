import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'
import { formatCurrency } from '../utils/format'

const List = ({ token }) => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchList = async () => {
        try {
            setLoading(true)

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products);

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (id) => {
        try {
            const confirmed = window.confirm('Remove this product?')

            if (!confirmed) return

            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>

                {/* ---------------List table title------------- */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* --------------Product list--------------- */}

                {loading && <p className='py-8 text-sm text-gray-500'>Loading products...</p>}
                {!loading && list.length === 0 && <p className='py-8 text-sm text-gray-500'>No products found.</p>}
                {
                    list.map((item) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={item._id}>
                            <img className='w-12' src={item.image[0]} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{formatCurrency(item.price, currency)}</p>
                            <button disabled type="button" className='text-center cursor-not-allowed text-sm bg-gray-400 text-white rounded-full py-1.5 px-3 mx-auto w-fit'>Remove</button>
                        </div>

                    ))
                }

            </div>

        </>
    )
}

export default List
