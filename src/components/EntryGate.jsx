import { useState } from "react"

export default function EntryGate() {
  const [hidden, setHidden] = useState(false)

  return (
    <div
      className="entry-gate"
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(800px 600px at center, rgba(255,255,255,0.6), rgba(202,216,221,0.95))",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
        transition: "opacity 0.35s ease, visibility 0.35s ease",
        opacity: hidden ? 0 : 1,
        visibility: hidden ? "hidden" : "visible",
        cursor: "pointer",
      }}
      onClick={() => setHidden(true)}
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
          enter site
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 14,
            margin: 0,
          }}
        >
          click anywhere to unlock motion
        </p>
      </div>
    </div>
  )
}
