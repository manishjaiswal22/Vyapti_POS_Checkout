import { useState, useRef, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import TagScanner from '../components/checkout/TagScanner'
import ItemTable from '../components/checkout/ItemTable'
import BillSummary from '../components/checkout/BillSummary'
import ConfirmModal from '../components/common/ConfirmModal'
import ThankYouModal from '../components/checkout/ThankYouModal'
import { fetchItemByEPC, resetPosData } from '../services/posApi'

export default function POSCheckout() {
  const { items, summary, addItem, updateQuantity, removeItem, clearCart } = useCart()
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState(null)
  const [scannedEpcs, setScannedEpcs] = useState(new Set())
  const [lastScannedEpc, setLastScannedEpc] = useState('')
  const inFlightRef = useRef(new Set())
  const scannerInputRef = useRef(null)

  const [thankYouState, setThankYouState] = useState({
    isOpen: false,
    orderDetails: null,
  })

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    details: null,
    confirmText: '',
    cancelText: '',
    type: 'danger',
    action: null,
  })

  const focusScanner = () => {
    requestAnimationFrame(() => {
      scannerInputRef.current?.focus()
    })
    setTimeout(() => {
      scannerInputRef.current?.focus()
    }, 50)
  }

  // Refocus scanner whenever modal dialogs close
  useEffect(() => {
    if (!modalState.isOpen && !thankYouState.isOpen) {
      focusScanner()
    }
  }, [modalState.isOpen, thankYouState.isOpen])

  // Refocus scanner whenever items count changes (e.g. item deleted, cart cleared)
  useEffect(() => {
    focusScanner()
  }, [items.length])

  const handleClearCart = () => {
    clearCart()
    setScannedEpcs(new Set())
    setLastScannedEpc('')
    inFlightRef.current.clear()
    setScanError(null)
    resetPosData()
    focusScanner()
  }

  const handleRemoveItem = (key) => {
    const itemToRemove = items.find((i) => (i.id || i.itemCode) === key)
    if (itemToRemove) {
      setScannedEpcs((prev) => {
        const next = new Set(prev)
        if (itemToRemove.epcs) {
          itemToRemove.epcs.forEach((e) => next.delete(e))
        }
        if (itemToRemove.epc) {
          next.delete(itemToRemove.epc)
        }
        return next
      })
    }
    removeItem(key)
    focusScanner()
  }

  const handleScan = async (scannedCode) => {
    const epc = (scannedCode || '').trim()
    if (!epc) return

    setLastScannedEpc(epc)

    // Prevent duplicate or in-flight scan of the same RFID EPC tag in the current bill
    if (inFlightRef.current.has(epc) || scannedEpcs.has(epc)) {
      setScanError(`EPC ${epc} has already been scanned in this bill.`)
      return
    }

    inFlightRef.current.add(epc)
    setIsScanning(true)
    setScanError(null)

    try {
      const res = await fetchItemByEPC(epc)

      if (res && res.Code === 1) {
        const rawQty = parseInt(res.QTY, 10) || 1
        const rawMrp = parseFloat(res.MRP) || 0
        const unitMrp = rawQty > 0 ? rawMrp / rawQty : rawMrp
        const itemKey = res.EAN ? `${res.EAN}_${res.SIZE || ''}` : epc

        // Each physical RFID EPC tag scanned is strictly 1 unit
        const newItem = {
          id: itemKey,
          itemCode: res.EAN || epc,
          ean: res.EAN,
          description: res.ARTICLE_DESCRIPTION || `Item (${epc})`,
          size: res.SIZE || '',
          quantity: 1,
          mrp: unitMrp,
          epc: epc,
          epcs: [epc],
        }

        addItem(newItem)
        setScannedEpcs((prev) => new Set(prev).add(epc))
      } else {
        setScanError(res?.Msg || 'Invalid Tag Found')
      }
    } catch (err) {
      setScanError(err.message || 'Unable to connect to POS Server (172.20.204.118).')
    } finally {
      inFlightRef.current.delete(epc)
      setIsScanning(false)
    }
  }

  const handleCheckoutSubmit = () => {
    const completedDetails = {
      totalItems: summary.totalItems,
      grandTotal: summary.grandTotal,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    handleClearCart()
    setThankYouState({
      isOpen: true,
      orderDetails: completedDetails,
    })
  }

  const handleConfirm = () => {
    if (items.length === 0) return

    setModalState({
      isOpen: true,
      type: 'success',
      title: 'Checkout Confirmed!',
      message: '',
      details: {
        totalItems: summary.totalItems,
        grandTotal: summary.grandTotal,
      },
      confirmText: 'Submit',
      cancelText: 'Cancel',
      action: () => handleCheckoutSubmit(),
    })
  }

  const promptClearData = () => {
    setModalState({
      isOpen: true,
      type: 'danger',
      title: 'Clear All Scanned Items?',
      message: 'Are you sure you want to remove all products from this bill? All line items will be removed.',
      details: null,
      confirmText: 'Yes, Clear All',
      cancelText: 'Keep Items',
      action: () => handleClearCart(),
    })
  }

  const promptCancel = () => {
    setModalState({
      isOpen: true,
      type: 'danger',
      title: 'Cancel Checkout Session?',
      message: 'Are you sure you want to cancel the current checkout session? All scanned items will be reset.',
      details: null,
      confirmText: 'Yes, Cancel Checkout',
      cancelText: 'Continue Checkout',
      action: () => handleClearCart(),
    })
  }

  const handleModalConfirm = () => {
    if (modalState.action) {
      modalState.action()
    }
    setModalState((prev) => ({ ...prev, isOpen: false }))
    focusScanner()
  }

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    focusScanner()
  }

  return (
    <>
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 2xl:gap-6 lg:h-full w-full py-1 pb-2">
        {/* Left Column: Tag Scanner + Table */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5 2xl:gap-3.5 lg:h-full">
          <TagScanner
            inputRef={scannerInputRef}
            onScan={handleScan}
            isLoading={isScanning}
            error={scanError}
            onClearError={() => setScanError(null)}
            lastScannedEpc={lastScannedEpc}
          />
          <ItemTable
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemove={handleRemoveItem}
            onClearAll={promptClearData}
          />
        </div>

        {/* Right Column: Bill Summary Card */}
        <div className="w-full lg:w-[360px] xl:w-[380px] 2xl:w-[420px] shrink-0 lg:h-full flex flex-col">

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
        details={modalState.details}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        onConfirm={handleModalConfirm}
        onCancel={handleModalClose}
        type={modalState.type || 'danger'}
      />

      {/* Thank You Celebration Modal */}
      <ThankYouModal
        isOpen={thankYouState.isOpen}
        orderDetails={thankYouState.orderDetails}
        onClose={() => {
          setThankYouState({ isOpen: false, orderDetails: null })
          focusScanner()
        }}
      />
    </>
  )
}
