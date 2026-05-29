import useLanyard from "../hooks/useLanyard"

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

export default function DiscordStatus() {
  const { discordStatus } = useLanyard()

  return (
    <p className="card-text">
      DXuwu ·{" "}
      <span className={statusHighlighter[discordStatus] || "highlighter-grey"}>
        {statusLabels[discordStatus] || "offline"}
      </span>
    </p>
  )
}
