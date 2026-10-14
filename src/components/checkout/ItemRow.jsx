import QuantityStepper from '../common/QuantityStepper'
import { DeleteIcon } from '../common/Icons'

export default function ItemRow({ index, item, onUpdateQuantity, onRemove }) {
  const mrpNum = Number(item.mrp) || 0
  const itemTotal = mrpNum * item.quantity
  const itemKey = item.id || item.itemCode

  return (
    <tr className="border-b border-[#E8EFF6] hover:bg-sky-50/60 even:bg-slate-50/40 transition-colors">
      <td className="py-2.5 px-3 text-center text-[12px] font-semibold text-slate-500">
        {index + 1}
      </td>
      <td className="py-2.5 px-3">
        <span className="font-mono text-[11px] font-bold text-sky-800 bg-sky-50/90 border border-sky-200/80 px-2 py-0.5 rounded-md inline-block">
          {item.itemCode}
        </span>
      </td>
      <td className="py-2.5 px-3 text-[12px] text-slate-800 font-medium">
        <span>{item.description}</span>
        {item.epc && (
          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[280px]" title={item.epc}>
            EPC: {item.epc}
          </div>
        )}
      </td>
      <td className="py-2.5 px-3 text-center">
        {item.size ? (
          <span className="font-semibold text-[11px] text-slate-800 bg-slate-100 border border-slate-200/90 px-2 py-0.5 rounded-md inline-block">
            {item.size}
          </span>
        ) : (
          <span className="text-slate-300 text-[11px]">—</span>
        )}
      </td>
      <td className="py-2.5 px-3 text-center">
        <QuantityStepper
          value={item.quantity}
          onChange={(newQty) => onUpdateQuantity(itemKey, newQty)}
        />
      </td>
      <td className="py-2.5 px-3 text-right text-[12px] text-slate-600 font-medium">
        {mrpNum.toFixed(2)}
      </td>
      <td className="py-2.5 px-3 text-right text-[12px] text-slate-900 font-bold">
        {itemTotal.toFixed(2)}
      </td>
      <td className="py-2.5 px-3 text-center">
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur()
            onRemove(itemKey)
          }}
          className="w-[28px] h-[28px] inline-flex items-center justify-center rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95 transition-all shadow-2xs cursor-pointer"
          title="Delete item"
        >
          <DeleteIcon className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  )
}
