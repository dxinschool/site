import redis from "../lib/redis.js"

export async function GET() {
  try {
    const entries = await redis.lrange("guestbook", 0, -1)
    const parsed = entries.map((e) => JSON.parse(e)).reverse()
    return Response.json(parsed)
  } catch {
    return Response.json([], { status: 500 })
  }
}

export async function POST(request) {
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

  const { message } = await request.json()

  if (!message || !message.trim()) {
    return Response.json({ error: "Message required" }, { status: 400 })
  }

  const entry = {
    id: crypto.randomUUID(),
    username: user.username,
    avatar: user.avatar,
    message: message.trim().slice(0, 500),
    created_at: new Date().toISOString(),
  }

  await redis.lpush("guestbook", JSON.stringify(entry))

  return Response.json(entry, { status: 201 })
}
