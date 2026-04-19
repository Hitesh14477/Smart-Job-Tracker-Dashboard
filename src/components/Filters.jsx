import { JOB_STATUSES } from '../utils/helpers'

function Filters({ filters, onChange }) {
  return (
    <div className="filters-grid">
      <select
        className="input"
        value={filters.status}
        onChange={(event) => onChange('status', event.target.value)}
      >
        <option value="">All Status</option>
        {JOB_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <input
        className="input"
        placeholder="Filter by platform"
        value={filters.platform}
        onChange={(event) => onChange('platform', event.target.value)}
      />

      <input
        className="input"
        placeholder="Filter by location"
        value={filters.location}
        onChange={(event) => onChange('location', event.target.value)}
      />
    </div>
  )
}

export default Filters
