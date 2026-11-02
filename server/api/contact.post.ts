import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, subject: 200, content: 1500 };

// Naive in-memory rate limit: 5 messages per IP per hour (single container)
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Prevent header injection through display name / subject
const singleLine = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const name = singleLine(String(body?.name ?? ""));
    const email = String(body?.email ?? "").trim();
    const subject = singleLine(String(body?.subject ?? ""));
    const content = String(body?.content ?? "").trim();

    // Honeypot: bots fill the hidden "website" field. Pretend success.
    if (body?.website) {
      return { success: true };
    }

    if (!name || !email || !subject || !content) {
      throw createError({ statusCode: 400, statusMessage: "Missing fields" });
    }

    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      subject.length > LIMITS.subject ||
      content.length > LIMITS.content ||
      !EMAIL_RE.test(email)
    ) {
      throw createError({ statusCode: 400, statusMessage: "Invalid fields" });
    }

    const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
    if (isRateLimited(ip)) {
      throw createError({ statusCode: 429, statusMessage: "Too many requests" });
    }

    const config = useRuntimeConfig();

    if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
      throw createError({ statusCode: 500, statusMessage: "SMTP not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: Number(config.smtpPort) || 587,
      secure: config.smtpSecure === "true",
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    await transporter.sendMail({
      from: { name, address: config.smtpUser },
      replyTo: email,
      to: config.contactEmail,
      subject: `[Portfolio] ${subject}`,
      text: `De : ${name} (${email})\n\n${content}`,
      html: `<p><strong>De :</strong> ${escapeHtml(name)} (<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>)</p><p>${escapeHtml(content).replace(/\n/g, "<br>")}</p>`,
    });

    return { success: true };
  } catch (err: any) {
    console.error("[contact] Error:", err);
    // Don't leak internal error messages (SMTP details...) to the client
    throw createError({
      statusCode: err.statusCode ?? 500,
      statusMessage: err.statusCode ? err.statusMessage : "Internal error",
    });
  }
});
