const text = "mai go chu ♪ 迷子中 · lost in thought · "

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <span>{text.repeat(20)}</span>
        <span>{text.repeat(20)}</span>
      </div>
    </div>
  )
}
