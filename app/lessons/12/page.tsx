"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBraces,
  LuCheck,
  LuCircleHelp,
  LuDatabase,
  LuGitBranch,
  LuLightbulb,
  LuNetwork,
  LuRefreshCw,
  LuRoute,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuUser,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

type EvidenceType = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "SPECULATIVE";
type TFQuestion = {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
};

const quizQuestions: TFQuestion[] = [
  {
    id: 1,
    statement:
      "If Status is the only field selected under Fields, then Status is the only information a later step can use.",
    answer: false,
    explanation:
      "Status can be the watched trigger field while other business fields are explicitly made available for subsequent use. Quickbase can also expose built-in/system information.",
  },
  {
    id: 2,
    statement: "{{aa.status}} permanently contains the value Open.",
    answer: false,
    explanation:
      "It is a reference stored in the Pipeline definition. Its concrete value belongs to a particular run.",
  },
  {
    id: 3,
    statement:
      "{{aa.assigned_to.id}} accesses a property of the structured Assigned To value.",
    answer: true,
    explanation:
      "Assigned To exposed nested properties such as id, first_name, last_name, email, and screen_name.",
  },
  {
    id: 4,
    statement: "Assigned To → Email is Pipeline Metadata.",
    answer: false,
    explanation:
      "Email is a property of the structured Assigned To value. Pipeline Metadata is a separate runtime/context structure.",
  },
  {
    id: 5,
    statement:
      "Typing [aa.Task Name] into a Pipeline field creates a runtime reference.",
    answer: false,
    explanation:
      "Our controlled failure showed that Quickbase treated that notation as literal text.",
  },
  {
    id: 6,
    statement:
      "A later step can combine several earlier-step references with ordinary text and write the result into another field.",
    answer: true,
    explanation:
      "We observed this with Pipeline Results by combining Task Name, Status, and Assigned To ID with literal text.",
  },
  {
    id: 7,
    statement:
      "If Task Name from aa is referenced in ab, it must be written back to the Task Name field.",
    answer: false,
    explanation: "Source and destination are separate decisions.",
  },
  {
    id: 8,
    statement:
      "Comparing aa → Output with ab → Input can provide evidence that a reference resolved to the expected runtime value.",
    answer: true,
    explanation:
      "That comparison was the principal runtime evidence in our controlled experiment.",
  },
  {
    id: 9,
    statement:
      "Seeing created_at, record_owner, or last_modified_by means those fields were necessarily selected manually under Fields for subsequent steps.",
    answer: false,
    explanation:
      "Quickbase can expose built-in/system-generated runtime information in addition to explicitly selected business fields.",
  },
  {
    id: 10,
    statement:
      "Before testing a Pipeline, it is worth confirming that the Pipeline is ON even if it was ON during an earlier test.",
    answer: true,
    explanation:
      "Very painfully true. We observed it OFF when we expected ON, but we did not establish why.",
  },
];

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
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9fc9ad] hover:shadow-md">
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

