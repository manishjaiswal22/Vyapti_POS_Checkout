import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import TagScanner from '../components/checkout/TagScanner'
import ItemTable from '../components/checkout/ItemTable'
import BillSummary from '../components/checkout/BillSummary'
import ConfirmModal from '../components/common/ConfirmModal'

export default function POSCheckout() {
  const { items, summary, addItem, updateQuantity, removeItem, clearCart } = useCart()
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    action: null,
  })

  const handleScan = (scannedCode) => {
    const newItem = {
      id: scannedCode,
      itemCode: scannedCode,
      description: `Scanned Item (${scannedCode})`,
      quantity: 1,
      mrp: 499.0,
    }
    addItem(newItem)
  }

  const handleConfirm = () => {
    alert(`Checkout Confirmed!\nTotal items: ${summary.totalItems}\nGrand Total: ₹ ${summary.grandTotal.toFixed(2)}`)
  }

  const promptClearData = () => {
    setModalState({
      isOpen: true,
      title: 'Clear All Scanned Items?',
      message: 'Are you sure you want to remove all products from this bill? All line items will be removed.',
      confirmText: 'Yes, Clear All',
      cancelText: 'Keep Items',
      action: () => clearCart(),
    })
  }

  const promptCancel = () => {
    setModalState({
      isOpen: true,
      title: 'Cancel Checkout Session?',
      message: 'Are you sure you want to cancel the current checkout session? All scanned items will be reset.',
      confirmText: 'Yes, Cancel Checkout',
      cancelText: 'Continue Checkout',
      action: () => clearCart(),
    })
  }

  const handleModalConfirm = () => {
    if (modalState.action) {
      modalState.action()
    }
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 2xl:gap-6 lg:overflow-hidden lg:h-full w-full">
        {/* Left Column: Tag Scanner + Table */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5 2xl:gap-3.5 lg:h-full lg:overflow-hidden">
          <TagScanner onScan={handleScan} />
          <ItemTable
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            onClearAll={promptClearData}
          />
        </div>

        {/* Right Column: Bill Summary Card */}
        <div className="w-full lg:w-[360px] xl:w-[380px] 2xl:w-[420px] shrink-0 lg:h-full lg:overflow-hidden">
          <BillSummary
            summary={summary}
            onConfirm={handleConfirm}
            onCancel={promptCancel}
          />
        </div>
      </div>

      {/* Confirmation Alert Popup Modal */}
      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        onConfirm={handleModalConfirm}
        onCancel={handleModalClose}
        type="danger"
      />
    </>
  )
}
