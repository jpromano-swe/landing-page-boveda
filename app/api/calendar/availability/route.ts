import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "https://backend-landing-boveda-production.up.railway.app";
const rawApiUrl =
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BACKEND_URL;
const apiUrlWithProtocol = /^https?:\/\//i.test(rawApiUrl)
  ? rawApiUrl
  : `https://${rawApiUrl}`;
const API_URL = apiUrlWithProtocol.replace(/\/+$/, "");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") ?? "10";

  try {
    const response = await fetch(`${API_URL}/calendar/availability?days=${days}`, {
      cache: "no-store",
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "backend_unreachable" },
      { status: 502 }
    );
  }
}
