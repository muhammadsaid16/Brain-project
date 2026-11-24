"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Globe,
  KeyRound,
  Languages,
  Laptop,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface VisitorLog {
  id: string;
  visitorId: string;
  timestamp: string;
  date: string;
  time: string;
  device: "Desktop" | "Mobile" | "Tablet" | "Unknown";
  browser: string;
  os: string;
  language: string;
  path: string;
  referrer: string;
}

interface DaySummary {
  date: string;
  uniqueVisitors: number;
  pageviews: number;
}

interface SelectedDayDetails {
  date: string;
  uniqueVisitors: number;
  pageviews: number;
  visits: VisitorLog[];
}

interface AnalyticsStats {
  totalUniqueVisitors: number;
  totalPageviews: number;
  today: {
    date: string;
    uniqueVisitors: number;
    pageviews: number;
  };
  selectedDay: SelectedDayDetails;
  dailyList: DaySummary[];
  deviceCounts: Record<string, number>;
  browserCounts: Record<string, number>;
  recentVisits: VisitorLog[];
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  // Analytics data
  const [data, setData] = useState<AnalyticsStats | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "daily" | "logs">("overview");

  const isRtl = language === "ar";

  // Check saved session auth
  useEffect(() => {
    const savedKey = sessionStorage.getItem("neuro_admin_key");
    if (savedKey) {
      setPasscode(savedKey);
      fetchStats(savedKey);
    }
  }, []);

