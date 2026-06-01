import { useState, useMemo, useCallback, useEffect } from "react"

const categories = ["random", "nature", "city", "people"]
const rotations = [-2.5, 1.8, -1.2, 3, -0.5, 2.2, -3.5, 0.8, -1.8]

async function loadAllMetadata() {
  const entries = []
  let id = 0
  for (const cat of categories) {
    try {
      const res = await fetch(`/gallery/${cat}/metadata.json`)
      if (!res.ok) continue
      const map = await res.json()
      for (const [file, desc] of Object.entries(map)) {
        entries.push({ id: ++id, src: `/gallery/${cat}/${file}`, desc, category: cat })
      }
    } catch {
      // skip missing metadata
    }
  }
  return entries
}

export default function Gallery() {
  const [allImages, setAllImages] = useState([])
  const [selected, setSelected] = useState(null)
  const [closing, setClosing] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllMetadata().then((imgs) => {
      setAllImages(imgs)
      setLoading(false)
    })
  }, [])

  const open = useCallback((img) => setSelected(img), [])

  const close = useCallback(() => {
    setClosing(true)
  }, [])

  useEffect(() => {
    if (!closing) return
    const id = setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 250)
    return () => clearTimeout(id)
  }, [closing])

  const visible = useMemo(() => {
    const arr = allImages
      .filter((img) => activeCategory === "all" || img.category === activeCategory)
      .map((img, i) => ({ ...img, rotate: rotations[i % rotations.length] }))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [allImages, activeCategory])

  const catButtons = ["all", ...categories]

  return (
    <div className="page">
      <main
        style={{
          maxWidth: 1000,
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>gallery</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>photos and captures</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {catButtons.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="gallery-cat-btn"
              data-active={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="card-text" style={{ textAlign: "center" }}>loading gallery...</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {visible.map((img, i) => (
              <div
                key={img.id}
                className="polaroid"
                onClick={() => open(img)}
                style={{
                  "--rotate": `${img.rotate}deg`,
                  zIndex: i,
                }}
              >
                <div className="polaroid-img-wrap">
                  <img src={img.src} alt={img.desc} />
                </div>
                <div className="polaroid-caption">{img.desc}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      {(selected || closing) && (
        <div
          onClick={close}
          className={closing ? "modal-overlay-out" : "modal-overlay-in"}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            cursor: "zoom-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={closing ? "modal-content-out" : "modal-content-in"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "14px 14px 18px",
              background: "#faf8f0",
              borderRadius: 4,
              boxShadow: "4px 8px 32px rgba(0,0,0,0.4)",
              maxWidth: "80vw",
            }}
          >
            <img
              src={selected?.src}
              alt={selected?.desc}
              style={{
                maxWidth: "70vw",
                maxHeight: "70vh",
                display: "block",
                background: "#e8e4d8",
              }}
            />
            <div
              style={{
                marginTop: 12,
                fontSize: 22,
                color: "#555",
                fontFamily: '"Caveat", sans-serif',
                letterSpacing: 0.5,
              }}
            >
              {selected?.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
