import type { Metadata } from "next";
import Link from "next/link";

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
  children,
}: {
  step?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {step && (
        <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
          {step}
        </p>
      )}

      <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">{title}</h2>

      {children && (
        <div className="mt-4 max-w-5xl text-lg leading-8">{children}</div>
      )}
    </div>
  );
}

function ConceptCard({
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

function Remember({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-7">
      <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
        Remember This
      </p>

      <h3 className="mt-2 text-2xl font-bold">{title}</h3>

      <div className="mt-4 max-w-5xl text-lg leading-8">{children}</div>
    </div>
  );
}

function CodeDiagram({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-7 overflow-hidden rounded-xl border-2 border-[#276749] bg-[#f0fff4]">
      {title && (
        <div className="border-b border-[#9fc9ad] bg-[#e6f4ea] px-6 py-4">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            {title}
          </p>
        </div>
      )}

      <div className="overflow-x-auto p-6 sm:p-7">
        <pre className="min-w-max font-mono text-[15px] leading-8 sm:text-base">
          {children}
        </pre>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function GettingStartedPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HERO
      ====================================================== */}

      <header className="border-b border-[#17452a] bg-[#276749] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute right-8 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative max-w-5xl">
              <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
                Quickbase Automation Developer Lab
              </p>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                Getting Started — Build the Automation Laboratory
              </h1>

              <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
                Before beginning the lessons, create a small Quickbase
                application that belongs entirely to this tutorial.
              </p>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                This deliberately uncomplicated application will give us a safe
                place to investigate communication, record events, time,
                permissions, Pipelines, queries, relationships, and workflow
                behavior one experiment at a time.
              </p>


            </div>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* ======================================================
            PURPOSE
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading title="Purpose">
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Alerts",
              "Notifications",
              "Reminders",
              "Subscriptions",
              "Custom Emails",
              "Permissions",
              "Record Events",
              "Scheduled Automation",
              "Pipelines",
              "Queries",
              "Jinja",
              "Relationships",
              "Workflow Experiments",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#9fc9ad] bg-[#f0fff4] px-4 py-3 font-semibold text-[#205c38]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="text-lg leading-8">
              You do <strong>not</strong> need to complete the Quickbase Code
              Pages Developer Lab first.
            </p>

            <p className="mt-3 text-lg leading-8">
              This course begins with its own application and its own data.
            </p>
          </div>
        </section>

        {/* ======================================================
            REQUIREMENTS
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading title="What You Need">
            <p>
              Use a Quickbase account where you are permitted to create and
              modify applications.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="Builder Access">
              <p>
                The tutorials assume that you can access the Quickbase builder
                features required by the lessons.
              </p>
            </ConceptCard>

            <ConceptCard title="A Safe Training App">
              <p>
                Do not perform these experiments inside an important production
                application.
              </p>
            </ConceptCard>
          </div>

          <Remember title="This is a laboratory">
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
          <SectionHeading step="Step 1" title="Create the Tutorial App">
            <p>Create a new Quickbase application.</p>
          </SectionHeading>

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Suggested Application Name
            </p>

            <p className="mt-3 text-3xl font-extrabold text-[#205c38]">
              Quickbase Automation Lab
            </p>

            <p className="mt-5 max-w-4xl text-lg leading-8">
              The exact application name is not technically important, but using
              the tutorial name will make screenshots and instructions easier to
              follow.
            </p>
          </div>

          <p className="mt-6 max-w-5xl text-lg leading-8">
            At this point, do not create a large business application. We want
            the smallest useful schema possible.
          </p>
        </section>

        {/* ======================================================
            STEP 2
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading step="Step 2" title="Create the Tasks Table">
            <p>
              Our first working table will simply be called{" "}
              <strong>Tasks</strong>.
            </p>
          </SectionHeading>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-190 border-collapse">
              <thead className="bg-[#205c38] text-white">
                <tr>
                  <th className="p-4 text-left">Field</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Purpose</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-4 font-bold">Task Name</td>
                  <td className="p-4">Text</td>
                  <td className="p-4">Identifies the task</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="p-4 font-bold">Status</td>
                  <td className="p-4">Text - Multiple Choice</td>
                  <td className="p-4">Gives us a simple changing state</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="p-4 font-bold">Due Date</td>
                  <td className="p-4">Date</td>
                  <td className="p-4">
                    Gives us something time-relative to automate
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Assigned To</td>
                  <td className="p-4">User</td>
                  <td className="p-4">Gives automation a dynamic recipient</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold text-[#205c38]">
              Status — Multiple Choice Values
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {["Open", "On Hold", "Complete"].map((status) => (
                <span
                  key={status}
                  className="rounded-lg border border-[#9fc9ad] bg-white px-4 py-2 font-semibold"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-7 max-w-5xl text-lg leading-8">
            These fields are intentionally uncomplicated. Together, however,
            they give us four fundamentally different kinds of information.
          </p>

          <CodeDiagram title="Our First Data Model">
            {`Task Name
    ↓
IDENTITY / DESCRIPTION


Status
    ↓
STATE


Due Date
    ↓
TIME


Assigned To
    ↓
PERSON`}
          </CodeDiagram>

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
          <SectionHeading step="Step 3" title="Don't Add Everything Yet">
            <p>This is important.</p>
          </SectionHeading>

          <p className="max-w-5xl text-lg leading-8">
            We could immediately add fields such as:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Priority",
              "Department",
              "Completed Date",
              "Created By",
              "Notification Sent",
              "Escalation Level",
              "Manager",
              "Previous Status",
              "Automation Status",
            ].map((field) => (
              <div
                key={field}
                className="rounded-lg border border-gray-300 bg-[#f7f8fa] px-4 py-3 font-semibold text-gray-700"
              >
                {field}
              </div>
            ))}
          </div>

          <p className="mt-7 max-w-5xl text-lg leading-8">But we won&apos;t.</p>

          <Remember title="Add complexity when the experiment creates a reason for it">
            <p>If a later lesson requires Priority, we&apos;ll add Priority.</p>

            <p className="mt-3">
              If we discover that a relationship solves a problem, we&apos;ll
              build the relationship then.
            </p>

            <p className="mt-3">
              If Pipelines eventually need a Task Change History table, we&apos;ll
              create it when we reach that problem.
            </p>
          </Remember>

          <p className="max-w-5xl text-lg leading-8">
            This way, students understand{" "}
            <strong>why the schema evolved</strong> instead of receiving twenty
            mysterious fields on Day One.
          </p>
        </section>

        {/* ======================================================
            STEP 4
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading
            step="Step 4"
            title="Record the Actual Quickbase Schema"
          >
            <p>
              Once Quickbase creates the fields, record their actual Field IDs.
            </p>
          </SectionHeading>

          <Remember title="Do not assume your FIDs will match someone else's application">
            <p>
              Field IDs are assigned inside the table where the fields are
              created. The visible field label and Quickbase&apos;s internal
              Field ID are related, but they are not the same thing.
            </p>
          </Remember>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-125 border-collapse">
              <thead className="bg-[#205c38] text-white">
                <tr>
                  <th className="p-4 text-left">Field</th>
                  <th className="p-4 text-left">FID</th>
                </tr>
              </thead>

              <tbody>
                {["Task Name", "Status", "Due Date", "Assigned To"].map(
                  (field) => (
                    <tr
                      key={field}
                      className="border-b border-gray-300 last:border-b-0"
                    >
                      <td className="p-4 font-semibold">{field}</td>
                      <td className="p-4 font-mono text-lg">?</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-5xl text-lg leading-8">
            Your table will also contain fields Quickbase creates automatically.
            That is expected.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            Later lessons involving queries, APIs, Jinja, or Pipelines may make
            these identifiers important. For now, simply record them.
          </p>
        </section>

        {/* ======================================================
            STEP 5
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading step="Step 5" title="Create Sample Records">
            <p>Create a few Tasks manually. We want variation, not volume.</p>
          </SectionHeading>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
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
                <tr className="border-b border-gray-300">
                  <td className="p-4 font-semibold">Prepare Monthly Report</td>
                  <td className="p-4">Open</td>
                  <td className="p-4">Future date</td>
                  <td className="p-4">You</td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="p-4 font-semibold">Review Application</td>
                  <td className="p-4">On Hold</td>
                  <td className="p-4">Future date</td>
                  <td className="p-4">You</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">Update Training Notes</td>
                  <td className="p-4">Complete</td>
                  <td className="p-4">Recent/current date</td>
                  <td className="p-4">You</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-7 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <h3 className="text-xl font-bold text-[#205c38]">
              Why assign the records to yourself?
            </h3>

            <p className="mt-3 max-w-5xl leading-8">
              Using yourself initially makes the experiments easier because
              later lessons will send actual automatic emails.
            </p>

            <p className="mt-3 max-w-5xl leading-8">
              Additional users and more complicated recipient scenarios can be
              introduced when an experiment requires them.
            </p>
          </div>
        </section>

        {/* ======================================================
            STEP 6
        ====================================================== */}

        <section className="mb-16">
          <SectionHeading step="Step 6" title="Stop">
            <p>Seriously. 😆</p>
          </SectionHeading>

          <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.14em] text-red-800">
              Do Not Continue Building
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Don't create a Pipeline.",
                "Don't create a Notification.",
                "Don't create a Reminder.",
                "Don't create a Subscription.",
                "Don't create a Custom Email.",
                "Don't start adding relationships.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-red-200 bg-white px-4 py-3 font-semibold text-gray-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-7 max-w-5xl text-xl leading-9">
            Our application should initially be <strong>boring</strong>.
          </p>

          <p className="mt-3 max-w-5xl text-lg leading-8">That&apos;s desirable.</p>

          <p className="mt-3 max-w-5xl text-lg leading-8">
            We want to know exactly which behavior came from each thing we add.
          </p>
        </section>

        {/* ======================================================
            FINAL LAB STATE
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading title="What the Laboratory Should Look Like">
            <p>
              At the end of Getting Started, the application should be almost
              embarrassingly simple.
            </p>
          </SectionHeading>

          <CodeDiagram title="Initial Laboratory">
            {`QUICKBASE AUTOMATION LAB
        │
        └── Tasks
             │
             ├── Task Name
             │
             ├── Status
             │
             ├── Due Date
             │
             └── Assigned To
                  +
             a few sample records`}
          </CodeDiagram>

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              Laboratory Ready
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#205c38] sm:text-4xl">
              That&apos;s Enough.
            </h2>

            <p className="mt-5 max-w-5xl text-lg leading-8">
              We now have identity, state, time, a person, and a handful of
              records.
            </p>

            <p className="mt-4 max-w-5xl text-lg leading-8">
              Every automation mechanism we add from this point forward can be
              observed against a known starting point.
            </p>
          </div>
        </section>

        {/* ======================================================
            NEXT STEP
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
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
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
              >
                Begin Lesson 1 →
              </Link>

              <Link
                href="/lessons"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
              >
                View Lesson Roadmap
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
