import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { Toaster } from 'sonner'
import AppBoot from './components/AppBoot'
import QuickViewModal from './components/QuickViewModal'


const App = () => {
  return (
    <div className='min-h-screen bg-[#fbfaf7] px-4 text-neutral-950 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <AppBoot />
      <Toaster richColors position='top-center' />
      <Navbar />
      <SearchBar />
      <QuickViewModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collections />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
