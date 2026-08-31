"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBellRing,
  LuBookOpen,
  LuCalendarClock,
  LuCircleHelp,
  LuClock3,
  LuGitBranch,
  LuInfo,
  LuLightbulb,
  LuMail,
  LuRefreshCw,
  LuRepeat2,
  LuRoute,
  LuSend,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuUsers,
  LuWorkflow,
  LuX,
} from "react-icons/lu";

type QuizOption = { id: string; label: string };
type QuizQuestion = {
  id: number;
  scenario: string;
  prompt: string;
  options: QuizOption[];
  answer: string;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario:
      "A supervisor needs an email immediately when a Task's Status becomes Complete.",
    prompt: "Which communication family should you evaluate first?",
    options: [
      {
        id: "a",
        label: "Event-driven: Notification or Triggered Custom Email",
      },
      { id: "b", label: "Scheduled Custom Email" },
      { id: "c", label: "Subscription" },
      { id: "d", label: "Reminder" },
    ],
    answer: "a",
    explanation:
      "The requirement is initiated by a record transition. The first design decision is therefore event-driven communication. Only after that do we decide whether the simpler Notification model is enough or whether the richer controls of Triggered Custom Email are justified.",
  },
  {
    id: 2,
    scenario:
      "Every Monday morning, leadership wants one email containing Open Tasks, Tasks Due Soon, and Completed Tasks with explanatory text between the sections.",
    prompt: "Which mechanism most naturally expresses the requirement?",
    options: [
      { id: "a", label: "Reminder" },
      { id: "b", label: "Scheduled Custom Email" },
      { id: "c", label: "Alert" },
      { id: "d", label: "Notification" },
    ],
    answer: "b",
    explanation:
      "A common schedule initiates the communication, and the desired product is a composed multi-report briefing rather than distribution of one report. That makes Scheduled Custom Email the natural abstraction.",
  },
  {
    id: 3,
    scenario:
      "The Participant role simply needs the existing Open Tasks report delivered every Friday.",
    prompt:
      "Which feature best matches the requirement with the least unnecessary machinery?",
    options: [
      { id: "a", label: "Triggered Custom Email" },
      { id: "b", label: "Reminder" },
      { id: "c", label: "Subscription" },
      { id: "d", label: "Alert" },
    ],
    answer: "c",
    explanation:
      "The report itself is the product. A Subscription already models report → schedule → recipients → delivery. Building a richer composed email would add complexity the requirement did not ask for.",
  },
  {
    id: 4,
    scenario:
      "Each Task has its own Due Date. Assigned To should receive an email exactly three days before that particular Task is due.",
    prompt: "Where does the important time reference come from?",
    options: [
      { id: "a", label: "A common weekly calendar schedule" },
      { id: "b", label: "The date stored on each record" },
      { id: "c", label: "The time the record was last modified" },
      { id: "d", label: "The report subscription schedule" },
    ],
    answer: "b",
    explanation:
      "Each record carries its own clock. Reminder logic is naturally expressed as Record Date → Temporal Offset → Qualification → Recipient → Communication.",
  },
  {
    id: 5,
    scenario:
      "Quickbase sends an administrator a warning that an application is approaching a platform storage limit.",
    prompt: "How should Lesson 6 classify that message?",
    options: [
      { id: "a", label: "Reminder" },
      { id: "b", label: "Subscription" },
      { id: "c", label: "Alert" },
      { id: "d", label: "Triggered Custom Email" },
    ],
    answer: "c",
    explanation:
      "The application builder did not define a record-driven communication rule. Quickbase itself is communicating about the platform or application administration, which is the vocabulary distinction this lesson uses for Alerts.",
  },
  {
    id: 6,
    scenario:
      "A builder sees all/any conditions and grouped criteria again while configuring a Reminder.",
    prompt: "What is the strongest conceptual response?",
    options: [
      { id: "a", label: "Learn a new Reminder-specific Boolean language" },
      {
        id: "b",
        label: "Reuse the Quickbase criteria and Boolean model learned earlier",
      },
      {
        id: "c",
        label:
          "Ignore criteria because time-based features do not evaluate logic",
      },
      { id: "d", label: "Replace the Reminder with a Subscription" },
    ],
    answer: "b",
    explanation:
      "The important transfer is that Quickbase reuses conceptual machinery. Criteria, all/any, groups, and qualification are not new simply because they appear in a different feature.",
  },
  {
    id: 7,
    scenario:
      "Every morning at 8:00, management wants one list of all Tasks currently due within three days.",
    prompt: "Which time model dominates this requirement?",
    options: [
      { id: "a", label: "A common calendar schedule" },
      { id: "b", label: "A separate offset from each individual Task date" },
      { id: "c", label: "A record modification event" },
      { id: "d", label: "A Quickbase platform alert" },
    ],
    answer: "a",
    explanation:
      "The requirement begins with one shared evaluation time: every morning at 8:00. A Scheduled Custom Email plus a report is therefore a strong candidate even though the report itself may contain date-based criteria.",
  },
  {
    id: 8,
    scenario:
      "An existing Notification already sends a simple, correct email when Status changes to Complete. A new builder notices that Custom Email is newer.",
    prompt: "What is the best design conclusion?",
    options: [
      { id: "a", label: "Replace every legacy Notification immediately" },
      {
        id: "b",
        label:
          "Keep it unless Custom Email solves a real requirement or limitation",
      },
      {
        id: "c",
        label: "Convert it to a Reminder because Status is stored on a record",
      },
      {
        id: "d",
        label: "Convert it to a Subscription because email is being delivered",
      },
    ],
    answer: "b",
    explanation:
      "Lesson 6 treats the decision tree as design guidance rather than a migration mandate. A stable automation should not be rebuilt simply because a newer feature exists.",
  },
  {
    id: 9,
    scenario:
      "One requirement says, 'Every Friday send leadership the Open Tasks report.' Another says, 'Every Friday send leadership a narrative briefing with Open Tasks, Overdue Tasks, and Recently Completed Tasks.'",
    prompt: "What distinction should drive the tool choice?",
    options: [
      { id: "a", label: "Whether Friday happens once per week" },
      {
        id: "b",
        label: "Whether the product is one report or a composed communication",
      },
      { id: "c", label: "Whether the records have Record ID values" },
      { id: "d", label: "Whether the recipients are Quickbase users" },
    ],
    answer: "b",
    explanation:
      "Both requirements are scheduled, so schedule alone does not resolve the overlap. The deciding design question becomes what the communication product actually is: periodic distribution of one report favors Subscription; a composed briefing favors Scheduled Custom Email.",
  },
  {
    id: 10,
    scenario:
      "A requirement could technically be implemented in more than one Quickbase email feature.",
    prompt: "What rule should guide the final design decision?",
    options: [
      {
        id: "a",
        label: "Use the feature with the longest configuration screen",
      },
      { id: "b", label: "Use whichever feature was introduced most recently" },
      {
        id: "c",
        label:
          "Choose the abstraction that expresses the dominant requirement most naturally",
      },
      {
        id: "d",
        label: "Always prefer Scheduled Custom Email because it can repeat",
      },
    ],
    answer: "c",
    explanation:
      "Lesson 6 intentionally avoids absolute boundaries. Overlap exists, so the strongest design heuristic is to identify what makes the communication necessary and choose the mechanism whose abstraction most closely matches that requirement.",
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

function FlowArrow() {
  return (
    <div className="flex h-9 items-center justify-center">
      <LuArrowDown className="text-xl text-[#276749]/60" />
    </div>
  );
}

function LessonQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0),
        0,
      ),
    [answers],
  );
  const complete = Object.keys(answers).length === quizQuestions.length;

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section id="quiz" className="scroll-mt-8 pt-4">
      <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4] shadow-sm">
        <div className="border-b border-[#9fc9ad] bg-[#205c38] p-7 text-white sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="font-bold uppercase tracking-[0.15em] text-white/75">
                Lesson 6 Interactive Assessment
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Choose the Tool — Then Understand Why
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                These questions avoid menu-click trivia. Each one asks you to
                identify the dominant requirement and choose the Quickbase
                communication abstraction that expresses it most naturally.
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
          {quizQuestions.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.answer;
            return (
              <div
                key={question.id}
                className="rounded-2xl border border-[#9fc9ad] bg-white p-6"
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="leading-8 text-gray-700">
                      {question.scenario}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-[#205c38]">
                      {question.prompt}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {question.options.map((option) => {
                    const chosen = selected === option.id;
                    const correct = option.id === question.answer;
                    let style =
                      "border-gray-300 bg-white hover:border-[#9fc9ad] hover:bg-[#f7fff9]";
                    if (chosen && !submitted)
                      style = "border-[#276749] bg-[#f0fff4]";
                    if (submitted && correct)
                      style = "border-[#276749] bg-[#f0fff4]";
                    if (submitted && chosen && !correct)
                      style = "border-red-300 bg-red-50";

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={submitted}
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option.id,
                          }))
                        }
                        className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition ${style}`}
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                          {option.id.toUpperCase()}
                        </span>
                        <span className="leading-7">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`mt-5 rounded-xl border p-5 ${isCorrect ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-red-200 bg-red-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <LuBadgeCheck className="text-xl text-[#276749]" />
                      ) : (
                        <LuX className="text-xl text-red-700" />
                      )}
                      <p className="font-bold">
                        {isCorrect
                          ? "Your reasoning matched the lesson model."
                          : "Revisit the initiating fact in the requirement."}
                      </p>
                    </div>
                    <p className="mt-3 leading-7">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="rounded-2xl border border-[#9fc9ad] bg-white p-6">
            {!submitted ? (
              <>
                <h3 className="text-xl font-bold text-[#205c38]">
                  Ready to evaluate your design reasoning?
                </h3>
                <p className="mt-2 leading-7 text-gray-700">
                  Answer all {quizQuestions.length} questions before submitting.
                  The explanations use full sentences because the assessment is
                  about architectural reasoning, not remembering a feature name.
                </p>
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() => setSubmitted(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <LuBadgeCheck />
                  Grade My Quiz
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
                  <p className="mt-3 max-w-2xl leading-7">
                    {score === quizQuestions.length
                      ? "Excellent. You are choosing tools from the requirement outward rather than from the Quickbase menu inward."
                      : score >= 8
                        ? "Strong result. Review the missed explanations and focus on the dominant initiating fact."
                        : score >= 6
                          ? "You have the major categories. Revisit Subscription vs Scheduled Custom Email and Reminder vs common schedule."
                          : "Review the decision model before retrying. Start every requirement with: What fact makes this communication necessary?"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetQuiz}
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

export default function LessonSixPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>
          <p className="mb-2 text-lg font-semibold text-white/90">Lesson 6</p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Choosing the Right Quickbase Communication Tool
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Notifications, Custom Emails, Scheduled Custom Emails,
            Subscriptions, Reminders, and Alerts can look like six competing
            email features. The real skill is identifying what makes the
            communication necessary and choosing the abstraction that expresses
            that requirement most naturally.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/5"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Previous Lesson
            </Link>
            <Link
              href="/lessons/7"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Next Lesson →
            </Link>{" "}            
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
              Skip to Quiz
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        <section className="mb-14">
          <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl text-[#276749] shadow-sm">
                <LuCircleHelp />
              </span>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                  Central Question
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#205c38] sm:text-3xl">
                  Why are there so many communication features, and how do I
                  decide which one belongs in a requirement?
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-4xl text-lg leading-8">
              The goal is not to memorize six feature definitions. The goal is
              to recognize the thing that initiates or defines the
              communication.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Start With the Requirement, Not the Email Type"
            icon={<LuTarget />}
          >
            <p>
              Do not begin with “Which email feature should I click?” Begin with
              a more architectural question:{" "}
              <strong>What fact causes this communication to matter?</strong>
            </p>
          </SectionHeading>

          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
            <table className="w-full min-w-225 border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#276749] bg-[#f7f8fa]">
                  <th className="px-5 py-4">
                    Business requirement begins with…
                  </th>
                  <th className="px-5 py-4">Start thinking about…</th>
                  <th className="px-5 py-4">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "When this record changes…",
                    "Notification / Triggered Custom Email",
                    "A record event is the important thing.",
                  ],
                  [
                    "Every Monday at…",
                    "Scheduled Custom Email",
                    "A common calendar schedule is the important thing.",
                  ],
                  [
                    "Send me this report…",
                    "Subscription",
                    "The report itself is the important product.",
                  ],
                  [
                    "Three days before this record's Due Date…",
                    "Reminder",
                    "A date stored on each record provides the clock.",
                  ],
                  [
                    "Quickbase needs to tell me something about the app/platform…",
                    "Alert",
                    "Quickbase itself is generating the communication.",
                  ],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="border-b border-gray-200 align-top"
                  >
                    <td className="px-5 py-4 font-semibold text-[#205c38]">
                      {row[0]}
                    </td>
                    <td className="px-5 py-4">{row[1]}</td>
                    <td className="px-5 py-4">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Remember title="Prefer the mechanism whose abstraction most closely matches the requirement">
            <p>
              A feature is not better merely because it is newer or more
              configurable. Extra capability becomes extra machinery when the
              requirement never asked for it.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 2–3"
            title="The Event-Driven Family"
            icon={<LuBellRing />}
          >
            <p>
              Notification and Triggered Custom Email belong to the same broad
              family because both begin with record activity. Their difference
              is not what starts the automation—it is how much control the
              communication requires after the event qualifies.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard
              title="Notification — Something Happened to This Record"
              icon={<LuBellRing />}
            >
              <p>
                Notifications are event-oriented communication. Their natural
                question is <strong>“What just happened?”</strong>
              </p>
              <p className="mt-4">
                Typical language includes “when Status becomes Complete,” “when
                Due Date changes,” or “when one of these fields changes and the
                resulting record satisfies these conditions.”
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Review Lessons 2–3 for the event, watched-field, state, and
                Boolean mechanics.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Triggered Custom Email — Same Event, More Communication Control"
              icon={<LuMail />}
            >
              <p>
                The initiating concept remains a <strong>record event</strong>,
                but Custom Email becomes attractive when the requirement needs
                richer composition, recipient handling, permission policy,
                native change presentation, or other modern controls.
              </p>
              <p className="mt-4">
                The choice between Notification and Triggered Custom Email
                happens only after the requirement has already been classified
                as event-driven.
              </p>
            </ConceptCard>
          </div>

          <div className="mt-8 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Event-Driven Decision
            </p>
            <div className="mx-auto mt-5 flex max-w-xl flex-col items-center">
              <FlowStep icon={<LuGitBranch />} title="A Record Event Matters" />
              <FlowArrow />
              <FlowStep
                icon={<LuCircleHelp />}
                title="How Rich Must the Communication Be?"
              />
              <FlowArrow />
              <div className="grid w-full gap-4 md:grid-cols-2">
                <FlowStep
                  icon={<LuBellRing />}
                  title="Notification"
                  text="Simple event-driven communication"
                />
                <FlowStep
                  icon={<LuMail />}
                  title="Triggered Custom Email"
                  text="Richer communication and delivery control"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 4"
            title="Scheduled Custom Email — The Clock Says Communicate"
            icon={<LuClock3 />}
          >
            <p>
              Scheduled Custom Email begins from a shared schedule. Its natural
              question is{" "}
              <strong>
                “What is true now that this scheduled time has arrived?”
              </strong>
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ConceptCard title="WHEN" icon={<LuCalendarClock />}>
              <p>The common schedule.</p>
            </ConceptCard>
            <ConceptCard title="WHAT" icon={<LuTable2 />}>
              <p>The reports that define current information.</p>
            </ConceptCard>
            <ConceptCard title="WHO" icon={<LuUsers />}>
              <p>The intended recipients.</p>
            </ConceptCard>
            <ConceptCard title="HOW" icon={<LuMail />}>
              <p>The composed communication.</p>
            </ConceptCard>
          </div>
          <Remember title="Scheduled Custom Email is especially strong when the communication itself is the product">
            <p>
              “Every Monday send leadership a briefing containing Open Tasks,
              Tasks Due Soon, and Completed Tasks” is stronger than simply
              saying “send this one report.” The email itself has become a
              composed operational briefing.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 5"
            title="Subscriptions — This Report Is the Product"
            icon={<LuSend />}
          >
            <p>
              Subscription is intentionally simpler. That simplicity is a
              strength when the requirement is fundamentally:{" "}
              <strong>“I want this report delivered periodically.”</strong>
            </p>
          </SectionHeading>
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6">
            <FlowStep icon={<LuTable2 />} title="Report" />
            <FlowArrow />
            <FlowStep icon={<LuCalendarClock />} title="Delivery Schedule" />
            <FlowArrow />
            <FlowStep icon={<LuUsers />} title="Recipients" />
            <FlowArrow />
            <FlowStep icon={<LuSend />} title="Delivery" final />
          </div>
          <p className="mt-6 max-w-4xl text-lg leading-8">
            If the business says “Every week send the Participant role the Open
            Tasks report,” an elaborate Scheduled Custom Email may introduce
            composition and maintenance work that the requirement never asked
            for.
          </p>
          <div className="mt-6 rounded-xl border-2 border-dashed border-gray-300 bg-white p-6">
            <div className="flex items-start gap-4">
              <LuInfo className="mt-1 shrink-0 text-xl text-[#276749]" />
              <div>
                <p className="font-bold text-[#205c38]">
                  Ongoing Lab Observation
                </p>
                <p className="mt-2 leading-7">
                  Subscription PDF, CSV, and email/text-oriented delivery
                  formats are still being observed. Lesson 6 deliberately does
                  not pretend to know the final recipient experience until those
                  scheduled tests are complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Parts 6–7"
            title="Reminders — This Record Is Approaching Its Date"
            icon={<LuCalendarClock />}
          >
            <p>
              Reminders are also time-based, but the time does not come from one
              shared schedule. Each record carries its own temporal reference.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {["Task A Due Date", "Task B Due Date", "Task C Due Date"].map(
              (title) => (
                <div
                  key={title}
                  className="rounded-xl border border-gray-300 bg-white p-5 text-center"
                >
                  <p className="font-bold text-[#205c38]">{title}</p>
                  <p className="my-3 text-[#276749]">↓</p>
                  <p>minus 3 days</p>
                  <p className="my-3 text-[#276749]">↓</p>
                  <p className="font-bold text-[#276749]">Reminder</p>
                </div>
              ),
            )}
          </div>
          <Remember title="Where does the time come from?">
            <p>
              If the time comes from one common calendar schedule, Scheduled
              Custom Email is a strong candidate. If the time comes from a date
              stored on each individual record, Reminder is the natural
              abstraction.
            </p>
          </Remember>
          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Common Schedule" icon={<LuClock3 />}>
              <p className="font-semibold">
                “Every morning at 8:00, send management all Tasks due within
                three days.”
              </p>
              <p className="mt-4">
                The dominant concern is the shared 8:00 AM schedule. Scheduled
                Custom Email plus a report is a strong candidate.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Record-Relative Schedule"
              icon={<LuCalendarClock />}
            >
              <p className="font-semibold">
                “Remind each Assigned To user three days before their individual
                Task is due.”
              </p>
              <p className="mt-4">
                The dominant concern is each Task&apos;s position relative to
                its own Due Date. Reminder expresses that requirement directly.
              </p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 8"
            title="Alerts — Quickbase Is Talking to You"
            icon={<LuTriangleAlert />}
          >
            <p>
              Alerts are worth learning mostly so students do not confuse the
              terminology. In the Help material used for this lesson, Alerts
              describe Quickbase-generated messages such as invitations,
              transfer requests, and storage-limit warnings.
            </p>
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard
              title="Your Application Logic Communicates"
              icon={<LuWorkflow />}
            >
              <p>
                Notifications, Custom Emails, Subscriptions, and Reminders are
                builder-facing mechanisms used to express application
                communication requirements.
              </p>
            </ConceptCard>
            <ConceptCard
              title="Quickbase Communicates About Quickbase"
              icon={<LuTriangleAlert />}
            >
              <p>
                Alert terminology belongs to platform/application administration
                messages generated by Quickbase itself rather than another
                record-automation design choice.
              </p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 9"
            title="Recognize Reused Logic Instead of Relearning It"
            icon={<LuRepeat2 />}
          >
            <p>
              The appearance of ALL, ANY, conditions, and groups inside another
              Quickbase feature is not evidence of another logic language. It is
              evidence that the mental model from earlier lessons is
              transferring.
            </p>
          </SectionHeading>
          <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-3">
              <ConceptCard title="Criteria" icon={<LuGitBranch />}>
                <p>Define the facts that matter.</p>
              </ConceptCard>
              <ConceptCard title="Boolean Evaluation" icon={<LuRoute />}>
                <p>Combine them with all/any and grouping.</p>
              </ConceptCard>
              <ConceptCard title="Qualification" icon={<LuBadgeCheck />}>
                <p>Determine whether the record or communication qualifies.</p>
              </ConceptCard>
            </div>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#205c38]">
              You are no longer learning “Reminder Boolean logic.” You are
              recognizing Quickbase Boolean logic appearing inside a Reminder.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 10"
            title="The Communication Decision Tree"
            icon={<LuRoute />}
          >
            <p>
              Start with one question:{" "}
              <strong>What makes the communication necessary?</strong>
            </p>
          </SectionHeading>
          <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <FlowStep
                icon={<LuCircleHelp />}
                title="What Makes the Communication Necessary?"
              />
              <FlowArrow />
              <div className="grid w-full gap-4 md:grid-cols-2">
                <FlowStep
                  icon={<LuGitBranch />}
                  title="A Record Changed"
                  text="Notification or Triggered Custom Email"
                />
                <FlowStep
                  icon={<LuClock3 />}
                  title="A Common Time Arrived"
                  text="Scheduled Custom Email"
                />
                <FlowStep
                  icon={<LuTable2 />}
                  title="A Report Needs Distribution"
                  text="Subscription"
                />
                <FlowStep
                  icon={<LuCalendarClock />}
                  title="A Record Approaches Its Own Date"
                  text="Reminder"
                />
              </div>
              <FlowArrow />
              <FlowStep
                icon={<LuTriangleAlert />}
                title="Quickbase Reports a Platform / Administrative Condition"
                text="Alert"
                final
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-300 bg-white p-6">
            <p className="font-bold text-[#205c38]">
              When two choices overlap, ask a second question:
            </p>
            <p className="mt-3 text-xl font-extrabold text-[#276749]">
              What is the actual product being delivered?
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-300 p-5">
                <p className="font-bold">“This report”</p>
                <p className="mt-2">Subscription becomes attractive.</p>
              </div>
              <div className="rounded-xl border border-gray-300 p-5">
                <p className="font-bold">
                  “This composed briefing with several views”
                </p>
                <p className="mt-2">
                  Scheduled Custom Email becomes attractive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 11"
            title="These Boundaries Are Design Heuristics, Not Quickbase Laws"
            icon={<LuInfo />}
          >
            <p>
              Quickbase features can overlap. A requirement may be technically
              implementable more than one way. The lesson therefore does not
              teach “Requirement X must always use Tool Y.”
            </p>
          </SectionHeading>
          <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-6 sm:p-8">
            <span className="inline-flex rounded-full border border-violet-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-800">
              INFERRED DESIGN GUIDANCE
            </span>
            <p className="mt-5 text-xl font-bold text-[#205c38]">
              Identify the dominant requirement and choose the mechanism that
              expresses it most naturally.
            </p>
            <p className="mt-4 max-w-4xl leading-8">
              Architecture follows business meaning rather than product-menu
              familiarity. A simpler abstraction is often better precisely
              because it contains less machinery the requirement does not need.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Before the Quiz"
            title="Five Fast Classification Checks"
            icon={<LuBookOpen />}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Send me Open Tasks every Friday.",
                "Likely Subscription — one report is the product.",
              ],
              [
                "Every Friday send leadership Open, overdue, and recently completed Tasks with explanatory text.",
                "Likely Scheduled Custom Email — the composed briefing is the product.",
              ],
              [
                "Notify the Task owner immediately when Status becomes Complete.",
                "Likely Notification or Triggered Custom Email — a record event initiates the requirement.",
              ],
              [
                "Notify Assigned To two days before each Task's Due Date.",
                "Likely Reminder — each record supplies its own date-based clock.",
              ],
              [
                "Quickbase warns an administrator that the app is approaching a storage limit.",
                "Alert — Quickbase itself is communicating an administrative/platform condition.",
              ],
            ].map(([req, why]) => (
              <div
                key={req}
                className="rounded-xl border border-gray-300 bg-white p-5"
              >
                <p className="font-bold text-[#205c38]">{req}</p>
                <p className="mt-3 leading-7">{why}</p>
              </div>
            ))}
          </div>
          <Remember title="The assessment is WHY, not WHERE">
            <p>
              A student who can identify the correct menu but cannot explain why
              the requirement belongs to that communication model has not yet
              learned the design skill this lesson is trying to teach.
            </p>
          </Remember>
        </section>

        <LessonQuiz />

        <section className="mt-14 overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Lesson 6 Final Principle
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Requirement First. Tool Second.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              Ask what makes the communication necessary: a record event, a
              common schedule, a report, a record-relative date, or a Quickbase
              administrative condition. Then choose the mechanism whose
              abstraction most naturally expresses that fact.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
              That is a transferable design skill. It is more valuable than
              memorizing where six different email options happen to live in the
              interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]"
              >
                <LuTarget />
                Retake the Quiz
              </a>
              <Link
                href="/lessons"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
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
