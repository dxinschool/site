import { useState, useEffect } from "react"

const iconEmoji = {
  50: "☀️", 51: "🌤️", 52: "⛅", 53: "🌤️", 54: "⛅",
  60: "🌦️", 61: "🌧️", 62: "🌧️", 63: "⛈️", 64: "⛈️", 65: "⛈️",
}

const tcSignals = {
  TC1: "T1", TC3: "T3",
  TC8NE: "8NE", TC8SE: "8SE", TC8NW: "8NW", TC8SW: "8SW",
  TC9: "9", TC10: "10",
}

export default function useWeather(lang = "en") {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiLang = lang === "zh" ? "tc" : "en"

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        const [rhr, warn, fnd, flw] = await Promise.all([
          fetch(`/hko-api/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${apiLang}`).then(r => r.json()),
          fetch(`/hko-api/weatherAPI/opendata/weather.php?dataType=warnsum&lang=${apiLang}`).then(r => r.json()),
          fetch(`/hko-api/weatherAPI/opendata/weather.php?dataType=fnd&lang=${apiLang}`).then(r => r.json()),
          fetch(`/hko-api/weatherAPI/opendata/weather.php?dataType=flw&lang=${apiLang}`).then(r => r.json()),
        ])
        if (cancelled) return

        const obs = rhr.temperature?.data?.find(s => s.place === "Hong Kong Observatory" || s.place === "香港天文台")
        const hum = rhr.humidity?.data?.[0]

        const warnings = []
        if (warn.WTCS) {
          warnings.push({ type: "tropical-cyclone", signal: tcSignals[warn.WTCS.code] || warn.WTCS.code })
        }
        if (warn.WRAIN) {
          warnings.push({ type: "rainstorm", rainType: warn.WRAIN.type })
        }
        if (warn.WHOT) {
          warnings.push({ type: "hot-weather" })
        }
        if (warn.WCOLD) {
          warnings.push({ type: "cold-weather" })
        }
        if (warn.WTS) {
          warnings.push({ type: "thunderstorm" })
        }
        if (warn.WFIRE) {
          warnings.push({ type: "fire-danger" })
        }

        setData({
          current: {
            temp: obs?.value ?? null,
            humidity: hum?.value ?? null,
          },
          warnings,
          tcInfo: flw.tcInfo || null,
          forecastDesc: fnd.generalSituation || null,
          daily: (fnd.weatherForecast || []).slice(0, 5).map(d => ({
            date: d.forecastDate,
            day: d.week,
            high: d.forecastMaxtemp?.value ?? null,
            low: d.forecastMintemp?.value ?? null,
            desc: d.forecastWeather,
            emoji: iconEmoji[d.ForecastIcon] || "🌤️",
          })),
        })
        setLoading(false)
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchWeather()
    const id = setInterval(fetchWeather, 600000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [apiLang])

  return { data, loading, error }
}
