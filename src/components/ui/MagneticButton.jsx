import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', onClick, href, ...props }) {
  const Component = href ? 'a' : motion.button

  return (
    <Component
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all duration-500 cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  )
}
