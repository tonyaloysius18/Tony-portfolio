const VISITOR_TOTAL_KEY = "portfolio:visitors:total";
const VISITOR_TTL_SECONDS = 60 * 60 * 24 * 365;

type RedisResponse<T> = {
  result?: T;
  error?: string;
};

async function redisCommand<T>(command: Array<string | number>): Promise<T> {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Visitor counter storage is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const payload = (await response.json()) as RedisResponse<T>;
  if (!response.ok || payload.error) {
    throw new Error(payload.error ?? "Visitor counter storage request failed.");
  }

  return payload.result as T;
}

function json(res: any, data: unknown, status = 200) {
  res.status(status);
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.json(data);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return json(res, { error: "Method not allowed" }, 405);
  }

  const visitorId = String(req.headers["x-visitor-id"] ?? "").trim();
  if (!visitorId || !/^[a-f0-9-]{36}$/i.test(visitorId)) {
    return json(res, { error: "Invalid visitor identifier" }, 400);
  }

  try {
    const visitorKey = `portfolio:visitor:${visitorId}`;
    const isNewVisitor = await redisCommand<string | null>([
      "SET",
      visitorKey,
      "1",
      "NX",
      "EX",
      VISITOR_TTL_SECONDS,
    ]);

    const count = isNewVisitor
      ? await redisCommand<number>(["INCR", VISITOR_TOTAL_KEY])
      : Number((await redisCommand<string | number | null>(["GET", VISITOR_TOTAL_KEY])) ?? 0);

    return json(res, { count });
  } catch (error) {
    console.error("Visitor counter error", error);
    return json(res, { error: "Visitor count is temporarily unavailable" }, 503);
  }
}
