import { useState } from 'react'

export function useImageUpload() {
  const [uploading, setUploading] = useState(false)

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject('No file')
      if (!file.type.startsWith('image/')) return reject('Not an image')
      if (file.size > 10 * 1024 * 1024) return reject('Image too large (>10MB)')

      setUploading(true)
      const reader = new FileReader()
      reader.onload = () => {
        setUploading(false)
        resolve(reader.result)
      }
      reader.onerror = () => {
        setUploading(false)
        reject('Failed to read file')
      }
      reader.readAsDataURL(file)
    })
  }

  return { toBase64, uploading }
}
