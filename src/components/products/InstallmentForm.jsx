import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatPrice, generateInstallmentMessage, generateWhatsAppLink, WHATSAPP_NUMBER } from '../../utils/helpers'
import { useTranslation } from '../../context/LanguageContext'

export default function InstallmentForm({ product, variant, onClose }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '', downPayment: '0', months: '12' })

  const downPaymentOptions = [
    { label: t('installment.noDownPayment'), value: '0' },
    { label: '5,000 EGP', value: '5000' },
    { label: '10,000 EGP', value: '10000' },
    { label: '15,000 EGP', value: '15000' },
  ]

  const monthOptions = [6, 12, 18, 24]

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = generateInstallmentMessage(
      form.name,
      form.phone,
      product,
      variant,
      Number(form.downPayment),
      Number(form.months)
    )
    window.open(generateWhatsAppLink(WHATSAPP_NUMBER, message), '_blank')
    onClose()
  }

  const currentPrice = variant ? variant.price : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-muted mb-2">{t('installment.name')}</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">{t('installment.phone')}</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">{t('installment.downPayment')}</label>
        <div className="grid grid-cols-2 gap-2">
          {downPaymentOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, downPayment: opt.value })}
              className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                form.downPayment === opt.value
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white/5 text-muted border border-white/5 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">{t('installment.period')}</label>
        <div className="grid grid-cols-4 gap-2">
          {monthOptions.map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => setForm({ ...form, months: String(months) })}
              className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                form.months === String(months)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white/5 text-muted border border-white/5 hover:text-white'
              }`}
            >
              {months}M
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <p className="text-sm text-muted mb-1">{t('installment.product')}: {product.name}</p>
        {variant && <p className="text-xs text-muted mb-1">{variant.storage} / {variant.ram} / {variant.colorName}</p>}
        <p className="text-lg font-bold mb-4">{formatPrice(currentPrice)}</p>
        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-primary text-white font-medium hover:glow-blue transition-all"
        >
          {t('installment.send')}
        </button>
      </div>
    </form>
  )
}
