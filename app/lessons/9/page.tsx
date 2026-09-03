"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBoxes,
  LuBriefcaseBusiness,
  LuCheck,
  LuChevronDown,
  LuChevronUp,
  LuClipboardList,
  LuDatabase,
  LuEye,
  LuFileText,
  LuFilter,
  LuFolderOpen,
  LuGitBranch,
  LuHash,
  LuInfo,
  LuLightbulb,
  LuLock,
  LuNetwork,
  LuPackageOpen,
  LuRepeat2,
  LuRoute,
  LuSearch,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

type EvidenceType =
  | "DOCUMENTED"
  | "PREDICTED"
  | "OBSERVED"
  | "INFERRED"
  | "NOT YET";
type MCQuestion = {
  id: number;
  kind: "mc";
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};
type TFQuestion = {
  id: number;
  kind: "tf";
  prompt: string;
  answer: boolean;
  explanation: string;
};
type QuizQuestion = MCQuestion | TFQuestion;

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    kind: "mc",
    prompt:
      "A step displays ‘3 — Ref ID ab.’ What does the 3 primarily describe?",
    options: [
      "The step's current position in the workflow",
      "The permanent Quickbase field ID",
      "The Channel used by the step",
      "The number of times the step has run",
    ],
    answer: 0,
    explanation:
      "The visible number describes where the step currently appears. In our move experiment, the Action changed position but kept Ref ID ab.",
  },
  {
    id: 2,
    kind: "mc",
    prompt:
      "A Trigger should react when Status changes, but later steps need Assigned To. Where do those ideas belong?",
    options: [
      "Status in Trigger Fields; Assigned To in Fields for subsequent steps",
      "Assigned To in Trigger Fields; Status in Fields to update",
      "Both in Fields to update",
      "Both in the Ref ID",
    ],
    answer: 0,
    explanation:
      "Status answers which field changes matter for initiation. Assigned To answers what business data should be exposed for later workflow use.",
  },
  {
    id: 3,
    kind: "tf",
    prompt:
      "Adding Task Name to Fields for subsequent steps automatically tells a later Action to update Task Name.",
    answer: false,
    explanation:
      "Availability is not an instruction. Exposing Task Name only makes that information available downstream. The Action must separately choose the field and value.",
  },
  {
    id: 4,
    kind: "mc",
    prompt:
      "A downstream Task Name should always become the exact text ‘Pipeline Processed.’ What input style best matches that requirement?",
    options: [
      "Literal value",
      "Earlier-step runtime reference",
      "Search Records collection",
      "Ref ID position",
    ],
    answer: 0,
    explanation:
      "A literal is fixed in the Pipeline definition, so every execution receives the same configured text unless the definition changes.",
  },
  {
    id: 5,
    kind: "mc",
    prompt:
      "A downstream Task Name should reuse Task Name from the triggering record. What input style fits best?",
    options: [
      "Literal value",
      "Earlier-step runtime reference",
      "Step position number",
      "Channel selection",
    ],
    answer: 1,
    explanation:
      "The value should vary with runtime, so the downstream step needs a reference to data exposed by an earlier step.",
  },
  {
    id: 6,
    kind: "tf",
    prompt: "If Search Records finds 12 Tasks, the Query produced one Task.",
    answer: false,
    explanation:
      "Our Search Records specimen explicitly generates a list. Twelve records are a collection, not one record.",
  },
  {
    id: 7,
    kind: "mc",
    prompt:
      "What job does the Loop introduce after Search Records returns a collection?",
    options: [
      "It turns the Pipeline into a new app",
      "It gives the workflow one item from the collection at a time",
      "It permanently changes the Query Ref ID",
      "It authenticates the Quickbase Account",
    ],
    answer: 1,
    explanation:
      "The Query gives us the stack. The Loop provides one current item from that stack so work can happen item by item.",
  },
  {
    id: 8,
    kind: "tf",
    prompt:
      "Once the first step selects Quickbase, every later step automatically uses the Quickbase Channel.",
    answer: false,
    explanation:
      "We observed that Add a step returns to Channel/Logic selection each time. The Channel belongs to the needs of each step, not permanently to the Pipeline.",
  },
  {
    id: 9,
    kind: "tf",
    prompt: "Moving a step necessarily changes its Ref ID.",
    answer: false,
    explanation:
      "Our controlled move experiment changed the Action's visible position while Ref ID ab remained ab.",
  },
  {
    id: 10,
    kind: "mc",
    prompt: "Which statement best describes a Channel?",
    options: [
      "The Pipeline's permission level",
      "The current step number",
      "System/service-specific capabilities available to steps",
      "A runtime record returned by a Query",
    ],
    answer: 2,
    explanation:
      "The Pipeline orchestrates. A Channel supplies capabilities for interacting with a particular system or service.",
  },
  {
    id: 11,
    kind: "mc",
    prompt: "Which memory-hook set best matches our three Lesson 9 specimens?",
    options: [
      "Trigger = Something happened; Query = Go find something; Action = Do something",
      "Trigger = Do something; Query = Authenticate; Action = Find something",
      "Trigger = Store a list; Query = Start workflow; Action = Choose Channel",
      "Trigger = Position; Query = Ref ID; Action = Filter",
    ],
    answer: 0,
    explanation:
      "Those short phrases are memory hooks. The rest of Lesson 9 fills in the richer anatomy behind them.",
  },
  {
    id: 12,
    kind: "mc",
    prompt:
      "A Query returns three records and an Action must process each individually. What new design problem appeared?",
    options: [
      "The Pipeline lost its Channel",
      "The workflow now has a collection that needs item-level processing",
      "The Trigger must become Manual",
      "The Action must receive a new Ref ID",
    ],
    answer: 1,
    explanation:
      "The output shape changed from one item to a collection. That introduces a processing decision such as iteration, bulk handling, or another set-oriented strategy.",
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
  accent = false,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${accent ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-gray-300 bg-white hover:border-[#9fc9ad]"}`}
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

function EvidenceCard({
  type,
  title,
  children,
}: {
  type: EvidenceType;
  title: string;
  children: ReactNode;
}) {
  const classes =
    type === "DOCUMENTED"
      ? "border-blue-300 bg-blue-50"
      : type === "OBSERVED"
        ? "border-[#9fc9ad] bg-[#f0fff4]"
        : type === "PREDICTED"
          ? "border-amber-300 bg-amber-50"
          : type === "INFERRED"
            ? "border-violet-300 bg-violet-50"
            : "border-dashed border-gray-400 bg-gray-50";
  return (
    <div className={`rounded-xl border-2 p-5 ${classes}`}>
      <p className="text-xs font-bold uppercase tracking-[0.12em]">{type}</p>
      <h3 className="mt-2 text-lg font-bold text-[#205c38]">{title}</h3>
      <div className="mt-3 leading-7">{children}</div>
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

function ExperimentCard({
  number,
  title,
  why,
  children,
}: {
  number: string;
  title: string;
  why: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#276749] bg-white">
      <div className="bg-[#205c38] px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">
          Exercise {number}
        </p>
        <h3 className="mt-1 text-2xl font-extrabold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4">
          <p className="font-bold text-[#205c38]">Why this exercise matters</p>
          <p className="mt-2 leading-7">{why}</p>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
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

function Reveal({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-300 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-bold text-[#205c38]">{title}</span>
        {open ? (
          <LuChevronUp className="text-[#276749]" />
        ) : (
          <LuChevronDown className="text-[#276749]" />
        )}
      </button>
      {open && (
        <div className="border-t border-gray-200 bg-[#f7f8fa] p-5 leading-7">
          {children}
        </div>
      )}
    </div>
  );
}

function SpecimenSwitcher() {
  const [active, setActive] = useState<"trigger" | "query" | "action">(
    "trigger",
  );
  const data = {
    trigger: {
      label: "TRIGGER",
      hook: "Something happened.",
      role: "Initiation / event context",
      icon: <LuZap />,
      detail:
        "Our specimen is Quickbase → Record Updated. It starts an execution when its configured event rules qualify and can expose useful runtime context.",
    },
    query: {
      label: "QUERY",
      hook: "Go find something.",
      role: "Retrieval",
      icon: <LuSearch />,
      detail:
        "Our specimen is Quickbase → Search Records. It searches for records and, in our observed Designer, explicitly generates a list.",
    },
    action: {
      label: "ACTION",
      hook: "Do something.",
      role: "Operation",
      icon: <LuSettings2 />,
      detail:
        "Our specimen is Quickbase → Update Record. It needs a target plus the fields and values that should be written.",
    },
  } as const;
  const current = data[active];
  return (
    <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {(["trigger", "query", "action"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-xl border-2 p-4 text-left ${active === key ? "border-[#276749] bg-white shadow-sm" : "border-transparent bg-white/50"}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl text-[#276749]">{data[key].icon}</span>
              <span className="font-bold text-[#205c38]">
                {data[key].label}
              </span>
            </div>
            <p className="mt-2 text-sm">{data[key].hook}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-[#9fc9ad] bg-white p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fff4] text-2xl text-[#276749]">
            {current.icon}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#276749]">
              {current.role}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[#205c38]">
              {current.label}
            </h3>
          </div>
        </div>
        <p className="mt-4 leading-8">{current.detail}</p>
      </div>
    </div>
  );
}

function KnowledgeCheck() {
  const [answers, setAnswers] = useState<Record<number, number | boolean>>({});
  const [graded, setGraded] = useState(false);
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (n, q) => n + (answers[q.id] === q.answer ? 1 : 0),
        0,
      ),
    [answers],
  );
  const complete = Object.keys(answers).length === quizQuestions.length;
  return (
    <section id="knowledge-check" className="scroll-mt-8">
      <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
        <div className="bg-[#205c38] p-7 text-white sm:p-9">
          <p className="font-bold uppercase tracking-[0.15em] text-white/75">
            Part 39 — Interactive Knowledge Check
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Dissect the Pipeline
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
            This quiz mixes scenario selection and True/False. After grading,
            every item explains the architecture behind the answer.
          </p>
        </div>
        <div className="space-y-6 p-6 sm:p-8">
          {quizQuestions.map((q, i) => {
            const selected = answers[q.id];
            const correct = selected === q.answer;
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-[#9fc9ad] bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <p className="text-lg font-semibold leading-8 text-[#205c38]">
                    {q.prompt}
                  </p>
                </div>
                {q.kind === "tf" ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[true, false].map((choice) => {
                      const chosen = selected === choice,
                        isAnswer = q.answer === choice;
                      let cls = "border-gray-300 bg-white";
                      if (chosen && !graded)
                        cls = "border-[#276749] bg-[#f0fff4]";
                      if (graded && isAnswer)
                        cls = "border-[#276749] bg-[#f0fff4]";
                      if (graded && chosen && !isAnswer)
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
                ) : (
                  <div className="mt-5 grid gap-3">
                    {q.options.map((option, idx) => {
                      const chosen = selected === idx,
                        isAnswer = q.answer === idx;
                      let cls = "border-gray-300 bg-white";
                      if (chosen && !graded)
                        cls = "border-[#276749] bg-[#f0fff4]";
                      if (graded && isAnswer)
                        cls = "border-[#276749] bg-[#f0fff4]";
                      if (graded && chosen && !isAnswer)
                        cls = "border-red-300 bg-red-50";
                      return (
                        <button
                          key={option}
                          disabled={graded}
                          onClick={() =>
                            setAnswers((a) => ({ ...a, [q.id]: idx }))
                          }
                          className={`rounded-xl border-2 p-4 text-left leading-7 ${cls}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
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
                          ? "That matches our observed Lesson 9 model."
                          : "This is one of the distinctions that can look similar in the Designer but means something different."}
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
              <>
                <p className="text-xl font-bold text-[#205c38]">
                  Ready to grade the dissection?
                </p>
                <p className="mt-2 leading-7">
                  Answer all 12 questions first. The explanations are part of
                  the lesson.
                </p>
                <button
                  disabled={!complete}
                  onClick={() => setGraded(true)}
                  className="mt-5 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:opacity-40"
                >
                  Grade Knowledge Check
                </button>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    Final Score
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-[#205c38]">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="mt-3 max-w-3xl leading-7">
                    {score === 12
                      ? "Pipeline Anatomist — You are separating identity, structure, data availability, runtime references, collections, and control flow cleanly."
                      : score >= 9
                        ? "Strong Dissection — Review any missed explanations, especially the controls that look similar in the Designer."
                        : score >= 6
                          ? "Developing Model — Revisit Trigger Fields vs downstream fields, position vs Ref ID, and collection vs current item."
                          : "Reopen the Machine — Focus on what job each setting actually performs."}
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

export default function LessonNinePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="font-bold uppercase tracking-[0.18em] text-white/80">
              Quickbase Automation Developer Lab · Lesson 9
            </p>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Research Lesson — Designer Investigation
            </span>
          </div>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Anatomy of a Pipeline
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            What are the actual working parts of a Pipeline, and how do they fit
            together?
          </p>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
            Lesson 8 gave us the machine from the outside. Lesson 9 takes the
            cover off. We inspect real Trigger, Query, and Action steps; test
            upstream/downstream data availability; separate position from Ref
            ID; and watch a Query produce a collection plus Loop.
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">Lab Notebook Mindset</p>
            <p className="mt-2 leading-7 text-white/90">
              Predict. Change one variable. Observe the Designer. Preserve
              evidence. Update the model when Quickbase behaves differently than
              expected.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/8"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/10"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Next Lesson →
            </Link>{" "}
            <a
              href="#exercises"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-3 font-bold"
            >
              <LuClipboardList />
              Skip to Exercises
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section id="investigation" className="mb-14 scroll-mt-8">
          <SectionHeading
            eyebrow="Part 2"
            title="Research Rules for This Lesson"
            icon={<LuBookOpen />}
          >
            <p>
              Several assumptions were close but incomplete. We separate what is
              documented, predicted, observed, and inferred.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <EvidenceCard type="DOCUMENTED" title="What Quickbase tells us">
              <p>
                Platform/UI statements we can directly attribute to Quickbase.
              </p>
            </EvidenceCard>
            <EvidenceCard type="PREDICTED" title="What we expect">
              <p>Our expectation before changing the Designer.</p>
            </EvidenceCard>
            <EvidenceCard type="OBSERVED" title="What actually happened">
              <p>Behavior directly seen during research.</p>
            </EvidenceCard>
            <EvidenceCard type="INFERRED" title="What evidence suggests">
              <p>A reasoned model not yet directly demonstrated as fact.</p>
            </EvidenceCard>
          </div>
          <Remember title="The Designer outranks our assumptions">
            <p>
              If Quickbase behaves differently than our mental model, update the
              model. Do not force the observation to fit the theory.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 3–5"
            title="Start With Add a Step"
            icon={<LuPackageOpen />}
          >
            <p>
              Quickbase first presents Channels and Logic. Why ask for
              capability before operation?
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Observed Add a Step screen
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#205c38]">Channels</span>
                    <span className="rounded-full bg-[#f0fff4] px-3 py-1 text-sm font-bold text-[#276749]">
                      44 observed
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#205c38]">Logic</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold">
                      1 observed
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Handle Errors was the visible Logic option.
                  </p>
                </div>
              </div>
            </div>
            <EvidenceCard type="PREDICTED" title="Lesson 8 prediction">
              <p>
                Channels supply system-specific capabilities, so selecting
                Quickbase should reveal operations that know how to work with
                Quickbase.
              </p>
            </EvidenceCard>
          </div>
          <div id="exercises" className="mt-8 scroll-mt-8">
            <ExperimentCard
              number="9.1"
              title="Choose the Capability Before the Operation"
              why="This turns the Channel idea from architecture into something visible in the Designer."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="font-bold text-[#205c38]">Student task</p>
                  <ol className="mt-3 space-y-2 leading-7">
                    <li>1. Open Add a step.</li>
                    <li>2. Select Quickbase.</li>
                    <li>3. Pause before choosing an operation.</li>
                    <li>4. Inspect what changed.</li>
                  </ol>
                </div>
                <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5">
                  <p className="font-bold text-[#205c38]">
                    Observed categories
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ["5", "Trigger"],
                      ["17", "Action"],
                      ["3", "Query"],
                    ].map((x) => (
                      <div
                        key={x[1]}
                        className="rounded-lg bg-white p-4 text-center"
                      >
                        <p className="text-2xl font-extrabold text-[#276749]">
                          {x[0]}
                        </p>
                        <p className="text-sm font-bold">{x[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <ConceptCard title="Trigger examples" icon={<LuZap />}>
                  <p>
                    Record Created, Record Updated, Record Deleted, On New
                    Event, On New Bulk Event.
                  </p>
                </ConceptCard>
                <ConceptCard title="Action examples" icon={<LuSettings2 />}>
                  <p>
                    Create Record, Update Record, Delete Record, Make Request,
                    Generate Document, bulk-oriented operations.
                  </p>
                </ConceptCard>
                <ConceptCard title="Query examples" icon={<LuSearch />}>
                  <p>Search Records, Search Automations, Get Migrations.</p>
                </ConceptCard>
              </div>
              <div className="mt-5">
                <EvidenceCard
                  type="OBSERVED"
                  title="Selecting a Channel determines the system-specific operations available for the step"
                >
                  <p>
                    Pipeline orchestrates. Channel supplies capabilities. Step
                    uses a capability for its job.
                  </p>
                </EvidenceCard>
              </div>
            </ExperimentCard>
          </div>
          <Remember title="A new step does not inherit the previous Channel">
            <p>
              Each Add a step returned to Channel/Logic selection. The Pipeline
              owns the journey. Each step chooses the tool it needs for its own
              job.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="Our Three Specimens"
            icon={<LuFolderOpen />}
          >
            <p>Simple memory hooks first; real anatomy follows.</p>
            <strong>Choose each hook for more details</strong>
          </SectionHeading>
          <SpecimenSwitcher />
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 7–10"
            title="Specimen One — Trigger: When Record Updated"
            icon={<LuZap />}
          >
            <p>
              Our first Quickbase Trigger gave us a real specimen to dissect.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Observed identity
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-white p-4">
                  <strong>When Record Updated</strong>
                </div>
                <div className="rounded-xl bg-white p-4">Trigger — Webhook</div>
                <div className="rounded-xl bg-white p-4">
                  Step Position 1 · Ref ID aa
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
              <FlowStep icon={<LuLock />} title="Connection" />
              <FlowArrow />
              <FlowStep icon={<LuSettings2 />} title="Details" />
              <FlowArrow />
              <FlowStep icon={<LuFilter />} title="Filters" final />
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ConceptCard title="Channel" icon={<LuNetwork />}>
              <p>What system/service capabilities are available?</p>
            </ConceptCard>
            <ConceptCard title="Account / Connection" icon={<LuLock />} accent>
              <p>What authenticated connection is this step using?</p>
              <p className="mt-2 text-sm text-gray-600">
                Observed: Realm Default Account / Quickbase account.
              </p>
            </ConceptCard>
          </div>
          <Remember title="Lesson 8 this was architecture. Today we can point at it.">
            <p>
              The step visibly contains its Quickbase connection/account
              configuration.
            </p>
          </Remember>
          <ExperimentCard
            number="9.2"
            title="What Must Record Updated Know?"
            why="The Trigger name alone cannot identify what Quickbase should monitor."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <EvidenceCard type="PREDICTED" title="Before configuring">
                <p>Connection, App, Table, and possibly fields.</p>
              </EvidenceCard>
              <EvidenceCard type="OBSERVED" title="What the Designer asked for">
                <p>
                  Quickbase Account → App → Table → Trigger Fields → Fields for
                  subsequent steps → Number of records changed → Filters.
                </p>
              </EvidenceCard>
            </div>
            <p className="mt-5 leading-8">
              Our prediction was broadly correct—but incomplete. Prediction
              makes the observation meaningful; it does not prove we knew the
              answer.
            </p>
          </ExperimentCard>
          <div className="mt-8 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <p className="font-bold text-[#205c38]">Resource scope</p>
            <div className="mx-auto mt-4 flex max-w-lg flex-col items-center">
              <FlowStep icon={<LuBoxes />} title="Automation App" />
              <FlowArrow />
              <FlowStep icon={<LuTable2 />} title="Tasks" final />
            </div>
            <p className="mt-4 leading-7">
              The Pipeline is realm-level, while an individual Quickbase step
              can target specific app/table resources.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 11–14"
            title="Three Different Field Questions"
            icon={<LuTable2 />}
          >
            <p>
              The word field appears repeatedly, but the controls answer
              different questions.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            <ConceptCard title="Trigger Fields" icon={<LuZap />} accent>
              <p>
                <strong>Which field changes matter for initiation?</strong>
              </p>
              <p className="mt-2">Our Trigger used Status.</p>
            </ConceptCard>
            <ConceptCard
              title="Fields for subsequent steps"
              icon={<LuBriefcaseBusiness />}
            >
              <p>
                <strong>
                  What useful business data should later steps be able to use?
                </strong>
              </p>
              <p className="mt-2">Assigned To, later Task Name.</p>
            </ConceptCard>
            <ConceptCard title="Fields to update" icon={<LuSettings2 />}>
              <p>
                <strong>
                  Which target fields should the Action actually change?
                </strong>
              </p>
            </ConceptCard>
          </div>
          <div className="mt-8 rounded-2xl border-4 border-[#205c38] bg-white p-6 text-center">
            <p className="text-2xl font-extrabold text-[#205c38]">
              Triggering Field ≠ Downstream Field ≠ Target Field
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Travel Folder Analogy
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <ConceptCard
                title="Triggering record contains"
                icon={<LuDatabase />}
              >
                <p>
                  Task Name, Status, Due Date, Assigned To, and many other
                  fields.
                </p>
              </ConceptCard>
              <ConceptCard
                title="Travel folder sent forward"
                icon={<LuBriefcaseBusiness />}
                accent
              >
                <p>
                  Assigned To and Task Name were explicitly selected. Quickbase
                  also supplied certain built-in/system/runtime information
                  automatically.
                </p>
              </ConceptCard>
            </div>
          </div>
          <Remember title="Do not teach ‘only selected fields exist downstream’">
            <p>
              Selected business fields can be explicitly exposed downstream,
              while Quickbase also supplies certain built-in/system/runtime
              information automatically.
            </p>
          </Remember>
          <ExperimentCard
            number="9.3"
            title="Change the Travel Folder"
            why="This was one of our strongest one-variable experiments."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 p-5">
                <p className="font-bold text-[#205c38]">Starting state</p>
                <p className="mt-2">
                  Fields for subsequent steps: Assigned To.
                </p>
                <p className="mt-4 font-bold text-[#205c38]">Prediction</p>
                <p className="mt-2">
                  Add Task Name upstream → Task Name should become available
                  downstream.
                </p>
              </div>
              <div className="rounded-xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-5">
                <p className="font-bold text-[#205c38]">Change ONE variable</p>
                <p className="mt-2">Add Task Name.</p>
                <p className="mt-4 font-bold text-[#205c38]">Observe</p>
                <p className="mt-2">
                  Return to Update Record. Task Name is now available.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-5">
              <div className="flex items-center gap-3">
                <LuBadgeCheck className="text-2xl text-[#276749]" />
                <p className="text-xl font-bold text-[#205c38]">
                  Prediction Confirmed
                </p>
              </div>
              <p className="mt-2">
                Earlier-step output/data availability influences later-step
                input possibilities.
              </p>
            </div>
          </ExperimentCard>
          <div className="mt-8 overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Before</th>
                  <th className="px-4 py-3">After</th>
                  <th className="px-4 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Status", "Open", "Complete", "Caused Trigger relevance"],
                  ["Assigned To", "Darian", "Darian", "Useful downstream data"],
                  [
                    "Task Name",
                    "Prepare Reports",
                    "Prepare Reports",
                    "Useful downstream data",
                  ],
                ].map((r) => (
                  <tr key={r[0]} className="border-b">
                    <td className="px-4 py-3 font-semibold text-[#205c38]">
                      {r[0]}
                    </td>
                    <td className="px-4 py-3">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                    <td className="px-4 py-3">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Remember title="A field can be useful later without being the field that caused the Trigger">
            <p>
              Status made the event matter. Assigned To and Task Name did not
              need to change to be useful downstream.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 15–16"
            title="Filters Adapt to the Data Being Evaluated"
            icon={<LuFilter />}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <EvidenceCard type="OBSERVED" title="Assigned To — User field">
              <p>
                Presence-oriented operators such as has value / does not have
                value appeared.
              </p>
            </EvidenceCard>
            <EvidenceCard type="OBSERVED" title="created_at — date/time field">
              <p>is on a date appeared with date and timezone configuration.</p>
            </EvidenceCard>
          </div>
          <Remember title="Available Simple Filter operators vary with field/data type">
            <p>
              We did not build a complete operator matrix, so we do not claim
              exact universal operator sets.
            </p>
          </Remember>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="Number of records changed" icon={<LuHash />}>
              <p>
                Quickbase exposed Any or Set a maximum. Choosing maximum
                revealed an integer input.
              </p>
            </ConceptCard>
            <EvidenceCard type="NOT YET" title="Bulk-event semantics">
              <p>
                Grid edit, imports, APIs, bulk operations, and other mutation
                paths remain future tests.
              </p>
            </EvidenceCard>
          </div>
          <Remember title="10 is not a universal recommendation">
            <p>
              Quickbase AI suggested 10 during research, but threshold choice is
              a workflow engineering decision—not a course rule.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 17–19"
            title="Step Position vs. Ref ID"
            icon={<LuHash />}
          >
            <p>
              They sit together in the Designer, but our move experiment
              separated their jobs.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="Step Position" icon={<LuRoute />}>
              <p className="text-xl font-bold text-[#205c38]">WHERE</p>
              <p className="mt-2">Where the step currently appears.</p>
            </ConceptCard>
            <ConceptCard title="Ref ID" icon={<LuHash />} accent>
              <p className="text-xl font-bold text-[#205c38]">WHICH STEP</p>
              <p className="mt-2">
                Stable identity used to identify/reference that step.
              </p>
            </ConceptCard>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold text-[#205c38]">Classroom Desk Analogy</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-white p-5 text-center">
                <p className="font-bold">Before</p>
                <p className="mt-2 text-2xl font-extrabold">Desk #1 → Alex</p>
              </div>
              <div className="rounded-xl bg-white p-5 text-center">
                <p className="font-bold">After move</p>
                <p className="mt-2 text-2xl font-extrabold">Desk #3 → Alex</p>
              </div>
              <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 text-center">
                <p className="font-bold">Before</p>
                <p className="mt-2 text-2xl font-extrabold">Position 2 → ab</p>
              </div>
              <div className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 text-center">
                <p className="font-bold">After move</p>
                <p className="mt-2 text-2xl font-extrabold">Position 3 → ab</p>
              </div>
            </div>
          </div>
          <Remember title="Position tells me WHERE. Ref ID tells Quickbase WHICH STEP.">
            <p>
              Moving the Action changed visible position while observed Ref ID
              remained ab.
            </p>
          </Remember>
          <div className="grid gap-5 md:grid-cols-2">
            <EvidenceCard type="INFERRED" title="Where did ac go?">
              <p>
                A deleted/earlier-created step may have consumed ac. That would
                fit persistent identifier allocation behavior.
              </p>
            </EvidenceCard>
            <EvidenceCard type="NOT YET" title="Why it stays inferred">
              <p>
                We did not preserve the exact creation/deletion event that
                explains the missing ac. Therefore the explanation is not
                OBSERVED fact.
              </p>
            </EvidenceCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 20–25"
            title="Specimen Two — Action: Update Record"
            icon={<LuSettings2 />}
          >
            <p>
              The Trigger asks what event matters. The Action asks what target
              to act on and what to write.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Target" icon={<LuTarget />} accent>
              <p>Which record should this Action operate against?</p>
            </ConceptCard>
            <ConceptCard title="Field" icon={<LuTable2 />}>
              <p>Which target field should change?</p>
            </ConceptCard>
            <ConceptCard title="Value" icon={<LuFileText />}>
              <p>What value should be written?</p>
            </ConceptCard>
          </div>
          <Remember title="Available data is information—not an instruction">
            <p>
              Making Task Name available from aa does not automatically update
              it. The Action separately chooses field and value.
            </p>
          </Remember>
          <ExperimentCard
            number="9.4"
            title="Where Does This Value Come From?"
            why="The source of an Action value changes the meaning of the workflow."
          >
            <div className="grid gap-5 md:grid-cols-3">
              <ConceptCard title="Literal" icon={<LuFileText />}>
                <p>
                  <strong>Pipeline Changed This</strong>
                </p>
                <p className="mt-2">Same configured value each execution.</p>
              </ConceptCard>
              <ConceptCard title="Runtime Reference" icon={<LuRoute />} accent>
                <p>
                  <strong>Task Name from aa</strong>
                </p>
                <p className="mt-2">Can vary by execution.</p>
              </ConceptCard>
              <ConceptCard title="Jinja / Expression" icon={<LuGitBranch />}>
                <p>Can reference and/or transform runtime data.</p>
              </ConceptCard>
            </div>
            <div className="mt-5 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 p-5">
              <p className="font-bold text-[#205c38]">Lesson boundary</p>
              <p className="mt-2">
                Lesson 9 explains why Jinja has a job. It does not teach Jinja
                syntax.
              </p>
            </div>
          </ExperimentCard>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold text-[#205c38]">
              Why aa matters when referencing data
            </p>
            <p className="mt-3 leading-7">
              Multiple earlier steps might expose Task Name. A later step needs
              an origin: Task Name from which step?
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["aa", "Trigger output", "Task Name"],
                ["ab", "Action context", "Task Name"],
                ["ad", "Search output", "Task Name"],
              ].map((x) => (
                <div
                  key={x[0]}
                  className="rounded-xl border border-[#9fc9ad] bg-white p-5"
                >
                  <p className="font-bold text-[#276749]">{x[0]}</p>
                  <p className="mt-2 text-sm text-gray-600">{x[1]}</p>
                  <p className="mt-3 font-semibold">{x[2]}</p>
                </div>
              ))}
            </div>
          </div>
          <Remember title="Ref IDs give runtime data an origin">
            <p>
              That is where Ref IDs stop looking decorative and become part of
              the data-flow architecture.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 26–33"
            title="Specimen Three — Query: Search Records"
            icon={<LuSearch />}
          >
            <p>
              Search Records changes the shape of the workflow because it can
              return a collection.
            </p>
          </SectionHeading>
          <EvidenceCard
            type="DOCUMENTED"
            title="The Designer told us: This step generates a list"
          >
            <p>
              The UI also described loop, batch action, and Jinja as ways to
              work with items from that list.
            </p>
          </EvidenceCard>
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            {[
              ["Connection", <LuLock key="1" />],
              ["App", <LuBoxes key="2" />],
              ["Table", <LuTable2 key="3" />],
              ["Fields for subsequent steps", <LuBriefcaseBusiness key="4" />],
              ["Date/time comparison behavior", <LuFilter key="5" />],
              ["Limit", <LuHash key="6" />],
              ["Filters", <LuFilter key="7" />],
            ].map((x, i, a) => (
              <div key={String(x[0])} className="w-full">
                <FlowStep
                  icon={x[1] as ReactNode}
                  title={String(x[0])}
                  final={i === a.length - 1}
                />
                {i < a.length - 1 && <FlowArrow />}
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ConceptCard title="Trigger" icon={<LuZap />}>
              <p className="text-xl font-bold text-[#205c38]">What happened?</p>
            </ConceptCard>
            <ConceptCard title="Query" icon={<LuSearch />} accent>
              <p className="text-xl font-bold text-[#205c38]">
                What can I find?
              </p>
            </ConceptCard>
            <ConceptCard title="Action" icon={<LuSettings2 />}>
              <p className="text-xl font-bold text-[#205c38]">
                What should I do?
              </p>
            </ConceptCard>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <p className="font-bold text-[#276749]">Data shape</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {["#101", "#102", "#103"].map((x) => (
                <div
                  key={x}
                  className="rounded-xl border border-[#9fc9ad] bg-white p-5 text-center text-xl font-bold"
                >
                  {x}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xl font-bold text-[#276749]">
              This is a collection, not one record.
            </p>
          </div>
          <Remember title="The shape of a step's output affects what the workflow can do next">
            <p>
              A collection introduces a different processing problem than a
              single record.
            </p>
          </Remember>
          <div className="mt-8 overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
            <div className="bg-[#205c38] p-6 text-white">
              <p className="font-bold uppercase tracking-[0.12em] text-white/75">
                Delightful Observation
              </p>
              <h3 className="mt-2 text-2xl font-extrabold">
                Quickbase Automatically Introduced a Loop
              </h3>
            </div>
            <div className="p-6">
              <div className="mx-auto flex max-w-xl flex-col items-center">
                <FlowStep icon={<LuSearch />} title="Search Records" />
                <FlowArrow />
                <FlowStep
                  icon={<LuRepeat2 />}
                  title="Loop"
                  text="For each item in Search Records — refer to each item as ad"
                />
                <FlowArrow />
                <FlowStep icon={<LuWorkflow />} title="DO" />
                <FlowArrow />
                <FlowStep icon={<LuBadgeCheck />} title="End of Loop" final />
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-6">
            <p className="font-bold text-[#205c38]">Stack-of-Papers Analogy</p>
            <p className="mt-2 leading-7">
              The Query returns #101, #102, #103—the stack. The Loop gives us
              one current item at a time.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["Iteration 1", "#101"],
                ["Iteration 2", "#102"],
                ["Iteration 3", "#103"],
              ].map((x) => (
                <div
                  key={x[0]}
                  className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5 text-center"
                >
                  <p className="text-sm font-bold text-[#276749]">{x[0]}</p>
                  <p className="mt-2 text-2xl font-extrabold">{x[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <Remember title="Query gives us the stack. Loop gives us one item from the stack at a time.">
            <p>Collection and current loop item are not the same data shape.</p>
          </Remember>
          <ExperimentCard
            number="9.5"
            title="Move an Action Into the Loop"
            why="This proves workflow structure can change while step identity remains stable."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 p-5">
                <p className="font-bold text-[#205c38]">Move</p>
                <p className="mt-2">
                  Drag Update Record — Ref ID ab into Loop → Do.
                </p>
              </div>
              <div className="rounded-xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-5">
                <p className="font-bold text-[#205c38]">Observe</p>
                <p className="mt-2">
                  Visible position changes. Ref ID remains ab.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "#101 → execute ab",
                "#102 → execute ab",
                "#103 → execute ab",
              ].map((x) => (
                <div
                  key={x}
                  className="rounded-xl border border-[#9fc9ad] p-5 text-center font-semibold"
                >
                  {x}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border-2 border-dashed border-gray-400 bg-gray-50 p-5">
              <p className="font-bold text-[#205c38]">STOP here</p>
              <p className="mt-2">
                Do not configure the Action against the current loop item yet.
                That belongs later.
              </p>
            </div>
          </ExperimentCard>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ConceptCard title="Loop" icon={<LuRepeat2 />}>
              <p>Individual processing.</p>
            </ConceptCard>
            <ConceptCard title="Bulk / Batch" icon={<LuBoxes />}>
              <p>Set-oriented processing where appropriate.</p>
            </ConceptCard>
            <ConceptCard title="Staging / Helper Table" icon={<LuDatabase />}>
              <p>Persist intermediate work for later processing.</p>
            </ConceptCard>
          </div>
          <EvidenceCard type="NOT YET" title="Preview only">
            <p>
              Detailed loops, batch processing, bulk upsert, staging
              architecture, and performance comparison are future lessons.
            </p>
          </EvidenceCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 34–37"
            title="Put the Three Specimens Side by Side"
            icon={<LuTable2 />}
          />
          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-245 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-4 py-3">Comparison</th>
                  <th className="px-4 py-3">Trigger</th>
                  <th className="px-4 py-3">Query</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Our specimen",
                    "Record Updated",
                    "Search Records",
                    "Update Record",
                  ],
                  ["Observed Ref ID", "aa", "ad", "ab"],
                  [
                    "Memory hook",
                    "Something happened",
                    "Go find something",
                    "Do something",
                  ],
                  [
                    "Primary role",
                    "Initiation/event",
                    "Retrieval",
                    "Operation",
                  ],
                  [
                    "Resource configuration",
                    "Yes",
                    "Yes",
                    "Yes/context dependent",
                  ],
                  [
                    "Can expose runtime data",
                    "Yes",
                    "Yes",
                    "Yes depending on operation",
                  ],
                  [
                    "Can return collection",
                    "Not our focus here",
                    "Yes",
                    "Not our example",
                  ],
                  ["Starts workflow", "Yes", "No", "No"],
                  ["Uses Channel capability", "Yes", "Yes", "Yes"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b">
                    <td className="px-4 py-3 font-semibold text-[#205c38]">
                      {r[0]}
                    </td>
                    <td className="px-4 py-3">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                    <td className="px-4 py-3">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold text-[#276749]">
                Execution Flow — order of work
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuZap />} title="aa Trigger" />
                <FlowArrow />
                <FlowStep icon={<LuSettings2 />} title="ab Action" />
                <FlowArrow />
                <FlowStep icon={<LuSearch />} title="ad Query" />
                <FlowArrow />
                <FlowStep icon={<LuRepeat2 />} title="Loop" final />
              </div>
            </div>
            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-bold text-[#276749]">
                Data Flow — movement of information
              </p>
              <div className="mt-5 flex flex-col items-center">
                <FlowStep icon={<LuDatabase />} title="aa Runtime Output" />
                <FlowArrow />
                <FlowStep icon={<LuRoute />} title="Available Downstream" />
                <FlowArrow />
                <FlowStep icon={<LuSettings2 />} title="ab Input / Reference" />
                <FlowArrow />
                <FlowStep icon={<LuSearch />} title="ad Search Results" />
                <FlowArrow />
                <FlowStep
                  icon={<LuRepeat2 />}
                  title="Loop Current Item"
                  final
                />
              </div>
            </div>
          </div>
          <Remember title="A Pipeline has both an order of work and a movement of information">
            <p>
              Execution flow asks what happens next. Data flow asks what
              information later work can use.
            </p>
          </Remember>
          <div className="mt-8 rounded-3xl border-2 border-[#205c38] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Complete Step Anatomy Vocabulary
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Identity", "Step Position, Ref ID"],
                ["Classification", "Trigger, Query, Action"],
                ["Capability", "Channel / Logic"],
                ["Authentication", "Connection / Account"],
                ["Resource", "App, Table, Record, external resource"],
                [
                  "Configuration",
                  "Fields, Filters, Limits, operation settings",
                ],
                ["Inputs", "Literal, references, expressions/Jinja"],
                ["Outputs", "Runtime result/context downstream"],
                [
                  "Control Context",
                  "Normal sequence, Loop, later conditions/error handling",
                ],
              ].map((x) => (
                <ConceptCard key={x[0]} title={x[0]}>
                  <p>{x[1]}</p>
                </ConceptCard>
              ))}
            </div>
            <p className="mt-6 font-semibold text-[#205c38]">
              This is anatomy vocabulary—not a mandatory checklist for every
              step.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Step Number ≠ Ref ID", "Where vs which step."],
              ["Channel ≠ Account", "Capability vs authenticated connection."],
              [
                "Trigger Field ≠ Downstream Field",
                "Event relevance vs available data.",
              ],
              [
                "Available Field ≠ Update Instruction",
                "Information vs operation.",
              ],
              [
                "Literal ≠ Runtime Reference",
                "Fixed definition value vs execution-specific value.",
              ],
              ["Query Collection ≠ Current Loop Item", "Stack vs one item."],
              [
                "Pipeline Definition ≠ Runtime Execution",
                "Instructions vs one occurrence.",
              ],
            ].map((x) => (
              <div
                key={x[0]}
                className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5"
              >
                <p className="font-bold text-[#205c38]">{x[0]}</p>
                <p className="mt-2">{x[1]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 38"
            title="Research Findings Board"
            icon={<LuEye />}
          >
            <p>
              Months from now, this is where we can see what we proved versus
              what we only suspected.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <EvidenceCard type="OBSERVED" title="Directly observed">
              <ul className="space-y-2">
                <li>Add Step presents Channels and Logic.</li>
                <li>Selecting Quickbase exposes Quickbase operations.</li>
                <li>New steps independently select Channels.</li>
                <li>
                  Quickbase step contains connection/account configuration.
                </li>
                <li>
                  Record Updated uses App/Table/field/filter configuration.
                </li>
                <li>Trigger fields and downstream fields are separate.</li>
                <li>Filter operators varied with selected field type.</li>
                <li>Trigger supports a maximum records-changed threshold.</li>
                <li>Adding Task Name upstream made it available downstream.</li>
                <li>Update Record requires target fields and values.</li>
                <li>Values can be literal/reference/Jinja.</li>
                <li>
                  References expose earlier-step context plus system/meta
                  information.
                </li>
                <li>Search Records generates a list.</li>
                <li>Search Records automatically introduced a Loop.</li>
                <li>Moving ab changed position but preserved Ref ID.</li>
              </ul>
            </EvidenceCard>
            <EvidenceCard type="INFERRED" title="Inferred / not fully tested">
              <ul className="space-y-2">
                <li>
                  Missing ac likely reflects prior identifier
                  allocation/deletion behavior.
                </li>
                <li>
                  Exact maximum-record threshold behavior across every mutation
                  source remains untested.
                </li>
                <li>
                  Complete filter-operator behavior across all Quickbase field
                  types remains untested.
                </li>
                <li>
                  Complete contents/semantics of all system/meta reference
                  values remain untested.
                </li>
              </ul>
            </EvidenceCard>
          </div>
        </section>

        <KnowledgeCheck />

        <section className="mt-14 mb-14">
          <SectionHeading
            eyebrow="Part 40"
            title="Final Exercise — Explain the Machine Without Quickbase Vocabulary"
            icon={<LuTarget />}
          >
            <p>
              If you can rebuild the Quickbase vocabulary from behavior, you
              understand it rather than memorized it.
            </p>
          </SectionHeading>
          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <p className="text-xl font-bold leading-9 text-[#205c38]">
              A change occurs in Tasks. The workflow receives information about
              the changed record. It searches for related records. Three records
              are found. Each is processed individually and an operation is
              performed.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Reveal title="Event listener">
                <p>
                  <strong>Trigger.</strong> Event-driven start.
                </p>
              </Reveal>
              <Reveal title="Search">
                <p>
                  <strong>Query.</strong> Our Search Records specimen asks what
                  can be found.
                </p>
              </Reveal>
              <Reveal title="Three returned records">
                <p>
                  <strong>Collection / list.</strong>
                </p>
              </Reveal>
              <Reveal title="One-at-a-time processing">
                <p>
                  <strong>Loop / current item.</strong>
                </p>
              </Reveal>
              <Reveal title="Operation">
                <p>
                  <strong>Action.</strong>
                </p>
              </Reveal>
              <Reveal title="System capability used">
                <p>
                  <strong>Channel.</strong>
                </p>
              </Reveal>
              <Reveal title="Identity used to refer to a particular step">
                <p>
                  <strong>Ref ID.</strong>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 41"
            title="What We Deliberately Did NOT Learn"
            icon={<LuInfo />}
          >
            <p>
              Lesson 9 brushes against many future topics. This boundary keeps
              the lesson approachable.
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Lesson 10", "Executing the Pipeline"],
              ["Lesson 11", "Activity Log analysis"],
              ["Lesson 12", "Detailed runtime data passing"],
              ["Lesson 13", "Conditions / branching / stopping"],
              ["Lesson 14", "Query engineering"],
              ["Lesson 15", "Collections / loops"],
              ["Lesson 16", "Jinja references"],
              ["Lesson 17", "Jinja transformations"],
              ["Lesson 18", "Dates / scheduling"],
              ["Lesson 19", "Record mutation engineering"],
              ["Lesson 20", "Secondary events / loops"],
            ].map((x) => (
              <div
                key={x[0]}
                className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5"
              >
                <p className="font-bold text-[#276749]">{x[0]}</p>
                <p className="mt-2">{x[1]}</p>
              </div>
            ))}
          </div>
          <Remember title="You were not supposed to understand Jinja yet">
            <p>
              You were supposed to understand why something like Jinja will
              eventually be needed.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 42"
            title="Lesson 9 Exit Model"
            icon={<LuWorkflow />}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["A Pipeline contains Steps.", "Each Step has a particular job."],
              [
                "A Step may use a Channel.",
                "The Channel gives it system/service capabilities.",
              ],
              [
                "A Channel may need an Account.",
                "The Account provides an authenticated connection.",
              ],
              [
                "A Trigger starts the workflow.",
                "It can also bring runtime information with it.",
              ],
              [
                "A Query finds information.",
                "Our Search Records specimen explicitly generated a list.",
              ],
              ["An Action does something.", "It needs a target and values."],
              [
                "Earlier steps can provide data to later steps.",
                "Later steps can reference that runtime information.",
              ],
              [
                "Ref IDs identify steps.",
                "Step positions tell us where they currently appear.",
              ],
              [
                "Collections create processing decisions.",
                "Loops are one strategy; bulk/batch and staging are later considerations.",
              ],
            ].map((x) => (
              <ConceptCard key={x[0]} title={x[0]} icon={<LuCheck />}>
                <p>{x[1]}</p>
              </ConceptCard>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-4 border-[#205c38] bg-white p-7 text-center">
            <p className="text-2xl font-extrabold text-[#205c38]">
              A Pipeline is not merely a row of instructions.
            </p>
            <p className="mt-3 text-xl font-bold text-[#276749]">
              It is an ordered workflow in which steps perform different jobs
              and runtime information flows from one part of the execution into
              another.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-8 text-center sm:p-12">
            <p className="font-bold uppercase tracking-[0.18em] text-white/70">
              Part 43 — Transition to Lesson 10
            </p>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              We&apos;ve Opened the Machine.
            </h2>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center">
              <FlowStep icon={<LuEye />} title="Identified the machine" />
              <FlowArrow />
              <FlowStep icon={<LuPackageOpen />} title="Opened the machine" />
              <FlowArrow />
              <FlowStep
                icon={<LuFolderOpen />}
                title="Identified its major parts"
              />
              <FlowArrow />
              <FlowStep icon={<LuRoute />} title="Followed some data paths" />
            </div>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/20 bg-white/10 p-7">
              <p className="text-xl font-bold">One thing we have not done:</p>
              <p className="mt-3 text-5xl font-extrabold">RUN IT.</p>
            </div>
            <h3 className="mt-10 text-3xl font-extrabold">
              Lesson 10 — Our First Pipeline Execution
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-xl leading-9 text-white/90">
              One tiny Pipeline. One known record. One controlled mutation. One
              prediction. One execution. One observed result.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-2xl font-extrabold">
              Did the machine actually behave the way our model predicts?
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/lessons"
                className="rounded-lg border-2 border-white px-5 py-3 font-bold"
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
