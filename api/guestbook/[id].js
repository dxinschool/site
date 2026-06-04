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

  const entries = await redis.lrange("guestbook", 0, -1)
  const entry = entries.map((e) => JSON.parse(e)).find((e) => e.id === id)

  if (!entry) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  if (entry.username !== user.username) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await redis.lrem("guestbook", 1, JSON.stringify(entry))

  return Response.json({ ok: true })
}
