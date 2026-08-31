"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBellRing,
  LuBookOpen,
  LuBoxes,
  LuCalendarClock,
  LuCheck,
  LuCircleHelp,
  LuClock3,
  LuDatabase,
  LuGitBranch,
  LuLightbulb,
  LuMail,
  LuNetwork,
  LuRefreshCw,
  LuRepeat2,
  LuRoute,
  LuSearch,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuUsers,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

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
      "When Status changes to Complete, email the supervisor. This requirement alone gives us a reason to leave native communication automation and use workflow orchestration.",
    answer: false,
    explanation:
      "A record event leading directly to communication is exactly what the specialized communication mechanisms already studied are designed to handle. Do not escalate merely because a broader orchestration capability exists.",
  },
  {
    id: 2,
    statement:
      "When Status changes to Complete, find all other Open Tasks assigned to the same user. This requirement still fits naturally inside communication automation.",
    answer: false,
    explanation:
      "The requirement has moved beyond evaluating the triggering record. Automation must retrieve additional records and continue processing what it finds.",
  },
  {
    id: 3,
    statement:
      "Every Monday send management a composed briefing containing three current Quickbase reports. This necessarily requires workflow orchestration because multiple reports are involved.",
    answer: false,
    explanation:
      "Multiple pieces of information do not automatically imply orchestration. Scheduled Custom Email can naturally compose multiple reports when the communication itself is the product.",
  },
  {
    id: 4,
    statement:
      "Remind each Assigned To user three days before their Task's Due Date. We need workflow orchestration because every Task may have a different Due Date.",
    answer: false,
    explanation:
      "Reminder already models record-relative date communication. Different dates across records are precisely the kind of timing requirement a Reminder is meant to express.",
  },
  {
    id: 5,
    statement:
      "Find every overdue Task, modify each qualifying record, then use the results to determine what happens next. This still fits naturally within the communication mechanisms studied so far.",
    answer: false,
    explanation:
      "Retrieval, iteration, mutation, and continuation are strong orchestration signals. Communication is no longer the dominant action.",
  },
  {
    id: 6,
    statement:
      "Every Friday send the Open Tasks report to everyone in the Participant role. Because this happens repeatedly, workflow orchestration is required.",
    answer: false,
    explanation:
      "Recurring does not mean orchestration. A Subscription may express periodic report delivery directly and with less machinery.",
  },
  {
    id: 7,
    statement:
      "If Status is Complete AND Assigned To is not empty, send a Custom Email. Because the requirement contains Boolean logic, workflow orchestration is required.",
    answer: false,
    explanation:
      "Boolean complexity does not define the boundary. Communication mechanisms already evaluate criteria, all/any logic, and grouped conditions.",
  },
  {
    id: 8,
    statement:
      "When a Task becomes Complete, create another Quickbase record using values from the completed Task. Because a familiar record event initiated it, this still belongs naturally to the same communication automation model.",
    answer: false,
    explanation:
      "The trigger may be familiar, but the required action has changed. Automated data creation is no longer merely communication and points toward a broader workflow capability.",
  },
  {
    id: 9,
    statement:
      "Every Monday send a report, but don't send it when the report is empty. The conditional behavior means we need general workflow branching.",
    answer: false,
    explanation:
      "Not every conditional choice implies orchestration. Scheduled communication already includes empty-report behavior, so the specialized mechanism may still completely express the requirement.",
  },
  {
    id: 10,
    statement:
      "For each overdue Task, check whether a related Follow-Up exists. Create one only when none exists. This still fits naturally inside a Reminder because Due Date is involved.",
    answer: false,
    explanation:
      "The presence of a date does not define the architecture. The dominant process is retrieve → iterate → check related data → branch → create, which is orchestration territory.",
  },
  {
    id: 11,
    statement:
      "Send an email when Status changes, and include the previous and current values. Because both old and current state are needed, workflow orchestration is required.",
    answer: false,
    explanation:
      "Native communication mechanisms already represent record transitions and previous/current values. Do not escalate simply because the email contains change context.",
  },
  {
    id: 12,
    statement:
      "When a Task becomes Complete, find that user's remaining Open Tasks, identify the overdue ones, create missing Follow-Ups, update a tracking record, and finally email the supervisor. Because the workflow ends with an email, this is fundamentally communication automation.",
    answer: false,
    explanation:
      "The email is merely the last action. The actual requirement is an orchestrated business process containing retrieval, decisions, iteration, creation, updates, and continuation. The final action does not define the architecture of everything that came before it.",
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

function QuestionReveal({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-[#276749]">
            <LuCircleHelp />
          </span>
          <p className="font-semibold leading-7 text-[#205c38]">{question}</p>
        </div>
        <span className="shrink-0 text-sm font-bold text-[#276749]">
          {open ? "Hide" : "Reveal"}
        </span>
      </button>
      {open && (
        <div className="mt-4 rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4 leading-7">
          {answer}
        </div>
      )}
    </div>
  );
}

function BoundaryQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
        0,
      ),
    [answers],
  );
  const complete = Object.keys(answers).length === quizQuestions.length;

  return (
    <section id="quiz" className="scroll-mt-8 pt-4">
      <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
        <div className="bg-[#205c38] p-7 text-white sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="font-bold uppercase tracking-[0.15em] text-white/75">
                Lesson 7 Boundary Quiz
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Communication or Orchestration?
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                Every item tests architectural judgment rather than menu
                terminology.
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
          <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">Quiz Convention</p>
            <p className="mt-2 leading-7 text-white/90">
              TRUE = the requirement can naturally remain within the specialized
              communication mechanisms studied so far.
            </p>
            <p className="mt-1 leading-7 text-white/90">
              FALSE = the statement crosses into orchestration territory or
              claims escalation when it is not needed.
            </p>
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
                          ? "Your boundary judgment matched the lesson model."
                          : "This boundary is intentionally deceptive."}
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
                  Ready to draw the line?
                </h3>
                <p className="mt-2 leading-7">
                  Answer all 12 questions. The traps are deliberate: recurring ≠
                  orchestration, Boolean logic ≠ orchestration, multiple reports
                  ≠ orchestration, and email at the end ≠ communication
                  architecture.
                </p>
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() => setShowResults(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <LuBadgeCheck />
                  Grade Boundary Quiz
                </button>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    Final Score
                  </p>
                  <p className="mt-2 text-4xl font-extrabold text-[#205c38]">
                    {score} / 12
                  </p>
                  <p className="mt-3 max-w-3xl leading-7">
                    {score === 12
                      ? "Boundary Architect — You are identifying architecture rather than reacting to words like email, date, or condition."
                      : score >= 9
                        ? "Workflow Thinker — You understand the boundary. Review the traps involving recurring schedules, Boolean logic, and requirements that merely end with an email."
                        : score >= 6
                          ? "Automation Builder — You understand the communication mechanisms, but some workflow requirements are still disguising themselves as familiar problems."
                          : "Revisit the Boundary — Ask one question: Is communication the intended action, or must multiple dependent operations advance a business process?"}
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
                  <LuRefreshCw />
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

export default function LessonSevenPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 7
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            From Communication Automation to Workflow Orchestration
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            When a business requirement stops asking “Should Quickbase send
            something?” and starts asking “What needs to happen next?”
          </p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
            Up through Lesson 6, we learned a capable family of communication
            mechanisms. Eventually a requirement asks Quickbase to find
            something, use what it finds, make another decision, change data,
            repeat an action, and continue the process.
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">
              This lesson contains no new Quickbase builder to configure.
            </p>
            <p className="mt-2 leading-7 text-white/90">
              Instead, we are going to discover the capability our requirements
              are beginning to demand.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/6"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Previous Lesson
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
              <LuTarget />
              Skip to Boundary Quiz ↓
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Look How Far Communication Automation Took Us"
            icon={<LuBookOpen />}
          >
            <p>
              The specialized communication tools are not inadequate. They solve
              their intended problems very well, and learning a broader
              capability later does not make them obsolete.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Notification / Triggered Custom Email"
              icon={<LuBellRing />}
            >
              <p>
                <strong>Record event → evaluation → communication</strong>
              </p>
              <p className="mt-3">
                “When this happens to a record, tell somebody.”
              </p>
            </ConceptCard>
            <ConceptCard title="Scheduled Custom Email" icon={<LuClock3 />}>
              <p>
                <strong>
                  Schedule → current report information → communication
                </strong>
              </p>
              <p className="mt-3">
                “At this scheduled time, communicate what is currently true.”
              </p>
            </ConceptCard>
            <ConceptCard title="Subscription" icon={<LuTable2 />}>
              <p>
                <strong>Report → recurring delivery → recipients</strong>
              </p>
              <p className="mt-3">
                “Send these people this report periodically.”
              </p>
            </ConceptCard>
            <ConceptCard title="Reminder" icon={<LuCalendarClock />}>
              <p>
                <strong>
                  Record date → temporal offset → criteria → recipient →
                  communication
                </strong>
              </p>
              <p className="mt-3">
                “Tell somebody when this record approaches its important date.”
              </p>
            </ConceptCard>
          </div>
          <Remember title="These are real automation">
            <p>
              The fact that we are about to learn something more general does
              not reduce the value of specialized mechanisms that clearly solve
              a requirement.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="The Pattern We've Been Using"
            icon={<LuRoute />}
          />
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <FlowStep icon={<LuZap />} title="Something Happens" />
            <FlowArrow />
            <FlowStep icon={<LuGitBranch />} title="Quickbase Evaluates" />
            <FlowArrow />
            <FlowStep
              icon={<LuMail />}
              title="A Communication Action Occurs"
              final
            />
          </div>
          <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-white p-6 text-center sm:p-8">
            <p className="text-2xl font-extrabold text-[#205c38]">
              What if sending the communication isn&apos;t the end of the
              requirement?
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 3–4"
            title="Enter the Mind of the Builder"
            icon={<LuSettings2 />}
          >
            <p>
              The requirement begins comfortably: “When a Task becomes
              Complete…” Then the business owner keeps talking.
            </p>
          </SectionHeading>
          <div className="rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <p className="text-xl font-bold text-[#205c38]">
              “When a Task becomes Complete, find all of that person&apos;s
              other Open Tasks.”
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <ConceptCard title="WHEN" icon={<LuZap />}>
                <p>Task becomes Complete.</p>
              </ConceptCard>
              <ConceptCard title="READ" icon={<LuDatabase />}>
                <p>Who is Assigned To?</p>
              </ConceptCard>
              <ConceptCard title="FIND" icon={<LuSearch />}>
                <p>
                  Other records where Assigned To matches and Status = Open.
                </p>
              </ConceptCard>
            </div>
            <div className="mt-6 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-5">
              <p className="font-bold text-[#7a5200]">Find them how?</p>
              <p className="mt-2 leading-7">
                The requirement has changed from evaluating the triggering
                record to retrieving additional data.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 5"
            title="The Business Process Is Bigger Than the Email"
            icon={<LuWorkflow />}
          />
          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Business Process" icon={<LuUsers />}>
              <p>
                <strong>What the organization needs to happen.</strong>
              </p>
              <p className="mt-3">
                Remaining obligations should be reviewed, overdue work
                addressed, tracking updated, and responsible people informed.
              </p>
            </ConceptCard>
            <ConceptCard title="Workflow" icon={<LuRoute />}>
              <p>
                <strong>
                  The ordered sequence of activities used to carry out the
                  business process.
                </strong>
              </p>
              <p className="mt-3">
                Complete Task → find remaining Tasks → identify overdue work →
                create follow-up work → update tracking → notify supervisor.
              </p>
            </ConceptCard>
            <ConceptCard title="Orchestration" icon={<LuNetwork />}>
              <p>
                <strong>
                  The coordination of those activities, including data,
                  decisions, dependencies, and resulting actions.
                </strong>
              </p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="Communication Is an Action, Not the Definition of Automation"
            icon={<LuBoxes />}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["COMMUNICATE", "Send an email.", <LuMail key="1" />],
              ["READ", "Retrieve information.", <LuDatabase key="2" />],
              ["FIND", "Locate qualifying records.", <LuSearch key="3" />],
              ["CREATE", "Create another record.", <LuBoxes key="4" />],
              ["MODIFY", "Change existing data.", <LuSettings2 key="5" />],
              ["DECIDE", "Choose what happens next.", <LuGitBranch key="6" />],
              [
                "REPEAT",
                "Perform an action for multiple results.",
                <LuRepeat2 key="7" />,
              ],
              [
                "CONTINUE",
                "Use one result to determine another action.",
                <LuRoute key="8" />,
              ],
            ].map(([title, text, icon]) => (
              <ConceptCard
                key={String(title)}
                title={String(title)}
                icon={icon as ReactNode}
              >
                <p>{String(text)}</p>
              </ConceptCard>
            ))}
          </div>
          <Remember title="Email is one possible automated action. It is not the boundary of automation.">
            <p>
              Once a requirement coordinates data and actions, the architecture
              is no longer defined by whether an email appears somewhere in the
              sequence.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 7"
            title="Evaluation vs. Orchestration"
            icon={<LuGitBranch />}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Evaluation
              </p>
              <p className="mt-3 text-2xl font-bold text-[#205c38]">
                Should this action occur?
              </p>
              <ul className="mt-5 space-y-3 leading-7">
                <li>Did the record change?</li>
                <li>Which fields changed?</li>
                <li>Does Status equal Complete?</li>
                <li>Is this record three days from Due Date?</li>
                <li>Does this report contain records?</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Orchestration
              </p>
              <p className="mt-3 text-2xl font-bold text-[#205c38]">
                What happens next, and what does the next step need from the
                previous one?
              </p>
              <ul className="mt-5 space-y-3 leading-7">
                <li>What information did that give us?</li>
                <li>What other records do we need?</li>
                <li>What did we find?</li>
                <li>Which path should we take?</li>
                <li>What should we change?</li>
                <li>What happens for each result?</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 8"
            title="Revisit Our Automation Architecture"
            icon={<LuNetwork />}
          >
            <p>
              Earlier lessons concentrated on event detection and rule
              evaluation. Now we zoom outward toward the consumer/workflow and
              resulting actions.
            </p>
          </SectionHeading>
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            {[
              ["SOURCE / REQUEST", <LuTarget key="1" />],
              ["DATA MUTATION", <LuDatabase key="2" />],
              ["CHANGE / EVENT", <LuZap key="3" />],
              ["RULE EVALUATION", <LuGitBranch key="4" />],
              ["CONSUMER / WORKFLOW", <LuWorkflow key="5" />],
              ["ACTION", <LuSettings2 key="6" />],
              ["RESULTING DATA / STATE", <LuDatabase key="7" />],
              ["POSSIBLE NEW EVENTS", <LuRefreshCw key="8" />],
            ].map(([title, icon], i, a) => (
              <div key={String(title)} className="w-full">
                <FlowStep
                  icon={icon as ReactNode}
                  title={String(title)}
                  final={i === a.length - 1}
                />
                {i < a.length - 1 && <FlowArrow />}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 9–12"
            title="The Mind Benders Escalate"
            icon={<LuTriangleAlert />}
          />
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Mind Bender #2 — Read → Find → Decide
              </p>
              <p className="mt-3 text-xl font-bold text-[#205c38]">
                When a Task becomes Complete, find the same user&apos;s other
                Open Tasks and determine whether any are overdue.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-5">
                {["TRIGGER", "READ", "FIND", "EVALUATE", "DECIDE"].map((x) => (
                  <div
                    key={x}
                    className="rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-4 text-center font-bold text-[#205c38]"
                  >
                    {x}
                  </div>
                ))}
              </div>
              <p className="mt-5 leading-8">
                The important question is now what the result of one operation
                causes us to do next.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Mind Bender #3 — Data Has to Travel
              </p>
              <p className="mt-3 text-lg leading-8">
                Step A discovers <strong>Assigned To = Bob</strong>. Step B
                needs that value to find Bob&apos;s other Open Tasks.
              </p>
              <div className="mx-auto mt-5 flex max-w-xl flex-col items-center">
                <FlowStep
                  icon={<LuDatabase />}
                  title="Step A Output"
                  text="Assigned To = Bob"
                />
                <FlowArrow />
                <FlowStep
                  icon={<LuSearch />}
                  title="Step B Input"
                  text="Find Tasks where Assigned To = Bob"
                  final
                />
              </div>
              <Remember title="Multi-step automation requires a way to pass data between steps">
                <p>
                  We are not answering how yet. The important thing is
                  recognizing why such a capability must exist.
                </p>
              </Remember>
            </div>
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Mind Bender #4 — One Record Becomes Many
              </p>
              <p className="mt-3 text-xl font-bold text-[#205c38]">
                The search returns 7 Open Tasks. Increase Priority for every
                overdue Task.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Task #18",
                  "Task #22",
                  "Task #27",
                  "Task #31",
                  "Task #36",
                  "Task #42",
                  "Task #48",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-3 text-center"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <p className="mt-5 leading-8">
                A workflow may need to iterate over a collection of results.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
                Mind Bender #5 — Don&apos;t Create Duplicates
              </p>
              <p className="mt-3 text-xl font-bold">
                For every overdue Task, create a Follow-Up record—but only if an
                active Follow-Up does not already exist.
              </p>
              <div className="mx-auto mt-6 flex max-w-xl flex-col items-center">
                <FlowStep icon={<LuRepeat2 />} title="For Each Overdue Task" />
                <FlowArrow />
                <FlowStep icon={<LuSearch />} title="Find Related Follow-Up" />
                <FlowArrow />
                <FlowStep
                  icon={<LuCircleHelp />}
                  title="Does Active Follow-Up Exist?"
                />
                <FlowArrow />
                <div className="grid w-full gap-4 md:grid-cols-2">
                  <FlowStep icon={<LuCheck />} title="YES → Skip" />
                  <FlowStep
                    icon={<LuBoxes />}
                    title="NO → Create Follow-Up"
                    final
                  />
                </div>
              </div>
              <p className="mt-6 leading-8">
                We now have retrieval, iteration, branching, creation, and
                duplicate prevention. This is no longer primarily a
                communication requirement.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 13"
            title="Boolean Logic Has Graduated"
            icon={<LuGitBranch />}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Earlier" icon={<LuMail />}>
              <p>
                <strong>IF conditions are true → send communication.</strong>
              </p>
            </ConceptCard>
            <ConceptCard title="Now" icon={<LuRoute />}>
              <p>
                <strong>IF condition A → Path A</strong>
              </p>
              <p className="mt-2">
                <strong>ELSE IF condition B → Path B</strong>
              </p>
              <p className="mt-2">
                <strong>ELSE → another path or stop.</strong>
              </p>
            </ConceptCard>
          </div>
          <Remember title="Boolean logic has moved from controlling whether a communication occurs to controlling how a workflow proceeds">
            <p>
              This is transfer of earlier knowledge, not another Boolean lesson.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 14"
            title="Actions Can Cause More Events"
            icon={<LuRefreshCw />}
          >
            <p>
              If automation modifies another record, that mutation may itself be
              meaningful to other automation. We should start asking about
              secondary effects without overclaiming undocumented internals.
            </p>
          </SectionHeading>
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-violet-300 bg-violet-50 p-6">
            <FlowStep icon={<LuZap />} title="Event A" />
            <FlowArrow />
            <FlowStep icon={<LuWorkflow />} title="Workflow" />
            <FlowArrow />
            <FlowStep icon={<LuSettings2 />} title="Modify Record B" />
            <FlowArrow />
            <FlowStep icon={<LuRefreshCw />} title="Record B Changes" />
            <FlowArrow />
            <FlowStep
              icon={<LuCircleHelp />}
              title="Could This Become Another Event?"
              final
            />
          </div>
          <div className="mt-5 inline-flex rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-800">
            Architectural Question — to investigate later
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 15"
            title="The Full Business Requirement"
            icon={<LuNetwork />}
          >
            <p>Now combine everything into one process.</p>
          </SectionHeading>
          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-xl font-bold leading-9 text-[#205c38]">
              When a Task becomes Complete, identify the Assigned To user, find
              all of that user&apos;s other Open Tasks, determine which are
              overdue, create a Follow-Up for each overdue Task that does not
              already have one, update the user&apos;s tracking record with the
              number of overdue Tasks, and notify the supervisor with a summary.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center">
              {[
                ["TRIGGER", "Task becomes Complete", <LuZap key="1" />],
                ["READ", "Assigned To", <LuDatabase key="2" />],
                ["FIND", "Other Open Tasks", <LuSearch key="3" />],
                [
                  "FILTER / EVALUATE",
                  "Which are overdue?",
                  <LuGitBranch key="4" />,
                ],
                ["ITERATE", "For each overdue Task", <LuRepeat2 key="5" />],
                [
                  "CHECK",
                  "Does active Follow-Up exist?",
                  <LuCircleHelp key="6" />,
                ],
                ["BRANCH", "Yes → skip / No → create", <LuRoute key="7" />],
                [
                  "COUNT / RESULT",
                  "How many overdue Tasks?",
                  <LuTable2 key="8" />,
                ],
                ["UPDATE", "Tracking record", <LuSettings2 key="9" />],
                ["COMMUNICATE", "Supervisor summary", <LuMail key="10" />],
              ].map(([title, text, icon], i, a) => (
                <div key={String(title)} className="w-full">
                  <FlowStep
                    icon={icon as ReactNode}
                    title={String(title)}
                    text={String(text)}
                    final={i === a.length - 1}
                  />
                  {i < a.length - 1 && <FlowArrow />}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border-2 border-[#276749] bg-white p-6 text-center">
              <p className="text-2xl font-extrabold text-[#205c38]">
                Can one Notification, Custom Email, Scheduled Custom Email,
                Subscription, or Reminder naturally represent this entire
                sequence?
              </p>
              <p className="mt-4 text-xl font-bold text-[#276749]">
                No. We&apos;ve crossed the line.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="overflow-hidden rounded-3xl border-4 border-[#205c38]">
            <div className="bg-[#205c38] p-7 text-white sm:p-9">
              <p className="font-bold uppercase tracking-[0.15em] text-white/75">
                Part 16
              </p>
              <h2 className="mt-2 text-4xl font-extrabold sm:text-5xl">
                The Line in the Sand
              </h2>
            </div>
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-gray-300 bg-white p-7 lg:border-b-0 lg:border-r">
                <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Communication Automation
                </p>
                <p className="mt-4 text-xl font-bold text-[#205c38]">
                  The dominant requirement is that something should be
                  communicated when a defined event, schedule, report delivery,
                  or record-relative date condition occurs.
                </p>
                <ul className="mt-5 space-y-3 leading-7">
                  <li>Event → Email</li>
                  <li>Schedule → Report briefing</li>
                  <li>Report → Subscription</li>
                  <li>Record Date → Reminder</li>
                </ul>
              </div>
              <div className="bg-[#f0fff4] p-7">
                <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Workflow Orchestration
                </p>
                <p className="mt-4 text-xl font-bold text-[#205c38]">
                  A sequence of operations must coordinate data, decisions, and
                  actions to advance a business process.
                </p>
                <ul className="mt-5 space-y-3 leading-7">
                  <li>Find other data</li>
                  <li>Use output from one operation in another</li>
                  <li>Create or modify records</li>
                  <li>Process multiple results</li>
                  <li>Repeat actions</li>
                  <li>Branch into different paths</li>
                  <li>Coordinate dependent steps</li>
                  <li>Continue based on previous results</li>
                </ul>
              </div>
            </div>
            <div className="border-t-4 border-[#205c38] bg-[#fffaf0] p-7 text-center">
              <p className="text-2xl font-extrabold text-[#7a5200] sm:text-3xl">
                The line is not “simple versus complicated.”
              </p>
              <p className="mt-2 text-xl font-bold">
                The line is what kind of problem we&apos;re solving.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 17"
            title="Don't Reach for the Bigger Hammer"
            icon={<LuLightbulb />}
          >
            <p>
              Discovering a more general automation capability should not tempt
              us to replace every specialized mechanism.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard
              title="Status Complete → Email Supervisor"
              icon={<LuBellRing />}
            >
              <p>Use the appropriate native communication mechanism.</p>
            </ConceptCard>
            <ConceptCard
              title="Send Open Tasks Report Weekly"
              icon={<LuTable2 />}
            >
              <p>Subscription may be ideal.</p>
            </ConceptCard>
            <ConceptCard
              title="Three Days Before Due Date"
              icon={<LuCalendarClock />}
            >
              <p>Reminder naturally expresses record-relative timing.</p>
            </ConceptCard>
          </div>
          <Remember title="Use the simplest native mechanism that completely and clearly expresses the business requirement">
            <p>
              Escalate when the requirement demands orchestration—not because a
              broader automation tool sounds more powerful.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 18"
            title="The Automation Escalation Ladder"
            icon={<LuWorkflow />}
          >
            <p>
              This is a course mental model, not an official Quickbase scale.
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Level 1 — Evaluate", "Does this qualify?", <LuCheck key="1" />],
              ["Level 2 — Communicate", "Tell somebody.", <LuMail key="2" />],
              [
                "Level 3 — Retrieve",
                "Find additional information.",
                <LuSearch key="3" />,
              ],
              [
                "Level 4 — Pass Data",
                "Use one operation's result somewhere else.",
                <LuDatabase key="4" />,
              ],
              [
                "Level 5 — Decide",
                "Choose what happens next.",
                <LuGitBranch key="5" />,
              ],
              [
                "Level 6 — Act",
                "Create, modify, or change something.",
                <LuSettings2 key="6" />,
              ],
              [
                "Level 7 — Iterate",
                "Perform operations across multiple results.",
                <LuRepeat2 key="7" />,
              ],
              [
                "Level 8 — Orchestrate",
                "Coordinate the complete sequence.",
                <LuNetwork key="8" />,
              ],
            ].map(([title, text, icon]) => (
              <ConceptCard
                key={String(title)}
                title={String(title)}
                icon={icon as ReactNode}
              >
                <p>{String(text)}</p>
              </ConceptCard>
            ))}
          </div>
          <div className="mt-5 inline-flex rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-800">
            Course Mental Model
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 19"
            title="The Questions a Builder Starts Asking"
            icon={<LuCircleHelp />}
          >
            <p>
              We are not answering these in detail yet. They are no longer
              distractions—they are the questions the next phase of the
              curriculum must answer.
            </p>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            <QuestionReveal
              question="How do I find records other than the triggering record?"
              answer="The process now needs data beyond the original event context."
            />
            <QuestionReveal
              question="How do I use a value from an earlier operation later?"
              answer="A multi-step workflow needs a way to carry data forward."
            />
            <QuestionReveal
              question="What if my search returns 37 records?"
              answer="The workflow may need to process a collection rather than one record."
            />
            <QuestionReveal
              question="How do I perform something for each record?"
              answer="Repeated action across a result set becomes a workflow concern."
            />
            <QuestionReveal
              question="How do I create or update records automatically?"
              answer="The process now requires automated data mutation."
            />
            <QuestionReveal
              question="How do I choose between different workflow paths?"
              answer="Boolean logic now controls continuation and branching."
            />
            <QuestionReveal
              question="What if the next action happens outside Quickbase?"
              answer="The business process may cross system boundaries."
            />
            <QuestionReveal
              question="What happens when an automated action creates another record change?"
              answer="That raises secondary-event questions to investigate experimentally."
            />
            <QuestionReveal
              question="What happens if Step 6 fails after Steps 1–5 already succeeded?"
              answer="Multi-step automation introduces execution-state and recovery questions."
            />
          </div>
          <Remember title="Those questions are no longer distractions. They are our new curriculum.">
            <p>
              We now have a reason to investigate a broader automation model.
            </p>
          </Remember>
        </section>

        <BoundaryQuiz />

        <section className="mt-14">
          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-[#276749]">
              Part 21 — Final Reveal
            </p>
            <div className="mx-auto mt-7 flex max-w-xl flex-col items-center">
              {[
                ["TRIGGER", <LuZap key="1" />],
                ["RETRIEVE", <LuSearch key="2" />],
                ["PASS DATA", <LuDatabase key="3" />],
                ["EVALUATE", <LuGitBranch key="4" />],
                ["BRANCH", <LuRoute key="5" />],
                ["ITERATE", <LuRepeat2 key="6" />],
                ["CREATE / MODIFY", <LuSettings2 key="7" />],
                ["CONTINUE", <LuWorkflow key="8" />],
                ["COMMUNICATE", <LuMail key="9" />],
              ].map(([title, icon], i, a) => (
                <div key={String(title)} className="w-full">
                  <FlowStep
                    icon={icon as ReactNode}
                    title={String(title)}
                    final={i === a.length - 1}
                  />
                  {i < a.length - 1 && <FlowArrow />}
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-2xl font-bold text-[#205c38]">
                We know what we need.
              </p>
              <p className="mx-auto mt-4 max-w-4xl text-lg leading-8">
                We don&apos;t merely need another kind of email. We need a
                mechanism designed to move information through a workflow, carry
                data from one operation to another, make decisions, coordinate
                actions, and advance a business process.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-[#17452a] bg-[#205c38] text-white">
            <div className="p-8 text-center sm:p-12">
              <p className="font-bold uppercase tracking-[0.18em] text-white/70">
                The Door Opens
              </p>
              <h2 className="mt-4 text-5xl font-extrabold sm:text-6xl">
                Enter Pipelines.
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-white/90">
                In Lesson 8, we finally open the mechanism Quickbase provides
                for this broader class of automation. But we will not begin by
                memorizing its interface.
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-2xl font-bold leading-9">
                We already have something much more useful: a reason for every
                major capability we&apos;re about to encounter.
              </p>
              <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left md:grid-cols-2">
                {[
                  "How does a Pipeline start?",
                  "What is a step?",
                  "How does one step use data produced by another?",
                  "How does Quickbase find records?",
                  "How are conditions and branches represented?",
                  "How are repeated operations handled?",
                  "How can a workflow create or modify data?",
                  "How can Quickbase participate in processes beyond one table—or beyond Quickbase itself?",
                ].map((q) => (
                  <div
                    key={q}
                    className="rounded-xl border border-white/15 bg-white/10 p-4"
                  >
                    {q}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-10 max-w-4xl border-t border-white/20 pt-8">
                <p className="text-xl font-bold leading-8">
                  We learned communication automation by asking when Quickbase
                  should speak.
                </p>
                <p className="mt-3 text-2xl font-extrabold leading-9">
                  Now we&apos;re going to learn workflow automation by asking
                  what Quickbase should do next.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/lessons/8"
                  className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]"
                >
                  Continue to Lesson 8 →
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
