"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { sendContact, type ContactFormState } from "@/app/contact/actions";

const initial: ContactFormState = { status: "idle" };

/**
 * The contact form. Client-side: native HTML validation + a useActionState
 * round-trip to the server action. Server-side: zod schema + Resend send.
 * Errors are surfaced per-field; success message replaces the form so
 * users get clear confirmation.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContact, initial);

  if (state.status === "ok") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto mb-3 size-12 text-emerald-600"
          strokeWidth={1.5}
        />
        <h3 className="font-serif text-2xl font-semibold text-navy">
          Mesaj trimis
        </h3>
        <p className="mt-3 text-pretty text-ink/80">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-5 rounded-2xl border border-navy/10 bg-paper p-6 sm:p-8"
    >
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <Field
        name="name"
        label="Nume complet"
        placeholder="ex. Ionescu Mihai"
        autoComplete="name"
        required
        errors={fieldError(state, "name")}
      />

      <Field
        name="email"
        type="email"
        label="Adresă de email"
        placeholder="ex. ionescu@example.com"
        autoComplete="email"
        required
        errors={fieldError(state, "email")}
      />

      <Field
        name="subject"
        label="Subiect"
        placeholder="ex. Informații despre admitere"
        required
        errors={fieldError(state, "subject")}
      />

      <div className="space-y-2">
        <Label htmlFor="message">Mesaj</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Scrie-ne ce te interesează — răspundem în 1–2 zile lucrătoare."
          required
          minLength={10}
          maxLength={4000}
          aria-invalid={!!fieldError(state, "message")}
          aria-describedby={
            fieldError(state, "message") ? "message-error" : undefined
          }
          className="min-h-32 resize-y"
        />
        {fieldError(state, "message") && (
          <p id="message-error" className="text-xs font-medium text-red-600">
            {fieldError(state, "message")}
          </p>
        )}
      </div>

      {/* Honeypot — hidden via tabindex + autocomplete off, screen readers
          announce nothing because the wrapper itself is aria-hidden. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px]">
        <label>
          Website (nu completa)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className={cn(
          "w-full bg-gold text-navy-deep hover:bg-gold-light",
          "data-disabled:opacity-60",
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Se trimite...
          </>
        ) : (
          <>
            <Send className="size-4" strokeWidth={1.75} />
            Trimite mesajul
          </>
        )}
      </Button>

      <p className="text-xs text-muted">
        Datele introduse sunt folosite exclusiv pentru a-ți răspunde la
        întrebare. Nu sunt partajate cu terți.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  errors,
  type = "text",
  ...rest
}: {
  name: string;
  label: string;
  errors?: string;
  type?: string;
} & Omit<React.ComponentProps<typeof Input>, "id" | "name" | "type">) {
  const errorId = `${name}-error`;
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        aria-invalid={!!errors}
        aria-describedby={errors ? errorId : undefined}
        {...rest}
      />
      {errors && (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {errors}
        </p>
      )}
    </div>
  );
}

function fieldError(state: ContactFormState, key: string): string | undefined {
  if (state.status !== "error") return;
  return state.fieldErrors?.[key]?.[0];
}
