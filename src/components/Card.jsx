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

  return (
    <section
      id={id}
      className="card"
      style={{
        ...extraStyle,
        gridColumn: spanMap[span] || spanMap[6],
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.85), var(--card))",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: size === "xs" ? 14 : size === "sm" || size === "md" ? 16 : size === "lg" ? 22 : 26,
        boxShadow: "var(--shadow)",
        backdropFilter: "var(--blur)",
        transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
        position: "relative",
        minHeight: heightMap[size] || heightMap.md,
      }}
    >
      <div
        style={{
          content: "",
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 0 20px 20px",
          borderColor: "transparent transparent rgba(47, 127, 176, 0.35) transparent",
          pointerEvents: "none",
        }}
      />
      {children}
    </section>
  )
}
