export function GET(request) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const origin = new URL(request.url).origin
  const redirectUri = `${origin}/api/auth/callback`

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`

  return Response.redirect(githubAuthUrl, 302)
}
