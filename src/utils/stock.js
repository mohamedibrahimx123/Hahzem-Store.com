const STOCK_KEY = 'mobile_store_stock'

export function getStock(variantKey) {
  try {
    const data = localStorage.getItem(STOCK_KEY)
    const stock = data ? JSON.parse(data) : {}
    return stock[variantKey] ?? null
  } catch {
    return null
  }
}

export function decrementStock(variantKey) {
  const data = localStorage.getItem(STOCK_KEY)
  const stock = data ? JSON.parse(data) : {}
  const current = stock[variantKey] ?? null
  if (current !== null && current > 0) {
    stock[variantKey] = current - 1
    localStorage.setItem(STOCK_KEY, JSON.stringify(stock))
  }
  return stock[variantKey] ?? 0
}

export function setStock(variantKey, quantity) {
  const data = localStorage.getItem(STOCK_KEY)
  const stock = data ? JSON.parse(data) : {}
  stock[variantKey] = Math.max(0, quantity)
  localStorage.setItem(STOCK_KEY, JSON.stringify(stock))
}

export function isOutOfStock(variantKey) {
  const count = getStock(variantKey)
  return count === null || count <= 0
}
