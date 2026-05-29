const posts = [
  { slug: "hello-world", title: "Hello World", date: "2026-05-29", excerpt: "First post!" },
  { slug: "ctf-writeup", title: "CTF Writeup", date: "2026-05-28", excerpt: "Some CTF stuff..." },
]

export default function Blog() {
  return (
    <div className="page">

      <main style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>blog</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>thoughts and writeups</p>

        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              padding: "20px 24px",
              marginBottom: 12,
              borderRadius: 12,
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-a)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{post.date}</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{post.title}</h2>
            <p style={{ fontSize: 14, color: "var(--text)", margin: "6px 0 0", opacity: 0.8 }}>{post.excerpt}</p>
          </article>
        ))}
      </main>
    </div>
  )
}
