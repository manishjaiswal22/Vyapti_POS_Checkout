import { formatCurrency } from '../../utils/formatters'
import {
  BillSummaryIcon,
  TotalItemsIcon,
  SubTotalIcon,
  DiscountIcon,
  GstIcon,
  GrandTotalIcon,
} from '../common/Icons'

export default function BillSummary({ summary, onConfirm, onCancel }) {
  const { totalItems, subTotal, discount, tax, grandTotal } = summary

  return (
    <div className="relative bg-gradient-to-b from-white via-[#F8FBFE] to-[#EEF5FC] rounded-2xl border border-[#CBDCEE] p-4 lg:p-5 shadow-lg shadow-slate-200/60 flex flex-col justify-between h-full overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-3.5">
        {/* Header (without 'Live' badge) */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#D8E6F3]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-500/20">
            <BillSummaryIcon className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-[#0F172A] leading-tight">
              Bill Summary
            </h2>
            <span className="text-[11px] text-[#64748B]">Real-time checkout breakdown</span>
          </div>
        </div>

        {/* Rows Container with Color-Accented Micro-Cards */}
        <div className="space-y-2 pt-0.5">
          {/* Total Items (Indigo Theme) */}
          <div className="group flex items-center justify-between p-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-50/95 border border-indigo-100 transition-all shadow-2xs">
            <div className="flex items-center gap-2.5 text-indigo-950">
              <div className="w-7 h-7 rounded-lg bg-indigo-100/90 border border-indigo-200/80 flex items-center justify-center text-indigo-700 shadow-2xs">
                <TotalItemsIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold text-indigo-900">Total Items</span>
            </div>
            <span className="font-extrabold text-indigo-950 text-[14px] bg-white/90 border border-indigo-200/60 px-2.5 py-0.5 rounded-md shadow-2xs">
              {totalItems}
            </span>
          </div>

          {/* Sub Total (Sky Theme) */}
          <div className="group flex items-center justify-between p-2 rounded-xl bg-sky-50/70 hover:bg-sky-50/95 border border-sky-100 transition-all shadow-2xs">
            <div className="flex items-center gap-2.5 text-sky-950">
              <div className="w-7 h-7 rounded-lg bg-sky-100/90 border border-sky-200/80 flex items-center justify-center text-sky-700 shadow-2xs">
                <SubTotalIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold text-sky-900">Sub Total</span>
            </div>
            <span className="font-bold text-sky-950 text-[14px]">
              {formatCurrency(subTotal)}
            </span>
          </div>

          {/* Discount (Emerald Theme) */}
          <div className="group flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-50/95 border border-emerald-100 transition-all shadow-2xs">
            <div className="flex items-center gap-2.5 text-emerald-950">
              <div className="w-7 h-7 rounded-lg bg-emerald-100/90 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-2xs">
                <DiscountIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold text-emerald-900">Discount</span>
            </div>
            <span className="font-bold text-emerald-600 text-[14px]">
              {formatCurrency(discount)}
            </span>
          </div>

          {/* Tax (GST) (Amber Theme) */}
          <div className="group flex items-center justify-between p-2 rounded-xl bg-amber-50/70 hover:bg-amber-50/95 border border-amber-100 transition-all shadow-2xs">
            <div className="flex items-center gap-2.5 text-amber-950">
              <div className="w-7 h-7 rounded-lg bg-amber-100/90 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-2xs">
                <GstIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold text-amber-900">Tax (GST)</span>
            </div>
            <span className="font-bold text-amber-800 text-[14px]">
              {formatCurrency(tax)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-3 pt-3">
        {/* Vibrant Grand Total Card */}
        <div className="relative rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#1E40AF] p-3.5 flex items-center justify-between shadow-lg shadow-sky-600/25 border border-white/20 text-white overflow-hidden">
          {/* Subtle light beam overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner shrink-0">
              <GrandTotalIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-sky-200 font-bold uppercase tracking-wider">
                Grand Total
              </div>
              <div className="text-[22px] font-extrabold text-white tracking-tight leading-tight drop-shadow-xs">
                {formatCurrency(grandTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* CONFIRM BUTTON */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={totalItems === 0}
            className="group relative h-[44px] rounded-xl bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] hover:from-[#166534] hover:to-[#16A34A] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 ring-1 ring-white/25 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/25 pointer-events-none" />
            <div className="w-5 h-5 rounded-full bg-white/25 backdrop-blur-xs ring-1 ring-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="drop-shadow-xs">CONFIRM</span>
          </button>

          {/* CANCEL BUTTON */}
          <button
            type="button"
            onClick={onCancel}
            className="group relative h-[44px] rounded-xl bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#F87171] hover:from-[#B91C1C] hover:to-[#DC2626] active:scale-[0.98] text-white font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-rose-500/30 ring-1 ring-white/25 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/25 pointer-events-none" />
            <div className="w-5 h-5 rounded-full bg-white/25 backdrop-blur-xs ring-1 ring-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="drop-shadow-xs">CANCEL</span>
          </button>
        </div>
      </div>
    </div>
  )
}
