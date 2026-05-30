export default function Card({
  children,
  span,
  size = "md",
  id,
  style: extraStyle,
}) {
  const spanMap = {
    2: "span 2",
    3: "span 3",
    4: "span 4",
    5: "span 5",
    6: "span 6",
    7: "span 7",
    8: "span 8",
    9: "span 9",
    10: "span 10",
    11: "span 11",
    12: "span 12",
  }

  const heightMap = {
    xs: "140px",
    sm: "170px",
    md: "200px",
    lg: "230px",
    xl: "260px",
  }

  const paperNoise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.08'/></svg>")`

  return (
    <section
      id={id}
      className="card"
      style={{
        gridColumn: spanMap[span] || spanMap[6],
        background: `${paperNoise}, linear-gradient(165deg, rgba(255,255,250,0.92), rgba(235, 240, 242, 0.88))`,
        border: "1px solid var(--border)",
        borderRadius: "3px",
        padding: size === "xs" ? 14 : size === "sm" || size === "md" ? 16 : size === "lg" ? 22 : 26,
        boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        position: "relative",
        minHeight: heightMap[size] || heightMap.md,
        ...extraStyle,
      }}
    >
      {children}
    </section>
  )
}
