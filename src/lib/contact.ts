// Shared by the contact form (client) and the route handler (server) so both
// sides enforce exactly the same rules.

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 4000,
} as const;

export type ContactField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(
  values: Partial<Record<ContactField, unknown>>,
): ContactErrors {
  const errors: ContactErrors = {};
  const name = asTrimmedString(values.name);
  const email = asTrimmedString(values.email);
  const message = asTrimmedString(values.message);

  if (name.length < CONTACT_LIMITS.nameMin) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_LIMITS.nameMax} characters or fewer.`;
  }

  if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.emailMax) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`;
  }

  return errors;
}

export type ContactResponse =
  | { ok: true }
  | {
      ok?: false;
      error: string;
      code:
        "bad_request" | "invalid" | "too_large" | "not_configured" | "delivery_failed";
      fieldErrors?: ContactErrors;
    };
