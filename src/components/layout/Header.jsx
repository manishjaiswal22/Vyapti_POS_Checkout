import vyaptiLogo from '../../assets/vyapti_logo.png'
import modernRetailImg from '../../assets/Modern Blue Retail Checkout Counter.png'
import { CartIcon, HomeIcon } from '../common/Icons'

export default function Header() {
  return (
    <header
      className="relative w-full min-h-[96px] sm:h-[114px] md:h-[120px] bg-gradient-to-r from-[#F0F5FA] via-[#EAF2F9] to-[#E2EEF8] border-b border-[#D8E4F0] shadow-2xs shrink-0 select-none overflow-hidden"
      style={{
        backgroundImage: `url("${modernRetailImg}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
        backgroundSize: 'auto 100%',
      }}
    >
      {/* Mobile readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent sm:from-transparent sm:via-transparent pointer-events-none z-0" />

      {/* Content Container - Full width aligned with page content */}
      <div className="relative z-10 w-full px-3.5 sm:px-5 md:px-6 lg:px-8 2xl:px-10 h-full flex flex-col justify-between py-2 sm:py-3">
        {/* Top: Logo + Cart + Title */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={vyaptiLogo}
              alt="TecMI Vyapti"
              className="h-7 sm:h-9 md:h-10 w-auto object-contain"
            />
          </div>

          {/* Vertical Divider */}
          <div className="h-6 sm:h-8 w-px bg-[#D0DFEE] hidden sm:block" />

          {/* Page Title & POS Badge */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#DCEEFA] flex items-center justify-center text-[#2F80ED] shrink-0 shadow-2xs border border-[#CDE3F5]">
              <CartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[17px] sm:text-[22px] md:text-[24px] font-bold text-[#1E293B] leading-tight tracking-tight truncate">
                POS Checkout
              </h1>
              <p className="text-[10px] sm:text-[12px] text-[#64748B] leading-none mt-0.5 truncate">
                Scan item tags to add products to bill
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Breadcrumb Navigation inside Header Banner */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-[#64748B] overflow-x-auto" aria-label="Breadcrumb">
          <a href="#" className="text-[#64748B] hover:text-[#1E293B] transition-colors flex items-center shrink-0">
            <HomeIcon className="w-3.5 h-3.5" />
          </a>
          <span className="text-[#94A3B8]">/</span>
          <span className="hover:text-[#1E293B] cursor-pointer transition-colors whitespace-nowrap">Store Operations</span>
          <span className="text-[#94A3B8]">/</span>
          <span className="font-semibold text-[#1E293B] whitespace-nowrap">POS Checkout</span>
        </nav>
      </div>
    </header>
  )
}
