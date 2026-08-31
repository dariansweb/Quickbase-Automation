"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBoxes,
  LuCalendarClock,
  LuCircleHelp,
  LuDatabase,
  LuEye,
  LuFileText,
  LuGitBranch,
  LuLightbulb,
  LuLock,
  LuMail,
  LuNetwork,
  LuRefreshCw,
  LuRepeat2,
  LuRoute,
  LuSearch,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuUsers,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

type TF = {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
};

const quiz: TF[] = [
  {
    id: 1,
    statement:
      "A Pipeline interacting with App A and App B must belong to whichever app contains its trigger.",
    answer: false,
    explanation:
      "Pipelines are realm-level resources. Apps may participate in the workflow, but no participating app becomes the owner of the Pipeline.",
  },
  {
    id: 2,
    statement: "Workflow and Pipeline are best treated as identical concepts.",
    answer: false,
    explanation:
      "Workflow describes the process to accomplish. A Pipeline is Quickbase's configured executable implementation of that workflow.",
  },
  {
    id: 3,
    statement: "Every Pipeline step must change data.",
    answer: false,
    explanation:
      "A step is one unit of work or control. It may retrieve, evaluate, redirect, stop, or act. Data mutation is only one possibility.",
  },
  {
    id: 4,
    statement:
      "Triggered, Scheduled, and Manual describe how execution begins rather than what the Pipeline eventually does.",
    answer: true,
    explanation:
      "Those labels describe initiation. Downstream steps define the actual work performed after execution begins.",
  },
  {
    id: 5,
    statement:
      "If no qualifying trigger event occurs, a triggered Pipeline still creates an empty runtime execution.",
    answer: false,
    explanation:
      "No qualifying event means there is no corresponding execution. That is different from an execution that starts and later finds zero records.",
  },
  {
    id: 6,
    statement:
      "A trigger may contribute runtime information associated with the event that started an execution.",
    answer: true,
    explanation:
      "The trigger can initiate execution and introduce event context that later steps can use.",
  },
  {
    id: 7,
    statement:
      "The Quickbase Channel and a Quickbase Account mean the same thing.",
    answer: false,
    explanation:
      "A Channel supplies system-specific capabilities. An Account or connection supplies an authenticated identity/connection where authentication is required.",
  },
  {
    id: 8,
    statement:
      "A Channel supplies capabilities for interacting with a particular system or service.",
    answer: true,
    explanation:
      "That is the durable model: the Pipeline orchestrates while Channels provide system-specific operations.",
  },
  {
    id: 9,
    statement:
      "An Account should be understood simply as the Pipeline's permission level.",
    answer: false,
    explanation:
      "An Account is better understood as an authenticated connection or identity. The target system decides what that identity may do.",
  },
  {
    id: 10,
    statement:
      "Data produced by an earlier step can become input to a later step.",
    answer: true,
    explanation:
      "Execution flow and data flow coexist. Earlier step outputs can be referenced by later step inputs.",
  },
  {
    id: 11,
    statement:
      "A query returning three records and a query returning one record always create the same downstream design problem.",
    answer: false,
    explanation:
      "One result is a single item. Three results form a collection and introduce different processing choices.",
  },
  {
    id: 12,
    statement:
      "Loops are the only valid way a workflow can deal with collections of records.",
    answer: false,
    explanation:
      "Iteration is one strategy, but bulk/set-oriented operations and staging/helper-table patterns may also be appropriate.",
  },
  {
    id: 13,
    statement:
      "If a Pipeline did not update anything, that proves no Pipeline execution occurred.",
    answer: false,
    explanation:
      "An execution may have started, found no qualifying records, failed, or followed a path that made no mutation. Runtime evidence is needed.",
  },
  {
    id: 14,
    statement:
      "The Pipeline definition describes intended behavior; runtime evidence describes what happened during a particular execution.",
    answer: true,
    explanation:
      "That distinction is foundational for troubleshooting and later Activity Log analysis.",
  },
];

