import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { LuBookOpen, LuHouse, LuInfo, LuWorkflow } from "react-icons/lu";
export const metadata: Metadata = {
  title: {
    default: "Quickbase Automation Developer Lab",
    template: "%s | Quickbase Automation Developer Lab",
  },

  description:
    "A hands-on Quickbase automation training lab covering automatic emails, notifications, reminders, subscriptions, Custom Emails, record events, conditions, time-driven automation, Pipelines, QBL, Jinja, and workflow design.",

  keywords: [
    "Quickbase",
    "Quickbase Automation",
    "Quickbase Pipelines",
    "Quickbase Notifications",
    "Quickbase Reminders",
    "Quickbase Subscriptions",
    "Quickbase Custom Emails",
    "Quickbase Email Automation",
    "Quickbase Workflow",
    "Quickbase Tutorial",
    "Quickbase Training",
    "Quickbase QBL",
    "Quickbase Jinja",
  ],

  authors: [
    {
      name: "Darian Ross",
      url: "https://github.com/dariansweb",
    },
  ],

  creator: "Darian Ross",

  openGraph: {
    title: "Quickbase Automation Developer Lab",
    description:
      "Learn Quickbase automation from built-in communication tools through Pipelines, one concept and experiment at a time.",
    siteName: "Quickbase Automation Developer Lab",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* ======================================================
            GLOBAL NAVIGATION
        ====================================================== */}

        <nav className="sticky top-0 z-50 border-b border-[#17452a] bg-[#17452a] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-bold tracking-wide text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg transition group-hover:bg-white/20">
                <LuWorkflow aria-hidden="true" />
              </span>

              <span>Quickbase Automation Lab</span>
            </Link>

            <div className="flex items-center gap-2 text-sm font-semibold sm:gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <LuHouse aria-hidden="true" className="text-base" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link
                href="/lessons"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <LuBookOpen aria-hidden="true" className="text-base" />
                <span className="hidden sm:inline">Lessons</span>
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <LuInfo aria-hidden="true" className="text-base" />
                <span className="hidden sm:inline">About</span>
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
