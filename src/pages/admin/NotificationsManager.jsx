import { motion } from 'framer-motion'

export default function NotificationsManager() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold">الإشعارات</h1>
        <p className="text-muted text-sm">طلبات الإشعارات من العملاء</p>
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
        <div className="text-5xl mb-4">🔔</div>
        <h3 className="text-lg font-heading font-semibold mb-2">لا توجد إشعارات</h3>
        <p className="text-sm text-muted">سيتم عرض طلبات العملاء هنا</p>
      </motion.div>
    </div>
  )
}
