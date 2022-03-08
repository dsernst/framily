const YEAR = 365
const MONTH = 30
const WEEK = 7
export const options = [
  undefined,
  WEEK,
  2 * WEEK,
  MONTH,
  2 * MONTH,
  3 * MONTH,
  6 * MONTH,
  YEAR,
  2 * YEAR,
  5 * YEAR,
]

export const daysToString = (days?: number) => {
  if (!days) return 'Not set'

  const units: [number, string][] = [
    [YEAR, 'year'],
    [MONTH, 'month'],
    [WEEK, 'week'],
    [1, 'day'],
  ]
  for (const [duration, unitName] of units) {
    if (days >= duration) {
      const amount = Math.floor(days / duration)
      return `${amount} ${unitName}${amount > 1 ? 's' : ''}`
    }
  }
}
