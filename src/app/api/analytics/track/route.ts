import { recordVisit } from "@/lib/analytics";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get("user-agent") || "";
    const acceptLanguage = req.headers.get("accept-language") || "en";

    const visitorId = body.visitorId || "";
    const path = body.path || "/";
    const referrer = body.referrer || "direct";
    const language = body.language || acceptLanguage.split(",")[0] || "en";

    const result = await recordVisit({
      visitorId,
      userAgent,
      language,
      path,
      referrer,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ success: false, error: "Tracking failed" }, { status: 500 });
  }
}
