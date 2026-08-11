import { NextResponse } from "next/server";

/**
 * Booking intake.
 *
 * TODO before launch: forward the validated payload to the clinic's CRM or
 * medical information system. Right now the route validates and acknowledges
 * so the form has a real success and failure path, but nothing is persisted.
 * Do not ship this to production without a destination: a patient who sees
 * "заявка принята" expects a call back.
 *
 * The payload is personal data under 152-FZ. Whatever destination is wired in
 * must be covered by the clinic's processing agreement.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "malformed body" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone : "";
  const consent = data.consent === true;

  if (name.length < 2) {
    return NextResponse.json({ error: "name too short" }, { status: 422 });
  }
  if (phone.replace(/\D/g, "").length !== 11) {
    return NextResponse.json({ error: "phone incomplete" }, { status: 422 });
  }
  if (!consent) {
    return NextResponse.json({ error: "consent required" }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}
