import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import { useTranslation } from '../context/LanguageContext'

export default function Reviews() {
  const { t } = useTranslation()

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader title={t('reviewsPage.title')} subtitle={t('reviewsPage.subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-premium p-12 text-center"
          style={{
            background: 'rgba(15,17,21,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-2xl font-heading font-bold mb-3">لا توجد تقييمات بعد</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            التقييمات تظهر هنا بعد قيام العملاء بشراء المنتجات. قم بشراء منتج وشاركنا رأيك!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:glow-blue transition-all"
          >
            تصفح المنتجات
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
