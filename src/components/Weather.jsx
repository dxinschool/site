import { useLang } from "../LangContext"
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
  const { t, lang } = useLang()
  const { data, loading, error } = useWeather(lang)

  function warningLabel(w) {
    switch (w.type) {
      case "tropical-cyclone": return t("weather.warning_typhoon")(w.signal)
      case "rainstorm": return t("weather.warning_rainstorm")(w.rainType)
      case "hot-weather": return t("weather.warning_hot")
      case "cold-weather": return t("weather.warning_cold")
      case "thunderstorm": return t("weather.warning_thunder")
      case "fire-danger": return t("weather.warning_fire")
      default: return ""
    }
  }

  return (
    <>
      <h2 className="card-title">{t("weather.title")}</h2>

      {loading && <p className="card-text">{t("weather.loading")}</p>}
      {error && <p className="card-text" style={{ color: "var(--accent-c)" }}>{t("weather.error")}</p>}

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
                    {warningLabel(w)}
                  </div>
                )
              })}
            </div>
          )}

          <div className="weather-current">
            <span className="weather-current-emoji">
              {data.current.temp !== null ? (data.current.temp >= 33 ? "🥵" : data.current.temp >= 28 ? "☀️" : data.current.temp >= 20 ? "🌤️" : data.current.temp >= 12 ? "🌥️" : "❄️") : "🌤️"}
            </span>
            <div>
              <div className="weather-current-temp">{data.current.temp !== null ? `${data.current.temp}°` : "--°"}</div>
              <div className="weather-current-humidity">{t("weather.humidity")}{data.current.humidity !== null ? `${data.current.humidity}%` : "--"}</div>
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

          <div className="weather-forecast">
            {data.daily.map((day, i) => (
              <div
                key={day.date}
                className="weather-day"
                style={{
                  textAlign: "center",
                  padding: "8px 4px",
                  borderRadius: 8,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 22, color: "var(--muted)", marginBottom: 4 }}>
                  {i === 0 ? t("weather.today") : day.day}
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
