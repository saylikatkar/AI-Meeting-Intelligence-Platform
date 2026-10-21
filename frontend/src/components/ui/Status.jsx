
export function Status({ status }) {
  return (
    <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}>
      <i />
      {status}
    </span>
  )
}
