import { useState, useEffect, useMemo } from "react"
import { useLang } from "../LangContext"

const categories = ["blog", "writeup"]

async function loadAllMetadata() {
  const entries = []
  let id = 0
  for (const cat of categories) {
    try {
      const res = await fetch(`/blog/${cat}/metadata.json`)
      if (!res.ok) continue
      const map = await res.json()
      for (const [slug, data] of Object.entries(map)) {
        entries.push({ id: ++id, slug, ...data, category: cat })
      }
    } catch {
      // skip missing metadata
    }
  }
  return entries
}

export default function Blog() {
  const { t } = useLang()
  const [allPosts, setAllPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState("blog")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllMetadata().then((posts) => {
      setAllPosts(posts)
      setLoading(false)
    })
  }, [])

  const visible = useMemo(() => {
    return allPosts
      .filter((p) => p.category === activeCategory)
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [allPosts, activeCategory])

  const catButtons = categories

  return (
    <div className="page">
      <main className="blog-timeline">
        <h1 className="blog-title">{t("blog.title")}</h1>
        <p className="blog-subtitle">{t("blog.desc")}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
            {catButtons.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="gallery-cat-btn"
              data-active={activeCategory === cat}
            >
              {t(`blog.cat.${cat}`)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="card-text" style={{ textAlign: "center" }}>{t("blog.loading")}</p>
        ) : visible.length === 0 ? (
          <p className="card-text" style={{ textAlign: "center" }}>{t("blog.empty")}</p>
        ) : (
          <>
            <div className="timeline-line" />

            {visible.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-inner">
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span className="blog-date">{post.date}</span>
                      <div className="blog-tags">
                        {post.tags?.map((tag) => (
                          <span key={tag} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                  </div>
                </div>
              </article>
            ))}
          </>
        )}
      </main>
    </div>
  )
}
