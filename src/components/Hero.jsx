import { useState, useEffect } from "react"
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

const statusLabels = {
  online: "online",
  idle: "idle",
  dnd: "do not disturb",
  offline: "offline",
}

const statusHighlighter = {
  online: "highlighter-green",
  idle: "highlighter-yellow",
  dnd: "highlighter-red",
  offline: "highlighter-grey",
}

export default function Hero({ setPage }) {
  const { discordAvatar, discordStatus } = useLanyard()

  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-top">
          <div className="hero-top-left">
            <h1 className="hero-title">dxuwu</h1>
            <p className="hero-desc">
              <span className={statusHighlighter[discordStatus] || "highlighter-grey"}>
                {statusLabels[discordStatus] || "offline"}
              </span>
              {" · hello this is placeholder"}
            </p>
            <div className="status-pills">
              <span className="pill">Hong Kong</span>
              <span className="pill">Japanese Learner</span>
              <span className="pill"><HKTime /> <span style={{ opacity: 0.67 }}>GMT+8</span></span>
            </div>
          </div>
          <div className="hero-avatar">
            <img src={discordAvatar} alt="avatar" />
          </div>
        </div>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")} className="nav-button">home</button>
          <button onClick={() => setPage("gallery")} className="nav-button">gallery</button>
          <button onClick={() => setPage("blog")} className="nav-button">blog ✦</button>
        </div>
      </div>
    </section>
  )
}
