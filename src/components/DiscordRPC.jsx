import { useState, useEffect } from "react"
import { useLang } from "../LangContext"
import useLanyard from "../hooks/useLanyard"

function activityImageUrl(activity) {
  if (!activity?.assets?.large_image) return null
  const img = activity.assets.large_image
  // mp:external/ urls have the real URL embedded
  if (img.startsWith("mp:external/")) {
    const parts = img.replace("mp:external/", "").split("/")
    return decodeURIComponent(parts[0] ? `https://${parts[0]}` : parts[1] || null)
  }
  // spotify tracks are handled by the spotify card
  if (img.startsWith("spotify:")) return null
  // Discord CDN asset
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`
  }
  return null
}

function elapsed(timestamps) {
  if (!timestamps?.start) return null
  const ms = Date.now() - timestamps.start
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  return `${m}:${String(s).padStart(2, "0")}`
}

function ElapsedTimer({ timestamps }) {
  const [text, setText] = useState("")
  useEffect(() => {
    function tick() { setText(elapsed(timestamps) || "") }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timestamps])
  return <>{text}</>
}

const activityTypeLabel = {
  0: "Playing",
  1: "Streaming",
  2: "Listening",
  3: "Watching",
  5: "Competing",
}

export default function DiscordRPC() {
  const { t } = useLang()
  const { activities, loading } = useLanyard()

  // filter out custom status (type 4) — shown in DiscordStatus
  const rpc = activities.filter(a => a.type !== 4)[0]

  if (loading) {
    return (
      <>
        <h2 className="card-title">{t("rpc.title")}</h2>
        <p className="card-text">{t("rpc.loading")}</p>
      </>
    )
  }

  if (!rpc) {
    return (
      <>
        <h2 className="card-title">{t("rpc.title")}</h2>
        <p className="card-text">{t("rpc.none")}</p>
      </>
    )
  }

  const imgSrc = activityImageUrl(rpc)
  const label = activityTypeLabel[rpc.type] || "Playing"

  return (
    <>
      <h2 className="card-title">{t("rpc.title")}</h2>
      <div className="rpc-row">
        {imgSrc && (
          <div className="rpc-art">
            <img src={imgSrc} alt="" className="rpc-art-img" />
          </div>
        )}
        <div className="rpc-body">
          <div className="rpc-name">{rpc.name}</div>
          {rpc.details && <div className="rpc-details">{rpc.details}</div>}
          {rpc.state && <div className="rpc-state">{rpc.state}</div>}
          {rpc.timestamps?.start && (
            <div className="rpc-elapsed">
              <ElapsedTimer timestamps={rpc.timestamps} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
