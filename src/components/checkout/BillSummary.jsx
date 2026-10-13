import { formatCurrency } from '../../utils/formatters'
import {
  BillSummaryIcon,
  TotalItemsIcon,
  SubTotalIcon,
  GrandTotalIcon,
} from '../common/Icons'

export default function BillSummary({ summary, onConfirm, onCancel }) {
  const { totalItems, subTotal, grandTotal } = summary

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 lg:p-4 xl:p-5 card-shadow flex flex-col justify-between flex-1 min-h-0 overflow-hidden">
      <div className="space-y-2.5 sm:space-y-3 min-h-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 shrink-0">
          <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] flex items-center justify-center text-white shrink-0 shadow-sm shadow-sky-500/20">
            <BillSummaryIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-tight">
              Bill Summary
            </h2>
            <span className="text-[10.5px] sm:text-[11px] text-slate-500">Real-time checkout breakdown</span>
          </div>
        </div>

        {/* Rows Container with Color-Accented Micro-Cards */}
        <div className="space-y-1.5 sm:space-y-2 overflow-y-auto custom-scrollbar pr-0.5">
          {/* Total Items (Indigo Theme) */}
          <div className="group flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-50/95 border border-indigo-100/90 transition-all shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-950">
              <div className="w-6.5 h-6.5 rounded-lg bg-indigo-100/90 border border-indigo-200/80 flex items-center justify-center text-indigo-700 shadow-2xs">
                <TotalItemsIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-indigo-900">Total Items</span>
            </div>
            <span className="font-extrabold text-indigo-950 text-[13px] sm:text-[14px] bg-white/90 border border-indigo-200/60 px-2 py-0.5 rounded-md shadow-2xs">
              {totalItems}
            </span>
          </div>

          {/* Sub Total (Sky Theme) */}
          <div className="group flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl bg-sky-50/70 hover:bg-sky-50/95 border border-sky-100/90 transition-all shadow-2xs">
            <div className="flex items-center gap-2 text-sky-950">
              <div className="w-6.5 h-6.5 rounded-lg bg-sky-100/90 border border-sky-200/80 flex items-center justify-center text-sky-700 shadow-2xs">
                <SubTotalIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-sky-900">Sub Total</span>
            </div>
            <span className="font-bold text-sky-950 text-[13px] sm:text-[14px]">
              {formatCurrency(subTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 shrink-0">
        {/* Vibrant Grand Total Card */}
        <div className="rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#1E40AF] p-2.5 sm:p-3 flex items-center justify-between shadow-md shadow-sky-600/20 border border-sky-400/30 text-white">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
              <GrandTotalIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-sky-200 font-bold uppercase tracking-wider">
                Grand Total
              </div>
              <div className="text-[18px] sm:text-[20px] font-extrabold text-white tracking-tight leading-tight">
                {formatCurrency(grandTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {/* CONFIRM BUTTON */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={totalItems === 0}
            className="group relative h-[38px] sm:h-[40px] rounded-xl bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] hover:from-[#166534] hover:to-[#16A34A] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-[12px] sm:text-[12.5px] tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/25 transition-all duration-150 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-2.5 h-2.5 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>CONFIRM</span>
          </button>

          {/* CANCEL BUTTON */}
          <button
            type="button"
            onClick={onCancel}
            className="group relative h-[38px] sm:h-[40px] rounded-xl bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#F87171] hover:from-[#B91C1C] hover:to-[#DC2626] active:scale-[0.98] text-white font-bold text-[12px] sm:text-[12.5px] tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm shadow-rose-500/25 transition-all duration-150 cursor-pointer"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-2.5 h-2.5 text-white stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span>CANCEL</span>
          </button>
        </div>
      </div>
    </div>
  )
}
