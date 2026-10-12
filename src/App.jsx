import { CartProvider } from './context/CartProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import POSCheckout from './pages/POSCheckout'

function App() {
  return (
    <CartProvider>
      <div className="relative min-h-screen lg:h-screen lg:max-h-screen w-full overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-[#EBF2FA] via-[#F2F7FC] to-[#E5EFF8] flex flex-col font-sans select-none">
        {/* Soft ambient background lighting accents */}
        <div className="fixed top-24 left-1/4 w-[500px] h-[260px] bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />
        <div className="fixed bottom-12 right-1/4 w-[500px] h-[260px] bg-indigo-200/20 blur-3xl rounded-full pointer-events-none" />

        {/* Top Unified Header Banner */}
        <Header />

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 min-h-0 w-full px-3.5 sm:px-5 md:px-6 lg:px-8 2xl:px-10 pt-2.5 sm:pt-3 flex flex-col lg:overflow-hidden">
          {/* Page Body */}
          <main className="flex-1 min-h-0 flex flex-col lg:overflow-hidden pb-2 lg:pb-1">
            <POSCheckout />
          </main>

          {/* Footer Branding */}
          <Footer />
        </div>
      </div>
    </CartProvider>
  )
}

export default App
