import { useState, useRef, useEffect } from 'react'
import { ScanTagIcon, BarcodeScannerIcon } from '../common/Icons'

export default function TagScanner({
  onScan,
  isLoading = false,
  error = null,
  onClearError,
  lastScannedEpc = '',
  inputRef: externalInputRef,
}) {
  const [tagInput, setTagInput] = useState('')
  const localInputRef = useRef(null)
  const inputRef = externalInputRef || localInputRef
  const debounceTimerRef = useRef(null)
  const lastScannedRef = useRef('')
  const lastScanTimeRef = useRef(0)

  // Keep input focused for continuous RFID/barcode scanning
  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const executeScan = (code) => {
    const cleanCode = (code || '').trim()
    if (!cleanCode) return

    const now = Date.now()
    // Ignore identical code fired within 800ms to eliminate duplicate enter/input events
    if (lastScannedRef.current === cleanCode && now - lastScanTimeRef.current < 800) {
      setTagInput('')
      return
    }

    lastScannedRef.current = cleanCode
    lastScanTimeRef.current = now

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    setTagInput('')
    if (onScan) {
      onScan(cleanCode)
    }

    // Re-focus input for next scan
    setTimeout(() => inputRef.current?.focus(), 20)
  }

  const handleInputChange = (e) => {
    const val = e.target.value
    setTagInput(val)

    if (error && onClearError) {
      onClearError()
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const trimmed = val.trim()
    if (!trimmed) return

    // If EPC reaches standard Gen2 RFID length (24 hex characters), fetch immediately!
    if (trimmed.length >= 24) {
      executeScan(trimmed)
      return
    }

    // Auto-fetch on input after a short pause (350ms debounce)
    debounceTimerRef.current = setTimeout(() => {
      executeScan(trimmed)
    }, 350)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeScan(tagInput)
    }
  }

  return (
    <div className="flex flex-col gap-1.5 shrink-0">
      <div className="bg-gradient-to-r from-white via-white to-sky-50/70 rounded-xl border border-sky-200/90 p-2.5 sm:p-3 card-shadow-sm flex items-center gap-2.5 sm:gap-3">
        {/* Vibrant Scan Tag Icon Badge */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-500/25">
          <ScanTagIcon className="w-4 h-4" />
        </div>

        {/* Label with styled badge accent */}
        <span className="text-[12px] sm:text-[13px] font-extrabold tracking-wider text-sky-950 whitespace-nowrap">
          SCAN EPC :
        </span>

        {/* Input Field with subtle glow */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={tagInput}
            autoFocus
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Scan or enter EPC tag..."
            className="w-full h-[38px] sm:h-[40px] pl-3.5 sm:pl-4 pr-10 bg-white border border-sky-300 focus:border-sky-500 rounded-lg text-[12px] sm:text-[13px] text-slate-800 placeholder-slate-400 outline-none transition-all shadow-2xs focus:ring-3 focus:ring-sky-400/20 font-mono"
          />
          <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-sky-600 pointer-events-none flex items-center">
            {isLoading ? (
              <svg className="animate-spin w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <BarcodeScannerIcon className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Last Scanned EPC in bold red */}
      {lastScannedEpc && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50/80 border border-red-200/90 rounded-lg text-[12px] sm:text-[12.5px] shadow-2xs animate-in fade-in duration-150">
          <span className="font-bold text-slate-700">Last Scanned EPC:</span>
          <span className="text-red-600 font-extrabold font-mono tracking-wider break-all">
            {lastScannedEpc}
          </span>
        </div>
      )}

      {/* Error notification banner */}
      {error && (
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11.5px] font-medium shadow-2xs animate-in fade-in duration-150">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
          {onClearError && (
            <button
              type="button"
              onClick={onClearError}
              className="text-rose-400 hover:text-rose-700 text-xs font-bold px-1"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
}
