import redis from "../lib/redis.js"

export async function DELETE(request, { params }) {
  const { id } = await params

  const cookie = request.headers.get("cookie") || ""
  const match = cookie.match(/gb_session=([^;]+)/)

  if (!match) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  let user
  try {
    user = JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return Response.json({ error: "Invalid session" }, { status: 401 })
  }

  try {
    const entries = await redis.lrange("guestbook", 0, -1)
    if (!entries || !Array.isArray(entries)) {
      return Response.json({ error: "No entries" }, { status: 404 })
    }

    const entry = entries
      .map((e) => { try { return JSON.parse(e) } catch { return null } })
      .find((e) => e && e.id === id)

    if (!entry) {
      return Response.json({ error: "Not found" }, { status: 404 })
    }

    if (entry.username !== user.username) {
      return Response.json({ error: "Forbidden" }, { status: 403 })
    }

    await redis.lrem("guestbook", 1, JSON.stringify(entry))

    return Response.json({ ok: true })
  } catch (err) {
    console.error("guestbook DELETE error:", err)
    return Response.json({ error: "Failed to delete entry" }, { status: 500 })
  }
}
