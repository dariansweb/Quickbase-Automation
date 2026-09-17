"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBraces,
  LuTableProperties,
  LuCircleAlert,
  LuDownload,
  LuCircleCheck,
  LuFlaskConical,
  LuLayers3,
  LuList,
  LuRoute,
  LuSearch,
  LuShieldCheck,
  LuSparkles,
  LuWorkflow,
} from "react-icons/lu";

type Evidence = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "SPECULATIVE";

const code = {
  upper: `{{ aa.task_name | upper }}`,
  chain: `{{ aa.task_name | upper | replace(' ', '_') }}`,
  splitJoin: `{{ aa.task_name.split() | join('_') | upper }}`,
  notes: `Task: {{ aa.task_name }} | Notes: {{ aa.notes }}`,
  defaultNotes: `{{ aa.notes | default('No notes provided', true) }}`,
  defaultHours: `{{ aa.estimated_hours | default('Not estimated', true) }}`,
  diagnose: `Value: [{{ aa.estimated_hours }}]
Defined: {{ aa.estimated_hours is defined }}
None: {{ aa.estimated_hours is none }}
Number: {{ aa.estimated_hours is number }}`,
  hoursIf: `{% if aa.estimated_hours is none %}
Not estimated
{% else %}
{{ aa.estimated_hours }}
{% endif %}`,
  user: `{% if aa.assigned_to is none %}
UNASSIGNED
{% else %}
{{ aa.assigned_to.last_name | upper }}, {{ aa.assigned_to.first_name }} [{{ aa.assigned_to.id }}]
{% endif %}`,
  tags: `{% set tags = aa.task_tags.split(',') %}
Task: {{ aa.task_name }} | Tags: {{ tags }}`,
  forLoop: `{% for tag in tags %}
[{{ tag }}]
{% endfor %}`,
  indexes: `{% for tag in tags %}
[{{ loop.index }}/{{ loop.index0 }}:{{ tag }}]
{% endfor %}`,
  nested: `{% for tag in tags %}
    {% if tag == 'Reporting' %}
        [{{ loop.index }}:{{ tag }}:MATCH]
    {% else %}
        [{{ loop.index }}:{{ tag }}]
    {% endif %}
{% endfor %}`,
  counter: `{% set matches = 0 %}

{% for tag in tags %}
    {% if tag == 'Reporting' %}
        {% set matches = matches + 1 %}
    {% endif %}
{% endfor %}

Reporting Matches: {{ matches }}`,
  namespace: `{% set ns = namespace(matches=0) %}

{% for tag in tags %}
    {% if tag == 'Reporting' %}
        {% set ns.matches = ns.matches + 1 %}
    {% endif %}
{% endfor %}

Reporting Matches: {{ ns.matches }}`,
  finale: `{% set tags = aa.task_tags.split(',') %}
{% set ns = namespace(has_november=false, has_reporting=false) %}

{% for tag in tags %}
    {% set clean_tag = tag | trim | lower %}

    {% if clean_tag == 'november' %}
        {% set ns.has_november = true %}
    {% endif %}

    {% if clean_tag == 'reporting' %}
        {% set ns.has_reporting = true %}
    {% endif %}
{% endfor %}

{% if ns.has_november and ns.has_reporting %}
NOVEMBER REPORTING TASK
{% elif ns.has_reporting %}
REPORTING TASK
{% else %}
GENERAL TASK
{% endif %}`,
};

