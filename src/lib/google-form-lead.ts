export type LeadPayload = {
  name: string;
  phone: string;
  city: string;
  stream: string;
};

/** True when env has the form action URL and required entry IDs (name, phone, city). */
export function isGoogleFormConfigured(): boolean {
  const action = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL;
  const name = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME;
  const phone = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_PHONE;
  const city = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_CITY;
  return Boolean(action?.trim() && name?.trim() && phone?.trim() && city?.trim());
}

/**
 * POSTs lead data to a Google Form; responses appear in the linked Google Sheet.
 * Uses no-cors (required by Google); the browser cannot read the response body.
 */
export async function submitLeadToGoogleForm(data: LeadPayload): Promise<void> {
  const action = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL!.trim();
  const nameEntry = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME!.trim();
  const phoneEntry = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_PHONE!.trim();
  const cityEntry = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_CITY!.trim();
  const streamEntry = process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_STREAM?.trim();

  const body = new URLSearchParams();
  body.set(nameEntry, data.name);
  body.set(phoneEntry, data.phone);
  body.set(cityEntry, data.city);
  if (streamEntry) body.set(streamEntry, data.stream.trim() || "—");

  await fetch(action, {
    method: "POST",
    mode: "no-cors",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}
