"use server";

import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

/**
 * Contact-form schema. Mirrors the field set on the page; everything is
 * validated server-side regardless of client-side checks (form fields are
 * just bytes once they hit the server).
 */
const schema = z.object({
  name: z.string().min(2, "Te rugăm să introduci numele tău complet.").max(120),
  email: z.string().email("Adresa de email nu este validă."),
  subject: z.string().min(3, "Subiectul trebuie să aibă cel puțin 3 caractere.").max(160),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere.").max(4000),
  // Honeypot — real users leave this empty; bots fill every visible-looking field.
  website: z.string().max(0).optional(),
});

export type ContactFormState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

const FALLBACK_FROM = "Seminarul Teologic <onboarding@resend.dev>";

/**
 * Server action invoked by the <form action={sendContact} />. Returns a
 * discriminated union so the client can render success / error states
 * without an additional fetch round-trip.
 */
export async function sendContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return {
      status: "error",
      message: "Verifică încă o dată câmpurile marcate cu roșu.",
      fieldErrors,
    };
  }

  // Honeypot triggered → silent success so bots don't learn anything.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "ok", message: "Mulțumim! Mesajul a fost trimis." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / un-configured prod — log the payload, pretend everything is fine
    // so the form doesn't look broken in the demo. Production should always
    // have RESEND_API_KEY set.
    console.warn(
      "[contact] RESEND_API_KEY is not set — message logged, NOT delivered:",
      parsed.data,
    );
    return {
      status: "ok",
      message:
        "Mesajul tău a fost înregistrat. Vom reveni cu răspuns în scurt timp.",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || FALLBACK_FROM;

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: parsed.data.email,
      subject: `[Contact] ${parsed.data.subject}`,
      text: [
        `De la: ${parsed.data.name} <${parsed.data.email}>`,
        `Subiect: ${parsed.data.subject}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the email:", error);
      return {
        status: "error",
        message:
          "Nu am putut trimite mesajul acum. Te rugăm să încerci din nou peste câteva minute sau să ne suni direct.",
      };
    }
  } catch (err) {
    console.error("[contact] Resend threw:", err);
    return {
      status: "error",
      message:
        "A apărut o eroare la trimitere. Te rugăm să încerci din nou sau să folosești telefonul de contact.",
    };
  }

  return {
    status: "ok",
    message:
      "Mulțumim! Mesajul tău a ajuns la secretariat — vom reveni cât mai curând posibil.",
  };
}
