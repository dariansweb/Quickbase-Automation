import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import {
  LuArrowDown,
  LuArrowRight,
  LuBell,
  LuBookOpen,
  LuCalendarClock,
  LuCheck,
  LuCircleAlert,
  LuClock3,
  LuDatabase,
  LuFlaskConical,
  LuGitBranch,
  LuKeyRound,
  LuLayoutGrid,
  LuLightbulb,
  LuMail,
  LuPanelTop,
  LuRefreshCw,
  LuBadgeCheck,
  LuSearch,
  LuShieldCheck,
  LuSquareUser,
  LuTable2,
  LuTag,
  LuUser,
  LuUsers,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

/* ============================================================
   METADATA
   ============================================================ */

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Build the small Quickbase application used throughout the Quickbase Automation Developer Lab.",
};

/* ============================================================
   REUSABLE COMPONENTS
   ============================================================ */

function SectionHeading({
  step,
  title,
  icon,
  children,
}: {
  step?: string;
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749]">
            {icon}
          </span>
        )}

        <div>
          {step && (
            <p className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-[#276749]">
              {step}
            </p>
          )}

          <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>

      {children && (
        <div className="mt-5 max-w-5xl text-lg leading-8 text-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}

function ConceptCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-gray-300 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9fc9ad] hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0fff4] text-xl text-[#276749] transition-transform duration-200 group-hover:scale-105">
        {icon}
      </span>

      <h3 className="mt-4 text-xl font-bold text-[#205c38]">{title}</h3>

      <div className="mt-3 leading-7 text-gray-700">{children}</div>
    </div>
  );
}

