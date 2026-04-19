import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchDummyJobs } from '../services/api'
import {
  buildClearbitDomain,
  JOB_STATUSES,
  makeId,
  parseSalaryToNumber,
} from '../utils/helpers'
import { useLocalStorage } from './useLocalStorage'

export function useApplications() {
  // Keep storage empty initially so students can see API data mapping in action.
  const [applications, setApplications] = useLocalStorage('smart-job-tracker', [])
  const [isBootstrapping, setIsBootstrapping] = useState(false)

  // useEffect(() => {
  //   async function hydrateDummyData() {
  //     // Only fetch seed data when local state is empty.
  //     if (applications.length > 0) return
  //     setIsBootstrapping(true)
  //     try {
  //       const products = await fetchDummyJobs()
  //       const roles = [
  //         'Frontend Developer',
  //         'React Engineer',
  //         'UI Engineer',
  //         'Software Engineer',
  //         'Full Stack Developer',
  //         'Product Engineer',
  //       ]
  //       const locations = ['Remote', 'Pune', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi']
  //       const platforms = ['Indeed', 'LinkedIn', 'Wellfound', 'Naukri', 'Instahyre', 'Company Site']

  //       // Map dummy products into 6 realistic job applications.
  //       const seedJobs = products.slice(0, 6).map((item, index) => ({
  //         id: makeId(),
  //         companyName: item.brand || item.title.split(' ')[0] || 'Company',
  //         companyDomain: `${(item.brand || 'company').toLowerCase()}.com`,
  //         jobRole: roles[index % roles.length],
  //         location: locations[index % locations.length],
  //         salaryRange: `${item.price * 10000}-${item.price * 14000}`,
  //         applicationPlatform: platforms[index % platforms.length],
  //         status: JOB_STATUSES[index % JOB_STATUSES.length],
  //         appliedDate: new Date().toISOString().slice(0, 10),
  //         interviewDate: '',
  //         notes: 'Imported from dummy API',
  //         bookmarked: false,
  //       }))
  //       setApplications(seedJobs)
  //     } catch (error) {
  //       console.error('Dummy job API failed:', error)
  //       toast.error('Could not fetch dummy jobs.')
  //     } finally {
  //       setIsBootstrapping(false)
  //     }
  //   }

  //   hydrateDummyData()
  // }, [applications.length, setApplications])

  const addApplication = (data) => {
    setApplications((prev) => [...prev, { ...data, id: makeId(), companyDomain: data.companyDomain || buildClearbitDomain(data.companyName), bookmarked: false, },])
    toast.success('Application added.')
  }

  const updateApplication = (id, updated) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            ...updated,
            companyDomain:
              updated.companyDomain || buildClearbitDomain(updated.companyName),
          }
          : item,
      ),
    )
    toast.success('Application updated.')
  }

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((item) => item.id !== id))
    toast.success('Application deleted.')
  }

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item,
      ),
    )
  }

  // DATA FOR DASHBOARD AND CHARTS
  const metrics = useMemo(() => {
    // Pre-calculate dashboard and chart data from one source of truth.
    const interviews = applications.filter(
      (item) => item.status === 'Interviewing',
    ).length
    const offers = applications.filter((item) => item.status === 'Offer').length
    const rejections = applications.filter((item) => item.status === 'Rejected',).length
    const statusBreakdown = JOB_STATUSES.map((status) => ({ name: status, value: applications.filter((item) => item.status === status).length, }))
    const timelineMap = applications.reduce((acc, app) => {
      const key = app.appliedDate;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const applicationsOverTime = Object.entries(timelineMap).sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, count]) => ({ date, count }))

    return {
      total: applications.length,
      interviews,
      offers,
      rejections,
      statusBreakdown,
      applicationsOverTime,
    }
  }, [applications])

  const bookmarkedJobs = useMemo(() => applications.filter((item) => item.bookmarked), [applications],)

  const sortApplications = (items, sortBy) => {
    const copy = [...items]
    if (sortBy === 'appliedDate') {
      return copy.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    }
    if (sortBy === 'salary') {
      return copy.sort(
        (a, b) => parseSalaryToNumber(b.salaryRange) - parseSalaryToNumber(a.salaryRange),
      )
    }
    if (sortBy === 'companyName') {
      return copy.sort((a, b) => a.companyName.localeCompare(b.companyName))
    }
    return copy
  }

  return {
    applications,
    bookmarkedJobs,
    isBootstrapping,
    metrics,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
    sortApplications,
  }
}
