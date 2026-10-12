import QuantityStepper from '../common/QuantityStepper'
import { DeleteIcon } from '../common/Icons'

export default function ItemRow({ index, item, onUpdateQuantity, onRemove }) {
  const itemTotal = item.mrp * item.quantity

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
        {item.description}
      </td>
      <td className="py-2.5 px-3 text-center">
        <QuantityStepper
          value={item.quantity}
          onChange={(newQty) => onUpdateQuantity(item.itemCode, newQty)}
        />
      </td>
      <td className="py-2.5 px-3 text-right text-[12px] text-slate-600 font-medium">
        {item.mrp.toFixed(2)}
      </td>
      <td className="py-2.5 px-3 text-right text-[12px] text-slate-900 font-bold">
        {itemTotal.toFixed(2)}
      </td>
      <td className="py-2.5 px-3 text-center">
        <button
          type="button"
          onClick={() => onRemove(item.itemCode)}
          className="w-[28px] h-[28px] inline-flex items-center justify-center rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95 transition-all shadow-2xs cursor-pointer"
          title="Delete item"
        >
          <DeleteIcon className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  )
}
