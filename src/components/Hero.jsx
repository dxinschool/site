import { useState, useEffect } from "react"
import { useLang } from "../LangContext"
import useLanyard from "../hooks/useLanyard"

function HKTime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-HK", {
          timeZone: "Asia/Hong_Kong",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <>{time || ""}</>
}

const statusHighlighter = {
  online: "highlighter-green",
  idle: "highlighter-yellow",
  dnd: "highlighter-red",
  offline: "highlighter-grey",
}

const statusKey = {
  online: "hero.status_online",
  idle: "hero.status_idle",
  dnd: "hero.status_dnd",
  offline: "hero.status_offline",
}

export default function Hero({ setPage }) {
  const { discordAvatar, discordStatus } = useLanyard()
  const { t } = useLang()

  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-top">
          <div className="hero-top-left">
            <h1 className="hero-title">dxuwu</h1>
            <p className="hero-desc">
              <span className={statusHighlighter[discordStatus] || "highlighter-grey"}>
                {t(statusKey[discordStatus] || "hero.status_offline")}
              </span>
              {t("hero.desc")}
            </p>
            <div className="status-pills">
              <span className="pill">{t("hero.pill_hk")}</span>
              <span className="pill">{t("hero.pill_jp")}</span>
              <span className="pill"><HKTime /> <span style={{ opacity: 0.67 }}>{t("hero.tz")}</span></span>
            </div>
          </div>
          <div className="hero-avatar">
            <img src={discordAvatar} alt={t("hero.avatar_alt")} />
          </div>
        </div>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")} className="nav-button">{t("nav.home")}</button>
          <button onClick={() => setPage("gallery")} className="nav-button">{t("nav.gallery")}</button>
          <button onClick={() => setPage("blog")} className="nav-button">{t("nav.blog")} ✦</button>
        </div>
      </div>
    </section>
  )
}
