import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import 'nprogress/nprogress.css'
import 'react-image-gallery/build/image-gallery.css'
import 'yet-another-react-lightbox/styles.css'
import './i18n'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import StripeShell from './components/StripeShell.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ShopContextProvider>
          <StripeShell>
            <App />
          </StripeShell>
        </ShopContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
