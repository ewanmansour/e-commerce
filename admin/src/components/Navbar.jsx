import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
    const logout = () => {
        setToken('')
    }

    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-[max(5%,40px)]' src={assets.logof} alt="" />
            <button onClick={logout} className='bg-gray-800 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-black'>Logout</button>
        </div>
    )
}

export default Navbar
