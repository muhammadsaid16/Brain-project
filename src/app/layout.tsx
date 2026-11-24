import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroAtlas 3D | Interactive Neuroanatomy & Brain Study",
  description:
    "Production-ready Interactive 3D Neuroanatomy and Brain Study Web Application powered by Next.js, Three.js, React Three Fiber, and Zustand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden bg-[#07070d] text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
