import { useContext } from 'react'
import { ShopContext } from '../context/shop-context'
import { useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const { t } = useTranslation();
    const visible = location.pathname.includes('collection');

    return showSearch && visible ? (
        <div className='-mx-4 border-b border-neutral-200 bg-white px-4 text-center shadow-sm sm:mx-[-5vw] sm:px-[5vw] md:mx-[-7vw] md:px-[7vw] lg:mx-[-9vw] lg:px-[9vw]'>
            <div className='mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-neutral-300 bg-neutral-50 px-5 py-3 sm:w-1/2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 bg-transparent text-sm outline-none' type="text" placeholder={t('search.placeholder')} />
                <Search size={17} className='text-neutral-500' />
            </div>
            <button onClick={() => setShowSearch(!showSearch)} className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 align-middle text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950' aria-label='Close search'>
                <X size={16} />
            </button>

        </div>
    ) : null
}

export default SearchBar
