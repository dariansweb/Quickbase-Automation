"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBellRing,
  LuBookOpen,
  LuBraces,
  LuCalendarClock,
  LuCheck,
  LuCircleHelp,
  LuClock3,
  LuCopy,
  LuDatabase,
  LuEye,
  LuFilter,
  LuGitBranch,
  LuLightbulb,
  LuLock,
  LuMail,
  LuRefreshCw,
  LuRoute,
  LuSearch,
  LuShield,
  LuTable2,
  LuUsers,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";

const multiReportSource = `<qb-report
  data-table-id="bwa4dgkvc"
  report-id="1"
  show-title="true">
</qb-report>

<qb-report
  data-table-id="bwa4dgkvc"
  report-id="2"
  show-title="true">
</qb-report>`;

const formulaRabbitHole = `Today()

[Task Name]

If(1=1,"FORMULA EXECUTED","FORMULA FAILED")`;

function SectionHeading({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow?: string;
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 font-bold uppercase tracking-[0.12em] text-[#276749]">
          {eyebrow}
        </p>
      )}
      <div className="flex items-start gap-4">
        {icon && (
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4ea] text-2xl text-[#276749]">
            {icon}
          </span>
        )}
        <div>
          <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
            {title}
          </h2>
          {children && (
            <div className="mt-4 max-w-4xl text-lg leading-8">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConceptCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">
            {icon}
          </span>
        )}
        <h3 className="pt-1 text-xl font-bold text-[#205c38]">{title}</h3>
      </div>
      <div className="mt-4 leading-8">{children}</div>
    </div>
  );
}

function QuestionCard({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#276749] shadow-sm">
          <LuCircleHelp aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#276749]">
            Central Question
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#205c38] sm:text-3xl">
            {question}
          </h2>
        </div>
      </div>
      <div className="mt-4 max-w-4xl text-lg leading-8">{children}</div>
    </div>
  );
}

function Remember({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#7a5200] shadow-sm">
          <LuLightbulb aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
            Remember This
          </p>
          <h3 className="mt-2 text-xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="mt-4 leading-8">{children}</div>
    </div>
  );
}

function Discovery({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#276749] shadow-sm">
          <LuEye aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Observed in Our Lab
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[#205c38]">{title}</h3>
        </div>
      </div>
      <div className="mt-5 leading-8">{children}</div>
    </div>
  );
}

function MentalModel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4]">
      <div className="border-b border-[#9fc9ad] bg-[#e6f4ea] px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
            <LuRoute aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Mental Model
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#205c38]">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </div>
  );
}

