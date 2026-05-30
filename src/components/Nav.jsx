import { useState } from "react"

const tabStyle = (isActive, hovered) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px 32px 14px 20px",
  border: "none",
  fontSize: 24,
  fontFamily: '"Caveat", sans-serif',
  fontWeight: isActive ? 700 : 500,
  color: isActive ? "var(--accent-a)" : hovered ? "var(--text)" : "var(--text)",
  background: hovered ? "var(--card-strong)" : isActive ? "var(--card-strong)" : "var(--card)",
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderRight: isActive || hovered ? "3px solid var(--accent-a)" : "3px solid transparent",
  boxShadow: "4px 5px 14px rgba(15,37,47,0.2)",
  transform: hovered ? "translateX(6px)" : isActive ? "translateX(4px)" : "translateX(0)",
  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
  marginLeft: -2,
})

const pages = [
  { key: "home", label: "home" },
  { key: "gallery", label: "gallery" },
  { key: "blog", label: "blog" },
]

export default function Nav({ page, setPage }) {
  const [hovered, setHovered] = useState(null)

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 100,
      }}
    >
      {pages.map((p) => (
        <button
          key={p.key}
          onClick={() => setPage(p.key)}
          style={tabStyle(page === p.key, hovered === p.key)}
          onMouseEnter={() => setHovered(p.key)}
          onMouseLeave={() => setHovered(null)}
        >
          {p.label}
        </button>
      ))}
    </nav>
  )
}
