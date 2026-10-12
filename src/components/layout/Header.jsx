import vyaptiLogo from '../../assets/vyapti_logo.png'
import modernRetailImg from '../../assets/Modern Blue Retail Checkout Counter.png'
import { CartIcon } from '../common/Icons'

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
      <div className="relative z-10 w-full px-3.5 sm:px-5 md:px-6 lg:px-8 2xl:px-10 h-full flex items-center">
        {/* Logo + Cart + Title */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-7">
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={vyaptiLogo}
              alt="TecMI Vyapti"
              className="h-12 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain drop-shadow-2xs"
            />
          </div>

          {/* Vertical Divider */}
          <div className="h-12 sm:h-16 md:h-20 w-px bg-[#C9DCED] hidden sm:block" />

          {/* Page Title & POS Badge */}
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-xl bg-[#DCEEFA] flex items-center justify-center text-[#2F80ED] shrink-0 shadow-xs border border-[#CDE3F5]">
              <CartIcon className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 md:w-7.5 md:h-7.5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[20px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-extrabold text-[#1E293B] leading-tight tracking-tight truncate">
                POS Checkout
              </h1>
              <p className="text-[11px] sm:text-[12px] md:text-[13.5px] text-[#64748B] font-medium leading-none mt-1 truncate">
                Scan item tags to add products to bill
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
