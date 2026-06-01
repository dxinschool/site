import { useLang } from "../LangContext"
import useLanyard from "../hooks/useLanyard"

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

export default function DiscordStatus() {
  const { t } = useLang()
  const { discordStatus } = useLanyard()

  return (
    <p className="card-text">
      DXuwu ·{" "}
      <span className={statusHighlighter[discordStatus] || "highlighter-grey"}>
        {t(statusKey[discordStatus] || "hero.status_offline")}
      </span>
    </p>
  )
}
