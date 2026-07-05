import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from '../../components/ui/Icons'
import { products as initialProducts, brands } from '../../data/products'
import { formatPrice, getColorName } from '../../utils/helpers'
import { loadProducts, persistProducts } from '../../utils/productStorage'
import { setStock } from '../../utils/stock'
import { useImageUpload } from '../../hooks/useImageUpload'

const emptyVariant = {
  id: '',
  storage: '',
  ram: '',
  color: '#1A1A1A',
  colorName: 'أسود',
  price: 0,
  originalPrice: 0,
  stock: 0,
  condition: 'new',
  image: '',
}

const emptyProduct = {
  id: Date.now(),
  name: '',
  brand: 'apple',
  category: 'phone',
  images: [''],
  specs: { ram: '', storage: '', display: '', battery: '', processor: '', camera: '', os: '', network: 'لا يوجد' },
  variants: [],
  available: true,
  rating: 0,
  reviews: 0,
}

let variantCounter = 0
function nextVariantId() {
  variantCounter += 1
  return `v${variantCounter}`
}

const colorPresets = ['#1A1A1A', '#F5F5F5', '#C0A060', '#2E4A62', '#8B4513', '#0066FF', '#FF6900', '#FFD100', '#1B6B49', '#C8102E']

export default function ProductsManager() {
  const [productList, setProductList] = useState(() => loadProducts(initialProducts))

  const saveWithPersist = (updated) => {
    setProductList(updated)
    persistProducts(updated)
  }
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ ...emptyProduct, id: Date.now() })

  const openAdd = () => {
    setForm({ ...emptyProduct, id: Date.now() })
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (product) => {
    const variants = product.variants.map((v) => ({ ...v }))
    setForm({ ...product, variants })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      saveWithPersist(productList.filter((p) => p.id !== id))
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.name || form.variants.length === 0) return
    const productId = editingId || Date.now()
    let updated
    if (editingId) {
      updated = productList.map((p) => (p.id === editingId ? { ...form, id: editingId, category: form.category || 'phone' } : p))
    } else {
      updated = [...productList, { ...form, id: productId, category: form.category || 'phone' }]
    }
    form.variants.forEach((v) => {
      setStock(`${productId}-${v.id}`, v.stock)
    })
    saveWithPersist(updated)
    setEditingId(null)
    setForm({ ...emptyProduct, id: Date.now() })
    setShowForm(false)
  }

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { ...emptyVariant, id: nextVariantId() }],
    })
  }

  const removeVariant = (index) => {
    setForm({
      ...form,
      variants: form.variants.filter((_, i) => i !== index),
    })
  }

  const updateVariant = (index, field, value) => {
    const newVariants = [...form.variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setForm({ ...form, variants: newVariants })
  }

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ''] })
  }

  const { toBase64, uploading } = useImageUpload()

  const updateImage = (index, value) => {
    const newImages = [...form.images]
    newImages[index] = value
    setForm({ ...form, images: newImages })
  }

  const handleImageFile = async (index, file) => {
    try {
      const dataUrl = await toBase64(file)
      updateImage(index, dataUrl)
    } catch (e) {
      alert(e)
    }
  }

  const removeImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) })
  }

  const totalStock = form.variants.reduce((sum, v) => sum + v.stock, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">المنتجات</h1>
          <p className="text-muted text-sm">إدارة المنتجات في المتجر</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-sm hover:glow-blue transition-all"
        >
          <HiPlus size={18} />
          إضافة منتج
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-premium p-6 mb-8"
          style={{
            background: 'rgba(15,17,21,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 className="font-heading font-semibold mb-6">{editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted mb-2">اسم المنتج</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">الماركة</label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setForm({ ...form, brand: b.id })}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        form.brand === b.id
                          ? 'text-white border'
                          : 'text-muted border border-white/10 hover:text-white hover:border-white/20'
                      }`}
                      style={{
                        backgroundColor: form.brand === b.id ? b.color + '20' : 'rgba(255,255,255,0.05)',
                        borderColor: form.brand === b.id ? b.color + '60' : undefined,
                        color: form.brand === b.id ? b.color : undefined,
                      }}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">التصنيف</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                >
                  <option value="phone" className="bg-dark">جوال</option>
                  <option value="headphones" className="bg-dark">سماعات</option>
                  <option value="watch" className="bg-dark">ساعة</option>
                  <option value="accessory" className="bg-dark">إكسسوار</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">المعالج</label>
                <input
                  type="text"
                  value={form.specs.processor}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, processor: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">البطارية</label>
                <input
                  type="text"
                  value={form.specs.battery}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, battery: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">الشاشة</label>
                <input
                  type="text"
                  value={form.specs.display}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, display: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">الكاميرا</label>
                <input
                  type="text"
                  value={form.specs.camera}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, camera: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">نظام التشغيل</label>
                <input
                  type="text"
                  value={form.specs.os}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, os: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">الشبكة</label>
                <select
                  value={form.specs.network}
                  onChange={(e) => setForm({ ...form, specs: { ...form.specs, network: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-sm"
                >
                  <option value="لا يوجد" className="bg-dark">لا يوجد</option>
                  <option value="5G" className="bg-dark">5G</option>
                  <option value="4G" className="bg-dark">4G</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">الصور</label>
              {form.images.map((img, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-primary/50 transition-colors">
                    {img && img.startsWith('data:') ? (
                      <img src={img} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <HiPlus size={16} className="text-muted" />
                      </div>
                    )}
                    <span className="text-sm text-muted truncate">
                      {img && img.startsWith('data:') ? 'تغيير الصورة' : 'اختيار صورة'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageFile(i, file)
                      }}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('أو أدخل رابط الصورة:')
                      if (url) updateImage(i, url)
                    }}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10"
                    title="رابط URL"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20"
                  >
                    <HiOutlineTrash size={15} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="text-sm text-primary hover:underline"
              >
                + إضافة صورة
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm text-muted">المتغيرات (التخزين / الرام / اللون / السعر)</label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <HiPlus size={14} /> إضافة متغير
                </button>
              </div>
              <div className="space-y-3">
                {form.variants.map((v, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">التخزين</label>
                        <select
                          value={v.storage}
                          onChange={(e) => updateVariant(i, 'storage', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                        >
                          <option value="" className="bg-dark">اختر</option>
                          <option value="128GB" className="bg-dark">128GB</option>
                          <option value="256GB" className="bg-dark">256GB</option>
                          <option value="512GB" className="bg-dark">512GB</option>
                          <option value="1TB" className="bg-dark">1TB</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">الرام</label>
                        <select
                          value={v.ram}
                          onChange={(e) => updateVariant(i, 'ram', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                        >
                          <option value="" className="bg-dark">اختر</option>
                          <option value="6GB" className="bg-dark">6GB</option>
                          <option value="8GB" className="bg-dark">8GB</option>
                          <option value="12GB" className="bg-dark">12GB</option>
                          <option value="16GB" className="bg-dark">16GB</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">الحالة</label>
                        <select
                          value={v.condition}
                          onChange={(e) => updateVariant(i, 'condition', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                        >
                          <option value="new" className="bg-dark">جديد</option>
                          <option value="like-new" className="bg-dark">مستعمل بحالة الزيرو</option>
                          <option value="used" className="bg-dark">مستعمل</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">اللون</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={v.color}
                            onChange={(e) => updateVariant(i, 'color', e.target.value)}
                            className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
                          />
                          <input
                            type="text"
                            value={v.color}
                            onChange={(e) => updateVariant(i, 'color', e.target.value)}
                            placeholder="#1A1A1A"
                            className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                          />
                          <input
                            type="text"
                            value={v.colorName}
                            onChange={(e) => updateVariant(i, 'colorName', e.target.value)}
                            placeholder="اسم اللون"
                            className="w-28 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {colorPresets.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                updateVariant(i, 'color', c)
                                updateVariant(i, 'colorName', getColorName(c))
                              }}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] transition-all ${
                                v.color === c
                                  ? 'ring-1 ring-white/30 bg-white/10 text-white'
                                  : 'text-muted hover:text-white'
                              }`}
                              style={{ backgroundColor: c + '30' }}
                            >
                              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c }} />
                              {getColorName(c)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 items-end">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-muted mb-1.5">السعر</label>
                          <input
                            type="number"
                            value={v.price}
                            onChange={(e) => updateVariant(i, 'price', Number(e.target.value))}
                            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-muted mb-1.5">السعر الأصلي</label>
                          <input
                            type="number"
                            value={v.originalPrice}
                            onChange={(e) => updateVariant(i, 'originalPrice', Number(e.target.value))}
                            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">الكمية</label>
                        <input
                          type="number"
                          min="0"
                          value={v.stock}
                          onChange={(e) => updateVariant(i, 'stock', Math.max(0, Number(e.target.value)))}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">صورة اللون</label>
                        <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-primary/50 transition-colors text-xs text-muted">
                          {v.image && v.image.startsWith('data:') ? (
                            <img src={v.image} alt="" className="w-7 h-7 rounded object-cover shrink-0" />
                          ) : (
                            <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center shrink-0">
                              <HiPlus size={12} />
                            </div>
                          )}
                          <span className="truncate">{v.image && v.image.startsWith('data:') ? 'تغيير' : 'إضافة صورة'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                try {
                                  const dataUrl = await toBase64(file)
                                  updateVariant(i, 'image', dataUrl)
                                } catch (e) {
                                  alert(e)
                                }
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1.5">رابط صورة</label>
                        <input
                          type="text"
                          value={v.image && !v.image.startsWith('data:') ? v.image : ''}
                          onChange={(e) => updateVariant(i, 'image', e.target.value)}
                          placeholder="URL"
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-all"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted">
                إجمالي المخزون: <span className="text-white font-medium">{totalStock}</span>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="rounded"
              />
              متوفر
            </label>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-primary text-white hover:glow-blue transition-all"
              >
                {editingId ? 'حفظ التغييرات' : 'إضافة المنتج'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-muted hover:text-white transition-all"
              >
                إلغاء
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div
        className="rounded-premium overflow-hidden"
        style={{
          background: 'rgba(15,17,21,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right p-4 text-sm text-muted font-medium">المنتج</th>
                <th className="text-right p-4 text-sm text-muted font-medium">الماركة</th>
                <th className="text-right p-4 text-sm text-muted font-medium">أقل سعر</th>
                <th className="text-right p-4 text-sm text-muted font-medium">المتغيرات</th>
                <th className="text-right p-4 text-sm text-muted font-medium">إجمالي المخزون</th>
                <th className="text-left p-4 text-sm text-muted font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, i) => {
                const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
                const minPrice = Math.min(...product.variants.map((v) => v.price))
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted">{product.brand}</td>
                    <td className="p-4 text-sm">{formatPrice(minPrice)}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {product.variants.map((v) => (
                          <span
                            key={v.id}
                            className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                            title={`${v.storage} / ${v.ram} / ${v.colorName} - ${formatPrice(v.price)}`}
                          >
                            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: v.color }} />
                            {v.storage} / {v.ram}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        totalStock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {totalStock > 0 ? totalStock : 'غير متوفر'}
                      </span>
                    </td>
                    <td className="p-4 text-left whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <HiOutlinePencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <HiOutlineTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
