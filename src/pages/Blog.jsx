import { useLang } from "../LangContext"

const posts = [
  { slug: "hello-world", title: "Hello World", date: "2026-05-29", excerpt: "First post!", tags: ["thoughts"] },
  { slug: "ctf-writeup", title: "CTF Writeup", date: "2026-05-28", excerpt: "Some CTF stuff...", tags: ["tech"] },
]

export default function Blog() {
  const { t } = useLang()
  return (
    <div className="page">
      <main className="blog-timeline">
        <h1 className="blog-title">{t("blog.title")}</h1>
        <p className="blog-subtitle">{t("blog.desc")}</p>

        <div className="timeline-line" />

        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <div className="blog-card-inner">
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <div className="blog-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="blog-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
