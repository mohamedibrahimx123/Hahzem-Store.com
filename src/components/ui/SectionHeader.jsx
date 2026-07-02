import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
