const tabStyle = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px 28px 14px 20px",
  border: "none",
  fontSize: 16,
  fontWeight: isActive ? 700 : 500,
  color: isActive ? "var(--accent-a)" : "var(--text)",
  background: isActive ? "var(--card-strong)" : "var(--card)",
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderRight: isActive ? "3px solid var(--accent-a)" : "3px solid transparent",
  boxShadow: isActive
    ? "4px 5px 14px rgba(15,37,47,0.2)"
    : "3px 4px 8px rgba(15,37,47,0.08)",
  transition: "all 0.2s ease",
  marginLeft: -2,
})

const pages = [
  { key: "home", label: "home" },
  { key: "gallery", label: "gallery" },
  { key: "blog", label: "blog" },
]

export default function Nav({ page, setPage }) {
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
          style={tabStyle(page === p.key)}
          onMouseEnter={(e) => {
            if (page !== p.key) {
              e.currentTarget.style.background = "var(--card-strong)"
              e.currentTarget.style.boxShadow = "3px 4px 10px rgba(15,37,47,0.15)"
            }
          }}
          onMouseLeave={(e) => {
            if (page !== p.key) {
              e.currentTarget.style.background = "var(--card)"
              e.currentTarget.style.boxShadow = "2px 3px 6px rgba(15,37,47,0.08)"
            }
          }}
        >
          {p.label}
        </button>
      ))}
    </nav>
  )
}
