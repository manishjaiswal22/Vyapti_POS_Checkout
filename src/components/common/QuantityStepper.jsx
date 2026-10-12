export default function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center border border-slate-200 hover:border-sky-300 rounded-lg bg-white overflow-hidden h-[26px] shadow-2xs transition-colors">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-6 h-[26px] flex items-center justify-center text-slate-500 hover:text-sky-700 hover:bg-sky-50 active:bg-sky-100 transition-colors cursor-pointer text-[12px]"
        aria-label="Decrease quantity"
      >
        <span className="font-bold text-sm leading-none">−</span>
      </button>

      <span className="w-7 text-center text-[12px] font-bold text-slate-800 select-none bg-slate-50/50">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-6 h-[26px] flex items-center justify-center text-slate-500 hover:text-sky-700 hover:bg-sky-50 active:bg-sky-100 transition-colors cursor-pointer text-[12px]"
        aria-label="Increase quantity"
      >
        <span className="font-bold text-sm leading-none">+</span>
      </button>
    </div>
  )
}
