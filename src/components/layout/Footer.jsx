import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from '../ui/Icons'
import { WHATSAPP_NUMBER } from '../../utils/helpers'
import { useTranslation } from '../../context/LanguageContext'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div {...fadeInUp}>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">MS</span>
              </div>
              <span className="font-heading font-semibold text-lg">
                Premium<span className="text-primary">Store</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3 mt-6">
              {[FaWhatsapp, FaFacebook, FaInstagram, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? `https://wa.me/${WHATSAPP_NUMBER}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
            <h4 className="font-heading font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/products', label: t('footer.allProducts') },
                { to: '/help-me-choose', label: t('nav.helpMeChoose') },
                { to: '/reviews', label: t('nav.reviews') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}>
            <h4 className="font-heading font-semibold mb-6">{t('footer.categories')}</h4>
            <ul className="space-y-3">
              {['Apple', 'Samsung', 'Xiaomi', 'Honor', 'Oppo', 'Realme'].map((brand) => (
                <li key={brand}>
                  <Link to={`/products?brand=${brand.toLowerCase()}`} className="text-muted hover:text-white transition-colors text-sm">
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}>
            <h4 className="font-heading font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted">
              {/* <li>📍 {t('branchesPreview.locationValue')}</li> */}
              <li>📞 {t('branchesPreview.phoneValue')}</li>
              {/* <li>✉️ {t('branchesPreview.emailValue')}</li> */}
              <li>🕐 {t('branchesPreview.hoursValue')}</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © 2026 Premium Store. {t('footer.rights')}.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
