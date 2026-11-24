import { resetAnalyticsData } from "@/lib/analytics";
import { type NextRequest, NextResponse } from "next/server";

const DEFAULT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const key = req.headers.get("x-admin-key") || body.key || "";

    if (key !== DEFAULT_ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid admin passcode." },
        { status: 401 }
      );
    }

    const resetData = resetAnalyticsData();
    return NextResponse.json({
      success: true,
      message: "All analytics seed and visitor logs cleared successfully",
      data: resetData,
    });
  } catch (error) {
    console.error("Analytics reset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset analytics" },
      { status: 500 }
    );
  }
}
