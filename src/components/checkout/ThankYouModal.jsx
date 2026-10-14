import { useEffect } from 'react'
import { formatCurrency } from '../../utils/formatters'

export default function ThankYouModal({ isOpen, onClose, orderDetails }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const displayDate = orderDetails?.date || ''

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="thank-you-title"
    >
      <div
        className="relative bg-white rounded-3xl border border-sky-100 shadow-2xl max-w-md w-full p-6 sm:p-8 overflow-hidden text-center transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft background ambient gradient glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Celebratory Vector Illustration */}
        <div className="flex justify-center mb-4">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            {/* SVG Illustration: Retail Shopping Bag, Checkmark, Stars, Confetti */}
            <svg
              className="w-full h-full drop-shadow-md"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circular decorative aura */}
              <circle cx="100" cy="105" r="70" fill="#E0F2FE" />
              <circle cx="100" cy="105" r="54" fill="#BAE6FD" opacity="0.6" />

              {/* Confetti & Sparkles */}
              <circle cx="45" cy="55" r="4" fill="#38BDF8" />
              <circle cx="155" cy="60" r="4.5" fill="#34D399" />
              <circle cx="35" cy="115" r="3" fill="#FBBF24" />
              <circle cx="165" cy="120" r="3.5" fill="#F472B6" />
              <polygon points="100,22 103,32 113,32 105,38 108,48 100,42 92,48 95,38 87,32 97,32" fill="#F59E0B" />
              <polygon points="145,35 147,41 153,41 148,45 150,51 145,47 140,51 142,45 137,41 143,41" fill="#10B981" />
              <polygon points="55,40 57,46 63,46 58,50 60,56 55,52 50,56 52,50 47,46 53,46" fill="#6366F1" />

              {/* Shopping Bag Body */}
              <rect x="62" y="80" width="76" height="82" rx="14" fill="url(#bagGradient)" />

              {/* Bag Handles */}
              <path
                d="M78 85 V62 C78 49.8 87.8 40 100 40 C112.2 40 122 49.8 122 62 V85"
                stroke="#0284C7"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />

              {/* Bag Front Pocket / Fold Detail */}
              <path
                d="M62 98 C74 104 126 104 138 98"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />

              {/* Central Badge on Bag: Success Checkmark */}
              <circle cx="100" cy="122" r="21" fill="#FFFFFF" />
              <circle cx="100" cy="122" r="17" fill="#10B981" />
              <path
                d="M93 122 L98 127 L108 116"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="bagGradient" x1="62" y1="80" x2="138" y2="162" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284C7" />
                  <stop offset="0.5" stopColor="#0369A1" />
                  <stop offset="1" stopColor="#075985" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Thank You Heading */}
        <h2 id="thank-you-title" className="text-[21px] sm:text-[23px] font-black text-slate-900 tracking-tight leading-tight">
          Thank You for Purchasing!
        </h2>
        <p className="text-[13px] text-slate-500 mt-1 max-w-xs mx-auto">
          Your checkout has been completed successfully. We appreciate your visit!
        </p>

        {/* Order Receipt Micro-Card */}
        {orderDetails && (
          <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-50 border border-slate-200/80 shadow-2xs text-left space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200/60">
              <span className="font-medium">Date & Time</span>
              <span className="font-semibold text-slate-700">{displayDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span className="font-medium text-slate-500">Total Items Purchased:</span>
              <span className="font-bold text-slate-900 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-md shadow-2xs">
                {orderDetails.totalItems || 0}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200/70">
              <span className="font-bold text-slate-700 text-xs sm:text-sm">Total Amount Paid:</span>
              <span className="font-extrabold text-emerald-600 text-base sm:text-lg">
                {formatCurrency(orderDetails.grandTotal || 0)}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-[42px] sm:h-[44px] rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#1E40AF] hover:from-[#0369A1] hover:to-[#1E3A8A] active:scale-[0.98] text-white font-bold text-[13px] sm:text-[14px] tracking-wide uppercase shadow-md shadow-sky-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start New Checkout</span>
            <svg className="w-4 h-4 text-sky-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
