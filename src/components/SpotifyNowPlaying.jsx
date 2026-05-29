import { useRef, useEffect } from "react"
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
  const { spotify, loading, error } = useLanyard()
  const { lines, currentIndex, lineProgress, loading: lyricsLoading } = useLyrics(spotify)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current && currentIndex >= 0) {
      const child = scrollRef.current.children[currentIndex]
      child?.scrollIntoView({ block: "center", behavior: "smooth" })
    }
  }, [currentIndex])

  return (
    <>
      <h2 className="card-title">spotify</h2>

      {loading && <p className="card-text">loading...</p>}

      {error && (
        <p className="card-text" style={{ color: "var(--accent-c)" }}>
          couldn't load
        </p>
      )}

      {!loading && !error && !spotify && (
        <>
          <p className="card-text">not playing</p>
          <p className="card-text">not listening right now</p>
        </>
      )}

      {spotify && (() => {
        const noLyrics = !lyricsLoading && lines.length === 0
        return (
          <div style={{
            display: "flex",
            gap: noLyrics ? 20 : 16,
            alignItems: noLyrics ? "center" : "flex-start",
            padding: noLyrics ? "4px 0" : 0
          }}>
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <a
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  position: "relative",
                  boxShadow: noLyrics ? "0 8px 24px rgba(0,0,0,0.15)" : "none",
                  borderRadius: 8,
                }}
              >
                <img
                  src={spotify.album_art_url}
                  alt={spotify.album}
                  width={noLyrics ? 110 : 140}
                  height={noLyrics ? 110 : 140}
                  style={{ borderRadius: 8, display: "block" }}
                />
              </a>
              
              {!noLyrics && (
                <div style={{ textAlign: "center", minWidth: 0, width: 140 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--text)",
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {spotify.song}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {spotify.artist}
                  </div>
                </div>
              )}
            </div>

            {noLyrics && (
              <div style={{ 
                flex: 1, 
                minWidth: 0, 
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 4
              }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.2,
                  }}
                >
                  {spotify.song}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.3,
                  }}
                >
                  by {spotify.artist}
                </div>
                
                <div style={{ 
                  marginTop: 8, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 6,
                  color: "var(--accent-a)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}>
                  <div className="spotify-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                  now playing
                </div>
              </div>
            )}

            {(lyricsLoading || lines.length > 0) && (
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                minWidth: 0,
                maxHeight: 148,
                overflowY: "auto",
                scrollBehavior: "smooth",
                padding: "2px 0",
              }}
            >
              {lyricsLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    minHeight: 60,
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  fetching lyrics...
                </div>
              ) : (
                lines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
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