const classify = [
  [
    "Pipeline listens for modified Tasks.",
    "Definition",
    "Persistent configuration.",
  ],
  ["Record ID# = 17.", "Runtime", "A particular value in one execution."],
  [
    "Pipeline contains a Find Records step.",
    "Definition",
    "A configured step belongs to the definition.",
  ],
  [
    "Monday's search returned Record #83.",
    "Runtime",
    "That result belongs to Monday's execution.",
  ],
  [
    "Pipeline contains an Update Record action.",
    "Definition",
    "The action is persistent workflow structure.",
  ],
  [
    "Monday's update changed #83 to Complete.",
    "Runtime",
    "That describes one concrete execution.",
  ],
  [
    "No qualifying event occurred Wednesday.",
    "No Execution",
    "No qualifying event means no corresponding triggered execution.",
  ],
] as const;

function Heading({
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

function Card({
  title,
  icon,
  children,
  accent = false,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm ${accent ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-gray-300 bg-white"}`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#276749] shadow-sm">
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
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#7a5200]">
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

function Arrow() {
  return (
    <div className="flex h-9 items-center justify-center">
      <LuArrowDown className="text-xl text-[#276749]/60" />
    </div>
  );
}

function Step({
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
      <div className="flex gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${final ? "bg-white/15" : "bg-[#f0fff4] text-[#276749]"}`}
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

function DefinitionRuntime() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [graded, setGraded] = useState(false);
  const score = classify.reduce(
    (n, item, i) => n + (answers[i] === item[1] ? 1 : 0),
    0,
  );
  return (
    <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
      <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
        Interactive Classification
      </p>
      <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
        Definition, Runtime, or No Execution?
      </h3>
      <div className="mt-6 space-y-4">
        {classify.map((item, i) => (
          <div
            key={item[0]}
            className="rounded-xl border border-[#9fc9ad] bg-white p-5"
          >
            <p className="font-semibold text-[#205c38]">{item[0]}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {["Definition", "Runtime", "No Execution"].map((choice) => {
                const chosen = answers[i] === choice,
                  correct = item[1] === choice;
                let cls = "border-gray-300 bg-white";
                if (chosen && !graded) cls = "border-[#276749] bg-[#f0fff4]";
                if (graded && correct) cls = "border-[#276749] bg-[#f0fff4]";
                if (graded && chosen && !correct)
                  cls = "border-red-300 bg-red-50";
                return (
                  <button
                    key={choice}
                    disabled={graded}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: choice }))}
                    className={`rounded-lg border-2 p-3 text-sm font-bold ${cls}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {graded && (
              <div
                className={`mt-4 rounded-lg border p-4 ${answers[i] === item[1] ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-red-200 bg-red-50"}`}
              >
                <p className="font-bold">{item[1]}</p>
                <p className="mt-2">{item[2]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-white p-5">
        {!graded ? (
          <button
            disabled={Object.keys(answers).length !== classify.length}
            onClick={() => setGraded(true)}
            className="rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:opacity-40"
          >
            Grade Classification
          </button>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <p className="text-xl font-bold text-[#205c38]">
              Score: {score}/{classify.length}
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setGraded(false);
              }}
              className="rounded-lg border-2 border-[#276749] px-4 py-2 font-bold text-[#276749]"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionExercise() {
  const [many, setMany] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Interactive Scenario
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[#205c38]">
            One Record vs. a Collection
          </h3>
        </div>
        <div className="flex rounded-lg border border-[#9fc9ad] bg-white p-1">
          <button
            onClick={() => setMany(false)}
            className={`rounded-md px-4 py-2 text-sm font-bold ${!many ? "bg-[#276749] text-white" : "text-[#276749]"}`}
          >
            1 Record
          </button>
          <button
            onClick={() => setMany(true)}
            className={`rounded-md px-4 py-2 text-sm font-bold ${many ? "bg-[#276749] text-white" : "text-[#276749]"}`}
          >
            3 Records
          </button>
        </div>
      </div>
      {!many ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card title="Query Result" icon={<LuTable2 />}>
            <p>Child #101</p>
          </Card>
          <Card title="Downstream Shape" icon={<LuSettings2 />}>
            <p>
              A later operation expecting one record can work directly with one
              item.
            </p>
          </Card>
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {["Child #101", "Child #102", "Child #103"].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-[#9fc9ad] bg-white p-5 text-center font-bold text-[#205c38]"
              >
                {x}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-5">
            <p className="font-bold text-[#7a5200]">
              The result is now a collection.
            </p>
            <p className="mt-2">
              Should the workflow iterate item-by-item, use a set-oriented/bulk
              strategy, or stage intermediate data? The result shape changes the
              design question.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [graded, setGraded] = useState(false);
  const score = useMemo(
    () => quiz.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0),
    [answers],
  );
  return (
    <section id="knowledge-check" className="scroll-mt-8">
      <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
        <div className="bg-[#205c38] p-7 text-white sm:p-9">
          <p className="font-bold uppercase tracking-[0.15em] text-white/75">
            Part 16 — Knowledge Check
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Do You See the Machine Yet?
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
            The point is not merely whether you guessed True or False. Every
            item explains why the mental model is right or wrong after grading.
          </p>
        </div>
        <div className="space-y-6 p-6 sm:p-8">
          {quiz.map((q, i) => {
            const selected = answers[q.id],
              correct = selected === q.answer;
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-[#9fc9ad] bg-white p-6"
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-lg font-semibold leading-8 text-[#205c38]">
                    {q.statement}
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[true, false].map((choice) => {
                    const chosen = selected === choice,
                      isAns = q.answer === choice;
                    let cls = "border-gray-300 bg-white";
                    if (chosen && !graded)
                      cls = "border-[#276749] bg-[#f0fff4]";
                    if (graded && isAns) cls = "border-[#276749] bg-[#f0fff4]";
                    if (graded && chosen && !isAns)
                      cls = "border-red-300 bg-red-50";
                    return (
                      <button
                        key={String(choice)}
                        disabled={graded}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [q.id]: choice }))
                        }
                        className={`rounded-xl border-2 p-4 text-left font-bold ${cls}`}
                      >
                        {choice ? "TRUE" : "FALSE"}
                      </button>
                    );
                  })}
                </div>
                {graded && (
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
                          ? "Your model matches the lesson."
                          : "This is one of the mental-model traps Lesson 8 is designed to remove."}
                      </p>
                    </div>
                    <p className="mt-3 leading-7">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
          <div className="rounded-2xl border border-[#9fc9ad] bg-white p-6">
            {!graded ? (
              <button
                disabled={Object.keys(answers).length !== quiz.length}
                onClick={() => setGraded(true)}
                className="rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:opacity-40"
              >
                Grade Knowledge Check
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    Final Score
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-[#205c38]">
                    {score}/{quiz.length}
                  </p>
                  <p className="mt-3 max-w-3xl leading-7">
                    {score === 14
                      ? "Machine Model Locked In — You are separating scope, definition, execution, initiation, channels, accounts, data flow, collections, and evidence cleanly."
                      : score >= 11
                        ? "Strong Foundation — Review any missed explanations, especially definition vs runtime and Channel vs Account."
                        : score >= 8
                          ? "Good Start — Revisit the full-machine model before retrying."
                          : "Rebuild the model around three separations: definition vs execution, initiation vs action, and Channel vs Account."}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAnswers({});
                    setGraded(false);
                  }}
                  className="rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749]"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LessonEightPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 8
          </p>
          <p className="mb-2 text-lg font-semibold text-white/90">
            Pipeline Foundations
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Crossing Into Workflow Automation
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Cross the boundary established in Lesson 7 from native communication
            automation into executable workflows. Build a durable mental model
            of where Pipelines live, how executions begin, and how steps,
            channels, accounts, and runtime data work together.
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">Lesson Philosophy</p>
            <p className="mt-2 leading-7 text-white/90">
              Do not memorize the current screen. Understand the machine well
              enough that the Pipeline designer begins making sense—even when
              the interface changes.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/7"
              className="rounded-lg border-2 border-white px-5 py-3 font-bold"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons"
              className="rounded-lg bg-white px-5 py-3 font-bold text-[#276749]"
            >
              Table of Contents
            </Link>
            <a
              href="#knowledge-check"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold"
            >
              <LuTarget />
              Skip to Knowledge Check ↓
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section className="mb-14">
          <Heading
            eyebrow="Opening"
            title="Pick Up Exactly Where Lesson 7 Ended"
            icon={<LuRoute />}
          >
            <p>
              Communication automation asks whether Quickbase should
              communicate. Pipeline automation gives us a workflow to
              orchestrate.
            </p>
          </Heading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Native Communication Automation" icon={<LuMail />}>
              <p>
                <strong>Something happens / time arrives</strong> → criteria are
                evaluated → communication occurs.
              </p>
            </Card>
            <Card
              title="Pipeline Workflow Automation"
              icon={<LuWorkflow />}
              accent
            >
              <p>
                <strong>
                  Something happens / time arrives / someone initiates
                </strong>{" "}
                → a workflow executes → data can be retrieved → logic evaluated
                → values passed → systems contacted → actions performed.
              </p>
            </Card>
          </div>
          <Remember title="The Big Change">
            <p>
              With Pipelines, starting the automation and what the automation
              eventually does become explicitly composable parts of a workflow.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 1"
            title="Where Does a Pipeline Live?"
            icon={<LuNetwork />}
          >
            <p>
              A field belongs to a table. A table belongs to an app. A report
              belongs to a table. So where does a Pipeline belong?
            </p>
          </Heading>
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em]">
              DOCUMENTED
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#205c38]">
              Pipelines exist at Quickbase realm scope
            </h3>
            <p className="mt-3 leading-8">
              A Pipeline is not contained inside one application. It can
              orchestrate work involving App A, App B, and an external service
              without any one of them owning the Pipeline.
            </p>
          </div>
          <div className="mt-8 rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <div className="mx-auto max-w-3xl rounded-2xl border-2 border-[#276749] bg-white p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#276749]">
                REALM
              </p>
              <p className="mt-2 text-2xl font-extrabold text-[#205c38]">
                Pipeline
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {["App A", "App B", "External Service"].map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 font-bold"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Remember title="Orchestration is coordination, not ownership">
            <p>
              Prefer “realm-level workflow orchestrator” over “master
              controller.” The Pipeline coordinates work involving independent
              resources; it does not own them.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 2"
            title="Workflow vs. Pipeline vs. Step"
            icon={<LuWorkflow />}
          />
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="Workflow" icon={<LuRoute />}>
              <p>The overall process we want accomplished.</p>
            </Card>
            <Card title="Pipeline" icon={<LuWorkflow />} accent>
              <p>
                Quickbase&apos;s configured executable implementation of that
                workflow.
              </p>
            </Card>
            <Card title="Step" icon={<LuSettings2 />}>
              <p>
                One defined unit of <strong>work or control</strong> within the
                Pipeline.
              </p>
            </Card>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold text-[#205c38]">Bus-trip analogy</p>
            <p className="mt-3 leading-8">
              <strong>Workflow:</strong> get students to the museum.{" "}
              <strong>Pipeline:</strong> the executable plan.{" "}
              <strong>Steps:</strong> bus arrives → check attendance → determine
              readiness → notify museum → record departure.
            </p>
          </div>
          <Remember title="A step does not necessarily change data">
            <p>
              A step can detect, retrieve, evaluate/control, perform an action,
              stop, or redirect execution.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Parts 3–4"
            title="What Wakes a Pipeline Up?"
            icon={<LuZap />}
          />
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="Triggered" icon={<LuZap />} accent>
              <p>
                <strong>Something happened.</strong>
              </p>
              <p className="mt-3">EVENT → EXECUTION</p>
            </Card>
            <Card title="Scheduled" icon={<LuCalendarClock />}>
              <p>
                <strong>A time arrived.</strong>
              </p>
              <p className="mt-3">TIME → EXECUTION</p>
            </Card>
            <Card title="Manual" icon={<LuUsers />}>
              <p>
                <strong>Someone explicitly initiates execution.</strong>
              </p>
              <p className="mt-3">HUMAN INITIATION → EXECUTION</p>
            </Card>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card title="Initiation" icon={<LuZap />}>
              <p className="text-xl font-bold text-[#205c38]">
                Why did this execution begin?
              </p>
            </Card>
            <Card title="Workflow Actions" icon={<LuSettings2 />} accent>
              <p className="text-xl font-bold text-[#205c38]">
                What happens after it begins?
              </p>
            </Card>
          </div>
          <Remember title="Triggered / Scheduled / Manual describe initiation—not eventual purpose">
            <p>
              All three initiation models can lead to similar downstream work.
              Starting the workflow and defining its work are separate concepts.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 5"
            title="Pipeline Definition vs. Pipeline Execution"
            icon={<LuRefreshCw />}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Pipeline Definition" icon={<LuFileText />}>
              <p>
                Persistent instructions/configuration that remain when nothing
                is running.
              </p>
            </Card>
            <Card title="Runtime Execution" icon={<LuZap />} accent>
              <p>
                One particular occurrence of that definition actually executing.
              </p>
            </Card>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Monday" icon={<LuZap />}>
              <p>Task #17 qualifies → Runtime Instance A</p>
            </Card>
            <Card title="Tuesday" icon={<LuZap />}>
              <p>Task #42 qualifies → Runtime Instance B</p>
            </Card>
            <Card title="Wednesday" icon={<LuCircleHelp />}>
              <p>No qualifying event → No runtime instance</p>
            </Card>
          </div>
          <Remember title="“Didn't run” is not the same as “ran and found nothing”">
            <p>
              No qualifying event means no execution. A query returning zero
              records means an execution existed and produced an empty result.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 6"
            title="The Trigger Does More Than Say GO"
            icon={<LuZap />}
          >
            <p>
              If Task #17 starts the Pipeline, later steps need to know which
              Task caused the event. The trigger can introduce runtime context.
            </p>
          </Heading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {[
                    ["Record ID#", "17"],
                    ["Task Name", "Prepare November Reports"],
                    ["Status", "Complete"],
                    ["Due Date", "11/10/2026"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-b">
                      <th className="px-5 py-3 text-[#205c38]">{r[0]}</th>
                      <td className="px-5 py-3">{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <Step icon={<LuZap />} title="Event" />
              <Arrow />
              <Step
                icon={<LuRoute />}
                title="Trigger"
                text="Starts execution + introduces context"
              />
              <Arrow />
              <Step
                icon={<LuDatabase />}
                title="Runtime Instance"
                text="Contains particular values"
              />
              <Arrow />
              <Step
                icon={<LuWorkflow />}
                title="Workflow Uses Those Values"
                final
              />
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-gray-300 bg-[#f7f8fa] p-5">
            <p className="font-bold text-[#205c38]">Bus analogy</p>
            <p className="mt-2">
              Bus arrival does not merely yell GO. It also hands the coordinator
              useful context: Bus #142, Driver Susan, Arrival 7:36 AM.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 7"
            title="Definition-Time References vs. Runtime Values"
            icon={<LuDatabase />}
          />
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="Definition" icon={<LuFileText />}>
              <p>Use Status from the trigger.</p>
            </Card>
            <Card title="Runtime #1" icon={<LuZap />} accent>
              <p>Status → Complete</p>
            </Card>
            <Card title="Runtime #2" icon={<LuZap />}>
              <p>Status → Open</p>
            </Card>
          </div>
          <Remember title="Same definition. Different execution. Different runtime values.">
            <p>
              Definition is structure and instructions. Runtime is the
              particular data encountered during one execution.
            </p>
          </Remember>
          <DefinitionRuntime />
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 8"
            title="Pipelines Are Also Data Flows"
            icon={<LuRoute />}
          >
            <p>
              Two flows exist at once: what happens next and what information
              becomes available next.
            </p>
          </Heading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Execution Flow" icon={<LuWorkflow />}>
              <div className="flex flex-col items-center">
                <Step icon={<LuSettings2 />} title="Step A" />
                <Arrow />
                <Step icon={<LuSettings2 />} title="Step B" />
                <Arrow />
                <Step icon={<LuSettings2 />} title="Step C" final />
              </div>
            </Card>
            <Card title="Data Flow" icon={<LuDatabase />} accent>
              <div className="flex flex-col items-center">
                <Step icon={<LuDatabase />} title="Output A" />
                <Arrow />
                <Step icon={<LuDatabase />} title="Input B → Output B" />
                <Arrow />
                <Step icon={<LuDatabase />} title="Input C" final />
              </div>
            </Card>
          </div>
          <Remember title="Earlier steps can produce runtime output that later steps consume">
            <p>
              This is the foundation for references, mapping, queries, loops,
              later Jinja work, and debugging. Do not begin with syntax before
              understanding the data relationship.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Parts 9–10"
            title="Channels and Accounts Solve Different Problems"
            icon={<LuNetwork />}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Channel" icon={<LuNetwork />}>
              <p className="font-bold text-[#205c38]">
                What capabilities exist for interacting with this system?
              </p>
              <p className="mt-3">
                A Channel gives steps system/service-specific operations. The
                Pipeline orchestrates; the Channel supplies capabilities.
              </p>
            </Card>
            <Card title="Account / Connection" icon={<LuLock />} accent>
              <p className="font-bold text-[#205c38]">
                What authenticated connection are we using?
              </p>
              <p className="mt-3">
                The target system determines what that authenticated identity
                can actually do.
              </p>
            </Card>
          </div>
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <Step
              icon={<LuLock />}
              title="Account"
              text="Authenticated connection / identity"
            />
            <Arrow />
            <Step icon={<LuNetwork />} title="Target System" />
            <Arrow />
            <Step
              icon={<LuGitBranch />}
              title="Target System Evaluates Authorization"
              final
            />
          </div>
          <Remember title="Pipeline management permission and step authentication are separate questions">
            <p>
              Do not reduce Account to “permission.” Authentication supplies
              identity/connection; authorization is evaluated by the target
              system.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 11"
            title="How Does Data Move Between Steps?"
            icon={<LuDatabase />}
          />
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
            <Step
              icon={<LuZap />}
              title="Trigger"
              text="Task #17 modified → output includes Record ID# = 17"
            />
            <Arrow />
            <Step
              icon={<LuSearch />}
              title="Find Records"
              text="Consumes earlier Record ID# → produces a result"
            />
            <Arrow />
            <Step
              icon={<LuSettings2 />}
              title="Later Step"
              text="Consumes values produced earlier"
              final
            />
          </div>
          <Remember title="Teach step outputs and references before variables">
            <p>
              First understand that one step produces output and another step
              can consume a reference to it. Later lessons can add variables,
              Jinja, and transformation syntax.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 12"
            title="One Record vs. a Collection"
            icon={<LuTable2 />}
          />
          <CollectionExercise />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card title="Loop / Iteration" icon={<LuRepeat2 />}>
              <p>Process #101, then #102, then #103.</p>
            </Card>
            <Card title="Bulk Operations" icon={<LuBoxes />}>
              <p>
                Operate on a set/batch when individual step-by-step processing
                is unnecessary.
              </p>
            </Card>
            <Card title="Staging / Helper Table" icon={<LuDatabase />}>
              <p>
                Some architectures write intermediate data to a dedicated
                helper/staging table before later processing.
              </p>
            </Card>
          </div>
          <div className="mt-6 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 p-6">
            <p className="font-bold text-[#205c38]">Not Yet</p>
            <p className="mt-2">
              Lesson 8 acknowledges loops, bulk processing, and staging
              strategies. It does not teach them. A staging/helper table is a
              design pattern, not a special native “temporary table” object.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 13"
            title="Why the Activity Log Matters"
            icon={<LuEye />}
          >
            <p>
              The definition tells us what was supposed to happen. Runtime
              evidence tells us what actually happened.
            </p>
          </Heading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Pipeline Definition" icon={<LuFileText />}>
              <p className="text-lg font-bold text-[#205c38]">
                What was supposed to happen?
              </p>
            </Card>
            <Card title="Activity Log" icon={<LuEye />} accent>
              <p className="text-lg font-bold text-[#205c38]">
                What actually happened?
              </p>
              <p className="mt-3">
                Detailed Activity Log work comes later, but this becomes our
                primary runtime evidence source.
              </p>
            </Card>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Didn't run",
              "Ran and failed",
              "Ran and found nothing",
              "Ran successfully but produced an unexpected result",
            ].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 font-semibold text-[#205c38]"
              >
                {x}
              </div>
            ))}
          </div>
          <Remember title="Evidence outranks assumption">
            <p>
              Future experiments follow DOCUMENTED → PREDICTION → EXECUTION →
              OBSERVED → ACTIVITY LOG EVIDENCE → EXPLANATION. If evidence
              disagrees with our theory, investigate.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <div className="overflow-hidden rounded-3xl border-4 border-[#205c38]">
            <div className="bg-[#205c38] p-7 text-white">
              <p className="font-bold uppercase tracking-[0.15em] text-white/75">
                Part 14
              </p>
              <h2 className="mt-2 text-4xl font-extrabold">
                Assemble the Whole Machine
              </h2>
            </div>
            <div className="bg-[#f0fff4] p-6 sm:p-8">
              <div className="grid gap-5 lg:grid-cols-2">
                {[
                  [
                    "REALM",
                    "Pipeline lives at realm scope.",
                    <LuNetwork key="1" />,
                  ],
                  [
                    "PIPELINE",
                    "Persistent executable workflow definition.",
                    <LuWorkflow key="2" />,
                  ],
                  [
                    "INITIATION",
                    "Triggered / Scheduled / Manual.",
                    <LuZap key="3" />,
                  ],
                  [
                    "EXECUTION",
                    "One runtime instance begins.",
                    <LuRefreshCw key="4" />,
                  ],
                  [
                    "STEPS",
                    "Units of work or control.",
                    <LuSettings2 key="5" />,
                  ],
                  [
                    "CHANNELS",
                    "System-specific capabilities.",
                    <LuNetwork key="6" />,
                  ],
                  [
                    "ACCOUNTS",
                    "Authenticated connections where required.",
                    <LuLock key="7" />,
                  ],
                  [
                    "RUNTIME DATA",
                    "Earlier outputs become later inputs.",
                    <LuDatabase key="8" />,
                  ],
                  [
                    "COLLECTION DECISIONS",
                    "Single item? Collection? Loop? Bulk? Staging?",
                    <LuTable2 key="9" />,
                  ],
                  [
                    "ACTIVITY LOG",
                    "Runtime evidence of what actually occurred.",
                    <LuEye key="10" />,
                  ],
                ].map(([title, text, icon]) => (
                  <Card
                    key={String(title)}
                    title={String(title)}
                    icon={icon as ReactNode}
                  >
                    <p>{String(text)}</p>
                  </Card>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-white p-6 text-center">
                <p className="text-xl font-extrabold leading-8 text-[#205c38]">
                  A Pipeline is a realm-level workflow orchestrator whose
                  executions proceed through defined steps, use channels to
                  interact with systems, authenticate through appropriate
                  connections, and move runtime data from earlier work into
                  later work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <Heading
            eyebrow="Part 15"
            title="Communication Automation vs. Pipelines"
            icon={<LuTable2 />}
          />
          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-245 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-4 py-3">Concept</th>
                  <th className="px-4 py-3">Native Communication Automation</th>
                  <th className="px-4 py-3">Pipelines</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Event-driven", "Yes", "Yes"],
                  ["Time-driven", "Yes", "Yes"],
                  [
                    "Manual initiation",
                    "Not part of communication mechanisms studied",
                    "Yes",
                  ],
                  [
                    "Primary destination",
                    "Communication",
                    "General workflow execution",
                  ],
                  [
                    "Explicit workflow composition",
                    "Specialized feature configuration",
                    "Yes",
                  ],
                  [
                    "Multiple kinds of work",
                    "Limited to communication feature purpose",
                    "Core capability",
                  ],
                  [
                    "Cross-system orchestration",
                    "Not the fundamental model",
                    "Core capability",
                  ],
                  [
                    "Runtime step outputs",
                    "Not exposed as a general workflow-building mechanism",
                    "Fundamental",
                  ],
                  [
                    "Queries / loops / transformations",
                    "Not the model studied",
                    "Available in Pipelines",
                  ],
                  [
                    "Activity evidence",
                    "Communication-specific history/results",
                    "Pipeline Activity Log",
                  ],
                ].map((r) => (
                  <tr key={r[0]} className="border-b">
                    <td className="px-4 py-3 font-semibold text-[#205c38]">
                      {r[0]}
                    </td>
                    <td className="px-4 py-3">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 p-6">
            <p className="font-bold text-[#205c38]">Not Yet</p>
            <p className="mt-2">
              Detailed Jinja, loops, bulk processing, staging architecture,
              queries, YAML, schema refresh, error handling, and deep Activity
              Log work are intentionally deferred.
            </p>
          </div>
        </section>

        <Quiz />

        <section className="mt-14 mb-14">
          <Heading
            eyebrow="Part 17"
            title="Lesson 8 Exit Challenge"
            icon={<LuTarget />}
          />
          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-xl font-bold leading-9 text-[#205c38]">
              A Pipeline begins when a Task changes. It receives information
              about that Task, finds three related records, evaluates each one,
              updates qualifying records in another Quickbase app, and
              eventually contacts an external service.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["Where does the Pipeline live?", "Realm."],
                ["What initiates this example?", "Trigger / event."],
                [
                  "What is one occurrence called?",
                  "Execution / runtime instance.",
                ],
                [
                  "Where does original Task data enter?",
                  "Trigger output / event context.",
                ],
                ["What are the units of work/control?", "Steps."],
                ["What supplies system-specific capabilities?", "Channels."],
                [
                  "What supplies authentication where required?",
                  "Accounts / connections.",
                ],
                [
                  "What happens when three records are returned?",
                  "The result is a collection requiring an appropriate processing strategy.",
                ],
                [
                  "What evidence helps determine what actually happened?",
                  "Activity Log.",
                ],
              ].map((x) => (
                <Card key={x[0]} title={x[0]} icon={<LuCircleHelp />}>
                  <p>{x[1]}</p>
                </Card>
              ))}
            </div>
          </div>
          <Remember title="You have not yet learned how to build this workflow">
            <p>
              You have learned what kind of machine would be required to execute
              it. That is Lesson 8.
            </p>
          </Remember>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-8 text-center sm:p-12">
            <p className="font-bold uppercase tracking-[0.18em] text-white/70">
              Lesson 8 Complete
            </p>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              You Can See the Machine.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-white/90">
              Buttons can move. Labels can evolve. Realm scope, execution,
              runtime context, steps, Channels, Accounts, data flow,
              collections, and runtime evidence are the durable ideas that make
              the Pipeline designer understandable.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/lessons/9"
                className="rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]"
              >
                Continue to Lesson 9 — Anatomy of a Pipeline →
              </Link>
              <a
                href="#knowledge-check"
                className="rounded-lg border-2 border-white px-5 py-3 font-bold"
              >
                Retake Knowledge Check
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
