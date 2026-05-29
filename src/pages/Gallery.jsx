import { useState } from "react"

const images = [
  { id: 1, src: "https://picsum.photos/seed/1/600/600", desc: "a random photo" },
  { id: 2, src: "https://picsum.photos/seed/2/600/600", desc: "another photo" },
  { id: 3, src: "https://picsum.photos/seed/3/600/600", desc: "some scenery" },
  { id: 4, src: "https://picsum.photos/seed/4/600/600", desc: "captured moment" },
  { id: 5, src: "https://picsum.photos/seed/5/600/600", desc: "nice view" },
  { id: 6, src: "https://picsum.photos/seed/6/600/600", desc: "cityscape" },
  { id: 7, src: "https://picsum.photos/seed/7/600/600", desc: "nature" },
  { id: 8, src: "https://picsum.photos/seed/8/600/600", desc: "architecture" },
  { id: 9, src: "https://picsum.photos/seed/9/600/600", desc: "portrait" },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="page">

      <main style={{ maxWidth: 900, margin: "60px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>gallery</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>photos and captures</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelected(img)}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-a)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img
                  src={img.src}
                  alt={img.desc}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "10px 12px 12px", fontSize: 13, color: "var(--muted)" }}>
                {img.desc}
              </div>
            </div>
          ))}
        </div>
      </main>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            cursor: "zoom-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--card-bg)",
            }}
          >
            <img
              src={selected.src}
              alt={selected.desc}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
              }}
            />
            <div style={{ padding: "12px 16px", fontSize: 14, color: "var(--text)" }}>
              {selected.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
