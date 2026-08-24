import Link from "next/link";

import { lessons } from "./data/lessons";

import {
  LuArrowDown,
  LuClock3,
  LuDatabase,
  LuGitBranch,
  LuMessageSquare,
  LuRefreshCw,
  LuRocket,
  LuWorkflow,
  LuZap,
  LuLightbulb,
  LuSearch,
  LuBrain,
  LuCheckCheck,
  LuEye,
  LuFlaskConical,
  LuGitCompare,
  LuPencilLine,
  LuBoxes,
  LuBraces,
  LuCable,
  LuFileJson,
  LuKeyRound,
  LuLayoutGrid,
  LuLink2,
  LuListTree,
  LuTable2,
  LuSearchCode,
} from "react-icons/lu";

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
                    className="absolute inset-0 bg-linear-to-r from-white via-[#f0fff4] to-white opacity-0 transition duration-300 group-hover:opacity-100"
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

            <div className="p-6 sm:p-8">
              <div className="mx-auto flex max-w-3xl flex-col items-center">
                {/* INFORMATION */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuDatabase aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Information
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Automation begins with Quickbase data, records, fields,
                        and values.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* COMMUNICATION */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuMessageSquare aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Communication
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Quickbase begins by telling people that something
                        matters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* EVENTS */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuZap aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Events
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Something happens that gives Quickbase a reason to
                        react.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* TIME */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuClock3 aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Time
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Dates and schedules allow something to matter even when
                        no record was manually changed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* CONDITIONS */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuGitBranch aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Conditions
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Rules determine whether the event or situation should
                        cause anything else to happen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* STATE CHANGES */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuRefreshCw aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        State Changes
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Records move from one meaningful condition to another,
                        such as Open → Complete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* WORKFLOW */}
                <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                      <LuWorkflow aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#205c38]">
                        Workflow
                      </h3>

                      <p className="mt-1 leading-7 text-gray-600">
                        Events, conditions, information, and actions become an
                        organized process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-11 items-center justify-center">
                  <LuArrowDown
                    aria-hidden="true"
                    className="text-2xl text-[#276749]/60"
                  />
                </div>

                {/* PIPELINES */}
                <div className="group w-full rounded-2xl border-2 border-[#276749] bg-[#276749] p-5 text-white shadow-lg shadow-[#276749]/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl text-white transition-transform duration-300 group-hover:scale-110">
                      <LuRocket aria-hidden="true" />
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                        Convergence Point
                      </p>

                      <h3 className="mt-1 text-xl font-extrabold text-white">
                        Pipelines
                      </h3>

                      <p className="mt-2 leading-7 text-white/85">
                        The earlier concepts converge into multi-step automation
                        capable of inspecting data, making decisions, querying
                        information, and performing actions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

          <div className="mt-8 rounded-2xl border-2 border-[#9fc9ad] bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              {/* QUESTION */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-[#f0fff4] p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#276749] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <LuLightbulb aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 1
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Question
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      Begin with something about Quickbase that we genuinely
                      want to understand.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* RESEARCH */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                    <LuSearch aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 2
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Research
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      Study Quickbase documentation, terminology, configuration
                      options, and known limitations before building the
                      experiment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* PREDICT */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                    <LuBrain aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 3
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Predict
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      State what we believe Quickbase should do before we run
                      the test.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* EXPERIMENT */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                    <LuFlaskConical aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 4
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Experiment
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      Make a controlled change in the Automation Lab and allow
                      Quickbase to respond.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* OBSERVE */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                    <LuEye aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 5
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Observe
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      Record what Quickbase actually did without changing the
                      explanation to fit our expectation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* COMPARE */}
              <div className="group w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749] transition-transform duration-300 group-hover:scale-110">
                    <LuGitCompare aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Step 6
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                      Compare
                    </h3>

                    <p className="mt-1 leading-7 text-gray-600">
                      Compare the observed result with the original prediction
                      and the documented behavior.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* CORRECT MODEL */}
              <div className="group w-full rounded-2xl border border-[#d4a72c] bg-[#fffaf0] p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#7a5200] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <LuCheckCheck aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5200]">
                      Step 7
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#654700]">
                      Correct Our Model
                    </h3>

                    <p className="mt-1 leading-7 text-gray-700">
                      Keep what survived the experiment, correct what did not,
                      and refine the mental model before teaching it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center">
                <LuArrowDown
                  aria-hidden="true"
                  className="text-2xl text-[#276749]/60"
                />
              </div>

              {/* WRITE LESSON */}
              <div className="group w-full rounded-2xl border-2 border-[#276749] bg-[#276749] p-5 text-white shadow-lg shadow-[#276749]/15 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl text-white transition-transform duration-300 group-hover:scale-110">
                    <LuPencilLine aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                      Final Step
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-white">
                      Write the Lesson
                    </h3>

                    <p className="mt-2 leading-7 text-white/85">
                      Only after the behavior has been researched, predicted,
                      tested, observed, and reconciled does it become a
                      published tutorial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

        <div className="mt-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            {/* ======================================================
        LAYER 1 — QUICKBASE DATA MODEL
    ====================================================== */}

            <div className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-2xl text-white shadow-sm">
                    <LuDatabase aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Foundation Layer
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                      Quickbase Data Model
                    </h3>
                  </div>
                </div>

                <p className="mt-4 max-w-4xl leading-7 text-gray-700">
                  Automation begins with the structure already present in a
                  Quickbase application. These are the objects, data,
                  connections, and security boundaries the automation will
                  eventually operate against.
                </p>
              </div>

              {/* Items */}
              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuLayoutGrid aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Apps</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Application boundary
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuTable2 aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Tables</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Structured collections
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuListTree aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Records</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Individual data entries
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuBoxes aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Fields</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Values and attributes
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuLink2 aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Relationships</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Connections between data
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuKeyRound aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-bold text-gray-900">Permissions</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      Access and authority
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================
        CONNECTOR
    ====================================================== */}

            <div className="flex flex-col items-center py-3">
              <div className="h-5 w-px bg-[#9fc9ad]" />

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9fc9ad] bg-[#f0fff4] text-[#276749]">
                <LuArrowDown aria-hidden="true" />
              </span>

              <div className="h-5 w-px bg-[#9fc9ad]" />
            </div>

            {/* ======================================================
        LAYER 2 — QUERY & DATA LANGUAGES
    ====================================================== */}

            <div className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-2xl text-white shadow-sm">
                    <LuBraces aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Expression &amp; Data Layer
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
                      Query &amp; Data Languages
                    </h3>
                  </div>
                </div>

                <p className="mt-4 max-w-4xl leading-7 text-gray-700">
                  These languages and formats describe what data we want, how
                  dynamic values are expressed, and how structured information
                  moves between systems.
                </p>
              </div>

              {/* Items */}
              <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-7">
                <div className="group rounded-xl border border-gray-200 bg-[#f7f8fa] p-5 text-center transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuSearchCode aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-gray-900">QBL</p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Find and filter Quickbase records
                  </p>
                </div>

                <div className="group rounded-xl border border-gray-200 bg-[#f7f8fa] p-5 text-center transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuBraces aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-gray-900">Jinja</p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Express dynamic Pipeline values and logic
                  </p>
                </div>

                <div className="group rounded-xl border border-gray-200 bg-[#f7f8fa] p-5 text-center transition hover:border-[#9fc9ad] hover:bg-white hover:shadow-sm">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
                    <LuFileJson aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-gray-900">JSON</p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Represent structured data
                  </p>
                </div>
              </div>
            </div>

            {/* ======================================================
        CONNECTOR
    ====================================================== */}

            <div className="flex flex-col items-center py-3">
              <div className="h-5 w-px bg-[#9fc9ad]" />

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#9fc9ad] bg-[#f0fff4] text-[#276749]">
                <LuArrowDown aria-hidden="true" />
              </span>

              <div className="h-5 w-px bg-[#9fc9ad]" />
            </div>

            {/* ======================================================
        LAYER 3 — AUTOMATION & INTERFACES
    ====================================================== */}

            <div className="w-full overflow-hidden rounded-2xl border-2 border-[#276749] bg-white shadow-lg shadow-[#276749]/10">
              {/* Header */}
              <div className="border-b border-[#17452a] bg-[#276749] px-6 py-5 text-white sm:px-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl text-white">
                    <LuWorkflow aria-hidden="true" />
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                      Execution Layer
                    </p>

                    <h3 className="mt-1 text-2xl font-extrabold text-white">
                      Automation &amp; Interfaces
                    </h3>
                  </div>
                </div>

                <p className="mt-4 max-w-4xl leading-7 text-white/85">
                  These are the mechanisms that use the underlying data model
                  and languages to communicate, automate work, or interact with
                  Quickbase programmatically.
                </p>
              </div>

              {/* Items */}
              <div className="grid gap-4 bg-[#f0fff4] p-6 sm:grid-cols-3 sm:p-7">
                <div className="group rounded-xl border border-[#b7d8c2] bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">
                    <LuZap aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-[#205c38]">
                    Native Quickbase
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Built-in communication and automation
                  </p>
                </div>

                <div className="group rounded-xl border border-[#b7d8c2] bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">
                    <LuWorkflow aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-[#205c38]">Pipelines</p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Multi-step workflow orchestration
                  </p>
                </div>

                <div className="group rounded-xl border border-[#b7d8c2] bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">
                    <LuCable aria-hidden="true" />
                  </span>

                  <p className="mt-3 font-bold text-[#205c38]">REST API</p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Programmatic Quickbase interface
                  </p>
                </div>
              </div>
            </div>
          </div>
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
