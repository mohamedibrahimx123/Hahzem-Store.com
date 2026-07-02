import { motion } from 'framer-motion'
import { services } from '../../data/products'

export default function Services() {
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">خدماتنا</h2>
          <p className="text-muted">كل ما تحتاجه لتجربة موبايل ممتازة</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-premium p-6 text-center transition-all duration-500 "
              style={{
                background: 'rgba(15,17,21,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-sm mb-2">{service.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
