import { useState, useEffect, useRef } from "react"

const lyricsCache = new Map()
const CACHE_KEY = "lyrics_cache_v1"

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      for (const [k, v] of Object.entries(parsed)) {
        lyricsCache.set(k, v)
      }
    }
  } catch {}
}
loadCache()

function persistCache() {
  try {
    const obj = Object.fromEntries(lyricsCache)
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj))
  } catch {}
}

function parseSynced(raw) {
  const regex = /\[(\d+):(\d+)\.(\d+)\]\s*(.*)/g
  const lines = []
  let match
  while ((match = regex.exec(raw)) !== null) {
    const mins = parseInt(match[1], 10)
    const secs = parseInt(match[2], 10)
    const ms = mins * 60000 + secs * 1000 + parseInt(match[3].padEnd(3, "0"), 10)
    lines.push({ time: ms, text: match[4].trim() })
  }
  return lines.sort((a, b) => a.time - b.time)
}

function getLineDuration(lines, index, songDuration) {
  if (index < lines.length - 1) {
    return lines[index + 1].time - lines[index].time
  }
  const remaining = songDuration - lines[index].time
  return remaining > 0 ? remaining : 4000
}

export default function useLyrics(spotify) {
  const [lines, setLines] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [lineProgress, setLineProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [loading, setLoading] = useState(false)
  const startRef = useRef(0)
  const songDurationRef = useRef(0)

  useEffect(() => {
    if (!spotify) {
      setLines([])
      setCurrentIndex(-1)
      setLineProgress(0)
      return
    }

    const cached = lyricsCache.get(spotify.track_id)
    if (cached) {
      setLines(cached)
      setLoading(false)
      startRef.current = spotify.timestamps?.start ?? Date.now()
      songDurationRef.current = spotify.timestamps?.end
        ? spotify.timestamps.end - spotify.timestamps.start
        : 300000
      return
    }

    setLines([])
    let cancelled = false

    async function fetchLyrics() {
      setLoading(true)
      try {
        const q = `${spotify.artist} ${spotify.song}`
        const res = await fetch(`/lrclib-api/api/search?q=${encodeURIComponent(q)}`)
        if (!res.ok) throw new Error("search failed")
        const results = await res.json()
        if (cancelled || !Array.isArray(results) || results.length === 0) {
          throw new Error("no results")
        }

        const best = results[0]
        if (!best.syncedLyrics) throw new Error("no synced lyrics")

        const parsed = parseSynced(best.syncedLyrics)
        if (parsed.length === 0) throw new Error("empty lyrics")

        lyricsCache.set(spotify.track_id, parsed)
        persistCache()
        setLines(parsed)
        startRef.current = spotify.timestamps?.start ?? Date.now()
        songDurationRef.current = spotify.timestamps?.end
          ? spotify.timestamps.end - spotify.timestamps.start
          : 300000
      } catch (err) {
        console.warn("Lyrics fetch failed:", err.message)
        if (!cancelled) setLines([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchLyrics()
    return () => { cancelled = true }
  }, [spotify?.track_id])

  useEffect(() => {
    if (lines.length === 0) return

    let frame

    function tick() {
      const e = Date.now() - startRef.current
      setElapsed(e)

      let idx = -1
      for (let i = lines.length - 1; i >= 0; i--) {
        if (e >= lines[i].time) {
          idx = i
          break
        }
      }
      setCurrentIndex(idx)

      if (idx >= 0) {
        const dur = getLineDuration(lines, idx, songDurationRef.current)
        const prog = dur > 0 ? (e - lines[idx].time) / dur : 0
        setLineProgress(Math.min(Math.max(prog, 0), 1))
      } else {
        setLineProgress(0)
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [lines])

  return { lines, currentIndex, lineProgress, elapsed, loading }
}
