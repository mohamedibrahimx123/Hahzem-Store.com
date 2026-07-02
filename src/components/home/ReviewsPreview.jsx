import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from '../ui/Icons'
import { useTranslation } from '../../context/LanguageContext'

export default function ReviewsPreview() {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('reviewsPreview.title')}</h2>
          <p className="text-muted mb-8">{t('reviewsPreview.subtitle')}</p>

          <div className="rounded-premium p-12 text-center max-w-lg mx-auto" style={{
            background: 'rgba(15,17,21,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-heading font-semibold mb-2">شاركنا تجربتك</h3>
            <p className="text-sm text-muted mb-6">
              قم بشراء منتج وشاركنا رأيك. تقييمك يساعد الآخرين على الاختيار الصحيح
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:glow-blue transition-all text-sm"
            >
              تصفح المنتجات
              <HiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
