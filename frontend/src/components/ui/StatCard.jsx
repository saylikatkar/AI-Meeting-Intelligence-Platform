
export function StatCard({ label, value, change, Icon, tone = 'blue' }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon ${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span className="stat-change">{change}</span>
        <span>vs. last month</span>
      </div>
    </div>
  )
}
