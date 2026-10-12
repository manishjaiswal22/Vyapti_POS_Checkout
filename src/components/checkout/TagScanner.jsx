import { useState } from 'react'
import { ScanTagIcon, BarcodeScannerIcon } from '../common/Icons'

export default function TagScanner({ onScan }) {
  const [tagInput, setTagInput] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (onScan) {
        onScan(tagInput.trim())
      }
      setTagInput('')
    }
  }

  return (
    <div className="bg-gradient-to-r from-white via-white to-sky-50/70 rounded-xl border border-sky-200/90 p-2.5 sm:p-3 shadow-[0_6px_20px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_25px_rgba(15,23,42,0.12)] transition-shadow duration-200 flex items-center gap-2.5 sm:gap-3 shrink-0">
      {/* Vibrant Scan Tag Icon Badge */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-500/25">
        <ScanTagIcon className="w-4 h-4" />
      </div>

      {/* Label with styled badge accent */}
      <span className="text-[12px] sm:text-[13px] font-extrabold tracking-wider text-sky-950 whitespace-nowrap">
        READ TAG :
      </span>

      {/* Input Field with subtle glow */}
      <div className="relative flex-1">
        <input
          type="text"
          value={tagInput}
          autoFocus
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scan item tag here..."
          className="w-full h-[38px] sm:h-[40px] pl-3.5 sm:pl-4 pr-9 sm:pr-10 bg-white border border-sky-300 focus:border-sky-500 rounded-lg text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 outline-none transition-all shadow-2xs focus:ring-3 focus:ring-sky-400/20"
        />
        <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-sky-600 pointer-events-none">
          <BarcodeScannerIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