  const fetchStats = useCallback(
    async (key: string, dateParam?: string) => {
      setIsRefreshing(true);
      try {
        const url = new URL("/api/analytics/stats", window.location.origin);
        url.searchParams.set("key", key);
        if (dateParam) {
          url.searchParams.set("date", dateParam);
        }
        const res = await fetch(url.toString());
        const json = await res.json();

        if (res.ok && json.success) {
          setData(json.data);
          setIsAuthenticated(true);
          setAuthError("");
          sessionStorage.setItem("neuro_admin_key", key);
          if (!selectedDate && json.data.today?.date) {
            setSelectedDate(json.data.today.date);
          }
        } else {
          setAuthError(json.error || "رمز المرور غير صحيح");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);
        setAuthError("فشل الاتصال بالخادم");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [selectedDate]
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setIsLoading(true);
    setAuthError("");
    fetchStats(passcode.trim(), selectedDate);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("neuro_admin_key");
    setIsAuthenticated(false);
    setPasscode("");
    setData(null);
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    if (passcode) {
      fetchStats(passcode, newDate);
    }
  };

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center bg-[#07070d] p-4 text-white"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="w-full max-w-md rounded-3xl border border-purple-500/25 bg-[#0d0d18]/90 p-8 shadow-2xl shadow-purple-950/60 backdrop-blur-2xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-purple-600/30">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#07070d]">
                <Lock className="h-7 w-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="mt-5 text-xl font-bold tracking-tight text-white">
              {isRtl ? "لوحة تحكم إحصائيات الزوار" : "Visitor Analytics Portal"}
            </h1>
            <p className="mt-1.5 text-xs text-gray-400">
              {isRtl
                ? "أدخل رمز المرور السري للوصول إلى لوحة المتابعة"
                : "Enter admin passcode to inspect site visitor analytics"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-semibold text-gray-300 mb-1.5"
              >
                {isRtl ? "رمز المرور (Admin Passcode):" : "Admin Passcode:"}
              </label>
              <div className="relative">
                <KeyRound className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="admin123"
                  className="w-full rounded-xl border border-purple-500/30 bg-[#07070d]/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
              </div>
              <span className="mt-1 block text-[11px] text-gray-500">
                {isRtl ? "الرمز الافتراضي: admin123" : "Default passcode: admin123"}
              </span>
            </div>

            {authError && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-900/40 hover:opacity-95 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>{isRtl ? "جارٍ التحقق..." : "Authenticating..."}</span>
              ) : (
                <>
                  <span>{isRtl ? "تسجيل الدخول" : "Access Dashboard"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to Atlas */}
          <div className="mt-6 border-t border-purple-500/15 pt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isRtl ? "العودة إلى أطلس الدماغ 3D" : "Back to 3D Brain Atlas"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate highest daily visitor count for dynamic chart scaling
  const maxVisitorsInChart = Math.max(...(data?.dailyList.map((d) => d.uniqueVisitors) || [1]), 1);

  return (
    <div
      className="min-h-screen w-full bg-[#07070d] text-slate-100 p-4 sm:p-6 lg:p-8 overflow-y-auto"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Navbar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#0d0d18]/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-600/30">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07070d]">
                <Brain className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {isRtl ? "لوحة تحكم إحصائيات الزوار" : "NeuroAtlas Visitor Dashboard"}
                </h1>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                  {isRtl ? "مباشر" : "Live"}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {isRtl
                  ? "تتبع مباشر لإجمالي من دخل الموقع وتفاصيل الزوار لكل يوم محدد"
                  : "Real-time analytics for total visitors and day-by-day visitor traffic"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fetchStats(passcode, selectedDate)}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/30 px-3 py-2 text-xs font-medium text-purple-200 hover:bg-purple-900/40 transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`}
              />
              <span className="hidden sm:inline">{isRtl ? "تحديث" : "Refresh"}</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/30 px-3 py-2 text-xs font-medium text-purple-200 hover:bg-purple-900/40 transition-colors"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{language === "ar" ? "English" : "عربي"}</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-purple-900/40 hover:opacity-90 transition-all"
            >
              <Brain className="h-3.5 w-3.5" />
              <span>{isRtl ? "أطلس المخ 3D" : "3D Atlas"}</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-950/20 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-900/40 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Visitors All-Time */}
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-[#0d0d18] to-purple-950/20 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                {isRtl ? "إجمالي من دخل الموقع (كلي)" : "Total Visitors (All-Time)"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {data?.totalUniqueVisitors.toLocaleString() || 0}
              </span>
              <span className="text-xs text-purple-400 font-medium">
                {isRtl ? "شخص حقيقي" : "unique visitors"}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              {isRtl
                ? "مجموع كل المستخدمين المميزين الذين فتحوا الموقع منذ الإنشاء"
                : "Count of all distinct individuals who accessed the application"}
            </p>
          </div>

          {/* Card 2: Today's Visitors */}
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#0d0d18] to-cyan-950/20 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                {isRtl ? "زوار اليوم" : "Today's Visitors"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {data?.today.uniqueVisitors.toLocaleString() || 0}
              </span>
              <span className="text-xs text-cyan-400 font-medium">
                {isRtl ? "زائر اليوم" : "visitors today"}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              {data?.today.date} ({isRtl ? "تاريخ اليوم" : "current date"})
            </p>
          </div>

          {/* Card 3: Total Pageviews */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-[#0d0d18] to-emerald-950/20 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                {isRtl ? "إجمالي المشاهدات والزيارات" : "Total Pageviews / Visits"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <Eye className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {data?.totalPageviews.toLocaleString() || 0}
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                {isRtl ? "زيارة صفحة" : "views"}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              {isRtl ? "مشاهدات اليوم:" : "Today views:"}{" "}
              <strong className="text-emerald-300">{data?.today.pageviews || 0}</strong>
            </p>
          </div>

          {/* Card 4: Average Engagement / Ratio */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-[#0d0d18] to-amber-950/20 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                {isRtl ? "معدل التفاعل لكل زائر" : "Engagement Ratio"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {data && data.totalUniqueVisitors > 0
                  ? (data.totalPageviews / data.totalUniqueVisitors).toFixed(1)
                  : "1.0"}
              </span>
              <span className="text-xs text-amber-400 font-medium">
                {isRtl ? "مشاهدة / زائر" : "views/visitor"}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              {isRtl ? "معدل تكرار وتفاعل الزائر مع الموقع" : "Average interactions per visitor"}
            </p>
          </div>
        </div>

        {/* SPECIFIC DAY INSPECTOR (طلب المستخدم الأساسي: كم واحد دخل كل يوم محدد) */}
        <section className="rounded-3xl border border-cyan-500/30 bg-[#0d0d18]/90 p-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/15 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                  <Filter className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {isRtl
                    ? "استعلام عن يوم محدد (Specific Day Inspector)"
                    : "Specific Day Analytics"}
                </h2>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {isRtl
                  ? "اختر أي تاريخ من التقويم لمعرفة كم شخص دخل الموقع بالتحديد في هذا اليوم ومواعيد دخولهم وأجهزتهم"
                  : "Select any date from the calendar to inspect exact visitor count and visit logs for that specific day"}
              </p>
            </div>

            {/* Date Input Selector */}
            <div className="flex items-center gap-3 bg-[#07070d]/80 p-2 rounded-2xl border border-purple-500/30">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              />
              {data?.today.date && selectedDate !== data.today.date && (
                <button
                  type="button"
                  onClick={() => handleDateChange(data.today.date)}
                  className="rounded-lg bg-cyan-500/20 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                >
                  {isRtl ? "اليوم" : "Today"}
                </button>
              )}
            </div>
          </div>

          {/* Selected Day Highlight Metrics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4">
              <span className="text-xs text-gray-400 block font-medium">
                {isRtl ? "تاريخ اليوم المحدد:" : "Selected Date:"}
              </span>
              <span className="text-lg font-bold text-cyan-300 font-mono mt-1 block">
                {selectedDate || "N/A"}
              </span>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4">
              <span className="text-xs text-gray-400 block font-medium">
                {isRtl ? "عدد الزوار في هذا اليوم:" : "Visitors on this day:"}
              </span>
              <span className="text-2xl font-black text-white mt-1 block">
                {data?.selectedDay?.uniqueVisitors || 0}{" "}
                <span className="text-xs font-normal text-cyan-300">
                  {isRtl ? "زائر فريد" : "unique visitors"}
                </span>
              </span>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
              <span className="text-xs text-gray-400 block font-medium">
                {isRtl ? "عدد مرات فتح الصفحات:" : "Pageviews on this day:"}
              </span>
              <span className="text-2xl font-black text-white mt-1 block">
                {data?.selectedDay?.pageviews || 0}{" "}
                <span className="text-xs font-normal text-emerald-300">
                  {isRtl ? "مشاهدة" : "pageviews"}
                </span>
              </span>
            </div>
          </div>

          {/* Table of Visits for the Selected Day */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              {isRtl
                ? `سجل من دخلوا في تاريخ (${selectedDate}):`
                : `Log of visitors on (${selectedDate}):`}
            </h3>

            {data?.selectedDay?.visits && data.selectedDay.visits.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-purple-500/20 bg-[#07070d]/60">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-purple-950/30 text-[11px] font-semibold uppercase tracking-wider text-purple-300 border-b border-purple-500/20">
                    <tr>
                      <th className="px-4 py-3">{isRtl ? "الوقت" : "Time"}</th>
                      <th className="px-4 py-3">{isRtl ? "الجهاز" : "Device"}</th>
                      <th className="px-4 py-3">{isRtl ? "المتصفح والنظام" : "Browser & OS"}</th>
                      <th className="px-4 py-3">{isRtl ? "اللغة" : "Language"}</th>
                      <th className="px-4 py-3">{isRtl ? "المسار" : "Path"}</th>
                      <th className="px-4 py-3">{isRtl ? "المصدر" : "Referrer"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/20 font-mono text-[11px]">
                    {data.selectedDay.visits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="px-4 py-2.5 font-bold text-cyan-300">{visit.time}</td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center gap-1 text-gray-200">
                            {visit.device === "Mobile" ? (
                              <Smartphone className="h-3.5 w-3.5 text-amber-400" />
                            ) : visit.device === "Tablet" ? (
                              <Tablet className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Laptop className="h-3.5 w-3.5 text-cyan-400" />
                            )}
                            {visit.device}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-300">
                          {visit.browser} / {visit.os}
                        </td>
                        <td className="px-4 py-2.5 uppercase text-purple-300 font-bold">
                          {visit.language}
                        </td>
                        <td className="px-4 py-2.5 text-gray-400">{visit.path}</td>
                        <td className="px-4 py-2.5 text-gray-500">{visit.referrer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-700 p-8 text-center text-xs text-gray-500">
                {isRtl
                  ? "لا توجد زيارات مسجلة بالتحديد في هذا اليوم حتى الآن."
                  : "No visits recorded on this specific day yet."}
              </div>
            )}
          </div>
        </section>

        {/* VISUAL DAILY VISITORS CHART */}
        <section className="rounded-3xl border border-purple-500/25 bg-[#0d0d18]/90 p-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/15 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isRtl ? "مخطط حركة الزوار اليومية" : "Daily Visitor Activity Trend"}
                </h2>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {isRtl
                  ? "مقارنة عدد الداخلين يومياً (انقر على أي يوم لتحديده أعلاه)"
                  : "Daily visitor comparison (click any bar to filter above)"}
              </p>
            </div>
            <span className="text-xs text-purple-300 font-mono">
              {data?.dailyList.length || 0} {isRtl ? "أيام مسجلة" : "recorded days"}
            </span>
          </div>

          {/* Interactive Bar Chart */}
          <div className="mt-6 pt-4 overflow-x-auto">
            {data?.dailyList && data.dailyList.length > 0 ? (
              <div className="flex items-end gap-3 min-w-[500px] h-48 px-2 pb-2 border-b border-gray-800">
                {data.dailyList
                  .slice()
                  .reverse()
                  .map((d) => {
                    const heightPercent = Math.max(
                      12,
                      Math.round((d.uniqueVisitors / maxVisitorsInChart) * 100)
                    );
                    const isSelected = selectedDate === d.date;

                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => handleDateChange(d.date)}
                        className="group flex-1 flex flex-col items-center justify-end h-full focus:outline-none transition-all"
                        title={`${d.date}: ${d.uniqueVisitors} visitors, ${d.pageviews} views`}
                      >
                        {/* Tooltip on hover */}
                        <span className="mb-1 text-[10px] font-mono font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          {d.uniqueVisitors}
                        </span>

                        {/* Bar */}
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-t from-cyan-600 to-cyan-300 shadow-[0_0_15px_#06b6d4]"
                              : "bg-gradient-to-t from-purple-800/80 to-purple-500/80 hover:from-purple-700 hover:to-cyan-400"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />

                        {/* Date label */}
                        <span
                          className={`mt-2 text-[10px] font-mono tracking-tight whitespace-nowrap transition-colors ${
                            isSelected ? "text-cyan-300 font-bold" : "text-gray-400"
                          }`}
                        >
                          {d.date.slice(5)}
                        </span>
                      </button>
                    );
                  })}
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-xs text-gray-500">
                {isRtl ? "لا توجد بيانات يومية كافية بعد" : "Not enough daily data yet"}
              </div>
            )}
          </div>

          {/* Daily Table Summary */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-purple-500/15">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#07070d]/80 text-[11px] font-semibold uppercase tracking-wider text-purple-300 border-b border-purple-500/20">
                <tr>
                  <th className="px-4 py-2.5">{isRtl ? "التاريخ" : "Date"}</th>
                  <th className="px-4 py-2.5">
                    {isRtl ? "عدد الزوار (أشخاص)" : "Unique Visitors"}
                  </th>
                  <th className="px-4 py-2.5">{isRtl ? "إجمالي المشاهدات" : "Pageviews"}</th>
                  <th className="px-4 py-2.5">{isRtl ? "معدل التفاعل" : "Engagement"}</th>
                  <th className="px-4 py-2.5 text-right">{isRtl ? "إجراء" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/15 font-mono text-[11px]">
                {data?.dailyList.map((d) => (
                  <tr
                    key={d.date}
                    className={`hover:bg-purple-950/20 transition-colors ${
                      selectedDate === d.date ? "bg-cyan-950/20" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 font-bold text-white flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedDate === d.date ? "bg-cyan-400" : "bg-purple-500"
                        }`}
                      />
                      {d.date}
                    </td>
                    <td className="px-4 py-2.5 font-bold text-cyan-300">{d.uniqueVisitors}</td>
                    <td className="px-4 py-2.5 text-emerald-300">{d.pageviews}</td>
                    <td className="px-4 py-2.5 text-gray-400">
                      {(d.pageviews / Math.max(1, d.uniqueVisitors)).toFixed(1)} views/user
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDateChange(d.date)}
                        className="rounded-lg bg-purple-900/40 px-2.5 py-1 text-[10px] text-purple-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
                      >
                        {isRtl ? "عرض التفاصيل ↗" : "Inspect ↗"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM SECTION: DEVICES & RECENT LOGS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device Distribution */}
          <div className="rounded-3xl border border-purple-500/20 bg-[#0d0d18]/80 p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Laptop className="h-4 w-4 text-cyan-400" />
              <span>{isRtl ? "توزيع الأجهزة المستخدمة" : "Device Distribution"}</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(data?.deviceCounts || {}).map(([device, count]) => {
                const total = Math.max(1, data?.recentVisits.length || 1);
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={device} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300 flex items-center gap-1.5">
                        {device === "Mobile" ? (
                          <Smartphone className="h-3.5 w-3.5 text-amber-400" />
                        ) : device === "Tablet" ? (
                          <Tablet className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Laptop className="h-3.5 w-3.5 text-cyan-400" />
                        )}
                        {device}
                      </span>
                      <span className="font-mono text-gray-400">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Browser Distribution */}
          <div className="rounded-3xl border border-purple-500/20 bg-[#0d0d18]/80 p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-400" />
              <span>{isRtl ? "المتصفحات الأكثر استخداماً" : "Top Browsers"}</span>
            </h3>
            <div className="space-y-2.5">
              {Object.entries(data?.browserCounts || {}).map(([browser, count]) => (
                <div
                  key={browser}
                  className="flex items-center justify-between rounded-xl bg-[#07070d]/60 px-3 py-2 text-xs border border-purple-900/30"
                >
                  <span className="font-medium text-gray-200">{browser}</span>
                  <span className="font-mono text-cyan-300 font-bold">{count} visits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Config Note */}
          <div className="rounded-3xl border border-purple-500/20 bg-[#0d0d18]/80 p-5 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>{isRtl ? "حالة النظام والأمان" : "System & Security"}</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {isRtl
                  ? "يتم تسجيل الزوار محلياً وحفظ ملف الإحصائيات في قاعدة بيانات دائمة. يمكن تغيير رمز المرور السري عبر تعيين متغير البيئة ADMIN_PASSCODE."
                  : "Visits are recorded securely with persistence in local JSON storage. Passcode can be customized with ADMIN_PASSCODE environment variable."}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>Status: Active & Logging</span>
              <span>v1.0 Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
