"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LuDatabase,
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuBadgeCheck,
  LuBrain,
  LuCircleHelp,
  LuEye,
  LuFlaskConical,
  LuGitBranch,
  LuLightbulb,
  LuLink2,
  LuMousePointerClick,
  LuPlay,
  LuPower,
  LuRefreshCw,
  LuRocket,
  LuSearch,
  LuSparkles,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

// const GREEN = "#276749";
// const DARK = "#205c38";

type EvidenceKind = "PREDICTED" | "OBSERVED" | "CONCLUSION" | "DEFERRED";

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl">
      <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold text-[#205c38] sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-lg leading-8 text-gray-700">{children}</div>
      ) : null}
    </div>
  );
}

function EvidenceCard({
  kind,
  title,
  children,
}: {
  kind: EvidenceKind;
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    PREDICTED: "border-[#d4a72c] bg-[#fffaf0] text-[#7a5200]",
    OBSERVED: "border-[#9fc9ad] bg-[#f0fff4] text-[#205c38]",
    CONCLUSION: "border-[#276749] bg-white text-[#205c38]",
    DEFERRED: "border-gray-300 bg-gray-50 text-gray-700",
  }[kind];

  return (
    <div className={`rounded-2xl border-2 p-6 ${styles}`}>
      <p className="text-xs font-extrabold uppercase tracking-[0.14em]">
        {kind}
      </p>
      <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
      <div className="mt-3 leading-7 text-gray-700">{children}</div>
    </div>
  );
}

