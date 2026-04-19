import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function Charts({ statusData, timelineData }) {
  const chartColors = ['#6366f1', '#f59e0b', '#22c55e', '#ef4444']
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    // Avoid cramped labels for tiny slices (prevents overlapping text).
    if (percent < 0.08 || value === 0) return null
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)
    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={700}
      >
        {value}
      </text>
    )
  }

  return (
    <div className="chart-grid">
      <div className="card">
        <h3 className="mb-2 text-lg font-semibold">Status Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={92}
              innerRadius={48}
              minAngle={5}
              paddingAngle={2}
              labelLine={false}
              label={renderPieLabel}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={24} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="mb-2 text-lg font-semibold">Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Charts
