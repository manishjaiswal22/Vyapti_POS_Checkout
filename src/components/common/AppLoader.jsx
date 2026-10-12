export default function AppLoader({ isExiting }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F1F5F9] transition-opacity duration-300 select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Brand-colored circular spinner */}
        <div className="w-10 h-10 rounded-full border-[3px] border-[#E2E8F0] border-t-[#2F80ED] animate-spin" />

        {/* Clean text */}
        <p className="mt-3.5 text-[14px] font-semibold text-[#334155] tracking-[0.025em] font-sans">
          Loading POS Terminal...
        </p>
      </div>
    </div>
  )
}
