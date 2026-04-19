import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'
import { useApplicationContext } from '../context/ApplicationContext'
import { useDebounce } from '../hooks/useDebounce'
import { currency, formatDate } from '../utils/helpers'
import { JOB_STATUSES } from '../utils/helpers'

function Applications() {
  const {
    applications,
    deleteApplication,
    toggleBookmark,
    sortApplications,
    isBootstrapping,
  } = useApplicationContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [sortBy, setSortBy] = useState('appliedDate')
  const [filters, setFilters] = useState({ status: '', platform: '', location: '' })
  const debouncedSearch = useDebounce(searchTerm)

  const filteredJobs = useMemo(() => {
    // Debounced query prevents filtering on every keystroke.
    const query = debouncedSearch.toLowerCase()
    let result = [...applications]

    if (query) {
      result = result.filter(
        (job) =>
          job.companyName.toLowerCase().includes(query) ||
          job.jobRole.toLowerCase().includes(query),
      )
    }

    if (activeTab !== 'All') {
      result = result.filter((job) => job.status === activeTab)
    }
    if (filters.status) {
      result = result.filter((job) => job.status === filters.status)
    }
    if (filters.platform) {
      result = result.filter((job) =>
        (job.applicationPlatform || '')
          .toLowerCase()
          .includes(filters.platform.toLowerCase()),
      )
    }
    if (filters.location) {
      result = result.filter((job) =>
        (job.location || '').toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    return sortApplications(result, sortBy)
  }, [activeTab, applications, debouncedSearch, filters, sortApplications, sortBy])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section className="container stack-lg">
      <h2>Applications</h2>

      <div className="card stack">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Filters filters={filters} onChange={updateFilter} />
        <select
          className="input"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="appliedDate">Sort by Applied Date</option>
          <option value="salary">Sort by Salary</option>
          <option value="companyName">Sort by Company Name</option>
        </select>
      </div>

      <div className="tabs">
        {['All', ...JOB_STATUSES].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {isBootstrapping ? <p className="empty-state">Loading jobs...</p> : null}
      {!isBootstrapping && filteredJobs.length === 0 ? (
        <p className="empty-state">No jobs found. Add your first application!</p>
      ) : null}

      {filteredJobs.length > 0 ? (
        <div className="table-wrapper card">
          {/* Table layout gives a more SaaS-like experience for many rows. */}
          <table className="jobs-table">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Applied Date</th>
                <th scope="col">Salary</th>
                <th scope="col">Platform</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    {/* Company logo + name */}
                    <div className="company-cell">
                      {/* <img
                        className="logo"
                        src={`https://logo.clearbit.com/${job.companyDomain}`}
                        alt={`${job.companyName} logo`}
                        onError={(event) => {
                          event.currentTarget.src =
                            'https://logo.clearbit.com/example.com'
                        }}
                      /> */}
                      <span>{job.companyName}</span>
                    </div>
                  </td>
                  <td>{job.jobRole}</td>
                  <td>
                    <span className={`badge status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>{formatDate(job.appliedDate)}</td>
                  <td>{currency(job.salaryRange?.split('-')[0])}</td>
                  <td>{job.applicationPlatform || '-'}</td>
                  <td>
                    {/* Quick actions for each application */}
                    <div className="table-actions">
                      <Link className="button button-secondary" to={`/applications/${job.id}`}>
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="button button-danger"
                        onClick={() => deleteApplication(job.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={() => toggleBookmark(job.id)}
                      >
                        {job.bookmarked ? 'Unbookmark' : 'Bookmark'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Old card layout kept for reference
      <div className="job-grid">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={deleteApplication}
            onBookmark={toggleBookmark}
          />
        ))}
      </div>
      */}
    </section>
  )
}

export default Applications
