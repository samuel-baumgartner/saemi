/**
 * Get date string in local timezone (YYYY-MM-DD format)
 * This avoids timezone issues when converting to UTC with toISOString()
 */
export function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get today's date in local timezone
 */
export function getTodayString(): string {
  return getLocalDateString(new Date())
}







