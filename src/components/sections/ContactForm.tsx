"use client";

import { type ChangeEvent, type FormEvent, useId, useRef, useState } from "react";
import {
  CONTACT_LIMITS,
  type ContactErrors,
  type ContactField,
  type ContactResponse,
  validateContact,
} from "@/lib/contact";
import { AlertIcon, CheckIcon } from "@/components/ui/Icons";

type Values = Record<ContactField, string> & { website: string };
type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: Values = { name: "", email: "", message: "", website: "" };
const fieldOrder: ContactField[] = ["name", "email", "message"];

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const baseId = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<string>("");
  const [showFallback, setShowFallback] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const idFor = (field: ContactField) => `${baseId}-${field}`;

  const onChange =
    (field: keyof Values) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      if (field !== "website" && errors[field]) {
        setErrors((previous) => ({ ...previous, [field]: undefined }));
      }
    };

  const focusFirstInvalid = (nextErrors: ContactErrors) => {
    const first = fieldOrder.find((field) => nextErrors[field]);
    if (first)
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(idFor(first))}`)
        ?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setNotice("");
      focusFirstInvalid(nextErrors);
      return;
    }

    setStatus("submitting");
    setNotice("");
    setShowFallback(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data: ContactResponse | null = null;
      try {
        data = (await response.json()) as ContactResponse;
      } catch {
        data = null;
      }

      if (response.ok && data && data.ok === true) {
        setValues(emptyValues);
        setErrors({});
        setStatus("success");
        return;
      }

      const failure = data && data.ok !== true ? data : null;
      if (failure?.fieldErrors) {
        setErrors(failure.fieldErrors);
        focusFirstInvalid(failure.fieldErrors);
      }
      setNotice(failure?.error ?? "Something went wrong sending that.");
      setShowFallback(
        failure?.code === "not_configured" ||
          failure?.code === "delivery_failed" ||
          !failure,
      );
      setStatus("error");
    } catch {
      setNotice("I couldn't reach the server. Check your connection and try again.");
      setShowFallback(true);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[22rem] flex-col items-start justify-center gap-5 p-2 sm:p-4"
      >
        <span className="text-brand-ink inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]">
          <CheckIcon size={24} />
        </span>
        <h3 className="text-2xl font-semibold tracking-[-0.03em]">Message sent.</h3>
        <p className="text-muted max-w-md leading-relaxed">
          Thanks for getting in touch. I read everything that comes in and will reply to
          the email you gave.
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setStatus("idle");
            setNotice("");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="space-y-5"
    >
      <Field
        id={idFor("name")}
        label="Name"
        error={errors.name}
        input={
          <input
            id={idFor("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax + 20}
            value={values.name}
            onChange={onChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idFor("name")}-error` : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        }
      />
      <Field
        id={idFor("email")}
        label="Email"
        error={errors.email}
        input={
          <input
            id={idFor("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={onChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idFor("email")}-error` : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        }
      />
      <Field
        id={idFor("message")}
        label="Message"
        error={errors.message}
        hint={`${values.message.trim().length} / ${CONTACT_LIMITS.messageMax}`}
        input={
          <textarea
            id={idFor("message")}
            name="message"
            rows={6}
            value={values.message}
            onChange={onChange("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${idFor("message")}-error` : undefined}
            className={`${inputClass(Boolean(errors.message))} resize-y`}
          />
        }
      />

      {/* Honeypot: invisible to people and skipped by keyboard and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Leave this field empty
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={onChange("website")}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
        <p className="text-muted text-sm">I reply to the email you enter.</p>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status === "error" && notice && (
          <p className="text-foreground bg-surface-raised/60 flex items-start gap-3 rounded-2xl border border-[var(--violet)]/50 p-4 text-sm leading-relaxed">
            <AlertIcon size={18} className="mt-0.5 shrink-0 text-[var(--violet)]" />
            <span>
              {notice}
              {showFallback && (
                <>
                  {" "}
                  You can email me directly at{" "}
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="text-cyan font-semibold underline underline-offset-4"
                  >
                    {fallbackEmail}
                  </a>
                  . Nothing you typed has been lost.
                </>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `bg-background/60 w-full rounded-xl border px-4 py-3 text-base transition-colors placeholder:text-muted/60 hover:border-border-strong ${
    invalid ? "border-[var(--violet)]" : ""
  }`;
}

function Field({
  id,
  label,
  error,
  hint,
  input,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && <span className="text-muted font-mono text-xs">{hint}</span>}
      </div>
      {input}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[var(--violet)]">
          {error}
        </p>
      )}
    </div>
  );
}
