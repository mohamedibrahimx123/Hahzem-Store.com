const WISHLIST_KEY = 'premium_wishlist'

export function getWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function toggleWishlist(productId) {
  const list = getWishlist()
  const index = list.indexOf(productId)
  if (index === -1) {
    list.push(productId)
  } else {
    list.splice(index, 1)
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list))
  return list
}

export function isInWishlist(productId) {
  return getWishlist().includes(productId)
}
