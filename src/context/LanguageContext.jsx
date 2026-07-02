import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import ar from '../i18n/ar'
import en from '../i18n/en'

const translations = { ar, en }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved || 'ar'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((path) => {
    const keys = path.split('.')
    let result = translations[lang]
    for (const key of keys) {
      if (result) result = result[key]
    }
    return result || path
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}

export default LanguageContext
