import { format } from 'date-fns'

export const JOB_STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected']

export function formatDate(date) {
  if (!date) return '-'
  return format(new Date(date), 'dd MMM yyyy')
}

export function currency(amount) {
  if (!amount || Number.isNaN(Number(amount))) return '-'
  return `₹${Number(amount).toLocaleString()}`
}

export function parseSalaryToNumber(salaryRange) {
  if (!salaryRange) return 0
  const numbers = salaryRange.match(/\d+/g)
  return numbers ? Number(numbers[0]) : 0
}

export function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 9999)}`
}

export function buildClearbitDomain(companyName) {
  if (!companyName) return 'example.com'
  return `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
}
