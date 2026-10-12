/**
 * Currency and number formatting utilities for INR (₹)
 */

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num)
}
