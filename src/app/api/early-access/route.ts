import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail) {
    return NextResponse.json(
      { ok: false, message: "A valid firm email is required." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Request logged for cohort review."
  });
}
