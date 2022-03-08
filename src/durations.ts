export const options = [undefined, 7, 14, 30, 90, 180, 365]

export const daysToString = (days?: number) => {
  if (!days) return 'Not set'

  const units: [number, string][] = [
    [365, 'year'],
    [30, 'month'],
    [7, 'week'],
    [1, 'day'],
  ]
  for (const [duration, unitName] of units) {
    if (days >= duration) {
      const amount = Math.floor(days / duration)
      return `${amount} ${unitName}${amount > 1 ? 's' : ''}`
    }
  }
}
