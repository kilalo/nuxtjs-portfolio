import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, subject, content } = body;

  if (!name || !email || !subject || !content) {
    throw createError({ statusCode: 400, statusMessage: "Missing fields" });
  }

  const config = useRuntimeConfig();

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
    from: `"${name}" <${config.smtpUser}>`,
    replyTo: email,
    to: config.contactEmail,
    subject: `[Portfolio] ${subject}`,
    text: `De : ${name} (${email})\n\n${content}`,
    html: `<p><strong>De :</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p><p>${content.replace(/\n/g, "<br>")}</p>`,
  });

  return { success: true };
});
