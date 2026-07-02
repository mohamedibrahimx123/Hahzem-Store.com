import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from './Icons'

export default function ReviewPopup({ isOpen, onClose, productName }) {
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setName('')
      setReview('')
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-8 relative"
            style={{
              background: 'rgba(15,17,21,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all"
            >
              <HiX size={16} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">👍</div>
                <h3 className="text-xl font-heading font-bold mb-2">شكراً لتقييمك!</h3>
                <p className="text-muted text-sm">تقييمك يساعد الآخرين على اتخاذ القرار الصحيح</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-heading font-bold mb-2">قيم تجربتك</h3>
                <p className="text-muted text-sm mb-6">
                  {productName ? `ما رأيك في ${productName}؟` : 'شاركنا تجربتك مع هذا المنتج'}
                </p>

                <div className="flex justify-center gap-2 mb-6" dir="ltr">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all ${
                        star <= (hoveredStar || rating)
                          ? 'text-yellow-400 scale-110'
                          : 'text-white/20'
                      } hover:scale-125`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="اسمك (اختياري)"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm text-right"
                      />
                    </div>
                    <div>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="اكتب تقييمك..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-all text-sm resize-none text-right"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-primary text-white font-medium hover:glow-blue transition-all text-sm"
                    >
                      إرسال التقييم
                    </button>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
