export default function StatCard({ label, value, icon = '📌' }) { return <div className="stat-card"><span>{icon}</span><strong>{value}</strong><small>{label}</small></div>; }
