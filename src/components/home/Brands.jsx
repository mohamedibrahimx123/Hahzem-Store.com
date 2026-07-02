import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brands } from '../../data/products'
import { useTranslation } from '../../context/LanguageContext'

export default function Brands() {
  const { t } = useTranslation()
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('brands.title')}</h2>
          <p className="text-muted">{t('brands.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand, i) => {
            const IconComponent = brand.logo
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/products?brand=${brand.id}`}
                  className="group flex flex-col items-center gap-4 p-6 rounded-premium transition-all duration-500"
                  style={{
                    background: 'rgba(15,17,21,0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: `${brand.color}15` }}
                  >
                    <IconComponent style={{ color: brand.color }} size={28} />
                  </div>
                  <span className="text-sm font-medium text-muted group-hover:text-white transition-colors">
                    {brand.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
