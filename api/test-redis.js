import redis from "../lib/redis.js"

export async function GET() {
  try {
    // write a test entry
    const test = { test: true, timestamp: Date.now(), message: "hello from test" }
    await redis.lpush("test:entries", JSON.stringify(test))

    // read it back
    const entries = await redis.lrange("test:entries", 0, -1)
    const parsed = (entries || []).map(e => {
      try { return JSON.parse(e) } catch { return null }
    })

    // cleanup
    await redis.del("test:entries")

    return Response.json({
      ok: true,
      entries: parsed.filter(Boolean),
      env_url_set: !!process.env.UPSTASH_REDIS_REST_URL,
      env_token_set: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  } catch (err) {
    return Response.json({
      ok: false,
      error: err.message,
      stack: err.stack?.split("\n").slice(0, 3).join("\n"),
      env_url_set: !!process.env.UPSTASH_REDIS_REST_URL,
      env_token_set: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    }, { status: 500 })
  }
}
