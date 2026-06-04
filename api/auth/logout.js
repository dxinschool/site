export function GET() {
  const response = Response.redirect("/", 302)
  response.headers.append(
    "Set-Cookie",
    "gb_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  )
  return response
}