function FlowStep({
  icon,
  title,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  final?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border p-4 shadow-sm ${final ? "border-[#276749] bg-[#276749] text-white" : "border-[#b7d8c2] bg-white"}`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${final ? "bg-white/15 text-white" : "bg-[#f0fff4] text-[#276749]"}`}
        >
          {icon}
        </span>
        <h4
          className={`font-extrabold ${final ? "text-white" : "text-[#205c38]"}`}
        >
          {title}
        </h4>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex h-10 items-center justify-center">
      <LuArrowDown aria-hidden="true" className="text-xl text-[#276749]/60" />
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-[#111827]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-300">
          {title}
        </p>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white"
        >
          {copied ? <LuCheck /> : <LuCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EvidenceCard({
  type,
  title,
  children,
}: {
  type: "DOCUMENTED" | "OBSERVED" | "INFERRED";
  title: string;
  children: ReactNode;
}) {
  const classes =
    type === "DOCUMENTED"
      ? "border-blue-300 bg-blue-50"
      : type === "OBSERVED"
        ? "border-[#9fc9ad] bg-[#f0fff4]"
        : "border-violet-300 bg-violet-50";

  return (
    <div className={`rounded-xl border-2 p-5 ${classes}`}>
      <p className="text-xs font-bold uppercase tracking-[0.12em]">{type}</p>
      <h3 className="mt-2 text-lg font-bold text-[#205c38]">{title}</h3>
      <div className="mt-3 leading-7">{children}</div>
    </div>
  );
}

export default function LessonFiveAPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>
          <p className="mb-2 text-lg font-semibold text-white/90">Lesson 5A</p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Scheduled Custom Email: Communicating Current State on a Schedule
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Previous lessons began with record events. Lesson 5A changes the
            initiating context: time arrives, Quickbase evaluates current
            information, and the communication is assembled from reports.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/4"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/6"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Next Lesson →
            </Link>{" "}
            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]"
            >
              Table of Contents
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section className="mb-14">
          <QuestionCard question="What if nothing changes on the record, but the business still needs communication at a specific time?">
            <p>
              A Scheduled Custom Email is not simply a Notification with a clock
              attached. It is initiated by time rather than a record event and
              naturally communicates current state through reports.
            </p>
          </QuestionCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Review Connection"
            title="The First Question Changes"
            icon={<LuRefreshCw />}
          >
            <p>
              Earlier lessons asked what just happened. Lesson 5A asks what
              Quickbase should communicate when a scheduled time arrives.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Event-Driven
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuZap />} title="Record Event" />
                <FlowArrow />
                <FlowStep
                  icon={<LuFilter />}
                  title="Evaluate Event / Change / State"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuMail />}
                  title="Communicate Transition"
                  final
                />
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Time-Driven
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuClock3 />} title="Time Arrives" />
                <FlowArrow />
                <FlowStep
                  icon={<LuDatabase />}
                  title="Evaluate Current Information"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuMail />}
                  title="Communicate Current State"
                  final
                />
              </div>
            </div>
          </div>

          <Remember title="No Task has to be added, modified, or deleted for a Scheduled Custom Email to run">
            <p>This is the conceptual break from Lessons 2–4.</p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="A Record Can Stay the Same While Its Meaning Changes"
            icon={<LuCalendarClock />}
          >
            <p>
              A Task may remain Open with a Due Date of September 10 while the
              calendar advances from September 7 to 8 to 9.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-4">
            <ConceptCard title="Stored State" icon={<LuDatabase />}>
              <p>Status = Open</p>
              <p className="mt-2">Due Date = September 10</p>
            </ConceptCard>
            {["September 7", "September 8", "September 9"].map((date) => (
              <ConceptCard key={date} title={date} icon={<LuClock3 />}>
                <p>
                  Stored values are unchanged, but the Task&apos;s relationship
                  to today is different.
                </p>
              </ConceptCard>
            ))}
          </div>

          <Remember title="Stored state can remain unchanged while current business significance changes over time">
            <p>
              Reports, date criteria, and formula-derived values can reflect
              this current significance without requiring a record edit.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 3"
            title="Triggered Custom Email vs. Scheduled Custom Email"
            icon={<LuTable2 />}
          />

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-195 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-5 py-4">Triggered Custom Email</th>
                  <th className="px-5 py-4">Scheduled Custom Email</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Initiated by a record event", "Initiated by time"],
                  ["Has a triggering record", "Has no triggering record"],
                  [
                    "Naturally describes a transition",
                    "Naturally describes current state",
                  ],
                  [
                    "Can answer “What changed?”",
                    "Better suited to “What is true now?”",
                  ],
                  [
                    "Uses event/change/state conditions",
                    "Uses schedule + report data",
                  ],
                  [
                    "Record context is central",
                    "Report context becomes central",
                  ],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-200">
                    <td className="px-5 py-4">{row[0]}</td>
                    <td className="px-5 py-4">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Remember title="A Scheduled Custom Email has no natural before → event → after record transition">
            <p>
              That is why its architecture feels report-centric rather than
              record-centric.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 4"
            title="A Schedule Provides Temporal Initiation, Not Temporal Memory"
            icon={<LuCircleHelp />}
          >
            <p>
              “Every Friday, show me what changed” immediately raises a second
              question: since when?
            </p>
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Since Sunday?",
              "Since Monday morning?",
              "Since the previous scheduled email?",
              "During the previous seven rolling days?",
              "Across which records?",
              "Which fields count as meaningful changes?",
              "What if 43 Tasks changed?",
              "What if nothing changed?",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-300 bg-white p-5"
              >
                {item}
              </div>
            ))}
          </div>

          <Remember title="The schedule tells Quickbase when to evaluate; it does not automatically establish a historical comparison boundary">
            <p>
              Historical comparison requires explicit design for the period,
              records, and changes that matter.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 5"
            title="WHEN, WHAT, WHO, HOW"
            icon={<LuRoute />}
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ConceptCard title="WHEN" icon={<LuCalendarClock />}>
              <p>
                <strong>Schedule</strong>
              </p>
              <p className="mt-2">When should Quickbase evaluate?</p>
            </ConceptCard>
            <ConceptCard title="WHAT" icon={<LuTable2 />}>
              <p>
                <strong>Report(s)</strong>
              </p>
              <p className="mt-2">What current information matters?</p>
            </ConceptCard>
            <ConceptCard title="WHO" icon={<LuUsers />}>
              <p>
                <strong>Recipients</strong>
              </p>
              <p className="mt-2">Who should receive the communication?</p>
            </ConceptCard>
            <ConceptCard title="HOW" icon={<LuMail />}>
              <p>
                <strong>Custom Email</strong>
              </p>
              <p className="mt-2">How should the information be presented?</p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="Reports Define the Data Question"
            icon={<LuTable2 />}
          >
            <p>
              Reports are not merely visual objects pasted into an email. They
              define the current-state question.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Open Tasks Report" icon={<LuDatabase />}>
              <p>Which Tasks are Open right now?</p>
            </ConceptCard>
            <ConceptCard title="Due Soon Report" icon={<LuClock3 />}>
              <p>Which Tasks currently qualify as due soon?</p>
            </ConceptCard>
            <ConceptCard title="Completed Tasks Report" icon={<LuBadgeCheck />}>
              <p>Which Tasks are currently Complete?</p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 7"
            title="Multiple Reports Can Become One Scheduled Briefing"
            icon={<LuBookOpen />}
          />

          <Discovery title="Multiple reports were inserted into one Scheduled Custom Email">
            <CodeBlock
              code={multiReportSource}
              title="Observed qb-report Elements"
            />
          </Discovery>

          <div className="grid gap-5 md:grid-cols-3">
            {["Requires Attention", "Due This Week", "Completed Work"].map(
              (title) => (
                <ConceptCard key={title} title={title} icon={<LuTable2 />}>
                  <p>[Report]</p>
                </ConceptCard>
              ),
            )}
          </div>

          <Remember title="The communication product can be the briefing, not the individual report">
            <p>
              This becomes the key contrast with Report Subscriptions in Lesson
              5B.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 8–9"
            title="Empty Reports Are Still Information"
            icon={<LuEye />}
          />

          <Discovery title="An empty embedded report rendered its title, columns, and a visible 0">
            <div className="rounded-xl border border-gray-300 bg-white p-5">
              <p className="font-bold text-[#205c38]">
                Tasks Requiring Attention
              </p>
              <div className="mt-4 rounded-lg border border-gray-200 p-8 text-center text-4xl font-extrabold text-[#276749]">
                0
              </div>
            </div>
            <p className="mt-5">
              The recipient gets positive evidence that the report evaluated and
              returned zero matching records.
            </p>
          </Discovery>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="Exception Communication" icon={<LuBellRing />}>
              <p>“Only bother me when something needs attention.”</p>
              <p className="mt-3">
                Suppressing an empty result may be appropriate.
              </p>
            </ConceptCard>
            <ConceptCard title="Status Assurance" icon={<LuShield />}>
              <p>
                “Every Monday I need confirmation that the review occurred.”
              </p>
              <p className="mt-3">
                Sending the empty report is more appropriate.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Silence is ambiguous">
            <p>
              No email does not prove that zero records matched. It can also
              mean delivery failed, permissions blocked delivery, the report or
              automation changed, or another configuration problem occurred.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 10–11"
            title="Permission Checking Still Matters"
            icon={<LuShield />}
          />

          <Discovery title="An unauthorized recipient produced an administrator delivery error">
            <p>
              With <strong>Check recipient permissions</strong> enabled, a test
              recipient lacking access caused Quickbase to report that the
              Scheduled Task Status Review could not be sent because access to
              the app or one of its tables was unavailable.
            </p>

            <p className="mt-4">
              The message used “You don&apos;t have access,” even though the
              administrator receiving the error did have access. The controlled
              test strongly indicates the unauthorized recipient caused the
              failure.
            </p>
          </Discovery>

          <Remember title="Troubleshooting may require reasoning from configuration, not reading the error message literally">
            <p>
              This also reinforces why missing email cannot safely be
              interpreted as proof of an empty result.
            </p>
          </Remember>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="Check recipient permissions" icon={<LuLock />}>
              <p>
                Recipient authorization is evaluated against the underlying
                information.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Ignore recipient permissions"
              icon={<LuShield />}
            >
              <p>
                Review Lesson 4 first. This is a data-governance decision, not
                merely a delivery preference.
              </p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 12"
            title="The UTC Trap: When 8:00 AM Doesn't Mean 8:00 AM"
            icon={<LuClock3 />}
          />

          <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-3 md:items-center">
              <div className="rounded-xl bg-white p-5 text-center">
                <p className="font-bold text-[#7a5200]">Business Time</p>
                <p className="mt-2">Monday 8:00 AM Central</p>
              </div>
              <div className="text-center font-bold text-[#7a5200]">
                → UTC conversion →
              </div>
              <div className="rounded-xl bg-white p-5 text-center">
                <p className="font-bold text-[#7a5200]">Quickbase Schedule</p>
                <p className="mt-2">Corresponding UTC time</p>
              </div>
            </div>
            <p className="mt-6 leading-8">
              Daylight-saving changes can alter that relationship. A technically
              correct UTC schedule can still be operationally wrong for the
              business if the local conversion is misunderstood.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 13–14"
            title="Custom Email Source Is Not a Formula Engine"
            icon={<LuBraces />}
          />

          <Discovery title="Formula-like text rendered literally in the received email">
            <CodeBlock code={formulaRabbitHole} title="Formula Test" />
            <p className="mt-5">
              None of those expressions were evaluated in the Scheduled Custom
              Email body.
            </p>
          </Discovery>

          <Remember title="The email body is a presentation context, not an ordinary Quickbase Formula evaluation context">
            <p>
              Put reusable business meaning in the data/report layer and let the
              communication layer present it.
            </p>
          </Remember>

          <MentalModel title="Where formula logic belongs">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <FlowStep icon={<LuGitBranch />} title="Formula / Table Logic" />
              <FlowArrow />
              <FlowStep icon={<LuTable2 />} title="Report" />
              <FlowArrow />
              <FlowStep
                icon={<LuMail />}
                title="Scheduled Custom Email"
                final
              />
            </div>
          </MentalModel>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 15"
            title="Strengths and Boundaries"
            icon={<LuTable2 />}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Strengths
              </p>
              <ul className="mt-5 space-y-3 leading-7">
                <li>Runs without a record mutation.</li>
                <li>Communicates current report state.</li>
                <li>Combines multiple reports into one briefing.</li>
                <li>Adds explanatory content around reports.</li>
                <li>Can visibly communicate an empty report.</li>
                <li>Supports explicit or supported dynamic recipients.</li>
                <li>Preserves recipient-permission checks.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-gray-600">
                Boundaries / Limitations
              </p>
              <ul className="mt-5 space-y-3 leading-7">
                <li>No triggering-record transition.</li>
                <li>No automatic historical comparison boundary.</li>
                <li>No formula execution inside the email body in our test.</li>
                <li>UTC scheduling requires local-time translation.</li>
                <li>Missing email does not prove zero qualifying records.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 16"
            title="Requirement Decomposition"
            icon={<LuSearch />}
          >
            <p>
              “Every Monday morning, send managers a summary of the Tasks they
              need to worry about this week.”
            </p>
          </SectionHeading>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-155 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749]">
                  <th className="px-4 py-3">Business phrase</th>
                  <th className="px-4 py-3">Automation concern</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Every Monday morning", "WHEN"],
                  ["Tasks they need to worry about", "WHAT"],
                  ["Managers", "WHO"],
                  ["Summary", "HOW"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-gray-200">
                    <td className="px-4 py-3">{row[0]}</td>
                    <td className="px-4 py-3 font-bold text-[#276749]">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Remember title="Clarify vague business language before configuring Quickbase">
            <p>
              “Need to worry about” might mean Status is not Complete AND Due
              Date is within seven days—or something else entirely.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 17–18"
            title="Design Scenarios"
            icon={<LuWorkflow />}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Scenario A — Exception Communication"
              icon={<LuBellRing />}
            >
              <p>“Only bother me when something needs attention.”</p>
              <p className="mt-3">
                Empty report may justify suppressing the email, but silence
                remains operationally ambiguous.
              </p>
            </ConceptCard>

            <ConceptCard
              title="Scenario B — Status Assurance"
              icon={<LuShield />}
            >
              <p>
                “Every Monday I need confirmation that the review occurred.”
              </p>
              <p className="mt-3">
                Send even when the report is empty; the embedded report can
                visibly show 0.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-6 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Weekly Leadership Briefing
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {["Outstanding Tasks", "Due This Week", "Completed Work"].map(
                (title) => (
                  <div key={title} className="rounded-xl bg-white p-5">
                    <p className="font-bold text-[#205c38]">{title}</p>
                    <p className="mt-2 text-sm text-gray-600">[Report]</p>
                  </div>
                ),
              )}
            </div>
            <p className="mt-5 leading-8">
              Scheduled Custom Email fits because the unit of communication is a
              composed multi-report briefing.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 19"
            title="Evidence Board"
            icon={<LuEye />}
          />

          <div className="grid gap-5 lg:grid-cols-3">
            <EvidenceCard type="DOCUMENTED" title="Quickbase Help">
              <ul className="space-y-2">
                <li>Custom Emails can use recurring schedules.</li>
                <li>Recurrence can be Daily, Weekly, Monthly, or Yearly.</li>
                <li>Scheduled emails operate according to UTC.</li>
                <li>Scheduled emails can include the Report element.</li>
                <li>Empty-report send behavior can be configured.</li>
              </ul>
            </EvidenceCard>

            <EvidenceCard type="OBSERVED" title="Our Laboratory">
              <ul className="space-y-2">
                <li>Recurring schedule removed record-event controls.</li>
                <li>Multiple reports were inserted into one email.</li>
                <li>Each report produced a separate qb-report element.</li>
                <li>Populated reports rendered current Tasks data.</li>
                <li>Empty report rendered its structure and 0.</li>
                <li>Formula syntax rendered literally.</li>
                <li>Permission checking could prevent delivery.</li>
                <li>
                  UTC misunderstanding caused an apparent schedule failure.
                </li>
              </ul>
            </EvidenceCard>

            <EvidenceCard type="INFERRED" title="Working Architectural Model">
              <p>
                Time initiates the process, reports define the current
                information scope, recipient rules determine who may receive it,
                and Custom Email determines presentation.
              </p>
              <p className="mt-4">
                The permission failure is best explained by the deliberately
                unauthorized recipient, despite ambiguous admin-facing wording.
              </p>
            </EvidenceCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 20"
            title="Final Mental Model"
            icon={<LuRoute />}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Triggered Communication
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuZap />} title="Event" />
                <FlowArrow />
                <FlowStep icon={<LuRefreshCw />} title="What Changed?" />
                <FlowArrow />
                <FlowStep
                  icon={<LuFilter />}
                  title="Does This Record Qualify?"
                />
                <FlowArrow />
                <FlowStep icon={<LuUsers />} title="Who Should Receive It?" />
                <FlowArrow />
                <FlowStep
                  icon={<LuMail />}
                  title="Communicate the Transition"
                  final
                />
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Scheduled Communication
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuClock3 />} title="Time" />
                <FlowArrow />
                <FlowStep
                  icon={<LuDatabase />}
                  title="What Current Information Matters?"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuTable2 />}
                  title="Which Reports Represent It?"
                />
                <FlowArrow />
                <FlowStep icon={<LuUsers />} title="Who Should Receive It?" />
                <FlowArrow />
                <FlowStep
                  icon={<LuMail />}
                  title="Communicate the Current State"
                  final
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "A schedule provides temporal initiation, not temporal memory.",
              "Reports define the data question.",
              "Zero records can still be meaningful information.",
              "Silence is ambiguous.",
              "The email template presents information; it is not an ordinary Quickbase Formula engine.",
              "Scheduled Custom Email is especially strong when the communication itself is a composed briefing.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 font-semibold text-[#205c38]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Lesson Outcome"
            title="What the Student Should Be Able to Reason About"
            icon={<LuBadgeCheck />}
          />

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-lg leading-8">
              Given a requirement such as “Every Friday morning send management
              the information they need about current Tasks,” the student should
              reason about WHEN it should run, WHAT reports define the
              information, WHO may receive it, HOW the communication should be
              assembled, and what operational limitations matter.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Next: Lesson 5B
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Report Subscriptions
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              Scheduled Custom Email can already distribute one or more reports
              on a recurring schedule. So why does Quickbase also have Report
              Subscriptions?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/5b"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]"
              >
                Continue to Lesson 5B →
              </Link>
              <Link
                href="/lessons"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
              >
                View All Lessons
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
