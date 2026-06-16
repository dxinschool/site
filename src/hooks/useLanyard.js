import { useState, useEffect } from "react"

const USER_ID = "511031197455876128"

function avatarUrl(user) {
  if (!user?.avatar) return null
  const ext = user.avatar.startsWith("a_") ? "gif" : "png"
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`
}

export default function useLanyard() {
  const [spotify, setSpotify] = useState(null)
  const [discordUser, setDiscordUser] = useState(null)
  const [discordStatus, setDiscordStatus] = useState("offline")
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPresence() {
      try {
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/${USER_ID}`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (cancelled) return
        const data = json.data
        setSpotify(data?.spotify ?? null)
        setDiscordUser(data?.discord_user ?? null)
        setDiscordStatus(data?.discord_status ?? "offline")
        setActivities(data?.activities ?? [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPresence()
    const interval = setInterval(fetchPresence, 5000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return {
    spotify,
    discordUser,
    discordStatus,
    discordAvatar: discordUser ? avatarUrl(discordUser) : null,
    activities,
    loading,
    error,
  }
}
