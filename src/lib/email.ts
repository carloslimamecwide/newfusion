import { Resend } from "resend";
import type { ContactInput } from "./validations";

export async function sendContactEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error("Missing email environment variables");
  }

  const resend = new Resend(apiKey);
  const subject = `[WebFusionLab] Contacto de ${data.name}`;

  const text = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa: ${data.company || "—"}`,
    `Serviço: ${data.service || "—"}`,
    `Locale: ${data.locale || "—"}`,
    "",
    data.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
  });

  if (error) throw error;
}
