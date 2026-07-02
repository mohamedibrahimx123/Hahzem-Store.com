import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../ui/Modal'
import { useTranslation } from '../../context/LanguageContext'

export default function NotifyMe({ product, isOpen, onClose }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('notifyMe.title')}>
      {submitted ? (
        <motion.div
          className="text-center py-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-lg font-heading font-semibold mb-2">{t('notifyMe.success')}</h3>
          <p className="text-sm text-muted">
            {t('notifyMe.successDesc')} {product?.name || t('notifyMe.thisProduct')} {t('notifyMe.descEnd')}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-sm text-muted">
            {t('notifyMe.desc')} <strong className="text-white">{product?.name}</strong> {t('notifyMe.descEnd')}
          </p>
          <div>
            <label className="block text-sm text-muted mb-2">{t('notifyMe.name')}</label>
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
            <label className="block text-sm text-muted mb-2">{t('notifyMe.phone')}</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-primary text-white font-medium hover:glow-blue transition-all"
          >
            {t('notifyMe.submit')}
          </button>
        </form>
      )}
    </Modal>
  )
}
