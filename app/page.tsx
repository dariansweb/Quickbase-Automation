import Link from "next/link";

import { lessons } from "./data/lessons";

/* ============================================================
   REUSABLE HOME COMPONENTS
   ============================================================ */

function JourneyCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
          {number}
        </span>

        <div>
          <h3 className="text-xl font-bold text-[#205c38]">{title}</h3>

          <div className="mt-3 leading-7 text-gray-800">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#205c38]">{title}</h3>

      <div className="mt-3 leading-7 text-gray-800">{children}</div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HERO
      ====================================================== */}

      <header className="border-b border-[#17452a] bg-[#276749] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute right-10 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative max-w-5xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80 sm:text-base">
                Quickbase Tutorials
              </p>

              <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Automation Developer Lab
              </h1>

              <p className="mt-5 max-w-4xl text-xl leading-9 text-white">
                Learn how Quickbase responds when data, time, conditions, or
                workflow requirements demand that something happen.
              </p>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
                Begin with communication and record events, then progressively
                investigate time, conditions, state changes, workflow logic,
                Pipelines, QBL, Jinja, JSON, APIs, and automation reliability.
              </p>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                The purpose is not to memorize where automation controls appear
                in Quickbase. The purpose is to understand what happened, what
                Quickbase knows about it, and what should happen next.
              </p>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                New students begin by building a small Quickbase Automation Lab
                application. From there, each lesson adds only the data,
                configuration, or automation needed for the next experiment.
              </p>

              <div className="mt-9">
                <Link
                  href="/get-started"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-white px-7 py-4 text-lg font-extrabold text-[#205c38] shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-white via-[#f0fff4] to-white opacity-0 transition duration-300 group-hover:opacity-100"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#9fc9ad]/30 blur-2xl transition duration-300 group-hover:scale-125"
                  />

                  <span className="relative flex items-center gap-3">
                    <span>Build the Automation Lab</span>

                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          PREMISE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-5xl">
          <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
            Course Premise
          </p>

          <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
            Start With the Requirement, Not the Automation Tool
          </h2>

          <p className="mt-5 text-lg leading-8">
            Quickbase contains several mechanisms that can reasonably be called
            automation. They overlap in places, but they do not all respond to
            the same events or produce the same kinds of results.
          </p>

          <p className="mt-4 text-lg leading-8">
            Before choosing Notifications, Reminders, Subscriptions, Custom
            Emails, or Pipelines, this lab asks three more fundamental
            questions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <JourneyCard number="1" title="What happened?">
            <p>
              Did a record change? Did a date become important? Did a schedule
              execute? Did an external system cause something to happen?
            </p>
          </JourneyCard>

          <JourneyCard number="2" title="What does Quickbase know?">
            <p>
              Does Quickbase know only that a record changed, which field
              changed, its current state, its previous state, or related data?
            </p>
          </JourneyCard>

          <JourneyCard number="3" title="What should happen next?">
            <p>
              Should someone receive information, should data change, should
              related records be queried, or should an entire workflow execute?
            </p>
          </JourneyCard>
        </div>
      </section>

      {/* ======================================================
          PROGRESSION
      ====================================================== */}

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="max-w-5xl">
            <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
              Learning Progression
            </p>

            <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
              From Information to Workflow
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-800">
              Pipelines are not treated as an isolated advanced feature. The
              course progressively develops the concepts that eventually make a
              Pipeline understandable.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#f0fff4]">
            <div className="border-b border-[#9fc9ad] bg-[#e6f4ea] px-6 py-4">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Automation Mental Model
              </p>
            </div>

            <div className="overflow-x-auto p-8">
              <pre className="min-w-max font-mono text-base leading-8 sm:text-lg">
                {`INFORMATION
    ↓
COMMUNICATION
    ↓
EVENTS
    ↓
TIME
    ↓
CONDITIONS
    ↓
STATE CHANGES
    ↓
WORKFLOW
    ↓
PIPELINES`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAJOR AREAS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-5xl">
          <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
            Laboratory Territory
          </p>

          <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
            The Major Ideas We Expect to Investigate
          </h2>

          <p className="mt-5 text-lg leading-8">
            These are broad areas rather than a frozen list of lessons. The
            exact curriculum will evolve as actual Quickbase behavior is tested
            and documented.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <TopicCard title="Communication">
            <p>
              Alerts, Notifications, Reminders, Subscriptions, Custom Emails,
              recipients, message content, and delivery behavior.
            </p>
          </TopicCard>

          <TopicCard title="Events">
            <p>
              Record additions, modifications, deletions, field changes, and the
              distinction between an event and the state produced by it.
            </p>
          </TopicCard>

          <TopicCard title="Time">
            <p>
              Record-relative dates, scheduled execution, calendar-driven
              behavior, and what happens when nobody edits a record.
            </p>
          </TopicCard>

          <TopicCard title="Conditions & State">
            <p>
              Current values, previous values, transitions, decision criteria,
              and the difference between something changing and something being
              true.
            </p>
          </TopicCard>

          <TopicCard title="People & Permissions">
            <p>
              Dynamic recipients, authorization context, user permissions,
              external recipients, sensitive information, and execution
              authority.
            </p>
          </TopicCard>

          <TopicCard title="Reports">
            <p>
              Report-driven communication, scheduled delivery, personalized
              output, and the relationship between presentation and access.
            </p>
          </TopicCard>

          <TopicCard title="Pipelines">
            <p>
              Triggers, queries, actions, steps, channels, connections,
              branching, looping, scheduling, and multi-step workflow.
            </p>
          </TopicCard>

          <TopicCard title="Languages & Data">
            <p>
              QBL, Jinja, JSON, dynamic values, structured data, relationships,
              field IDs, table IDs, and records.
            </p>
          </TopicCard>

          <TopicCard title="APIs & Integration">
            <p>
              REST API requests inside larger workflows and the connection
              between the Automation Lab and earlier Quickbase developer work.
            </p>
          </TopicCard>

          <TopicCard title="Reliability">
            <p>
              Run history, debugging, failures, permissions, missing data,
              partial execution, bulk events, and scale.
            </p>
          </TopicCard>

          <TopicCard title="Design">
            <p>
              Choosing the simplest correct tool instead of automatically
              selecting the most powerful mechanism.
            </p>
          </TopicCard>

          <TopicCard title="Experimentation">
            <p>
              Predict behavior, run controlled tests, observe Quickbase, compare
              the result with expectations, and revise the model.
            </p>
          </TopicCard>
        </div>
      </section>

      {/* ======================================================
          METHOD
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="max-w-5xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Laboratory Method
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              The Lessons Are Written After the Experiment
            </h2>

            <p className="mt-5 text-lg leading-8">
              This is intentionally not a complete theoretical curriculum
              written in advance.
            </p>

            <p className="mt-4 text-lg leading-8">
              A topic is investigated first. Documentation is studied.
              Predictions are made. Quickbase is tested. Results are compared
              with expectations. Only then is the finished lesson written.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-[#9fc9ad] bg-white p-7">
            <pre className="min-w-max font-mono text-base leading-8">
              {`QUESTION
   ↓
RESEARCH
   ↓
PREDICT
   ↓
EXPERIMENT
   ↓
OBSERVE
   ↓
COMPARE
   ↓
CORRECT OUR MODEL
   ↓
WRITE THE LESSON`}
            </pre>
          </div>

          <div className="mt-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
              Important
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Documentation and actual Quickbase behavior outrank assumptions.
            </h3>

            <p className="mt-4 text-lg leading-8">
              That includes assumptions made at the beginning of this lab.
              Unexpected behavior is not an inconvenience to the curriculum. It
              is often where the most useful lesson begins.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          CONNECT TO FIRST LAB
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-5xl">
          <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
            Developer Continuity
          </p>

          <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
            The Data Model Never Disappears
          </h2>

          <p className="mt-5 text-lg leading-8">
            Automation does not replace Quickbase application development.
            Automation operates on top of the same tables, records, fields,
            relationships, permissions, identifiers, queries, and APIs.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 bg-white p-7 shadow-sm">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Earlier Developer Lab
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
              How do I communicate programmatically with Quickbase data?
            </h3>

            <p className="mt-4 leading-8">
              Apps, tables, records, fields, DBIDs, FIDs, relationships, QBL,
              JSON, JavaScript, and REST APIs.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Automation Developer Lab
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
              How does Quickbase respond when something needs to happen?
            </h3>

            <p className="mt-4 leading-8">
              Events, time, conditions, state, communication, permissions,
              queries, actions, workflows, and integrations.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-300 bg-[#f7f8fa] p-7">
          <pre className="min-w-max font-mono text-base leading-8">
            {`QUICKBASE DATA MODEL
────────────────────────
Apps
Tables
Records
Fields
Relationships
Permissions

          ↓

QUERY & DATA LANGUAGES
────────────────────────
QBL
Jinja
JSON

          ↓

AUTOMATION & INTERFACES
────────────────────────
Native Quickbase
Pipelines
REST API`}
          </pre>
        </div>
      </section>

      {/* ======================================================
          PUBLISHED LESSONS
      ====================================================== */}

      <section className="border-t border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
              Published Tutorials
            </p>

            <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">
              Current Lessons
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              Only researched and completed lessons appear here. The directory
              grows as the laboratory progresses.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {lessons.map((lesson) => (
              <Link
                key={lesson.number}
                href={lesson.link}
                className="group block h-full rounded-2xl border border-gray-300 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#276749] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#276749]/20"
              >
                <article className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-lg font-extrabold text-white shadow-sm transition group-hover:bg-[#205c38]">
                      {lesson.number}
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#276749]">
                        Lesson {lesson.number}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold leading-tight text-gray-950 group-hover:text-[#276749]">
                        {lesson.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 flex-1 leading-7 text-gray-700">
                    {lesson.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
                    <span className="font-bold text-[#276749]">
                      Open tutorial
                    </span>

                    <span className="text-2xl font-bold text-[#276749] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-gray-300 bg-white p-6">
            <p className="font-bold text-[#205c38]">
              Why aren&apos;t dozens of future lessons listed?
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              Because the laboratory is allowed to change its mind. Topics may
              merge, split, move, or reveal entirely new lessons once Quickbase
              is tested.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          PRINCIPLE
      ====================================================== */}

      <section className="border-y border-[#d4a72c] bg-[#fffaf0]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <p className="font-bold uppercase tracking-[0.14em] text-[#7a5200]">
            Automation Design Principle
          </p>

          <h2 className="mt-2 max-w-5xl text-3xl font-bold">
            Use the least complicated mechanism that correctly satisfies the
            requirement.
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            More powerful automation is not automatically better automation. A
            native Quickbase feature may sometimes be safer, simpler, clearer,
            or more appropriate than constructing a Pipeline.
          </p>
        </div>
      </section>

      {/* ======================================================
          START
      ====================================================== */}

      <section className="bg-[#205c38] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="font-bold uppercase tracking-[0.15em] text-white/70">
            Begin the Laboratory
          </p>

          {lessons.length > 0 ? (
            <>
              <h2 className="mt-2 max-w-4xl text-3xl font-extrabold sm:text-4xl">
                Lesson {lessons[0].number} — {lessons[0].title}
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
                Start with the first published lesson and follow the laboratory
                as each new topic is researched, tested, and documented.
              </p>

              <div className="mt-7">
                <Link
                  href={lessons[0].link}
                  className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
                >
                  Start the Tutorial →
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-5 text-lg leading-8 text-white/90">
              The first laboratory lesson is currently being prepared.
            </p>
          )}
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-gray-300 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <p className="font-semibold">Quickbase Automation Developer Lab</p>

          <p className="mt-1">
            Predict it. Test it. Observe it. Understand why it happened.
          </p>
        </div>
      </footer>
    </main>
  );
}
