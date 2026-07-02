const PRODUCTS_KEY = 'mobile_store_products'

export function loadProducts(fallback) {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY)
    if (data) {
      const saved = JSON.parse(data)
      if (Array.isArray(saved) && saved.length > 0) return saved
    }
  } catch {}
  return fallback
}

export function persistProducts(products) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  } catch {}
}

export function updateVariantStock(products, productId, variantId, delta) {
  return products.map((p) => {
    if (p.id !== productId) return p
    return {
      ...p,
      variants: p.variants.map((v) => {
        if (v.id !== variantId) return v
        return { ...v, stock: Math.max(0, (v.stock || 0) + delta) }
      }),
    }
  })
}
