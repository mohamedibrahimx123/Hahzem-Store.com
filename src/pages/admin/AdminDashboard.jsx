import { motion } from 'framer-motion'
import { HiOutlineCube, HiOutlineEye, HiOutlineHeart, BsWhatsapp } from '../../components/ui/Icons'

const stats = [
  { label: 'إجمالي المنتجات', value: '٠', icon: HiOutlineCube, color: 'from-purple-500/20 to-purple-600/10', textColor: 'text-purple-400' },
  { label: 'الزوار شهرياً', value: '٠', icon: HiOutlineEye, color: 'from-blue-500/20 to-blue-600/10', textColor: 'text-blue-400' },
  { label: 'نقرات واتساب', value: '٠', icon: BsWhatsapp, color: 'from-green-500/20 to-green-600/10', textColor: 'text-green-400' },
  { label: 'إضافات للمفضلة', value: '٠', icon: HiOutlineHeart, color: 'from-red-500/20 to-red-600/10', textColor: 'text-red-400' },
]

export default function AdminDashboard() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold mb-1">لوحة التحكم</h1>
        <p className="text-muted text-sm mb-8">مرحباً بعودتك! هذه نظرة عامة على متجرك.</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-premium p-5 relative overflow-hidden"
            style={{
              background: 'rgba(15,17,21,0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} blur-2xl`} />
            <stat.icon className={`text-2xl mb-3 ${stat.textColor}`} />
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-premium p-6"
          style={{
            background: 'rgba(15,17,21,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 className="font-heading font-semibold mb-4">الأكثر مشاهدة</h2>
          <p className="text-sm text-muted text-center py-8">لا توجد بيانات بعد</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-premium p-6"
          style={{
            background: 'rgba(15,17,21,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 className="font-heading font-semibold mb-4">النشاط الأخير</h2>
          <p className="text-sm text-muted text-center py-8">لا توجد أنشطة بعد</p>
        </motion.div>
      </div>
    </div>
  )
}
