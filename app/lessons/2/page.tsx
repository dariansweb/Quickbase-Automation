import type { ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBellRing,
  LuBraces,
  LuCheck,
  LuCircleHelp,
  LuClock3,
  LuDatabase,
  LuEye,
  LuFilePenLine,
  LuFilter,
  LuGitBranch,
  LuInfo,
  LuLightbulb,
  LuMail,
  LuRefreshCw,
  LuSave,
  LuSearch,
  LuSend,
  LuSettings2,
  LuSquarePen,
  LuTrash2,
  LuUserRound,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";

/* ============================================================
   REUSABLE LESSON COMPONENTS
   ============================================================ */

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
    <div className="group rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#9fc9ad] hover:shadow-md">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749] transition-transform duration-200 group-hover:scale-105">
            {icon}
          </span>
        )}

        <h3 className="pt-1 text-xl font-bold text-[#205c38]">{title}</h3>
      </div>

      <div className="mt-4 leading-8">{children}</div>
    </div>
  );
}

function ExperimentCard({
  title,
  question,
  prediction,
  observed,
  children,
}: {
  title: string;
  question?: string;
  prediction?: string;
  observed?: string;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-[#f7f8fa] px-6 py-5">
        <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
          Experiment
        </p>
        <h3 className="mt-1 text-2xl font-bold text-[#205c38]">{title}</h3>
      </div>

      <div className="space-y-5 p-6">
        {question && (
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
              Question
            </p>
            <p className="mt-2 leading-8">{question}</p>
          </div>
        )}

        {prediction && (
          <div className="rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#7a5200]">
              Prediction
            </p>
            <p className="mt-2 leading-8">{prediction}</p>
          </div>
        )}

        {observed && (
          <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#276749]">
              Observed
            </p>
            <p className="mt-2 leading-8">{observed}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

function MentalModel({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4]">
      {title && (
        <div className="border-b border-[#9fc9ad] bg-[#e6f4ea] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
              <LuGitBranch aria-hidden="true" />
            </span>

            <div>
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Mental Model
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#205c38]">{title}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-7">{children}</div>
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

function FlowStep({
  icon,
  title,
  description,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  final?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border p-4 shadow-sm ${
        final
          ? "border-[#276749] bg-[#276749] text-white"
          : "border-[#b7d8c2] bg-white"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
            final ? "bg-white/15 text-white" : "bg-[#f0fff4] text-[#276749]"
          }`}
        >
          {icon}
        </span>

        <div>
          <h4
            className={`font-extrabold ${final ? "text-white" : "text-[#205c38]"}`}
          >
            {title}
          </h4>

          {description && (
            <p
              className={`mt-1 text-sm leading-6 ${final ? "text-white/85" : "text-gray-600"}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
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

function Evidence({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg text-[#276749] shadow-sm">
          <LuEye aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#276749]">
            Evidence
          </p>
          <h4 className="mt-1 text-lg font-bold text-[#205c38]">{title}</h4>
        </div>
      </div>
      <div className="mt-4 leading-8">{children}</div>
    </div>
  );
}

function CodeSample({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-[#111827] p-5 text-sm leading-7 text-gray-100">
      <code className="whitespace-pre-wrap font-mono">{children}</code>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function LessonTwoPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          FULL-WIDTH LESSON HEADER
      ====================================================== */}

      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>

          <p className="mb-2 text-lg font-semibold text-white/90">Lesson 2</p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Records as Events
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            What actually happens when a Quickbase record is modified? Begin
            with ordinary record editing, investigate the difference between
            unsaved and persisted changes, and then use a Notification as an
            observer to discover how Quickbase evaluates the event.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/1"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/3a"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              Next Lesson →
            </Link>
            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
            >
              Table of Contents
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        {/* CENTRAL QUESTION */}

        <section className="mb-14">
          <QuestionCard question="What does Quickbase actually mean when a record is modified, and how can an automation determine which changes matter?">
            <p>
              Lesson 1 established the automation landscape. Lesson 2 is the
              first true laboratory lesson.
            </p>

            <p className="mt-4">
              Instead of beginning with a Notification configuration screen, we
              begin with the record itself. We observe what Quickbase does
              before Save, after Save, and when an automation is finally added
              as another observational instrument.
            </p>
          </QuestionCard>
        </section>

        {/* RECORD BASELINE */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Begin With a Record, Not an Automation"
            icon={<LuDatabase aria-hidden="true" />}
          >
            <p>
              Our experimental object is an existing record in the Tasks table.
              Automation will eventually react to something happening to this
              record, but first we need to understand the record event itself.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Experimental Record
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
                Task #17
              </h3>

              <dl className="mt-5 space-y-3">
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Task Name</dt>
                  <dd>Prepare Monthly Report</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Due Date</dt>
                  <dd>blank</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Status</dt>
                  <dd>Open</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">Assigned To</dt>
                  <dd>You</dd>
                </div>
              </dl>
            </div>

            <MentalModel title="Table → Record → Fields">
              <div className="mx-auto flex max-w-xl flex-col items-center">
                <FlowStep
                  icon={<LuDatabase aria-hidden="true" />}
                  title="Tasks Table"
                  description="The collection of Task records."
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuFilePenLine aria-hidden="true" />}
                  title="Task #17"
                  description="One persisted record."
                />
                <FlowArrow />
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  {["Task Name", "Due Date", "Status", "Assigned To"].map(
                    (field) => (
                      <div
                        key={field}
                        className="rounded-lg border border-[#b7d8c2] bg-white p-3 text-center font-semibold text-[#205c38]"
                      >
                        {field}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </MentalModel>
          </div>
        </section>

        {/* RECORD LIFECYCLE */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="Introduce the Record Lifecycle"
            icon={<LuRefreshCw aria-hidden="true" />}
          >
            <p>
              At the conceptual level, a record has three elementary lifecycle
              events. We acknowledge all three, but Lesson 2 concentrates on
              <strong> Modify</strong> because modification gives us the richest
              foundation for later automation.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Add" icon={<LuSquarePen aria-hidden="true" />}>
              <p>A record did not exist.</p>
              <p className="mt-3 font-semibold text-[#276749]">Then it did.</p>
            </ConceptCard>

            <ConceptCard
              title="Modify"
              icon={<LuRefreshCw aria-hidden="true" />}
            >
              <p>A record already existed and its persisted data changed.</p>
              <p className="mt-3 font-semibold text-[#276749]">
                This is today&apos;s laboratory focus.
              </p>
            </ConceptCard>

            <ConceptCard title="Delete" icon={<LuTrash2 aria-hidden="true" />}>
              <p>An existing record was removed.</p>
              <p className="mt-3 text-gray-600">
                We deliberately defer this event for another lesson.
              </p>
            </ConceptCard>
          </div>
        </section>

        {/* BASELINE + UNSAVED CHANGES */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 3–6"
            title="Observe the Record Before Saving"
            icon={<LuSquarePen aria-hidden="true" />}
          >
            <p>
              Open Task #17 in the normal Quickbase record interface, enter Edit
              mode, and establish the persisted baseline before touching
              automation.
            </p>
          </SectionHeading>

          <div className="rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Baseline
            </p>
            <p className="mt-3 text-xl font-bold text-[#205c38]">
              Persisted Status = Open
            </p>
            <p className="mt-3 leading-8">
              The screenshot at this point should orient the student to View and
              Edit controls without turning the course into a click-by-click
              Quickbase user manual.
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <ExperimentCard
              title="Change one field before Save"
              question="Can Quickbase recognize a proposed field difference before the record has been persisted?"
              observed="Changing Status from Open to On Hold caused Quickbase to show a Reset control for Status before Save."
            >
              <CodeSample>{`PERSISTED VALUE
Status = Open

CURRENT EDIT VALUE
Status = On Hold`}</CodeSample>
            </ExperimentCard>

            <ExperimentCard
              title="Change two fields before Save"
              question="Does Quickbase merely know that the whole form changed, or can it identify individual changed fields?"
              observed="After Due Date changed from blank to 08-30-2026, separate Reset controls appeared for Due Date and Status, but not for untouched fields."
            >
              <CodeSample>{`Task Name      unchanged
Due Date       changed
Status         changed
Assigned To    unchanged`}</CodeSample>
            </ExperimentCard>
          </div>

          <Remember title="An unsaved form change is not the same thing as a saved record modification">
            <p>
              Quickbase can recognize that the current edit value differs from
              the persisted value before Save. That observation alone does not
              prove that the persisted record has been modified.
            </p>
          </Remember>

          <ExperimentCard
            title="Reset one changed field"
            question="Is Reset a form-wide undo, or is it specific to the field whose value differs?"
            observed="Resetting Due Date returned that field to its persisted value while the unsaved Status change remained."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Evidence title="Due Date">
                <p>08-30-2026 → blank</p>
              </Evidence>
              <Evidence title="Status">
                <p>On Hold remains the unsaved edit value.</p>
              </Evidence>
            </div>
            <p className="leading-8">
              This confirms that Quickbase tracks unsaved differences
              independently at the field level and that Reset is field-specific.
            </p>
          </ExperimentCard>
        </section>

        {/* SAVE + SYSTEM FIELDS */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 7–8"
            title="Save the Record and Use System Fields as Instruments"
            icon={<LuSave aria-hidden="true" />}
          >
            <p>
              Restore the Due Date experimental value, leave Status changed, and
              Save once. Then expose Quickbase-created system fields on the
              form. These fields become our first laboratory instruments.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Saved Changes
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg bg-[#f7f8fa] p-4">
                  <p className="font-bold">Due Date</p>
                  <p className="mt-1">blank → 08-30-2026</p>
                </div>
                <div className="rounded-lg bg-[#f7f8fa] p-4">
                  <p className="font-bold">Status</p>
                  <p className="mt-1">On Hold → Open</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                System Fields Observed
              </p>
              <dl className="mt-5 space-y-3 text-sm sm:text-base">
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Record ID#</dt>
                  <dd>17</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Date Created</dt>
                  <dd>08-24-2026 11:18 AM</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Date Modified</dt>
                  <dd>08-24-2026 11:59 AM</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                  <dt className="font-semibold">Record Owner</dt>
                  <dd>Ross, Darian</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold">Last Modified By</dt>
                  <dd>Ross, Darian</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <ConceptCard
              title="Record ID#"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <p>
                Record #17 remained Record #17 before and after modification.
                The existing record persisted through the change.
              </p>
            </ConceptCard>

            <ConceptCard
              title="Created vs. Modified"
              icon={<LuClock3 aria-hidden="true" />}
            >
              <p>
                Date Created and Date Modified expose different points in the
                record lifecycle. Creation and modification are not the same
                event.
              </p>
            </ConceptCard>

            <ConceptCard
              title="Owner vs. Modifier"
              icon={<LuUserRound aria-hidden="true" />}
            >
              <p>
                Record Owner answers who owns the record. Last Modified By
                answers who most recently changed it. Identical values do not
                make the meanings identical.
              </p>
            </ConceptCard>
          </div>
        </section>

        {/* NO CHANGE SAVE */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 9"
            title="Run a Control Experiment: Save Without Changing Anything"
            icon={<LuSave aria-hidden="true" />}
          >
            <p>
              Establish a clean Date Modified baseline, enter Edit mode, change
              nothing, and click Save.
            </p>
          </SectionHeading>

          <ExperimentCard
            title="No-change Save"
            question="Does merely entering Edit mode and pressing Save create a record modification?"
            prediction="If Save itself is the modification event, Date Modified should advance even when no persisted data changes."
            observed="Date Modified remained unchanged."
          >
            <MentalModel title="What the control experiment established">
              <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-[#b7d8c2] bg-white p-5 text-center">
                  <p className="font-bold text-[#205c38]">EDIT MODE</p>
                  <p className="mt-3 text-2xl font-extrabold text-[#276749]">
                    ≠
                  </p>
                  <p className="mt-3">MODIFICATION</p>
                </div>
                <div className="rounded-xl border border-[#b7d8c2] bg-white p-5 text-center">
                  <p className="font-bold text-[#205c38]">SAVE BUTTON</p>
                  <p className="mt-3 text-2xl font-extrabold text-[#276749]">
                    ≠
                  </p>
                  <p className="mt-3">AUTOMATICALLY A MODIFICATION</p>
                </div>
              </div>
            </MentalModel>

            <Remember title="State the finding at the level actually tested">
              <p>
                Based specifically on the manual form-edit behavior we tested,
                clicking Save without changing persisted field data did not
                produce an observed record modification.
              </p>
            </Remember>
          </ExperimentCard>
        </section>

        {/* OBSERVATIONAL LIMIT */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 10"
            title="Reach an Observational Limit"
            icon={<LuSearch aria-hidden="true" />}
          >
            <p>
              We changed Status and Due Date during one Edit session and clicked
              Save once. The finished record gives us one Date Modified
              timestamp—but it cannot tell us how Quickbase conceptualized the
              event internally.
            </p>
          </SectionHeading>

          <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#7a5200] shadow-sm">
                <LuCircleHelp aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  Unknown
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  Did Quickbase process two modifications, or one record
                  modification containing two changed fields?
                </h3>
              </div>
            </div>

            <p className="mt-5 max-w-4xl leading-8">
              The current instrument cannot answer the question. That is not a
              failure. It tells us exactly what kind of additional observation
              we need.
            </p>
          </div>

          <Remember title="Do not convert reasonable assumptions into facts">
            <p>
              If the current experiment cannot demonstrate something, mark it
              unknown and build a better experiment.
            </p>
          </Remember>
        </section>

        {/* EMAIL SURFACE */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 11–13"
            title="Use a Notification as an Observer"
            icon={<LuBellRing aria-hidden="true" />}
          >
            <p>
              In the Tasks table settings, the current Quickbase email surface
              presents four mechanisms. For this experiment, Notification is
              useful because we are studying record-change events.
            </p>
          </SectionHeading>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Custom email", <LuMail key="mail" aria-hidden="true" />],
              ["Notification", <LuBellRing key="bell" aria-hidden="true" />],
              ["Subscription", <LuSend key="send" aria-hidden="true" />],
              ["Reminder", <LuClock3 key="clock" aria-hidden="true" />],
            ].map(([label, icon]) => (
              <div
                key={label as string}
                className="rounded-xl border border-gray-300 bg-white p-5 text-center shadow-sm"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0fff4] text-xl text-[#276749]">
                  {icon}
                </span>
                <p className="mt-4 font-bold text-[#205c38]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Read the UI as evidence
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <Evidence title="What happened?">
                <p>a Task is modified</p>
              </Evidence>
              <Evidence title="What participated?">
                <p>Any field changes, or any of the following fields change</p>
              </Evidence>
              <Evidence title="What is true afterward?">
                <p>Conditions are true after the change</p>
              </Evidence>
            </div>
          </div>

          <MentalModel title="The event model exposed by Notification">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
                description="A Task is modified."
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Which Fields Changed?"
                description="Any field, or only selected fields."
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGitBranch aria-hidden="true" />}
                title="What Is True Afterward?"
                description="Evaluate resulting record conditions."
              />
            </div>
          </MentalModel>

          <div className="rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Laboratory Notification
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
              LAB — Any Task Modification
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-[#9fc9ad] bg-white p-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Notify
                </p>
                <p className="mt-2 font-semibold">Me</p>
              </div>
              <div className="rounded-lg border border-[#9fc9ad] bg-white p-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  When
                </p>
                <p className="mt-2 font-semibold">a Task is modified</p>
              </div>
              <div className="rounded-lg border border-[#9fc9ad] bg-white p-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  AND
                </p>
                <p className="mt-2 font-semibold">Any field changes</p>
              </div>
            </div>

            <p className="mt-4 leading-8">
              Operations are limited to single Task records because this
              experiment is designed to observe one record modification at a
              time.
            </p>
          </div>
        </section>

        {/* OLD.FIELD */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 14"
            title="Give the Observer Before-and-After Instrumentation"
            icon={<LuBraces aria-hidden="true" />}
          >
            <p>
              We intentionally borrow a little Quickbase message syntax early.
              The goal is not to memorize markers yet. The goal is to make the
              event visible in the inbox.
            </p>
          </SectionHeading>

          <CodeSample>{`QUICKBASE AUTOMATION LAB

Record: %recLabel%
Record ID: %recID%

Modified By:
[Last Modified By]

TASK NAME
Before: [old.Task Name]
After:  [Task Name]

STATUS
Before: [old.Status]
After:  [Status]

DUE DATE
Before: [old.Due Date]
After:  [Due Date]

ASSIGNED TO
Before: [old.Assigned To]
After:  [Assigned To]

Open Record:
%recLink%`}</CodeSample>

          <Remember title="Learn by doing before learning every marker">
            <p>
              We are borrowing message syntax because it improves our
              experiment. For now, observe what it produces. Email composition,
              marker families, and message-context rules deserve their own
              deliberate lessons later.
            </p>
          </Remember>
        </section>

        {/* NOTIFICATION TESTS */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 15–19"
            title="Test the Notification Against the Record Experiments"
            icon={<LuMail aria-hidden="true" />}
          >
            <p>
              The Notification now becomes a second independent instrument. We
              can compare what the record metadata says with whether the
              observer sends an email.
            </p>
          </SectionHeading>

          <div className="space-y-6">
            <ExperimentCard
              title="Notification control test"
              question="If we enter Edit mode, change nothing, and Save, does a modification Notification fire?"
              observed="No email was sent."
            >
              <MentalModel title="Two instruments agree">
                <div className="mx-auto flex max-w-xl flex-col items-center">
                  <FlowStep
                    icon={<LuSquarePen aria-hidden="true" />}
                    title="No Field Change"
                  />
                  <FlowArrow />
                  <div className="grid w-full gap-4 sm:grid-cols-2">
                    <Evidence title="Date Modified">
                      <p>Unchanged</p>
                    </Evidence>
                    <Evidence title="Notification">
                      <p>Not sent</p>
                    </Evidence>
                  </div>
                </div>
              </MentalModel>
            </ExperimentCard>

            <ExperimentCard
              title="One changed field"
              question="What happens when one field is changed and the record is saved once?"
              observed="One saved record modification produced one Notification."
            >
              <CodeSample>{`1 saved record modification
        ↓
1 Notification`}</CodeSample>

              <p className="leading-8">
                The email now functions as an experimental report. A Status
                transition can appear as:
              </p>

              <CodeSample>{`STATUS

Before: On Hold
After:  Open`}</CodeSample>
            </ExperimentCard>

            <ExperimentCard
              title="Two changed fields in one Save"
              question="Does one Save containing two changed fields produce one record-level Notification or separate emails per field?"
              observed="Two changed fields in one Edit session produced one saved Task modification and one Notification."
            >
              <MentalModel title="The record modification is the event">
                <div className="mx-auto flex max-w-xl flex-col items-center">
                  <FlowStep
                    icon={<LuRefreshCw aria-hidden="true" />}
                    title="Task Modified"
                  />
                  <FlowArrow />
                  <div className="grid w-full gap-4 sm:grid-cols-2">
                    <Evidence title="Field participation">
                      <p>Status changed</p>
                    </Evidence>
                    <Evidence title="Field participation">
                      <p>Due Date changed</p>
                    </Evidence>
                  </div>
                  <FlowArrow />
                  <FlowStep
                    icon={<LuMail aria-hidden="true" />}
                    title="One Notification"
                    final
                  />
                </div>
              </MentalModel>

              <p className="leading-8">
                At the level exposed by this single-record Notification test,
                the modification is the record event; individual changed fields
                participate in that event.
              </p>
            </ExperimentCard>

            <ExperimentCard
              title="Reset before Save"
              question="What happens if a field differs temporarily, is Reset to its persisted value, and then the form is saved?"
              observed="Zero persisted changes and zero Notifications."
            >
              <CodeSample>{`UNSAVED FIELD DIFFERENCE
       │
       ├── Quickbase recognizes it
       ├── Reset is available
       │
       ▼
RESTORED BEFORE SAVE
       │
       ▼
NO PERSISTED MODIFICATION
       │
       ▼
NO NOTIFICATION`}</CodeSample>
            </ExperimentCard>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-300 bg-white p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Diagnostic Email
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
              Old and current references describe the same event from two sides
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Evidence title="Changed field">
                <CodeSample>{`STATUS
Before: On Hold
After:  Open`}</CodeSample>
                <p className="mt-4">
                  Old and current values differ, so the field changed.
                </p>
              </Evidence>

              <Evidence title="Unchanged field">
                <CodeSample>{`DUE DATE
Before: 08-28-2026
After:  08-28-2026`}</CodeSample>
                <p className="mt-4">
                  Old and current values are equal, so the field remained the
                  same during that modification.
                </p>
              </Evidence>
            </div>

            <p className="mt-5 leading-8">
              The <code>[old.Field]</code> form does not mean “show this only if
              the field changed.” It gives us the value from before the
              modification. The ordinary field reference gives us the
              resulting/current value.
            </p>
          </div>
        </section>

        {/* SELECTIVE OBSERVER */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 20"
            title="Make the Observer Selective"
            icon={<LuFilter aria-hidden="true" />}
          >
            <p>
              Change the Notification from <strong>Any field changes</strong> to
              <strong> Any of the following fields change</strong>, and select
              only <strong>Status</strong>. Do not add an after-change condition
              yet.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ExperimentCard
              title="Task Name changes"
              observed="The record was modified and Date Modified advanced, but Status did not participate, so no email was sent."
            >
              <CodeSample>{`Record modified        YES
Date Modified advances YES
Status changed         NO
Email                  NO`}</CodeSample>
            </ExperimentCard>

            <ExperimentCard
              title="Status changes"
              observed="The record was modified, Status participated in the modification, and the Notification sent an email."
            >
              <CodeSample>{`Record modified        YES
Status changed         YES
Email                  YES`}</CodeSample>
            </ExperimentCard>
          </div>

          <Remember title="Automation relevance is not the same thing as event existence">
            <p>
              A record can genuinely be modified without a particular automation
              considering that modification relevant. The automation&apos;s
              criteria determine whether the event matters to that automation.
            </p>
          </Remember>
        </section>

        {/* RESULTING STATE */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 21–22"
            title="Introduce Resulting State"
            icon={<LuGitBranch aria-hidden="true" />}
          >
            <p>
              Keep the requirement that Status must change, then add a condition
              evaluated after the change:
            </p>
          </SectionHeading>

          <div className="rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              After-change condition
            </p>
            <p className="mt-3 text-xl font-bold text-[#205c38]">
              Status is equal to the value Complete
            </p>
          </div>

          <MentalModel title="Field participation + resulting state">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuRefreshCw aria-hidden="true" />}
                title="Task Modified"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Did Status Change?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGitBranch aria-hidden="true" />}
                title="After the Change, Is Status Complete?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuMail aria-hidden="true" />}
                title="Email"
                final
              />
            </div>
          </MentalModel>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <ExperimentCard title="On Hold → Open" observed="No email">
              <CodeSample>{`Status changed?       YES
Status = Complete?    NO

EMAIL: NO`}</CodeSample>
            </ExperimentCard>

            <ExperimentCard
              title="Open / On Hold → Complete"
              observed="Email sent"
            >
              <CodeSample>{`Status changed?       YES
Status = Complete?    YES

EMAIL: YES`}</CodeSample>
            </ExperimentCard>

            <ExperimentCard title="Task Name changes" observed="No email">
              <CodeSample>{`Task modified?        YES
Status changed?       NO

EMAIL: NO`}</CodeSample>
              <p className="leading-8">
                Even if Status already happens to be Complete, the field-change
                requirement still matters.
              </p>
            </ExperimentCard>
          </div>
        </section>

        {/* CENTRAL LESSON */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 23"
            title="The Puzzle Pieces Lock Together"
            icon={<LuWorkflow aria-hidden="true" />}
          >
            <p>
              These statements may sound similar in casual conversation, but
              Quickbase gives us mechanisms for distinguishing them.
            </p>
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "A Task was modified.",
              "Status changed.",
              "Status is Complete.",
              "Status changed and is now Complete.",
            ].map((statement, index) => (
              <div
                key={statement}
                className="flex items-center gap-4 rounded-xl border border-gray-300 bg-white p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#276749] font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold">{statement}</p>
              </div>
            ))}
          </div>

          <MentalModel title="The Lesson 2 event model">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuDatabase aria-hidden="true" />}
                title="Record"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Modification"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Which Fields Changed?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuRefreshCw aria-hidden="true" />}
                title="Did Status Participate?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGitBranch aria-hidden="true" />}
                title="What Is True After?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuCheck aria-hidden="true" />}
                title="Status = Complete?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuMail aria-hidden="true" />}
                title="Action: Email"
                final
              />
            </div>
          </MentalModel>

          <div className="grid gap-5 md:grid-cols-2">
            <Evidence title="What was true before?">
              <CodeSample>{`[old.Status]`}</CodeSample>
            </Evidence>
            <Evidence title="What is true after?">
              <CodeSample>{`[Status]`}</CodeSample>
            </Evidence>
          </div>
        </section>

        {/* DO NOT TEACH YET */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 24"
            title="What We Deliberately Do Not Teach Yet"
            icon={<LuInfo aria-hidden="true" />}
          >
            <p>
              The experiment exposed more Quickbase syntax than this lesson
              needs. We use only what helps us observe the behavior and defer
              the wider marker system for later.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Markers encountered
              </p>
              <CodeSample>{`%appName%
%appLink%
%dbName%
%dbid%
%recLabel%
%recID%
%recLink%
%recData%
%summaryView%
%RepeatOn%
%RepeatOff%`}</CodeSample>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Field references used now
              </p>
              <CodeSample>{`[Field Name]

[old.Field Name]`}</CodeSample>
              <p className="mt-4 leading-8">
                We use these immediately because they make the experiment
                observable. Broader capabilities and message-context rules are
                deferred.
              </p>
            </div>
          </div>

          <Remember title="Unknown syntax is an invitation to investigate">
            <p>
              When a Quickbase feature exposes syntax you do not recognize,
              consult Quickbase Help, experiment in the lab, observe the output,
              and refine your understanding. That is developer behavior.
            </p>
          </Remember>
        </section>

        {/* DEFERRED QUESTIONS */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 25"
            title="Deliberately Deferred Questions"
            icon={<LuCircleHelp aria-hidden="true" />}
          >
            <p>
              Today&apos;s experiments opened several doors. We leave them open
              on purpose rather than cramming unrelated complexity into Lesson
              2.
            </p>
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "What happens when records are added?",
              "What happens when records are deleted?",
              "How do multiple-record operations differ?",
              "What happens with Grid Edit?",
              "What happens with imports?",
              "How are Recipient and Open notifications different?",
              "How do permissions affect what recipients see?",
              "How does Assigned To become a dynamic recipient?",
              "What exactly are all the %markers%?",
              "How does Custom Email differ from Notification?",
              "What happens when automation modifies another record?",
              "Can automation cause another automation?",
              "How do Pipelines represent previous/current values?",
            ].map((question) => (
              <div
                key={question}
                className="flex gap-4 rounded-xl border border-gray-300 bg-white p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-[#276749]">
                  <LuCircleHelp aria-hidden="true" />
                </span>
                <p className="leading-7">{question}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-5">
            <p className="font-semibold leading-8">
              We also deliberately avoid generalizing today&apos;s single-record
              form-edit findings to bulk operations. Multiple-record
              notifications can behave differently and deserve their own
              experiments.
            </p>
          </div>
        </section>

        {/* STUDENT TAKEAWAY */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Student Outcome"
            title="What You Should Understand Before Moving On"
            icon={<LuCheck aria-hidden="true" />}
          />

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-lg leading-8">
              A Quickbase record modification is more than clicking Edit or
              Save.
            </p>

            <p className="mt-4 text-lg leading-8">
              During editing, Quickbase can recognize individual fields whose
              proposed values differ from their persisted values. If those
              differences are removed before Save, our experiments produced no
              persisted modification and no modification Notification.
            </p>

            <p className="mt-4 text-lg leading-8">
              When changed data is saved, the existing record persists under the
              same Record ID while Quickbase updates its modification metadata.
              A single saved modification can contain changes to multiple
              fields.
            </p>

            <p className="mt-4 text-lg leading-8">
              Automation can then evaluate that event at several levels:
              <strong>
                {" "}
                Did the record change? Which fields changed? What conditions are
                true after the change?
              </strong>
            </p>

            <p className="mt-4 text-lg leading-8">
              Finally, the resulting email can expose values from before and
              after the modification, allowing us to observe the event itself.
            </p>
          </div>

          <MentalModel title="Compact Lesson 2 model">
            <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex flex-col items-center">
                <FlowStep
                  icon={<LuDatabase aria-hidden="true" />}
                  title="Record"
                />
                <FlowArrow />
                <FlowStep icon={<LuZap aria-hidden="true" />} title="Event" />
                <FlowArrow />
                <FlowStep
                  icon={<LuFilter aria-hidden="true" />}
                  title="Changed Fields"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuGitBranch aria-hidden="true" />}
                  title="Resulting State"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuSettings2 aria-hidden="true" />}
                  title="Automation Decision"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuMail aria-hidden="true" />}
                  title="Action"
                  final
                />
              </div>

              <div className="flex flex-col justify-center">
                <Evidence title="Before Value">
                  <CodeSample>{`[old.Status]`}</CodeSample>
                </Evidence>
                <FlowArrow />
                <Evidence title="After Value">
                  <CodeSample>{`[Status]`}</CodeSample>
                </Evidence>
              </div>
            </div>
          </MentalModel>
        </section>

        {/* NEXT LESSON PLACEHOLDER */}

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Lesson 2 Complete
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              We Now Have an Event Model
            </h2>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              We began with a record, observed unsaved differences, established
              what persisted modification looks like, and then used a
              Notification as a second instrument to distinguish the record
              event from the fields participating in that event and the state
              that exists afterward.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
              The next lesson should begin only after the next laboratory
              question has been investigated. We do not manufacture future
              theory in advance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/1"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
              >
                ← Review Lesson 1
              </Link>

              <Link
                href="/lessons"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
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
