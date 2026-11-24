import fs from "node:fs";
import path from "node:path";

export interface VisitorLog {
  id: string;
  visitorId: string;
  timestamp: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  device: "Desktop" | "Mobile" | "Tablet" | "Unknown";
  browser: string;
  os: string;
  language: string;
  path: string;
  referrer: string;
}

export interface DayStats {
  date: string;
  uniqueVisitors: number;
  pageviews: number;
  visitorIds: string[];
}

export interface AnalyticsData {
  totalUniqueVisitors: number;
  totalPageviews: number;
  daily: Record<string, DayStats>;
  recentVisits: VisitorLog[];
  uniqueVisitorIds: string[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

// Helper to ensure data directory and file exist
function getStorage(): AnalyticsData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial: AnalyticsData = {
        totalUniqueVisitors: 0,
        totalPageviews: 0,
        daily: {},
        recentVisits: [],
        uniqueVisitorIds: [],
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as AnalyticsData;
  } catch (err) {
    console.error("Error reading analytics file:", err);
    return {
      totalUniqueVisitors: 0,
      totalPageviews: 0,
      daily: {},
      recentVisits: [],
      uniqueVisitorIds: [],
    };
  }
}

function saveStorage(data: AnalyticsData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving analytics data:", err);
  }
}

// Parse device, browser, OS from user agent string
export function parseUserAgent(ua: string): {
  device: "Desktop" | "Mobile" | "Tablet" | "Unknown";
  browser: string;
  os: string;
} {
  const agent = (ua || "").toLowerCase();

  // Device
  let device: "Desktop" | "Mobile" | "Tablet" | "Unknown" = "Desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(agent)) {
    device = "Tablet";
  } else if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      agent
    )
  ) {
    device = "Mobile";
  }

  // OS
  let os = "Unknown";
  if (agent.includes("windows")) os = "Windows";
  else if (agent.includes("macintosh") || agent.includes("mac os")) os = "macOS";
  else if (agent.includes("android")) os = "Android";
  else if (agent.includes("iphone") || agent.includes("ipad")) os = "iOS";
  else if (agent.includes("linux")) os = "Linux";

  // Browser
  let browser = "Other";
  if (agent.includes("edg/")) browser = "Edge";
  else if (agent.includes("chrome") && !agent.includes("edg/")) browser = "Chrome";
  else if (agent.includes("safari") && !agent.includes("chrome")) browser = "Safari";
  else if (agent.includes("firefox")) browser = "Firefox";
  else if (agent.includes("opera") || agent.includes("opr/")) browser = "Opera";

  return { device, browser, os };
}

// Record a new visit event
export async function recordVisit(input: {
  visitorId: string;
  userAgent: string;
  language?: string;
  path?: string;
  referrer?: string;
}): Promise<{ isNewVisitor: boolean; isNewDayVisitor: boolean }> {
  const storage = getStorage();
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const timeStr = now.toTimeString().split(" ")[0]; // HH:mm:ss

  const visitorId = input.visitorId || `v_${Math.random().toString(36).substring(2, 10)}`;
  const { device, browser, os } = parseUserAgent(input.userAgent);

  const isGlobalNewVisitor = !storage.uniqueVisitorIds.includes(visitorId);
  if (isGlobalNewVisitor) {
    storage.uniqueVisitorIds.push(visitorId);
    storage.totalUniqueVisitors += 1;
  }

  // Daily stats initialization
  if (!storage.daily[dateStr]) {
    storage.daily[dateStr] = {
      date: dateStr,
      uniqueVisitors: 0,
      pageviews: 0,
      visitorIds: [],
    };
  }

  const dayObj = storage.daily[dateStr];
  const isDayNewVisitor = !dayObj.visitorIds.includes(visitorId);

  if (isDayNewVisitor) {
    dayObj.visitorIds.push(visitorId);
    dayObj.uniqueVisitors += 1;
  }

  dayObj.pageviews += 1;
  storage.totalPageviews += 1;

  // Add to recent activity log
  const newLog: VisitorLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    visitorId,
    timestamp: now.toISOString(),
    date: dateStr,
    time: timeStr,
    device,
    browser,
    os,
    language: (input.language || "en").substring(0, 5),
    path: input.path || "/",
    referrer: input.referrer || "direct",
  };

  storage.recentVisits.unshift(newLog);
  // Keep last 300 logs to preserve fast read/write
  if (storage.recentVisits.length > 300) {
    storage.recentVisits = storage.recentVisits.slice(0, 300);
  }

  saveStorage(storage);

  return {
    isNewVisitor: isGlobalNewVisitor,
    isNewDayVisitor: isDayNewVisitor,
  };
}

// Retrieve aggregated stats + specific day inspection
export function getAnalyticsSummary(specificDate?: string) {
  const storage = getStorage();
  const todayStr = new Date().toISOString().split("T")[0];

  const todayStats = storage.daily[todayStr] || {
    date: todayStr,
    uniqueVisitors: 0,
    pageviews: 0,
    visitorIds: [],
  };

  // Convert daily stats to sorted list
  const dailyList = Object.values(storage.daily)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((d) => ({
      date: d.date,
      uniqueVisitors: d.uniqueVisitors,
      pageviews: d.pageviews,
    }));

  // Selected Day specific details
  let selectedDayDetails = null;
  const targetDate = specificDate || todayStr;
  if (storage.daily[targetDate]) {
    const rawDay = storage.daily[targetDate];
    const dayVisits = storage.recentVisits.filter((v) => v.date === targetDate);
    selectedDayDetails = {
      date: targetDate,
      uniqueVisitors: rawDay.uniqueVisitors,
      pageviews: rawDay.pageviews,
      visits: dayVisits,
    };
  } else {
    selectedDayDetails = {
      date: targetDate,
      uniqueVisitors: 0,
      pageviews: 0,
      visits: [],
    };
  }

  // Device & Browser distributions
  const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0, Unknown: 0 };
  const browserCounts: Record<string, number> = {};

  for (const visit of storage.recentVisits) {
    deviceCounts[visit.device] = (deviceCounts[visit.device] || 0) + 1;
    browserCounts[visit.browser] = (browserCounts[visit.browser] || 0) + 1;
  }

  return {
    totalUniqueVisitors: storage.totalUniqueVisitors,
    totalPageviews: storage.totalPageviews,
    today: {
      date: todayStr,
      uniqueVisitors: todayStats.uniqueVisitors,
      pageviews: todayStats.pageviews,
    },
    selectedDay: selectedDayDetails,
    dailyList,
    deviceCounts,
    browserCounts,
    recentVisits: storage.recentVisits.slice(0, 50),
  };
}

// Reset all analytics data (clears test/seed logs)
export function resetAnalyticsData(): AnalyticsData {
  const empty: AnalyticsData = {
    totalUniqueVisitors: 0,
    totalPageviews: 0,
    daily: {},
    recentVisits: [],
    uniqueVisitorIds: [],
  };
  saveStorage(empty);
  return empty;
}