function Remember({
  title,
  icon = <LuLightbulb aria-hidden="true" />,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0]">
      <div className="flex items-start gap-4 p-6 sm:p-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#7a5200] shadow-sm">
          {icon}
        </span>

        <div>
          <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
            Remember This
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-950">{title}</h3>

          <div className="mt-4 max-w-5xl text-lg leading-8 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldMeaningCard({
  field,
  meaning,
  description,
  icon,
}: {
  field: string;
  meaning: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-xl text-[#276749] transition-transform duration-200 group-hover:scale-105">
          {icon}
        </span>

        <div>
          <p className="text-sm font-bold text-gray-500">{field}</p>

          <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
            {meaning}
          </h3>

          <p className="mt-2 leading-7 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function GettingStartedPage() {
  const labTopics = [
    { label: "Alerts", icon: <LuCircleAlert aria-hidden="true" /> },
    { label: "Notifications", icon: <LuBell aria-hidden="true" /> },
    { label: "Reminders", icon: <LuCalendarClock aria-hidden="true" /> },
    { label: "Subscriptions", icon: <LuRefreshCw aria-hidden="true" /> },
    { label: "Custom Emails", icon: <LuMail aria-hidden="true" /> },
    { label: "Permissions", icon: <LuKeyRound aria-hidden="true" /> },
    { label: "Record Events", icon: <LuZap aria-hidden="true" /> },
    {
      label: "Scheduled Automation",
      icon: <LuClock3 aria-hidden="true" />,
    },
    { label: "Pipelines", icon: <LuWorkflow aria-hidden="true" /> },
    { label: "Queries", icon: <LuSearch aria-hidden="true" /> },
    { label: "Jinja", icon: <LuGitBranch aria-hidden="true" /> },
    { label: "Relationships", icon: <LuUsers aria-hidden="true" /> },
    {
      label: "Workflow Experiments",
      icon: <LuFlaskConical aria-hidden="true" />,
    },
  ];

  const futureFields = [
    "Priority",
    "Department",
    "Completed Date",
    "Created By",
    "Notification Sent",
    "Escalation Level",
    "Manager",
    "Previous Status",
    "Automation Status",
  ];

  const stopItems = [
    "Don't create a Pipeline.",
    "Don't create a Notification.",
    "Don't create a Reminder.",
    "Don't create a Subscription.",
    "Don't create a Custom Email.",
    "Don't start adding relationships.",
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HERO
      ====================================================== */}

      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-5xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl ring-1 ring-white/20">
                <LuFlaskConical aria-hidden="true" />
              </span>

              <p className="font-bold uppercase tracking-[0.18em] text-white/80">
                Quickbase Automation Developer Lab
              </p>
            </div>

            <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Getting Started — Build the Automation Laboratory
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
              Before beginning the lessons, create a small Quickbase application
              that belongs entirely to this tutorial.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
              This deliberately uncomplicated application gives us a safe place
              to investigate communication, record events, time, permissions,
              Pipelines, queries, relationships, and workflow behavior one
              experiment at a time.
            </p>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* ======================================================
            PURPOSE
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            title="Purpose"
            icon={<LuFlaskConical aria-hidden="true" />}
          >
            <p>
              This application will become the laboratory used throughout the
              course.
            </p>

            <p className="mt-4">
              We will intentionally begin with very little and allow the schema
              and automation architecture to grow only when an experiment gives
              us a reason to add something.
            </p>
          </SectionHeading>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {labTopics.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-3 rounded-xl border border-[#b7d8c2] bg-[#f0fff4] px-4 py-4 text-[#205c38] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg text-[#276749] shadow-sm transition-transform group-hover:scale-105">
                  {item.icon}
                </span>

                <span className="font-bold">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#276749] shadow-sm">
              <LuBookOpen aria-hidden="true" />
            </span>

            <div>
              <p className="text-lg leading-8">
                You do <strong>not</strong> need to complete the Quickbase Code
                Pages Developer Lab first.
              </p>

              <p className="mt-2 text-lg leading-8">
                This course begins with its own application and its own data.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            REQUIREMENTS
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            title="What You Need"
            icon={<LuShieldCheck aria-hidden="true" />}
          >
            <p>
              Use a Quickbase account where you are permitted to create and
              modify applications.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Builder Access"
              icon={<LuSquareUser aria-hidden="true" />}
            >
              <p>
                The tutorials assume that you can access the Quickbase builder
                features required by the lessons.
              </p>
            </ConceptCard>

            <ConceptCard
              title="A Safe Training App"
              icon={<LuShieldCheck aria-hidden="true" />}
            >
              <p>
                Do not perform these experiments inside an important production
                application.
              </p>
            </ConceptCard>
          </div>

          <Remember
            title="This is a laboratory"
            icon={<LuFlaskConical aria-hidden="true" />}
          >
            <p>
              We are deliberately going to modify records, change configuration,
              create automation, test recipients, create relationships, and
              eventually allow Pipelines to perform operations against our data.
            </p>

            <p className="mt-3 font-bold">
              Give the experiments their own application.
            </p>
          </Remember>
        </section>

        {/* ======================================================
            STEP 1
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 1"
            title="Create the Tutorial App"
            icon={<LuLayoutGrid aria-hidden="true" />}
          >
            <p>Create a new Quickbase application.</p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border-2 border-[#276749] bg-white shadow-sm">
            <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-4">
              <div className="flex items-center gap-3">
                <LuLayoutGrid
                  aria-hidden="true"
                  className="text-xl text-[#276749]"
                />

                <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Suggested Application Name
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-3xl font-extrabold text-[#205c38]">
                Quickbase Automation Lab
              </p>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
                The exact application name is not technically important, but
                using the tutorial name will make screenshots and instructions
                easier to follow.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 text-lg leading-8 text-gray-800">
            <LuBadgeCheck
              aria-hidden="true"
              className="mt-1.5 shrink-0 text-xl text-[#276749]"
            />

            <p>
              At this point, do not create a large business application. We want
              the smallest useful schema possible.
            </p>
          </div>
        </section>

        {/* ======================================================
            STEP 2
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 2"
            title="Create the Tasks Table"
            icon={<LuTable2 aria-hidden="true" />}
          >
            <p>
              Our first working table will simply be called{" "}
              <strong>Tasks</strong>.
            </p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-300 bg-[#f7f8fa] px-5 py-4">
              <LuTable2 aria-hidden="true" className="text-xl text-[#276749]" />

              <div>
                <p className="font-bold text-[#205c38]">Tasks</p>
                <p className="text-sm text-gray-500">
                  Four developer-created fields
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Field</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Purpose</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">Task Name</td>
                    <td className="p-4">Text</td>
                    <td className="p-4">Identifies the task</td>
                  </tr>

                  <tr className="border-b border-gray-200 bg-[#fbfcfb]">
                    <td className="p-4 font-bold">Status</td>
                    <td className="p-4">Text - Multiple Choice</td>
                    <td className="p-4">Gives us a simple changing state</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">Due Date</td>
                    <td className="p-4">Date</td>
                    <td className="p-4">
                      Gives us something time-relative to automate
                    </td>
                  </tr>

                  <tr className="bg-[#fbfcfb]">
                    <td className="p-4 font-bold">Assigned To</td>
                    <td className="p-4">User</td>
                    <td className="p-4">
                      Gives automation a dynamic recipient
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* STATUS VALUES */}

          <div className="mt-7 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <div className="flex items-center gap-3">
              <LuTag aria-hidden="true" className="text-xl text-[#276749]" />

              <p className="font-bold text-[#205c38]">
                Status — Multiple Choice Values
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {["Open", "On Hold", "Complete"].map((status) => (
                <span
                  key={status}
                  className="rounded-full border border-[#9fc9ad] bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-5xl text-lg leading-8">
            These fields are intentionally uncomplicated. Together, however,
            they give us four fundamentally different kinds of information.
          </p>

          {/* FIELD MEANING MODEL */}

          <div className="mt-7 rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <div className="mb-6">
              <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
                Our First Data Model
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                Four Fields, Four Concepts
              </h3>

              <p className="mt-3 max-w-4xl leading-7 text-gray-700">
                Each field gives the laboratory a different kind of information
                that automation can eventually observe or use.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldMeaningCard
                field="Task Name"
                meaning="Identity / Description"
                description="Tells us what the record represents."
                icon={<LuTag aria-hidden="true" />}
              />

              <FieldMeaningCard
                field="Status"
                meaning="State"
                description="Tells us the current condition of the task."
                icon={<LuRefreshCw aria-hidden="true" />}
              />

              <FieldMeaningCard
                field="Due Date"
                meaning="Time"
                description="Gives the task a meaningful point on the calendar."
                icon={<LuCalendarClock aria-hidden="true" />}
              />

              <FieldMeaningCard
                field="Assigned To"
                meaning="Person"
                description="Connects the task to a Quickbase user."
                icon={<LuUser aria-hidden="true" />}
              />
            </div>
          </div>

          <Remember title="Four simple fields can produce a surprising amount of automation behavior">
            <p>
              Identity, state, time, and person are enough to begin exploring
              events, conditions, recipients, reminders, scheduling, and
              workflow.
            </p>
          </Remember>
        </section>

        {/* ======================================================
            STEP 3
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 3"
            title="Don't Add Everything Yet"
            icon={<LuCircleAlert aria-hidden="true" />}
          >
            <p>This is important.</p>
          </SectionHeading>

          <p className="max-w-5xl text-lg leading-8">
            We could immediately add fields such as:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {futureFields.map((field) => (
              <div
                key={field}
                className="flex items-center gap-3 rounded-xl border border-gray-300 bg-[#f7f8fa] px-4 py-4 text-gray-700"
              >
                <LuX
                  aria-hidden="true"
                  className="shrink-0 text-lg text-gray-400"
                />

                <span className="font-semibold">{field}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3">
            <LuCircleAlert
              aria-hidden="true"
              className="text-xl text-[#7a5200]"
            />

            <p className="text-xl font-bold text-gray-950">
              But we won&apos;t.
            </p>
          </div>

          <Remember title="Add complexity when the experiment creates a reason for it">
            <p>If a later lesson requires Priority, we&apos;ll add Priority.</p>

            <p className="mt-3">
              If we discover that a relationship solves a problem, we&apos;ll
              build the relationship then.
            </p>

            <p className="mt-3">
              If Pipelines eventually need a Task Change History table,
              we&apos;ll create it when we reach that problem.
            </p>
          </Remember>

          <div className="flex items-start gap-4 rounded-2xl border border-[#b7d8c2] bg-[#f0fff4] p-6">
            <LuLightbulb
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl text-[#276749]"
            />

            <p className="max-w-5xl text-lg leading-8">
              This way, students understand{" "}
              <strong>why the schema evolved</strong> instead of receiving
              twenty mysterious fields on Day One.
            </p>
          </div>
        </section>

        {/* ======================================================
            STEP 4
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 4"
            title="Record the Actual Quickbase Schema"
            icon={<LuDatabase aria-hidden="true" />}
          >
            <p>
              Once Quickbase creates the fields, record their actual Field IDs.
            </p>
          </SectionHeading>

          <Remember
            title="Do not assume your FIDs will match someone else's application"
            icon={<LuKeyRound aria-hidden="true" />}
          >
            <p>
              Field IDs are assigned inside the table where the fields are
              created. The visible field label and Quickbase&apos;s internal
              Field ID are related, but they are not the same thing.
            </p>
          </Remember>

          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-gray-300 bg-[#f7f8fa] px-5 py-4">
              <div className="flex items-center gap-3">
                <LuKeyRound
                  aria-hidden="true"
                  className="text-xl text-[#276749]"
                />

                <div>
                  <p className="font-bold text-[#205c38]">
                    Record Your Field IDs
                  </p>

                  <p className="text-sm text-gray-500">
                    Use the values from your own Tasks table
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-125 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Field</th>
                    <th className="p-4 text-left">Your FID</th>
                  </tr>
                </thead>

                <tbody>
                  {["Task Name", "Status", "Due Date", "Assigned To"].map(
                    (field, index) => (
                      <tr
                        key={field}
                        className={`border-b border-gray-200 last:border-b-0 ${
                          index % 2 === 1 ? "bg-[#fbfcfb]" : ""
                        }`}
                      >
                        <td className="p-4 font-semibold">{field}</td>

                        <td className="p-4">
                          <span className="inline-flex min-w-12 items-center justify-center rounded-lg border border-dashed border-gray-400 bg-[#f7f8fa] px-3 py-1 font-mono font-bold text-gray-500">
                            ?
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ConceptCard
              title="Quickbase Adds Fields Too"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <p>
                Your Tasks table will also contain fields Quickbase creates
                automatically. That is expected.
              </p>
            </ConceptCard>

            <ConceptCard
              title="Why Record FIDs Now?"
              icon={<LuSearch aria-hidden="true" />}
            >
              <p>
                Later lessons involving queries, APIs, Jinja, or Pipelines may
                make these identifiers important. For now, simply record them.
              </p>
            </ConceptCard>
          </div>
        </section>

        {/* ======================================================
            STEP 5
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 5"
            title="Create Sample Records"
            icon={<LuPanelTop aria-hidden="true" />}
          >
            <p>Create a few Tasks manually. We want variation, not volume.</p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-300 bg-[#f7f8fa] px-5 py-4">
              <LuPanelTop
                aria-hidden="true"
                className="text-xl text-[#276749]"
              />

              <div>
                <p className="font-bold text-[#205c38]">Starting Dataset</p>
                <p className="text-sm text-gray-500">
                  Three records are plenty for now
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Task Name</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Due Date</th>
                    <th className="p-4 text-left">Assigned To</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold">
                      Prepare Monthly Report
                    </td>
                    <td className="p-4">
                      <span className="rounded-full border border-[#9fc9ad] bg-[#f0fff4] px-3 py-1 text-sm font-bold text-[#205c38]">
                        Open
                      </span>
                    </td>
                    <td className="p-4">Future date</td>
                    <td className="p-4">You</td>
                  </tr>

                  <tr className="border-b border-gray-200 bg-[#fbfcfb]">
                    <td className="p-4 font-semibold">Review Application</td>
                    <td className="p-4">
                      <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-800">
                        On Hold
                      </span>
                    </td>
                    <td className="p-4">Future date</td>
                    <td className="p-4">You</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold">Update Training Notes</td>
                    <td className="p-4">
                      <span className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700">
                        Complete
                      </span>
                    </td>
                    <td className="p-4">Recent/current date</td>
                    <td className="p-4">You</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-7 flex items-start gap-4 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#276749] shadow-sm">
              <LuUser aria-hidden="true" />
            </span>

            <div>
              <h3 className="text-xl font-bold text-[#205c38]">
                Why assign the records to yourself?
              </h3>

              <p className="mt-3 max-w-5xl leading-8 text-gray-700">
                Using yourself initially makes the experiments easier because
                later lessons will send actual automatic emails.
              </p>

              <p className="mt-3 max-w-5xl leading-8 text-gray-700">
                Additional users and more complicated recipient scenarios can be
                introduced when an experiment requires them.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            STEP 6
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 6"
            title="Stop"
            icon={<LuCircleAlert aria-hidden="true" />}
          >
            <p>Seriously. 😆</p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border-2 border-red-300 bg-red-50">
            <div className="flex items-center gap-4 border-b border-red-200 bg-red-100/60 px-6 py-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-red-700 shadow-sm">
                <LuCircleAlert aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-red-700">
                  Stop Point
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-red-950">
                  Do Not Continue Building
                </h3>
              </div>
            </div>

            <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-7">
              {stopItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-red-200 bg-white px-4 py-4 font-semibold text-gray-800 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700">
                    <LuX aria-hidden="true" />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <LuBadgeCheck
                aria-hidden="true"
                className="mt-1 shrink-0 text-2xl text-[#276749]"
              />

              <div>
                <p className="text-xl leading-9">
                  Our application should initially be <strong>boring</strong>.
                </p>

                <p className="mt-2 text-lg leading-8 text-gray-700">
                  That&apos;s desirable. We want to know exactly which behavior
                  came from each thing we add.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            FINAL LAB STATE
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            title="What the Laboratory Should Look Like"
            icon={<LuDatabase aria-hidden="true" />}
          >
            <p>
              At the end of Getting Started, the application should be almost
              embarrassingly simple.
            </p>
          </SectionHeading>

          {/* VISUAL SCHEMA */}

          <div className="overflow-hidden rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] shadow-sm">
            <div className="border-b border-[#b7d8c2] bg-white px-6 py-5 sm:px-7">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#276749] text-2xl text-white">
                  <LuLayoutGrid aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                    Application
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                    Quickbase Automation Lab
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mx-auto max-w-3xl">
                <div className="flex justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-[#9fc9ad] bg-white shadow-sm">
                  <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f7f8fa] px-5 py-4">
                    <LuTable2
                      aria-hidden="true"
                      className="text-xl text-[#276749]"
                    />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                        Table
                      </p>

                      <p className="font-extrabold text-[#205c38]">Tasks</p>
                    </div>
                  </div>

                  <div className="grid gap-3 p-5 sm:grid-cols-2">
                    {[
                      {
                        label: "Task Name",
                        icon: <LuTag aria-hidden="true" />,
                      },
                      {
                        label: "Status",
                        icon: <LuRefreshCw aria-hidden="true" />,
                      },
                      {
                        label: "Due Date",
                        icon: <LuCalendarClock aria-hidden="true" />,
                      },
                      {
                        label: "Assigned To",
                        icon: <LuUser aria-hidden="true" />,
                      },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#fbfcfb] px-4 py-3"
                      >
                        <span className="text-lg text-[#276749]">
                          {field.icon}
                        </span>

                        <span className="font-semibold text-gray-800">
                          {field.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 bg-[#f0fff4] px-5 py-4">
                    <div className="flex items-center gap-3 text-[#205c38]">
                      <LuDatabase aria-hidden="true" className="text-lg" />

                      <span className="font-semibold">
                        + a few sample records
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* READY STATE */}

          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#276749] text-white shadow-lg shadow-[#276749]/15">
            <div className="p-7 sm:p-9">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl text-white">
                  <LuCheck aria-hidden="true" />
                </span>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-white/70">
                    Laboratory Ready
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                    That&apos;s Enough.
                  </h2>

                  <p className="mt-5 max-w-5xl text-lg leading-8 text-white/90">
                    We now have identity, state, time, a person, and a handful
                    of records.
                  </p>

                  <p className="mt-4 max-w-5xl text-lg leading-8 text-white/90">
                    Every automation mechanism we add from this point forward
                    can be observed against a known starting point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            GETTING READY FOR LESSON 10
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Later Laboratory Upgrade"
            title="Getting Ready for Lesson 10"
            icon={<LuWorkflow aria-hidden="true" />}
          >
            <p>
              Lessons 1–9 deliberately used our original Tasks table. Lesson 10
              is the first time our Pipeline experiments give us a reason to
              expand the laboratory.
            </p>

            <p className="mt-4">
              Do this preparation <strong>after Lesson 9</strong> and before
              opening Lesson 10.
            </p>
          </SectionHeading>

          <Remember title="The original rule still stands">
            <p>
              We did not build Projects earlier because we did not need Projects
              earlier.
            </p>

            <p className="mt-3 font-bold">
              Lesson 10 finally gives us a reason.
            </p>
          </Remember>

          {/* ADD PIPELINE RESULTS */}

          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-xl text-white">
                  <LuZap aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                    Upgrade 1
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                    Add Pipeline Results to Tasks
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="overflow-hidden rounded-xl border border-gray-300">
                <table className="w-full border-collapse">
                  <thead className="bg-[#205c38] text-white">
                    <tr>
                      <th className="p-4 text-left">Field</th>
                      <th className="p-4 text-left">Type</th>
                      <th className="p-4 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 font-bold">Pipeline Results</td>
                      <td className="p-4">Text</td>
                      <td className="p-4">
                        Gives our first Pipeline a harmless, dedicated field
                        where it can visibly prove that an Action executed.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-5">
                <LuCircleAlert
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl text-[#7a5200]"
                />

                <div>
                  <p className="font-bold text-[#654700]">
                    Leave Pipeline Results blank before Lesson 10.
                  </p>

                  <p className="mt-2 leading-7 text-gray-700">
                    Lesson 10 uses that blank field as controlled evidence. If
                    text suddenly appears there after the first execution, we
                    know exactly what produced it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECTS TABLE */}

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-xl text-white">
                  <LuTable2 aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                    Upgrade 2
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                    Create the Projects Table
                  </h3>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Field</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Purpose</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">Project Name</td>
                    <td className="p-4">Text</td>
                    <td className="p-4">Identifies the parent Project</td>
                  </tr>

                  <tr className="border-b border-gray-200 bg-[#fbfcfb]">
                    <td className="p-4 font-bold">Project Status</td>
                    <td className="p-4">Text - Multiple Choice</td>
                    <td className="p-4">
                      Gives us parent state to expose through a relationship
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-bold">Project Manager</td>
                    <td className="p-4">User</td>
                    <td className="p-4">
                      Identifies the person responsible for the Project
                    </td>
                  </tr>

                  <tr className="bg-[#fbfcfb]">
                    <td className="p-4 font-bold">Target Date</td>
                    <td className="p-4">Date</td>
                    <td className="p-4">
                      Gives the parent record a time-oriented value
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 bg-[#f7f8fa] p-6">
              <p className="font-bold text-[#205c38]">Project Status choices</p>

              <div className="mt-3 flex flex-wrap gap-3">
                {["Active", "On Hold", "Complete"].map((status) => (
                  <span
                    key={status}
                    className="rounded-full border border-[#9fc9ad] bg-white px-4 py-2 font-semibold text-gray-800"
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RELATIONSHIP */}

          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#f0fff4] shadow-sm">
            <div className="border-b border-[#9fc9ad] bg-white px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-xl text-white">
                  <LuUsers aria-hidden="true" />
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                    Upgrade 3
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                    Create the Projects → Tasks Relationship
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mx-auto flex max-w-3xl flex-col items-center">
                <div className="w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 text-center shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                    Parent
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-[#205c38]">
                    Projects
                  </p>
                </div>

                <div className="flex h-12 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]"
                  />
                </div>

                <span className="rounded-full bg-[#276749] px-4 py-2 font-extrabold text-white">
                  1 Project → many Tasks
                </span>

                <div className="flex h-12 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]"
                  />
                </div>

                <div className="w-full rounded-2xl border-2 border-[#276749] bg-[#276749] p-5 text-center text-white shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                    Child
                  </p>
                  <p className="mt-1 text-2xl font-extrabold">Tasks</p>
                </div>
              </div>

              <p className="mx-auto mt-7 max-w-4xl text-center text-lg leading-8 text-gray-700">
                Do not turn this into a relationships lesson yet. We only need
                enough relationship structure for Lesson 10 to compare a real
                child-record mutation with a parent change that affects a
                relationship-derived lookup.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <ConceptCard
                  title="Child-side fields"
                  icon={<LuGitBranch aria-hidden="true" />}
                >
                  <p>
                    Expect relationship fields such as{" "}
                    <strong>Related Project</strong>, the Project name
                    reference/proxy field produced in your app, and a{" "}
                    <strong>Project Status</strong> lookup.
                  </p>
                </ConceptCard>

                <ConceptCard
                  title="Parent-side helpers"
                  icon={<LuDatabase aria-hidden="true" />}
                >
                  <p>
                    Quickbase also creates relationship helpers on Projects,
                    such as related Task report, count, and add/link fields.
                    Their exact labels can vary.
                  </p>
                </ConceptCard>
              </div>

              <div className="mt-6 rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-5">
                <p className="font-bold text-[#654700]">
                  Use the field names Quickbase actually creates in your app.
                </p>

                <p className="mt-2 leading-7 text-gray-700">
                  In our laboratory, the child side included{" "}
                  <strong>Related Project</strong>,{" "}
                  <strong>Project Name / Project Name2</strong>, and{" "}
                  <strong>Project Status</strong>. Lesson 10 records those
                  observed names instead of pretending every app will label a
                  reference proxy identically.
                </p>
              </div>
            </div>
          </div>

          {/* ACTUAL PROJECT DATA */}

          <div className="mt-8">
            <h3 className="text-2xl font-extrabold text-[#205c38]">
              Populate the Projects Table
            </h3>

            <p className="mt-3 max-w-5xl text-lg leading-8 text-gray-700">
              These are the four Project records used in our Lesson 10
              laboratory. Using the same values makes the relationship
              experiments easier to reproduce.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-300 bg-white shadow-sm">
              <table className="w-full min-w-220 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Project Name</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Manager</th>
                    <th className="p-4 text-left">Target Date</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["November Reporting Cycle", "Active", "You", "11/15/2026"],
                    [
                      "Application Review Project",
                      "Active",
                      "You",
                      "11/30/2026",
                    ],
                    [
                      "Training Documentation Refresh",
                      "On Hold",
                      "You",
                      "12/15/2026",
                    ],
                    [
                      "Monthly Administrative Work",
                      "Active",
                      "You",
                      "12/31/2026",
                    ],
                  ].map((row, index) => (
                    <tr
                      key={row[0]}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        index % 2 === 1 ? "bg-[#fbfcfb]" : ""
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell}
                          className={`p-4 ${
                            cellIndex === 0 ? "font-semibold" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXTRA TASK DATA */}

          <div className="mt-10">
            <h3 className="text-2xl font-extrabold text-[#205c38]">
              Add More Tasks for Pipeline Research
            </h3>

            <p className="mt-3 max-w-5xl text-lg leading-8 text-gray-700">
              The original three Tasks were enough for the early communication
              lessons. Pipeline work benefits from a larger set of records
              spread across several Projects.
            </p>

            <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-300 bg-white shadow-sm">
              <table className="w-full min-w-250 border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Task Name</th>
                    <th className="p-4 text-left">Due Date</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Related Project</th>
                    <th className="p-4 text-left">Pipeline Results</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    [
                      "Draft November Reporting Checklist",
                      "11/04/2026",
                      "Open",
                      "November Reporting Cycle",
                    ],
                    [
                      "Validate November Report Data",
                      "11/08/2026",
                      "Open",
                      "November Reporting Cycle",
                    ],
                    [
                      "Finalize November Reporting Package",
                      "11/12/2026",
                      "Open",
                      "Training Documentation Refresh",
                    ],
                    [
                      "Review Pending Applications",
                      "11/10/2026",
                      "Open",
                      "Application Review Project",
                    ],
                    [
                      "Send Application Follow-Up Notices",
                      "11/18/2026",
                      "On Hold",
                      "Application Review Project",
                    ],
                    [
                      "Review Pipeline Training Notes",
                      "11/14/2026",
                      "Open",
                      "Training Documentation Refresh",
                    ],
                    [
                      "Publish Updated Training Guide",
                      "12/01/2026",
                      "On Hold",
                      "Training Documentation Refresh",
                    ],
                    [
                      "Reconcile Monthly Administrative Records",
                      "11/20/2026",
                      "Open",
                      "Monthly Administrative Work",
                    ],
                  ].map((row, index) => (
                    <tr
                      key={row[0]}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        index % 2 === 1 ? "bg-[#fbfcfb]" : ""
                      }`}
                    >
                      <td className="p-4 font-semibold">{row[0]}</td>
                      <td className="p-4">{row[1]}</td>
                      <td className="p-4">{row[2]}</td>
                      <td className="p-4">{row[3]}</td>
                      <td className="p-4">
                        <span className="rounded-lg border border-dashed border-gray-400 bg-[#f7f8fa] px-3 py-1 font-semibold text-gray-500">
                          blank
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-gray-300 bg-[#f7f8fa] p-5">
              <p className="font-bold text-[#205c38]">About the research CSV</p>

              <p className="mt-2 leading-7 text-gray-700">
                Our finished research data contains later edits, changed
                statuses, and one Pipeline Results value created during Lesson
                10. The table above intentionally shows the{" "}
                <strong>pre-experiment setup state</strong>: use the records and
                relationships, but leave Pipeline Results blank so Lesson 10 can
                generate the evidence itself.
              </p>
            </div>
          </div>

          {/* READY FOR LESSON 10 */}

          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#276749] text-white shadow-lg shadow-[#276749]/15">
            <div className="p-7 sm:p-9">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">
                  <LuCheck aria-hidden="true" />
                </span>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-white/70">
                    Laboratory Upgraded
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold">
                    Now We Have a Reason for Relationships.
                  </h3>

                  <p className="mt-5 max-w-5xl text-lg leading-8 text-white/90">
                    The laboratory now contains multiple Projects, Tasks
                    belonging to different Projects, relationship-derived
                    values, and a blank Pipeline Results field ready to capture
                    our first deliberate Pipeline Action.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                    <span className="rounded-full bg-white/10 px-4 py-2">
                      Projects: multiple parent records
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2">
                      Tasks: multiple child records
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2">
                      Related Project
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2">
                      Project Status lookup
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2">
                      Pipeline Results: blank
                    </span>
                  </div>

                  <p className="mt-7 text-xl font-extrabold">
                    Laboratory upgraded. Return to Lesson 10.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/lessons/10"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
                    >
                      Continue to Lesson 10
                      <LuArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            NEXT STEP
        ====================================================== */}

        <section className="group relative overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white shadow-lg">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative p-7 sm:p-9">
            <div className="flex items-start gap-5">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl sm:flex">
                <LuBookOpen aria-hidden="true" />
              </span>

              <div className="flex-1">
                <p className="font-bold uppercase tracking-[0.15em] text-white/70">
                  Next
                </p>

                <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  Lesson 1 — The Automation Landscape
                </h2>

                <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
                  The application is ready. Before we automate anything, we will
                  establish the vocabulary needed to distinguish Quickbase
                  communication tools from workflow automation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/lessons/1"
                    className="group/button inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#205c38] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#f0fff4] hover:shadow-md"
                  >
                    Begin Lesson 1
                    <LuArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/button:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/lessons"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-5 py-3 font-bold text-white transition duration-200 hover:bg-white hover:text-[#205c38]"
                  >
                    <LuBookOpen aria-hidden="true" />
                    View Lesson Roadmap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
