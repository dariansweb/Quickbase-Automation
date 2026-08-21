import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-sm font-bold tracking-wide text-white hover:underline"
            >
              Quickbase Automation Lab
            </Link>

            <div className="flex items-center gap-5 text-sm font-semibold">
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>

              <Link href="/lessons" className="text-white hover:underline">
                Lessons
              </Link>

              <Link href="/about" className="text-white hover:underline">
                About
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
