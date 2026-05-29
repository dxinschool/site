const text = "迷子中 · "

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <span>{text.repeat(30)}</span>
        <span>{text.repeat(30)}</span>
      </div>
    </div>
  )
}
