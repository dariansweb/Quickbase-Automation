import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import {
  LuArrowDown,
  LuBraces,
  LuCable,
  LuClock3,
  LuDatabase,
  LuGitBranch,
  LuMessagesSquare,
  LuRefreshCw,
  LuRocket,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";

import { lessons } from "../data/lessons";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "The evolving lesson roadmap for the Quickbase Automation Developer Lab.",
};

/* ============================================================
   STATUS HELPERS
   ============================================================ */

function StatusBadge({
  status,
}: {
  status: "planned" | "current" | "complete";
}) {
  if (status === "complete") {
    return (
      <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">
        Complete
      </span>
    );
  }

  if (status === "current") {
    return (
      <span className="rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-800">
        Current
      </span>
    );
  }

  return (
    <span className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gray-600">
      Planned
    </span>
  );
}

function MentalArrow() {
  return (
    <div className="flex h-12 items-center justify-center">
      <LuArrowDown
        aria-hidden="true"
        className="text-2xl text-[#276749]/60"
      />
    </div>
  );
}

function MentalModel({
  icon,
  title,
  description,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  final?: boolean;
}) {
  return (
    <div
      className={`group w-full rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${
        final
          ? "border-[#276749] bg-[#276749] text-white"
          : "border-[#b7d8c2] bg-white"
      }`}
    >
      <div className="flex items-start gap-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 ${
            final
              ? "bg-white/15 text-white"
              : "bg-[#f0fff4] text-[#276749]"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3
            className={`text-xl font-extrabold ${
              final ? "text-white" : "text-[#205c38]"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 leading-7 ${
              final ? "text-white/85" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function LessonsPage() {
  const phases = Array.from(new Set(lessons.map((lesson) => lesson.phase)));

  const completeCount = lessons.filter(
    (lesson) => lesson.status === "complete",
  ).length;

  const currentCount = lessons.filter(
    (lesson) => lesson.status === "current",
  ).length;

  const plannedCount = lessons.filter(
    (lesson) => lesson.status === "planned",
  ).length;

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#17452a] bg-[#276749] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>

          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Lesson Roadmap
          </h1>

          <p className="mt-5 max-w-4xl text-xl leading-9 text-white">
            Follow the expected progression from native Quickbase communication
            tools through events, time, state, workflow, Pipelines, QBL, Jinja,
            REST APIs, reliability, and automation design.
          </p>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
            This is a working roadmap rather than a frozen syllabus. Lessons may
            merge, split, move, or change as Quickbase behavior is researched
            and tested.
          </p>
        </div>
      </header>

      {/* ======================================================
          ROADMAP STATUS
      ====================================================== */}

      <section className="border-b border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-300 bg-white p-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
                Complete
              </p>

              <p className="mt-2 text-3xl font-extrabold text-[#205c38]">
                {completeCount}
              </p>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-amber-800">
                Current
              </p>

              <p className="mt-2 text-3xl font-extrabold text-amber-900">
                {currentCount}
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
                Planned
              </p>

              <p className="mt-2 text-3xl font-extrabold text-gray-700">
                {plannedCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          IMPORTANT ROADMAP NOTE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
            About This Roadmap
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            The destination is clearer than the exact route.
          </h2>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            The broad progression is intentional: communication leads into
            events, events lead into state and time, those concepts lead into
            workflow, and workflow eventually leads into Pipelines.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8">
            The lesson numbers themselves are provisional. Actual Quickbase
            testing may reveal that a topic deserves more space, less space, or
            an entirely different lesson than originally expected.
          </p>
        </div>
      </section>

      {/* ======================================================
          PHASE DIRECTORY
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="space-y-14">
          {phases.map((phase, phaseIndex) => {
            const phaseLessons = lessons.filter(
              (lesson) => lesson.phase === phase,
            );

            return (
              <section key={phase}>
                {/* --------------------------------------------
                    PHASE HEADER
                -------------------------------------------- */}

                <div className="mb-6 flex flex-col gap-3 border-b border-gray-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
                      Phase {phaseIndex + 1}
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-[#205c38]">
                      {phase}
                    </h2>
                  </div>

                  <p className="text-sm font-semibold text-gray-500">
                    {phaseLessons.length}{" "}
                    {phaseLessons.length === 1 ? "lesson" : "lessons"}
                  </p>
                </div>

                {/* --------------------------------------------
                    LESSON CARDS
                -------------------------------------------- */}

                <div className="grid gap-5 lg:grid-cols-2">
                  {phaseLessons.map((lesson) => {
                    const available =
                      lesson.status === "complete" ||
                      lesson.status === "current";

                    const cardContent = (
                      <article
                        className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm transition duration-200 sm:p-7 ${
                          available
                            ? "border-gray-300 bg-white group-hover:-translate-y-1 group-hover:border-[#276749] group-hover:shadow-lg"
                            : "border-gray-200 bg-[#f7f8fa]"
                        }`}
                      >
                        <div className="flex items-start gap-5">
                          <div
                            className={`flex h-14 min-w-14 shrink-0 items-center justify-center rounded-xl px-3 text-lg font-extrabold ${
                              available
                                ? "bg-[#276749] text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {lesson.number}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <p
                                className={`text-sm font-bold uppercase tracking-[0.14em] ${
                                  available ? "text-[#276749]" : "text-gray-500"
                                }`}
                              >
                                Lesson {lesson.number}
                              </p>

                              <StatusBadge status={lesson.status} />
                            </div>

                            <h3
                              className={`mt-2 text-2xl font-bold leading-tight ${
                                available
                                  ? "text-gray-950 group-hover:text-[#276749]"
                                  : "text-gray-700"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                          </div>
                        </div>

                        <p
                          className={`mt-5 flex-1 leading-7 ${
                            available ? "text-gray-700" : "text-gray-600"
                          }`}
                        >
                          {lesson.description}
                        </p>

                        <div className="mt-6 border-t border-gray-200 pt-5">
                          {available ? (
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#276749]">
                                Open tutorial
                              </span>

                              <span
                                aria-hidden="true"
                                className="text-2xl font-bold text-[#276749] transition-transform group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-gray-500">
                              Expected lesson — not yet published
                            </span>
                          )}
                        </div>
                      </article>
                    );

                    if (!available) {
                      return (
                        <div key={lesson.number} className="h-full">
                          {cardContent}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={lesson.number}
                        href={lesson.link}
                        className="group block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#276749]/20"
                        aria-label={`Open Lesson ${lesson.number}: ${lesson.title}`}
                      >
                        {cardContent}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* ======================================================
          MENTAL MODEL
      ====================================================== */}

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
              The Journey
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#205c38] sm:text-4xl">
              The Course Is Moving Toward One Convergence Point
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              Each concept builds upon the one before it. What begins as
              information eventually becomes a complete automation system.
            </p>
          </div>

          <div className="mt-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <MentalModel
                icon={<LuDatabase />}
                title="Information"
                description="The data and records that automation begins with."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuMessagesSquare />}
                title="Communication"
                description="Systems exchange information through defined mechanisms."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuZap />}
                title="Events"
                description="Something happens that gives automation a reason to act."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuClock3 />}
                title="Time"
                description="Automation gains awareness of when something should happen."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuGitBranch />}
                title="Conditions"
                description="Rules determine whether the next action should occur."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuRefreshCw />}
                title="State Changes"
                description="Records and systems move from one meaningful state to another."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuWorkflow />}
                title="Workflow"
                description="Events, conditions, and state changes become an organized process."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuCable />}
                title="Pipelines"
                description="Quickbase orchestrates automation across records, systems, and services."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuBraces />}
                title="QBL + Jinja + JSON + REST API"
                description="The languages and interfaces give the workflow greater expressive power."
              />

              <MentalArrow />

              <MentalModel
                icon={<LuRocket />}
                title="Complete Automation System"
                description="Information, events, logic, workflow, and APIs converge into one system."
                final
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          EXPERIMENTAL METHOD
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
          <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
            How a Planned Lesson Becomes a Real Lesson
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#205c38]">
            Quickbase Gets the Final Vote
          </h2>

          <p className="mt-5 max-w-5xl text-lg leading-8">
            Planned lesson titles describe what we expect to investigate. The
            published lesson is written only after documentation, prediction,
            experimentation, and observation have established what actually
            happened.
          </p>

          <div className="mt-7 overflow-x-auto rounded-xl border border-gray-300 bg-white p-6">
            <pre className="min-w-max font-mono text-base leading-8">
              {`PLANNED TOPIC
     ↓
RESEARCH
     ↓
PREDICTION
     ↓
QUICKBASE EXPERIMENT
     ↓
OBSERVATION
     ↓
CORRECTION
     ↓
PUBLISHED LESSON`}
            </pre>
          </div>
        </div>
      </section>

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <section className="border-t border-[#17452a] bg-[#205c38] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.14em] text-white/70">
                Ready to Begin?
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Start with the first current lesson.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {lessons
                .filter(
                  (lesson) =>
                    lesson.status === "current" || lesson.status === "complete",
                )
                .slice(0, 1)
                .map((lesson) => (
                  <Link
                    key={lesson.number}
                    href={lesson.link}
                    className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
                  >
                    Start Lesson {lesson.number} →
                  </Link>
                ))}

              <Link
                href="/"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}