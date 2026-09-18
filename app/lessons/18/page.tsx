import Link from "next/link";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendarClock,
  LuCircleAlert,
  LuClock3,
  LuFileCode,
  LuFlaskConical,
  LuGitCompareArrows,
  LuInfo,
  LuLayers3,
  LuRefreshCw,
  LuRoute,
  LuTimerReset,
  LuTriangleAlert,
  LuBadgeCheck,
  LuList,
} from "react-icons/lu";

type Evidence = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "PREDICTED";

const evidenceStyles: Record<Evidence, string> = {
  DOCUMENTED: "border-blue-200 bg-blue-50 text-blue-800",
  OBSERVED: "border-emerald-200 bg-emerald-50 text-emerald-800",
  INFERRED: "border-amber-200 bg-amber-50 text-amber-900",
  PREDICTED: "border-violet-200 bg-violet-50 text-violet-800",
};

function EvidenceTag({ type }: { type: Evidence }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-extrabold tracking-wide ${evidenceStyles[type]}`}
    >
      {type}
    </span>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-100 shadow-sm">
      <code>{code}</code>
    </pre>
  );
}

const brokenAttempt = `{# Try to subtract the two Date/Time values by using
   the .time value we saw in Activity output. #}
{% set elapsed_seconds = aa.date_completed.time - aa.due_date.time %}

{# If elapsed_seconds is numeric, convert seconds into minutes
   so the duration is easier to read. #}
{% set elapsed_minutes = elapsed_seconds / 60 %}

{# Write both calculated values into Pipeline Results
   so we can inspect what the Pipeline produced. #}
Elapsed seconds: {{ elapsed_seconds }}
Elapsed minutes: {{ elapsed_minutes }}

{# Three hours equals 10,800 seconds.
   Use that boundary to classify the Task. #}
{% if elapsed_seconds <= 10800 %}
WITHIN 3-HOUR REQUIREMENT
{% else %}
OVER 3-HOUR REQUIREMENT
{% endif %}`;

const directSubtraction = `{# Show the two Date/Time values exactly as the Pipeline sees them. #}
Due: {{ aa.due_date }}
Completed: {{ aa.date_completed }}

{# Subtract the Due Date directly from Date Completed.
   This tests whether Jinja can perform datetime arithmetic
   without trying to extract a separate numeric .time property. #}
Difference: {{ aa.date_completed - aa.due_date }}`;

const completedClassifier = `{# Subtract Due Date from Date Completed.
   The result is a duration, not a plain number. #}
{% set elapsed = aa.date_completed - aa.due_date %}

{# Convert that duration into total seconds so we can
   compare it against a fixed business threshold. #}
{% set seconds = elapsed.total_seconds() %}

{# Three hours = 10,800 seconds.
   The exact 3:00 boundary still counts as within the requirement. #}
{% if seconds <= 10800 %}
WITHIN 3-HOUR REQUIREMENT
{% else %}
OVER 3-HOUR REQUIREMENT
{% endif %}`;

const movingClock = `{# runtime.triggered_at gives us the UTC timestamp
   for when this Pipeline run began. This becomes our "current time"
   for every record evaluated during this run. #}
Run started: {{ runtime.triggered_at }}

{# Show the Task's stored Due Date for comparison. #}
Due: {{ aa.due_date }}

{# Instead of comparing two dates stored on the record,
   subtract the Due Date from the Pipeline's run time.
   Positive duration = the Due Date is in the past.
   Negative duration = the Due Date is still in the future. #}
Difference: {{ runtime.triggered_at - aa.due_date }}`;

const movingClassifier = `{# Compare the Pipeline's run time with the Task's Due Date.
   The result tells us where the Task sits relative to "now." #}
{% set elapsed = runtime.triggered_at - aa.due_date %}

{# Convert the duration into seconds so its sign and size
   can be tested against our three-hour business window. #}
{% set seconds = elapsed.total_seconds() %}

{# A negative result means the Due Date has not arrived yet.
   The Task is still upcoming. #}
{% if seconds < 0 %}
UPCOMING

{# Zero through 10,800 seconds means the Due Date has passed,
   but by no more than three hours. #}
{% elif seconds <= 10800 %}
WITHIN 3-HOUR WINDOW

{# Anything greater than 10,800 seconds means more than
   three hours have passed since the Task was due. #}
{% else %}
OVER 3-HOUR WINDOW

{% endif %}`;

const dataExceptionClassifier = `{# Compare the Pipeline's run time with the Due Date
   and convert the resulting duration into seconds. #}
{% set elapsed = runtime.triggered_at - aa.due_date %}
{% set seconds = elapsed.total_seconds() %}

{# Check the business data BEFORE classifying the Task by time.
   A Complete Task with no Date Completed contradicts our expected data,
   so we identify it as an exception instead of calling it overdue. #}
{% if aa.status == 'Complete' %}
DATA EXCEPTION — COMPLETE WITHOUT COMPLETION DATE

{# Only records that pass the business-data check continue
   into our normal time-based classification. #}
{% elif seconds < 0 %}
UPCOMING

{# The Due Date has passed, but by no more than three hours. #}
{% elif seconds <= 10800 %}
WITHIN 3-HOUR WINDOW

{# More than three hours have passed since the Due Date. #}
{% else %}
OVERDUE

{% endif %}`;

const projectComparison = `{# Show the Task and the two dates we are about to compare.
   The Project Target Date reaches the Task through the table relationship. #}
Task: {{ aa.task_name }}
Task Due: {{ aa.due_date }}
Project Target: {{ aa.project_target_date }}

{# Subtract the Task's Due Date from the Project Target Date.
   This gives us the amount of time separating the two deadlines. #}
{% set project_gap = aa.project_target_date - aa.due_date %}

{# Write the calculated gap into Pipeline Results so we can
   inspect both the duration and the classification that follows. #}
Task-to-Project Gap: {{ project_gap }}

{# If the Task is due later than the Project Target Date,
   the Task's own schedule extends beyond its parent Project's target. #}
{% if aa.due_date > aa.project_target_date %}
TASK DUE AFTER PROJECT TARGET

{# Equal Date/Time values mean the Task is due exactly
   at the Project's Target Date. #}
{% elif aa.due_date == aa.project_target_date %}
TASK DUE AT PROJECT TARGET

{# Otherwise, the Task is scheduled before the Project Target Date. #}
{% else %}
TASK DUE BEFORE PROJECT TARGET

{% endif %}`;

const combinedClassifier = `{# Establish the Task's position relative to the current Pipeline run
   and convert that duration into seconds for our time-based rules. #}
{% set elapsed = runtime.triggered_at - aa.due_date %}
{% set seconds = elapsed.total_seconds() %}

{# Rule 1: Check data integrity first.
   A Complete Task without Date Completed is contradictory business data,
   so do not allow the time calculation to misclassify it as overdue. #}
{% if aa.status == 'Complete' %}
DATA EXCEPTION — COMPLETE WITHOUT COMPLETION DATE

{# Rule 2: Check the Task against its parent Project.
   Even an upcoming Task can already represent a schedule conflict
   if its Due Date falls after the Project's Target Date. #}
{% elif aa.due_date > aa.project_target_date %}
PROJECT SCHEDULE CONFLICT — TASK DUE AFTER PROJECT TARGET

{# Rule 3: If no higher-priority problem exists, classify by current time.
   A negative duration means the Task's Due Date is still in the future. #}
{% elif seconds < 0 %}
UPCOMING

{# The Due Date has arrived, but no more than three hours have passed. #}
{% elif seconds <= 10800 %}
WITHIN 3-HOUR WINDOW

{# Anything remaining is more than three hours past its Due Date. #}
{% else %}
OVERDUE

{% endif %}`;

const completedResults = [
  [31, "3:30:00", "12600", "OVER"],
  [32, "2:00:00", "7200", "WITHIN"],
  [33, "0:00:00", "0", "WITHIN"],
  [34, "0:15:00", "900", "WITHIN"],
  [35, "2:00:00", "7200", "WITHIN"],
  [36, "3:01:00", "10860", "OVER"],
  [37, "2:59:00", "10740", "WITHIN"],
  [38, "3:00:00", "10800", "WITHIN"],
  [39, "0:45:00", "2700", "WITHIN"],
  [40, "5:00:00", "18000", "OVER"],
  [41, "4:00:00", "14400", "OVER"],
  [43, "3:01:00", "10860", "OVER"],
];

export default function Lesson18Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 18
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Dates, Time, and Scheduling
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
            A record can enter a different business state because the clock
            moved—even when nobody edited the record. In this lab we investigate
            Quickbase Date/Time values, UTC, duration arithmetic, runtime time,
            relationship dates, business-rule precedence, and scheduled
            reevaluation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#setup"
              className="rounded-xl bg-white px-4 py-2.5 font-bold text-[#205c38] shadow-sm hover:bg-[#f0fff4]"
            >
              Start the lab
            </a>
            <a
              href="#quiz"
              className="rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 font-bold text-white hover:bg-white/20"
            >
              Skip to quiz
            </a>
            <Link
              href="/lessons"
              className="rounded-xl border border-white/40 px-4 py-2.5 font-bold text-white hover:bg-white/10"
            >
              All lessons
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#276749]">
              Before You Begin
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Start Lesson 18 with fresh data and a fresh Pipeline
            </h2>

            <p className="mt-3 leading-7 text-slate-700">
              Lesson 18 uses a new set of Tasks and Projects created
              specifically for experimenting with dates and time. Download both
              CSV files and use them to prepare the tables for this lesson.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              The <strong>Tasks</strong> data contains 15 records with
              deliberately different Due Date and Date Completed values. These
              include durations below, at, and above our three-hour boundary,
              records that cross midnight, records without completion dates, and
              Tasks related to Projects with different target dates.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              The <strong>Projects</strong> data contains four parent Projects
              with different Target Dates. We will use the relationship between
              Projects and Tasks later in the lesson to compare a Task&apos;s
              Due Date with its Project&apos;s Target Date.
            </p>

            <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="font-bold text-amber-950">
                Leave your Lesson 17 Pipeline alone.
              </p>
              <p className="mt-1 leading-6 text-amber-900">
                Create a <strong>new Pipeline for Lesson 18</strong>. The
                previous Pipeline is evidence of what you learned in Lesson 17
                and should remain available as a working reference. Lesson 18
                starts fresh so its steps, runtime data, and Activity history
                belong only to our experiments with time.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-5">
              <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
                Build the Lesson 18 test Pipeline
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-900">
                We will use a familiar Pipeline pattern to investigate time.
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Create the new Lesson 18 Pipeline using the same basic
                experimental pattern we have used in earlier lessons. Add a{" "}
                <strong>Search Records</strong> step for the Tasks table,
                followed by an <strong>Update Record</strong> step inside the
                Loop created for the search results.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Step 1
                  </p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    Search Records
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Search the Lesson 18 <strong>Tasks</strong> table. We will
                    change the search criteria during the lesson depending on
                    which date behavior we are investigating.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Step 2
                  </p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    Loop through the results
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Search Records gives us a collection of Tasks. The Loop lets
                    the Update Record step work with each returned Task
                    individually.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Step 3
                  </p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    Update Pipeline Results
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Update the current Task and use its{" "}
                    <strong>Pipeline Results</strong> field as our laboratory
                    output.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border-l-4 border-[#276749] bg-[#f0fff4] p-4">
                <p className="font-extrabold text-slate-900">
                  Pipeline Results is our test bench.
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                  Throughout Lesson 18, most of the Jinja expressions we write
                  will go into the <strong>Pipeline Results</strong> field
                  mapping in the Update Record step. After running the Pipeline,
                  return to the Tasks table and inspect Pipeline Results beside
                  the Task&apos;s Due Date, Date Completed, Status, Project
                  dates, and other fields involved in the experiment.
                </p>

                <p className="mt-3 leading-7 text-slate-700">
                  This gives us two forms of evidence. The{" "}
                  <strong>Activity Log</strong> shows what the Pipeline received
                  and executed at runtime, while the{" "}
                  <strong>Tasks table</strong> preserves the Jinja-produced
                  result beside the business data that produced it. We can
                  compare the two instead of guessing what the expression did.
                </p>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4">
                <LuFileCode className="mt-1 shrink-0 text-xl text-sky-700" />
                <p className="text-sm leading-6 text-slate-700">
                  <strong className="text-slate-900">
                    Expect this Pipeline to change during the lesson.
                  </strong>{" "}
                  We are not building the final automation yet. We will
                  deliberately change Search Records criteria and replace the
                  Jinja written to Pipeline Results as each experiment asks a
                  new question about time.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 space-y-3 lg:w-72">
            <a
              href="../../downloads/Lesson_18_Tasks.csv"
              download
              className="block rounded-xl bg-[#276749] px-5 py-4 font-bold text-white transition hover:bg-[#205c38]"
            >
              Download Lesson 18 Tasks
              <span className="mt-1 block text-sm font-normal text-white/80">
                15 time-testing Task records
              </span>
            </a>

            <a
              href="../../downloads/Lesson_18_Projects.csv"
              download
              className="block rounded-xl border border-[#276749] bg-white px-5 py-4 font-bold text-[#205c38] transition hover:bg-[#e6f4ea]"
            >
              Download Lesson 18 Projects
              <span className="mt-1 block text-sm font-normal text-slate-600">
                4 parent Projects with Target Dates
              </span>
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-[#276749]/20 pt-5">
          <p className="text-sm leading-6 text-slate-600">
            <strong className="text-slate-800">Why fresh data?</strong> Some
            records in these files are intentionally unusual. Do not clean them
            up simply because they look wrong. Those edge cases give us evidence
            for what our date logic actually does when business data is
            incomplete, contradictory, or sitting directly on a time boundary.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10 lg:px-8">
        <section className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-[#f0fff4] p-6 lg:col-span-2">
              <div className="flex items-start gap-4">
                <LuCalendarClock className="mt-1 shrink-0 text-3xl text-[#276749]" />

                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
                    Central idea
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Time can change business state without changing the record.
                  </h2>

                  <p className="mt-3 leading-7 text-slate-700">
                    Until now, most of our Pipelines have reacted to something
                    that happened to a record. A field changed, a record was
                    updated, or some other event gave the Pipeline a reason to
                    run. Time-driven automation introduces a different kind of
                    change.
                  </p>

                  <p className="mt-3 leading-7 text-slate-700">
                    Imagine a Task due today at 10:00 AM. At 9:55 AM it is still
                    upcoming. At 10:05 AM it is overdue. The Task did not need
                    to be edited for that business state to change. The clock
                    moved, and the meaning of the existing data changed with it.
                  </p>

                  <p className="mt-3 leading-7 text-slate-700">
                    That is why a record-update trigger alone cannot represent
                    every time-driven business process. Sometimes automation
                    must wake up, examine records that have not changed, compare
                    their stored dates with the current time, and decide what
                    those dates mean <em>now</em>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                A new question
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-900">
                What time is it?
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                That sounds like a simple question until an app, a Pipeline, and
                a scheduler are involved.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                During this lesson we will discover that Quickbase can represent
                the same business moment in different time contexts.
                Understanding which context we are looking at becomes essential
                before we compare dates, calculate durations, or schedule
                automation.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="max-w-4xl">
              <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
                The three clocks
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                One business process can involve three different time contexts.
              </h2>

              <p className="mt-3 leading-7 text-slate-700">
                We are going to keep track of three &quot;clocks&quot;
                throughout this lesson. They are not three clocks literally
                ticking independently. They are three places where time is
                interpreted or represented during the life of our automation.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-emerald-200 bg-[#f0fff4] p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#276749]">
                  Clock 1 · The application
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                  App timezone
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  This is the human-facing clock. It affects how Quickbase
                  presents and interprets Date/Time values in the application.
                  When someone enters a Due Date and sees a time on a Task, this
                  is the context that makes that time meaningful to the user.
                </p>

                <p className="mt-3 text-sm font-semibold text-[#205c38]">
                  Think: &quot;What time does the Quickbase user see?&quot;
                </p>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  Clock 2 · The execution
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                  Pipeline runtime UTC
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  When our Pipeline receives Date/Time values, Activity and
                  runtime references can expose the underlying instant in UTC.
                  This is the time context we will actually use while
                  subtracting datetimes, measuring elapsed time, and comparing a
                  Due Date with the moment a Pipeline run began.
                </p>

                <p className="mt-3 text-sm font-semibold text-sky-800">
                  Think: &quot;What instant is the Pipeline calculating
                  with?&quot;
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  Clock 3 · The automation
                </p>

                <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                  Scheduler timezone
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  A scheduled Pipeline needs its own answer to &quot;when should
                  I run?&quot; The scheduler&apos;s timezone determines when a
                  configured schedule is due to start. Once that run begins, the
                  Pipeline has its own runtime timestamp.
                </p>

                <p className="mt-3 text-sm font-semibold text-amber-800">
                  Think: &quot;When should the Pipeline wake up and look?&quot;
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border-l-4 border-[#276749] bg-slate-50 p-5">
              <p className="font-extrabold text-slate-900">
                Keep these clocks separate.
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                The app timezone does not tell us when a scheduled Pipeline
                starts. The scheduler timezone does not tell us how a Date/Time
                is displayed on a Task form. And the UTC timestamp we encounter
                during execution may not look like the local time the user
                entered even though both represent the same instant.
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                We will prove these differences instead of simply memorizing
                them. Then we will use that model to calculate completion
                durations, detect overdue Tasks, compare Task deadlines with
                Project targets, and finally decide when a Pipeline should
                reevaluate time-sensitive business state.
              </p>
            </div>
          </div>
        </section>

        <section
          id="setup"
          className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center gap-3">
            <LuFlaskConical className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              1. Give time a business rule we can test
            </h2>
          </div>

          <p className="mt-4 max-w-4xl leading-7 text-slate-700">
            We now have three time contexts to keep straight: the time users see
            in the app, the UTC values a Pipeline works with at runtime, and the
            timezone that determines when a scheduled Pipeline starts. Before we
            can investigate how those pieces behave, however, we need a business
            rule with an answer we already know.
          </p>

          <div className="mt-5 rounded-xl border-l-4 border-[#276749] bg-[#f0fff4] p-5">
            <p className="font-extrabold text-slate-900">
              Our Lesson 18 rule: a Task has a three-hour completion
              requirement.
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              For a completed Task, we will compare its{" "}
              <strong>Due Date</strong> with its <strong>Date Completed</strong>
              . If the Task was completed no more than three hours after its Due
              Date, it is within the requirement. Anything beyond three hours is
              outside the requirement.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              This rule gives our date experiments something concrete to prove.
              We are not subtracting timestamps merely to learn Jinja syntax. We
              need the Pipeline to turn two Date/Time values into a reliable
              business decision.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["2:59", "Must pass", "One minute inside the boundary"],
              ["3:00", "Must pass", "Exact boundary"],
              ["3:01", "Must fail", "One minute outside the boundary"],
            ].map(([time, result, note]) => (
              <div
                key={time}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-3xl font-black text-[#276749]">{time}</p>
                <p className="mt-2 font-extrabold">{result}</p>
                <p className="mt-1 text-sm text-slate-600">{note}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-4xl leading-7 text-slate-700">
            The Lesson 18 Tasks were deliberately built around this boundary.
            Some finish well inside three hours, some well outside it, and three
            records sit at <strong>2:59, 3:00, and 3:01</strong>. We also
            included midnight crossings, future Tasks, missing completion dates,
            and contradictory business data. The goal is not pretty sample data.
            It is data capable of making a wrong time model fail visibly.
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <LuTriangleAlert className="mt-1 shrink-0 text-xl text-amber-700" />
              <div>
                <p className="font-extrabold text-amber-950">
                  Do not clean away the ugly record.
                </p>
                <p className="mt-1 leading-7 text-amber-950">
                  Record #42 intentionally has{" "}
                  <strong>Status = Complete</strong> while{" "}
                  <strong>Date Completed is blank</strong>. It looks wrong
                  because it is wrong. Later, that contradiction will help us
                  discover why correct date arithmetic is not enough to make a
                  correct business decision.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
              Where this is going
            </p>

            <p className="mt-2 max-w-4xl leading-7 text-slate-700">
              We will begin with the easiest case:{" "}
              <strong>a Task that already has both timestamps</strong>. First we
              will discover how Pipeline Date/Time values behave and calculate
              the elapsed time between Due Date and Date Completed. Once that
              model works, we will remove Date Completed from the equation and
              ask a harder question:
              <strong>
                {" "}
                how can a Pipeline measure a Task against the current time?
              </strong>
            </p>

            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              From there, we can move beyond a single Task&apos;s deadline,
              compare it with its parent Project&apos;s Target Date, and finally
              ask when a scheduled Pipeline should wake up and reevaluate all of
              this changing business state.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuClock3 className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              2. Timezone investigation: know the app&apos;s clock before
              testing time
            </h2>
          </div>

          <p className="mt-4 max-w-4xl leading-7 text-slate-700">
            Before calculating a single duration, we needed to verify the first
            of our three clocks: <strong>the application timezone</strong>. A
            Due Date that displays as 3:00 PM is only useful test evidence if we
            understand which timezone Quickbase is using to interpret and
            display that 3:00 PM.
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-extrabold text-amber-950">
              Our Lesson 18 app was not initially using Central Time.
            </p>

            <p className="mt-2 leading-7 text-amber-950">
              When we inspected the Automation app&apos;s settings, its timezone
              was following the billing account timezone, which was set to{" "}
              <strong>Pacific Time</strong>. That explained why the Date/Time
              values displayed in the app did not match the Central Time values
              we intended for our Lesson 18 test records.
            </p>

            <p className="mt-3 leading-7 text-amber-950">
              Nothing was wrong with datetime arithmetic yet. Our test
              environment was using a different local-time context than we
              expected.
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
                Check the application setting
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-900">
                App Settings → App properties
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Open the application&apos;s settings and inspect its properties
                for the application timezone. This is where you can determine
                whether the app is following the billing account&apos;s timezone
                or using an override for this particular application.
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                For our Automation app, the inherited setting led us back to the
                billing account&apos;s Pacific timezone. Because our Lesson 18
                data was designed around Central Time, we changed the
                application&apos;s timezone override to{" "}
                <strong>Central Time</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-[#f0fff4] p-5">
              <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
                Before continuing
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-slate-900">
                Make your test data agree with your app timezone
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Verify the timezone you intend to use{" "}
                <strong>
                  before entering or correcting the Lesson 18 Date/Time values
                </strong>
                . If you change the app timezone after Date/Time values already
                exist, inspect those records again instead of assuming the
                displayed clock times will remain unchanged.
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                After changing our app from Pacific to Central Time, the same
                stored instants displayed <strong>two hours later</strong>. We
                then corrected the Lesson 18 Tasks under the Central Time
                setting so the visible Due Date and Date Completed values
                matched the test cases we intended to prove.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-[#276749] bg-slate-50 p-5">
            <p className="font-extrabold text-slate-900">
              Why did changing the timezone change what we saw?
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              A Date/Time represents a moment, while the application timezone
              controls how that moment is presented in local time. Changing the
              app&apos;s timezone did not give us a new moment in time. It
              changed the local clock representation of the existing instant.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              This is our first reason to keep <strong>display time</strong> and{" "}
              <strong>runtime time</strong> conceptually separate. The user may
              see a familiar Central Time value in the Tasks table while
              Pipeline Activity exposes that same moment as UTC.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
              Compare the app with Pipeline runtime
            </p>

            <p className="mt-2 max-w-4xl leading-7 text-slate-700">
              Once the app and our Lesson 18 records were corrected to Central
              Time, we ran the Pipeline and inspected the Date/Time values it
              received. These examples connect the local values visible in
              Quickbase with the UTC instants exposed during Pipeline execution.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <EvidenceTag type="OBSERVED" />
              <p className="mt-3 font-bold">Sep. 5, 6:00 AM Central</p>
              <code className="mt-2 block text-sm">
                2026-09-05 11:00:00+00:00
              </code>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                September was using daylight time: Central was UTC−5.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <EvidenceTag type="OBSERVED" />
              <p className="mt-3 font-bold">Nov. 22, 4:00 PM Central</p>
              <code className="mt-2 block text-sm">
                2026-11-22 22:00:00+00:00
              </code>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                November was using standard time: Central was UTC−6.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <EvidenceTag type="OBSERVED" />
              <p className="mt-3 font-bold">Dec. 1, 9:00 AM Central</p>
              <code className="mt-2 block text-sm">
                2026-12-01 15:00:00+00:00
              </code>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                December remained on standard time: Central was UTC−6.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5">
            <p className="font-extrabold text-slate-900">
              Do not solve this by memorizing UTC offsets.
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              Notice that Central Time did not even have one fixed UTC offset
              across our lesson data. September produced a five-hour difference
              while November and December produced six. Daylight-saving time
              changed the offset.
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              The useful lesson is therefore not &quot;add five hours&quot; or
              &quot;add six hours.&quot; It is to understand which time context
              you are looking at and let timezone-aware Date/Time values
              represent the actual instant.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm font-extrabold uppercase tracking-wider text-[#276749]">
              Clock 1 established
            </p>

            <p className="mt-2 max-w-4xl leading-7 text-slate-700">
              We now know what the application clock is doing and have corrected
              our test environment. Next we can move to <strong>Clock 2</strong>
              : the Date/Time objects the Pipeline actually receives, and
              whether Jinja can perform arithmetic with them directly.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <LuCircleAlert className="text-2xl text-red-700" />
            <h2 className="text-3xl font-extrabold">
              3. A useful failure: Activity output is not the Jinja object API
            </h2>
          </div>

          <p className="mt-4 leading-7 text-red-950">
            Activity expanded a Date/Time with properties such as{" "}
            <code>time</code> and <code>iso</code>. We predicted that{" "}
            <code>.time</code> might therefore be a numeric value available to
            Jinja. 
            <p>If that were true, we could subtract the two values,
            calculate an elapsed duration, and then test our three-hour business
            rule.</p>
          </p>

          <div className="mt-5 rounded-xl border border-red-200 bg-white p-5">
            <p className="font-extrabold text-slate-900">
              Put this Jinja in Pipeline Results
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              In the Lesson 18 Pipeline, open the <strong>Update Record</strong>{" "}
              step and place the following Jinja into the{" "}
              <strong>Pipeline Results</strong> field mapping.
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              Then run the Pipeline and inspect the Task record. Pipeline
              Results is our visible test output, while the Activity Log tells
              us what happened during execution.
            </p>
          </div>

          <div className="mt-5">
            <CodeBlock code={brokenAttempt} />
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-extrabold text-slate-900">
              What this code is trying to do
            </p>

            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                <strong>1. Subtract the timestamps.</strong>{" "}
                <code>aa.date_completed.time - aa.due_date.time</code> assumes
                the
                <code>.time</code> values exposed in Activity are numeric values
                that Jinja can subtract.
              </p>

              <p>
                <strong>2. Convert seconds to minutes.</strong> If the
                subtraction returned a number of seconds, dividing by 60 would
                give us elapsed minutes.
              </p>

              <p>
                <strong>3. Print the result.</strong> The two output lines would
                make the calculated values visible in the Task&apos;s Pipeline
                Results field.
              </p>

              <p>
                <strong>4. Apply the business rule.</strong> Three hours equals{" "}
                <code>10800</code> seconds, so the final <code>if</code>{" "}
                statement would classify the Task as within or over the
                three-hour requirement.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-red-200 bg-white p-5">
            <p className="font-extrabold text-red-800">Observed error</p>

            <code className="mt-2 block overflow-x-auto text-sm text-red-900">
              unsupported operand type(s) for -: &aposbuiltin_function_or_method&apos
              and &apos;builtin_function_or_method&apos
            </code>
          </div>

          <p className="mt-5 leading-7 text-red-950">
            The failure tells us something important: Activity serialization
            showed labels named <code>time</code> and <code>iso</code>, but that
            did <strong>not</strong> mean those labels were numeric Jinja
            properties. Jinja interpreted <code>.time</code> as a callable
            method instead of the number we expected.
          </p>

          <p className="mt-3 leading-7 text-red-950">
            This is why we use Pipeline Results and Activity together. The field
            shows us what our expression produced—or failed to produce—while
            Activity gives us the runtime evidence needed to correct our model
            instead of guessing.
          </p>

          <div className="mt-6 rounded-xl border-l-4 border-red-500 bg-white p-5">
            <p className="font-extrabold text-slate-900">Evidence lesson</p>

            <p className="mt-2 leading-7 text-slate-700">
              Activity serialization tells us how Quickbase{" "}
              <strong>describes runtime data</strong>. It does not automatically
              define the Jinja object API. We must test what Jinja can actually
              access and operate on.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuGitCompareArrows className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              4. The simpler model worked: subtract the datetimes
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            Instead of extracting seconds first, we asked Jinja to subtract one
            complete Date/Time value from another.
          </p>
          <div className="mt-5">
            <CodeBlock code={directSubtraction} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-extrabold">Record #37</p>
              <p className="mt-2 text-2xl font-black">2:59:00</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-extrabold">Record #38</p>
              <p className="mt-2 text-2xl font-black">3:00:00</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-extrabold">Record #36</p>
              <p className="mt-2 text-2xl font-black">3:01:00</p>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            Crossing midnight required no special case. Full Date/Time
            subtraction handled #35 and #43 correctly because the date is part
            of the value.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuTimerReset className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              5. Separate calculation from classification
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            The subtraction produced a duration. Calling{" "}
            <code>.total_seconds()</code> gave us a stable number for the
            business rule. Three hours equals 10,800 seconds.
          </p>
          <div className="mt-5">
            <CodeBlock code={completedClassifier} />
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Record</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Seconds</th>
                  <th className="px-4 py-3">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {completedResults.map(([id, duration, seconds, result]) => (
                  <tr key={id}>
                    <td className="px-4 py-3 font-bold">#{id}</td>
                    <td className="px-4 py-3">{duration}</td>
                    <td className="px-4 py-3">{seconds}</td>
                    <td className="px-4 py-3 font-extrabold">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 rounded-xl border border-emerald-200 bg-[#f0fff4] p-5">
            <EvidenceTag type="OBSERVED" />
            <p className="mt-3 leading-7">
              <strong>Boundary proven:</strong> 2:59 passed, 3:00 passed, and
              3:01 failed. The code matched the intended{" "}
              <code>&lt;= 10800</code> rule exactly.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuRefreshCw className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              6. Replace completion time with the moving clock
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            Completed records have two fixed timestamps. Incomplete records do
            not. To ask what state an unfinished Task is in <em>now</em>, we
            used the Pipeline run timestamp, <code>runtime.triggered_at</code>.
          </p>
          <div className="mt-5">
            <CodeBlock code={movingClock} />
          </div>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-extrabold">
              Observed at run start:{" "}
              <code>2026-09-18 17:14:49.379765+00:00</code>
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>
                <strong>#42:</strong> positive difference → Due Date was already
                in the past.
              </li>
              <li>
                <strong>#44:</strong> negative difference → Due Date was still
                in the future.
              </li>
              <li>
                <strong>#45:</strong> negative difference → Due Date was still
                in the future.
              </li>
            </ul>
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            <strong>Sign now has meaning:</strong> negative means the due
            instant is ahead of the run; positive means the run has moved past
            it.
          </p>
          <div className="mt-5">
            <CodeBlock code={movingClassifier} />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuLayers3 className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              7. Correct arithmetic is not enough
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            Record #42 exposed the difference between mathematical state and
            business state. Its Date Completed was blank, but Status said
            Complete. If we classified only by time, we would call it overdue
            and hide a data-quality problem.
          </p>
          <div className="mt-5">
            <CodeBlock code={dataExceptionClassifier} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-extrabold">#42</p>
              <p className="mt-2 text-sm font-bold">
                DATA EXCEPTION — COMPLETE WITHOUT COMPLETION DATE
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="font-extrabold">#44</p>
              <p className="mt-2 text-sm font-bold">UPCOMING</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="font-extrabold">#45</p>
              <p className="mt-2 text-sm font-bold">UPCOMING</p>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            Business rules need precedence. Sometimes the most important answer
            is not the time classification—it is that the record contradicts
            itself.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuRoute className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              8. Time can cross a relationship boundary
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            The Tasks table also exposed the parent Project Target Date through
            the relationship. That let us compare two different business clocks:
            when the Task is due and when the Project is targeted.
          </p>
          <div className="mt-5">
            <CodeBlock code={projectComparison} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="font-extrabold">#44</p>
              <p className="mt-2 text-sm">Task due before Project target.</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="font-extrabold">#45</p>
              <p className="mt-2 text-sm">Task due after Project target.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="font-extrabold">#42</p>
              <p className="mt-2 text-sm">Task due before Project target.</p>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            This revealed a useful conflict: #45 was still{" "}
            <strong>UPCOMING</strong> relative to the current run, yet its Task
            Due Date was already later than the parent Project Target Date. “Not
            overdue yet” does not mean “schedule is healthy.”
          </p>
        </section>
        <section className="rounded-2xl border border-[#b7dfc4] bg-[#f0fff4] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <LuFileCode className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              9. Combine the rules—and make their order intentional
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            The final expression did more than calculate time. It encoded which
            business concern should win when several facts are simultaneously
            true.
          </p>
          <div className="mt-5">
            <CodeBlock code={combinedClassifier} />
          </div>
          <div className="mt-6 rounded-xl border border-[#b7dfc4] bg-white p-5">
            <p className="font-extrabold text-[#205c38]">Observed precedence</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-700">
              <li>Contradictory completion data wins first.</li>
              <li>
                Project schedule conflict wins before ordinary upcoming/overdue
                state.
              </li>
              <li>Then the moving clock classifies the remaining records.</li>
            </ol>
          </div>
          <p className="mt-5 text-lg font-extrabold text-[#205c38]">
            The order of conditions is part of the business policy.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <LuCalendarClock className="text-2xl text-[#276749]" />
            <h2 className="text-3xl font-extrabold">
              10. Scheduling: the clock has to make us look again
            </h2>
          </div>
          <p className="mt-4 leading-7 text-slate-700">
            Our classifier can determine state at runtime, but an incomplete
            Task does not need to mutate for its state to change. A schedule
            gives the Pipeline another opportunity to evaluate the current
            state.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#276749]">
                Schedule
              </p>
              <p className="mt-2 font-bold">When do we look?</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#276749]">
                Record time
              </p>
              <p className="mt-2 font-bold">What state do we find?</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#276749]">
                Pipeline
              </p>
              <p className="mt-2 font-bold">What happens next?</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <EvidenceTag type="DOCUMENTED" />
            <p className="mt-3 leading-7 text-blue-950">
              Quickbase scheduling supports normal
              hourly/daily/weekly/monthly/yearly choices plus an advanced
              five-field CRON expression. Scheduling cannot run more often than
              once per hour.
            </p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="mb-2 font-extrabold">Every hour</p>
              <CodeBlock code={`0 * * * *`} />
            </div>
            <div>
              <p className="mb-2 font-extrabold">
                12:51 AM on the last day of each month
              </p>
              <CodeBlock code={`51 0 L * *`} />
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            We kept CRON intentionally brief. The architectural lesson matters
            more than memorizing scheduler syntax.
          </p>
        </section>
        <section className="rounded-2xl border border-slate-300 bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex items-center gap-3">
            <LuInfo className="text-2xl text-emerald-300" />
            <h2 className="text-3xl font-extrabold">
              The model we leave Lesson 18 with
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="font-extrabold text-emerald-200">1 · Calculate</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Subtract complete Date/Time values. Convert the duration to
                seconds only when the rule needs a numeric threshold.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <p className="font-extrabold text-emerald-200">2 · Classify</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Turn arithmetic into business meaning: upcoming, within window,
                overdue, conflict, or data exception.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-5">
              <p className="font-extrabold text-emerald-200">3 · Reevaluate</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                When state can change because time moved, schedule another
                evaluation rather than waiting for a record mutation.
              </p>
            </div>
          </div>
          <blockquote className="mt-7 border-l-4 border-emerald-300 pl-5 text-xl font-extrabold leading-8 text-white">
            The schedule determines WHEN WE LOOK. The record&apos;s time
            determines WHAT WE FIND. The Pipeline determines WHAT HAPPENS NEXT.
          </blockquote>
        </section>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-amber-950">
            Scope boundary
          </h2>
          <p className="mt-3 leading-7 text-amber-950">
            This lesson stops at time manipulation and scheduling. A later lab
            can take these classifications into downstream delivery, API calls,
            report generation, email, and more advanced execution control. Those
            are valuable—but they are separate automation concerns and should
            not blur what Lesson 18 actually proved.
          </p>
        </section>
        <section
          id="quiz"
          className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-3xl font-extrabold">Lesson 18 knowledge check</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Decide True or False before opening each explanation.
          </p>
          <div className="mt-6 space-y-4">
            {[
              [
                "A Task must be edited before its time-based business state can change.",
                "False",
                "The clock can move a Task from upcoming to overdue without any record mutation.",
              ],
              [
                "If Activity shows a property named time, Jinja can safely treat .time as a numeric timestamp.",
                "False",
                "Our subtraction attempt failed. Activity serialization and the Jinja object interface are not the same thing.",
              ],
              [
                "Subtracting two Quickbase Date/Time values can produce a duration that crosses midnight correctly.",
                "True",
                "The full datetime subtraction handled our midnight-crossing records without special logic.",
              ],
              [
                "Exactly three hours should fail a rule written as seconds <= 10800.",
                "False",
                "Three hours is exactly 10,800 seconds, so it passes. 3:01 failed.",
              ],
              [
                "A mathematically overdue Task should always be labeled OVERDUE before checking other business data.",
                "False",
                "Record #42 showed why data exceptions can deserve higher precedence than the time classification.",
              ],
              [
                "A Task can be upcoming relative to now and still conflict with its Project Target Date.",
                "True",
                "Record #45 demonstrated those are different comparisons answering different business questions.",
              ],
              [
                "Scheduler timezone and runtime.triggered_at describe the same thing.",
                "False",
                "Scheduler timezone controls when a run is started; runtime.triggered_at is the UTC timestamp for the run itself.",
              ],
            ].map(([q, answer, explanation], index) => (
              <details
                key={q}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <summary className="cursor-pointer list-none font-extrabold">
                  <span className="mr-2 text-[#276749]">{index + 1}.</span>
                  {q}
                </summary>
                <div className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-700">
                  <span className="mr-2 font-black text-[#276749]">
                    {answer}.
                  </span>
                  {explanation}
                </div>
              </details>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/lessons/17"
            className="inline-flex items-center gap-2 font-bold text-[#276749] hover:underline"
          >
            <LuArrowLeft /> Lesson 17
          </Link>
          <Link
            href="/lessons"
            className="font-bold text-slate-700 hover:underline"
          >
            Back to all lessons
          </Link>
          <span className="inline-flex items-center gap-2 font-bold text-slate-400">
            Next lesson <LuArrowRight />
          </span>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="rounded-2xl border border-[#276749]/20 bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#276749]">
              Lesson 18 Evidence Ledger
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              What we actually proved
            </h2>

            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              This lesson was built from controlled Pipeline experiments. These
              are observations from our lab—not assumptions about how time ought
              to work.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Quickbase Date/Time values can be subtracted directly in Pipeline Jinja.",
                "The resulting duration supports total_seconds() for numeric comparisons.",
                "A 3:00:00 duration passed our <= 10,800-second rule; 3:01:00 failed it.",
                "Datetime subtraction worked across midnight without special-case logic.",
                "runtime.triggered_at gave the Pipeline a consistent UTC run-start timestamp.",
                "Negative runtime-to-due durations identified future Due Dates; positive durations identified past Due Dates.",
                "Application timezone changed how stored instants were presented without changing the underlying instant.",
                "A related Project Target Date could participate directly in Task-level Jinja date comparisons.",
                "Correct date arithmetic did not resolve contradictory business data; business rules still had to decide what took priority.",
                "The order of Jinja if/elif conditions determined which business classification won when multiple conditions were true.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-[#276749]/15 bg-white p-4"
                >
                  <LuBadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#276749]" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#276749]/20 bg-white p-5">
              <p className="font-bold text-slate-900">The larger lesson</p>
              <p className="mt-2 leading-7 text-slate-700">
                A record does not have to change for its business meaning to
                change. The clock can move a Task from upcoming, to within its
                response window, to overdue while every field on the record
                remains untouched. Scheduling gives the Pipeline a way to wake
                up, look again, and make that changing state actionable.
              </p>
            </div>
          </div>
        </section>
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#276749]">
                Continue the Lab
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                Ready for Lesson 19?
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Lesson 18 showed how time can become business state inside a
                Pipeline. Continue to Lesson 19, or return to the Lessons page
                to review the complete Automation Developer Lab.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lessons/19"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#276749] px-5 py-3 font-bold text-white transition hover:bg-[#205c38]"
                >
                  Continue to Lesson 19
                  <LuArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/lessons"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-[#276749] hover:bg-[#f0fff4] hover:text-[#276749]"
                >
                  <LuList className="h-5 w-5" />
                  View All Lessons
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
