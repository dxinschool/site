import { useRef, useEffect } from "react"
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

  useEffect(() => {
    const c = scrollRef.current
    if (!c || currentIndex < 0) return
    const el = c.children[currentIndex]
    if (!el) return
    const top = el.offsetTop - c.clientHeight / 2 + el.clientHeight / 2
    c.scrollTo({ top, behavior: "smooth" })
  }, [currentIndex])

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

      {spotify && (() => {
        const noLyrics = !lyricsLoading && lines.length === 0
        return (
          <div className={`spotify-row ${noLyrics ? "spotify-row--nolyrics" : ""}`}>
            <div className="spotify-album-col">
              <a
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-album-link"
                style={{
                  boxShadow: noLyrics ? "0 8px 24px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <img
                  src={spotify.album_art_url}
                  alt={spotify.album}
                  className="spotify-album-img"
                  width={noLyrics ? 110 : 140}
                  height={noLyrics ? 110 : 140}
                />
              </a>
              
              {!noLyrics && (
                <div className="spotify-song-info">
                  <div className="spotify-song-title">{spotify.song}</div>
                  <div className="spotify-song-artist">{spotify.artist}</div>
                </div>
              )}
            </div>

            {noLyrics && (
              <div className="spotify-nolyrics-info">
                <div className="spotify-nolyrics-song">{spotify.song}</div>
                <div className="spotify-nolyrics-artist">{t("spotify.by")}{spotify.artist}</div>
                
                <div className="spotify-nowplaying-tag">
                  <div className="spotify-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                  {t("spotify.now_playing")}
                </div>
              </div>
            )}

            {(lyricsLoading || lines.length > 0) && (
            <div
              ref={scrollRef}
              className="spotify-lyrics"
            >
              {lyricsLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    minHeight: 60,
                    fontSize: 22,
                    color: "var(--muted)",
                  }}
                >
                  {t("spotify.fetching")}
                </div>
              ) : (
                lines.map((line, i) => (
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
                ))
              )}
            </div>
          )}
        </div>
      )
      })()}
    </>
  )
}
