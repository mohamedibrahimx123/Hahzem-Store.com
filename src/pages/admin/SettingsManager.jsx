import { motion } from 'framer-motion'

export default function SettingsManager() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold">الإعدادات</h1>
        <p className="text-muted text-sm">إعدادات المتجر</p>
      </div>

      <div
        className="rounded-premium p-8 max-w-2xl"
        style={{
          background: 'rgba(15,17,21,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm text-muted mb-2">اسم المتجر</label>
            <input
              type="text"
              defaultValue="Premium Store"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">رقم واتساب</label>
            <input
              type="text"
              defaultValue="+20 123 456 7890"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              defaultValue="info@premiumstore.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">العملة</label>
            <select
              defaultValue="EGP"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
            >
              <option value="EGP" className="bg-dark">جنيه مصري</option>
              <option value="USD" className="bg-dark">دولار أمريكي</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:glow-blue transition-all"
          >
            حفظ الإعدادات
          </button>
        </form>
      </div>
    </div>
  )
}
