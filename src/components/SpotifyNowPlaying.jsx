import { useRef, useEffect, useState } from "react"
import { useLang } from "../LangContext"
import useLanyard from "../hooks/useLanyard"
import useLyrics from "../hooks/useLyrics"

function WordByWord({ text, progress }) {
  const words = text.split(/\s+/).filter(Boolean)
  const activeIndex = Math.min(
    Math.floor(progress * words.length),
    words.length - 1
  )

  return (
    <span>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            color:
              i <= activeIndex ? "var(--accent-a)" : "var(--text)",
            fontWeight: i <= activeIndex ? 600 : 400,
            transition: "color 0.08s",
          }}
        >
          {w}{" "}
        </span>
      ))}
    </span>
  )
}

export default function SpotifyNowPlaying() {
  const { t } = useLang()
  const { spotify, loading, error } = useLanyard()
  const { lines, currentIndex, lineProgress, loading: lyricsLoading } = useLyrics(spotify)
  const scrollRef = useRef(null)

  const [phase, setPhase] = useState("init")

  useEffect(() => {
    if (phase === "init") {
      const a = requestAnimationFrame(() => {
        const b = requestAnimationFrame(() => {
          setPhase("ready")
        })
        return () => cancelAnimationFrame(b)
      })
      return () => cancelAnimationFrame(a)
    }
  }, [phase])

  useEffect(() => {
    const c = scrollRef.current
    if (!c || currentIndex < 0) return
    const el = c.children[currentIndex]
    if (!el) return
    const top = el.offsetTop - c.clientHeight / 2 + el.clientHeight / 2
    c.scrollTo({ top, behavior: "smooth" })
  }, [currentIndex])

  const noLyrics = !lyricsLoading && lines.length === 0
  const hasLyrics = lines.length > 0
  const showCentered = phase === "init" || !hasLyrics || noLyrics

  return (
    <>
      <h2 className="card-title">{t("spotify.title")}</h2>

      {loading && <p className="card-text">{t("spotify.loading")}</p>}

      {error && (
        <p className="card-text" style={{ color: "var(--accent-c)" }}>
          {t("spotify.error")}
        </p>
      )}

      {!loading && !error && !spotify && (
        <>
          <p className="card-text">{t("spotify.not_playing")}</p>
          <p className="card-text">{t("spotify.not_listening")}</p>
        </>
      )}

      {spotify && (
        <div className={`spotify-wrap ${showCentered ? "spotify-wrap--center" : "spotify-wrap--split"}`}>
          <div className="spotify-art">
            <a
              href={`https://open.spotify.com/track/${spotify.track_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-art-link"
            >
              <img
                src={spotify.album_art_url}
                alt={spotify.album}
                className="spotify-art-img"
              />
            </a>

            <div className="spotify-art-info">
              <div className="spotify-art-song">{spotify.song}</div>
              <div className="spotify-art-artist">{t("spotify.by")}{spotify.artist}</div>
              {noLyrics ? (
                <div className="spotify-nowplaying-tag" style={{ justifyContent: "center" }}>
                  <div className="spotify-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                  {t("spotify.now_playing")}
                </div>
              ) : !hasLyrics ? (
                <div style={{ fontSize: 22, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                  {t("spotify.fetching")}
                </div>
              ) : null}
            </div>
          </div>

          {hasLyrics && (
            <div ref={scrollRef} className="spotify-lyrics-panel">
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 23,
                    lineHeight: 1.6,
                    color:
                      i === currentIndex
                        ? "var(--accent-a)"
                        : i < currentIndex
                          ? "var(--muted)"
                          : "var(--text)",
                    fontWeight: i === currentIndex ? 600 : 400,
                    opacity:
                      i === currentIndex
                        ? 1
                        : Math.abs(i - currentIndex) <= 2
                          ? 0.85
                          : 0.4,
                    transition: "color 0.12s, opacity 0.12s",
                    padding: "1px 0",
                  }}
                >
                  {i === currentIndex && line.text ? (
                    <WordByWord
                      text={line.text}
                      progress={Math.max(0, lineProgress)}
                    />
                  ) : (
                    line.text || "\u00A0"
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