function Remember({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#7a5200] shadow-sm">
          <LuLightbulb />
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

function EvidenceBadge({ type }: { type: EvidenceType }) {
  const styles: Record<EvidenceType, string> = {
    DOCUMENTED: "border-blue-300 bg-blue-50 text-blue-800",
    OBSERVED: "border-[#9fc9ad] bg-[#f0fff4] text-[#205c38]",
    INFERRED: "border-amber-300 bg-amber-50 text-amber-800",
    SPECULATIVE: "border-violet-300 bg-violet-50 text-violet-800",
  };
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function FlowArrow() {
  return (
    <div className="flex h-9 items-center justify-center">
      <LuArrowDown className="text-xl text-[#276749]/60" />
    </div>
  );
}

function FlowStep({
  icon,
  title,
  text,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  text?: string;
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
            className={`font-bold ${final ? "text-white" : "text-[#205c38]"}`}
          >
            {title}
          </h4>
          {text && (
            <p
              className={`mt-1 text-sm leading-6 ${final ? "text-white/85" : "text-gray-600"}`}
            >
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DefinitionGrid({
  items,
}: {
  items: Array<{ term: string; value?: string; description: ReactNode }>;
}) {
  return (
    <dl className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.term}
          className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
        >
          <dt className="font-bold uppercase tracking-[0.1em] text-[#276749]">
            {item.term}
          </dt>
          {item.value && (
            <dd className="mt-2 font-mono text-sm font-bold text-gray-950">
              {item.value}
            </dd>
          )}
          <dd className="mt-3 leading-7 text-gray-700">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

function CodeBlock({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 text-gray-100 shadow-sm">
      {title && (
        <div className="border-b border-gray-700 bg-gray-900 px-4 py-3 text-sm font-bold text-gray-300">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-5 text-sm leading-7">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function LessonQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const complete = Object.keys(answers).length === quizQuestions.length;
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
        0,
      ),
    [answers],
  );

  return (
    <section id="quiz" className="scroll-mt-8 pt-4">
      <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
        <div className="bg-[#205c38] p-7 text-white sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="font-bold uppercase tracking-[0.15em] text-white/75">
                Lesson 12 Quiz
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Can You Follow the Data?
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                Test the distinctions that matter: trigger fields, downstream
                availability, structured values, references, destinations,
                metadata, and runtime resolution.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-5 py-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                Progress
              </p>
              <p className="mt-1 text-2xl font-extrabold">
                {Object.keys(answers).length}/{quizQuestions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {quizQuestions.map((q, index) => {
            const selected = answers[q.id];
            const correct = selected === q.answer;
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-[#9fc9ad] bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    {index + 1}
                  </span>
                  <p className="text-lg font-semibold leading-8 text-[#205c38]">
                    {q.statement}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[true, false].map((choice) => {
                    const chosen = selected === choice;
                    const isAnswer = q.answer === choice;
                    let cls = "border-gray-300 bg-white hover:border-[#9fc9ad]";
                    if (chosen && !showResults)
                      cls = "border-[#276749] bg-[#f0fff4]";
                    if (showResults && isAnswer)
                      cls = "border-[#276749] bg-[#f0fff4]";
                    if (showResults && chosen && !isAnswer)
                      cls = "border-red-300 bg-red-50";
                    return (
                      <button
                        key={String(choice)}
                        type="button"
                        disabled={showResults}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [q.id]: choice }))
                        }
                        className={`rounded-xl border-2 p-4 text-left font-bold transition ${cls}`}
                      >
                        {choice ? "TRUE" : "FALSE"}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div
                    className={`mt-5 rounded-xl border p-5 ${correct ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-red-200 bg-red-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      {correct ? (
                        <LuBadgeCheck className="text-xl text-[#276749]" />
                      ) : (
                        <LuX className="text-xl text-red-700" />
                      )}
                      <p className="font-bold">
                        {correct
                          ? "Correct."
                          : "That distinction is worth another look."}
                      </p>
                    </div>
                    <p className="mt-3 leading-7">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="rounded-2xl border border-[#9fc9ad] bg-white p-6">
            {!showResults ? (
              <>
                <h3 className="text-xl font-bold text-[#205c38]">
                  Ready to test the data-flow model?
                </h3>
                <p className="mt-2 leading-7">
                  Answer all ten questions, then grade the quiz.
                </p>
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() => setShowResults(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <LuBadgeCheck /> Grade Lesson 12 Quiz
                </button>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    Final Score
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-[#205c38]">
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="mt-3 max-w-3xl leading-7">
                    {score === quizQuestions.length
                      ? "Runtime Mapper — You are keeping definition-time references, runtime values, properties, metadata, source, and destination separate."
                      : score >= 8
                        ? "Strong Data-Flow Model — Review any misses around structured User values or exported business fields."
                        : score >= 6
                          ? "Pipeline Builder — Revisit definition-time reference vs runtime value and source vs destination."
                          : "Rebuild the model — aa exposes runtime information; ab references selected earlier-step information; runtime resolves those references into concrete inputs."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749]"
                >
                  <LuRefreshCw /> Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LessonTwelvePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 12
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Passing Data Through a Pipeline
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Lesson 11 taught us how to read a Pipeline run after it happens. Now
            we use that evidence to answer a new question: how does information
            available in one step become usable by a later step?
          </p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
            A Pipeline is not merely a row of independent instructions. Earlier
            steps can expose runtime information, later steps can reference it,
            and those references resolve to concrete values during each run.
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">
              Lesson 12 is about data flow between steps.
            </p>
            <p className="mt-2 leading-7 text-white/90">
              Conditions and filters are intentionally deferred to Lesson 13.
              Activity from Lesson 11 is now our experimental instrument, not a
              topic we need to reteach.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/11"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/13"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Next Lesson →
            </Link>
            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]"
            >
              Table of Contents
            </Link>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold text-white"
            >
              <LuTarget /> Skip to Lesson 12 Quiz ↓
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="From Runtime Evidence to Runtime Data Flow"
            icon={<LuRoute />}
          >
            <p>
              As we learned in Lesson 11, Activity can show what a step
              received, targeted, returned, and knew during a run. Lesson 12
              uses that evidence to follow values from one step into another.
            </p>
          </SectionHeading>

          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <FlowStep
              icon={<LuDatabase />}
              title="Earlier Step"
              text="Produces or exposes runtime information"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuGitBranch />}
              title="Later Step Reference"
              text="Points to selected earlier-step information"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuZap />}
              title="Runtime Resolution"
              text="The reference resolves to a concrete value for this run"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuSettings2 />}
              title="Later-Step Input"
              text="The resolved value becomes usable by the later action"
              final
            />
          </div>

          <Remember title="Definition contains references. Runtime produces values.">
            <p>That sentence is the mental anchor for the entire lesson.</p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="What We Already Know"
            icon={<LuBookOpen />}
          >
            <p>
              This lesson is cumulative. We will use earlier concepts without
              reteaching them.
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "A Pipeline belongs to the realm.",
              "Steps have Ref IDs such as aa and ab.",
              "Triggers and actions execute at runtime.",
              "Activity records what actually happened.",
              "Target step, Input, Output, and Metadata can expose runtime evidence.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4"
              >
                <LuCheck className="mt-1 shrink-0 text-xl text-[#276749]" />
                <p className="leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 3"
            title="Build a Fresh Pipeline for Lesson 12"
            icon={<LuWorkflow />}
          >
            <p>
              We preserve the Lesson 10 and Lesson 11 Pipeline as historical
              evidence and create a new laboratory specimen.
            </p>
          </SectionHeading>
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Pipeline Name
            </p>
            <p className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Lesson 12 - Passing Data
            </p>
            <div className="mx-auto mt-7 flex max-w-xl flex-col items-center">
              <FlowStep
                icon={<LuZap />}
                title="aa — Quickbase: Record Updated"
                text="Trigger"
              />
              <FlowArrow />
              <FlowStep
                icon={<LuSettings2 />}
                title="ab — Quickbase: Update Record"
                text="Action"
                final
              />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <LuTriangleAlert className="mt-1 shrink-0 text-2xl text-[#7a5200]" />
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  Before Every Test
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Confirm that the Pipeline is ON.
                </h3>
                <p className="mt-3 leading-7">
                  We observed the Pipeline OFF when we expected it to be ON
                  after making changes. We did not establish the cause, so we do
                  not claim that editing always turns a Pipeline off.
                </p>
                <p className="mt-3 font-bold">
                  Never assume the toggle is still ON just because it was ON
                  during the previous experiment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 4"
            title="One Field Can Trigger While Several Fields Travel Forward"
            icon={<LuGitBranch />}
          >
            <p>
              Step <strong>aa</strong> gives us two settings that look related
              but answer different questions.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Fields" icon={<LuZap />}>
              <p className="font-bold text-[#205c38]">
                Which changes matter for initiation?
              </p>
              <p className="mt-3">
                Selected: <strong>Status</strong>
              </p>
              <p className="mt-3">
                Status is the business field being watched for a qualifying
                record update.
              </p>
            </ConceptCard>
            <ConceptCard title="Fields for subsequent steps" icon={<LuRoute />}>
              <p className="font-bold text-[#205c38]">
                Which business fields should later steps be able to use?
              </p>
              <ul className="mt-3 space-y-2">
                <li>Task Name</li>
                <li>Status</li>
                <li>Due Date</li>
                <li>Assigned To</li>
                <li>Later: Pipeline Results</li>
              </ul>
            </ConceptCard>
          </div>

          <Remember title="Do not say “only these fields are passed.”">
            <p>
              These are the{" "}
              <strong>
                business fields we explicitly selected for subsequent use
              </strong>
              . Runtime evidence can expose additional built-in and
              system-generated information as well.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 5"
            title="Activity Lets Us See the Configuration"
            icon={<LuDatabase />}
          >
            <p>
              The successful run gave us a direct pairing between the Pipeline
              configuration and the runtime evidence.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <CodeBlock title="Trigger runtime evidence">{`trigger_fields: 8
export_fields: 6, 8, 7, 12`}</CodeBlock>
            <CodeBlock title="Struct mapping">{`6  = Task Name
7  = Due Date
8  = Status
12 = Assigned To`}</CodeBlock>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <ConceptCard title="trigger_fields: 8" icon={<LuZap />}>
              <p>
                FID 8 corresponds to <strong>Status</strong>, the field watched
                for the Record Updated Trigger.
              </p>
            </ConceptCard>
            <ConceptCard title="export_fields: 6, 8, 7, 12" icon={<LuRoute />}>
              <p>
                These correspond to{" "}
                <strong>Task Name, Status, Due Date, and Assigned To</strong>.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-5">
            <EvidenceBadge type="OBSERVED" />
          </div>

          <Remember title="Trigger field and downstream business-field availability are different jobs">
            <p>
              They can overlap, but one setting controls what change matters for
              initiation while the other controls what business information is
              made available later.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="A Later Step Needs a Destination and a Source"
            icon={<LuSettings2 />}
          >
            <p>
              Step <strong>ab</strong> targets the record represented by{" "}
              <strong>Record Updated</strong>. Inside that action, two separate
              decisions must be made.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Decision 1 — Destination" icon={<LuTarget />}>
              <p className="font-bold text-[#205c38]">
                Where should ab place a value?
              </p>
              <p className="mt-3">
                This is the job of <strong>Fields to update</strong>.
              </p>
              <p className="mt-3">
                Possible destinations included Task Name, Due Date, Status,
                Assigned To, and Pipeline Results.
              </p>
            </ConceptCard>
            <ConceptCard title="Decision 2 — Source" icon={<LuDatabase />}>
              <p className="font-bold text-[#205c38]">
                What earlier-step information should supply that value?
              </p>
              <p className="mt-3">
                This is the job of the reference/value control.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Destination field ≠ runtime reference">
            <p>
              Mapping is not merely “copy this field back to the same field.”
              Source and destination are separate decisions.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 7"
            title="Fields for Subsequent Steps Affect the Downstream Field List"
            icon={<LuTable2 />}
          >
            <p>
              This was one of the strongest controlled UI discoveries in the
              lesson.
            </p>
          </SectionHeading>

          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <FlowStep
              icon={<LuCircleHelp />}
              title="Before"
              text="Pipeline Results existed in the Tasks table but was not offered under ab → Fields to update."
            />
            <FlowArrow />
            <FlowStep
              icon={<LuSettings2 />}
              title="Change aa"
              text="Add Pipeline Results under Fields for subsequent steps."
            />
            <FlowArrow />
            <FlowStep
              icon={<LuBadgeCheck />}
              title="After"
              text="Pipeline Results became available in the downstream Quickbase Update Record configuration."
              final
            />
          </div>

          <div className="mt-6">
            <EvidenceBadge type="OBSERVED" />
          </div>
          <p className="mt-4 max-w-4xl leading-8">
            In this <strong>Quickbase → Quickbase configuration</strong>, the
            business fields selected in
            <strong> aa → Fields for subsequent steps</strong> affected which
            business fields Quickbase offered in the downstream Update Record
            configuration.
          </p>

          <div className="mt-6 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-5">
            <p className="font-bold text-[#7a5200]">Troubleshooting habit</p>
            <p className="mt-2 leading-7">
              If a field exists in the table but does not appear where expected
              in a later Quickbase step, first inspect the earlier step&apos;s{" "}
              <strong>Fields for subsequent steps</strong>.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 8"
            title="References Are the Bridge Between Steps"
            icon={<LuNetwork />}
          >
            <p>
              Once earlier-step information is available, a later step needs a
              way to point to it.
            </p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Destination</th>
                    <th className="p-4 text-left">Reference</th>
                    <th className="p-4 text-left">Jinja / Code View</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Task Name", "aa.task_name", "{{aa.task_name}}"],
                    ["Due Date", "aa.due_date", "{{aa.due_date}}"],
                    ["Status", "aa.status", "{{aa.status}}"],
                    [
                      "Assigned To",
                      "aa.assigned_to.id",
                      "{{aa.assigned_to.id}}",
                    ],
                  ].map(([destination, reference, syntax], index) => (
                    <tr
                      key={destination}
                      className={`border-b border-gray-200 last:border-b-0 ${index % 2 ? "bg-[#fbfcfb]" : ""}`}
                    >
                      <td className="p-4 font-bold">{destination}</td>
                      <td className="p-4 font-mono text-sm">{reference}</td>
                      <td className="p-4 font-mono text-sm">{syntax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-7">
            <DefinitionGrid
              items={[
                {
                  term: "Step Ref ID",
                  value: "aa",
                  description:
                    "Identifies the earlier step whose runtime information we want to reference.",
                },
                {
                  term: "Field / value",
                  value: "status",
                  description:
                    "Identifies the runtime value exposed by that step.",
                },
                {
                  term: "Nested property",
                  value: "assigned_to.id",
                  description: "Selects a property inside a structured value.",
                },
                {
                  term: "Full reference",
                  value: "{{aa.assigned_to.id}}",
                  description:
                    "From step aa, use Assigned To, then select its id property.",
                },
              ]}
            />
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 9"
            title="The Same Value Can Appear in Different Reference Syntax"
            icon={<LuBraces />}
          >
            <p>
              This experiment became confusing for an important reason:
              Quickbase does not show references in exactly the same form
              everywhere.
            </p>

            <p className="mt-4">
              We were looking at reference notation from one Quickbase context
              and tried to use it in another. The result taught us that
              understanding the <strong>value being referenced</strong> is only
              half the job. We also have to use the syntax expected by the place
              where we are typing it.
            </p>
          </SectionHeading>

          {/* ======================================================
      THE THREE LAYERS
  ====================================================== */}

          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              First Separate Three Different Things
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <ConceptCard
                title="1 — Quickbase Field Label"
                icon={<LuTable2 />}
              >
                <p className="font-bold text-[#205c38]">Task Name</p>

                <p className="mt-3">
                  This is the human-readable field name we see in the Quickbase
                  table, form, and field configuration.
                </p>
              </ConceptCard>

              <ConceptCard title="2 — Reference Name" icon={<LuDatabase />}>
                <p className="font-mono font-bold text-[#205c38]">task_name</p>

                <p className="mt-3">
                  Pipeline references may use a machine-friendly runtime name
                  rather than the field&apos;s displayed label.
                </p>
              </ConceptCard>

              <ConceptCard title="3 — Reference Syntax" icon={<LuBraces />}>
                <p className="font-bold text-[#205c38]">
                  The wrapper depends on where the reference is being used.
                </p>

                <p className="mt-3">
                  Similar runtime information can appear with brackets, one set
                  of braces, or Jinja&apos;s two sets of braces depending on the
                  Quickbase surface.
                </p>
              </ConceptCard>
            </div>
          </div>

          {/* ======================================================
      OBSERVED SYNTAX CONTEXTS
  ====================================================== */}

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="border-b border-gray-200 bg-[#205c38] p-5 text-white">
              <p className="font-bold uppercase tracking-[0.12em] text-white/75">
                Context Matters
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                Similar Reference — Different Representation
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead className="bg-[#f0fff4] text-[#205c38]">
                  <tr>
                    <th className="p-4 text-left">Where We Encounter It</th>
                    <th className="p-4 text-left">Example Form</th>
                    <th className="p-4 text-left">What to Notice</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="p-4 font-bold">Quickbase field label</td>
                    <td className="p-4 font-mono">Task Name</td>
                    <td className="p-4 leading-7">
                      Human-readable field name. This is not itself Pipeline
                      syntax.
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200 bg-[#fbfcfb]">
                    <td className="p-4 font-bold">
                      Activity / runtime reference display
                    </td>
                    <td className="p-4 font-mono">[aa.taskname]</td>
                    <td className="p-4 leading-7">
                      A reference representation encountered while inspecting
                      runtime information. Seeing this form does not mean the
                      same notation can simply be typed into every Pipeline
                      control.
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200">
                    <td className="p-4 font-bold">
                      Other Quickbase reference contexts
                    </td>
                    <td className="p-4 font-mono">{"{aa.task_name}"}</td>
                    <td className="p-4 leading-7">
                      Some Quickbase surfaces can represent a reference with a
                      single set of braces.
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200 bg-[#fbfcfb]">
                    <td className="p-4 font-bold">Jinja expression</td>
                    <td className="p-4 font-mono">{"{{aa.task_name}}"}</td>
                    <td className="p-4 leading-7">
                      In Jinja, the runtime expression uses two sets of curly
                      braces.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Remember title="Do not memorize a reference without remembering where you saw it">
            <p>
              A reference that is valid or displayed in one Quickbase surface is
              not automatically valid syntax in another.
            </p>

            <p className="mt-3">
              Before typing a reference manually, ask two questions:
            </p>

            <ol className="mt-3 space-y-2 pl-6 list-decimal">
              <li>
                <strong>What value am I trying to reference?</strong>
              </li>
              <li>
                <strong>
                  What syntax does this particular control expect?
                </strong>
              </li>
            </ol>
          </Remember>

          {/* ======================================================
      WHY OUR FIRST ATTEMPT FAILED
  ====================================================== */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-red-700">
                What Went Wrong
              </p>

              <div className="mt-4">
                <CodeBlock>
                  {`Task: [aa.Task Name]
Status: [aa.Status]
Assigned To: [aa.Assigned To.ID]`}
                </CodeBlock>
              </div>

              <p className="mt-4 leading-7">
                We mixed a human-readable field label and a reference style from
                a different context, then placed that text into a control that
                did not interpret it as the runtime expression we intended.
              </p>

              <p className="mt-3 leading-7">
                Quickbase therefore preserved the text literally.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                What Worked in Jinja
              </p>

              <div className="mt-4">
                <CodeBlock>
                  {`{{aa.task_name}}
{{aa.status}}
{{aa.assigned_to.id}}`}
                </CodeBlock>
              </div>

              <p className="mt-4 leading-7">
                In the Jinja context we were using, these expressions referenced
                runtime information from step <strong>aa</strong> and resolved
                to concrete values during the run.
              </p>
            </div>
          </div>

          {/* ======================================================
      BREAK DOWN ONE REFERENCE
  ====================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Read the Reference from the Inside Out
            </p>

            <div className="mt-5 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-6 text-center">
              <code className="text-xl font-bold text-[#205c38]">
                {"{{aa.assigned_to.id}}"}
              </code>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ConceptCard title="aa" icon={<LuWorkflow />}>
                <p>
                  The <strong>Ref ID</strong> of the earlier Pipeline step.
                </p>
              </ConceptCard>

              <ConceptCard title="assigned_to" icon={<LuUser />}>
                <p>The runtime reference name for the Assigned To value.</p>
              </ConceptCard>

              <ConceptCard title="id" icon={<LuDatabase />}>
                <p>A nested property inside that structured User value.</p>
              </ConceptCard>
            </div>
          </div>

          {/* ======================================================
      THE NAMING TRAP
  ====================================================== */}

          <div className="mt-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <LuTriangleAlert
                aria-hidden="true"
                className="mt-1 shrink-0 text-2xl text-[#7a5200]"
              />

              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  The Naming Trap
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Task Name, task_name, and a wrapped reference can all point
                  toward the same underlying business value.
                </h3>

                <p className="mt-4 leading-8">
                  The visible Quickbase field is named{" "}
                  <strong>Task Name</strong>. A Pipeline runtime/reference
                  representation may use a normalized name such as{" "}
                  <code>task_name</code>. Then the control or language adds its
                  own reference syntax around that name.
                </p>

                <p className="mt-3 leading-8">
                  That means a builder can understand exactly which field is
                  intended and still type the wrong reference because the{" "}
                  <strong>
                    name and the syntax belong to different layers
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          <Remember title="Use the picker when it is available">
            <p>
              The visual reference picker reduces the amount of syntax we have
              to remember manually. The code/Jinja view is valuable because it
              shows how Quickbase represents the selected reference, but
              manually typing from memory creates another opportunity to mix
              field labels, reference names, and syntax from different contexts.
            </p>
          </Remember>

          <div className="mt-6 flex flex-wrap gap-3">
            <EvidenceBadge type="OBSERVED" />
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 10"
            title="First Full Runtime Data-Flow Experiment"
            icon={<LuZap />}
          >
            <p>
              Record #18 gave us a clean specimen containing populated values
              for Task Name, Status, Due Date, and Assigned To.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Baseline" icon={<LuDatabase />}>
              <p>
                Record #18 contained populated values for all four business
                fields.
              </p>
            </ConceptCard>
            <ConceptCard title="One Variable" icon={<LuGitBranch />}>
              <p>Change only Status.</p>
            </ConceptCard>
            <ConceptCard title="Observed Transition" icon={<LuRefreshCw />}>
              <p>
                Previous: <strong>On Hold</strong>
                <br />
                Runtime/current: <strong>Open</strong>
              </p>
            </ConceptCard>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <CodeBlock title="aa → Output">{`task_name: Review Applications - Changed 7
due_date: 2026-11-02T00:00:00+00:00
status: Open

assigned_to:
  id: 61267378.b6qh
  first_name: Dariansweb G
  last_name: Gmail
  email: dariansweb@gmail.com
  screen_name: fizzix`}</CodeBlock>

            <CodeBlock title="ab → Input">{`task_name: Review Applications - Changed 7
due_date: 2026-11-02T00:00:00+00:00
status: Open
assigned_to: 61267378.b6qh`}</CodeBlock>
          </div>

          <div className="mt-6">
            <EvidenceBadge type="OBSERVED" />
          </div>

          <div className="mt-7 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 text-center sm:p-8">
            <p className="text-2xl font-extrabold leading-9 text-[#205c38]">
              The Pipeline definition stores references to earlier-step
              information. During a particular run, those references resolve to
              concrete runtime values that become inputs to the later step.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 11"
            title="Definition-Time Reference vs Runtime Value"
            icon={<LuBraces />}
          >
            <p>
              This distinction will matter again when we reach conditions,
              searches, loops, and deeper Jinja work.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Pipeline Definition
              </p>
              <p className="mt-4 text-xl font-bold text-[#205c38]">
                Stored expression
              </p>
              <div className="mt-4">
                <CodeBlock>{`{{aa.status}}`}</CodeBlock>
              </div>
              <p className="mt-4 leading-7">
                This is a reference. It is not permanently equal to Open.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Pipeline Runtime
              </p>
              <p className="mt-4 text-xl font-bold text-[#205c38]">
                Concrete value for this run
              </p>
              <div className="mt-4">
                <CodeBlock>{`Open`}</CodeBlock>
              </div>
              <p className="mt-4 leading-7">
                Another run could resolve the same definition to On Hold or
                another legitimate Status value.
              </p>
            </div>
          </div>

          <Remember title="The reference is stable in the definition. The value belongs to the execution.">
            <p>
              Never confuse a stored expression with the particular value it
              happened to resolve to during one run.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 12"
            title="Structured Values: Assigned To Carries More Than One Property"
            icon={<LuUser />}
          >
            <p>
              Not every Quickbase field behaves like a single plain value. Some
              field types expose a richer structure containing several related
              properties.
            </p>

            <p className="mt-4">
              Our <strong>Assigned To</strong> field is a Quickbase{" "}
              <strong>User</strong> field, so the Pipeline did not expose only
              the text that happened to appear in the table. It exposed
              information describing the user itself.
            </p>
          </SectionHeading>

          {/* ======================================================
      SIMPLE VALUE VS STRUCTURED VALUE
  ====================================================== */}

          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Simple Value" icon={<LuDatabase />}>
              <p className="font-bold text-[#205c38]">
                One field → one primary runtime value
              </p>

              <p className="mt-3">
                A field such as Status may behave conceptually like a simple
                value:
              </p>

              <div className="mt-4">
                <CodeBlock>{`status: Open`}</CodeBlock>
              </div>

              <p className="mt-4 leading-7">
                The later step usually needs the value itself.
              </p>
            </ConceptCard>

            <ConceptCard title="Structured Value" icon={<LuUser />}>
              <p className="font-bold text-[#205c38]">
                One field → several related runtime properties
              </p>

              <p className="mt-3">
                A User field can expose multiple pieces of information
                describing the same Quickbase user.
              </p>

              <div className="mt-4">
                <CodeBlock>
                  {`assigned_to:
  id
  first_name
  last_name
  email
  screen_name`}
                </CodeBlock>
              </div>
            </ConceptCard>
          </div>

          {/* ======================================================
      CONTACT CARD MODEL
  ====================================================== */}

          <div className="mt-8 rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Contact Card Mental Model
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Assigned To is the card. The properties are pieces of information
              on the card.
            </h3>

            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-[#9fc9ad] bg-white p-6 shadow-sm">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Assigned To
              </p>

              <dl className="mt-5 divide-y divide-gray-200">
                {[
                  ["ID", "61267378.b6qh", "Quickbase identity for this user."],
                  [
                    "First Name",
                    "Dariansweb G",
                    "A descriptive property of the user.",
                  ],
                  ["Last Name", "Gmail", "A descriptive property of the user."],
                  [
                    "Email",
                    "dariansweb@gmail.com",
                    "Another property that may also identify the user in controls that accept email.",
                  ],
                  [
                    "Screen Name",
                    "fizzix",
                    "Another user property exposed by the structured value.",
                  ],
                ].map(([term, value, description]) => (
                  <div
                    key={term}
                    className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]"
                  >
                    <dt className="font-bold text-[#205c38]">{term}</dt>

                    <dd>
                      <p className="break-all font-mono text-sm font-bold text-gray-800">
                        {value}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {description}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ======================================================
      WHY WE CHOSE ID
  ====================================================== */}

          <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-white p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Choosing the Property for the Downstream Job
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              We selected the User ID because the next step needed user
              identity.
            </h3>

            <div className="mx-auto mt-6 max-w-xl">
              <CodeBlock>{`{{aa.assigned_to.id}}`}</CodeBlock>
            </div>

            <p className="mx-auto mt-5 max-w-4xl text-lg leading-8">
              In our experiment, the downstream Quickbase User control accepted
              a <strong>User ID or User Email</strong>. We chose the ID:
            </p>

            <div className="mx-auto mt-5 max-w-xl rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 text-center">
              <p className="font-mono text-lg font-bold text-[#205c38]">
                61267378.b6qh
              </p>
            </div>

            <p className="mx-auto mt-5 max-w-4xl leading-8">
              That lets the downstream Quickbase field identify the same user
              without depending on how that user happens to be displayed.
            </p>
          </div>

          {/* ======================================================
      IDENTITY VS DISPLAY
  ====================================================== */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Pipeline Responsibility
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                Carry the identity or property needed by the next operation.
              </h3>

              <p className="mt-4 leading-8">
                If the next Quickbase action needs to identify the Assigned To
                user, a value such as the User ID is appropriate.
              </p>

              <div className="mt-5">
                <CodeBlock>{`assigned_to: 61267378.b6qh`}</CodeBlock>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Table / Field Responsibility
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                Decide how that user should be displayed.
              </h3>

              <p className="mt-4 leading-8">
                The Quickbase table may display the User field as something
                like:
              </p>

              <div className="mt-5 rounded-xl border border-[#9fc9ad] bg-white p-5 text-center">
                <p className="text-lg font-bold text-[#205c38]">
                  Gmail, Dariansweb G
                </p>
              </div>

              <p className="mt-5 leading-8">
                That presentation belongs to the Quickbase field&apos;s display
                configuration. The Pipeline does not need to recreate that
                formatting simply to identify the user.
              </p>
            </div>
          </div>

          <Remember title="Identity and display are different responsibilities">
            <p>
              The Pipeline may pass a User ID while the table later displays{" "}
              <strong>Last Name, First Name</strong>.
            </p>

            <p className="mt-3">
              That does not mean the Pipeline passed the wrong value. The
              Pipeline supplied identity. Quickbase used that identity to
              resolve the User field and then displayed the user according to
              the table&apos;s own field settings.
            </p>
          </Remember>

          {/* ======================================================
      PROPERTY CHOICE
  ====================================================== */}

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="bg-[#205c38] p-5 text-white">
              <p className="font-bold uppercase tracking-[0.12em] text-white/75">
                Choosing Among User Properties
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                The right property depends on what the next step needs.
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead className="bg-[#f0fff4] text-[#205c38]">
                  <tr>
                    <th className="p-4 text-left">Property</th>
                    <th className="p-4 text-left">What It Represents</th>
                    <th className="p-4 text-left">Possible Downstream Use</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    [
                      "ID",
                      "Quickbase identity for the user",
                      "Strong choice when another Quickbase User field or control needs to identify that user.",
                    ],
                    [
                      "Email",
                      "User's email address",
                      "Useful when a control explicitly accepts email or when the workflow needs an email address.",
                    ],
                    [
                      "First Name",
                      "Descriptive user information",
                      "Useful for composing human-readable text.",
                    ],
                    [
                      "Last Name",
                      "Descriptive user information",
                      "Useful for composing human-readable text.",
                    ],
                    [
                      "Screen Name",
                      "Another user property",
                      "Use only when a downstream requirement specifically needs it.",
                    ],
                  ].map(([property, meaning, use], index) => (
                    <tr
                      key={property}
                      className={`border-t border-gray-200 ${
                        index % 2 ? "bg-[#fbfcfb]" : ""
                      }`}
                    >
                      <td className="p-4 font-mono font-bold">{property}</td>
                      <td className="p-4 leading-7">{meaning}</td>
                      <td className="p-4 leading-7">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <LuLightbulb
                aria-hidden="true"
                className="mt-1 shrink-0 text-2xl text-[#7a5200]"
              />

              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  Builder Habit
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  When a field exposes several properties, choose the property
                  that matches the next operation&apos;s need.
                </h3>

                <p className="mt-4 leading-8">
                  Do not automatically choose the property that looks nicest to
                  a person. Ask what the next step actually requires:
                </p>

                <p className="mt-3 font-bold leading-8">
                  Identity? Email address? Display text? Another property?
                </p>
              </div>
            </div>
          </div>

          <Remember title="For Quickbase User-to-User data flow, ID is often the safest first choice">
            <p>
              In the Quickbase → Quickbase experiment we performed, the User ID
              gave the downstream field the identity it needed, and Quickbase
              handled the field&apos;s display presentation afterward.
            </p>

            <p className="mt-3">
              Keep that statement bounded to controls that accept User ID. Other
              channels or actions may ask for a different property.
            </p>
          </Remember>

          <div className="mt-6">
            <EvidenceBadge type="OBSERVED" />
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 13"
            title="Field Properties Are Not Pipeline Metadata"
            icon={<LuTriangleAlert />}
          >
            <p>
              This distinction is easy to blur because both appear as nested
              runtime structures.
            </p>
          </SectionHeading>

          <Remember title="Field properties describe the value being carried. Metadata describes context surrounding the step, execution, or event.">
            <p>
              Assigned To → Email is a field property. It is not Pipeline
              Metadata.
            </p>
            <strong>Explained in Part 14 below</strong>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 14"
            title="Data, Field Properties, Metadata, References, and Mapping"
            icon={<LuNetwork />}
          >
            <p>
              Lesson 12 introduces several closely related ideas. Keeping them
              separate prevents a large amount of future confusion.
            </p>

            <p className="mt-4">
              Of these terms, <strong>metadata</strong> may sound the most
              technical. Fortunately, the idea is much simpler than the word
              makes it sound.
            </p>
          </SectionHeading>

          {/* ======================================================
      PLAIN-LANGUAGE METADATA ANALOGY
  ====================================================== */}

          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              A Plain-Language Model
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Think About a Package Moving Through a Shipping System
            </h3>

            <p className="mt-4 max-w-4xl text-lg leading-8">
              The contents of the package are important, but the shipping system
              also needs information <strong>about</strong> the package and its
              journey. That surrounding information is a useful way to think
              about metadata.
            </p>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              <ConceptCard title="The Contents" icon={<LuDatabase />}>
                <p className="font-bold text-[#205c38]">Data</p>

                <p className="mt-3">The actual information being carried.</p>

                <p className="mt-3">In our Pipeline, that could be:</p>

                <ul className="mt-3 space-y-2">
                  <li>Task Name</li>
                  <li>Status</li>
                  <li>Due Date</li>
                  <li>Assigned To</li>
                </ul>
              </ConceptCard>

              <ConceptCard title="Details About One Item" icon={<LuUser />}>
                <p className="font-bold text-[#205c38]">Field Properties</p>

                <p className="mt-3">
                  One item inside the package may have several details of its
                  own.
                </p>

                <p className="mt-3">Assigned To, for example, can expose:</p>

                <ul className="mt-3 space-y-2">
                  <li>ID</li>
                  <li>Email</li>
                  <li>First Name</li>
                  <li>Last Name</li>
                  <li>Screen Name</li>
                </ul>
              </ConceptCard>

              <ConceptCard title="The Shipping Label" icon={<LuRoute />}>
                <p className="font-bold text-[#205c38]">Metadata</p>

                <p className="mt-3">
                  Information describing the surrounding context rather than the
                  business value itself.
                </p>

                <p className="mt-3">
                  It can help describe things such as where information came
                  from, what happened, who was involved, or where an item sits
                  inside a larger batch.
                </p>
              </ConceptCard>
            </div>
          </div>

          <Remember title="Metadata is data about the data or its journey">
            <p>
              If <strong>Status = Open</strong> is the business value, metadata
              is not another Status.
            </p>

            <p className="mt-3">
              Metadata helps describe the surrounding event, execution, source,
              record, user, position, or processing context.
            </p>
          </Remember>

          {/* ======================================================
      DEFINITIONS
  ====================================================== */}

          <DefinitionGrid
            items={[
              {
                term: "Data",
                description:
                  "Actual runtime values exposed by a step, such as Task Name, Status, Due Date, and Assigned To.",
              },
              {
                term: "Field Properties",
                description:
                  "Parts of a structured value, such as Assigned To → ID or Assigned To → Email.",
              },
              {
                term: "Metadata",
                description:
                  "Additional information describing the runtime context, event, record, source, user, batch, or processing state surrounding the data.",
              },
              {
                term: "Reference",
                value: "{{aa.status}}",
                description:
                  "An expression pointing to earlier-step runtime information.",
              },
              {
                term: "Mapping",
                description:
                  "The configuration that decides where the resolved value is used.",
              },
              {
                term: "Destination",
                description:
                  "The field or control in the later step that receives the resolved value.",
              },
            ]}
          />

          {/* ======================================================
      QUICKBASE DOCUMENTATION CONNECTION
  ====================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              How Quickbase Uses the Idea
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              A Step Can Return More Than Just the Business Values We Selected
            </h3>

            <p className="mt-4 max-w-5xl leading-8">
              Quickbase documentation explains that later Pipeline steps can use
              information from earlier steps, including metadata. That
              information can be selected through reference controls or accessed
              through Jinja.
            </p>

            <p className="mt-4 max-w-5xl leading-8">
              Connected systems can also return additional information alongside
              their primary data. In other words, the result of a step may
              contain both <strong>the thing we wanted</strong> and{" "}
              <strong>
                information describing that thing or how it was produced
              </strong>
              .
            </p>
          </div>

          {/* ======================================================
      OUR ACTIVITY EXAMPLE
  ====================================================== */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Business Data
              </p>

              <CodeBlock>
                {`task_name: Review Applications - Changed 7
status: Open
due_date: 2026-11-02
assigned_to:
  id: 61267378.b6qh`}
              </CodeBlock>

              <p className="mt-4 leading-7">
                These values describe the Task and the User associated with the
                Task.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Metadata / Runtime Context
              </p>

              <CodeBlock>
                {`Metadata
  context
    app_name
    app_id
    table_name
    table_id
    realm_host
    realm_id
    occurred_at
    user

  record
    action

  previous
    ...`}
              </CodeBlock>

              <p className="mt-4 leading-7">
                This information helps describe the execution and event
                surrounding the record data.
              </p>
            </div>
          </div>

          <Remember title="The value and the context are both useful, but they answer different questions">
            <p>
              <strong>Data asks:</strong> What value are we working with?
            </p>

            <p className="mt-3">
              <strong>Metadata asks:</strong> What do we know about where this
              came from, what happened around it, or how it is being processed?
            </p>
          </Remember>

          {/* ======================================================
      BATCH METADATA PREVIEW
  ====================================================== */}

          <div className="mt-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <LuLightbulb
                aria-hidden="true"
                className="mt-1 shrink-0 text-2xl text-[#7a5200]"
              />

              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                  Metadata Becomes Even More Useful with Multiple Records
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Sometimes metadata describes where one item sits inside a
                  larger group.
                </h3>

                <p className="mt-4 leading-8">
                  Quickbase documentation describes steps that can return arrays
                  or batches of information. When a Pipeline later processes
                  those items, metadata can help identify information such as
                  the current item&apos;s position and the size of the
                  collection.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#e5c56c] bg-white p-4 text-center">
                    <p className="font-bold text-[#7a5200]">Current Item</p>
                    <p className="mt-2 text-lg font-extrabold">3</p>
                  </div>

                  <div className="rounded-xl border border-[#e5c56c] bg-white p-4 text-center">
                    <p className="font-bold text-[#7a5200]">Total Items</p>
                    <p className="mt-2 text-lg font-extrabold">10</p>
                  </div>

                  <div className="rounded-xl border border-[#e5c56c] bg-white p-4 text-center">
                    <p className="font-bold text-[#7a5200]">Meaning</p>
                    <p className="mt-2 font-extrabold">Item 3 of 10</p>
                  </div>
                </div>

                <p className="mt-5 leading-8">
                  We are{" "}
                  <strong>not learning loops or batch processing here</strong>.
                  The important idea for Lesson 12 is simply that metadata can
                  describe the processing context around a value, not merely the
                  value itself.
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================
      REFERENCE AND MAPPING
  ====================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#fbfcfb] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Then the Reference Tells the Next Step What to Use
            </p>

            <div className="mx-auto mt-6 max-w-xl">
              <FlowStep
                icon={<LuDatabase />}
                title="aa.status"
                text="Source reference"
              />

              <FlowArrow />

              <FlowStep
                icon={<LuSettings2 />}
                title="ab → Pipeline Results"
                text="Destination"
                final
              />
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center leading-8">
              The <strong>reference</strong> identifies the earlier information
              we want. The <strong>mapping</strong> determines where the
              resolved value will be used.
            </p>
          </div>

          {/* ======================================================
      FINAL MENTAL MODEL
  ====================================================== */}

          <div className="mt-8 overflow-hidden rounded-3xl border-2 border-[#276749]">
            <div className="bg-[#205c38] p-6 text-white">
              <p className="font-bold uppercase tracking-[0.12em] text-white/75">
                The Lesson 12 Dictionary
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                Six Ideas — Six Different Jobs
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {[
                ["DATA", "What is the actual value?"],
                [
                  "FIELD PROPERTY",
                  "Which part of a structured value do I need?",
                ],
                ["METADATA", "What describes the surrounding context?"],
                ["REFERENCE", "Which earlier information am I pointing to?"],
                [
                  "MAPPING",
                  "How am I connecting that information to the next step?",
                ],
                ["DESTINATION", "Where should the resolved value go?"],
              ].map(([term, question], index) => (
                <div
                  key={term}
                  className={`p-6 ${
                    index % 2 === 0 ? "bg-[#f0fff4]" : "bg-white"
                  }`}
                >
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    {term}
                  </p>

                  <p className="mt-3 text-lg font-bold leading-7 text-[#205c38]">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Remember title="Metadata is supporting information, not mysterious Pipeline magic">
            <p>
              The word sounds technical, but the idea is ordinary: when
              Quickbase moves information through a workflow, it may also carry
              useful information{" "}
              <strong>
                about the record, event, source, user, execution, or collection
              </strong>
              .
            </p>

            <p className="mt-3">
              Just like a shipping label helps us understand a package&apos;s
              journey, metadata helps us understand and sometimes control what
              is happening around our Pipeline data.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 15"
            title="System-Generated and Automatically Available Information"
            icon={<LuTable2 />}
          >
            <p>This is a quick-reference index, not a separate experiment.</p>
          </SectionHeading>

          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[840px] border-collapse">
                <thead className="bg-[#205c38] text-white">
                  <tr>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Explicit business fields",
                      "Task Name, Status, Due Date, Assigned To, Pipeline Results",
                    ],
                    [
                      "Built-in/system record information",
                      "Record ID, Date Created, Date Modified",
                    ],
                    [
                      "User-valued system fields",
                      "Record Owner, Last Modified By",
                    ],
                    [
                      "Structured User properties",
                      "ID, First Name, Last Name, Email, Screen Name",
                    ],
                    [
                      "Separate Pipeline Metadata",
                      "Context, Record action, Previous record",
                    ],
                  ].map(([type, examples], index) => (
                    <tr
                      key={type}
                      className={`border-b border-gray-200 last:border-b-0 ${index % 2 ? "bg-[#fbfcfb]" : ""}`}
                    >
                      <td className="p-4 font-bold text-[#205c38]">{type}</td>
                      <td className="p-4 leading-7">{examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Remember title="Explicitly selected business fields are not the entire runtime picture">
            <p>
              Activity also exposed values such as{" "}
              <strong>
                id, created_at, updated_at, record_owner, and last_modified_by
              </strong>
              . Structured User values can then expose their own properties.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 16"
            title="Build a New Value from Several Earlier-Step Values"
            icon={<LuBraces />}
          >
            <p>
              Data passing becomes much more interesting once we stop doing
              one-to-one copying.
            </p>
          </SectionHeading>

          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <ConceptCard title="Task Name" icon={<LuDatabase />}>
                <p>
                  <code>{"{{aa.task_name}}"}</code>
                </p>
              </ConceptCard>
              <ConceptCard title="Status" icon={<LuDatabase />}>
                <p>
                  <code>{"{{aa.status}}"}</code>
                </p>
              </ConceptCard>
              <ConceptCard title="Assigned To.ID" icon={<LuUser />}>
                <p>
                  <code>{"{{aa.assigned_to.id}}"}</code>
                </p>
              </ConceptCard>
            </div>

            <div className="mt-7">
              <CodeBlock title="Pipeline Results configuration">{`Task: {{aa.task_name}} | Status: {{aa.status}} | Assigned To: {{aa.assigned_to.id}}`}</CodeBlock>
            </div>

            <FlowArrow />

            <div className="rounded-xl border-2 border-[#276749] bg-white p-6 text-center">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Observed Quickbase Result
              </p>
              <p className="mt-3 text-lg font-bold leading-8 text-[#205c38]">
                Task: Prepare November Reports - Changed 7 | Status: On Hold |
                Assigned To: 61267378.b6qh
              </p>
            </div>
          </div>

          <div className="mt-6">
            <EvidenceBadge type="OBSERVED" />
          </div>

          <Remember title="A later step does not have to put an earlier value back into a field with the same name">
            <p>
              Several earlier-step values can be combined with literal text and
              used for an entirely different downstream purpose.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 17"
            title="What Actually “Passes” Between Steps?"
            icon={<LuNetwork />}
          >
            <p>
              This is where precise language matters because casual wording can
              imply an undocumented internal transport model.
            </p>
          </SectionHeading>

          <div className="space-y-4">
            {[
              [
                "1",
                "aa exposes runtime information that later steps can reference.",
              ],
              [
                "2",
                "ab contains references to selected earlier-step information.",
              ],
              ["3", "At runtime, those references resolve to concrete values."],
              ["4", "Activity shows those concrete values inside ab → Input."],
            ].map(([number, text]) => (
              <div
                key={number}
                className="flex items-start gap-4 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  {number}
                </span>
                <p className="pt-1 text-lg font-semibold leading-8">{text}</p>
              </div>
            ))}
          </div>

          <Remember title="Avoid saying “aa sends four fields to ab.”">
            <p>
              Our evidence supports a safer model: earlier-step runtime
              information is exposed, later steps reference selected values, and
              those references resolve during execution.
            </p>
          </Remember>

          <div className="mt-5">
            <EvidenceBadge type="INFERRED" />
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 18"
            title="Target Step vs Input vs Output — Revisited"
            icon={<LuRoute />}
          >
            <p>
              As we learned in Lesson 11, these are activity-specific areas.
              Lesson 12 uses them to prove the data-flow chain.
            </p>
          </SectionHeading>

          <DefinitionGrid
            items={[
              {
                term: "Target step",
                description:
                  "Shows the record/resource the action is acting upon and the visible target state exposed in that runtime evidence.",
              },
              {
                term: "Input",
                description:
                  "Shows the concrete values supplied to the Update Record action after references resolve.",
              },
              {
                term: "Output",
                description:
                  "Shows what the action returned after it executed.",
              },
              {
                term: "Best comparison",
                value: "aa → Output  ↔  ab → Input",
                description:
                  "One of the strongest ways to verify that expected runtime information from the earlier step became concrete input to the later step.",
              },
            ]}
          />
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 19"
            title="A Controlled Failure Is Still Evidence"
            icon={<LuTriangleAlert />}
          >
            <p>
              The failed bracket-syntax experiment proved how literal text and
              runtime expressions differ.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Wrong" icon={<LuX />}>
              <CodeBlock>{`[aa.Task Name]`}</CodeBlock>
              <p className="mt-4">Quickbase stored the notation literally.</p>
            </ConceptCard>
            <ConceptCard title="Correct" icon={<LuCheck />}>
              <CodeBlock>{`{{aa.task_name}}`}</CodeBlock>
              <p className="mt-4">
                Quickbase resolved the reference to the actual runtime Task
                Name.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Runtime expressions are interpreted according to Pipeline syntax">
            <p>Ordinary text remains ordinary text.</p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 20"
            title="The Final Lesson 12 Runtime Model"
            icon={<LuWorkflow />}
          >
            <p>Pull the definition-time and runtime views together.</p>
          </SectionHeading>

          <div className="grid gap-7 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-300 bg-white p-6 sm:p-8">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Definition Time
              </p>
              <div className="mt-6">
                <FlowStep
                  icon={<LuZap />}
                  title="Step aa"
                  text="Watches Status, exposes selected business fields, and makes additional system/runtime information available."
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuSettings2 />}
                  title="Step ab"
                  text="Chooses destination fields and stores references to earlier-step information."
                  final
                />
              </div>
            </div>

            <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Runtime
              </p>
              <div className="mt-6">
                {[
                  ["Record update occurs", <LuDatabase key="1" />],
                  ["aa executes", <LuZap key="2" />],
                  ["Runtime values exist for this run", <LuDatabase key="3" />],
                  ["ab references are resolved", <LuGitBranch key="4" />],
                  ["Resolved values become ab Input", <LuRoute key="5" />],
                  ["ab performs the action", <LuSettings2 key="6" />],
                  ["Output records the result", <LuDatabase key="7" />],
                  [
                    "Quickbase reflects the resulting mutation",
                    <LuCheck key="8" />,
                  ],
                ].map(([title, icon], index, array) => (
                  <div key={String(title)}>
                    <FlowStep
                      icon={icon as ReactNode}
                      title={String(title)}
                      final={index === array.length - 1}
                    />
                    {index < array.length - 1 && <FlowArrow />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#276749] p-7 text-center text-white">
            <p className="text-3xl font-extrabold">
              Definition contains references. Runtime produces values.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 21"
            title="Evidence Boundary"
            icon={<LuBookOpen />}
          >
            <p>
              Separate what the UI/help tells us, what we directly observed, the
              teaching model we infer, and what we refuse to invent.
            </p>
          </SectionHeading>

          <div className="space-y-5">
            <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6">
              <EvidenceBadge type="DOCUMENTED" />
              <ul className="mt-4 space-y-3 leading-7">
                <li>
                  Fields can be selected specifically to trigger the step.
                </li>
                <li>Fields can be selected for subsequent steps.</li>
                <li>
                  Built-in fields such as Record ID and Date Created are
                  automatically included according to the UI/help encountered in
                  this lesson.
                </li>
                <li>
                  Reference mechanisms/Jinja can access runtime information.
                </li>
                <li>
                  User/action controls can require appropriate identity values
                  such as ID or email.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
              <EvidenceBadge type="OBSERVED" />
              <ul className="mt-4 space-y-3 leading-7">
                <li>
                  Status alone could be watched while several business fields
                  were available downstream.
                </li>
                <li>Activity exposed trigger_fields and export_fields.</li>
                <li>
                  Downstream Update Record field availability changed after we
                  changed Fields for subsequent steps.
                </li>
                <li>aa Output values became concrete ab Input values.</li>
                <li>
                  Assigned To was structured and exposed nested properties.
                </li>
                <li>aa.assigned_to.id resolved to a User ID.</li>
                <li>
                  Multiple earlier-step references could be combined into
                  Pipeline Results.
                </li>
                <li>
                  Bracket-style notation remained literal while correct runtime
                  references resolved.
                </li>
                <li>
                  The Pipeline was unexpectedly OFF during testing and had to be
                  turned ON.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
              <EvidenceBadge type="INFERRED" />
              <p className="mt-4 leading-8">
                Our teaching model is that a Pipeline definition stores
                references that are resolved against earlier-step runtime
                information during an execution.
              </p>
              <p className="mt-3 leading-8">
                That model does not claim undocumented internal transport or
                memory mechanics.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-300 bg-violet-50 p-6">
              <EvidenceBadge type="SPECULATIVE" />
              <p className="mt-4 leading-8">
                We do not speculate about how Quickbase physically stores step
                output, whether values are copied between internal services,
                internal memory structures, or why the Pipeline toggle became
                OFF.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 22"
            title="Bridge to Lesson 13 — Conditions"
            icon={<LuGitBranch />}
          >
            <p>
              Now that a later step can reach runtime information, the next
              question becomes unavoidable.
            </p>
          </SectionHeading>

          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-2xl font-extrabold leading-9 text-[#205c38]">
              What if we want the Pipeline to make a decision based on one of
              those runtime values?
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                "Is Status equal to Open?",
                "Does Assigned To have a value?",
                "Is a date before or after another date?",
                "Does a User value match a particular user?",
              ].map((question) => (
                <div
                  key={question}
                  className="flex items-start gap-3 rounded-xl border border-[#9fc9ad] bg-white p-5"
                >
                  <LuCircleHelp className="mt-1 shrink-0 text-xl text-[#276749]" />
                  <p className="font-bold leading-7 text-[#205c38]">
                    {question}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-7 leading-8">
              Different kinds of runtime values can expose different condition
              or filter choices. That belongs to the next lesson, not this one.
            </p>
          </div>

          <Remember title="Lesson 12 learned how to reach the data. Lesson 13 will learn how to test that data and decide what happens next.">
            <p>
              Conditions and filters now have a reason to exist in the
              curriculum.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 23"
            title="Key Takeaways"
            icon={<LuCheck />}
          >
            <p>Leave Lesson 12 with these distinctions firmly separated.</p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Earlier Pipeline steps can expose information for later steps.",
              "A trigger field and a field available for subsequent use are not necessarily the same concept.",
              "Later steps use references to earlier-step runtime information.",
              "The Pipeline definition stores the reference; the run supplies the concrete value.",
              "Structured values such as User fields can expose nested properties.",
              "Structured field properties are not Pipeline Metadata.",
              "Destination selection and source/reference selection are different decisions.",
              "Multiple references can be combined with literal text into a new downstream value.",
              "Activity can prove the chain by comparing earlier-step Output with later-step Input.",
              "Before testing, make sure the Pipeline is ON.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5"
              >
                <LuCheck className="mt-1 shrink-0 text-xl text-[#276749]" />
                <p className="font-semibold leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <LessonQuiz />

        <section className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-[#17452a] bg-[#205c38] text-white">
            <div className="p-8 text-center sm:p-12">
              <p className="font-bold uppercase tracking-[0.18em] text-white/70">
                Lesson 12 Complete
              </p>
              <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
                The Steps Are No Longer Isolated.
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-white/90">
                Earlier steps expose runtime information, later steps reference
                it, and the same Pipeline definition can resolve to different
                concrete values on every execution.
              </p>
              <div className="mx-auto mt-8 max-w-4xl border-t border-white/20 pt-8">
                <p className="text-xl font-bold leading-8">
                  Next: Lesson 13 — Conditions / Filters
                </p>
                <p className="mt-3 text-lg leading-8 text-white/90">
                  We now know how data becomes available downstream. Next we
                  learn how a Pipeline evaluates that data and decides whether
                  execution should continue down a particular path.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/lessons/13"
                  className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]"
                >
                  Continue to Lesson 13 →
                </Link>
                <Link
                  href="/lessons"
                  className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
                >
                  View All Lessons
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
