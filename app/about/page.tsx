import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Quickbase Automation Developer Lab, an independent experimental tutorial project for learning Quickbase automation and Pipelines.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#17452a] bg-[#276749] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-12">
          <p className="mb-2 font-bold uppercase tracking-[0.16em] text-white/80">
            Quickbase Automation Developer Lab
          </p>

          <h1 className="text-4xl font-extrabold sm:text-5xl">
            About This Project
          </h1>

          <p className="mt-5 max-w-4xl text-xl leading-9 text-white">
            A learning laboratory documenting what happens when Quickbase data,
            events, time, conditions, communication, and workflow begin working
            together.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* ====================================================
            INDEPENDENT PROJECT
        ==================================================== */}

        <section className="mb-14 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Independent Project
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            This Is Not an Official Quickbase Project
          </h2>

          <p className="mt-5 text-lg leading-8">
            This website, its tutorials, experiments, commentary, examples, and
            associated source code are independently created learning materials.
          </p>

          <p className="mt-4 text-lg font-bold leading-8">
            I am not affiliated with, employed by, sponsored by, endorsed by, or
            representing Quickbase, Inc.
          </p>

          <p className="mt-4 text-lg leading-8">
            Nothing here should be interpreted as official Quickbase
            documentation, official technical guidance, or a statement made on
            behalf of Quickbase.
          </p>
        </section>

        {/* ====================================================
            WHY
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Purpose
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Why This Project Exists
          </h2>

          <div className="mt-5 max-w-5xl space-y-4 text-lg leading-8">
            <p>
              The Quickbase Automation Developer Lab is a personal learning
              project created to develop a deeper understanding of how
              automation actually behaves inside Quickbase.
            </p>

            <p>
              Rather than beginning with Pipelines and treating every automatic
              process as a workflow problem, the laboratory begins with the
              simpler mechanisms already built into Quickbase: Alerts,
              Notifications, Reminders, Subscriptions, Custom Emails, record
              events, reports, permissions, and schedules.
            </p>

            <p>
              Pipelines enter later, when a requirement crosses from
              communication into workflow.
            </p>
          </div>
        </section>

        {/* ====================================================
            CORE QUESTION
        ==================================================== */}

        <section className="mb-14 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            The Question Behind the Lab
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            What happened, what does Quickbase know about it, and what should
            happen because of it?
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            That question sits underneath almost every topic explored here.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-[#9fc9ad] bg-white p-5">
              <p className="font-bold text-[#205c38]">What happened?</p>

              <p className="mt-3 leading-7">
                A record changed, a field changed, a date arrived, a schedule
                executed, or another system caused an event.
              </p>
            </div>

            <div className="rounded-xl border border-[#9fc9ad] bg-white p-5">
              <p className="font-bold text-[#205c38]">
                What does Quickbase know?
              </p>

              <p className="mt-3 leading-7">
                Current values, previous values, changed fields, related data,
                users, dates, reports, and execution context.
              </p>
            </div>

            <div className="rounded-xl border border-[#9fc9ad] bg-white p-5">
              <p className="font-bold text-[#205c38]">What should happen?</p>

              <p className="mt-3 leading-7">
                Communicate information, retrieve more data, change records, or
                execute a larger workflow.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            EXPERIMENTAL CURRICULUM
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Curriculum Philosophy
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            The Curriculum Is Not Written in Stone
          </h2>

          <div className="mt-5 max-w-5xl space-y-4 text-lg leading-8">
            <p>
              There is a broad roadmap for the laboratory, but the final lesson
              sequence is intentionally allowed to evolve.
            </p>

            <p>
              A topic that originally appears large enough for three lessons may
              collapse naturally into one. A seemingly simple feature may reveal
              enough unexpected behavior to deserve several separate
              experiments.
            </p>

            <p>
              New lessons are therefore added after the subject has been
              researched and tested rather than publishing a large theoretical
              curriculum in advance.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-7">
            <pre className="min-w-max font-mono text-base leading-8">
              {`QUESTION
   ↓
RESEARCH
   ↓
PREDICT
   ↓
TEST QUICKBASE
   ↓
OBSERVE
   ↓
COMPARE
   ↓
CORRECT THE MODEL
   ↓
WRITE THE LESSON`}
            </pre>
          </div>
        </section>

        {/* ====================================================
            SCIENTIFIC METHOD
        ==================================================== */}

        <section className="mb-14 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Experimental Method
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Prediction Matters
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            When possible, experiments begin by predicting what Quickbase should
            do before running the test.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["Predict", "Run", "Observe", "Compare", "Explain"].map(
              (item, index) => (
                <div
                  key={item}
                  className="rounded-lg border border-gray-300 bg-white p-5 text-center"
                >
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="mt-3 font-bold text-[#205c38]">{item}</p>
                </div>
              ),
            )}
          </div>

          <p className="mt-7 max-w-5xl text-lg leading-8">
            The objective is not merely to make something work. It is to
            understand why the result occurred and whether the result matched
            the mental model that produced the prediction.
          </p>
        </section>

        {/* ====================================================
            SOURCE OF TRUTH
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Source of Truth
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Documentation and Observed Behavior Outrank Assumptions
          </h2>

          <div className="mt-5 max-w-5xl space-y-4 text-lg leading-8">
            <p>
              Quickbase documentation is used heavily throughout the project,
              especially when determining supported behavior, limitations,
              security implications, and feature boundaries.
            </p>

            <p>
              Documentation alone does not eliminate experimentation. When
              practical, documented behavior is tested in a real Quickbase
              application so the resulting lesson can distinguish between what
              was expected and what was actually observed.
            </p>

            <p>
              If an early assumption turns out to be wrong, the assumption
              should change. The tutorial should not force Quickbase behavior to
              fit a lesson outline written before the experiment happened.
            </p>
          </div>

          <div className="mt-7 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
              A Useful Rule
            </p>

            <p className="mt-3 text-xl font-bold">
              Documentation and actual Quickbase behavior outrank
              assumptions—including mine.
            </p>
          </div>
        </section>

        {/* ====================================================
            WHAT THIS LAB STUDIES
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Scope
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            What the Laboratory Explores
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Communication",
                "Alerts, Notifications, Reminders, Subscriptions, Custom Emails, recipients, and content.",
              ],
              [
                "Events",
                "Record additions, modifications, deletions, field changes, triggers, and resulting state.",
              ],
              [
                "Time",
                "Record-relative dates, schedules, recurring processes, and time-driven behavior.",
              ],
              [
                "State",
                "Current values, previous values, transitions, conditions, and decision making.",
              ],
              [
                "Permissions",
                "Recipients, users, authorization context, sensitive information, and execution authority.",
              ],
              [
                "Pipelines",
                "Triggers, queries, actions, channels, connections, branches, loops, and workflow.",
              ],
              [
                "Quickbase Data",
                "Apps, tables, records, fields, relationships, FIDs, DBIDs, reports, and schema.",
              ],
              [
                "Languages",
                "QBL, Jinja, JSON, dynamic values, query construction, and structured data.",
              ],
              [
                "Integration",
                "REST API operations, external systems, workflow orchestration, and debugging.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-[#205c38]">{title}</h3>

                <p className="mt-3 leading-7 text-gray-800">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
            CONNECTION TO FIRST LAB
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Continuing the Developer Journey
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            This Laboratory Builds on the Same Quickbase Data Model
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            Automation does not create a separate universe from Quickbase
            application development. The same tables, records, fields,
            relationships, identifiers, queries, permissions, JSON, and REST
            APIs eventually appear inside automation workflows.
          </p>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold text-[#276749]">
                Code Pages Developer Lab
              </p>

              <p className="mt-3 text-xl font-bold">
                How do I communicate programmatically with Quickbase data?
              </p>
            </div>

            <div className="rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold text-[#276749]">
                Automation Developer Lab
              </p>

              <p className="mt-3 text-xl font-bold">
                How does Quickbase respond when data or workflow conditions
                require something to happen?
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================
            SIMPLE TOOL PRINCIPLE
        ==================================================== */}

        <section className="mb-14 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
            Engineering Principle
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            The Most Powerful Tool Is Not Automatically the Best Tool
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            A major goal of the laboratory is learning when not to use a
            Pipeline.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            If a native Quickbase Notification, Reminder, Subscription, Custom
            Email, report, relationship, or auditing feature already satisfies
            the requirement correctly, recreating that capability with a larger
            workflow may add complexity without adding value.
          </p>

          <p className="mt-4 max-w-5xl text-lg font-bold leading-8">
            The preferred automation is the least complicated mechanism that
            correctly satisfies the requirement.
          </p>
        </section>

        {/* ====================================================
            LEARNING LOG
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Living Documentation
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            A Learning Log, Not an Authority
          </h2>

          <div className="mt-5 max-w-5xl space-y-4 text-lg leading-8">
            <p>
              Lessons represent the understanding reached after the experiments
              performed at that point in the project.
            </p>

            <p>
              Quickbase itself continues to evolve. Documentation changes,
              interfaces change, features are introduced, older mechanisms may
              be deprecated, and product behavior can develop over time.
            </p>

            <p>
              A tutorial may therefore be revised when new evidence, better
              documentation, additional testing, or a correction improves the
              explanation.
            </p>
          </div>
        </section>

        {/* ====================================================
            SECURITY
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Security
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Automation Security Is Part of the Lesson
          </h2>

          <div className="mt-5 max-w-5xl space-y-4 text-lg leading-8">
            <p>
              Automation can expose data, send information to recipients,
              operate with a user or connection&apos;s permissions, and perform
              actions without someone manually reviewing each execution.
            </p>

            <p>
              Permissions, execution context, recipients, external systems, and
              sensitive information are therefore treated as part of automation
              design rather than as an afterthought.
            </p>

            <p>
              Examples should never be assumed to be production-ready merely
              because they work successfully in a training application.
            </p>
          </div>
        </section>

        {/* ====================================================
            WARRANTY
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Practical Disclaimer
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Verify Before Relying on an Example
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            The project is provided for educational and experimental purposes
            without guarantees of correctness, completeness, fitness for a
            particular purpose, or continued compatibility with Quickbase.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            Anyone adapting an example should independently verify current
            Quickbase documentation, security requirements, limitations, and
            behavior within their own application environment.
          </p>
        </section>

        {/* ====================================================
            TRADEMARK
        ==================================================== */}

        <section className="mb-14">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Names and Trademarks
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Quickbase Remains Quickbase&apos;s
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            Quickbase product names, terminology, trademarks, and related
            intellectual property belong to their respective owners. They are
            used here only to identify the platform and technologies being
            studied.
          </p>
        </section>

        {/* ====================================================
            PUBLIC PROJECT
        ==================================================== */}

        <section className="mb-14 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Why Share It?
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Learning Improves When Someone Can Challenge the Result
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            Publishing the laboratory allows other Quickbase builders and
            developers to follow the experiments, identify mistakes, suggest
            better tests, and contribute information that improves the lessons.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            Corrections are useful here. Discovering that something was
            misunderstood is not a failure of the project—it is precisely the
            kind of result an experimental learning project should preserve.
          </p>
        </section>

        {/* ====================================================
            IN SHORT
        ==================================================== */}

        <section className="mb-14 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
            In Short
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Learn It by Making Quickbase Prove It
          </h2>

          <div className="mt-5 space-y-3 text-lg leading-8">
            <p>I&apos;m learning Quickbase automation.</p>

            <p>I&apos;m predicting what I think should happen.</p>

            <p>I&apos;m testing those predictions against Quickbase.</p>

            <p>I&apos;m documenting what survives the experiment.</p>

            <p className="font-bold">
              No mystical Pipeline priesthood required. 😄
            </p>
          </div>
        </section>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <div className="flex flex-col gap-4 border-t border-gray-300 pt-8 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="inline-flex rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749] transition hover:bg-[#f0fff4]"
          >
            ← Automation Lab Home
          </Link>

          <Link
            href="/lessons"
            className="inline-flex rounded-lg bg-[#276749] px-5 py-3 font-bold text-white transition hover:bg-[#205c38]"
          >
            Published Lessons →
          </Link>
        </div>
      </div>
    </main>
  );
}
