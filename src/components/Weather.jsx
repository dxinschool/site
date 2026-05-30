import useWeather from "../hooks/useWeather"

const warningStyles = {
  "tropical-cyclone": { bg: "rgba(200, 50, 50, 0.15)", border: "#c83232", icon: "🌀" },
  "rainstorm": { bg: "rgba(200, 130, 50, 0.15)", border: "#c88232", icon: "🌧️" },
  "hot-weather": { bg: "rgba(220, 80, 30, 0.15)", border: "#dc501e", icon: "🔥" },
  "cold-weather": { bg: "rgba(50, 130, 200, 0.12)", border: "#3282c8", icon: "❄️" },
  "thunderstorm": { bg: "rgba(180, 100, 30, 0.12)", border: "#b4641e", icon: "⛈️" },
  "fire-danger": { bg: "rgba(200, 80, 30, 0.12)", border: "#c8501e", icon: "🔥" },
}

export default function Weather() {
  const { data, loading, error } = useWeather()

  return (
    <>
      <h2 className="card-title">weather · hong kong</h2>

      {loading && <p className="card-text">loading...</p>}
      {error && <p className="card-text" style={{ color: "var(--accent-c)" }}>couldn't load</p>}

      {data && (
        <div>
          {data.warnings.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {data.warnings.map((w, i) => {
                const s = warningStyles[w.type] || {}
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 999,
                      background: s.bg || "var(--card)",
                      border: `1px solid ${s.border || "var(--border)"}`,
                      fontSize: 22,
                      fontWeight: 600,
                      color: s.border || "var(--text)",
                    }}
                  >
                    <span>{s.icon || "⚠️"}</span>
                    {w.label}
                  </div>
                )
              })}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 48 }}>
              {data.current.temp !== null ? (data.current.temp >= 33 ? "🥵" : data.current.temp >= 28 ? "☀️" : data.current.temp >= 20 ? "🌤️" : data.current.temp >= 12 ? "🌥️" : "❄️") : "🌤️"}
            </span>
            <div>
              <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>
                {data.current.temp !== null ? `${data.current.temp}°` : "--°"}
              </div>
              <div style={{ fontSize: 22, color: "var(--muted)", marginTop: 2 }}>
                humidity: {data.current.humidity !== null ? `${data.current.humidity}%` : "--"}
              </div>
            </div>
          </div>

          {data.tcInfo && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(200, 50, 50, 0.08)",
                border: "1px solid rgba(200, 50, 50, 0.3)",
                fontSize: 22,
                color: "var(--text)",
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              {data.tcInfo}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {data.daily.map((day, i) => (
              <div
                key={day.date}
                style={{
                  textAlign: "center",
                  padding: "8px 4px",
                  borderRadius: 8,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 22, color: "var(--muted)", marginBottom: 4 }}>
                  {i === 0 ? "Today" : day.day}
                </div>
                <div style={{ fontSize: 22, marginBottom: 2 }}>{day.emoji}</div>
                <div style={{ fontSize: 22 }}>
                  <span style={{ fontWeight: 600 }}>{day.high !== null ? `${day.high}°` : "--"}</span>
                  <span style={{ color: "var(--muted)", marginLeft: 4 }}>{day.low !== null ? `${day.low}°` : "--"}</span>
                </div>
              </div>
            ))}
          </div>


        </div>
      )}
    </>
  )
}
