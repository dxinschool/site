import { useState } from "react"
import { useLang } from "../LangContext"

export default function EntryGate({ onEnter }) {
  const { t } = useLang()
  const [leaving, setLeaving] = useState(false)

  function handleClick() {
    setLeaving(true)
    setTimeout(onEnter, 300)
  }

  return (
    <div
      className={leaving ? "entry-gate hide" : "entry-gate"}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(800px 600px at center, rgba(255,255,255,0.6), rgba(202,216,221,0.95))",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "var(--blur)",
          borderRadius: 18,
          padding: "26px 32px",
          textAlign: "center",
          boxShadow: "var(--shadow)",
        }}
      >
        <h1
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 44,
            letterSpacing: 1,
            margin: "0 0 6px",
          }}
        >
          {t("entry.title")}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 22,
            margin: 0,
          }}
        >
          {t("entry.hint")}
        </p>
      </div>
    </div>
  )
}
