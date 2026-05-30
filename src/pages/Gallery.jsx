import { useState, useMemo, useCallback, useEffect } from "react"

const images = [
  { id: 1, src: "https://picsum.photos/seed/cheki1/600/600", desc: "a random photo" },
  { id: 2, src: "https://picsum.photos/seed/cheki2/600/600", desc: "another photo" },
  { id: 3, src: "https://picsum.photos/seed/cheki3/600/600", desc: "some scenery" },
  { id: 4, src: "https://picsum.photos/seed/cheki4/600/600", desc: "captured moment" },
  { id: 5, src: "https://picsum.photos/seed/cheki5/600/600", desc: "nice view" },
  { id: 6, src: "https://picsum.photos/seed/cheki6/600/600", desc: "cityscape" },
  { id: 7, src: "https://picsum.photos/seed/cheki7/600/600", desc: "nature" },
  { id: 8, src: "https://picsum.photos/seed/cheki8/600/600", desc: "architecture" },
  { id: 9, src: "https://picsum.photos/seed/cheki9/600/600", desc: "portrait" },
]

const rotations = [-2.5, 1.8, -1.2, 3, -0.5, 2.2, -3.5, 0.8, -1.8]

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [closing, setClosing] = useState(false)

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

  const shuffled = useMemo(() => {
    const arr = images.map((img, i) => ({ ...img, rotate: rotations[i % rotations.length] }))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

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

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {shuffled.map((img, i) => (
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
