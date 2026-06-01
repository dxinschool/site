import { useLang } from "../LangContext"
import useSteamRecentlyPlayed from "../hooks/useSteamRecentlyPlayed"

function formatTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export default function SteamGames() {
  const { t } = useLang()
  const { games, loading, error } = useSteamRecentlyPlayed()

  return (
    <>
      <h2 className="card-title">{t("steam.title")}</h2>

      {loading && <p className="card-text">{t("steam.loading")}</p>}

      {error && (
        <>
          <p className="card-text" style={{ color: "var(--accent-c)" }}>
            {t("steam.error")}
          </p>
          <p className="card-text" style={{ fontSize: 22 }}>
            {error}
          </p>
        </>
      )}

      {games && games.total === 0 && (
        <p className="card-text">{t("steam.empty")}</p>
      )}

      {games && games.total > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginTop: 4 }}>
          {games.items.map((game) => (
            <a
              key={game.appId}
              href={`https://store.steampowered.com/app/${game.appId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 8,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.5)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(47, 127, 176, 0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.5)")
              }
            >
              <img
                src={game.imgIconUrl}
                alt={game.name}
                width={48}
                height={48}
                style={{ borderRadius: 8, flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--text)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {game.name}
                </div>
                <div style={{ fontSize: 22, color: "var(--muted)" }}>
                  {game.playtime2Weeks > 0
                    ? `${formatTime(game.playtime2Weeks)}${t("steam.past_2w")}`
                    : `${formatTime(game.playtimeForever)}${t("steam.total")}`}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
