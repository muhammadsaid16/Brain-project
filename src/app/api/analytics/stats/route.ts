import { getAnalyticsSummary } from "@/lib/analytics";
import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = req.headers.get("x-admin-key") || searchParams.get("key") || "";
    const date = searchParams.get("date") || undefined;

    // Check passcode
    if (key !== DEFAULT_ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid admin passcode." },
        { status: 401 }
      );
    }

    const summary = getAnalyticsSummary(date);
    return NextResponse.json({ success: true, data: summary });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
