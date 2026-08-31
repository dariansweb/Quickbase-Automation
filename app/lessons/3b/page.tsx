import type { ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBellRing,
  LuBinary,
  LuBookOpen,
  LuBraces,
  LuCheck,
  LuCircleHelp,
  LuDatabase,
  LuEye,
  LuFilter,
  LuGitBranch,
  LuGrid3X3,
  LuInfo,
  LuLightbulb,
  LuListChecks,
  LuMail,
  LuRoute,
  LuSearch,
  LuSend,
  LuSettings2,
  LuSplit,
  LuTable2,
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

function CodeSample({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-[#111827] p-5 text-sm leading-7 text-gray-100">
      <code className="whitespace-pre-wrap font-mono">{children}</code>
    </div>
  );
}

export default function LessonThreeBPage() {
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
          <p className="mb-2 text-lg font-semibold text-white/90">Lesson 3B</p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Notification Logic: Conditions & Boolean Evaluation
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Lesson 3A separated record events, changed fields, and resulting
            state. Lesson 3B connects those facts into logical expressions and
            investigates how Quickbase decides whether a Notification qualifies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/3a"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/4"
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
          <QuestionCard question="How does Quickbase combine event facts, field-change criteria, and resulting-state conditions into a decision about whether a Notification qualifies?">
            <p>
              This is not a configuration manual. Quickbase Help can explain
              individual controls. Our purpose is to understand what those
              controls mean when they work together.
            </p>
            <p className="mt-4">
              The lesson progresses from simple Boolean conditions to compound
              rules, grouping, operation scope, and finally practical
              Notification design.
            </p>
          </QuestionCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Begin Where Lesson 3A Ended"
            icon={<LuRoute aria-hidden="true" />}
          >
            <p>Lesson 3A separated the pieces. Lesson 3B connects them.</p>
          </SectionHeading>
          <MentalModel title="The three questions we already know">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
                description="What happened to the record?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Field-Change Criterion"
                description="Which fields participated in the change?"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGitBranch aria-hidden="true" />}
                title="After-Change Conditions"
                description="What is true after the change?"
                final
              />
            </div>
          </MentalModel>
          <Remember title="The Notification editor is constructing logic through UI controls">
            <p>
              The form may not show programming operators or literal
              parentheses. That does not mean the logic is absent.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="Quickbase Is Already Speaking Boolean"
            icon={<LuBinary aria-hidden="true" />}
          >
            <p>
              Translate the words Quickbase itself uses into the logical
              concepts beneath them.
            </p>
          </SectionHeading>
          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-5 py-4 font-bold text-[#205c38]">
                    Quickbase concept
                  </th>
                  <th className="px-5 py-4 font-bold text-[#205c38]">
                    Boolean idea
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Modified or Added", "OR"],
                  ["Any selected changed field", "OR"],
                  ["all conditions", "AND"],
                  ["any conditions", "OR"],
                  ["New criteria set", "Grouping"],
                  ["Nested criteria set", "Parenthetical expression"],
                ].map(([qb, logic]) => (
                  <tr key={qb} className="border-b border-gray-200">
                    <td className="px-5 py-4">{qb}</td>
                    <td className="px-5 py-4 font-semibold text-[#276749]">
                      {logic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-4xl text-lg leading-8">
            The UI hides much of the punctuation, but it does not remove the
            logic.
          </p>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 3"
            title="Establish the Laboratory Conditions"
            icon={<LuSettings2 aria-hidden="true" />}
          >
            <p>
              Our Tasks table supplied two simple predicates. The date boundary
              was chosen so existing records would fall on both sides of it.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="A" icon={<LuCheck aria-hidden="true" />}>
              <p className="font-semibold">Status is Complete</p>
            </ConceptCard>
            <ConceptCard title="B" icon={<LuCheck aria-hidden="true" />}>
              <p className="font-semibold">
                Due Date is on or after 11-01-2026
              </p>
            </ConceptCard>
          </div>
          <Remember title="Good experiments need records that can disagree">
            <p>
              The test data deliberately included TRUE / TRUE, TRUE / FALSE,
              FALSE / TRUE, and FALSE / FALSE states.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 4–5"
            title="Experiment 3B.1 — ALL Means AND"
            icon={<LuListChecks aria-hidden="true" />}
          >
            <p>
              Configure the lower criteria so that all conditions must be true.
            </p>
          </SectionHeading>
          <ExperimentCard
            title="ALL"
            observed="Only the record satisfying both after-change predicates qualified."
          >
            <CodeSample>{`all of these conditions are true

Status = Complete

AND

Due Date is on or after 11-01-2026

A AND B`}</CodeSample>
            <div className="overflow-x-auto">
              <table className="w-full min-w-150 border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#276749]">
                    <th className="px-4 py-3 font-bold text-[#205c38]">
                      Status Complete
                    </th>
                    <th className="px-4 py-3 font-bold text-[#205c38]">
                      Date qualifies
                    </th>
                    <th className="px-4 py-3 font-bold text-[#205c38]">
                      ALL / AND
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["TRUE", "TRUE", "TRUE"],
                    ["TRUE", "FALSE", "FALSE"],
                    ["FALSE", "TRUE", "FALSE"],
                    ["FALSE", "FALSE", "FALSE"],
                  ].map((row) => (
                    <tr
                      key={row.join("-")}
                      className="border-b border-gray-200"
                    >
                      {row.map((v, i) => (
                        <td key={i} className="px-4 py-3">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ExperimentCard>
          <Discovery title="Task #17 connected Boolean logic back to field-change mechanics">
            <CodeSample>{`STATUS
Before: Open
After:  Complete

DUE DATE
Before: 11-10-2026
After:  11-10-2026`}</CodeSample>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 bg-white p-5">
                <p className="font-bold text-[#205c38]">Field participation</p>
                <CodeSample>{`Status changed?     TRUE
Due Date changed?   FALSE`}</CodeSample>
              </div>
              <div className="rounded-xl border border-[#9fc9ad] bg-white p-5">
                <p className="font-bold text-[#205c38]">Resulting state</p>
                <CodeSample>{`Status = Complete?       TRUE
Due Date >= 11/01/26?    TRUE`}</CodeSample>
              </div>
            </div>
            <p className="mt-5">
              The lower criteria evaluated <strong>TRUE AND TRUE</strong>, even
              though Due Date itself did not change.
            </p>
          </Discovery>
          <Remember title="A true after-change condition does not require that field to have changed">
            <p>
              Field participation and resulting-state predicates answer
              different questions.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="An Accidental Experiment: No Watched Fields"
            icon={<LuEye aria-hidden="true" />}
          >
            <p>
              We selected restricted-field mode but left every field unchecked.
            </p>
          </SectionHeading>
          <Discovery title="Restricted mode with zero selected fields produced no emails">
            <CodeSample>{`"Any field changes"

        ≠

"Any of the following fields change"
with zero selected fields`}</CodeSample>
            <p className="mt-5">
              Quickbase did not silently fall back to unrestricted modification
              behavior.
            </p>
          </Discovery>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 7–8"
            title="Combine Field-Change Logic With State Logic"
            icon={<LuBraces aria-hidden="true" />}
          >
            <p>
              The watched fields were Task Name, Due Date, and Status, while the
              lower state criteria remained Status Complete AND Due Date Valid.
            </p>
          </SectionHeading>
          <CodeSample>{`MODIFIED

AND

(
    TaskNameChanged
    OR DueDateChanged
    OR StatusChanged
)

AND

(
    StatusComplete
    AND DueDateValid
)`}</CodeSample>
          <Discovery title="Only Task Name changed, yet the Notification still qualified">
            <CodeSample>{`TASK NAME
Before: Prepare November Weekly Reports
After:  Prepare November Reports

STATUS
Complete → Complete

DUE DATE
11-10-2026 → 11-10-2026`}</CodeSample>
            <div className="mt-5">
              <CodeSample>{`TRUE
AND
(TRUE OR FALSE OR FALSE)
AND
(TRUE AND TRUE)

= TRUE`}</CodeSample>
            </div>
            <p className="mt-5">
              Separate logical layers can be satisfied by different facts.
            </p>
          </Discovery>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 9–12"
            title="Experiment 3B.2 — Change ALL to ANY"
            icon={<LuSplit aria-hidden="true" />}
          >
            <p>
              Exactly one meaningful variable changed: the lower selector moved
              from all to any.
            </p>
          </SectionHeading>
          <ExperimentCard
            title="ANY"
            observed="#17, #19, #18, and #21 all produced emails because each record satisfied at least one lower condition."
          >
            <CodeSample>{`StatusComplete
OR
DueDateValid`}</CodeSample>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["#17", "TRUE OR TRUE = TRUE"],
                ["#19", "TRUE OR FALSE = TRUE"],
                ["#18", "FALSE OR TRUE = TRUE"],
                ["#21", "FALSE OR TRUE = TRUE"],
              ].map(([r, x]) => (
                <div
                  key={r}
                  className="rounded-xl border border-gray-300 bg-white p-5"
                >
                  <p className="font-bold text-[#205c38]">{r}</p>
                  <p className="mt-2 font-mono text-sm">{x}</p>
                </div>
              ))}
            </div>
          </ExperimentCard>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-4 py-3 font-bold text-[#205c38]">A</th>
                  <th className="px-4 py-3 font-bold text-[#205c38]">B</th>
                  <th className="px-4 py-3 font-bold text-[#205c38]">
                    ALL / AND
                  </th>
                  <th className="px-4 py-3 font-bold text-[#205c38]">
                    ANY / OR
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["TRUE", "TRUE", "TRUE", "TRUE"],
                  ["TRUE", "FALSE", "FALSE", "TRUE"],
                  ["FALSE", "TRUE", "FALSE", "TRUE"],
                  ["FALSE", "FALSE", "FALSE", "FALSE"],
                ].map((row) => (
                  <tr key={row.join("-")} className="border-b border-gray-200">
                    {row.map((v, i) => (
                      <td key={i} className="px-4 py-3">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Remember title="OR allows different records to qualify for different reasons">
            <p>
              #19 can qualify because Status is Complete while #18 qualifies
              because Due Date passes. The same rule can be satisfied through
              different logical branches.
            </p>
          </Remember>
          <Discovery title="When expected ANY behavior failed, we checked the configuration instead of changing the theory">
            <p>
              Only #17 initially emailed during what we thought was the ANY run.
              Inspection showed the Notification was actually still set to{" "}
              <strong>all</strong>. We corrected the experiment and retested.
            </p>
          </Discovery>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 13–17"
            title="Criteria Sets Become Parentheses"
            icon={<LuGitBranch aria-hidden="true" />}
          >
            <p>
              <strong>Add this to a new set of criteria</strong> created a
              nested criteria container with its own all/any selector. The
              visual hierarchy represented grouping.
            </p>
          </SectionHeading>
          <MentalModel title="UI hierarchy → conceptual grouping">
            <div className="grid gap-5 md:grid-cols-2">
              <ConceptCard
                title="Quickbase UI"
                icon={<LuSettings2 aria-hidden="true" />}
              >
                <p>
                  An indented or nested criteria set groups conditions together.
                </p>
              </ConceptCard>
              <ConceptCard
                title="Boolean abstraction"
                icon={<LuBraces aria-hidden="true" />}
              >
                <p>
                  The same structure can be reasoned about using conceptual
                  parentheses.
                </p>
              </ConceptCard>
            </div>
          </MentalModel>
          <ExperimentCard
            title="3B.3 — A OR (B AND C)"
            observed="#19, #17, and #18 qualified. #21 did not."
          >
            <CodeSample>{`A = Status = Complete
B = Due Date >= 11-01-2026
C = Task Name begins with "Review"

A OR (B AND C)`}</CodeSample>
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[#276749]">
                    <th className="px-4 py-3">Record</th>
                    <th className="px-4 py-3">A</th>
                    <th className="px-4 py-3">B</th>
                    <th className="px-4 py-3">C</th>
                    <th className="px-4 py-3">Expression</th>
                    <th className="px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["#19", "T", "F", "F", "T", "EMAIL"],
                    ["#17", "T", "T", "F", "T", "EMAIL"],
                    ["#18", "F", "T", "T", "T", "EMAIL"],
                    ["#21", "F", "T", "F", "F", "NO EMAIL"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-gray-200">
                      {row.map((v, i) => (
                        <td key={i} className="px-4 py-3">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="mb-3 font-bold text-[#205c38]">#18</p>
                <CodeSample>{`FALSE OR (TRUE AND TRUE)
FALSE OR TRUE
TRUE
EMAIL`}</CodeSample>
              </div>
              <div>
                <p className="mb-3 font-bold text-[#205c38]">#21</p>
                <CodeSample>{`FALSE OR (TRUE AND FALSE)
FALSE OR FALSE
FALSE
NO EMAIL`}</CodeSample>
              </div>
            </div>
          </ExperimentCard>
          <Remember title="Grouping controls which logical relationships are evaluated together">
            <p>
              <code>A OR (B AND C)</code> does not necessarily mean{" "}
              <code>(A OR B) AND C</code>. We do not need to exhaust every
              permutation once grouping has been demonstrated.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 18–19"
            title="Practice the Logic Without Memorizing the UI"
            icon={<LuBinary aria-hidden="true" />}
          >
            <p>
              The tutorial can reinforce reasoning with compact Boolean and
              evaluation exercises.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Abstract Boolean mode"
              icon={<LuBinary aria-hidden="true" />}
            >
              <CodeSample>{`A = TRUE / FALSE
B = TRUE / FALSE
C = TRUE / FALSE

A AND B
A OR B
A OR (B AND C)
(A OR B) AND C`}</CodeSample>
            </ConceptCard>
            <ConceptCard
              title="Quickbase mode"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <CodeSample>{`A = Status Complete
B = Due Date Valid
C = Task Name Begins Review`}</CodeSample>
            </ConceptCard>
          </div>
          <div className="mt-6 rounded-xl border border-gray-300 bg-white p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Evaluation exercise
            </p>
            <p className="mt-4 leading-8">
              Task modified. Task Name changed. Status remained Complete. Due
              Date remained December 10. Watched fields are Task Name, Status,
              and Due Date. Conditions require Status = Complete AND Due Date ≥
              November 1.
            </p>
            <details className="mt-5 rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4">
              <summary className="cursor-pointer font-bold text-[#276749]">
                Show Evaluation
              </summary>
              <CodeSample>{`Record event qualifies?       TRUE
Watched field changed?        TRUE
Status condition?             TRUE
Date condition?               TRUE
Final result?                 QUALIFIES`}</CodeSample>
            </details>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 20–23"
            title="An Unexpected Multiple-Record Email Became a New Experiment"
            icon={<LuGrid3X3 aria-hidden="true" />}
          >
            <p>
              During the grouped experiment, some results arrived in the
              familiar single-record format while #17 and #18 appeared together
              in a multiple-record message.
            </p>
          </SectionHeading>
          <Discovery title="Unexpected behavior is evidence, not an inconvenience">
            <CodeSample>{`Records modified

Multiple records in Automation: Tasks were modified.`}</CodeSample>
            <p className="mt-5">
              The generated link opened a Quickbase report/grid containing the
              affected records. We stopped the Boolean lesson long enough to
              isolate the cause.
            </p>
          </Discovery>
          <div className="rounded-xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Operation scope
            </p>
            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-white p-4">
                ○ Only when single task records change{" "}
                <span className="ml-2 text-gray-500">(e.g., Add, Edit)</span>
              </div>
              <div className="rounded-lg bg-white p-4">
                ○ Only when multiple task records change{" "}
                <span className="ml-2 text-gray-500">(e.g., Import)</span>
              </div>
              <div className="rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4 font-semibold text-[#205c38]">
                ● For either type of change
              </div>
            </div>
            <p className="mt-5 leading-8">
              The Notification also provides separate Single Record Version and
              Multiple Record Version message templates.
            </p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ExperimentCard
              title="3B.4 — Individual Form Edit"
              observed="#17 → single-record email. #18 → single-record email."
            >
              <CodeSample>{`Open #17
Change
Save

Open #18
Change
Save`}</CodeSample>
            </ExperimentCard>
            <ExperimentCard
              title="3B.5 — Grid Edit"
              observed="Multiple qualifying changes committed through Grid Edit produced the Multiple Record Version."
            >
              <CodeSample>{`GRID EDIT
     ↓
multiple qualifying records
     ↓
Multiple Record Version
     ↓
"Records modified"
     ↓
report/grid link`}</CodeSample>
            </ExperimentCard>
          </div>
          <Discovery title="The mystery was Grid Edit">
            <p>
              The earlier #17/#18 multiple-record message was not random
              bundling. We had been working in Grid Edit mode, which our
              experiment showed Quickbase treated as a multiple-record change
              operation for Notification behavior.
            </p>
          </Discovery>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 24"
            title="Three Concepts That Must Not Be Confused"
            icon={<LuSplit aria-hidden="true" />}
          />
          <Remember title="Fields, records, and operations are different dimensions">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-5 text-center shadow-sm">
                <p className="font-bold text-[#205c38]">
                  How many fields changed?
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 text-center shadow-sm">
                <p className="font-bold text-[#205c38]">
                  How many records changed?
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 text-center shadow-sm">
                <p className="font-bold text-[#205c38]">
                  What operation changed them?
                </p>
              </div>
            </div>
            <p className="mt-5">
              One record can have Status and Due Date changed and still be one
              record. Grid Edit can modify several records together and become a
              multiple-record operation for Notification behavior.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 25–28"
            title="Operation Scope Is Part of Good Notification Design"
            icon={<LuMail aria-hidden="true" />}
          >
            <p>
              The separate message versions now make practical sense, and they
              expose a broader application-design question: when is
              communication useful?
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Single-record version"
              icon={<LuMail aria-hidden="true" />}
            >
              <p>
                Can contain detailed information about one record, including
                before/after values.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Multiple-record version"
              icon={<LuGrid3X3 aria-hidden="true" />}
            >
              <p>
                Can summarize bulk activity and link to affected records instead
                of repeating large diagnostic blocks.
              </p>
            </ConceptCard>
          </div>
          <MentalModel title="Notification fatigue">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Too Many Qualifying Events"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuMail aria-hidden="true" />}
                title="Too Many Emails"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuBellRing aria-hidden="true" />}
                title="Users Begin Ignoring Them"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuInfo aria-hidden="true" />}
                title="Important Messages Lose Distinction"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuWorkflow aria-hidden="true" />}
                title="Automation Loses Practical Value"
                final
              />
            </div>
          </MentalModel>
          <Remember title="A technically correct Notification can still be badly designed">
            <p>
              Do not ask only, “Does this Notification send correctly?” Also ask
              whether the recipient actually needs the message under those
              circumstances.
            </p>
            <p className="mt-4">
              A useful Notification should ideally target the smallest useful
              audience, for the smallest useful set of events, with the smallest
              useful amount of repetitive communication.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 29–30"
            title="The Complete Notification Reasoning Model"
            icon={<LuWorkflow aria-hidden="true" />}
          >
            <p>
              Lessons 3A and 3B now combine into a richer conceptual funnel.
            </p>
          </SectionHeading>
          <MentalModel title="From activity to communication">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuDatabase aria-hidden="true" />}
                title="Record Activity"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Relevant Field Change"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuDatabase aria-hidden="true" />}
                title="Resulting Record State"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuBinary aria-hidden="true" />}
                title="Boolean Conditions"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuBraces aria-hidden="true" />}
                title="Grouped Criteria"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGrid3X3 aria-hidden="true" />}
                title="Operation Scope"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuCheck aria-hidden="true" />}
                title="Notification Qualifies"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuMail aria-hidden="true" />}
                title="Appropriate Message Version"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuSend aria-hidden="true" />}
                title="Email"
                final
              />
            </div>
          </MentalModel>
          <Remember title="This remains a conceptual reasoning model">
            <p>
              It is derived from documented Quickbase concepts and observed
              behavior. It is not a claim about Quickbase&apos;s undocumented
              private execution order.
            </p>
          </Remember>
          <CodeSample>{`MODIFIED

AND
(
    TaskNameChanged
    OR DueDateChanged
    OR StatusChanged
)

AND
(
    StatusComplete
    OR
    (
        DueDateOnOrAfterNov1
        AND TaskNameBeginsWithReview
    )
)

AND
(
    permitted operation scope
)`}</CodeSample>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 31–32"
            title="Quickbase UI → Logical Expression"
            icon={<LuTable2 aria-hidden="true" />}
          />
          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-200 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-5 py-4 font-bold text-[#205c38]">
                    Quickbase UI
                  </th>
                  <th className="px-5 py-4 font-bold text-[#205c38]">
                    Conceptual logic
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Task is modified", "Event predicate"],
                  ["Modified or added", "OR between event types"],
                  ["Any field changes", "Broad modification criterion"],
                  ["Any of selected fields change", "OR among watched fields"],
                  [
                    "Conditions true after change",
                    "Resulting-state predicates",
                  ],
                  ["all", "AND"],
                  ["any", "OR"],
                  ["New set of criteria", "Group"],
                  ["Nested criteria set", "Parentheses"],
                  ["Single / multiple / either", "Operation scope"],
                ].map(([a, b]) => (
                  <tr key={a} className="border-b border-gray-200">
                    <td className="px-5 py-4">{a}</td>
                    <td className="px-5 py-4 font-semibold text-[#276749]">
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <ConceptCard
              title="Quickbase UI"
              icon={<LuSettings2 aria-hidden="true" />}
            >
              <CodeSample>{`Status is equal to Complete
AND
Due Date is on or after 11-01-2026`}</CodeSample>
            </ConceptCard>
            <ConceptCard
              title="Boolean abstraction"
              icon={<LuBinary aria-hidden="true" />}
            >
              <CodeSample>{`StatusComplete AND DueDateValid`}</CodeSample>
            </ConceptCard>
            <ConceptCard
              title="SQL-style reasoning"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <CodeSample>{`Status = 'Complete'
AND DueDate >= '2026-11-01'`}</CodeSample>
            </ConceptCard>
            <ConceptCard
              title="JavaScript-style reasoning"
              icon={<LuBraces aria-hidden="true" />}
            >
              <CodeSample>{`status === "Complete" && dueDate >= boundary`}</CodeSample>
            </ConceptCard>
          </div>
          <Remember title="Syntax changes; logic survives">
            <p>
              We are not teaching SQL or JavaScript here. We are showing that
              the same logical relationships survive different syntaxes and
              interfaces.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 33–34"
            title="Lesson 3A + 3B Consolidation"
            icon={<LuBookOpen aria-hidden="true" />}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Lesson 3A asked..."
              icon={<LuEye aria-hidden="true" />}
            >
              <p className="font-semibold">
                What does Quickbase have available to evaluate?
              </p>
              <ul className="mt-4 space-y-2">
                <li>Record events</li>
                <li>Changed fields</li>
                <li>Previous values</li>
                <li>Current values</li>
                <li>After-change state</li>
              </ul>
            </ConceptCard>
            <ConceptCard
              title="Lesson 3B asked..."
              icon={<LuBinary aria-hidden="true" />}
            >
              <p className="font-semibold">
                How can those facts be combined into a decision?
              </p>
              <ul className="mt-4 space-y-2">
                <li>AND</li>
                <li>OR</li>
                <li>ALL</li>
                <li>ANY</li>
                <li>GROUPING</li>
                <li>OPERATION SCOPE</li>
              </ul>
            </ConceptCard>
          </div>
          <div className="mt-8 space-y-5">
            {[
              [
                "Why can a Notification send when Status is Complete even though Status did not change?",
                "Because a field-change criterion and an after-change condition answer different questions.",
              ],
              [
                "Why did all send only for #17 during the controlled test?",
                "Because both after-change predicates had to be true.",
              ],
              [
                "Why did any allow several records to qualify?",
                "Because only one predicate needed to be true.",
              ],
              [
                "Why did #18 qualify under A OR (B AND C) while #21 did not?",
                "#18 satisfied both conditions inside the nested group; #21 satisfied only one.",
              ],
              [
                "Why did some tests produce a multiple-record email?",
                "Because those records were changed together through Grid Edit, which our experiment showed produced multiple-record Notification behavior.",
              ],
              [
                "Why should an administrator care about operation scope?",
                "Because a Notification can be logically correct while still producing unnecessary communication.",
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                className="rounded-xl border border-gray-300 bg-white p-5"
              >
                <summary className="cursor-pointer text-lg font-bold text-[#205c38]">
                  {q}
                </summary>
                <p className="mt-4 leading-8">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 35"
            title="What We Deliberately Leave Behind"
            icon={<LuInfo aria-hidden="true" />}
          >
            <p>
              More permutations would now become repetitive rather than
              educational.
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Custom Email",
              "Advanced recipient design",
              "Bulk email limits in depth",
              "Pipelines",
              "Jinja",
              "$prev",
              "Complex formulas",
              "Advanced date expressions",
              "Large-scale notification architecture",
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
            eyebrow="Part 36"
            title="Final Lesson Principle"
            icon={<LuCheck aria-hidden="true" />}
          />
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-2xl font-extrabold leading-9 text-[#205c38]">
              A Quickbase Notification is not simply an email attached to a
              record change. It is an event-driven logical rule.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "WHAT happened",
                "WHAT changes matter",
                "WHAT must be true afterward",
                "HOW those requirements relate",
                "WHAT operation scope matters",
                "WHEN communication is actually useful",
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
          <MentalModel title="The final progression">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuZap aria-hidden="true" />}
                title="Record Event"
              />
              <FlowArrow />
              <FlowStep icon={<LuEye aria-hidden="true" />} title="Observe" />
              <FlowArrow />
              <FlowStep
                icon={<LuFilter aria-hidden="true" />}
                title="Identify Relevant Change"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuDatabase aria-hidden="true" />}
                title="Evaluate State"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuBinary aria-hidden="true" />}
                title="Apply Boolean Logic"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuBraces aria-hidden="true" />}
                title="Apply Grouping"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuGrid3X3 aria-hidden="true" />}
                title="Consider Operation Scope"
              />
              <FlowArrow />
              <FlowStep icon={<LuCheck aria-hidden="true" />} title="Qualify" />
              <FlowArrow />
              <FlowStep
                icon={<LuSend aria-hidden="true" />}
                title="Communicate"
                final
              />
            </div>
          </MentalModel>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Learning Method"
            title="How We Established the Model Matters"
            icon={<LuSearch aria-hidden="true" />}
          >
            <p>
              The student is not merely being told what Quickbase does. The
              lesson shows how the behavior was established.
            </p>
          </SectionHeading>
          <MentalModel title="Expectation → experiment → correction">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <FlowStep
                icon={<LuCircleHelp aria-hidden="true" />}
                title="Expectation"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuSettings2 aria-hidden="true" />}
                title="Experiment"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuEye aria-hidden="true" />}
                title="Observation"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuSplit aria-hidden="true" />}
                title="Do They Agree?"
              />
              <FlowArrow />
              <div className="grid w-full gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#9fc9ad] bg-white p-5 text-center">
                  <p className="font-bold text-[#205c38]">YES</p>
                  <p className="mt-2">Keep the model.</p>
                </div>
                <div className="rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-5 text-center">
                  <p className="font-bold text-[#7a5200]">NO</p>
                  <p className="mt-2">
                    Investigate the assumption, correct it, and retest.
                  </p>
                </div>
              </div>
            </div>
          </MentalModel>
          <p className="max-w-4xl text-lg leading-8">
            That pattern explains both major detours in this lesson: the
            Notification that was still configured as <strong>all</strong> when
            we thought we were testing <strong>any</strong>, and the
            multiple-record email that turned out to be caused by Grid Edit.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Next: Lesson 4
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Custom Email
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              Notification research has finally made the next question worth
              asking:
            </p>
            <p className="mt-4 max-w-4xl text-2xl font-extrabold leading-9">
              If a Notification can already do all of this, what problem is
              Custom Email intended to solve?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/4"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
              >
                Continue to Lesson 4 →
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
