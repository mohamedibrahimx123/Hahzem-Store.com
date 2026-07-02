export const formatPrice = (price) => {
  return price.toLocaleString('en-EG') + ' EGP'
}

export const getDiscountPercent = (original, current) => {
  return Math.round(((original - current) / original) * 100)
}

export const generateWhatsAppLink = (phone, message) => {
  const text = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${text}`
}

export const generateOrderMessage = (product, variant) => {
  return `السلام عليكم

أرغب في شراء:
المنتج: ${product.name}
المساحة: ${variant.storage}
الرام: ${variant.ram}
اللون: ${variant.colorName}
السعر: ${formatPrice(variant.price)}

يرجى تأكيد الطلب`
}

export const generateInstallmentMessage = (name, phone, product, variant, downPayment, months) => {
  return `السلام عليكم

أرغب في الاستعلام عن التقسيط:
الاسم: ${name}
رقم الهاتف: ${phone}
المنتج: ${product.name}
المساحة: ${variant.storage}
الرام: ${variant.ram}
اللون: ${variant.colorName}
السعر: ${formatPrice(variant.price)}
الدفعة المقدمة: ${downPayment === 0 ? 'بدون دفعة مقدمة' : formatPrice(downPayment)}
عدد الشهور: ${months} شهور`
}

export const WHATSAPP_NUMBER = '201234567890'

export const getStorageOptions = (product) => {
  return [...new Set(product.variants.map((v) => v.storage))]
}

export const getRamOptions = (product) => {
  return [...new Set(product.variants.map((v) => v.ram))]
}

export const getColorName = (hex) => {
  const names = {
    '#1A1A1A': 'أسود',
    '#F5F5F5': 'أبيض',
    '#C0A060': 'ذهبي',
    '#2E4A62': 'أزرق غامق',
    '#8B4513': 'بني',
    '#0066FF': 'أزرق',
    '#FF6900': 'برتقالي',
    '#FFD100': 'أصفر',
    '#1B6B49': 'أخضر',
    '#C8102E': 'أحمر',
  }
  return names[hex] || hex
}

export const getMinPrice = (variants) => {
  if (!variants || variants.length === 0) return 0
  return Math.min(...variants.map((v) => v.price))
}
