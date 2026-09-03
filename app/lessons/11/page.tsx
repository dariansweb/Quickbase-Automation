"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import {
  LuActivity,
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuBadgeCheck,
  LuBookOpen,
  LuBraces,
  LuCheck,
  LuCircleAlert,
  LuCircleCheck,
  LuClock3,
  LuFileCode,
  LuDatabase,
  LuEye,
  LuFileSearch,
  LuGitBranch,
  LuHistory,
  LuInfo,
  LuLayers3,
  LuListTree,
  LuPanelTopOpen,
  LuPlay,
  LuRefreshCw,
  LuSearch,
  LuShieldCheck,
  LuSquareActivity,
  LuTable2,
  LuTag,
  LuTimer,
  LuUser,
  LuWorkflow,
  LuX,
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
    <div className="mb-8">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749]">
            {icon}
          </span>
        )}
        <div>
          {eyebrow && (
            <p className="mb-1 text-sm font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-extrabold leading-tight text-[#205c38] sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
      {children && (
        <div className="mt-5 max-w-5xl text-lg leading-8 text-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}

function EvidenceBadge({
  type,
}: {
  type:
    | "DOCUMENTED"
    | "OBSERVED"
    | "INFERRED"
    | "SPECULATIVE"
    | "NOT ESTABLISHED";
}) {
  const styles = {
    DOCUMENTED: "border-blue-200 bg-blue-50 text-blue-800",
    OBSERVED: "border-[#9fc9ad] bg-[#f0fff4] text-[#205c38]",
    INFERRED: "border-amber-200 bg-amber-50 text-amber-800",
    SPECULATIVE: "border-purple-200 bg-purple-50 text-purple-800",
    "NOT ESTABLISHED": "border-gray-300 bg-gray-100 text-gray-700",
  } as const;

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold tracking-[0.08em] ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function ConceptCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0fff4] text-xl text-[#276749]">
        {icon}
      </span>
      <h3 className="mt-4 text-xl font-extrabold text-[#205c38]">{title}</h3>
      <div className="mt-3 leading-7 text-gray-700">{children}</div>
    </div>
  );
}

function Remember({
  title,
  children,
  icon = <LuBadgeCheck aria-hidden="true" />,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0]">
      <div className="flex items-start gap-4 p-6 sm:p-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-[#7a5200] shadow-sm">
          {icon}
        </span>
        <div>
          <p className="font-extrabold uppercase tracking-[0.12em] text-[#7a5200]">
            Remember This
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-gray-950">
            {title}
          </h3>
          <div className="mt-4 max-w-5xl text-lg leading-8 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Definition({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#b7d8c2] bg-white p-5">
      <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
        {term}
      </p>
      <div className="mt-2 leading-7 text-gray-700">{children}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-2">
      <LuArrowDown aria-hidden="true" className="text-2xl text-[#276749]/60" />
    </div>
  );
}

function CodeValue({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-gray-950 px-2 py-1 font-mono text-sm text-white">
      {children}
    </code>
  );
}

type QuizQuestion = {
  statement: string;
  answer: boolean;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    statement:
      'If a Pipeline is named "Lesson 10 - First Execution," every Activity entry under that Pipeline name represents the same run.',
    answer: false,
    explanation:
      "One Pipeline definition can produce many separate runtime executions. The Pipeline name identifies the configured automation, not one unique run.",
  },
  {
    statement:
      "Ref ID ab can help connect a runtime Activity entry to the configured Update Record step in the Pipeline designer.",
    answer: true,
    explanation:
      "We observed the same Ref IDs in the designer and in View run activity. That gives us a bridge from design-time configuration to runtime evidence.",
  },
  {
    statement:
      "Pipeline triggered and Pipeline finished are merely decorative headings and contain no useful runtime information.",
    answer: false,
    explanation:
      "In our run, both lifecycle entries contained evidence such as timestamps, run identity, duration, and runtime metadata.",
  },
  {
    statement:
      "Input and Output should be interpreted in the context of the particular activity you are inspecting.",
    answer: true,
    explanation:
      "Trigger Input/Output and action Input/Output represented different jobs. These labels are local to the activity, not one universal Pipeline-wide bucket.",
  },
  {
    statement:
      "If a field has a different value today, the current Quickbase record always proves what value existed during an older Pipeline run.",
    answer: false,
    explanation:
      "Current application state can change after a run. Historical Activity can preserve evidence from the earlier execution even when the record later changes.",
  },
  {
    statement:
      "In our Record Updated specimen, Activity exposed previous-state information as well as current/runtime state.",
    answer: true,
    explanation:
      "That was observed for the Quickbase Record Updated trigger we studied. We are not generalizing this to every trigger or every field in every Pipeline.",
  },
  {
    statement:
      "The displayed 1.45-second Pipeline duration in our fresh run corresponded to started_at through finished_at.",
    answer: true,
    explanation:
      "The recorded difference was 1.454626 seconds, matching the displayed duration. It did not begin at remote_event_received_at in this specimen.",
  },
  {
    statement:
      "Because Activity displayed a value named engine-service, we now know Quickbase's complete internal Pipelines architecture.",
    answer: false,
    explanation:
      "We observed the literal label. The exact architecture, responsibilities, topology, and communication behind it remain undocumented by our experiment.",
  },
  {
    statement:
      "A successful Quickbase record save guarantees every downstream Pipeline mutation is already visible in that same browser view.",
    answer: false,
    explanation:
      "Our controlled run showed the original save while Pipeline Results was still blank. The later Pipeline mutation became visible after refresh.",
  },
  {
    statement:
      "Record ID can help establish continuity as the same record appears in trigger output, action target, and action output.",
    answer: true,
    explanation:
      "Record #24 gave us a stable identifier that let us trace one record through multiple runtime activities.",
  },
  {
    statement:
      "Open YAML snapshot, View pipeline activity, and Open pipeline are fully taught in Lesson 11.",
    answer: false,
    explanation:
      "Lesson 11 identifies those menu options so the student understands the Activity surface, but deliberately teaches only View run activity in depth.",
  },
  {
    statement:
      "The strongest Lesson 11 mental model is that Activity is runtime evidence, not merely a success/failure list.",
    answer: true,
    explanation:
      "That is the central conclusion: Activity helps reconstruct what a run knew, received, attempted, returned, and when those activities occurred.",
  },
];

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const score = useMemo(() => {
    return quizQuestions.reduce((total, question, index) => {
      return total + (answers[index] === question.answer ? 1 : 0);
    }, 0);
  }, [answers]);

  const complete = Object.keys(answers).length === quizQuestions.length;

  function reset() {
    setAnswers({});
    setShowResults(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#276749] bg-white shadow-sm">
      <div className="bg-[#276749] p-6 text-white sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl">
            <LuFileSearch aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/75">
              Lesson 11 Quiz
            </p>
            <h3 className="mt-1 text-2xl font-extrabold">
              Can You Read Runtime Evidence?
            </h3>
            <p className="mt-3 max-w-4xl leading-7 text-white/90">
              These questions test the distinctions, not your ability to
              memorize internal field names.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        {quizQuestions.map((question, index) => {
          const selected = answers[index];
          const answered = selected !== undefined;
          const correct = answered && selected === question.answer;

          return (
            <div
              key={question.statement}
              className="rounded-2xl border border-gray-300 bg-[#fbfcfb] p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] font-extrabold text-[#276749]">
                  {index + 1}
                </span>
                <p className="font-bold leading-7 text-gray-900">
                  {question.statement}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {[true, false].map((value) => {
                  const active = selected === value;
                  return (
                    <button
                      key={String(value)}
                      type="button"
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [index]: value,
                        }))
                      }
                      className={`rounded-xl border-2 px-5 py-2.5 font-extrabold transition ${
                        active
                          ? "border-[#276749] bg-[#276749] text-white"
                          : "border-gray-300 bg-white text-gray-800 hover:border-[#9fc9ad]"
                      }`}
                    >
                      {value ? "True" : "False"}
                    </button>
                  );
                })}
              </div>

              {showResults && answered && (
                <div
                  className={`mt-5 rounded-xl border p-4 ${
                    correct
                      ? "border-[#9fc9ad] bg-[#f0fff4]"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {correct ? (
                      <LuCircleCheck
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-xl text-[#276749]"
                      />
                    ) : (
                      <LuX
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-xl text-red-700"
                      />
                    )}
                    <div>
                      <p className="font-extrabold">
                        {correct ? "Correct." : "Not quite."}
                      </p>
                      <p className="mt-2 leading-7 text-gray-700">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={!complete}
            onClick={() => setShowResults(true)}
            className="rounded-xl bg-[#276749] px-5 py-3 font-extrabold text-white transition hover:bg-[#205c38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check Answers
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-xl border-2 border-[#276749] px-5 py-3 font-extrabold text-[#205c38] transition hover:bg-[#f0fff4]"
          >
            Retake Quiz
          </button>
        </div>

        {showResults && complete && (
          <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              Result
            </p>
            <p className="mt-1 text-3xl font-extrabold text-[#205c38]">
              {score} / {quizQuestions.length}
            </p>
            <p className="mt-3 leading-7 text-gray-700">
              The goal is not perfect recall of Activity property names. The
              goal is being able to distinguish definition, run, lifecycle,
              step, record, current state, historical evidence, and the limits
              of what the evidence actually proves.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Lesson11Page() {
  const activityMenu = [
    {
      label: "Open pipeline",
      icon: <LuWorkflow aria-hidden="true" />,
      scope: "Definition",
      description:
        "Returns you to the configured Pipeline so you can inspect the automation that produced the run.",
      status: "Introduced here; not taught in depth.",
    },
    {
      label: "Open YAML snapshot",
      icon: <LuFileCode aria-hidden="true" />,
      scope: "Snapshot",
      description:
        "Opens a YAML representation associated with the Pipeline/run. This can become useful in later investigation and recovery work.",
      status: "Deferred to a later lesson.",
    },
    {
      label: "View run activity",
      icon: <LuSquareActivity aria-hidden="true" />,
      scope: "One execution",
      description:
        "Opens the detailed runtime evidence for one particular Pipeline run. This is the investigation surface taught in Lesson 11.",
      status: "Lesson 11 focus.",
    },
    {
      label: "View pipeline activity",
      icon: <LuHistory aria-hidden="true" />,
      scope: "Broader history",
      description:
        "Returns to the broader Activity history for the Pipeline so multiple runs can be reviewed.",
      status: "Introduced here; deeper use comes later.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl ring-1 ring-white/20">
                <LuActivity aria-hidden="true" />
              </span>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">
                Lesson 11
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Reading the Activity Log
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
              Lesson 10 turned the machine on. Now we open one Pipeline run and
              learn how to read the runtime evidence Quickbase preserved about
              what happened inside it.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/70">
                  Lesson 10 Asked
                </p>

                <p className="mt-2 text-lg font-bold leading-8">
                  Can we make a Pipeline execute and observe what it does?
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/70">
                  Lesson 11 Asks
                </p>

                <p className="mt-2 text-lg font-bold leading-8">
                  Once it executes, what can View run activity tell us about
                  that execution?
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border-2 border-white/30 bg-white p-6 text-[#205c38] sm:p-7">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Central Idea
              </p>

              <p className="mt-2 text-2xl font-extrabold leading-9">
                The Activity Log is runtime evidence of a Pipeline execution.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/10"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-bold transition hover:bg-white/15"
              >
                <LuArrowLeft aria-hidden="true" />
                Lesson 10
              </Link>

              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 font-bold transition hover:bg-white/15"
              >
                Skip to quiz
                <LuArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Scope First"
          title="The Activity Menu Has More Than One Door"
          icon={<LuListTree aria-hidden="true" />}
        >
          <p>
            The three-dot menu beside a Pipeline Activity entry gives us several
            different ways to investigate. We need to recognize all four before
            we choose the one this lesson actually studies.
          </p>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          {activityMenu.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-6 shadow-sm ${
                item.label === "View run activity"
                  ? "border-2 border-[#276749] bg-[#f0fff4]"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${item.label === "View run activity" ? "bg-[#276749] text-white" : "bg-[#f0fff4] text-[#276749]"}`}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-gray-500">
                    {item.scope}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[#205c38]">
                    {item.label}
                  </h3>
                </div>
              </div>
              <p className="mt-4 leading-7 text-gray-700">{item.description}</p>
              <p className="mt-4 border-t border-gray-200 pt-4 text-sm font-bold text-gray-600">
                {item.status}
              </p>
            </div>
          ))}
        </div>

        <Remember title="Lesson 11 teaches only View run activity">
          <p>
            We are intentionally not turning this lesson into YAML analysis,
            Pipeline history management, or a troubleshooting course.
          </p>
          <p className="mt-3">
            Those other menu options are real investigation surfaces, but they
            deserve their own experiments and their own lesson.
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Start With Something We Understand"
            title="Known-Good Pipeline, New Question"
            icon={<LuWorkflow aria-hidden="true" />}
          >
            <p>
              We are not building another Pipeline. We are inspecting the one
              whose behavior we already proved in Lesson 10.
            </p>
          </SectionHeading>

          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-[#9fc9ad] bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-xl border border-gray-200 bg-[#f0fff4] p-5 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Pipeline Definition
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#205c38]">
                Lesson 10 - First Execution
              </p>
            </div>
            <FlowArrow />
            <div className="rounded-xl border border-gray-300 bg-white p-5 text-center">
              <p className="text-sm font-bold text-gray-500">Step 1</p>
              <p className="mt-1 text-xl font-extrabold text-[#205c38]">
                Record Updated
              </p>
              <p className="mt-2">
                Ref ID <CodeValue>aa</CodeValue>
              </p>
            </div>
            <FlowArrow />
            <div className="rounded-xl border border-gray-300 bg-white p-5 text-center">
              <p className="text-sm font-bold text-gray-500">Step 2</p>
              <p className="mt-1 text-xl font-extrabold text-[#205c38]">
                Updated Record
              </p>
              <p className="mt-2">
                Ref ID <CodeValue>ab</CodeValue>
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Pipeline Definition"
              icon={<LuBraces aria-hidden="true" />}
            >
              <p>
                The configured automation: its name, Trigger, Action, Ref IDs,
                fields, values, and other design-time choices.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Pipeline Run"
              icon={<LuPlay aria-hidden="true" />}
            >
              <p>
                One particular runtime execution of that definition. The same
                Pipeline definition can execute many times.
              </p>
            </ConceptCard>
          </div>

          <Remember title="A Pipeline is not the same thing as a Pipeline run">
            <p>
              One definition can produce many executions. Activity becomes much
              easier to understand once we stop treating those as the same
              object.
            </p>
          </Remember>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="First Reading Habit"
          title="The Activity List Reads Newest to Oldest"
          icon={<LuArrowDown aria-hidden="true" />}
        >
          <p>
            Before we inspect any runtime details, we need to understand how the
            Pipeline Activity screen is arranged.
          </p>

          <p className="mt-4">
            The Pipeline itself executes forward in time, but the Activity list
            we observed displays the most recent activity at the top. That makes
            a completed run appear visually backward.
          </p>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* WHAT THE ACTIVITY SCREEN SHOWS */}

          <div className="rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-gray-500">
              What the Activity Screen Shows
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Newest Activity at the Top
            </h3>

            <div className="mt-6 space-y-3">
              {[
                ["Pipeline finished in 1.45s", "Runtime lifecycle activity"],
                ["2 — Updated Record — ab", "Configured Action step"],
                ["1 — Record Updated — aa", "Configured Trigger step"],
                ["Pipeline triggered", "Runtime lifecycle activity"],
              ].map(([title, subtitle], index) => (
                <div
                  key={title}
                  className={`rounded-xl border p-4 ${
                    index === 0 || index === 3
                      ? "border-[#9fc9ad] bg-[#f0fff4]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <p className="font-extrabold text-[#205c38]">{title}</p>
                  <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#d4a72c] bg-[#fffaf0] p-4">
              <LuCircleAlert
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl text-[#7a5200]"
              />

              <p className="leading-7 text-gray-700">
                If you start at the top and read downward, you are reading this
                completed run <strong>backward through time</strong>.
              </p>
            </div>
          </div>

          {/* HOW THE RUN ACTUALLY EXECUTED */}

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              How the Run Actually Executed
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Read Bottom to Top to Reconstruct Time
            </h3>

            <div className="mt-6">
              {[
                ["Pipeline triggered", "The run begins."],
                ["1 — Record Updated — aa", "The configured Trigger executes."],
                ["2 — Updated Record — ab", "The configured Action executes."],
                ["Pipeline finished", "The run completes."],
              ].map(([title, subtitle], index) => (
                <div key={title}>
                  <div className="rounded-xl border border-[#b7d8c2] bg-white p-4">
                    <p className="font-extrabold text-[#205c38]">{title}</p>
                    <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                  </div>

                  {index < 3 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Remember title="Display order is not execution order">
          <p>
            The Activity page is showing us a history list with the newest
            activity first.
          </p>

          <p className="mt-3">
            To reconstruct one completed Pipeline run chronologically, begin
            with
            <strong> Pipeline triggered</strong> at the bottom of that run and
            read upward through Step 1, Step 2, and finally{" "}
            <strong>Pipeline finished</strong>.
          </p>
        </Remember>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Definition term="Lifecycle activity">
            Runtime evidence Quickbase records around the configured steps, such
            as the Pipeline beginning and finishing.
          </Definition>

          <Definition term="Configured step activity">
            Runtime evidence associated with a step you created in the Pipeline
            designer, such as <CodeValue>aa</CodeValue> or{" "}
            <CodeValue>ab</CodeValue>.
          </Definition>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
          <div className="flex items-start gap-4">
            <LuHistory
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl text-[#276749]"
            />

            <div>
              <h3 className="text-xl font-extrabold text-[#205c38]">
                Where does one run end and the next begin?
              </h3>

              <p className="mt-3 max-w-5xl leading-7 text-gray-700">
                The Activity page can contain many executions of the same
                Pipeline. In the screen we observed, one completed run stretches
                from its <strong>Pipeline triggered</strong> entry through its
                numbered steps to its corresponding{" "}
                <strong>Pipeline finished</strong> entry.
              </p>

              <p className="mt-3 max-w-5xl leading-7 text-gray-700">
                Then another <strong>Pipeline triggered</strong> entry below
                begins an older run.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <EvidenceBadge type="OBSERVED" />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Designer → Runtime"
            title="Ref IDs Become Investigative Anchors"
            icon={<LuGitBranch aria-hidden="true" />}
          >
            <p>
              Lesson 9 introduced Ref IDs as part of step identity. Lesson 11
              shows why that identity matters after execution.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-3">
            <ConceptCard
              title="Design-Time"
              icon={<LuPanelTopOpen aria-hidden="true" />}
            >
              <p>
                In the Pipeline designer, the Trigger was{" "}
                <CodeValue>aa</CodeValue> and the Update Record Action was{" "}
                <CodeValue>ab</CodeValue>.
              </p>
            </ConceptCard>
            <div className="flex items-center justify-center">
              <LuArrowRight
                aria-hidden="true"
                className="hidden text-4xl text-[#276749]/50 lg:block"
              />
              <LuArrowDown
                aria-hidden="true"
                className="text-4xl text-[#276749]/50 lg:hidden"
              />
            </div>
            <ConceptCard
              title="Runtime"
              icon={<LuSquareActivity aria-hidden="true" />}
            >
              <p>
                View run activity reported those same Ref IDs beside the
                activities generated by those configured steps.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Definition term="Position">
              Where the step currently appears in the visual flow. Useful for
              human reading.
            </Definition>
            <Definition term="Ref ID">
              The step identity that persists as a runtime reference and appears
              in Activity. Useful for connecting evidence back to configuration.
            </Definition>
          </div>
          <p className="mt-6">
            <EvidenceBadge type="OBSERVED" />
          </p>
        </div>
      </section>

<section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
  <SectionHeading
    eyebrow="The Big Reveal"
    title="Open the Summary for One Activity"
    icon={<LuEye aria-hidden="true" />}
  >
    <p>
      <strong>View run activity</strong> gets us inside one Pipeline execution,
      but we still have one more step before we can inspect the runtime
      evidence.
    </p>

    <p className="mt-4">
      Each line in the run represents one activity. Click the activity you want
      to investigate, and Quickbase opens its <strong>Summary</strong>.
    </p>
  </SectionHeading>

  {/* HOW TO GET THERE */}

  <div className="overflow-hidden rounded-2xl border-2 border-[#276749] bg-[#f0fff4] shadow-sm">
    <div className="border-b border-[#9fc9ad] bg-white p-6 sm:p-7">
      <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
        Investigation Path
      </p>

      <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
        From Pipeline Activity to Runtime Evidence
      </h3>
    </div>

    <div className="p-6 sm:p-8">
      <div className="mx-auto max-w-4xl">
        {[
          {
            title: "1 — Open Pipeline Activity",
            description:
              "Locate the Pipeline execution you want to investigate.",
          },
          {
            title: "2 — Open the Three-Dot Menu",
            description:
              "Use the menu beside that Activity entry.",
          },
          {
            title: "3 — Choose View run activity",
            description:
              "Quickbase opens the activities belonging to that particular Pipeline run.",
          },
          {
            title: "4 — Click an Activity Line",
            description:
              "Select Pipeline triggered, Record Updated, Updated Record, Pipeline finished, or another activity in the run.",
          },
          {
            title: "5 — Read the Summary",
            description:
              "Quickbase exposes the runtime information associated with the activity you selected.",
          },
        ].map((item, index) => (
          <div key={item.title}>
            <div className="rounded-2xl border border-[#b7d8c2] bg-white p-5">
              <p className="text-lg font-extrabold text-[#205c38]">
                {item.title}
              </p>

              <p className="mt-2 leading-7 text-gray-700">
                {item.description}
              </p>
            </div>

            {index < 4 && <FlowArrow />}
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* IMPORTANT DISTINCTION */}

  <Remember title="View run activity opens the run. Clicking a line opens that activity's Summary.">
    <p>
      Those are two different levels of investigation.
    </p>

    <p className="mt-3">
      <strong>View run activity</strong> shows the activities that occurred
      during one execution.
    </p>

    <p className="mt-3">
      Clicking one of those activity lines lets us inspect the runtime evidence
      associated with that particular activity.
    </p>
  </Remember>

  {/* WHAT THE SCREEN NOW SHOWS */}

  <div className="mt-10">
    <h3 className="text-2xl font-extrabold text-[#205c38]">
      What Appears in the Summary?
    </h3>

    <p className="mt-3 max-w-5xl text-lg leading-8 text-gray-700">
      The top of the Summary identifies the activity before we even expand its
      deeper evidence.
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Definition term="Type">
        Identifies the kind of Pipeline activity being inspected, such as{" "}
        <strong>trigger</strong> or <strong>action</strong>.
      </Definition>

      <Definition term="Channel">
        Identifies the Pipeline channel involved. In our experiment, this was{" "}
        <strong>quickbase</strong>.
      </Definition>

      <Definition term="Pipeline">
        Identifies the Pipeline definition that produced this runtime activity.
      </Definition>

      <Definition term="Step">
        Identifies the configured operation represented by the activity, such
        as <strong>on_update</strong> or <strong>update</strong>.
      </Definition>

      <Definition term="Reference ID">
        Connects the runtime activity back to the configured step in the
        Pipeline designer, such as <CodeValue>aa</CodeValue> or{" "}
        <CodeValue>ab</CodeValue>.
      </Definition>

      <Definition term="Run timestamp">
        Shows when this activity occurred according to the runtime evidence
        displayed by Quickbase.
      </Definition>
    </div>
  </div>

  {/* DIFFERENT ACTIVITY TYPES */}

  <div className="mt-10 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
    <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
      Read the Activity in Context
    </p>

    <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
      Not Every Summary Has the Same Sections
    </h3>

    <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-700">
      The expandable areas depend on the kind of runtime activity we clicked.
      That makes sense because a Trigger, an Action, and a Pipeline lifecycle
      event are doing different jobs.
    </p>

    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      <ConceptCard
        title="Record Updated — aa"
        icon={<LuZap aria-hidden="true" />}
      >
        <p>
          Our Trigger Summary exposed expandable areas including{" "}
          <strong>Input</strong>, <strong>Output</strong>, and{" "}
          <strong>Metadata</strong>.
        </p>
      </ConceptCard>

      <ConceptCard
        title="Updated Record — ab"
        icon={<LuDatabase aria-hidden="true" />}
      >
        <p>
          Our Action Summary exposed <strong>Target step</strong>,{" "}
          <strong>Input</strong>, and <strong>Output</strong>.
        </p>
      </ConceptCard>

      <ConceptCard
        title="Pipeline triggered"
        icon={<LuPlay aria-hidden="true" />}
      >
        <p>
          The lifecycle activity exposed its own runtime information, including
          timestamps, run identity, event identity, and execution metadata.
        </p>
      </ConceptCard>
    </div>
  </div>

  {/* DEFINITIONS */}

  <div className="mt-10">
    <h3 className="text-2xl font-extrabold text-[#205c38]">
      Expand the Evidence
    </h3>

    <p className="mt-3 max-w-5xl text-lg leading-8 text-gray-700">
      Once the Summary is open, its expandable areas let us move from the
      identity of the activity into the details of what it received, knew,
      targeted, and returned.
    </p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        [
          "Input",
          "Information supplied to or available to this particular activity.",
        ],
        [
          "Output",
          "Runtime information returned by this particular activity.",
        ],
        [
          "Target step",
          "The record or object the Action was prepared to act upon.",
        ],
        [
          "Metadata",
          "Additional runtime context surrounding the activity.",
        ],
        [
          "Previous",
          "Earlier-state information where the inspected trigger exposes it.",
        ],
        [
          "Struct",
          "Schema information describing runtime properties and their Quickbase fields.",
        ],
        [
          "Timestamps",
          "Recorded moments associated with the activity and Pipeline lifecycle.",
        ],
        [
          "Identifiers",
          "Values that connect the run, event, step, application, table, user, and record.",
        ],
      ].map(([term, description]) => (
        <Definition key={term} term={term}>
          {description}
        </Definition>
      ))}
    </div>
  </div>

  <Remember title="The Summary is activity-specific runtime evidence">
    <p>
      Clicking <strong>Updated Record</strong> does not show some universal
      summary for the entire Pipeline.
    </p>

    <p className="mt-3">
      It shows evidence associated with the{" "}
      <strong>Updated Record activity</strong>. Clicking{" "}
      <strong>Record Updated</strong> gives us evidence associated with the
      Trigger instead.
    </p>

    <p className="mt-3 font-bold">
      Always ask: Which activity did I click?
    </p>
  </Remember>

  <div className="mt-6">
    <EvidenceBadge type="OBSERVED" />
  </div>
</section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Read Labels Locally"
            title="Input and Output Do Not Mean One Thing Globally"
            icon={<LuRefreshCw aria-hidden="true" />}
          >
            <p>
              One of the easiest mistakes is to imagine one giant Pipeline-wide
              Input bucket and one giant Output bucket. Our run showed something
              more precise.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-2">
            <ConceptCard title="Trigger aa" icon={<LuZap aria-hidden="true" />}>
              <p>
                The Trigger activity exposed trigger-related information and
                returned runtime record information received from Quickbase.
              </p>
              <p className="mt-3">
                Its Input and Output must be read in the context of the Trigger
                job.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Action ab"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <p>
                The Update Record Action exposed a Target step, an Input
                describing what value it was asked to write, and an Output
                representing what the activity returned afterward.
              </p>
            </ConceptCard>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rounded-2xl border border-gray-300 bg-white p-5 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Target
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#205c38]">
                What am I acting upon?
              </p>
            </div>
            <FlowArrow />
            <div className="rounded-2xl border border-gray-300 bg-white p-5 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Input
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#205c38]">
                What am I asking this activity to do?
              </p>
            </div>
            <FlowArrow />
            <div className="rounded-2xl border-2 border-[#276749] bg-[#276749] p-5 text-center text-white">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/70">
                Activity Executes
              </p>
              <p className="mt-1 text-xl font-extrabold">Runtime work occurs</p>
            </div>
            <FlowArrow />
            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-5 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Output
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#205c38]">
                What did this activity return?
              </p>
            </div>
          </div>
          <p className="mt-7">
            <EvidenceBadge type="OBSERVED" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Runtime Data Has Layers"
          title="Data, Schema, and Context Answer Different Questions"
          icon={<LuLayers3 aria-hidden="true" />}
        >
          <p>
            Expanding View run activity exposed more than ordinary field values.
            We found three useful layers that should not be blended together.
          </p>
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-3">
          <ConceptCard title="Data" icon={<LuTable2 aria-hidden="true" />}>
            <p className="font-bold text-gray-900">
              What record and values are we dealing with?
            </p>
            <p className="mt-3">
              Examples included Record ID, Pipeline Results, relationship
              values, timestamps, record owner, and Last Modified By.
            </p>
          </ConceptCard>
          <ConceptCard title="Schema" icon={<LuBraces aria-hidden="true" />}>
            <p className="font-bold text-gray-900">
              What Quickbase fields and types describe those values?
            </p>
            <p className="mt-3">
              The observed <CodeValue>struct</CodeValue> information associated
              properties with values such as Quickbase field IDs and field
              types.
            </p>
          </ConceptCard>
          <ConceptCard title="Context" icon={<LuUser aria-hidden="true" />}>
            <p className="font-bold text-gray-900">
              Where and under whose runtime context did this occur?
            </p>
            <p className="mt-3">
              Metadata/context exposed application, table, realm, user, and
              occurrence information in our specimen.
            </p>
          </ConceptCard>
        </div>

        <div className="mt-7 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
          <div className="flex items-start gap-4">
            <LuInfo
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl text-[#276749]"
            />
            <div>
              <p className="text-lg font-extrabold text-[#205c38]">
                We do not need to memorize every property.
              </p>
              <p className="mt-2 leading-7 text-gray-700">
                The important skill is recognizing which question a piece of
                runtime evidence helps answer: value, structure, context, or
                identity.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6">
          <EvidenceBadge type="OBSERVED" />
        </p>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Historical State"
            title="Our Record Updated Trigger Exposed Previous State"
            icon={<LuHistory aria-hidden="true" />}
          >
            <p>
              This is a powerful discovery, but one that requires careful
              evidence language.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <Definition term="current">
              Runtime/current information associated with the record in the
              Trigger activity.
            </Definition>
            <Definition term="previous">
              Earlier-state information exposed by the Quickbase Record Updated
              trigger we inspected.
            </Definition>
            <Definition term="change">
              Runtime structure associated with the observed record update and
              its changed state.
            </Definition>
          </div>

          <div className="mt-7 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <EvidenceBadge type="OBSERVED" />
              <p className="font-extrabold text-[#205c38]">
                In this Quickbase Record Updated trigger, Activity exposed
                previous-state information as well as current/runtime state.
              </p>
            </div>
            <p className="mt-4 leading-7 text-gray-700">
              In our fresh Record #24 run, previous FID 2 showed{" "}
              <strong>09-02-2026 11:34 AM</strong>, matching the known earlier
              Date Modified value.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-gray-300 bg-white p-6">
            <div className="flex items-start gap-4">
              <LuShieldCheck
                aria-hidden="true"
                className="mt-1 shrink-0 text-2xl text-[#276749]"
              />
              <div>
                <p className="font-extrabold text-gray-950">
                  What we are not claiming
                </p>
                <p className="mt-2 leading-7 text-gray-700">
                  We have not demonstrated that every Pipeline trigger always
                  stores every before/after value. Our statement stays bounded
                  to the Record Updated trigger and evidence we actually
                  inspected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Centerpiece Experiment"
          title="Follow Record #24 Through One Fresh Run"
          icon={<LuSearch aria-hidden="true" />}
        >
          <p>
            Instead of collecting unrelated examples, we used one controlled
            record and followed it through the execution.
          </p>
        </SectionHeading>

        <div className="rounded-2xl border-2 border-[#276749] bg-white shadow-sm">
          <div className="border-b border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              Baseline
            </p>
            <p className="mt-2 text-2xl font-extrabold text-[#205c38]">
              Record ID# 24
            </p>
            <p className="mt-3 text-lg text-gray-700">
              Pipeline Results: <strong>empty</strong>
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <Definition term="Trigger output">
                <CodeValue>id: 24</CodeValue>
              </Definition>
              <Definition term="Action target">
                <CodeValue>id: 24</CodeValue>
              </Definition>
              <Definition term="Action output">
                <CodeValue>id: 24</CodeValue>
              </Definition>
            </div>

            <Remember title="Follow identifiers across activities">
              <p>
                Do not read every expanded box as an isolated blob. Stable
                identifiers can establish continuity between one activity and
                the next.
              </p>
            </Remember>

            <div className="mt-8">
              <h3 className="text-2xl font-extrabold text-[#205c38]">
                Trace Pipeline Results
              </h3>
              <div className="mt-6 mx-auto max-w-4xl">
                {[
                  ["Trigger output", "pipeline_results: No value"],
                  ["Action target", "pipeline_results: No value"],
                  [
                    "Action input",
                    "pipeline_results: The pipeline has entered this line.",
                  ],
                  [
                    "Action output",
                    "pipeline_results: The pipeline has entered this line.",
                  ],
                ].map(([label, value], index) => (
                  <div key={label}>
                    <div
                      className={`rounded-2xl border p-5 ${index >= 2 ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-gray-300 bg-white"}`}
                    >
                      <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                        {label}
                      </p>
                      <p className="mt-2 break-words font-mono text-sm font-bold text-gray-900 sm:text-base">
                        {value}
                      </p>
                    </div>
                    {index < 3 && <FlowArrow />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Remember title="Activity can reconstruct the movement of a value">
          <p>
            We are no longer limited to saying “the Action succeeded.” We can
            see the value before the Action, the value requested by the Action,
            and the value returned afterward.
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Controlled Timeline"
            title="One User Save, Then a Later Pipeline Mutation"
            icon={<LuTimer aria-hidden="true" />}
          >
            <p>
              Lesson 10 taught us conceptually that the Pipeline Action creates
              a second Quickbase mutation. View run activity lets us inspect the
              chronology much more closely.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-gray-500">
                Mutation A
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                Original Quickbase Save
              </h3>
              <p className="mt-4 leading-7 text-gray-700">
                Trigger <CodeValue>aa</CodeValue> returned Record #24 with
                Pipeline Results still empty.
              </p>
              <p className="mt-5 font-mono text-sm font-bold">
                updated_at: 17:32:17.082
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Mutation B
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                Pipeline Update Record Action
              </h3>
              <p className="mt-4 leading-7 text-gray-700">
                Action <CodeValue>ab</CodeValue> returned Record #24 with the
                configured literal now present.
              </p>
              <p className="mt-5 font-mono text-sm font-bold">
                updated_at: 17:32:20.339
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#7a5200]">
              Observed Difference
            </p>
            <p className="mt-2 text-3xl font-extrabold text-gray-950">
              Approximately 3.257 seconds
            </p>
            <p className="mt-3 leading-7 text-gray-700">
              separated those two returned <CodeValue>updated_at</CodeValue>{" "}
              values in this controlled specimen.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-extrabold text-[#205c38]">
              The event also moved through distinct lifecycle timestamps
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Event received", "17:32:17.502392"],
                ["Prioritized", "17:32:17.853222"],
                ["Start requested", "17:32:17.969378"],
                ["Execution started", "17:32:19.001537"],
              ].map(([label, time]) => (
                <div
                  key={label}
                  className="rounded-xl border border-gray-300 bg-white p-5"
                >
                  <p className="font-extrabold text-[#205c38]">{label}</p>
                  <p className="mt-2 break-all font-mono text-sm text-gray-700">
                    {time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <EvidenceBadge type="OBSERVED" />
            <EvidenceBadge type="NOT ESTABLISHED" />
          </div>
          <p className="mt-4 max-w-5xl leading-7 text-gray-700">
            We observed distinct timestamp fields. We have{" "}
            <strong>not established</strong> the undocumented internal
            implementation behind each scheduling/execution stage.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Practical Observation"
          title="Why the Browser Initially Looked Wrong"
          icon={<LuRefreshCw aria-hidden="true" />}
        >
          <p>
            Immediately after the originating save, the record still appeared
            with Pipeline Results empty. After refreshing, the Pipeline value
            appeared.
          </p>
        </SectionHeading>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-gray-500">
              Browser after original save
            </p>
            <p className="mt-2 text-xl font-extrabold text-gray-900">
              Pipeline Results still empty
            </p>
          </div>
          <FlowArrow />
          <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              Pipeline Action occurs
            </p>
            <p className="mt-2 text-xl font-extrabold text-[#205c38]">
              Second record mutation
            </p>
          </div>
          <FlowArrow />
          <div className="rounded-2xl border-2 border-[#276749] bg-[#276749] p-6 text-center text-white">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/70">
              Browser after refresh
            </p>
            <p className="mt-2 text-xl font-extrabold">
              The pipeline has entered this line.
            </p>
          </div>
        </div>

        <Remember title="A successful save does not prove every downstream mutation is already visible">
          <p>
            In our experiment, the originating Quickbase save became visible
            before the later Pipeline Update Record result appeared in that
            browser view.
          </p>
          <p className="mt-3">
            That is an observation from this specimen, not a universal timing
            guarantee.
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Historical Evidence"
            title="Current Record State Is Not Historical Runtime State"
            icon={<LuHistory aria-hidden="true" />}
          >
            <p>
              A later manual change to Record #24 accidentally gave us one of
              the strongest lessons in the entire Activity investigation.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Current Application State"
              icon={<LuDatabase aria-hidden="true" />}
            >
              <p className="font-bold text-gray-900">
                What does the record contain now?
              </p>
              <p className="mt-3">
                A later manual edit can replace or clear a value, so the current
                record may no longer resemble the state that existed during an
                older Pipeline run.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Historical Runtime Evidence"
              icon={<LuSquareActivity aria-hidden="true" />}
            >
              <p className="font-bold text-gray-900">
                What did this particular run observe or return?
              </p>
              <p className="mt-3">
                The older Activity entry still showed the Pipeline Results value
                from that execution even after the live record was later
                changed.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Records keep changing; run evidence belongs to the run">
            <p>
              An old Activity entry can preserve evidence from a state that no
              longer exists in the current Quickbase record.
            </p>
          </Remember>
          <p>
            <EvidenceBadge type="OBSERVED" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Time Has Layers Too"
          title="Different Surfaces Expose Different Temporal Precision"
          icon={<LuClock3 aria-hidden="true" />}
        >
          <p>
            The ordinary Quickbase table and View run activity did not expose
            time at the same level of precision.
          </p>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          <ConceptCard
            title="Ordinary Table Display"
            icon={<LuTable2 aria-hidden="true" />}
          >
            <p>
              Date Modified displayed only to the minute in our table:
              <strong> 09-03-2026 10:32 AM</strong>.
            </p>
            <p className="mt-3">
              Both mutations could therefore look identical at that display
              precision.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Activity Runtime Evidence"
            icon={<LuTimer aria-hidden="true" />}
          >
            <p>
              Activity exposed sub-second timestamps such as{" "}
              <CodeValue>17:32:17.082</CodeValue> and{" "}
              <CodeValue>17:32:20.339</CodeValue>.
            </p>
          </ConceptCard>
        </div>

        <div className="mt-7 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <LuCircleAlert
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl text-[#7a5200]"
            />
            <div>
              <p className="text-xl font-extrabold text-gray-950">
                Do not casually compare every timestamp.
              </p>
              <p className="mt-3 leading-7 text-gray-700">
                Our environment exposed wall-clock observations, Activity
                display times, UTC timestamps, Date Modified values, and{" "}
                <CodeValue>occurred_at</CodeValue> values that did not all
                present an immediately obvious common representation.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <EvidenceBadge type="OBSERVED" />
                <EvidenceBadge type="NOT ESTABLISHED" />
              </div>
              <p className="mt-4 leading-7 text-gray-700">
                We know multiple time representations exist. We have not yet
                established why every representation differed in our
                environment. Timezone and timestamp semantics need to be
                understood before treating two surfaces as directly comparable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Measure the Runtime"
            title='What Did "Finished in 1.45s" Actually Measure?'
            icon={<LuTimer aria-hidden="true" />}
          >
            <p>
              Instead of accepting the displayed duration as a mysterious
              number, we compared it with the detailed timestamps.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <Definition term="started_at">
              <CodeValue>17:32:19.001537</CodeValue>
            </Definition>
            <Definition term="finished_at">
              <CodeValue>17:32:20.456163</CodeValue>
            </Definition>
            <Definition term="seconds_elapsed">
              <CodeValue>1.454626</CodeValue>
            </Definition>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 text-center sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              Observed in This Run
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#205c38]">
              1.454626 seconds
            </p>
            <p className="mx-auto mt-3 max-w-3xl leading-7 text-gray-700">
              matched the displayed <strong>1.45s</strong> duration and
              corresponded to <CodeValue>started_at</CodeValue> →{" "}
              <CodeValue>finished_at</CodeValue>.
            </p>
          </div>

          <Remember title='Ask "measured from what to what?"'>
            <p>
              A duration becomes much more useful when we understand its
              boundaries. In this specimen, the displayed duration did not begin
              at <CodeValue>remote_event_received_at</CodeValue>.
            </p>
          </Remember>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Inspect the Bookends"
          title="Pipeline Triggered and Pipeline Finished Carry Evidence"
          icon={<LuSquareActivity aria-hidden="true" />}
        >
          <p>
            The lifecycle entries surrounding our configured steps initially
            looked almost decorative. Expanding them proved otherwise.
          </p>
        </SectionHeading>

        <div className="grid gap-5 lg:grid-cols-2">
          <ConceptCard
            title="Pipeline Triggered"
            icon={<LuPlay aria-hidden="true" />}
          >
            <p>
              Observed information included run identity, remote event identity,
              event-received time, triggered/prioritized/start-request/start
              timestamps, queue information, engine-service text, and mapping
              lane.
            </p>
          </ConceptCard>
          <ConceptCard
            title="Pipeline Finished"
            icon={<LuCircleCheck aria-hidden="true" />}
          >
            <p>
              Observed information included started/finished times,
              seconds_elapsed, aborted/stop-request information, runtime/queue
              information, and remote event identity.
            </p>
          </ConceptCard>
        </div>

        <Remember title="Lifecycle activities are evidence-bearing runtime objects">
          <p>
            Do not inspect only the steps you configured. The Pipeline-level
            activities can answer questions about run identity, timing, and
            completion that the individual step entries do not answer alone.
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Investigative Hierarchy"
            title="Identity Exists at Several Levels"
            icon={<LuTag aria-hidden="true" />}
          >
            <p>
              A large Activity entry becomes less intimidating when we ask,
              “What kind of identity is this value giving me?”
            </p>
          </SectionHeading>

          <div className="mx-auto max-w-4xl">
            {[
              [
                "Pipeline identity",
                "Which configured automation?",
                "Lesson 10 - First Execution",
              ],
              [
                "Run identity",
                "Which execution of that automation?",
                "pipeline_run_id",
              ],
              [
                "Remote event identity",
                "Which incoming event is associated with this evidence?",
                "remote_event_id",
              ],
              ["Step identity", "Which configured activity?", "aa / ab"],
              [
                "Record identity",
                "Which Quickbase record moved through the activities?",
                "id: 24",
              ],
            ].map(([title, question, example], index) => (
              <div key={title}>
                <div className="rounded-2xl border border-gray-300 bg-white p-5 sm:p-6">
                  <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    {title}
                  </p>
                  <p className="mt-2 font-bold text-gray-900">{question}</p>
                  <p className="mt-2 font-mono text-sm text-gray-600">
                    {example}
                  </p>
                </div>
                {index < 4 && <FlowArrow />}
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-xl font-extrabold text-[#205c38]">
            Pipeline → Run → Step → Record / Value
          </p>
          <p className="mt-3 text-center text-gray-600">
            with remote event identity available at the lifecycle level.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Quickbase Mastery Method"
          title="Activity Can Reveal Internals Without Explaining Them"
          icon={<LuShieldCheck aria-hidden="true" />}
        >
          <p>
            Some runtime strings are fascinating precisely because they tempt us
            to tell a bigger story than our evidence supports.
          </p>
        </SectionHeading>

        <div className="overflow-x-auto rounded-2xl border border-gray-300 bg-white shadow-sm">
          <table className="w-full min-w-220 border-collapse">
            <thead className="bg-[#205c38] text-white">
              <tr>
                <th className="p-4 text-left">Evidence Level</th>
                <th className="p-4 text-left">What We Can Say</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4">
                  <EvidenceBadge type="OBSERVED" />
                </td>
                <td className="p-4 leading-7">
                  Activity literally exposed strings such as{" "}
                  <CodeValue>prelude-service</CodeValue>,{" "}
                  <CodeValue>engine-service</CodeValue>,{" "}
                  <CodeValue>pipeline-blaze-inline-01d</CodeValue>, and{" "}
                  <CodeValue>mapping_lane: fast</CodeValue>.
                </td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#fbfcfb]">
                <td className="p-4">
                  <EvidenceBadge type="INFERRED" />
                </td>
                <td className="p-4 leading-7">
                  Those labels appear associated with Pipeline scheduling or
                  execution infrastructure.
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <EvidenceBadge type="SPECULATIVE" />
                </td>
                <td className="p-4 leading-7">
                  The exact internal service architecture, responsibilities,
                  topology, communication mechanisms, or implementation behind
                  those labels.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Remember title="Read the evidence without inventing the architecture">
          <p>
            Seeing a service label is not the same thing as understanding the
            undocumented system behind it. The disciplined answer can be:{" "}
            <strong>
              “We observed the label. We do not yet know exactly what it means
              internally.”
            </strong>
          </p>
        </Remember>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Documentation + Experiment"
            title="Why the Activity Log Exists"
            icon={<LuBookOpen aria-hidden="true" />}
          >
            <p>
              Quickbase documentation describes Activity logs as a place to
              inspect Pipeline step execution information, including errors and
              input/output values. Our experiment then attached those ideas to a
              record and Action whose behavior we already knew.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="DOCUMENTED"
              icon={<LuBookOpen aria-hidden="true" />}
            >
              <p>
                Activity provides runtime step information, including
                input/output and error information. Documentation also describes
                visual type coloring for logged values.
              </p>
            </ConceptCard>
            <ConceptCard title="OBSERVED" icon={<LuEye aria-hidden="true" />}>
              <p>
                Our known-good Pipeline exposed those runtime concepts against
                Record #24, Trigger <CodeValue>aa</CodeValue>, and Action{" "}
                <CodeValue>ab</CodeValue>.
              </p>
            </ConceptCard>
          </div>
          <p className="mt-6">
            <EvidenceBadge type="DOCUMENTED" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Research Boundary"
          title="This Is Not Yet the Troubleshooting Lesson"
          icon={<LuCircleAlert aria-hidden="true" />}
        >
          <p>
            View run activity clearly has troubleshooting value. That does not
            mean we should teach every failure mode the moment we discover the
            evidence surface.
          </p>
        </SectionHeading>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Diagnosing every failure",
            "Why a trigger did not fire",
            "Repairing Jinja",
            "Loop failure behavior",
            "API error troubleshooting",
            "Throttling diagnosis",
            "YAML recovery",
            "Remote-system failures",
            "Unattached errors",
            "Retry strategies",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-gray-300 bg-[#f7f8fa] px-4 py-4"
            >
              <LuX
                aria-hidden="true"
                className="shrink-0 text-lg text-gray-400"
              />
              <span className="font-semibold text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-7">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#276749]">
            Future Troubleshooting Lesson
          </p>
          <p className="mt-2 text-xl font-extrabold text-[#205c38]">
            No run occurred vs. a run occurred but failed or produced the wrong
            result
          </p>
          <p className="mt-3 max-w-4xl leading-7 text-gray-700">
            That distinction deserves controlled negative experiments of its
            own. Lesson 11 first teaches us how to read a run that we already
            understand.
          </p>
        </div>
      </section>

      <section className="border-y border-[#17452a] bg-[#205c38] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                <LuActivity aria-hidden="true" />
              </span>
              <div>
                <p className="mb-1 text-sm font-extrabold uppercase tracking-[0.14em] text-white/65">
                  Final Mental Model
                </p>
                <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Reconstruct the Execution
                </h2>
              </div>
            </div>
            <div className="mt-5 max-w-5xl text-lg leading-8 text-white/90">
              <p>
                The student should now be able to move from configuration to
                runtime evidence to resulting application state without
                confusing those layers.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            {[
              [
                "Pipeline Definition",
                "Configured automation — steps, Ref IDs, fields, values.",
              ],
              ["Triggering Event", "A qualifying Quickbase mutation occurs."],
              [
                "Pipeline Lifecycle",
                "Event received → prioritized → start requested → execution started.",
              ],
              [
                "Trigger Activity — aa",
                "Runtime input/output, record identity, values, previous-state information where exposed, schema, and context.",
              ],
              [
                "Action Activity — ab",
                "Target state → action input → returned output.",
              ],
              [
                "Pipeline Completion",
                "Finish time, elapsed execution time, and completion metadata.",
              ],
              [
                "Resulting Application State",
                "What subsequently exists in Quickbase after the run.",
              ],
            ].map(([title, description], index) => (
              <div key={title}>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-6">
                  <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/65">
                    {index + 1}
                  </p>
                  <p className="mt-1 text-xl font-extrabold">{title}</p>
                  <p className="mt-2 leading-7 text-white/85">{description}</p>
                </div>
                {index < 6 && (
                  <div className="flex justify-center py-2">
                    <LuArrowDown
                      aria-hidden="true"
                      className="text-2xl text-white/40"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-2 border-white/25 bg-white p-6 text-[#205c38] sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Lesson 11 Payoff
            </p>
            <p className="mt-2 text-2xl font-extrabold leading-9">
              Activity is runtime evidence that lets us reconstruct what a
              Pipeline execution knew, received, attempted, returned, and when
              those activities occurred.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              And critically: the application can keep changing afterward. The
              historical Activity evidence belongs to that particular run.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Lesson Takeaways"
          title="What Should Now Feel Different?"
          icon={<LuCheck aria-hidden="true" />}
        >
          <p>
            The goal was not learning where to click. The goal was learning how
            to interpret what Quickbase recorded after the click.
          </p>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "One Pipeline definition can produce many separate runs.",
            "View run activity focuses our investigation on one execution.",
            "Ref IDs connect configured steps to runtime evidence.",
            "Lifecycle entries surround the configured steps and carry evidence too.",
            "Target, Input, and Output must be interpreted in the context of the activity being inspected.",
            "Runtime evidence can contain data, schema information, context, and multiple forms of identity.",
            "Record ID lets us trace continuity across Trigger and Action activities.",
            "Our Record Updated specimen exposed previous-state information.",
            "Historical Activity evidence can preserve a state that the current record no longer contains.",
            "Different Quickbase surfaces can expose different timestamp precision and representations.",
            "Observed internal-looking labels do not authorize speculative architecture diagrams.",
            "The other Activity menu options remain intentionally deferred.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-[#b7d8c2] bg-[#f0fff4] p-5"
            >
              <LuCheck
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl text-[#276749]"
              />
              <p className="font-semibold leading-7 text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quiz" className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Knowledge Check"
            title="Read the Evidence, Not Just the Status"
            icon={<LuFileSearch aria-hidden="true" />}
          >
            <p>
              True or False: prove that you can distinguish definition,
              execution, step identity, record identity, timing, and evidence
              boundaries.
            </p>
          </SectionHeading>
          <Quiz />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] p-7 text-white shadow-lg sm:p-9">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <p className="font-extrabold uppercase tracking-[0.14em] text-white/65">
              Research Boundary Reached
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              We Learned to Read One Run.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              We have not yet fully investigated Open YAML snapshot, broader
              View pipeline activity behavior, or failure-driven
              troubleshooting. Those deserve another controlled lesson rather
              than being squeezed into this one.
            </p>
            <p className="mt-5 max-w-4xl text-xl font-extrabold leading-8">
              Lesson 10 turned the machine on. Lesson 11 taught us how to read
              the evidence it left behind.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/10"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-5 py-3 font-extrabold text-white transition hover:bg-white hover:text-[#205c38]"
              >
                <LuArrowLeft aria-hidden="true" />
                Review Lesson 10
              </Link>
              <Link
                href="/lessons"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-extrabold text-[#205c38] transition hover:bg-[#f0fff4]"
              >
                View Lesson Roadmap
                <LuArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
