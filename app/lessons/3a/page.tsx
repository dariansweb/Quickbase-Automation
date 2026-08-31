"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBookOpen,
  LuBraces,
  LuCheck,
  LuCircleHelp,
  LuDatabase,
  LuEye,
  LuFilePenLine,
  LuFilePlus2,
  LuFilter,
  LuGitBranch,
  LuHistory,
  LuInfo,
  LuLightbulb,
  LuListChecks,
  LuMail,
  LuRefreshCw,
  LuSend,
  LuSplit,
  LuTrash2,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";

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
      className={`w-full rounded-xl border p-4 shadow-sm ${final ? "border-[#276749] bg-[#276749] text-white" : "border-[#b7d8c2] bg-white"}`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${final ? "bg-white/15 text-white" : "bg-[#f0fff4] text-[#276749]"}`}
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

function ExperimentCard({
  title,
  observed,
  children,
}: {
  title: string;
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
            Lab Discovery
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[#205c38]">{title}</h3>
        </div>
      </div>
      <div className="mt-5 leading-8">{children}</div>
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

export default function LessonThreeAPage() {
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
          <p className="mb-2 text-lg font-semibold text-white/90">Lesson 3A</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Notification Mechanics: Events, Changes &amp; Record State
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Lesson 2 established that saved modifications matter. Lesson 3A goes
            underneath the Notification editor and separates record events,
            field participation, previous state, resulting state, and
            after-change conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/2"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/3b"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              Next Lesson →
            </Link>{" "}
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
        <section className="mb-14">
          <QuestionCard question="When something happens to a Quickbase record, what exactly does a Notification evaluate before deciding that the event qualifies?">
            <p>
              The controls inside a Notification editor can look like one long
              configuration form. Our experiments show that they actually
              represent several different questions.
            </p>
            <p className="mt-4">
              The student should finish this lesson able to separate what
              happened, which fields participated, what values existed before,
              what values exist afterward, and which resulting-state conditions
              must hold.
            </p>
          </QuestionCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Begin With the Lesson 2 Laboratory"
            icon={<LuDatabase aria-hidden="true" />}
          >
            <p>
              We do not create another artificial example. The same Tasks table
              and diagnostic Notification now become more sophisticated
              laboratory instruments.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Working fields"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <ul className="space-y-2">
                <li>Task Name</li>
                <li>Status</li>
                <li>Due Date</li>
                <li>Assigned To</li>
              </ul>
            </ConceptCard>
            <ConceptCard
              title="Diagnostic message"
              icon={<LuMail aria-hidden="true" />}
            >
              <p>
                The before/after email from Lesson 2 is no longer merely a
                demonstration. It is how we inspect the state transition that
                Quickbase exposed.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-6">
            <CodeSample>{`TASK NAME
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
After:  [Assigned To]`}</CodeSample>
          </div>

          <Remember title="The instrumentation has evolved">
            <p>
              In Lesson 2, the message taught us that old and current values
              could be shown. In Lesson 3A, those values become evidence for
              understanding what Quickbase evaluated.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="Previous State and Current State"
            icon={<LuHistory aria-hidden="true" />}
          >
            <p>
              Quickbase exposes a previous value through <code>old.</code> field
              references and a current/resulting value through the ordinary
              field reference.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Previous value
              </p>
              <div className="mt-4">
                <CodeSample>{`[old.Status]`}</CodeSample>
              </div>
            </div>
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Current / resulting value
              </p>
              <div className="mt-4">
                <CodeSample>{`[Status]`}</CodeSample>
              </div>
            </div>
          </div>

          <Discovery title="A previous value can exist even when the field did not change">
            <CodeSample>{`STATUS

Before: Open
After:  Open`}</CodeSample>
            <p className="mt-5">
              The existence of <code>[old.Status]</code> does not prove that
              Status changed. It only asks Quickbase for the previous value of
              Status.
            </p>
          </Discovery>

          <MentalModel title="Conceptual record-state transition">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="rounded-xl border border-[#b7d8c2] bg-white p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Previous State
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Task Name:</strong> August Report
                  </p>
                  <p>
                    <strong>Status:</strong> Open
                  </p>
                  <p>
                    <strong>Due Date:</strong> 09/01
                  </p>
                  <p>
                    <strong>Assigned To:</strong> Darian
                  </p>
                </div>
              </div>
              <LuArrowDown
                aria-hidden="true"
                className="mx-auto text-2xl text-[#276749]/60 lg:-rotate-90"
              />
              <div className="rounded-xl border border-[#b7d8c2] bg-white p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Resulting State
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Task Name:</strong> September Report
                  </p>
                  <p>
                    <strong>Status:</strong> Open
                  </p>
                  <p>
                    <strong>Due Date:</strong> 09/01
                  </p>
                  <p>
                    <strong>Assigned To:</strong> Darian
                  </p>
                </div>
              </div>
            </div>
          </MentalModel>

          <Remember title="Do not invent undocumented internals">
            <p>
              We should not claim that Quickbase literally “copies the entire
              form” or creates an internal object named <code>old</code>. What
              we can safely teach is that Quickbase exposes previous and current
              field values that allow us to reason about state transitions.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 3"
            title="Empty Is Not Nonexistent"
            icon={<LuSplit aria-hidden="true" />}
          >
            <p>
              An Add experiment exposed a subtle distinction that becomes
              important whenever we reason about previous state.
            </p>
          </SectionHeading>

          <Discovery title="Blank previous value and missing previous record are different circumstances">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="font-bold text-[#205c38]">
                  Existing record, blank field
                </p>
                <div className="mt-3">
                  <CodeSample>{`Before: empty`}</CodeSample>
                </div>
              </div>
              <div>
                <p className="font-bold text-[#205c38]">Brand-new record</p>
                <div className="mt-3">
                  <CodeSample>{`Before: nonexistent`}</CodeSample>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <CodeSample>{`TASK NAME
Before: nonexistent
After:  Collecting Monthly Dues

DUE DATE
Before: nonexistent
After:  empty`}</CodeSample>
            </div>
          </Discovery>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="empty" icon={<LuDatabase aria-hidden="true" />}>
              <p>The record state exists, but that field has no value.</p>
            </ConceptCard>
            <ConceptCard
              title="nonexistent"
              icon={<LuFilePlus2 aria-hidden="true" />}
            >
              <p>
                There was no previous record state from which that field could
                have a previous value.
              </p>
            </ConceptCard>
          </div>

          <MentalModel title="Modify vs. Add">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-[#b7d8c2] bg-white p-5">
                <p className="font-bold text-[#205c38]">
                  Modify existing record
                </p>
                <p className="mt-3 leading-7">
                  The record exists. A field may contain a value or may be
                  empty.
                </p>
              </div>
              <div className="rounded-xl border border-[#b7d8c2] bg-white p-5">
                <p className="font-bold text-[#205c38]">Add new record</p>
                <p className="mt-3 leading-7">
                  The previous record does not exist, so the previous field
                  state is nonexistent.
                </p>
              </div>
            </div>
          </MentalModel>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 4–8"
            title="Record Events Define Eligibility"
            icon={<LuZap aria-hidden="true" />}
          >
            <p>
              The first Notification gate asks what happened to the record.
              Quickbase exposes record-event choices built from Added, Modified,
              and Deleted.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard
              title="Modified"
              icon={<LuFilePenLine aria-hidden="true" />}
            >
              <p>The record already existed and persisted data changed.</p>
            </ConceptCard>
            <ConceptCard
              title="Added"
              icon={<LuFilePlus2 aria-hidden="true" />}
            >
              <p>A new record came into existence.</p>
            </ConceptCard>
            <ConceptCard title="Deleted" icon={<LuTrash2 aria-hidden="true" />}>
              <p>An existing record was removed.</p>
            </ConceptCard>
          </div>

          <div className="mt-6 space-y-6">
            <ExperimentCard
              title="3A.1 — Modified"
              observed="Modify existing Task → EMAIL. Add new Task → NO EMAIL."
            >
              <CodeSample>{`Notification when:
a Task is modified

Modify existing Task → EMAIL
Add new Task         → NO EMAIL`}</CodeSample>
              <p className="leading-8">
                A Notification configured for modification does not treat record
                creation as modification.
              </p>
            </ExperimentCard>

            <ExperimentCard
              title="3A.2 — Added"
              observed="Modify existing Task → NO EMAIL. Add new Task → EMAIL."
            >
              <CodeSample>{`Notification when:
a Task is added

Modify existing Task → NO EMAIL
Add new Task         → EMAIL`}</CodeSample>
              <p className="leading-8">
                Reversing exactly one configuration choice tested the
                distinction in both directions rather than assuming the events
                were different.
              </p>
            </ExperimentCard>

            <ExperimentCard
              title="3A.3 — Modified OR Added"
              observed="MODIFY → EMAIL. ADD → EMAIL. DELETE → NO EMAIL."
            >
              <CodeSample>{`a Task is modified or added

MODIFY → EMAIL
ADD    → EMAIL
DELETE → NO EMAIL`}</CodeSample>
            </ExperimentCard>
          </div>

          <MentalModel title="Event eligibility">
            <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
              <FlowStep
                icon={<LuFilePenLine aria-hidden="true" />}
                title="Modify"
                description="Passes when modification is selected."
                final
              />
              <FlowStep
                icon={<LuFilePlus2 aria-hidden="true" />}
                title="Add"
                description="Passes when addition is selected."
                final
              />
              <FlowStep
                icon={<LuTrash2 aria-hidden="true" />}
                title="Delete"
                description="Fails when delete is not selected."
              />
            </div>
          </MentalModel>

          <Remember title="Event criterion answers only one question">
            <p>
              The record-event choice tells us{" "}
              <strong>what happened to the record</strong>. It does not tell us
              which field changed, what Status is now, or what Due Date used to
              be.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 9–14"
            title="Field-Change Criteria Ask What Participated"
            icon={<LuFilter aria-hidden="true" />}
          >
            <p>
              Once the event is a modification, Quickbase lets us choose whether
              any changed field is acceptable or whether the modification must
              involve one of a selected set of fields.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Any field changes"
              icon={<LuRefreshCw aria-hidden="true" />}
            >
              <p>
                The modification is not restricted to a particular selected
                field. Task Name, Status, Due Date, or another changed field can
                potentially qualify.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Any of the following fields change"
              icon={<LuListChecks aria-hidden="true" />}
            >
              <p>
                Quickbase exposes individual field checkboxes and the
                modification must involve at least one of the selected fields.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-6 rounded-xl border border-gray-300 bg-white p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Fields selected in the laboratory
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4 font-semibold text-[#205c38]">
                ✓ Status
              </div>
              <div className="rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4 font-semibold text-[#205c38]">
                ✓ Due Date
              </div>
            </div>
          </div>

          <ExperimentCard
            title="3A.4 — Selected Fields"
            observed="Only modifications containing at least one selected changed field qualified."
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#276749]">
                    <th className="px-4 py-3 font-bold text-[#205c38]">
                      Modification
                    </th>
                    <th className="px-4 py-3 font-bold text-[#205c38]">
                      Observed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Task Name only", "NO EMAIL"],
                    ["Status only", "EMAIL"],
                    ["Due Date only", "EMAIL"],
                    ["Status + Due Date", "EMAIL"],
                    ["Task Name + Due Date", "EMAIL"],
                  ].map(([change, result]) => (
                    <tr key={change} className="border-b border-gray-200">
                      <td className="px-4 py-3">{change}</td>
                      <td className="px-4 py-3 font-semibold">{result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeSample>{`Notification watches:
StatusChanged OR DueDateChanged

TaskNameChanged = TRUE
DueDateChanged  = TRUE

FALSE OR TRUE
      ↓
     TRUE`}</CodeSample>

            <p className="leading-8">
              An unselected field changing does not disqualify the modification.
              In the Task Name + Due Date test, Task Name was irrelevant to this
              particular criterion; Due Date was sufficient.
            </p>
          </ExperimentCard>

          <Discovery title="One Save with multiple changed fields produced one Notification">
            <CodeSample>{`RECORD MODIFICATION
       ↓
Inspect relevant changed fields
       ↓
Does modification satisfy criteria?
       ↓
ONE qualifying Notification event`}</CodeSample>
            <p className="mt-5">
              This reinforces the Lesson 2 model: the saved record modification
              is the event, and several changed fields can participate in that
              single event.
            </p>
          </Discovery>

          <Discovery title="Restricted-field mode with zero selected fields is not the same as Any field changes">
            <CodeSample>{`SELECTED-FIELD MODE
       ↓
Selected fields = none
       ↓
No selected changed field
can satisfy the criterion
       ↓
NO QUALIFYING NOTIFICATION`}</CodeSample>
            <p className="mt-5">
              This accidental edge case became a valuable experiment. Selecting
              the restricted-field mode but checking no fields produced no
              qualifying Notification.
            </p>
          </Discovery>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 15–17"
            title="Field Changed Is Not the Same as Field Has a Value"
            icon={<LuSplit aria-hidden="true" />}
          >
            <p>
              This is the central distinction of Lesson 3A. A field-change
              criterion and a resulting-state condition answer different
              questions.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Did Status change?"
              icon={<LuRefreshCw aria-hidden="true" />}
            >
              <p>This asks whether Status participated in the modification.</p>
            </ConceptCard>
            <ConceptCard
              title="Is Status Complete now?"
              icon={<LuCheck aria-hidden="true" />}
            >
              <p>
                This asks whether the resulting record state satisfies a value
                condition.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-6 rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Quickbase wording worth preserving
            </p>
            <p className="mt-3 text-xl font-bold text-[#205c38]">
              AND when the following conditions are true after the change
            </p>
            <p className="mt-4 leading-8">
              That wording tells us this section is describing the{" "}
              <strong>resulting state</strong>, not merely which fields changed.
            </p>
          </div>

          <ExperimentCard
            title="The experiment that proved it"
            observed="The Notification could qualify with Status = Complete even when Status itself did not change."
          >
            <CodeSample>{`STATUS
Before: Complete
After:  Complete

DUE DATE
Before: 09-30-2026
After:  11-10-2026`}</CodeSample>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 bg-white p-5">
                <p className="font-bold text-[#205c38]">Did Status change?</p>
                <p className="mt-2 text-xl font-extrabold">FALSE</p>
              </div>
              <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5">
                <p className="font-bold text-[#205c38]">
                  Is Status Complete now?
                </p>
                <p className="mt-2 text-xl font-extrabold text-[#276749]">
                  TRUE
                </p>
              </div>
            </div>

            <p className="leading-8">
              A condition such as <strong>Status = Complete</strong> does not
              inherently mean <strong>Status changed to Complete</strong>. Those
              statements can overlap, but they are not equivalent.
            </p>
          </ExperimentCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 18"
            title="Three Questions the Notification UI Is Really Asking"
            icon={<LuCircleHelp aria-hidden="true" />}
          >
            <p>
              At this point the configuration editor stops looking like one
              miscellaneous form and starts looking like a logical evaluation
              system.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-3">
            <ConceptCard
              title="1. What happened?"
              icon={<LuZap aria-hidden="true" />}
            >
              <p className="font-semibold text-[#276749]">Record event</p>
              <p className="mt-3">Added / Modified / Deleted</p>
            </ConceptCard>
            <ConceptCard
              title="2. What participated?"
              icon={<LuFilter aria-hidden="true" />}
            >
              <p className="font-semibold text-[#276749]">
                Field-change criterion
              </p>
              <p className="mt-3">Any field or selected fields</p>
            </ConceptCard>
            <ConceptCard
              title="3. What is true afterward?"
              icon={<LuGitBranch aria-hidden="true" />}
            >
              <p className="font-semibold text-[#276749]">
                Resulting-state conditions
              </p>
              <p className="mt-3">
                Status = Complete, Due Date ≥ boundary, etc.
              </p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 19"
            title="The Three-Layer Conceptual Model"
            icon={<LuWorkflow aria-hidden="true" />}
          >
            <p>
              This is the centerpiece of Lesson 3A and the model we will carry
              into Lesson 3B.
            </p>
          </SectionHeading>

          <MentalModel title="Notification qualification funnel">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
                description="Did the configured kind of event happen?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Field-Change Criterion"
                description="Did a relevant field participate in the modification?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGitBranch aria-hidden="true" />}
                title="After-Change Conditions"
                description="Does the resulting record state satisfy the required conditions?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuCheck aria-hidden="true" />}
                title="Qualifies"
                description="The configured Notification criteria are satisfied."
                final
              />
            </div>
          </MentalModel>

          <Remember title="This is a reasoning model, not an undocumented execution algorithm">
            <p>
              The funnel helps us decompose Notification qualification. It is
              not a claim about Quickbase&apos;s private internal implementation
              or exact execution order.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 20"
            title="Single-Record and Multiple-Record Behavior Are Not Identical"
            icon={<LuSend aria-hidden="true" />}
          >
            <p>
              During testing we unexpectedly encountered a multiple-record
              message rather than the custom single-record diagnostic format.
            </p>
          </SectionHeading>

          <Discovery title="Quickbase exposed a separate multiple-record presentation">
            <CodeSample>{`Records modified

Multiple records in Automation: Tasks were modified.`}</CodeSample>
            <p className="mt-5">
              That observation is important enough to record, but not important
              enough to derail this lesson into a bulk-operation investigation.
            </p>
          </Discovery>

          <Remember title="Observe here; investigate later">
            <p>
              We deliberately do not generalize single-record findings to Grid
              Edit, imports, or other bulk operations. They deserve dedicated
              experiments.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 21"
            title="Audit Concepts Reinforce the State-Transition Model"
            icon={<LuHistory aria-hidden="true" />}
          >
            <p>
              Additional Quickbase Help material about auditing uses the same
              broad concepts of previous and current values for updated data.
            </p>
          </SectionHeading>

          <MentalModel title="A recurring Quickbase concept">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <FlowStep
                icon={<LuHistory aria-hidden="true" />}
                title="Previous State"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuDatabase aria-hidden="true" />}
                title="Current State"
                final
              />
            </div>
          </MentalModel>

          <p className="max-w-4xl text-lg leading-8">
            This does not prove that Notifications and audit logs share an
            identical internal implementation. It does show that Quickbase
            repeatedly exposes state-transition concepts across different
            features.
          </p>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 22"
            title="A Breadcrumb Toward Pipelines"
            icon={<LuBraces aria-hidden="true" />}
          >
            <p>
              The syntax will change later, but the conceptual question will
              survive.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Notifications today"
              icon={<LuMail aria-hidden="true" />}
            >
              <CodeSample>{`[old.Status]
[Status]`}</CodeSample>
            </ConceptCard>
            <ConceptCard
              title="Pipelines later"
              icon={<LuWorkflow aria-hidden="true" />}
            >
              <p>
                Previous-value and current-value concepts return again, even
                though Pipelines use different syntax and tooling.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Syntax changes. The question survives.">
            <p>
              What was true before, and what is true now? That question is
              foundational enough to survive the transition from Notifications
              into later automation tools.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Final Principle"
            title="What a Notification Can Distinguish"
            icon={<LuCheck aria-hidden="true" />}
          />

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-lg leading-8">
              A Notification does not merely react to “something changed.” It
              can distinguish the kind of record event, which fields
              participated in a modification, and conditions that describe the
              resulting record state.
            </p>
            <div className="mt-6 rounded-xl border border-[#276749] bg-white p-6 text-center">
              <p className="text-xl font-extrabold text-[#205c38]">
                FIELD CHANGED
              </p>
              <p className="my-3 text-3xl font-extrabold text-[#276749]">≠</p>
              <p className="text-xl font-extrabold text-[#205c38]">
                FIELD VALUE AFTER CHANGE
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Curriculum Discipline"
            title="What We Deliberately Do Not Teach Yet"
            icon={<LuInfo aria-hidden="true" />}
          >
            <p>
              Lesson 3A stays focused on mechanics of qualification. We do not
              allow every discovery to become a new rabbit hole.
            </p>
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Sophisticated email formatting",
              "Custom Email",
              "Recipients and permission architecture",
              "Bulk-operation internals",
              "Pipelines",
              "Jinja syntax",
              "$prev implementation details",
              "Complex date formulas",
              "Every Notification option",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-xl border border-gray-300 bg-white p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-[#276749]">
                  <LuInfo aria-hidden="true" />
                </span>
                <p className="leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Student Outcome"
            title="What You Should Understand Before Moving to 3B"
            icon={<LuBookOpen aria-hidden="true" />}
          />

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Previous value does not mean the field changed.",
                "empty and nonexistent describe different previous-state situations.",
                "Added, Modified, and Deleted are separate record events.",
                "Event criteria define which kinds of activity are eligible.",
                "Selected-field mode behaves like a logical OR across selected changed fields.",
                "An unselected field can change without disqualifying an otherwise qualifying modification.",
                "Zero selected fields is not equivalent to Any field changes.",
                "A field-change test and a resulting-state test are different questions.",
                "Single-record and multiple-record email behavior should not be casually conflated.",
                "The Notification funnel is a conceptual model, not an undocumented internal algorithm.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-lg border border-[#9fc9ad] bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#276749] font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Next: Lesson 3B
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Notification Logic: Conditions, Boolean Evaluation &amp; Grouping
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              Lesson 3A answered <strong>what Quickbase can evaluate</strong>.
              Lesson 3B asks how those facts combine into logical expressions.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
              We will move from record events, field participation, and
              resulting state into AND, OR, ALL, ANY, truth tables, and
              eventually grouped criteria—without pretending untested grouping
              behavior is already proven.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/3b"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
              >
                Continue to Lesson 3B →
              </Link>
              <Link
                href="/lessons"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
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
