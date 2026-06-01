import { useLang } from "../LangContext"

export default function Ticker() {
  const { t } = useLang()
  const text = t("ticker")

  return (
    <div className="ticker">
      <div className="ticker-track">
        <span>{text.repeat(20)}</span>
        <span>{text.repeat(20)}</span>
      </div>
    </div>
  )
}
