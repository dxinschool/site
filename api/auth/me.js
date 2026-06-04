export function GET(request) {
  const cookie = request.headers.get("cookie") || ""
  const match = cookie.match(/gb_session=([^;]+)/)

  if (!match) {
    return Response.json({ user: null })
  }

  try {
    const user = JSON.parse(decodeURIComponent(match[1]))
    return Response.json({ user })
  } catch {
    return Response.json({ user: null })
  }
}
