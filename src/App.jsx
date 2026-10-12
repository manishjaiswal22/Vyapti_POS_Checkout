import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import POSCheckout from './pages/POSCheckout'
import AppLoader from './components/common/AppLoader'
import modernRetailImg from './assets/Modern Blue Retail Checkout Counter.png'
import vyaptiLogo from './assets/vyapti_logo.png'
import markssLogo from './assets/markss-logo.png'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const imagesToPreload = [modernRetailImg, vyaptiLogo, markssLogo]
    let loadedCount = 0

    const finishLoading = () => {
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      }, 500)
    }


    const handleLoaded = () => {
      loadedCount++
      if (loadedCount >= imagesToPreload.length) {
        finishLoading()
      }
    }

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = handleLoaded
      img.onerror = handleLoaded
    })

    const safetyTimer = setTimeout(() => {
      finishLoading()
    }, 2000)

    return () => clearTimeout(safetyTimer)
  }, [])

  return (
    <CartProvider>
      {isLoading && <AppLoader isExiting={isExiting} />}
      <div className="relative min-h-screen lg:h-screen lg:max-h-screen w-full overflow-y-auto lg:overflow-hidden bg-[#F1F5F9] flex flex-col font-sans select-none">
        <Header />

        <div className="relative z-10 flex-1 min-h-0 w-full px-3.5 sm:px-5 md:px-6 lg:px-8 2xl:px-10 pt-2.5 sm:pt-3 flex flex-col lg:overflow-hidden">
          <main className="flex-1 min-h-0 flex flex-col lg:overflow-hidden pb-2 lg:pb-1">
            <POSCheckout />
          </main>

          <Footer />
        </div>
      </div>
    </CartProvider>
  )
}

export default App

