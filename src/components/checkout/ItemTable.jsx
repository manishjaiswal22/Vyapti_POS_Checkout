import ItemRow from './ItemRow'
import { DeleteIcon } from '../common/Icons'

export default function ItemTable({ items, onUpdateQuantity, onRemove, onClearAll }) {
  const totalItemCount = items.length

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.09),0_4px_6px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_30px_-3px_rgba(15,23,42,0.12)] transition-shadow duration-200 flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Scrollable Table Area */}
      <div className="flex-1 min-h-[220px] lg:min-h-0 overflow-y-auto overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[560px] sm:min-w-[620px]">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-[#1E293B] via-[#1E2D48] to-[#0F172A] shadow-xs">
            <tr className="text-white text-[11px] sm:text-[12px] font-semibold tracking-wide uppercase">
              <th className="py-2.5 px-2.5 sm:px-3 text-center w-14 sm:w-16">SR. NO.</th>
              <th className="py-2.5 px-2.5 sm:px-3 w-24 sm:w-28">ITEM CODE</th>
              <th className="py-2.5 px-2.5 sm:px-3">ITEM DESCRIPTION</th>
              <th className="py-2.5 px-2.5 sm:px-3 text-center w-28 sm:w-32">QUANTITY</th>
              <th className="py-2.5 px-2.5 sm:px-3 text-right w-20 sm:w-24">MRP (₹)</th>
              <th className="py-2.5 px-2.5 sm:px-3 text-right w-20 sm:w-24">TOTAL (₹)</th>
              <th className="py-2.5 px-2.5 sm:px-3 text-center w-14 sm:w-16">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EFF6]">
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-14 text-center text-slate-400 text-[12px]">
                  No items scanned yet. Scan a tag above or enter an item code.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <ItemRow
                  key={item.itemCode}
                  index={index}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Bar with subtle gradient and pill */}
      <div className="border-t border-[#DCE4EE] px-4 py-2.5 flex items-center justify-between bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 shrink-0">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-700">
          <span>Total Items :</span>
          <span className="bg-sky-100/90 text-sky-800 border border-sky-200/80 px-2.5 py-0.5 rounded-md font-extrabold text-[12px] shadow-2xs">
            {totalItemCount}
          </span>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          disabled={items.length === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 font-bold text-[11px] hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
        >
          <DeleteIcon className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  )
}
