import { Link } from 'react-router-dom'
import { useApplicationContext } from '../context/ApplicationContext'
import { currency, formatDate } from '../utils/helpers'

function Dashboard() {
  const { metrics, bookmarkedJobs, deleteApplication, toggleBookmark } =useApplicationContext()

  return (
    <section className="container stack-lg">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <article className="card stat-card">
          <h3>Total Applications</h3>
          <p>{metrics.total}</p>
        </article>
        <article className="card stat-card">
          <h3>Interviews</h3>
          <p>{metrics.interviews}</p>
        </article>
        <article className="card stat-card">
          <h3>Offers</h3>
          <p>{metrics.offers}</p>
        </article>
        <article className="card stat-card">
          <h3>Rejections</h3>
          <p>{metrics.rejections}</p>
        </article>
      </div>

      <section className="stack">
        <div className="row-between">
          <h3>Bookmarked Jobs</h3>
          <Link to="/applications/new" className="button">
            Add New
          </Link>
        </div>
        {bookmarkedJobs.length === 0 ? (
          <p className="empty-state">No bookmarked jobs yet.</p>
        ) : (
          <div className="table-wrapper card">
            {/* Bookmarked jobs table uses the same styling as the Applications list */}
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
                {bookmarkedJobs.map((job) => (
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
                      <span
                        className={`badge status-${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{formatDate(job.appliedDate)}</td>
                    <td>{currency(job.salaryRange?.split('-')[0])}</td>
                    <td>{job.applicationPlatform || '-'}</td>
                    <td>
                      {/* Actions: edit, delete, and unbookmark */}
                      <div className="table-actions">
                        <Link
                          className="button button-secondary"
                          to={`/applications/${job.id}`}
                        >
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
                          Unbookmark
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default Dashboard
