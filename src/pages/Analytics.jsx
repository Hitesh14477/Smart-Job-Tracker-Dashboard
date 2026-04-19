import Charts from '../components/Charts'
import { useApplicationContext } from '../context/ApplicationContext'

function Analytics() {
  const { metrics } = useApplicationContext()

  return (
    <section className="container stack-lg">
      <h2>Analytics</h2>
      {metrics.total === 0 ? (
        <p className="empty-state ">No applications yet. Add a few jobs to view charts.</p>
      ) : (
        <Charts
          statusData={metrics.statusBreakdown}
          timelineData={metrics.applicationsOverTime}
        />
      )}
    </section>
  )
}

export default Analytics