function FlowNode({
  label,
  detail,
  strong = false,
}: {
  label: string;
  detail?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={
        strong
          ? "w-full rounded-2xl border-2 border-[#276749] bg-[#276749] p-5 text-center text-white shadow-lg"
          : "w-full rounded-2xl border border-[#b7d8c2] bg-white p-5 text-center shadow-sm"
      }
    >
      <p
        className={strong ? "font-extrabold" : "font-extrabold text-[#205c38]"}
      >
        {label}
      </p>
      {detail ? (
        <p
          className={
            strong ? "mt-1 text-sm text-white/80" : "mt-1 text-sm text-gray-600"
          }
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}

function DownArrow() {
  return (
    <div className="flex h-10 items-center justify-center">
      <LuArrowDown className="text-2xl text-[#276749]/60" aria-hidden="true" />
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
    <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#7a5200] shadow-sm">
          <LuLightbulb aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#7a5200]">
            Remember This
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-[#654700]">
            {title}
          </h3>
          <div className="mt-3 leading-7 text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Exercise({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-[#b7d8c2] bg-[#f0fff4] px-6 py-5 sm:px-7">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-xl text-white">
            {icon}
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Exercise {number}
            </p>
            <h3 className="mt-1 text-2xl font-extrabold text-[#205c38]">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </section>
  );
}

const quiz = [
  {
    q: "The Pipeline is completely configured, but its toggle says Off. Status changes. Should we expect it to respond?",
    options: ["Yes", "No"],
    answer: 1,
    why: "No. A definition can be complete while inactive. Configured does not mean active.",
  },
  {
    q: "The Pipeline is On, Status is watched, and Status changes. What should happen based on our experiment?",
    options: [
      "The Pipeline executes",
      "Nothing should happen",
      "Only the form refreshes",
    ],
    answer: 0,
    why: "That is our known-good initiating condition: an actual change to the watched Status field.",
  },
  {
    q: "Only Due Date changes. Status is the only watched field. What should happen?",
    options: [
      "The Pipeline executes",
      "No execution",
      "The Action runs without the Trigger",
    ],
    answer: 1,
    why: "Our negative control showed that changing a non-watched Task field did not initiate this Pipeline.",
  },
  {
    q: "Pipeline Results contains “Hello.” Update Record supplies “The pipeline has entered this line.” What happened in our Text-field experiment?",
    options: [
      "The values were appended",
      "Hello was preserved",
      "The existing value was replaced",
    ],
    answer: 2,
    why: "For this Text field and this Update Record configuration, the Action supplied a replacement value.",
  },
  {
    q: "Does adding Status under Fields for subsequent steps automatically tell Update Record to update Status?",
    options: ["Yes", "No"],
    answer: 1,
    why: "Availability is not an instruction. Downstream availability and Action target configuration are different jobs.",
  },
  {
    q: "Update Record could identify the triggering Task before every business field was exposed. What distinction does this demonstrate?",
    options: [
      "Record context vs. selected business-field availability",
      "Trigger vs. schedule",
      "Literal vs. Jinja",
    ],
    answer: 0,
    why: "The Action had record context even though selected business-field availability was still limited.",
  },
  {
    q: "Task.Related Project changes, and Related Project is watched. What happened in our experiment?",
    options: [
      "The Tasks Pipeline ran",
      "The Tasks Pipeline never runs for relationships",
      "Only the parent Pipeline ran",
    ],
    answer: 0,
    why: "Changing the child Task's own relationship reference was an actual Task mutation and initiated the watched Tasks Pipeline.",
  },
  {
    q: "The parent Project Status changes. The Task's Project Status lookup displays the new value. Did our Tasks Pipeline run?",
    options: ["Yes", "No"],
    answer: 1,
    why: "No. The parent changed, and the child lookup resolved differently, but we did not observe the child Tasks Record Updated event required by this Trigger.",
  },
  {
    q: "True or False: If a value displayed on a Task changes, the Task must have experienced a Record Updated event.",
    options: ["True", "False"],
    answer: 1,
    why: "False. A relationship-derived lookup can display a new value because its source record changed elsewhere.",
  },
  {
    q: "When Projects.Project Status was edited, which record actually mutated?",
    options: ["The Project", "Every related Task", "The Pipeline definition"],
    answer: 0,
    why: "The Project was the record directly edited. The Task lookup displayed a derived value from that parent.",
  },
  {
    q: "At this stage, what is our strongest first evidence that the Pipeline performed work?",
    options: [
      "The Pipeline Designer looked correct",
      "The controlled Task mutation occurred exactly as predicted",
      "We assume the Activity Log is green",
    ],
    answer: 1,
    why: "Lesson 10 deliberately begins with visible business-data evidence. Lesson 11 will inspect Activity Log evidence.",
  },
];

function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () =>
      quiz.reduce(
        (total, item, index) =>
          total + (answers[index] === item.answer ? 1 : 0),
        0,
      ),
    [answers],
  );

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="mt-8 space-y-5">
      {quiz.map((item, index) => {
        const selected = answers[index];
        const correct = selected === item.answer;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
          >
            <p className="font-extrabold text-[#205c38]">
              {index + 1}. {item.q}
            </p>
            <div className="mt-4 grid gap-3">
              {item.options.map((option, optionIndex) => {
                const chosen = selected === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (!submitted) {
                        setAnswers((current) => ({
                          ...current,
                          [index]: optionIndex,
                        }));
                      }
                    }}
                    className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${
                      chosen
                        ? "border-[#276749] bg-[#f0fff4] text-[#205c38]"
                        : "border-gray-300 bg-white hover:border-[#9fc9ad]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted ? (
              <div
                className={`mt-4 rounded-xl border p-4 ${
                  correct
                    ? "border-[#9fc9ad] bg-[#f0fff4]"
                    : "border-[#d4a72c] bg-[#fffaf0]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {correct ? (
                    <LuBadgeCheck className="mt-0.5 shrink-0 text-xl text-[#276749]" />
                  ) : (
                    <LuX className="mt-0.5 shrink-0 text-xl text-[#7a5200]" />
                  )}
                  <p className="leading-7 text-gray-700">{item.why}</p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
        {!submitted ? (
          <button
            type="button"
            disabled={Object.keys(answers).length !== quiz.length}
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-[#276749] px-5 py-3 font-extrabold text-white transition hover:bg-[#205c38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check My Model
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#276749]">
                Result
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#205c38]">
                {score} / {quiz.length}
              </p>
              <p className="mt-2 text-gray-700">
                The explanations matter more than the number. The goal is to
                trace the event path.
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border-2 border-[#276749] bg-white px-5 py-3 font-extrabold text-[#205c38] transition hover:bg-[#f0fff4]"
            >
              Retake
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Lesson10Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#9fc9ad]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">
              Lesson 10 · Understand the Machine
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Build and Execute Our First Pipeline
            </h1>
            <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
              We know what a Pipeline is. We know its working parts. Today we
              build one from a blank definition, turn it on, and make Quickbase
              do exactly what we predict.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Lesson 8", "What is this machine?"],
                ["Lesson 9", "What are its working parts?"],
                ["Lesson 10", "Can we make it do exactly what we predict?"],
              ].map(([label, text], index) => (
                <div
                  key={label}
                  className={`rounded-2xl border p-5 ${
                    index === 2
                      ? "border-white/50 bg-white text-[#205c38]"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <p
                    className={`text-xs font-extrabold uppercase tracking-[0.14em] ${index === 2 ? "text-[#276749]" : "text-white/65"}`}
                  >
                    {label}
                  </p>
                  <p className="mt-2 font-extrabold">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/25 bg-black/10 p-6">
              <div className="flex items-start gap-4">
                <LuSparkles
                  className="mt-1 shrink-0 text-2xl"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-extrabold">
                    This lesson begins with a completely blank Pipeline.
                  </p>
                  <p className="mt-2 leading-7 text-white/85">
                    Lesson 9 was our workbench. Lesson 10 is our first
                    deliberate build. The implementation is intentionally simple
                    because the cause-and-effect evidence matters more than
                    complexity.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/9"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-bold hover:bg-white/15"
              >
                <LuArrowLeft /> Lesson 9
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-[#205c38] hover:bg-[#f0fff4]"
              >
                Laboratory Setup <LuArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Research Method"
          title="We're Constructing a Causal Model"
        >
          <p>
            A green success indicator is not the goal. We want to know which
            mutation started the workflow, what information moved forward, which
            Action changed data, and what evidence supports each conclusion.
          </p>
        </SectionHeading>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <EvidenceCard kind="PREDICTED" title="What should happen?">
            State the expected event chain before touching the test record.
          </EvidenceCard>
          <EvidenceCard kind="OBSERVED" title="What actually happened?">
            Record the result without changing the story to match the
            prediction.
          </EvidenceCard>
          <EvidenceCard kind="CONCLUSION" title="What does it support?">
            Make the narrowest claim justified by the evidence.
          </EvidenceCard>
        </div>

        <div className="mt-6">
          <Remember title="Change one variable whenever practical.">
            If we change the Trigger, Action, record, relationship, and data at
            the same time, a successful result tells us very little about which
            change mattered.
          </Remember>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Build the Definition"
            title="Start Clean. Add Only What the Experiment Needs."
          >
            <p>
              Create a new Pipeline named{" "}
              <strong>Lesson 10 - First Execution</strong>. Do not reuse the
              exploratory Pipeline from Lesson 9.
            </p>
          </SectionHeading>

          <Exercise
            number="10.1"
            title="Build Step 1 From Scratch"
            icon={<LuZap />}
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-lg leading-8 text-gray-700">
                  Add <strong>Quickbase → Record Updated</strong>.
                </p>
                <div className="mt-5 overflow-hidden rounded-xl border border-gray-300">
                  {[
                    ["Step", "When Record Updated"],
                    ["Type", "Trigger — Webhook"],
                    ["Ref ID", "aa"],
                    ["App", "Automation"],
                    ["Table", "Tasks"],
                    ["Trigger on any field", "Off"],
                    ["Fields", "Status"],
                    ["Fields for subsequent steps", "Empty — initially"],
                    ["Filter", "None"],
                  ].map(([a, b]) => (
                    <div
                      key={a}
                      className="grid grid-cols-[0.9fr_1.2fr] border-b border-gray-200 last:border-b-0"
                    >
                      <div className="bg-gray-50 px-4 py-3 font-bold text-gray-700">
                        {a}
                      </div>
                      <div className="px-4 py-3">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
                <LuTarget className="text-3xl text-[#276749]" />
                <h4 className="mt-3 text-xl font-extrabold text-[#205c38]">
                  Why Status?
                </h4>
                <p className="mt-3 leading-7 text-gray-700">
                  We want an unmistakable initiating event:{" "}
                  <strong>a Task&apos;s Status actually changed.</strong>{" "}
                  Relationship complexity comes later, after we establish a
                  single-table baseline.
                </p>
              </div>
            </div>
          </Exercise>

          <div className="rounded-2xl border border-[#b7d8c2] bg-white p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              First Execution Model
            </p>
            <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center">
              <FlowNode label="Human / User" detail="changes Tasks.Status" />
              <DownArrow />
              <FlowNode label="Quickbase Task Mutation" />
              <DownArrow />
              <FlowNode
                label="aa — When Record Updated"
                detail="Status is watched"
                strong
              />
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center leading-7 text-gray-700">
              We have defined the doorway into the Pipeline. We have not yet
              told the workflow to do anything after it enters.
            </p>
          </div>

          <Exercise
            number="10.2"
            title="Add Update Record Before Passing Business Fields Downstream"
            icon={<LuMousePointerClick />}
          >
            <p className="leading-8 text-gray-700">
              Add <strong>Quickbase → Update Record</strong>. The new Action
              receives Ref ID <strong>ab</strong>. Inspect it before adding
              business fields under <em>Fields for subsequent steps</em> in{" "}
              <strong>aa</strong>.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                  Record Context
                </p>
                <h4 className="mt-2 text-xl font-extrabold text-[#205c38]">
                  Which record are we working with?
                </h4>
                <p className="mt-3 leading-7 text-gray-700">
                  Even without manually selected downstream business fields,
                  Update Record already understands{" "}
                  <strong>Record → Record Updated → Tasks</strong>.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-300 bg-white p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gray-500">
                  Business Field Availability
                </p>
                <h4 className="mt-2 text-xl font-extrabold text-gray-900">
                  Which selected values can later steps use?
                </h4>
                <p className="mt-3 leading-7 text-gray-700">
                  This is a separate question. Knowing the record context does
                  not mean every business field has been explicitly exposed
                  downstream.
                </p>
              </div>
            </div>
          </Exercise>

          <Exercise
            number="10.2A"
            title="Controlled Data Availability Experiment"
            icon={<LuSearch />}
          >
            <ol className="space-y-4 text-lg leading-8 text-gray-700">
              <li>
                <strong>1.</strong> Return to <strong>aa</strong>.
              </li>
              <li>
                <strong>2.</strong> Add <strong>Status</strong> under{" "}
                <strong>Fields for subsequent steps</strong>.
              </li>
              <li>
                <strong>3.</strong> Inspect <strong>ab</strong> again.
              </li>
            </ol>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <EvidenceCard
                kind="OBSERVED"
                title="Downstream configuration changed"
              >
                Quickbase performed its refresh/fetch behavior, and Status
                became available in the downstream Update Record configuration.
              </EvidenceCard>
              <EvidenceCard
                kind="CONCLUSION"
                title="Availability has consequences"
              >
                Upstream data availability affects downstream configuration
                possibilities.
              </EvidenceCard>
            </div>
          </Exercise>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "Trigger Fields",
                "What changes matter for triggering?",
                "Status",
              ],
              [
                "Fields for subsequent steps",
                "What business information should later steps be able to use?",
                "Status",
              ],
              [
                "Fields to update",
                "What does this Action intend to change?",
                "Pipeline Results",
              ],
            ].map(([title, question, example]) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                  {title}
                </p>
                <p className="mt-3 font-extrabold text-gray-900">{question}</p>
                <p className="mt-4 rounded-lg bg-[#f0fff4] px-3 py-2 font-bold text-[#205c38]">
                  Example: {example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Give the Action One Job"
          title="Make the Result Impossible to Misread"
        >
          <p>
            The Tasks table now contains a dedicated Text field named{" "}
            <strong>Pipeline Results</strong>. It begins blank so the Pipeline
            has a harmless place to leave visible evidence.
          </p>
        </SectionHeading>

        <Exercise
          number="10.3 Setup"
          title="Configure Our Real Output Field"
          icon={<LuPencilLineFallback />}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-extrabold text-[#205c38]">
                ab — Update Record
              </p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-bold text-gray-500">Record</dt>
                  <dd>Record Updated → Tasks</dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-500">Field to update</dt>
                  <dd>Pipeline Results</dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-500">Value</dt>
                  <dd className="mt-1 rounded-lg bg-gray-950 px-4 py-3 font-mono text-sm text-white">
                    The pipeline has entered this line.
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#7a5200]">
                Literal
              </p>
              <h4 className="mt-2 text-xl font-extrabold text-[#654700]">
                Use this exact configured value.
              </h4>
              <p className="mt-3 leading-7 text-gray-700">
                No Jinja. No formula. No timestamp. No relationship value. No
                dynamic transformation. If this exact sentence appears in the
                Task, we know precisely where it came from.
              </p>
            </div>
          </div>
        </Exercise>

        <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
            Completed Definition
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center">
            <FlowNode label="Task Status changes" />
            <DownArrow />
            <FlowNode
              label="aa — When Record Updated"
              detail="Tasks · Watch: Status"
            />
            <DownArrow />
            <FlowNode
              label="ab — Update Record"
              detail="Target: triggering Task · Field: Pipeline Results"
              strong
            />
            <div className="mt-4 rounded-xl border border-[#9fc9ad] bg-white px-5 py-4 text-center font-mono text-sm">
              The pipeline has entered this line.
            </div>
          </div>
        </div>

        <Remember title="Configured does not mean active.">
          <p>
            The Pipeline Designer has an <strong>Off / On</strong> toggle. A
            definition can be perfectly configured and still be unable to
            respond because it is <strong>Off</strong>.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-300 bg-white p-4">
              <div className="flex items-center gap-3">
                <LuPower className="text-xl text-gray-500" />
                <strong>OFF</strong>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                The definition exists, but it is not currently eligible to
                respond to its trigger.
              </p>
            </div>
            <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4">
              <div className="flex items-center gap-3">
                <LuPower className="text-xl text-[#276749]" />
                <strong className="text-[#205c38]">ON</strong>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                The Pipeline is active and eligible to respond when its
                triggering conditions occur.
              </p>
            </div>
          </div>
          <p className="mt-5 font-bold">
            Beginner troubleshooting check: before rebuilding anything, verify
            that the Pipeline is actually On.
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="First Execution"
            title="Predict It Before You Run It"
          >
            <p>
              Choose one known Task. Confirm that{" "}
              <strong>Pipeline Results is blank</strong> and record its current
              Status. Then stop editing the Pipeline and predict the complete
              causal chain.
            </p>
          </SectionHeading>

          <Exercise
            number="10.3"
            title="Predict the First Execution"
            icon={<LuBrain />}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <FlowNode label="User changes Status A → Status B" />
              <DownArrow />
              <FlowNode label="Task is actually modified" />
              <DownArrow />
              <FlowNode label="Status is a watched field" />
              <DownArrow />
              <FlowNode label="aa qualifies and execution begins" />
              <DownArrow />
              <FlowNode label="Runtime record context identifies this Task" />
              <DownArrow />
              <FlowNode label="ab targets that same Task" />
              <DownArrow />
              <FlowNode
                label="Pipeline Results receives the configured literal"
                strong
              />
            </div>
          </Exercise>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#d4a72c] bg-[#fffaf0] p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#7a5200]">
                Mutation #1
              </p>
              <h3 className="mt-2 text-xl font-extrabold">
                Human changes Status
              </h3>
              <p className="mt-3 leading-7 text-gray-700">
                This mutation initiates the Pipeline.
              </p>
            </div>
            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Mutation #2
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-[#205c38]">
                Pipeline changes Pipeline Results
              </h3>
              <p className="mt-3 leading-7 text-gray-700">
                Automation produces a new Quickbase state change of its own.
              </p>
            </div>
          </div>

          <p className="rounded-xl border border-gray-300 bg-white p-5 leading-7 text-gray-700">
            Our Trigger watches <strong>Status</strong>, while our Action
            changes <strong>Pipeline Results</strong>. Prediction: the
            Pipeline&apos;s own output mutation should not qualify this
            particular Status-change Trigger again.
          </p>

          <Exercise number="10.4" title="Execute!" icon={<LuPlay />}>
            <ol className="space-y-3 text-lg leading-8 text-gray-700">
              <li>
                <strong>1.</strong> Turn the Pipeline <strong>On</strong>.
              </li>
              <li>
                <strong>2.</strong> Open the selected Task.
              </li>
              <li>
                <strong>3.</strong> Change only <strong>Status</strong>.
              </li>
              <li>
                <strong>4.</strong> Save.
              </li>
              <li>
                <strong>5.</strong> Inspect the Task itself before opening the
                Activity Log.
              </li>
            </ol>

            <div className="mt-7 overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#276749] p-7 text-white shadow-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">
                  <LuRocket />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/70">
                    First Successful Execution
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold">
                    The machine just moved.
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/90">
                    We caused a Quickbase record mutation, which initiated a
                    Pipeline, which then performed a second Quickbase record
                    mutation against the triggering record.
                  </p>
                  <p className="mt-4 rounded-xl bg-white/10 px-4 py-3 font-mono text-sm">
                    Pipeline Results → The pipeline has entered this line.
                  </p>
                </div>
              </div>
            </div>
          </Exercise>

          <div className="rounded-2xl border border-[#b7d8c2] bg-white p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Actual Event Chain
            </p>
            <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center">
              <FlowNode label="User" detail="changes Status" />
              <DownArrow />
              <FlowNode label="Tasks record mutation" />
              <DownArrow />
              <FlowNode label="Record Updated event" />
              <DownArrow />
              <FlowNode label="aa — Trigger" />
              <DownArrow />
              <FlowNode label="Pipeline execution" />
              <DownArrow />
              <FlowNode label="Record context / data available" />
              <DownArrow />
              <FlowNode label="ab — Update Record" />
              <DownArrow />
              <FlowNode
                label="Tasks record mutation"
                detail="Pipeline Results changed"
                strong
              />
            </div>
          </div>

          <Exercise
            number="10.5"
            title="Does Update Mean Append or Replace?"
            icon={<LuRefreshCw />}
          >
            <p className="leading-8 text-gray-700">
              Manually place <strong>Text already exist here</strong> into
              Pipeline Results. Then cause another qualifying Status change.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "A. Append its text",
                "B. Preserve the existing text",
                "C. Replace the existing value",
              ].map((x) => (
                <div
                  key={x}
                  className="rounded-xl border border-gray-300 bg-white p-4 font-bold"
                >
                  {x}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <EvidenceCard
                kind="OBSERVED"
                title="The existing value was replaced"
              >
                Pipeline Results became{" "}
                <strong>The pipeline has entered this line.</strong>
              </EvidenceCard>
              <EvidenceCard kind="CONCLUSION" title="Narrow claim">
                For this Text field and Update Record configuration, the Action
                supplied a replacement field value. It did not append.
              </EvidenceCard>
            </div>
          </Exercise>

          <Exercise
            number="10.6"
            title="Run a Negative Control"
            icon={<LuFlaskConical />}
          >
            <p className="leading-8 text-gray-700">
              Change a Task field that is <strong>not</strong> being
              watched—such as Task Name or Due Date. Do not change Status.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <EvidenceCard kind="PREDICTED" title="No execution">
                The configured watched-field criterion should not qualify.
              </EvidenceCard>
              <EvidenceCard kind="OBSERVED" title="It did not run">
                A non-watched Task-field change did not initiate this Pipeline.
              </EvidenceCard>
            </div>
            <p className="mt-6 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 font-bold leading-7 text-[#205c38]">
              Status changed → execution. Non-watched Task field changed → no
              execution. The control gives us stronger causal evidence that the
              watched-field criterion mattered.
            </p>
          </Exercise>
        </div>
      </section>
      {/* ======================================================
          LABORATORY UPGRADE
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="overflow-hidden rounded-2xl border-2 border-[#276749] bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-2xl text-white">
                  <LuDatabase aria-hidden="true" />
                </span>

                <div className="flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                    Laboratory Upgrade
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-[#205c38] sm:text-4xl">
                    Before We Add Relationships
                  </h2>

                  <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
                    Our first Pipeline experiments deliberately stayed inside
                    the Tasks table. We now have a known-good single-table
                    baseline, so we are ready to introduce one new variable: a
                    relationship.
                  </p>

                  <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-700">
                    The <strong>Getting Started</strong> page now contains a
                    separate <strong>Getting Ready for Lesson 10</strong>{" "}
                    section with the instructions for creating the Projects
                    table, building the Projects → Tasks relationship, and
                    adding the additional laboratory records used in the next
                    experiments.
                  </p>

                  <div className="mt-6 rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-5">
                    <p className="font-extrabold text-[#654700]">
                      Complete that laboratory upgrade before continuing below.
                    </p>

                    <p className="mt-2 leading-7 text-gray-700">
                      We didn&apos;t build Projects earlier because we
                      didn&apos;t need Projects earlier. Lesson 10 has finally
                      given us a reason.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/get-started"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#276749] px-5 py-3 font-extrabold text-white transition hover:bg-[#205c38]"
                    >
                      Getting Ready for Lesson 10
                      <LuArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Known-Good Baseline"
          title="Stop Before Adding Relationships"
        >
          <p>
            We now have a simple Pipeline whose behavior we understand well
            enough to use as a baseline.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "A Pipeline definition can exist while Off.",
            "The Pipeline must be On to respond.",
            "Status is our watched Task field.",
            "A Status change initiated execution.",
            "A non-watched Task-field change did not.",
            "The Trigger carried enough record context for Update Record to target the same Task.",
            "Fields for subsequent steps changed downstream business-field availability.",
            "The Action wrote our configured literal.",
            "Existing Pipeline Results text was overwritten.",
            "The Pipeline Action created another Quickbase record mutation.",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-gray-300 bg-white p-4"
            >
              <LuBadgeCheck className="mt-1 shrink-0 text-xl text-[#276749]" />
              <p className="leading-7 text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Relationship Extension"
            title="Does Pipeline Know Relationships Exist?"
          >
            <p>
              Our Tasks no longer live alone. The laboratory now includes a{" "}
              <strong>Projects → Tasks</strong> one-to-many relationship. We
              will extend the known-good model without turning Lesson 10 into a
              full relationships course.
            </p>
          </SectionHeading>

          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-[#b7d8c2] bg-white p-7">
            <FlowNode label="Projects" detail="one parent" />
            <DownArrow />
            <div className="rounded-full bg-[#276749] px-4 py-2 font-extrabold text-white">
              1 → many
            </div>
            <DownArrow />
            <FlowNode
              label="Tasks"
              detail="Related Project · Project Name/Name2 · Project Status"
              strong
            />
          </div>

          <Exercise
            number="10.7"
            title="Inspect Relationship Fields in the Trigger"
            icon={<LuLink2 />}
          >
            <p className="leading-8 text-gray-700">
              Open the Tasks Record Updated Trigger and inspect both{" "}
              <strong>Fields</strong> and{" "}
              <strong>Fields for subsequent steps</strong>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Related Project",
                "Project Name",
                "Project Name2",
                "Project Status",
              ].map((field) => (
                <span
                  key={field}
                  className="rounded-full border border-[#9fc9ad] bg-white px-4 py-2 font-bold text-[#205c38]"
                >
                  {field}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <EvidenceCard
                kind="OBSERVED"
                title="Relationship-related fields are visible to Pipeline Designer"
              >
                Quickbase exposed relationship-related fields alongside ordinary
                Tasks fields for Trigger configuration and downstream
                availability. These included fields playing reference,
                reference-proxy, and lookup roles.
              </EvidenceCard>
            </div>
            <p className="mt-5 font-bold leading-7 text-[#654700]">
              Selectable as a watched field does not tell us what kinds of
              underlying changes Quickbase considers a Task Record Updated
              event.
            </p>
          </Exercise>

          <Exercise
            number="10.8"
            title="Change the Child's Relationship Reference"
            icon={<LuGitBranch />}
          >
            <p className="leading-8 text-gray-700">
              Use a Task already belonging to a Project. Change only{" "}
              <strong>Related Project</strong> from one valid existing Project
              to another. Our controlled test moved a Task from a Project with{" "}
              <strong>Project Status = Active</strong> to one with{" "}
              <strong>Project Status = On Hold</strong>.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <EvidenceCard kind="PREDICTED" title="Pipeline should execute">
                Related Project is an actual field on Tasks and is explicitly
                watched.
              </EvidenceCard>
              <EvidenceCard kind="OBSERVED" title="The Tasks Pipeline ran">
                Pipeline Results received our execution marker. Quickbase also
                resolved the new Project Name/Name2 and Project Status from the
                newly related parent.
              </EvidenceCard>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-300 bg-white p-6">
                <p className="font-extrabold text-[#205c38]">Event path</p>
                <p className="mt-3 leading-7 text-gray-700">
                  <strong>Task.Related Project actually changed</strong> → Task
                  Record Updated event → Pipeline executed.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-300 bg-white p-6">
                <p className="font-extrabold text-[#205c38]">
                  Relationship resolution
                </p>
                <p className="mt-3 leading-7 text-gray-700">
                  Quickbase then resolved the proxy/lookup values from the new
                  parent.
                </p>
              </div>
            </div>
          </Exercise>

          <Exercise
            number="10.9"
            title="Change the Parent, Not the Child"
            icon={<LuTable2 />}
          >
            <p className="leading-8 text-gray-700">
              Leave the Task untouched. Edit its parent{" "}
              <strong>Projects.Project Status</strong>, for example{" "}
              <strong>On Hold → Active</strong>. The child Task&apos;s Project
              Status lookup now displays Active.
            </p>

            <div className="mt-6">
              <EvidenceCard
                kind="PREDICTED"
                title="Probably no Tasks execution"
              >
                Our model predicts that the Project mutation is not the same
                thing as a Task mutation—but prediction is not evidence.
              </EvidenceCard>
            </div>

            <div className="mt-6 rounded-2xl border-2 border-[#276749] bg-white p-7">
              <div className="flex items-start gap-4">
                <LuEye className="mt-1 shrink-0 text-2xl text-[#276749]" />
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                    Observed
                  </p>
                  <h4 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                    The lookup changed. The Tasks Pipeline did not run.
                  </h4>
                  <p className="mt-4 leading-8 text-gray-700">
                    A parent-record change altered the value displayed through a
                    lookup on related child records without producing the child
                    Record Updated event required by this Pipeline Trigger.
                  </p>
                </div>
              </div>
            </div>
          </Exercise>

          <Remember title="Displayed value change ≠ record mutation.">
            <p>
              A value looking different on a record does not necessarily mean
              that record itself was updated.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 bg-white p-5">
                <p className="font-extrabold text-gray-900">Parent</p>
                <p className="mt-2 leading-7 text-gray-700">
                  Project Status was actually changed.
                </p>
              </div>
              <div className="rounded-xl border border-gray-300 bg-white p-5">
                <p className="font-extrabold text-gray-900">Child</p>
                <p className="mt-2 leading-7 text-gray-700">
                  Project Status lookup displayed a different value because it
                  derives from the parent.
                </p>
              </div>
            </div>
            <p className="mt-5 font-extrabold text-[#654700]">
              Follow the mutation—not merely what changed visually on the form.
            </p>
          </Remember>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#276749] bg-white p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Path A — Child Reference Changed
              </p>
              <div className="mt-5 space-y-3 text-center">
                <div className="rounded-xl bg-[#f0fff4] p-3 font-bold">
                  User changes Task.Related Project
                </div>
                <LuArrowDown className="mx-auto text-[#276749]" />
                <div className="rounded-xl bg-[#f0fff4] p-3 font-bold">
                  Task actually modified
                </div>
                <LuArrowDown className="mx-auto text-[#276749]" />
                <div className="rounded-xl bg-[#f0fff4] p-3 font-bold">
                  Relationship-derived values resolve differently
                </div>
                <LuArrowDown className="mx-auto text-[#276749]" />
                <div className="rounded-xl bg-[#276749] p-3 font-bold text-white">
                  Tasks Pipeline runs
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-gray-300 bg-white p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gray-500">
                Path B — Parent Value Changed
              </p>
              <div className="mt-5 space-y-3 text-center">
                <div className="rounded-xl bg-gray-100 p-3 font-bold">
                  User changes Project.Project Status
                </div>
                <LuArrowDown className="mx-auto text-gray-500" />
                <div className="rounded-xl bg-gray-100 p-3 font-bold">
                  Project actually modified
                </div>
                <LuArrowDown className="mx-auto text-gray-500" />
                <div className="rounded-xl bg-gray-100 p-3 font-bold">
                  Task lookup displays new value
                </div>
                <LuArrowDown className="mx-auto text-gray-500" />
                <div className="rounded-xl bg-gray-900 p-3 font-bold text-white">
                  Tasks Pipeline does not run
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-7 text-center">
            <p className="text-2xl font-extrabold text-[#654700]">
              Same visible child value change. Different event path.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Research Boundary"
          title="What We Deliberately Did Not Investigate"
        >
          <p>
            A good laboratory knows when to stop. These questions belong to
            later troubleshooting, error, permissions, or relationship-integrity
            studies.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Nonexistent parent references",
            "Deleting parents",
            "Broken relationship references",
            "Permission failures across related records",
            "Writing directly to lookup fields",
            "Relationship integrity errors",
            "Activity Log failure details",
            "Pipeline error handling",
            "Retries",
            "Troubleshooting",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-gray-300 bg-gray-50 p-4"
            >
              <LuTriangleAlert className="shrink-0 text-lg text-[#7a5200]" />
              <span className="font-semibold text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-7 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 font-bold leading-7 text-[#205c38]">
          We know enough for Lesson 10: Pipelines acknowledge relationship
          fields, but event behavior still depends on which underlying record
          actually changed.
        </p>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Definition vs. Runtime"
            title="Now the Distinction Has Real Evidence"
          >
            <p>
              Lessons 8 and 9 introduced definition and runtime conceptually.
              Our first execution gives us concrete examples.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gray-500">
                Definition
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-gray-900">
                Instructions we built
              </h3>
              <ul className="mt-5 space-y-3 leading-7 text-gray-700">
                <li>Pipeline name</li>
                <li>Ref IDs aa and ab</li>
                <li>Automation app and Tasks table</li>
                <li>Status watched</li>
                <li>Pipeline Results target</li>
                <li>Configured literal text</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Runtime
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                One actual occurrence
              </h3>
              <ul className="mt-5 space-y-3 leading-7 text-gray-700">
                <li>The specific Task record</li>
                <li>Old and new Status during that occurrence</li>
                <li>The specific execution</li>
                <li>Action operating against that Task</li>
                <li>The actual Pipeline Results mutation</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
            <p className="font-extrabold text-[#654700]">Brain-twister</p>
            <p className="mt-3 leading-8 text-gray-700">
              <strong>“The pipeline has entered this line.”</strong> as
              configured text belongs to the <strong>definition</strong>. The
              actual writing of that literal into Task #X belongs to a{" "}
              <strong>runtime execution</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Evidence Board"
          title="Preserve What the Laboratory Actually Established"
        >
          <p>
            This is the notebook view: observed evidence stays separate from
            deeper mechanics we have not yet proved.
          </p>
        </SectionHeading>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Observed
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "New Pipeline began as a clean definition.",
                "Record Updated Trigger received Ref ID aa.",
                "Update Record received Ref ID ab.",
                "Trigger watched Status.",
                "Action had triggering-record context before every business field was selected.",
                "Adding Status downstream changed downstream availability/configuration.",
                "Pipeline Results became our dedicated output field.",
                "Action accepted a literal value.",
                "Pipeline required activation through the On/Off toggle.",
                "Status change triggered execution.",
                "Pipeline Results was written.",
                "Existing Pipeline Results text was overwritten.",
                "Non-watched Task field did not trigger.",
                "Relationship-related fields appeared in Trigger selectors.",
                "Changing Task.Related Project triggered.",
                "Quickbase resolved new proxy/lookup values.",
                "Changing parent Project Status changed the child lookup display.",
                "Parent change did not trigger the Tasks Record Updated Pipeline.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-[#b7d8c2] bg-white p-4"
                >
                  <LuBadgeCheck className="mt-1 shrink-0 text-lg text-[#276749]" />
                  <span className="leading-6 text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-gray-50 p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gray-500">
              Inferred / Deferred
            </p>
            <ul className="mt-5 space-y-4 text-gray-700">
              {[
                "Deeper internal mechanics of lookup resolution",
                "Relationship-integrity enforcement",
                "Failure behavior",
                "Permissions interactions",
                "Retries and error handling",
                "Precise internal event subsystem implementation",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <LuCircleHelp className="mt-1 shrink-0 text-lg text-gray-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-gray-300 bg-white p-4 text-sm font-bold leading-6 text-gray-600">
              These stay outside the fact column until future evidence earns
              them a promotion.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Knowledge Check"
            title="Did the Pipeline Run?"
          >
            <p>
              These are event-path questions, not vocabulary trivia. Trace the
              mutation, the watched field, and the record that actually changed.
            </p>
          </SectionHeading>
          <KnowledgeCheck />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Final Mental Model"
          title="Follow the Mutation"
        >
          <p>
            Lesson 10 connects the definition we built to the runtime behavior
            we observed.
          </p>
        </SectionHeading>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center">
          <FlowNode label="Definition" detail="We build instructions." />
          <DownArrow />
          <FlowNode label="Activation" detail="Pipeline must be On." />
          <DownArrow />
          <FlowNode
            label="Initiating Mutation"
            detail="A watched field on the actual Tasks record changes."
          />
          <DownArrow />
          <FlowNode
            label="aa — Trigger"
            detail="Responds to the qualifying Task update."
          />
          <DownArrow />
          <FlowNode
            label="Runtime Context"
            detail="The specific Task becomes the record context."
          />
          <DownArrow />
          <FlowNode label="ab — Action" detail="Targets that Task." />
          <DownArrow />
          <FlowNode
            label="Secondary Mutation"
            detail="Pipeline Results changes."
          />
          <DownArrow />
          <FlowNode
            label="Observable Result"
            detail="Quickbase data contains evidence that automation performed work."
            strong
          />
        </div>

        <div className="mt-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-7">
          <p className="text-xl font-extrabold text-[#654700]">
            Relationships add another layer: a record may display
            relationship-derived data whose source mutation actually occurred
            somewhere else.
          </p>
          <p className="mt-4 text-2xl font-extrabold text-[#654700]">
            Follow the mutation—not merely what changed visually on the form.
          </p>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <SectionHeading
            eyebrow="Exit Challenge"
            title="Same Screen. Different Event Path."
          >
            <p>
              Use the experiment—not intuition—to answer these two scenarios.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gray-500">
                Scenario A
              </p>
              <p className="mt-3 text-lg leading-8 text-gray-700">
                A Task belongs to Project A. Its Project Status lookup displays{" "}
                <strong>Active</strong>. Someone changes Project A to{" "}
                <strong>On Hold</strong>. The Task now displays On Hold. A Tasks
                Record Updated Pipeline is watching Project Status.
              </p>
              <p className="mt-5 font-extrabold text-[#205c38]">
                Should you automatically conclude that the Tasks Pipeline ran?
                Why or why not?
              </p>
              <details className="mt-4 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4">
                <summary className="cursor-pointer font-bold text-[#205c38]">
                  Reveal reasoning
                </summary>
                <p className="mt-3 leading-7 text-gray-700">
                  No. Our experiment showed that a parent mutation can change a
                  child lookup&apos;s displayed value without producing the
                  child Record Updated event required by this Trigger.
                </p>
              </details>
            </div>

            <div className="rounded-2xl border-2 border-[#276749] bg-white p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Scenario B
              </p>
              <p className="mt-3 text-lg leading-8 text-gray-700">
                Instead, someone changes the Task&apos;s{" "}
                <strong>Related Project</strong> to Project B.
              </p>
              <p className="mt-5 font-extrabold text-[#205c38]">
                What&apos;s different?
              </p>
              <details className="mt-4 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4">
                <summary className="cursor-pointer font-bold text-[#205c38]">
                  Reveal reasoning
                </summary>
                <p className="mt-3 leading-7 text-gray-700">
                  The Task&apos;s own reference field was actually mutated. In
                  our experiment, that produced the Tasks Record Updated event
                  and Pipeline execution.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#205c38] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="max-w-5xl">
            <p className="font-bold uppercase tracking-[0.15em] text-white/65">
              Next: Lesson 11
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Reading the Activity Log
            </h2>
            <p className="mt-5 text-xl leading-9 text-white/90">
              Don&apos;t delete the Pipeline. Don&apos;t redesign it. Don&apos;t
              clear away its history. We now have successful executions waiting
              for investigation.
            </p>
            <div className="mt-7 rounded-2xl border border-white/20 bg-white/10 p-6">
              <p className="font-extrabold">
                We know the Pipeline worked because we watched the data change.
              </p>
              <p className="mt-3 leading-7 text-white/85">
                But what does Quickbase know about what happened inside the
                execution?
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-white/80">
                {[
                  "Execution / run",
                  "Steps",
                  "Inputs",
                  "Outputs",
                  "Errors / status",
                  "Runtime evidence",
                ].map((x, i) => (
                  <span key={x} className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-2">
                      {x}
                    </span>
                    {i < 5 ? <LuArrowRight /> : null}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-7 text-2xl font-extrabold">
              Lesson 10 turned the machine on. Lesson 11 opens the black box.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/9"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 font-bold hover:bg-white/10"
              >
                <LuArrowLeft /> Lesson 9
              </Link>
              <Link
                href="/lessons/11"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-[#205c38] hover:bg-[#f0fff4]"
              >
                Lesson 11 <LuArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/*
  Local icon alias:
  Keeping the exercise component readable without introducing an additional
  react-icons import that may vary across package versions.
*/
function LuPencilLineFallback() {
  return <LuWorkflow aria-hidden="true" />;
}
