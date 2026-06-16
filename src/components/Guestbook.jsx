import { useState, useEffect } from "react"
import { useLang } from "../LangContext"

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function Guestbook() {
  const { t } = useLang()
  const [entries, setEntries] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/guestbook").then((r) => r.ok ? r.json() : []),
      fetch("/api/auth/me").then((r) => r.json()),
    ]).then(([entries, { user }]) => {
      if (Array.isArray(entries)) setEntries(entries)
      setUser(user)
      setLoading(false)
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim() || sending) return

    setSending(true)
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })

    if (res.ok) {
      const entry = await res.json()
      setEntries((prev) => [entry, ...prev])
      setMessage("")
    }
    setSending(false)
  }

  async function handleDelete(id) {
    const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE" })
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id))
    }
  }

  return (
    <>
      <h2 className="card-title">{t("guestbook.title")}</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="gb-form">
          <div className="gb-input-row">
            <img src={user.avatar} alt="" className="gb-avatar-input" />
            <input
              type="text"
              className="gb-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("guestbook.placeholder")}
              maxLength={500}
              disabled={sending}
            />
            <button
              type="submit"
              className="gb-send"
              disabled={!message.trim() || sending}
            >
              {t("guestbook.send")}
            </button>
          </div>
        </form>
      ) : (
        <div className="gb-signin">
          <a href="/api/auth/github" className="gb-signin-btn">
            {t("guestbook.signin")}
          </a>
        </div>
      )}

      <div className="gb-list">
        {loading ? (
          <p className="card-text" style={{ textAlign: "center" }}>
            {t("guestbook.loading")}
          </p>
        ) : entries.length === 0 ? (
          <p className="card-text" style={{ textAlign: "center" }}>
            {t("guestbook.empty")}
          </p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="gb-entry">
              <img src={entry.avatar} alt="" className="gb-avatar" />
              <div className="gb-body">
                <div className="gb-header">
                  <span className="gb-username">{entry.username}</span>
                  <span className="gb-time">{timeAgo(entry.created_at)}</span>
                  {user && user.username === entry.username && (
                    <button
                      className="gb-delete"
                      onClick={() => handleDelete(entry.id)}
                      title={t("guestbook.delete")}
                    >
                      ×
                    </button>
                  )}
                </div>
                <p className="gb-message">{entry.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
