import { motion } from 'framer-motion'

export default function ReviewsManager() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold">التقييمات</h1>
        <p className="text-muted text-sm">تقييمات العملاء على المنتجات</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-premium p-12 text-center"
        style={{
          background: 'rgba(15,17,21,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="text-5xl mb-4">⭐</div>
        <h3 className="text-lg font-heading font-semibold mb-2">لا توجد تقييمات بعد</h3>
        <p className="text-sm text-muted">ستظهر تقييمات العملاء هنا بعد شرائهم المنتجات</p>
      </motion.div>
    </div>
  )
}
