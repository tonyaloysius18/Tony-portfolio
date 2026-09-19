const DEFAULT_TO = "ynotlabs.dev@gmail.com";
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function json(res: any, data: unknown, status = 200) {
  res.status(status);
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.json(data);
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").replace(/\r/g, "").trim().slice(0, maxLength);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return json(res, { error: "Method not allowed" }, 405);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return json(res, { error: "Contact email is not configured" }, 503);
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

  // Honeypot: bots fill the hidden field. Pretend success so they move on.
  if (clean(body._honey, 100)) return json(res, { ok: true });

  const name = clean(body.name, 120).replace(/\n/g, " ");
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return json(res, { error: "Invalid form data" }, 400);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO ?? DEFAULT_TO],
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
      }),
    });

    if (!response.ok) {
      console.error("Contact email error", response.status, await response.text());
      return json(res, { error: "Message could not be sent" }, 502);
    }

    return json(res, { ok: true });
  } catch (error) {
    console.error("Contact email error", error);
    return json(res, { error: "Message could not be sent" }, 502);
  }
}
