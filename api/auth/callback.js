export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const origin = url.origin

  if (!code) {
    return new Response("Missing code", { status: 400 })
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const { access_token } = await tokenRes.json()

  if (!access_token) {
    return new Response("Failed to get access token", { status: 401 })
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  })
  const user = await userRes.json()

  const session = JSON.stringify({
    username: user.login,
    avatar: user.avatar_url,
  })

  const response = Response.redirect(`${origin}/`, 302)

  const cookie = encodeURIComponent(session)

  response.headers.append(
    "Set-Cookie",
    `gb_session=${cookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
  )

  return response
}
