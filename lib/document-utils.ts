export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}

export function getFileExtension(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase()
}

export function sanitizeText(text: string): string {
  return text
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\w\s.,!?;:'"()-]/g, "") // Remove special characters
    .trim()
}

export function extractSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g) || []
}

export function calculateReadingTime(text: string): number {
  const words = text.split(/\W+/).length
  const wordsPerMinute = 200
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}
