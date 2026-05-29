import { useState, useEffect } from "react"

const API_KEY = "3739804C42480B301623E461F96F05CA"
const STEAM_ID = "76561199088769523"

export default function useSteamRecentlyPlayed() {
  const [games, setGames] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchGames() {
      try {
        const res = await fetch(
          `/steam-api/IPlayerService/GetRecentlyPlayedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}&format=json`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (cancelled) return

        const total = json.response?.total_count ?? 0
        const raw = json.response?.games ?? []

        const mapped = raw.map((g) => ({
          appId: g.appid,
          name: g.name,
          playtime2Weeks: g.playtime_2weeks ?? 0,
          playtimeForever: g.playtime_forever ?? 0,
          imgIconUrl: g.img_icon_url
            ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
            : null,
          imgLogoUrl: g.img_logo_url
            ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_logo_url}.jpg`
            : null,
        }))

        setGames({ total, items: mapped })
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGames()
    return () => { cancelled = true }
  }, [])

  return { games, loading, error }
}
