import { Resend } from "resend";
import type { ContactInput } from "./validations";

const projectLabels: Record<ContactInput["projectType"], string> = {
  website: "Website / landing page",
  ecommerce: "E-commerce",
  "web-app": "Aplicação web",
  other: "Outro",
};

const budgetLabels: Record<ContactInput["budget"], string> = {
  "1500-2999": "1.500 € a 2.999 €",
  "3000-5999": "3.000 € a 5.999 €",
  "6000-14999": "6.000 € a 14.999 €",
  "15000-plus": "15.000 € ou mais",
  unsure: "Por definir",
};

const timelineLabels: Record<ContactInput["timeline"], string> = {
  asap: "Assim que possível",
  "1-3-months": "1 a 3 meses",
  "3-6-months": "3 a 6 meses",
  flexible: "Flexível",
};

export async function sendContactEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error("Missing email environment variables");
  }

  const resend = new Resend(apiKey);
  const subject = `[WebFusionLab] Pedido de proposta: ${projectLabels[data.projectType]} | ${data.name}`;
  const text = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Empresa: ${data.company || "Não indicada"}`,
    `Projeto: ${projectLabels[data.projectType]}`,
    `Orçamento: ${budgetLabels[data.budget]}`,
    `Prazo: ${timelineLabels[data.timeline]}`,
    `Idioma: ${data.locale || "Não indicado"}`,
    "",
    "Descrição:",
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
