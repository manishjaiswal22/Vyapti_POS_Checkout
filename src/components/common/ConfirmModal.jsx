import { useEffect } from 'react'

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger',
}) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all animate-in fade-in duration-150"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-md w-full p-6 overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative ambient background blur */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-red-100/60 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-4">
          {/* Warning Icon Badge */}
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0 shadow-2xs">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5 flex-1 pt-0.5">
            <h3 id="modal-title" className="text-[17px] font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Top-right close button */}
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 font-semibold text-[13px] transition-colors cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-4.5 py-2.5 rounded-lg text-white font-bold text-[13px] tracking-wide shadow-md transition-all cursor-pointer ${
              type === 'danger'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/25 active:scale-[0.98]'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-500/25 active:scale-[0.98]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
