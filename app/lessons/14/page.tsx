"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuCheck,
  LuCircleHelp,
  LuDatabase,
  LuFilter,
  LuGitBranch,
  LuLightbulb,
  LuList,
  LuRoute,
  LuSearch,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuWorkflow,
  LuX,
} from "react-icons/lu";

type EvidenceType = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "SPECULATIVE";
type QuizQuestion = {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    statement:
      "If Search Records finds zero records, the Pipeline has necessarily failed.",
    answer: false,
    explanation:
      "Our zero-result experiment completed successfully. Search Records reported no matching Tasks, batch.size was 0, and no Loop Target Item entries appeared.",
  },
  {
    id: 2,
    statement: "A Limit of 1 proves that only one record matched the query.",
    answer: false,
    explanation:
      "Six records qualified in our Record ID > 24 experiment. Limit changed how many qualifying records were returned, not how many logically matched.",
  },
  {
    id: 3,
    statement:
      "batch.size reflected the number of records returned by Search Records in our experiments.",
    answer: true,
    explanation:
      "We observed batch.size values corresponding to the number actually returned in each run.",
  },
  {
    id: 4,
    statement: "Adding an AND criterion always reduces the number of results.",
    answer: false,
    explanation:
      "Record ID > 24 returned six, and adding Status = Open still returned six because all six already met the added condition.",
  },
  {
    id: 5,
    statement: "With OR, a record may qualify by satisfying either criterion.",
    answer: true,
    explanation:
      "Our OR query returned all 13 Tasks because every Task satisfied Status = Open, even when its Due Date did not satisfy the second side.",
  },
  {
    id: 6,
    statement:
      "The repeated ordering we observed proves Quickbase guarantees that result order.",
    answer: false,
    explanation:
      "Repeated behavior is evidence, but not a documented ordering guarantee.",
  },
  {
    id: 7,
    statement:
      "The Search Records query determines which records enter the downstream list-processing model.",
    answer: true,
    explanation:
      "Search criteria determine qualification; the returned qualifying records become the downstream list.",
  },
  {
    id: 8,
    statement: "Limit changes which records logically satisfy the filters.",
    answer: false,
    explanation:
      "Limit caps how many qualifying records are returned. It does not change whether a record satisfies the Boolean expression.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 font-bold uppercase tracking-[0.14em] text-[#276749]">
        {eyebrow}
      </p>
      <div className="flex items-start gap-4">
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4ea] text-2xl text-[#276749]">
          {icon}
        </span>
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-[#205c38] sm:text-4xl">
            {title}
          </h2>
          {children && (
            <div className="mt-4 max-w-4xl text-lg leading-8 text-gray-700">
              {children}
            </div>
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
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">
          {icon}
        </span>
        <h3 className="pt-1 text-xl font-bold text-[#205c38]">{title}</h3>
      </div>
      <div className="mt-4 leading-8 text-gray-700">{children}</div>
    </div>
  );
}

function Remember({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
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
      <div className="mt-4 leading-8 text-gray-700">{children}</div>
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

function FlowStep({
  icon,
  title,
  text,
  final = false,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  final?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${final ? "border-[#276749] bg-[#276749] text-white" : "border-[#b7d8c2] bg-white"}`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${final ? "bg-white/15 text-white" : "bg-[#f0fff4] text-[#276749]"}`}
        >
          {icon}
        </span>
        <div>
          <h4 className="font-bold">{title}</h4>
          <p
            className={`mt-1 text-sm leading-6 ${final ? "text-white/85" : "text-gray-600"}`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
function FlowArrow() {
  return (
    <div className="flex h-10 items-center justify-center text-xl text-[#276749]/60">
      <LuArrowDown />
    </div>
  );
}

function Experiment({
  label,
  title,
  change,
  prediction,
  observation,
  conclusion,
}: {
  label: string;
  title: string;
  change: string;
  prediction: string;
  observation: ReactNode;
  conclusion: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-[#205c38] p-6 text-white">
        <p className="font-bold uppercase tracking-[0.14em] text-white/70">
          {label}
        </p>
        <h3 className="mt-2 text-2xl font-extrabold">{title}</h3>
      </div>
      <div className="grid lg:grid-cols-4">
        <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
          <p className="font-bold text-[#276749]">Change</p>
          <p className="mt-2 leading-7">{change}</p>
        </div>
        <div className="border-b border-gray-200 bg-[#fbfcfb] p-5 lg:border-b-0 lg:border-r">
          <p className="font-bold text-[#276749]">Prediction</p>
          <p className="mt-2 leading-7">{prediction}</p>
        </div>
        <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-[#276749]">Observed</p>
            <EvidenceBadge type="OBSERVED" />
          </div>
          <div className="mt-2 leading-7">{observation}</div>
        </div>
        <div className="bg-[#f0fff4] p-5">
          <p className="font-bold text-[#205c38]">Conclusion</p>
          <div className="mt-2 leading-7">{conclusion}</div>
        </div>
      </div>
    </div>
  );
}

export default function Lesson14Page() {
  const [answers, setAnswers] = useState<Record<number, boolean | undefined>>(
    {},
  );
  const [showResults, setShowResults] = useState(false);
  const answered = Object.values(answers).filter((v) => v !== undefined).length;
  const score = useMemo(
    () =>
      quizQuestions.reduce(
        (n, q) => n + (answers[q.id] === q.answer ? 1 : 0),
        0,
      ),
    [answers],
  );
  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <main className="min-h-screen bg-[#fbfcfb] text-gray-900">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 14
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Queries: Finding Records
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Lesson 13 taught us how to process a list. Lesson 14 backs up and
            asks a more fundamental question: how does Search Records build that
            list in the first place?
          </p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
            We will treat searching as a design problem rather than a filter-box
            exercise. Criteria decide who qualifies. Boolean logic shapes
            membership. Limit caps how many qualifying records are returned.
            Activity gives us evidence of what the query actually produced.
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">Central idea</p>
            <p className="mt-2 leading-7 text-white/90">
              A reliable query is not merely one that runs. It is one whose
              returned records match the business meaning we intended.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/13"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Previous Lesson
            </Link>
            <Link
              href="/lessons/15"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Next Lesson
            </Link>
            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]"
            >
              Table of Contents
            </Link>
            <a
              href="#lesson-14-quiz"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold text-white"
            >
              <LuCircleHelp />
              Skip to Lesson 14 Quiz
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 1"
            title="Finding Records Is Its Own Problem"
            icon={<LuSearch />}
          >
            <p>
              Before a Pipeline can safely update, branch, loop, notify, or
              orchestrate around Quickbase records, it first has to find the
              right ones.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            <ConceptCard title="Zero Records" icon={<LuX />}>
              <p>
                No records satisfy the query. That can be a completely valid
                result.
              </p>
            </ConceptCard>
            <ConceptCard title="One Record" icon={<LuTarget />}>
              <p>
                Exactly one returned record becomes available to downstream
                work.
              </p>
            </ConceptCard>
            <ConceptCard title="Many Records" icon={<LuList />}>
              <p>
                Several matching records form the returned list that later steps
                can process.
              </p>
            </ConceptCard>
          </div>
          <Remember title="Lesson 14 examines list construction">
            <p>
              Lesson 13 established: Search determines membership, Loop
              processes each item, Condition chooses a path, and Action performs
              the work. Now we concentrate on the first responsibility:{" "}
              <strong>who gets into that list?</strong>
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 2"
            title="Build a Fresh Query Pipeline"
            icon={<LuWorkflow />}
          >
            <p>
              Create a clean Pipeline named{" "}
              <strong>Lesson 14 — Queries: Finding Records</strong> and add
              Quickbase → Search Records.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <ConceptCard
              title="Known-Good Search Records Setup"
              icon={<LuSettings2 />}
            >
              <dl className="space-y-3">
                {[
                  ["App", "Automation"],
                  ["Table", "Tasks"],
                  ["Compare with app local time", "No"],
                  ["Limit", "Unlimited"],
                ].map(([a, b]) => (
                  <div key={a} className="grid gap-1 sm:grid-cols-[220px_1fr]">
                    <dt className="font-bold text-[#205c38]">{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </ConceptCard>
            <ConceptCard
              title="Fields for Subsequent Steps"
              icon={<LuTable2 />}
            >
              <ul className="list-disc space-y-2 pl-5">
                <li>Task Name</li>
                <li>Status</li>
                <li>Assigned To</li>
                <li>Pipeline Results</li>
                <li>Due Date</li>
              </ul>
            </ConceptCard>
          </div>
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <LuBookOpen className="mt-1 shrink-0 text-2xl text-blue-700" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-bold text-blue-900">
                    Date/time comparison note
                  </p>
                  <EvidenceBadge type="DOCUMENTED" />
                </div>
                <p className="mt-3 leading-8 text-blue-900">
                  Quickbase states that UTC is used by default for date/time
                  comparisons unless application-local-time comparison is
                  enabled. We note that behavior here but reserve deeper time
                  experiments for a later lesson.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 3"
            title="Query Cardinality: How Many Records Came Back?"
            icon={<LuDatabase />}
          >
            <p>
              <strong>Cardinality</strong> simply means the number of records
              returned by the query. We care about three useful cases: zero,
              one, and many.
            </p>
          </SectionHeading>
          <div className="space-y-6">
            <Experiment
              label="Experiment 14-A"
              title="Exactly One Record"
              change="Record ID = 24; Limit remains Unlimited."
              prediction="Exactly one record should be returned."
              observation={
                <>
                  <p>
                    Activity: <strong>Found a Record of Tasks type</strong>.
                  </p>
                  <p className="mt-2">
                    Record #24 — Validate November Report Data.
                  </p>
                  <p className="mt-2">
                    <code>batch.size: 1</code>; <code>loop.index: 0</code>.
                  </p>
                </>
              }
              conclusion={
                <p>
                  One match still entered the same downstream list-processing
                  model. Activity showed a batch containing one returned item.
                </p>
              }
            />
            <Experiment
              label="Experiment 14-B"
              title="Many Records"
              change="Change one variable: Record ID > 24. Keep Limit Unlimited."
              prediction="Six records should qualify: #25 through #30."
              observation={
                <>
                  <p>
                    Activity: <strong>Found 6 Records of Tasks type</strong>.
                  </p>
                  <p className="mt-2">
                    <code>batch.size: 6</code>.
                  </p>
                  <p className="mt-2">
                    Observed order: <code>27, 28, 26, 30, 29, 25</code>.
                  </p>
                </>
              }
              conclusion={
                <p>
                  Six records were returned, but not in Record ID order. We can
                  report that observation without claiming a universal ordering
                  rule.
                </p>
              }
            />
            <Experiment
              label="Experiment 14-C"
              title="Zero Records"
              change="Change one variable: Record ID > 30."
              prediction="No records should qualify because 30 is the current highest Record ID."
              observation={
                <>
                  <p>
                    Activity: <strong>Found no Records of Tasks type</strong>.
                  </p>
                  <p className="mt-2">
                    <code>batch.size: 0</code>.
                  </p>
                  <p className="mt-2">
                    No Loop Target Item entries appeared. The Pipeline finished
                    successfully.
                  </p>
                </>
              }
              conclusion={
                <p>
                  <strong>No matching records is a valid query result.</strong>{" "}
                  It is not automatically evidence that the Pipeline failed.
                </p>
              }
            />
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-300 bg-white">
            <table className="w-full min-w-180">
              <thead className="bg-[#205c38] text-white">
                <tr>
                  <th className="p-4 text-left">Query</th>
                  <th className="p-4 text-left">Returned</th>
                  <th className="p-4 text-left">Activity Evidence</th>
                  <th className="p-4 text-left">Loop Target Items</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Record ID = 24", "1", "batch.size: 1", "1"],
                  ["Record ID > 24", "6", "batch.size: 6", "6"],
                  ["Record ID > 30", "0", "batch.size: 0", "0"],
                ].map((r, i) => (
                  <tr
                    key={r[0]}
                    className={`border-t ${i % 2 ? "bg-[#fbfcfb]" : ""}`}
                  >
                    {r.map((c, cellIndex) => (
                      <td key={`${r[0]}-${cellIndex}`} className="p-4">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 4"
            title="Limit Does Not Change Who Qualifies"
            icon={<LuFilter />}
          >
            <p>
              Once we knew six records qualified for{" "}
              <code>Record ID &gt; 24</code>, we could change Limit while
              holding the criteria constant.
            </p>
          </SectionHeading>
          <div className="space-y-6">
            <Experiment
              label="Experiment 14-D"
              title="Limit 1"
              change="Keep Record ID > 24. Change Limit from Unlimited to 1."
              prediction="Exactly one qualifying record should be returned. Do not predict which one."
              observation={
                <>
                  <p>
                    Activity: <strong>Found a Record of Tasks type</strong>.
                  </p>
                  <p className="mt-2">
                    Returned #27; <code>batch.size: 1</code>.
                  </p>
                </>
              }
              conclusion={
                <p>
                  A Limit of 1 does not mean only one record matched. It means
                  one record was returned from the qualifying result set.
                </p>
              }
            />
            <Experiment
              label="Experiment 14-E"
              title="Limit 2"
              change="Keep Record ID > 24. Change Limit from 1 to 2."
              prediction="Two records should be returned."
              observation={
                <>
                  <p>
                    Activity: <strong>Found 2 Records of Tasks type</strong>.
                  </p>
                  <p className="mt-2">
                    Returned #27 and #28; <code>batch.size: 2</code>.
                  </p>
                  <p className="mt-2">Loop indexes 0 and 1.</p>
                </>
              }
              conclusion={
                <p>
                  In our tests, Limit placed a maximum on qualifying records
                  returned, and <code>batch.size</code> reflected the number
                  actually returned.
                </p>
              }
            />
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <FlowStep
              icon={<LuFilter />}
              title="FILTERS"
              text="Decide which records qualify."
            />
            <FlowArrow />
            <FlowStep
              icon={<LuDatabase />}
              title="QUALIFYING RESULT SET"
              text="All records satisfying the criteria."
            />
            <FlowArrow />
            <FlowStep
              icon={<LuSettings2 />}
              title="LIMIT"
              text="Caps how many qualifying records are returned."
            />
            <FlowArrow />
            <FlowStep
              icon={<LuList />}
              title="RETURNED LIST"
              text="The records available downstream."
              final
            />
          </div>
          <Remember title="Qualification and return count are different questions">
            <p>
              Ask <strong>Who matches?</strong> before asking{" "}
              <strong>How many should I return?</strong> Filters answer the
              first question. Limit answers the second.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 5"
            title="Repeated Ordering Is Not a Guarantee"
            icon={<LuRoute />}
          >
            <p>
              Unlimited returned <code>27, 28, 26, 30, 29, 25</code>. Limit 1
              returned <code>27</code>. Limit 2 returned <code>27, 28</code>.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
              <div className="flex items-center gap-3">
                <EvidenceBadge type="OBSERVED" />
                <p className="font-bold text-[#205c38]">What we can say</p>
              </div>
              <p className="mt-4 leading-8">
                The limited results corresponded to the beginning of the result
                order observed in our Unlimited run.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-6">
              <div className="flex items-center gap-3">
                <EvidenceBadge type="SPECULATIVE" />
                <p className="font-bold text-violet-900">What we cannot say</p>
              </div>
              <p className="mt-4 leading-8 text-violet-900">
                We did not establish why that order occurred or that Quickbase
                guarantees the same order in future runs.
              </p>
            </div>
          </div>
          <Remember title="Do not confuse repeated behavior with a documented guarantee">
            <p>
              If business logic depends on which record is “first,” ordering
              must be explicitly understood rather than assumed from a few
              repeated observations.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 6"
            title="Searching Records Is an Exercise in Boolean Design"
            icon={<LuGitBranch />}
          >
            <p>
              Search Records becomes powerful—and easy to get wrong—when several
              criteria are combined. The challenge is not memorizing AND and OR.
              The challenge is predicting what they do to{" "}
              <strong>membership in the returned list</strong>.
            </p>
          </SectionHeading>
          <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Recommended Builder Habit
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
              First prove the query. Then improve the logic.
            </h3>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <ConceptCard
                title="1 — State the Expected Set"
                icon={<LuTarget />}
              >
                <p>
                  Before building the final filter, write down which records
                  should qualify—or at least how many you expect.
                </p>
              </ConceptCard>
              <ConceptCard title="2 — Build for Correctness" icon={<LuCheck />}>
                <p>
                  Use clear criteria and grouping until Activity returns the
                  expected records. Do not optimize the logic prematurely.
                </p>
              </ConceptCard>
              <ConceptCard
                title="3 — Refactor the Search"
                icon={<LuGitBranch />}
              >
                <p>
                  Once the result is correct, rethink whether AND, OR, and
                  grouping can express the same business rule more clearly.
                </p>
              </ConceptCard>
            </div>
          </div>
          <Remember title="Treat a Search like a testable business rule">
            <p>
              A query can be syntactically valid and still be logically wrong.
              Predict the expected result first, run it, inspect Activity, and
              only then simplify or reorganize the logic.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 7"
            title="AND Changes Membership Only When the Added Requirement Excludes Something"
            icon={<LuGitBranch />}
          >
            <p>
              Boolean operators shape the returned set, but their effect depends
              on the actual data.
            </p>
          </SectionHeading>
          <Experiment
            label="Experiment 14-F"
            title="AND With a Criterion Everyone Already Meets"
            change="Record ID > 24 AND Status = Open. Limit Unlimited."
            prediction="Six should still be returned because all six IDs greater than 24 are already Open."
            observation={
              <>
                <p>
                  Activity: <strong>Found 6 Records of Tasks type</strong>.
                </p>
                <p className="mt-2">Six Loop Target Items appeared.</p>
              </>
            }
            conclusion={
              <p>
                Adding AND does not automatically reduce a result set. It
                reduces membership only when some otherwise qualifying records
                fail the added requirement.
              </p>
            }
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ConceptCard title="Before" icon={<LuDatabase />}>
              <p>
                <code>Record ID &gt; 24</code>
              </p>
              <p className="mt-2 font-bold">6 qualify</p>
            </ConceptCard>
            <ConceptCard title="After Adding AND" icon={<LuGitBranch />}>
              <p>
                <code>Record ID &gt; 24 AND Status = Open</code>
              </p>
              <p className="mt-2 font-bold">same 6 qualify</p>
            </ConceptCard>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 8"
            title="OR Can Broaden Membership Dramatically"
            icon={<LuGitBranch />}
          >
            <p>
              This was the experiment where MacDarian tossed MacGruber the
              lock-pick kit. One side of the OR was already true for every
              record.
            </p>
          </SectionHeading>
          <Experiment
            label="Experiment 14-G"
            title="Status = Open OR Due Date Before 11/15/2026"
            change="Use OR between Status = Open and Due Date before 11/15/2026. All 13 Tasks are currently Open."
            prediction="All 13 should qualify because every record satisfies the Status side of OR."
            observation={
              <>
                <p>
                  Activity: <strong>Found 13 Records of Tasks type</strong>.
                </p>
                <p className="mt-2">
                  <code>batch.size: 13</code>.
                </p>
                <p className="mt-2">
                  Later Due Dates still qualified, including #27 (Nov 18), #30
                  (Nov 20), and #29 (Dec 1).
                </p>
              </>
            }
            conclusion={
              <p>
                OR broadened membership because each record needed only one side
                to be true, and Status = Open was already true for all 13.
              </p>
            }
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ConceptCard title="AND" icon={<LuGitBranch />}>
              <p>
                A record must satisfy both requirements. It can narrow
                membership when the added criterion excludes records.
              </p>
            </ConceptCard>
            <ConceptCard title="OR" icon={<LuGitBranch />}>
              <p>
                A record may qualify through either route. It can broaden
                membership, but the actual effect still depends on the data.
              </p>
            </ConceptCard>
          </div>
          <Remember title="AND is not always narrower, and OR is not always larger">
            <p>
              Those are tendencies, not laws. The data decides the result. Ask:{" "}
              <strong>
                Which records satisfy the complete Boolean expression?
              </strong>
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 9"
            title="Grouping Turns Boolean Operators Into Business Meaning"
            icon={<LuGitBranch />}
          >
            <p>
              Once a Search has several criteria, grouping becomes the part that
              separates a merely valid query from a query that actually matches
              the business rule.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-red-700">
                Common Mistake
              </p>
              <h3 className="mt-2 text-xl font-bold">
                Reading criteria top-to-bottom instead of as one logical
                expression
              </h3>
              <p className="mt-4 leading-8">
                Several familiar conditions can look right while the AND, OR,
                and grouping around them express a different business rule.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Better Practice
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                Write the business rule first
              </h3>
              <p className="mt-4 leading-8">
                State the intended logic in plain language, predict the records
                that should qualify, build the Search, and compare Activity with
                that expectation before refactoring the criteria.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Query Design Pattern
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["1", "Business rule", "What do I actually mean?"],
                ["2", "Expected membership", "Which records should qualify?"],
                [
                  "3",
                  "Boolean expression",
                  "How should AND / OR / groups express it?",
                ],
                [
                  "4",
                  "Activity evidence",
                  "Did the returned records match the prediction?",
                ],
              ].map(([n, t, x]) => (
                <div
                  key={n}
                  className="rounded-xl border border-[#b7d8c2] bg-[#f0fff4] p-5"
                >
                  <p className="text-2xl font-extrabold text-[#276749]">{n}</p>
                  <p className="mt-2 font-bold text-[#205c38]">{t}</p>
                  <p className="mt-2 text-sm leading-6">{x}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 10"
            title="Activity Log Is Query Evidence"
            icon={<LuBookOpen />}
          >
            <p>
              As learned in Lesson 11, Activity is not just a troubleshooting
              screen. Here it becomes our experimental instrument for proving
              what Search Records returned.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            <ConceptCard title="Zero" icon={<LuX />}>
              <p>
                <strong>Found no Records of Tasks type</strong>
              </p>
              <p className="mt-2">
                <code>batch.size: 0</code>
              </p>
            </ConceptCard>
            <ConceptCard title="One" icon={<LuTarget />}>
              <p>
                <strong>Found a Record of Tasks type</strong>
              </p>
              <p className="mt-2">
                <code>batch.size: 1</code>
              </p>
            </ConceptCard>
            <ConceptCard title="Many" icon={<LuList />}>
              <p>
                <strong>Found 6 Records of Tasks type</strong>
              </p>
              <p className="mt-2">
                <code>batch.size: 6</code>
              </p>
            </ConceptCard>
          </div>
          <Remember title="The table tells us the current state. Activity tells us what the query returned during that run.">
            <p>
              Inspect returned records, batch size, Loop Target Items, loop
              indexes, and exported values instead of assuming the filter
              behaved as intended.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 11"
            title="Common Query Misconceptions"
            icon={<LuTriangleAlert />}
          >
            <p>
              These mistakes are dangerous because the Pipeline can still run
              successfully while the query returns the wrong records.
            </p>
          </SectionHeading>
          <div className="space-y-5">
            {[
              [
                "No records means the Pipeline failed.",
                "No. Our zero-record query completed successfully. Zero is a valid cardinality.",
              ],
              [
                "Limit 1 means only one record matched.",
                "No. Six records still qualified; Limit 1 returned one.",
              ],
              [
                "Adding another filter always reduces the result.",
                "No. Our AND query stayed at six because all six already met the added condition.",
              ],
              [
                "OR makes the query stricter.",
                "Not in our experiment. Because every Task was Open, OR returned all 13.",
              ],
              [
                "The first record I keep seeing must always be first.",
                "Repeated observation is evidence, but not automatically a guarantee about ordering.",
              ],
            ].map(([m, c]) => (
              <div
                key={m}
                className="grid overflow-hidden rounded-2xl border border-gray-300 bg-white md:grid-cols-[1fr_1.2fr]"
              >
                <div className="border-b border-gray-200 bg-red-50 p-5 md:border-b-0 md:border-r">
                  <p className="font-bold text-red-700">{m}</p>
                </div>
                <div className="bg-[#f0fff4] p-5">
                  <p className="leading-7">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 12"
            title="Evidence Board"
            icon={<LuBadgeCheck />}
          >
            <p>
              Query behavior is a perfect place to practice not turning one
              observation into a platform-wide rule.
            </p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6">
              <EvidenceBadge type="DOCUMENTED" />
              <h3 className="mt-4 text-xl font-bold text-blue-900">
                Documented / UI-Supported
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-blue-900">
                <li>Search Records generates a list.</li>
                <li>Limit caps records returned.</li>
                <li>
                  UTC is the default date/time comparison basis unless
                  app-local-time behavior is selected.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
              <EvidenceBadge type="OBSERVED" />
              <h3 className="mt-4 text-xl font-bold text-[#205c38]">
                Observed
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
                <li>0, 1, 2, and 6 returned records matched batch.size.</li>
                <li>Zero matches completed successfully.</li>
                <li>Limit 1 returned one; Limit 2 returned two.</li>
                <li>AND stayed at six when all six met both criteria.</li>
                <li>OR returned all 13 when every Task was Open.</li>
                <li>The six-record result was not in Record ID order.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
              <EvidenceBadge type="INFERRED" />
              <h3 className="mt-4 text-xl font-bold text-amber-900">
                Inferred
              </h3>
              <p className="mt-4 leading-8 text-amber-900">
                Broader queries can create more downstream work because more
                returned items become available for later processing. That is a
                design implication, not a precise performance claim.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-300 bg-violet-50 p-6">
              <EvidenceBadge type="SPECULATIVE" />
              <h3 className="mt-4 text-xl font-bold text-violet-900">
                Unresolved
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-violet-900">
                <li>Why the observed result order occurred.</li>
                <li>Whether that order is guaranteed.</li>
                <li>Deeper app-local-time behavior.</li>
                <li>Advanced Filter behavior not yet tested.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 13"
            title="The Final Query Mental Model"
            icon={<LuRoute />}
          >
            <p>
              The query builds the list before Lesson 13&apos;s downstream Loop
              and Condition logic ever begins.
            </p>
          </SectionHeading>
          <div className="mx-auto max-w-2xl">
            <FlowStep
              icon={<LuFilter />}
              title="SEARCH CRITERIA"
              text="Who qualifies?"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuGitBranch />}
              title="BOOLEAN LOGIC"
              text="How are the criteria combined?"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuDatabase />}
              title="QUALIFYING RECORDS"
              text="Which records satisfy the complete expression?"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuSettings2 />}
              title="LIMIT"
              text="How many qualifying records may be returned?"
            />
            <FlowArrow />
            <FlowStep
              icon={<LuList />}
              title="RETURNED LIST"
              text="What downstream steps receive."
              final
            />
          </div>
          <Remember title="Lesson 13 taught us how to process a list. Lesson 14 taught us how that list is deliberately constructed.">
            <p>
              Query design is where business meaning becomes membership. If the
              wrong records enter the list, every perfectly designed downstream
              step is now processing the wrong data.
            </p>
          </Remember>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Part 14"
            title="Controlled Experiments Recap"
            icon={<LuTable2 />}
          >
            <p>The seven experiments tell the Lesson 14 story at a glance.</p>
          </SectionHeading>
          <div className="overflow-x-auto rounded-2xl border border-gray-300 bg-white">
            <table className="w-full min-w-190">
              <thead className="bg-[#205c38] text-white">
                <tr>
                  <th className="p-4 text-left">Experiment</th>
                  <th className="p-4 text-left">Change</th>
                  <th className="p-4 text-left">Returned</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["14-A", "Record ID = 24", "1"],
                  ["14-B", "Record ID > 24", "6"],
                  ["14-C", "Record ID > 30", "0"],
                  ["14-D", "Limit 1", "1"],
                  ["14-E", "Limit 2", "2"],
                  ["14-F", "ID > 24 AND Status = Open", "6"],
                  ["14-G", "Status = Open OR Due Date < 11/15/26", "13"],
                ].map((r, i) => (
                  <tr
                    key={r[0]}
                    className={`border-t ${i % 2 ? "bg-[#fbfcfb]" : ""}`}
                  >
                    <td className="p-4 font-bold text-[#205c38]">{r[0]}</td>
                    <td className="p-4 font-mono text-sm">{r[1]}</td>
                    <td className="p-4 font-bold">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="lesson-14-quiz" className="mb-14 scroll-mt-8">
          <SectionHeading
            eyebrow="Part 15"
            title="Lesson 14 Quiz — True or False"
            icon={<LuCircleHelp />}
          >
            <p>
              Test qualification, cardinality, Limit, Boolean membership,
              ordering evidence, and Activity.
            </p>
          </SectionHeading>
          <div className="space-y-5">
            {quizQuestions.map((q) => {
              const selected = answers[q.id];
              const correct = selected === q.answer;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-gray-300 bg-white p-6"
                >
                  <p className="font-bold text-[#205c38]">
                    {q.id}. {q.statement}
                  </p>
                  <div className="mt-4 flex gap-3">
                    {[true, false].map((v) => (
                      <button
                        key={String(v)}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        className={`rounded-lg border px-5 py-2.5 font-bold ${selected === v ? "border-[#276749] bg-[#276749] text-white" : "border-gray-300 bg-white"}`}
                      >
                        {v ? "True" : "False"}
                      </button>
                    ))}
                  </div>
                  {showResults && selected !== undefined && (
                    <div
                      className={`mt-5 rounded-xl border p-4 ${correct ? "border-[#9fc9ad] bg-[#f0fff4]" : "border-red-200 bg-red-50"}`}
                    >
                      <div className="flex items-start gap-3">
                        {correct ? (
                          <LuCheck className="mt-1 shrink-0 text-xl text-[#276749]" />
                        ) : (
                          <LuX className="mt-1 shrink-0 text-xl text-red-700" />
                        )}
                        <div>
                          <p className="font-bold">
                            {correct ? "Correct" : "Not quite"} —{" "}
                            {q.answer ? "True" : "False"}
                          </p>
                          <p className="mt-2 leading-7">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              disabled={answered < quizQuestions.length}
              onClick={() => setShowResults(true)}
              className="rounded-lg bg-[#276749] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Answers
            </button>
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-lg border-2 border-[#276749] px-6 py-3 font-bold text-[#276749]"
            >
              Retake Quiz
            </button>
            <p className="text-sm text-gray-600">
              Answered {answered} of {quizQuestions.length}
            </p>
          </div>
          {showResults && (
            <div className="mt-6 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <div className="flex items-center gap-3">
                <LuBadgeCheck className="text-3xl text-[#276749]" />
                <p className="text-2xl font-extrabold text-[#205c38]">
                  Score: {score} / {quizQuestions.length}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mb-6">
          <div className="overflow-hidden rounded-3xl border-2 border-[#276749]">
            <div className="bg-[#205c38] p-7 text-white">
              <p className="font-bold uppercase tracking-[0.14em] text-white/70">
                Lesson 14 Complete
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Searching Records Is a Design Skill
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
                A good Search does more than compile a list. It expresses a
                business rule clearly enough that we can predict its membership,
                test it, inspect its evidence, and explain why each returned
                record belongs there.
              </p>
            </div>
            <div className="grid md:grid-cols-3">
              {[
                ["Criteria", "Who qualifies?"],
                ["Boolean Logic", "How do the criteria combine?"],
                ["Limit", "How many qualifying records are returned?"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="border-t border-[#9fc9ad] bg-[#f0fff4] p-6 md:border-r md:last:border-r-0"
                >
                  <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                    {a}
                  </p>
                  <p className="mt-2 text-lg font-bold text-[#205c38]">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/13"
              className="rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749]"
            >
              Previous Lesson
            </Link>
            <Link
              href="/lessons/15"
              className="rounded-lg bg-[#276749] px-5 py-3 font-bold text-white"
            >
              Continue to Lesson 15
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