function Badge({ type }: { type: Evidence }) {
  const s: Record<Evidence, string> = {
    DOCUMENTED: "border-blue-200 bg-blue-50 text-blue-800",
    OBSERVED: "border-emerald-200 bg-emerald-50 text-emerald-800",
    INFERRED: "border-amber-200 bg-amber-50 text-amber-900",
    SPECULATIVE: "border-purple-200 bg-purple-50 text-purple-800",
  };
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-extrabold tracking-[.08em] ${s[type]}`}
    >
      {type}
    </span>
  );
}

function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-4xl">
      <p className="font-extrabold uppercase tracking-[.14em] text-[#276749]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#17452a] sm:text-4xl">
        {title}
      </h2>
      {children && (
        <div className="mt-4 text-lg leading-8 text-gray-700">{children}</div>
      )}
    </div>
  );
}

function CodeBlock({
  value,
  label = "Jinja",
}: {
  value: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-sm">
      <div className="border-b border-slate-700 px-5 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-slate-300">
        {label}
      </div>
      <div className="overflow-x-auto p-5">
        <code className="whitespace-pre font-mono text-sm leading-7 text-slate-100">
          {value}
        </code>
      </div>
    </div>
  );
}

function Evidence({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge type="OBSERVED" />
        <p className="font-extrabold text-emerald-950">{title}</p>
      </div>
      <div className="mt-4 leading-7 text-emerald-950">{children}</div>
    </div>
  );
}

function Flow({ items }: { items: { title: string; text?: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((x, i) => (
        <div
          key={`${x.title}-${i}`}
          className="relative rounded-2xl border border-[#b8d9c3] bg-white p-5 shadow-sm"
        >
          <p className="font-extrabold text-[#205c38]">{x.title}</p>
          {x.text && (
            <p className="mt-2 text-sm leading-6 text-gray-600">{x.text}</p>
          )}
          {i < items.length - 1 && (
            <LuArrowDown className="mx-auto mt-4 h-5 w-5 text-[#276749] md:absolute md:-right-5 md:top-1/2 md:m-0 md:-translate-y-1/2 md:-rotate-90" />
          )}
        </div>
      ))}
    </div>
  );
}

const quiz = [
  [
    "Applying upper to Task Name changes the Quickbase Task Name field.",
    false,
    "Jinja can derive a new runtime representation without mutating the source field.",
  ],
  [
    "upper also removes extra spaces.",
    false,
    "Our repeated spaces remained repeated spaces. Jinja performed only the requested capitalization change.",
  ],
  [
    "split(',') can turn one string into a list of separate values.",
    true,
    "That is how the comma-separated Task Tags became a Jinja list.",
  ],
  [
    "A blank Numeric value being defined means it must contain a number.",
    false,
    "The blank Estimated Hours value was defined and None; its number test was False.",
  ],
  [
    "default('Not estimated', true) was safe when zero had business meaning.",
    false,
    "It also replaced legitimate zero, proving that valid syntax can still encode the wrong business rule.",
  ],
  [
    "A Quickbase Pipeline Loop and a Jinja for-loop are the same mechanism.",
    false,
    "Quickbase orchestrates Pipeline execution; a Jinja for-loop iterates inside one template evaluation.",
  ],
  [
    "loop.index and metadata.aa.loop.index are interchangeable.",
    false,
    "They belong to different loop owners and have different documented/observed index behavior.",
  ],
  [
    "namespace() can maintain mutable state across a Jinja loop during the current evaluation.",
    true,
    "That is why ns.matches reached 1 where the ordinary counter finished at 0; it is not Pipeline-global state.",
  ],
] as const;

export default function Lesson17Page() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  return (
    <main className="min-h-screen bg-[#f7faf8] text-gray-900">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#9fc9ad]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold uppercase tracking-[0.18em] text-white">
              Quickbase Explained · Automation Developer Lab · Lesson 17
            </p>

            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em]">
              Pipeline Expressions
            </span>
          </div>

          <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Transforming Data With Jinja
          </h1>

          <p className="mt-6 max-w-4xl text-xl font-medium leading-9">
            Lesson 16 taught us how Jinja reaches runtime data. Now we learn how
            to reshape that data into exactly what the next Pipeline step needs.
          </p>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
            This lab uses a deliberately messy Tasks dataset with mixed
            capitalization, repeated spaces, blank values, structured users,
            comma-separated tags, and controlled numeric values. The mess is
            intentional—we need data that gives our transformations something
            real to solve.
          </p>

          <div className="mt-8 rounded-xl border border-white/25 bg-white/10 p-5">
            <p className="font-extrabold">The finish line</p>
            <p className="mt-2 leading-7 text-white/95">
              Don&apos;t memorize a bag of Jinja filters. Learn to inspect
              runtime data, decide what shape you need, transform it
              deliberately, and produce a value the workflow can use.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/16"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              ← Lesson 16
            </Link>

            <Link
              href="/lessons/18"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              Lesson 18 →
            </Link>

            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]"
            >
              Table of Contents
            </Link>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold text-white hover:bg-white/20"
            >
              <LuBookOpen className="h-5 w-5" aria-hidden="true" />
              Skip to Quiz
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <div className="rounded-3xl border border-[#9fc9ad] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#276749] text-white">
                <LuTableProperties className="h-6 w-6" aria-hidden="true" />
              </div>

              <div className="flex-1">
                <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                  A Fresh Starting Point
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#17452a] sm:text-3xl">
                  Lesson 17 starts with a brand-new Tasks table.
                </h2>

                <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-700">
                  Up to this point, our original Tasks table has traveled with
                  us through notifications, Pipeline triggers, searches, loops,
                  conditions, runtime references, and Jinja experiments. For
                  this lesson, we&apos;re starting fresh.
                </p>

                <p className="mt-4 max-w-4xl leading-7 text-gray-700">
                  The Lesson 17 dataset creates a new Tasks table with fresh
                  records and additional fields designed specifically for
                  transformation experiments. The unusual capitalization,
                  repeated spaces, blank values, numbers, and comma-separated
                  tags are intentional. They give Jinja real problems to solve.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                    <p className="font-extrabold text-[#205c38]">
                      Starting the Lab Here?
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      That&apos;s perfectly fine. You do not need the Tasks
                      table used throughout the earlier Automation lessons to
                      begin Lesson 17.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                    <p className="font-extrabold text-[#205c38]">
                      Build the Foundation
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      The Get Started page covers the basic Quickbase app and
                      Tasks-table setup this lab assumes. Use it first if
                      you&apos;re joining the course here.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                    <p className="font-extrabold text-[#205c38]">
                      Then Import Fresh Data
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Import the Lesson 17 CSV into a new Tasks table so your
                      records match the examples and controlled test conditions
                      used throughout this lesson.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white hover:bg-[#205c38]"
                  >
                    <LuBookOpen className="h-5 w-5" aria-hidden="true" />
                    Get Started
                  </Link>

                  <a
                    href="/downloads/Lesson_17_Tasks_Public.csv"
                    download
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-[#276749] bg-white px-5 py-3 font-bold text-[#276749] hover:bg-[#f0fff4]"
                  >
                    <LuDownload className="h-5 w-5" aria-hidden="true" />
                    Download Lesson 17 Tasks
                  </a>
                </div>

                <div className="mt-6 rounded-xl border-l-4 border-[#276749] bg-[#f0fff4] px-5 py-4">
                  <p className="font-bold leading-7 text-[#17452a]">
                    Think of Lesson 17 as a new laboratory bench: the earlier
                    lessons explain how we got here, but this fresh table gives
                    new learners a clean place to begin working with Pipeline
                    runtime data and Jinja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-14 lg:px-8">
        <section>
          <Heading
            eyebrow="Mental model"
            title="Jinja transforms runtime data; it does not have to change the source."
          >
            <p>
              A Pipeline may receive inconsistent text, a blank field, a
              structured User, a number, or text that really represents several
              items. Jinja can reshape those runtime values before the next
              action uses them.
            </p>
          </Heading>
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Runtime source",
                  text: "Quickbase makes a value available.",
                },
                {
                  title: "Jinja expression",
                  text: "We address that runtime value.",
                },
                {
                  title: "Transformation",
                  text: "We reshape or reason about it.",
                },
                {
                  title: "Pipeline action",
                  text: "A useful derived value moves forward.",
                },
              ]}
            />
          </div>
          <div className="mt-6 rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
            <div className="flex gap-4">
              <LuShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#276749]" />
              <div>
                <p className="text-xl font-extrabold text-[#17452a]">
                  Transformation does not require changing the source data.
                </p>
                <p className="mt-2 leading-7 text-gray-700">
                  Task Name remained unchanged in our experiments while Pipeline
                  Results received derived representations. Runtime
                  transformation and record mutation are different ideas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Lesson 17 laboratory"
            title="Messy test data is useful data."
          >
            <p>
              Our Tasks deliberately include mixed capitalization, repeated
              spaces, punctuation, blank Notes, blank Assigned To, numeric zero,
              and comma-separated Task Tags. Estimated Hours adds controlled
              values such as 3.5, 0, and blank.
            </p>
          </Heading>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "Text",
                "Review   Pending Applications tests repeated whitespace and case.",
              ],
              [
                "Missing values",
                "Blank Notes, User values, and Estimated Hours stop us from assuming every value exists.",
              ],
              [
                "Shape",
                "Task Tags is Text, but November,Reporting,Finance logically contains several items.",
              ],
            ].map(([a, b]) => (
              <div
                key={a}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <LuFlaskConical className="h-7 w-7 text-[#276749]" />
                <h3 className="mt-4 text-xl font-extrabold text-[#205c38]">
                  {a}
                </h3>
                <p className="mt-2 leading-7 text-gray-600">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg font-bold text-[#205c38]">
            A transformation that works only against perfectly clean records has
            not been tested very hard.
          </p>
        </section>

        <section>
          <Heading
            eyebrow="Start gently"
            title="One runtime value. One transformation."
          >
            <p>
              The vertical bar is the Jinja filter operator. At this level, read
              it as: “Take the value on the left and send it through this
              transformation.”
            </p>
          </Heading>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <CodeBlock value={code.upper} />
            <Evidence title="Capitalization changed; whitespace did not.">
              <p className="font-mono text-sm">
                validate november report data → VALIDATE NOVEMBER REPORT DATA
              </p>
              <p className="mt-3 font-mono text-sm">
                Review&nbsp;&nbsp;&nbsp;Pending Applications →
                REVIEW&nbsp;&nbsp;&nbsp;PENDING APPLICATIONS
              </p>
            </Evidence>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-xl font-extrabold text-amber-950">
              Jinja does what you ask—not what you meant.
            </p>
            <p className="mt-2 leading-7 text-amber-900">
              <code>upper</code> changed capitalization. It did not secretly
              clean whitespace.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Chaining"
            title="A transformation can feed another transformation."
          >
            <p>
              Read chained filters from left to right and reason about the
              intermediate value at each stage.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.chain} />
          </div>
          <div className="mt-6">
            <Flow
              items={[
                { title: "Review   Pending Applications" },
                { title: "upper", text: "REVIEW   PENDING APPLICATIONS" },
                { title: "replace", text: "Every space becomes _" },
                { title: "REVIEW___PENDING_APPLICATIONS" },
              ]}
            />
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Three spaces became three underscores. <code>replace</code> followed
            the instruction exactly.
          </p>
        </section>

        <section>
          <Heading
            eyebrow="Changing shape"
            title="split() can turn text into a collection."
          >
            <p>
              Sometimes formatting is not the real problem. The value is in the
              wrong shape.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.splitJoin} />
          </div>
          <div className="mt-6">
            <Flow
              items={[
                { title: "String", text: "Review   Pending Applications" },
                {
                  title: "split()",
                  text: '["Review", "Pending", "Applications"]',
                },
                { title: "join('_')", text: "Review_Pending_Applications" },
                { title: "upper", text: "REVIEW_PENDING_APPLICATIONS" },
              ]}
            />
          </div>
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[.12em] text-blue-800">
              What do those parentheses mean?
            </p>
            <p className="mt-3 leading-8 text-blue-950">
              Think of <code>split</code> as the name on a machine. The{" "}
              <code>()</code> tells Jinja to run or call that operation.{" "}
              <code>split()</code> uses its normal behavior;{" "}
              <code>split(&apos;,&apos;)</code> supplies a comma as an{" "}
              <strong>argument</strong> telling the operation how to do its job.
            </p>
            <p className="mt-3 text-blue-900">
              The programming term is a <strong>function-style call</strong>. We
              will use the real vocabulary without making the vocabulary harder
              than the idea.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Missing data"
            title="Blank output is evidence—but not enough evidence."
          >
            <p>
              A blank Notes field produced no visible text. That alone did not
              tell us what underlying runtime value Jinja received.
            </p>
          </Heading>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <CodeBlock value={code.notes} />
            <Evidence title="Observed rendering">
              <p className="font-mono text-sm">
                Notes: Confirm totals before publishing.
              </p>
              <p className="mt-3 font-mono text-sm">Notes:</p>
            </Evidence>
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            <strong>
              Do not infer a data type merely from rendered output.
            </strong>{" "}
            That habit becomes increasingly important as expressions get more
            complex.
          </p>
        </section>

        <section>
          <Heading
            eyebrow="Fallback values"
            title="default helps—until the business rule disagrees."
          >
            <p>
              Fallbacks are useful, but the arguments we supply determine what
              counts as needing a fallback.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.defaultNotes} />
          </div>
          <Evidence title="Blank Notes">
            <p className="font-mono">blank Notes → No notes provided</p>
          </Evidence>
          <h3 className="mt-10 text-2xl font-extrabold text-[#17452a]">
            Then Estimated Hours exposed the zero trap.
          </h3>
          <div className="mt-6">
            <CodeBlock value={code.defaultHours} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["3.5", "3.5"],
              ["blank", "Not estimated"],
              ["0", "Not estimated"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="rounded-2xl border bg-white p-5 text-center"
              >
                <p className="font-extrabold">{a}</p>
                <LuArrowDown className="mx-auto my-3 text-[#276749]" />
                <p className="font-bold text-[#205c38]">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
            <p className="text-xl font-extrabold text-amber-950">
              A Jinja expression can be syntactically correct, run successfully,
              and still express the wrong business rule.
            </p>
            <p className="mt-2 leading-7 text-amber-900">
              Jinja did not know zero was meaningful to our application. Our
              rule was too broad.
            </p>
          </div>
        </section>

        <section>
          <Heading eyebrow="Stop guessing" title="Ask Jinja about the value.">
            <p>
              A Jinja <strong>test</strong> asks a yes-or-no question about a
              value.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.diagnose} />
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
            <table className="min-w-full text-left">
              <thead className="bg-[#e6f4ea]">
                <tr>
                  {["State", "Rendered", "Defined", "None", "Number"].map(
                    (x) => (
                      <th key={x} className="p-4 font-extrabold text-[#17452a]">
                        {x}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Blank", "[]", "True", "True", "False"],
                  ["Zero", "[0.0]", "True", "False", "True"],
                  ["3.5", "[3.5]", "True", "False", "True"],
                  ["5", "[5.0]", "True", "False", "True"],
                ].map((r) => (
                  <tr key={r[0]}>
                    {r.map((x, i) => (
                      <td
                        key={`${r[0]}-${i}`}
                        className="p-4 font-mono text-sm"
                      >
                        {x}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["is defined", "Does Jinja know what I am referring to?"],
              ["is none", "Does the value currently contain None?"],
              ["is number", "Is the value recognized as a number?"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border bg-white p-5">
                <code className="font-bold text-[#205c38]">{a}</code>
                <p className="mt-2 text-gray-600">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xl font-extrabold text-[#17452a]">
            Defined does not mean populated.
          </p>
        </section>

        <section>
          <Heading
            eyebrow="Decisions"
            title="Now the expression can reflect the business meaning."
          >
            <p>
              <code>{"{{ ... }}"}</code> evaluates and outputs a value.{" "}
              <code>{"{% ... %}"}</code> gives Jinja a control instruction.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.hoursIf} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              "None → Not estimated",
              "0.0 → 0.0",
              "3.5 → 3.5",
              "5.0 → 5.0",
            ].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-950"
              >
                {x}
              </div>
            ))}
          </div>
          <p className="mt-6 leading-8 text-gray-700">
            <code>if</code> begins a decision. <code>else</code> means
            otherwise. <code>endif</code> closes the decision.
          </p>
        </section>

        <section>
          <Heading
            eyebrow="Structured values"
            title="Change representation without changing identity."
          >
            <p>
              Assigned To already taught us that one Quickbase User can expose
              several related runtime values. Now we transform those pieces.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.user} />
          </div>
          <Evidence title="Structured User representation">
            <p className="font-mono">
              Darian Ross → ROSS, Darian [63578510.bjcc]
            </p>
            <p className="mt-3">
              The user did not change. Jinja produced a different representation
              of the same structured runtime data.
            </p>
          </Evidence>
        </section>

        <section>
          <Heading
            eyebrow="Create a list"
            title="Task Tags changes from Text into a Jinja collection."
          >
            <p>
              A list is one value that holds an ordered collection of individual
              items.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.tags} />
          </div>
          <div className="mt-6">
            <Flow
              items={[
                { title: "Quickbase Text", text: "November,Reporting,Finance" },
                { title: "split(',')", text: "Separate at commas" },
                {
                  title: "Jinja List",
                  text: "['November', 'Reporting', 'Finance']",
                },
                { title: "Items", text: "Ready for iteration" },
              ]}
            />
          </div>
        </section>

        <section>
          <Heading
            eyebrow="The first real Jinja loop"
            title="Now Jinja owns an iteration."
          >
            <p>
              For each item in <code>tags</code>, temporarily call the current
              item <code>tag</code>, and evaluate this block once.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.forLoop} />
          </div>
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-white p-7">
            <h3 className="text-2xl font-extrabold text-[#17452a]">
              Quickbase Loop ≠ Jinja Loop
            </h3>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-[#f0fff4] p-6">
                <LuWorkflow className="h-7 w-7 text-[#276749]" />
                <p className="mt-3 font-extrabold">Quickbase Pipeline Loop</p>
                <p className="mt-2 leading-7 text-gray-700">
                  Quickbase establishes the current Task and orchestrates
                  Pipeline steps for it.
                </p>
                <code className="mt-4 block rounded-lg bg-white p-3">
                  current Task = aa
                </code>
              </div>
              <div className="rounded-2xl bg-slate-50 p-6">
                <LuBraces className="h-7 w-7" />
                <p className="mt-3 font-extrabold">Jinja for-loop</p>
                <p className="mt-2 leading-7 text-gray-700">
                  Inside one Jinja evaluation, Jinja iterates over the tags
                  list.
                </p>
                <code className="mt-4 block rounded-lg bg-white p-3">
                  tag #1 → tag #2 → tag #3
                </code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Loop position"
            title="Two loops. Two owners. Don't confuse their indexes."
          >
            <p>
              Jinja supplies its own special <code>loop</code> value while a
              Jinja for-loop is running.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.indexes} />
          </div>
          <Evidence title="Jinja indexes">
            <p className="font-mono">
              [1/0:November]
              <br />
              [2/1:Reporting]
              <br />
              [3/2:Finance]
            </p>
          </Evidence>
          <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
            <table className="min-w-full text-left">
              <thead className="bg-[#e6f4ea]">
                <tr>
                  {["Owner", "Reference", "Behavior"].map((x) => (
                    <th key={x} className="p-4 font-extrabold">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-bold">Quickbase Pipeline Loop</td>
                  <td className="p-4 font-mono text-sm">
                    metadata.aa.loop.index
                  </td>
                  <td className="p-4">Observed zero-based</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Jinja for-loop</td>
                  <td className="p-4 font-mono text-sm">loop.index</td>
                  <td className="p-4">One-based</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Jinja for-loop</td>
                  <td className="p-4 font-mono text-sm">loop.index0</td>
                  <td className="p-4">Zero-based</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Decisions inside iteration"
            title="Each tag reaches its own decision."
          >
            <p>
              The <code>if</code> is nested inside the <code>for</code>, so each
              individual tag is tested.
            </p>
          </Heading>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <CodeBlock value={code.nested} />
            <Evidence title="Reporting identified">
              <p className="font-mono">
                [1:November]
                <br />
                [2:Reporting:MATCH]
                <br />
                [3:Finance]
              </p>
            </Evidence>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Prediction first"
            title="The counter looks correct. What will it print?"
          >
            <p>
              Reporting is encountered. Most programmers seeing this for the
              first time expect <code>matches</code> to finish at 1.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.counter} />
          </div>
          <div className="mt-6 rounded-2xl border-2 border-rose-200 bg-rose-50 p-6">
            <div className="flex gap-4">
              <LuCircleAlert className="mt-1 h-7 w-7 shrink-0 text-rose-700" />
              <div>
                <Badge type="OBSERVED" />
                <h3 className="mt-3 text-2xl font-extrabold text-rose-950">
                  Reporting Matches: 0
                </h3>
                <p className="mt-3 leading-7 text-rose-900">
                  The loop encountered Reporting, yet the final ordinary counter
                  remained zero. This was not a syntax failure. It exposed a{" "}
                  <strong>scope problem</strong>—bringing Lesson 16 back into
                  the picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="namespace()"
            title="Give the Jinja loop a shared scoreboard."
          >
            <p>
              A namespace provides mutable state that can be updated during the
              Jinja loop and read after the loop finishes within the same Jinja
              evaluation.
            </p>
          </Heading>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <CodeBlock value={code.namespace} />
            <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[.12em] text-[#276749]">
                Shared scoreboard
              </p>
              {[
                "Before loop: matches = 0",
                "Reporting found: matches = 1",
                "Loop finishes",
                "ns.matches → 1",
              ].map((x, i) => (
                <div key={x} className="mt-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#276749] text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <p className="font-bold">{x}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Evidence title="Ordinary counter">
              <code>Reporting encountered → final matches = 0</code>
            </Evidence>
            <Evidence title="Namespace counter">
              <code>Reporting encountered → final ns.matches = 1</code>
            </Evidence>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
            <p className="text-xl font-extrabold text-amber-950">
              namespace() does not create a Pipeline-wide global variable.
            </p>
            <p className="mt-2 leading-7 text-amber-900">
              It maintains state across iterations of this Jinja loop during the
              current Jinja evaluation. It does not automatically make{" "}
              <code>ns</code> available to later Quickbase Pipeline steps.
            </p>
          </div>
        </section>

        <section>
          <Heading eyebrow="The Hail Mary" title="Can you read this now?">
            <p>
              You do not need to write it from memory. The finish line is being
              able to read the logic because every piece has already been
              learned in isolation.
            </p>
          </Heading>
          <div className="mt-8">
            <CodeBlock value={code.finale} label="Transformation program" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["1 · Acquire", "aa.task_tags", "Read runtime data."],
              ["2 · Reshape", "split(',')", "Text becomes a list."],
              [
                "3 · Prepare state",
                "namespace(...)",
                "Create facts that survive iteration.",
              ],
              ["4 · Iterate", "for tag in tags", "Process each tag."],
              [
                "5 · Normalize",
                "trim | lower",
                "Create comparison-friendly text.",
              ],
              ["6 · Evaluate", "if clean_tag ==", "Determine meaning."],
              [
                "7 · Remember",
                "ns.has_... = true",
                "Carry discoveries through the loop.",
              ],
              ["8 · Decide", "if / elif / else", "Produce one business value."],
            ].map(([a, b, c]) => (
              <div
                key={a}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <p className="font-extrabold text-[#205c38]">{a}</p>
                <code className="mt-3 block rounded-lg bg-slate-100 p-2 text-xs">
                  {b}
                </code>
                <p className="mt-3 text-sm leading-6 text-gray-600">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold text-blue-950">
              <code>elif</code> means: “Otherwise, if this other condition is
              true...”
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Evidence supports the lesson"
            title="Teaching → model → example → evidence → principle."
          >
            <p>
              Our lab results keep the teaching grounded without turning the
              page into a chronological research diary.
            </p>
          </Heading>
          <div className="mt-6 flex flex-wrap gap-3">
            {(
              [
                "DOCUMENTED",
                "OBSERVED",
                "INFERRED",
                "SPECULATIVE",
              ] as Evidence[]
            ).map((x) => (
              <Badge key={x} type={x} />
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Evidence title="Blank Numeric Field">
              <code>
                Value: [] · Defined: True · None: True · Number: False
              </code>
            </Evidence>
            <Evidence title="Legitimate Zero">
              <code>
                Value: [0.0] · Defined: True · None: False · Number: True
              </code>
            </Evidence>
            <Evidence title="Ordinary Counter">
              <code>Reporting encountered · Final matches = 0</code>
            </Evidence>
            <Evidence title="Namespace Counter">
              <code>Reporting encountered · Final ns.matches = 1</code>
            </Evidence>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Final mental model"
            title="Think in transformations—not a memorized list of filters."
          >
            <p>
              The important skill is deciding what the data needs to become.
            </p>
          </Heading>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["SOURCE", "What runtime data do I have?", LuSearch],
              ["INSPECT", "What is actually present?", LuFlaskConical],
              ["NORMALIZE", "Make comparison-friendly values.", LuSparkles],
              ["RESHAPE", "Change string/list representation.", LuLayers3],
              ["ITERATE", "Process collection items.", LuList],
              ["TEST", "Ask yes/no questions.", LuCircleCheck],
              ["REMEMBER", "Carry state through iteration.", LuBadgeCheck],
              ["DECIDE", "Turn facts into business meaning.", LuRoute],
              ["OUTPUT", "Produce what the next step needs.", LuSparkles],
            ].map(([a, b, I]) => {
              const Icon = I as typeof LuSearch;
              return (
                <div
                  key={String(a)}
                  className="rounded-2xl border border-[#b8d9c3] bg-white p-5"
                >
                  <Icon className="h-6 w-6 text-[#276749]" />
                  <p className="mt-3 font-extrabold text-[#17452a]">
                    {String(a)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {String(b)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-3xl bg-[#17452a] p-8 text-white">
            <p className="text-sm font-extrabold uppercase tracking-[.16em] text-[#b7e4c7]">
              Lesson 17 outcome
            </p>
            <p className="mt-4 max-w-4xl text-2xl font-extrabold leading-10">
              I can look at runtime data, decide what shape I need, transform
              it, safely handle missing values, process collections, maintain
              state during iteration, and produce a value the next Pipeline step
              can use.
            </p>
          </div>
        </section>

        <section id="quiz" className="scroll-mt-8">
          <Heading
            eyebrow="Knowledge check"
            title="Can you reason about the transformation?"
          >
            <p>
              Choose True or False, then use the explanation to check the mental
              model—not just the answer.
            </p>
          </Heading>
          <div className="mt-8 space-y-5">
            {quiz.map((q, i) => {
              const chosen = answers[i];
              return (
                <div
                  key={q[0]}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <p className="font-extrabold leading-7">
                    {i + 1}. {q[0]}
                  </p>
                  <div className="mt-4 flex gap-3">
                    {[true, false].map((x) => (
                      <button
                        key={String(x)}
                        type="button"
                        onClick={() => setAnswers((o) => ({ ...o, [i]: x }))}
                        className={`rounded-lg border px-4 py-2 font-bold ${chosen === x ? "border-[#276749] bg-[#276749] text-white" : "border-gray-300"}`}
                      >
                        {x ? "True" : "False"}
                      </button>
                    ))}
                  </div>
                  {chosen !== undefined && (
                    <div
                      className={`mt-4 rounded-xl p-4 ${chosen === q[1] ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}
                    >
                      <p className="font-extrabold">
                        {chosen === q[1] ? "Correct." : "Not quite."}
                      </p>
                      <p className="mt-1 leading-7">{q[2]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="rounded-3xl border border-[#9fc9ad] bg-[#f0fff4] p-8">
            <p className="font-extrabold uppercase tracking-[.14em] text-[#276749]">
              Where this leaves us
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#17452a]">
              The braces are no longer the hard part.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
              Lesson 16 established where Jinja&apos;s data comes from and where
              names live. Lesson 17 adds deliberate transformation: inspect,
              normalize, reshape, iterate, preserve state when scope demands it,
              decide, and output.
            </p>
            <p className="mt-4 text-lg font-bold text-[#205c38]">
              The important skill is reasoning about the data.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
