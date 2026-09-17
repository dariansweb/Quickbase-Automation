"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBraces,
  LuArrowRight,
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
  finale: `{# Read the current Task's comma-separated tags and turn them into a Jinja list. #}
{% set tags = aa.task_tags.split(',') %}

{# Create shared state that can remember discoveries across loop iterations. #}
{% set ns = namespace(has_november=false, has_reporting=false) %}

{# Process each tag in the list one at a time. #}
{% for tag in tags %}

    {# Normalize the current tag so spaces and capitalization do not affect the comparison. #}
    {% set clean_tag = tag | trim | lower %}

    {# If November is found, remember that fact in the shared namespace. #}
    {% if clean_tag == 'november' %}
        {% set ns.has_november = true %}
    {% endif %}

    {# If Reporting is found, remember that fact too. #}
    {% if clean_tag == 'reporting' %}
        {% set ns.has_reporting = true %}
    {% endif %}

{% endfor %}

{# After every tag has been examined, use the remembered facts to classify the Task. #}
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
      </header>

      <div className="mx-auto max-w-6xl space-y-20 px-6 py-4 lg:px-8">
        <section>
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="mb-10 max-w-4xl">
              <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Before We Begin
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#17452a] sm:text-4xl">
                Build the Lesson 17 Laboratory
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-700">
                Lesson 17 starts with a brand-new Tasks table and a brand-new
                Pipeline. We are intentionally leaving the Lesson 16 laboratory
                untouched so its results remain available as evidence and
                reference.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-700">
                If you are joining the Automation Developer Lab here, this is
                also a good place to begin. The{" "}
                <Link
                  href="/get-started"
                  className="font-bold text-[#276749] underline decoration-2 underline-offset-4"
                >
                  Get Started
                </Link>{" "}
                page covers the basic Quickbase app and Tasks-table setup
                assumed by this lesson.
              </p>
            </div>

            <div className="space-y-8">
              {/* STEP 1 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    1
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Create the Fresh Tasks Table
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      Import the <strong>Lesson 17 Tasks CSV</strong> into
                      Quickbase as a new Tasks table.
                    </p>

                    <p className="mt-3 leading-7 text-gray-700">
                      This dataset intentionally contains values that will
                      become useful later in the lesson: mixed capitalization,
                      extra spaces, punctuation, blank values, comma-separated
                      tags, and other variations.{" "}
                      <strong>Do not clean them up.</strong> They are part of
                      our laboratory.
                    </p>

                    <div className="mt-5">
                      <a
                        href="../..//downloads/Lesson_17_Tasks.csv"
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white hover:bg-[#205c38]"
                      >
                        <LuDownload className="h-5 w-5" aria-hidden="true" />
                        Download Lesson 17 Tasks
                      </a>
                    </div>

                    <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                      <table className="min-w-full text-left">
                        <thead className="bg-[#e6f4ea] text-[#17452a]">
                          <tr>
                            <th className="p-4 font-extrabold">Field</th>
                            <th className="p-4 font-extrabold">Type</th>
                            <th className="p-4 font-extrabold">
                              Why We Need It
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {[
                            [
                              "Task Name",
                              "Text",
                              "Primary text-transformation source",
                            ],
                            [
                              "Status",
                              "Text – Multiple Choice",
                              "Familiar business data",
                            ],
                            ["Due Date", "Date", "Available runtime data"],
                            [
                              "Assigned To",
                              "User",
                              "Structured-value experiments",
                            ],
                            ["Notes", "Text", "Blank-value experiments"],
                            [
                              "Task Tags",
                              "Text",
                              "Text-to-list and Jinja loop experiments",
                            ],
                            [
                              "Pipeline Results",
                              "Text",
                              "Where our transformations will be written",
                            ],
                            [
                              "Pipeline Jinja",
                              "Text",
                              "Available workspace/output field",
                            ],
                            [
                              "Estimated Hours",
                              "Numeric",
                              "Numeric, blank, and zero experiments",
                            ],
                          ].map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${row[0]}-${cellIndex}`}
                                  className="p-4 align-top text-sm leading-6 text-gray-700"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <p className="font-extrabold text-amber-950">
                        Estimated Hours is especially important.
                      </p>

                      <p className="mt-2 leading-7 text-amber-900">
                        If it was not created during import, add it manually as
                        a <strong>Numeric</strong> field. Later we will
                        deliberately compare a blank Estimated Hours value with
                        a legitimate value of <code>0</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    2
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Create a Brand-New Pipeline
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      Go to <strong>Pipelines</strong> and create a new Pipeline
                      named:
                    </p>

                    <div className="mt-4 rounded-xl border border-[#b8d9c3] bg-[#f0fff4] px-5 py-4">
                      <p className="font-mono font-bold text-[#17452a]">
                        Lesson 17 - Transforming Data With Jinja
                      </p>
                    </div>

                    <p className="mt-4 leading-7 text-gray-700">
                      We are starting fresh intentionally. The Pipeline becomes
                      part of the Lesson 17 laboratory record rather than
                      altering the work preserved from Lesson 16.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    3
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Add the Quickbase Search Records Step
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      Add a Quickbase <strong>Search Records</strong> step and
                      configure it to search the new Tasks table.
                    </p>

                    <p className="mt-3 leading-7 text-gray-700">
                      This becomes our first step:
                    </p>

                    <div className="mt-4 max-w-md rounded-2xl border border-gray-200 bg-slate-950 p-5">
                      <code className="whitespace-pre font-mono text-sm leading-7 text-slate-100">
                        {`Step 1
Search Records
Reference ID: aa`}
                      </code>
                    </div>

                    <p className="mt-4 leading-7 text-gray-700">
                      For this laboratory, the Search should return our Lesson
                      17 Tasks so Quickbase can process them through the Loop it
                      creates for the returned list.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    4
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Make the Fields Available to Later Steps
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      In the Search Records configuration, use{" "}
                      <strong>Fields for subsequent steps</strong> to bring
                      forward the fields our later Jinja expressions will need.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        "Task Name",
                        "Status",
                        "Due Date",
                        "Assigned To",
                        "Notes",
                        "Task Tags",
                        "Pipeline Results",
                        "Pipeline Jinja",
                        "Estimated Hours",
                      ].map((field) => (
                        <div
                          key={field}
                          className="rounded-xl border border-[#cfe3d5] bg-[#f0fff4] px-4 py-3 font-bold text-[#205c38]"
                        >
                          {field}
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 leading-7 text-gray-700">
                      If your Lesson 17 Tasks table also contains existing
                      relationship fields, they can remain available, but they
                      are not the focus of this lesson.
                    </p>

                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-950">
                        Why are we doing this?
                      </p>

                      <p className="mt-2 leading-7 text-blue-900">
                        Jinja cannot magically reach into any field we happen to
                        think about later. Our expressions operate on the
                        runtime data Quickbase makes available to the step.
                        Selecting the fields needed by subsequent steps prepares
                        the runtime data our Lesson 17 transformations will use.
                      </p>

                      <p className="mt-3 font-bold leading-7 text-blue-950">
                        As we learned in Lesson 16, before we can transform a
                        value, that value must first be available in the runtime
                        context.
                      </p>
                    </div>

                    <p className="mt-4 leading-7 text-gray-700">
                      We are not reteaching runtime scope here. We are applying
                      it.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 5 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    5
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Add the Update Record Step
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      Add a Quickbase <strong>Update Record</strong> action
                      after Search Records. Quickbase will place the action in
                      the processing flow for the records returned by Search
                      Records.
                    </p>

                    <p className="mt-3 leading-7 text-gray-700">
                      Configure it to update the{" "}
                      <strong>current Tasks record</strong> from the Search
                      step.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                      <div className="rounded-2xl border border-[#b8d9c3] bg-white p-5 text-center shadow-sm">
                        <p className="font-extrabold text-[#205c38]">
                          Search Records
                        </p>
                        <p className="mt-1 font-mono text-sm text-gray-500">
                          aa
                        </p>
                      </div>

                      <LuArrowDown className="mx-auto h-6 w-6 text-[#276749] md:-rotate-90" />

                      <div className="rounded-2xl border border-[#b8d9c3] bg-white p-5 text-center shadow-sm">
                        <p className="font-extrabold text-[#205c38]">
                          Quickbase Loop
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Current Tasks record
                        </p>
                      </div>

                      <LuArrowDown className="mx-auto h-6 w-6 text-[#276749] md:-rotate-90" />

                      <div className="rounded-2xl border border-[#b8d9c3] bg-white p-5 text-center shadow-sm">
                        <p className="font-extrabold text-[#205c38]">
                          Update Record
                        </p>
                        <p className="mt-1 font-mono text-sm text-gray-500">
                          ab
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 leading-7 text-gray-700">
                      Choose <strong>Pipeline Results</strong> as the field we
                      will update.
                    </p>

                    <p className="mt-3 leading-7 text-gray-700">
                      This field becomes our laboratory output surface. Most of
                      the Jinja in this lesson will read runtime values from{" "}
                      <code>aa</code>, transform them, and write the resulting
                      value into <strong>Pipeline Results</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 6 */}
              <div className="rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                    6
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-[#17452a]">
                      Switch Pipeline Results to Jinja
                    </h3>

                    <p className="mt-4 leading-7 text-gray-700">
                      In the value for <strong>Pipeline Results</strong>, open
                      the Jinja editor.
                    </p>

                    <p className="mt-3 leading-7 text-gray-700">
                      Our basic pattern throughout the lesson will be:
                    </p>

                    <div className="mt-6">
                      <div className="grid gap-3 md:grid-cols-5 md:items-center">
                        {[
                          "Quickbase field",
                          "Search Records (aa)",
                          "Runtime reference",
                          "Jinja transformation",
                          "Update Record (ab)",
                        ].map((item, index) => (
                          <div key={item} className="contents">
                            <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-4 text-center font-bold text-[#205c38]">
                              {item}
                            </div>

                            {index < 4 && (
                              <LuArrowDown className="mx-auto h-5 w-5 text-[#276749] md:hidden" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-xl border border-[#b8d9c3] bg-white px-5 py-4 text-center font-bold text-[#17452a]">
                        Result → Pipeline Results
                      </div>
                    </div>

                    <p className="mt-5 leading-7 text-gray-700">
                      Our first transformation will eventually be as simple as:
                    </p>

                    <div className="mt-4 max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-5">
                      <code className="font-mono text-sm text-slate-100">
                        {"{{ aa.task_name | upper }}"}
                      </code>
                    </div>

                    <p className="mt-4 font-bold text-[#205c38]">
                      But don&apos;t run ahead yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* READY CHECK */}
            <div className="mt-10 rounded-3xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <LuCircleCheck
                  className="mt-1 h-8 w-8 shrink-0 text-[#276749]"
                  aria-hidden="true"
                />

                <div className="flex-1">
                  <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                    Before We Begin
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
                    Your Lesson 17 laboratory should now be ready.
                  </h3>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                      "Fresh Lesson 17 Tasks data",
                      "Estimated Hours Numeric field",
                      "Task Tags Text field",
                      "Pipeline Results Text field",
                      "Pipeline Jinja Text field",
                      "Lesson 17 - Transforming Data With Jinja Pipeline",
                      "aa — Search Records",
                      "ab — Update Record → Pipeline Results",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-[#cfe3d5] bg-white px-4 py-3"
                      >
                        <LuCircleCheck
                          className="h-5 w-5 shrink-0 text-[#276749]"
                          aria-hidden="true"
                        />
                        <span className="font-bold text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border-l-4 border-[#276749] bg-white p-5">
                    <p className="font-extrabold leading-7 text-[#17452a]">
                      Lesson 16 answered: “Where does Jinja get its data?”
                    </p>

                    <p className="mt-2 font-extrabold leading-7 text-[#276749]">
                      Lesson 17 begins with that answer already in place and
                      asks the next question: “Now that Jinja has the data, what
                      can we turn it into?”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
            eyebrow="Chaining Transformations"
            title="One transformation can feed the next."
          >
            <p>
              A single Jinja expression can apply more than one transformation
              to the same value. This is called{" "}
              <strong>chaining filters</strong>. Each filter receives the result
              produced by the filter before it.
            </p>
          </Heading>

          <div className="mt-8 rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
              Meet Our Test Record
            </p>

            <p className="mt-3 text-lg leading-8 text-gray-700">
              Our Lesson 17 Tasks data contains a deliberately messy Task Name:
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
              <code className="font-mono font-bold text-[#17452a]">
                Review&nbsp;&nbsp;&nbsp;Pending Applications
              </code>
            </div>

            <p className="mt-4 leading-7 text-gray-700">
              There are <strong>three spaces</strong> between{" "}
              <code>Review</code> and <code>Pending Applications</code>. Nothing
              is wrong with the CSV. We planted the extra spaces intentionally
              so we can see whether Jinja quietly cleans messy text for us—or
              simply follows the transformation we request.
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              The words themselves are not important.{" "}
              <strong>The unusual spacing is our experimental variable.</strong>
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-extrabold text-[#17452a]">
              First, predict the result
            </h3>

            <p className="mt-3 leading-7 text-gray-700">
              We already know that <code>upper</code> changes lowercase letters
              to uppercase. Now we are going to take that uppercase result and
              pass it into a second filter:
            </p>

            <div className="mt-5">
              <CodeBlock value={code.chain} />
            </div>

            <p className="mt-4 leading-7 text-gray-700">
              Read this expression from <strong>left to right</strong>:
            </p>
          </div>

          <div className="mt-6">
            <Flow
              items={[
                {
                  title: "Runtime value",
                  text: "Review   Pending Applications",
                },
                {
                  title: "upper",
                  text: "REVIEW   PENDING APPLICATIONS",
                },
                {
                  title: "replace(' ', '_')",
                  text: "Replace every individual space with an underscore",
                },
                {
                  title: "Final value",
                  text: "REVIEW___PENDING_APPLICATIONS",
                },
              ]}
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold text-[#17452a]">
                Transformation 1 — <code>upper</code>
              </p>

              <p className="mt-3 leading-7 text-gray-700">
                Jinja receives the original Task Name and converts its letters
                to uppercase.
              </p>

              <div className="mt-4 rounded-xl bg-[#f0fff4] p-4 font-mono text-sm text-[#17452a]">
                REVIEW&nbsp;&nbsp;&nbsp;PENDING APPLICATIONS
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Notice that the three spaces are still there. <code>upper</code>{" "}
                changes letter case. It was never asked to change whitespace.
              </p>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold text-[#17452a]">
                Transformation 2 — <code>replace</code>
              </p>

              <p className="mt-3 leading-7 text-gray-700">
                The uppercase result becomes the input to <code>replace</code>.
                We tell it to replace <strong>each space</strong> with an
                underscore.
              </p>

              <div className="mt-4 rounded-xl bg-[#f0fff4] p-4 font-mono text-sm text-[#17452a]">
                REVIEW___PENDING_APPLICATIONS
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                There were three spaces, so there are now three underscores.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Why this experiment matters
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              It would be easy to look at messy text and assume a transformation
              will somehow make it &quot;clean.&quot; That is not what happened.
              Each filter performed its own specific job and passed its result
              to the next filter.
            </p>

            <p className="mt-4 text-lg font-extrabold leading-8 text-[#276749]">
              Jinja does what you ask—not what you meant.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-extrabold text-amber-950">
              And we just discovered our next problem.
            </p>

            <p className="mt-2 leading-7 text-amber-900">
              We wanted something that looks like{" "}
              <code>REVIEW_PENDING_APPLICATIONS</code>, but our expression
              produced <code>REVIEW___PENDING_APPLICATIONS</code>. The
              expression worked perfectly—the result simply was not the result
              we wanted.
            </p>

            <p className="mt-3 font-bold leading-7 text-amber-950">
              Next, we need a way to treat those repeated spaces as separators
              instead of blindly replacing every space one at a time.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Changing shape"
            title="Sometimes the value is correct—but it is the wrong kind of value."
          >
            <p>
              So far, we have transformed text into different text. But Jinja
              can do something more important than formatting: it can change the{" "}
              <strong>shape of the data</strong>.
            </p>

            <p className="mt-4">
              That matters because some problems are difficult to solve while
              the value is still one long string. If we want to work with the
              individual parts, we first need to turn that string into a
              collection.
            </p>
          </Heading>

          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The problem
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              One string can contain several meaningful pieces.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Consider this Task Name:
            </p>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
              <code className="font-mono text-sm text-gray-800">
                Review Pending Applications
              </code>
            </div>

            <p className="mt-4 leading-8 text-gray-700">
              To us, that looks like three words. But at runtime it is still one
              text value. Jinja cannot treat <strong>Review</strong>,{" "}
              <strong>Pending</strong>, and <strong>Applications</strong> as
              separate items until we reshape the value.
            </p>
          </div>

          <div className="mt-8">
            <CodeBlock value={code.splitJoin} />
          </div>

          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Start with one string",
                  text: "Review   Pending Applications",
                },
                {
                  title: "split()",
                  text: '["Review", "Pending", "Applications"]',
                },
                {
                  title: "join('_')",
                  text: "Review_Pending_Applications",
                },
                {
                  title: "upper",
                  text: "REVIEW_PENDING_APPLICATIONS",
                },
              ]}
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                What split() changed
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                Before <code>split()</code>, Jinja had one string.
              </p>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                <code className="font-mono text-sm text-slate-100">
                  Review Pending Applications
                </code>
              </div>

              <p className="mt-4 leading-8 text-gray-700">
                After <code>split()</code>, Jinja has a{" "}
                <strong>list of three values</strong>.
              </p>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                <code className="font-mono text-sm text-slate-100">
                  {'["Review", "Pending", "Applications"]'}
                </code>
              </div>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Why that matters
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                Once the value becomes a list, Jinja can treat each piece as an
                individual item.
              </p>

              <p className="mt-4 leading-8 text-gray-700">
                Later in this lesson, we will use exactly this idea with{" "}
                <strong>Task Tags</strong>. A value such as{" "}
                <code>November,Reporting,Finance</code> begins as one Text
                field, but after splitting it, Jinja can inspect each tag
                separately.
              </p>

              <p className="mt-4 font-bold leading-7 text-[#17452a]">
                Reshaping data can make a problem possible to solve.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              What do those parentheses mean?
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Think of <code>split</code> as the name of an operation. The{" "}
              <code>()</code> tells Jinja to <strong>call</strong> or run that
              operation.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-mono font-bold text-blue-950">
                  split()
                </code>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Run <code>split</code> using its normal behavior. With no
                  separator supplied, whitespace is used to separate the words.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-mono font-bold text-blue-950">
                  {"split(',')"}
                </code>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Run <code>split</code>, but supply a comma as an{" "}
                  <strong>argument</strong>. The argument tells the operation
                  what separator to use.
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              The programming term is a <strong>function-style call</strong>. We
              are going to use the real vocabulary because you will see it again
              in Jinja, APIs, JavaScript, Python, and other programming
              environments.
            </p>

            <p className="mt-3 font-bold leading-7 text-blue-950">
              The vocabulary sounds more complicated than the idea: name an
              operation, call it, and optionally give it information inside the
              parentheses.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Jinja transformations are not limited to changing how a value
              looks. They can also change the value&apos;s shape—from one string
              into a list, from a list back into text, or from raw runtime data
              into a structure that is easier for the next operation to use.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Missing data"
            title="Blank output is evidence—but not enough evidence."
          >
            <p>
              When Jinja renders nothing for a field, we have learned something:
              there was no visible value to display. But we have{" "}
              <strong>not</strong> yet learned exactly what kind of runtime
              value Jinja received.
            </p>

            <p className="mt-4">
              That distinction matters because different kinds of
              &quot;missing&quot; values can behave differently when we start
              adding conditions, defaults, tests, and calculations.
            </p>
          </Heading>

          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Start with the simplest observation
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Ask Jinja to display the Notes field exactly as it arrives.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              We are not transforming anything yet. We are simply reading the
              runtime value and placing it beside a label so the result is
              easier to inspect.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <CodeBlock value={code.notes} />

              <p className="mt-4 text-sm leading-6 text-gray-600">
                The expression asks Jinja to render the current Task&apos;s
                Notes value from <code>aa</code>.
              </p>
            </div>

            <Evidence title="Observed rendering">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Record with Notes
                  </p>

                  <p className="mt-2 font-mono text-sm leading-7">
                    Notes: Confirm totals before publishing.
                  </p>
                </div>

                <div className="border-t border-[#cfe3d5] pt-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Record with blank Notes
                  </p>

                  <p className="mt-2 font-mono text-sm leading-7">Notes:</p>
                </div>
              </div>
            </Evidence>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                What we can say
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                The record with Notes produced visible text.
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                The record without Notes produced no visible value after the
                label.
              </p>

              <p className="mt-4 font-bold leading-7 text-[#17452a]">
                That is an observed rendering result.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-amber-800">
                What we cannot say yet
              </p>

              <p className="mt-3 leading-8 text-amber-950">
                We cannot conclude from the empty rendering alone whether Jinja
                received an empty string, <code>None</code>, an undefined value,
                or some other runtime representation that renders invisibly.
              </p>

              <p className="mt-4 font-bold leading-7 text-amber-950">
                Visible output is not the same thing as knowing the underlying
                value.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              Why this matters
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Imagine that two different runtime values both display as blank.
              They may look identical in <strong>Pipeline Results</strong> but
              behave differently when Jinja asks questions such as:
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Is this value defined?",
                "Is this value None?",
                "Is this value a number?",
                "Should a fallback replace it?",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-blue-200 bg-white px-4 py-3 font-bold text-blue-950"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              That is why we inspect before we assume. The next few experiments
              will give us better tools for distinguishing missing values from
              legitimate values.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              <strong>
                Do not infer a runtime data type merely from rendered output.
              </strong>{" "}
              Rendering tells us what became visible. Tests and controlled
              experiments tell us more about the value Jinja is actually working
              with.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Fallback values"
            title="default() helps—until the business rule disagrees."
          >
            <p>
              Once we know a value may be missing, the next instinct is usually:
              replace the missing value with something useful. Jinja gives us a
              tool for that—but we still have to define what should count as
              &quot;missing.&quot;
            </p>
          </Heading>

          {/* THE BUSINESS PROBLEM */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The business problem
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Blank output is not very helpful to the person reading it.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              In our previous experiment, a blank <strong>Notes</strong> field
              rendered no visible value. That may accurately reflect the source
              data, but it does not necessarily produce useful output.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  Source
                </p>
                <p className="mt-2 font-bold text-gray-800">Blank Notes</p>
              </div>

              <LuArrowDown className="mx-auto h-5 w-5 text-[#276749] sm:-rotate-90" />

              <div className="rounded-xl border border-[#b8d9c3] bg-[#f0fff4] p-4 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                  Desired output
                </p>
                <p className="mt-2 font-bold text-[#17452a]">
                  No notes provided
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              This is a <strong>fallback value</strong>: if the original value
              should not be used, substitute another value in its place.
            </p>
          </div>

          {/* DEFAULT */}
          <div className="mt-8">
            <CodeBlock value={code.defaultNotes} />
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              Read the expression
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Start with <code>aa.notes</code>, then pass that value through
              Jinja&apos;s <code>default</code> filter.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-mono font-bold text-blue-950">
                  &apos;No notes provided&apos;
                </p>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  This is the fallback value we want Jinja to produce.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-mono font-bold text-blue-950">true</p>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  This tells <code>default</code> to use the fallback for values
                  Jinja treats as false-like—not only an undefined value.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Evidence title="Blank Notes">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-sm">
                  blank Notes
                </span>

                <span className="font-bold text-[#276749]">→</span>

                <span className="rounded-lg border border-[#b8d9c3] bg-[#f0fff4] px-3 py-2 font-mono text-sm font-bold text-[#17452a]">
                  No notes provided
                </span>
              </div>

              <p className="mt-4 leading-7">
                For this record, the expression produced exactly the result we
                wanted.
              </p>
            </Evidence>
          </div>

          {/* SUCCESS IS NOT PROOF */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              But one successful example does not prove the rule is correct.
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Our Notes experiment only showed that the fallback worked for a
              blank Notes value. It did not tell us what would happen with other
              kinds of values.
            </p>

            <p className="mt-3 font-bold leading-7 text-[#205c38]">
              So we need a better test.
            </p>
          </div>

          {/* ZERO TRAP */}
          <div className="mt-12">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The zero trap
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Estimated Hours exposes a flaw in our rule.
            </h3>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-700">
              This is why we added the <strong>Estimated Hours</strong> Numeric
              field to our Lesson 17 dataset. It gives us three importantly
              different situations to test:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["3.5", "An estimate exists"],
                ["blank", "No estimate was entered"],
                ["0", "A legitimate numeric value"],
              ].map(([value, meaning]) => (
                <div
                  key={value}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-5"
                >
                  <p className="font-mono text-2xl font-extrabold text-[#17452a]">
                    {value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <CodeBlock value={code.defaultHours} />
          </div>

          <p className="mt-5 leading-8 text-gray-700">
            Our intended business rule sounds reasonable:
          </p>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-[#f7faf8] p-5">
            <p className="font-bold leading-7 text-[#17452a]">
              If Estimated Hours is missing, display &quot;Not estimated.&quot;
              Otherwise, preserve the actual estimate.
            </p>
          </div>

          <p className="mt-5 leading-8 text-gray-700">
            Before looking at the result, that gives us a prediction:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["3.5", "3.5"],
              ["blank", "Not estimated"],
              ["0", "0"],
            ].map(([source, predicted]) => (
              <div
                key={source}
                className="rounded-2xl border border-gray-200 bg-white p-5 text-center"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  Prediction
                </p>
                <p className="mt-3 font-mono text-xl font-extrabold text-gray-800">
                  {source}
                </p>
                <LuArrowDown className="mx-auto my-3 h-5 w-5 text-[#276749]" />
                <p className="font-bold text-[#205c38]">{predicted}</p>
              </div>
            ))}
          </div>

          {/* OBSERVATION */}
          <div className="mt-8">
            <Evidence title="What Quickbase and Jinja actually produced">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["3.5", "3.5"],
                  ["blank", "Not estimated"],
                  ["0", "Not estimated"],
                ].map(([source, result]) => (
                  <div
                    key={source}
                    className="rounded-xl border border-[#cfe3d5] bg-white p-5 text-center"
                  >
                    <p className="font-mono text-xl font-extrabold">{source}</p>

                    <LuArrowDown className="mx-auto my-3 h-5 w-5 text-[#276749]" />

                    <p className="font-bold text-[#205c38]">{result}</p>
                  </div>
                ))}
              </div>
            </Evidence>
          </div>

          {/* INVESTIGATE */}
          <div className="mt-8 rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Prediction failed
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              Zero was replaced even though zero was valid data.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              The expression ran successfully. There was no syntax error and the
              Pipeline did not fail. Jinja did what the expression instructed it
              to do.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              The problem was our use of <code>true</code>. We told{" "}
              <code>default</code> to replace values treated as false-like.
              Numeric <code>0</code> falls into that broader category, so our
              legitimate zero was replaced with <strong>Not estimated</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-300 bg-white p-5">
              <p className="text-xl font-extrabold leading-8 text-amber-950">
                A Jinja expression can be syntactically correct, run
                successfully, and still express the wrong business rule.
              </p>
            </div>

            <p className="mt-5 leading-8 text-amber-900">
              Jinja did not know that zero had special meaning in our
              application. That meaning belongs to the business rule. Our
              expression was simply too broad.
            </p>
          </div>

          {/* WHY THIS IS BIGGER THAN DEFAULT */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Syntax question
              </p>

              <p className="mt-3 text-lg font-bold text-[#17452a]">
                &quot;Will this expression run?&quot;
              </p>

              <p className="mt-3 leading-7 text-gray-700">
                Jinja answered yes. The syntax was valid and the transformation
                completed.
              </p>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Business-rule question
              </p>

              <p className="mt-3 text-lg font-bold text-[#17452a]">
                &quot;Does this expression mean what our application
                needs?&quot;
              </p>

              <p className="mt-3 leading-7 text-gray-700">
                Our zero experiment answered no. Correct syntax did not
                guarantee correct logic.
              </p>
            </div>
          </div>

          {/* BRIDGE TO TESTS */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              We need a more precise question
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              We do not really want to ask:
            </p>

            <p className="mt-3 rounded-xl border border-blue-200 bg-white p-4 font-bold text-blue-950">
              &quot;Does Jinja consider this value false-like?&quot;
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              Our actual business question is closer to:
            </p>

            <p className="mt-3 rounded-xl border border-blue-200 bg-white p-4 font-bold text-blue-950">
              &quot;Is Estimated Hours actually missing, or is this a legitimate
              number?&quot;
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              To answer that, we need to stop relying on how a value looks or
              whether it behaves as false-like. We need to{" "}
              <strong>test the value itself</strong>.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              A fallback rule is also a business rule. Before replacing a value,
              make sure the condition that triggers the fallback distinguishes
              truly missing data from legitimate values such as <code>0</code>.
            </p>
          </div>
        </section>

        <section>
          <Heading eyebrow="Stop guessing" title="Ask Jinja about the value.">
            <p>
              Our previous experiment showed why appearance is not enough. A
              blank value and a legitimate zero can behave very differently even
              when a broad fallback rule treats them the same.
            </p>

            <p className="mt-4">
              Jinja gives us a more precise tool: a <strong>test</strong>. A
              test asks a yes-or-no question about a value and returns either{" "}
              <strong>True</strong> or <strong>False</strong>.
            </p>
          </Heading>

          {/* WHY TESTS EXIST */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The problem we are solving
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              We need to distinguish values that merely look similar.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              When <strong>Estimated Hours</strong> was blank, Jinja rendered no
              visible number. When it contained <code>0</code>, it rendered a
              real numeric value. But our broad <code>default(..., true)</code>{" "}
              rule treated both as needing a fallback.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Instead of asking Jinja to make a broad judgment for us, we can
              ask specific questions about the value itself.
            </p>
          </div>

          {/* DIAGNOSTIC CODE */}
          <div className="mt-8">
            <CodeBlock value={code.diagnose} />
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              Read this as a diagnostic panel
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              We are not changing <strong>Estimated Hours</strong>. We are
              asking Jinja several independent questions about the same runtime
              value.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">is defined</code>
                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Does Jinja know what value or reference we are talking about?
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">is none</code>
                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Is the current value specifically <code>None</code>?
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">is number</code>
                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Is Jinja recognizing the current value as numeric data?
                </p>
              </div>
            </div>
          </div>

          {/* EVIDENCE TABLE */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Laboratory evidence
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The tests reveal distinctions that rendering alone could not.
            </h3>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-[#cfe3d5] bg-white shadow-sm">
              <table className="min-w-full text-left">
                <thead className="bg-[#e6f4ea]">
                  <tr>
                    {["State", "Rendered", "Defined", "None", "Number"].map(
                      (x) => (
                        <th
                          key={x}
                          className="p-4 font-extrabold text-[#17452a]"
                        >
                          {x}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
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
                          className="p-4 font-mono text-sm text-gray-700"
                        >
                          {x}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* INTERPRETATION */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Blank Estimated Hours
              </p>

              <div className="mt-4 space-y-3">
                <p className="leading-7 text-gray-700">
                  <strong>Rendered:</strong> <code>[]</code>
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>Defined:</strong> True
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>None:</strong> True
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>Number:</strong> False
                </p>
              </div>

              <p className="mt-5 leading-8 text-gray-700">
                Jinja knew the field reference existed, but the value itself was
                <code> None</code> and was not recognized as a number.
              </p>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Zero Estimated Hours
              </p>

              <div className="mt-4 space-y-3">
                <p className="leading-7 text-gray-700">
                  <strong>Rendered:</strong> <code>[0.0]</code>
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>Defined:</strong> True
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>None:</strong> False
                </p>

                <p className="leading-7 text-gray-700">
                  <strong>Number:</strong> True
                </p>
              </div>

              <p className="mt-5 leading-8 text-gray-700">
                Zero was not missing at all. It was a real numeric value. The
                tests make that distinction visible.
              </p>
            </div>
          </div>

          {/* KEY CONCEPT */}
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Important distinction
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Defined does not mean populated.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Our blank <strong>Estimated Hours</strong> value returned{" "}
              <code>True</code> for <code>is defined</code>.
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              That tells us Jinja understood the reference. It does{" "}
              <strong>not</strong> mean the field contained a usable business
              value.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                <p className="font-bold text-[#17452a]">Reference exists</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Jinja knows what <code>aa.estimated_hours</code> refers to.
                </p>
              </div>

              <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                <p className="font-bold text-[#17452a]">Value is populated</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  A meaningful value is actually present for the business rule.
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-[#205c38]">
              Those are two different questions.
            </p>
          </div>

          {/* WHAT TESTS REALLY ARE */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              What is a Jinja test?
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              A test evaluates a condition about a value and returns a Boolean
              result:
              <strong> True</strong> or <strong>False</strong>.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["aa.estimated_hours is defined", "True or False"],
                ["aa.estimated_hours is none", "True or False"],
                ["aa.estimated_hours is number", "True or False"],
              ].map(([expression, result]) => (
                <div
                  key={expression}
                  className="rounded-xl border border-blue-200 bg-white p-5"
                >
                  <code className="text-sm font-bold text-blue-950">
                    {expression}
                  </code>

                  <LuArrowDown className="mx-auto my-3 h-5 w-5 text-blue-700" />

                  <p className="text-center font-bold text-blue-900">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              That Boolean result can later become part of an <code>if</code>{" "}
              decision.
            </p>
          </div>

          {/* BRIDGE */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-amber-800">
              Now we can write the business rule correctly
            </p>

            <p className="mt-3 leading-8 text-amber-950">
              We no longer need to ask whether Estimated Hours is broadly
              false-like. We can ask the precise question our application
              actually cares about:
            </p>

            <p className="mt-4 rounded-xl border border-amber-200 bg-white p-4 text-lg font-extrabold text-amber-950">
              Is <code>aa.estimated_hours</code> specifically <code>None</code>?
            </p>

            <p className="mt-4 leading-8 text-amber-950">
              If yes, we can produce <strong>Not estimated</strong>. If no, we
              can preserve the real numeric value—including zero.
            </p>
          </div>

          {/* GENERAL PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              When a business rule depends on what a value actually is, use
              tests to ask precise questions about that value instead of
              guessing from its appearance or relying on broad truth-like
              behavior.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Decisions"
            title="Now Jinja can make a decision based on what the data means."
          >
            <p>
              We finally have enough evidence to express our Estimated Hours
              business rule correctly. We know that a blank Numeric field
              arrived as <code>None</code>, while <code>0</code> arrived as a
              legitimate number.
            </p>

            <p className="mt-4">
              That means we no longer need a broad fallback. We can ask a
              precise question and choose what should happen based on the
              answer.
            </p>
          </Heading>

          {/* FROM TRANSFORMATION TO DECISION */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              A new kind of Jinja
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Until now, most of our expressions have answered: &quot;What value
              should I produce?&quot;
            </h3>

            <p className="mt-4 leading-8 text-gray-700">For example:</p>

            <div className="mt-4 rounded-xl bg-slate-950 p-5">
              <code className="font-mono text-sm text-slate-100">
                {"{{ aa.task_name | upper }}"}
              </code>
            </div>

            <p className="mt-4 leading-8 text-gray-700">
              That expression reads a value, transforms it, and outputs the
              result. There is no decision about which path to take.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Our Estimated Hours problem is different. We need Jinja to ask a
              question first:
            </p>

            <div className="mt-5 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="text-lg font-extrabold text-[#17452a]">
                Is Estimated Hours <code>None</code>?
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#cfe3d5] bg-white p-4">
                  <p className="font-extrabold text-[#276749]">YES</p>
                  <p className="mt-2 text-gray-700">
                    Output <strong>Not estimated</strong>.
                  </p>
                </div>

                <div className="rounded-xl border border-[#cfe3d5] bg-white p-4">
                  <p className="font-extrabold text-[#276749]">NO</p>
                  <p className="mt-2 text-gray-700">
                    Output the actual Estimated Hours value.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 font-bold leading-7 text-[#205c38]">
              We have moved from a transformation into a decision.
            </p>
          </div>

          {/* TWO JINJA DELIMITERS */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Two kinds of instructions
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              This is where Jinja&apos;s two delimiter styles become important.
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              You have already used double curly braces many times. Decisions
              introduce the curly-brace-and-percent form.
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-blue-200 bg-white p-6">
                <code className="text-xl font-extrabold text-[#205c38]">
                  {"{{ ... }}"}
                </code>

                <p className="mt-4 font-extrabold text-gray-800">
                  Expression / Output
                </p>

                <p className="mt-2 leading-7 text-gray-700">
                  Evaluate something and place its resulting value into the
                  rendered output.
                </p>

                <div className="mt-4 rounded-xl bg-slate-950 p-4">
                  <code className="font-mono text-sm text-slate-100">
                    {"{{ aa.estimated_hours }}"}
                  </code>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  &quot;Give me the value of Estimated Hours and put it
                  here.&quot;
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-6">
                <code className="text-xl font-extrabold text-[#205c38]">
                  {"{% ... %}"}
                </code>

                <p className="mt-4 font-extrabold text-gray-800">
                  Statement / Control
                </p>

                <p className="mt-2 leading-7 text-gray-700">
                  Give Jinja an instruction that controls what the template
                  should do.
                </p>

                <div className="mt-4 rounded-xl bg-slate-950 p-4">
                  <code className="font-mono text-sm text-slate-100">
                    {"{% if aa.estimated_hours is none %}"}
                  </code>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  &quot;Make a decision based on whether this condition is
                  true.&quot;
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-blue-200 bg-white p-5">
              <p className="font-bold leading-7 text-blue-950">
                A useful first mental model: <code>{"{{ ... }}"}</code> produces
                a value, while <code>{"{% ... %}"}</code> controls what Jinja
                does.
              </p>
            </div>
          </div>

          {/* BUSINESS RULE FIRST */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Write the rule before the syntax
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              First say what we mean in ordinary language.
            </h3>

            <div className="mt-5 rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="text-lg font-bold leading-8 text-gray-800">
                IF Estimated Hours is missing,
                <br />
                THEN output &quot;Not estimated.&quot;
                <br />
                OTHERWISE output the actual Estimated Hours value.
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              Only after the business rule is clear do we translate it into
              Jinja.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.hoursIf} />
          </div>

          {/* READ IT LINE BY LINE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Read the program line by line
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5 md:grid-cols-[auto_1fr]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  1
                </div>

                <div>
                  <code className="font-bold text-[#205c38]">
                    {"{% if aa.estimated_hours is none %}"}
                  </code>

                  <p className="mt-2 leading-7 text-gray-700">
                    Begin a decision. Ask whether the current Task&apos;s
                    Estimated Hours value is <code>None</code>.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5 md:grid-cols-[auto_1fr]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  2
                </div>

                <div>
                  <code className="font-bold text-[#205c38]">
                    Not estimated
                  </code>

                  <p className="mt-2 leading-7 text-gray-700">
                    If the test is <strong>True</strong>, this is the text Jinja
                    renders.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5 md:grid-cols-[auto_1fr]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  3
                </div>

                <div>
                  <code className="font-bold text-[#205c38]">
                    {"{% else %}"}
                  </code>

                  <p className="mt-2 leading-7 text-gray-700">
                    Otherwise. If the original <code>if</code> test was{" "}
                    <strong>False</strong>, use the other path.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5 md:grid-cols-[auto_1fr]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  4
                </div>

                <div>
                  <code className="font-bold text-[#205c38]">
                    {"{{ aa.estimated_hours }}"}
                  </code>

                  <p className="mt-2 leading-7 text-gray-700">
                    On the <code>else</code> path, evaluate the runtime
                    reference and output the actual numeric value.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5 md:grid-cols-[auto_1fr]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  5
                </div>

                <div>
                  <code className="font-bold text-[#205c38]">
                    {"{% endif %}"}
                  </code>

                  <p className="mt-2 leading-7 text-gray-700">
                    Close the decision block. Jinja now knows where this{" "}
                    <code>if</code> structure ends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLOW MODEL */}
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Runtime value",
                  text: "aa.estimated_hours",
                },
                {
                  title: "Test",
                  text: "is none",
                },
                {
                  title: "Decision",
                  text: "True or False",
                },
                {
                  title: "Selected output",
                  text: "Fallback or actual value",
                },
              ]}
            />
          </div>

          {/* BRANCH VISUAL */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-amber-800">
                If True
              </p>

              <p className="mt-3 text-lg font-extrabold text-amber-950">
                Estimated Hours is None.
              </p>

              <LuArrowDown className="my-4 h-6 w-6 text-amber-700" />

              <p className="rounded-xl border border-amber-200 bg-white p-4 font-mono font-bold text-amber-950">
                Not estimated
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-emerald-800">
                Otherwise
              </p>

              <p className="mt-3 text-lg font-extrabold text-emerald-950">
                Estimated Hours contains something other than None.
              </p>

              <LuArrowDown className="my-4 h-6 w-6 text-emerald-700" />

              <p className="rounded-xl border border-emerald-200 bg-white p-4 font-mono font-bold text-emerald-950">
                {"{{ aa.estimated_hours }}"}
              </p>
            </div>
          </div>

          {/* PREDICTION */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Predict before running
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              What should happen to our four known values?
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["None", "True", "Not estimated"],
                ["0.0", "False", "0.0"],
                ["3.5", "False", "3.5"],
                ["5.0", "False", "5.0"],
              ].map(([source, test, output]) => (
                <div
                  key={source}
                  className="rounded-2xl border border-blue-200 bg-white p-5"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">
                    Runtime value
                  </p>

                  <p className="mt-2 font-mono text-xl font-extrabold text-blue-950">
                    {source}
                  </p>

                  <p className="mt-4 text-sm text-blue-900">
                    <code>is none</code> → <strong>{test}</strong>
                  </p>

                  <LuArrowDown className="my-3 h-5 w-5 text-blue-700" />

                  <p className="font-bold text-blue-950">{output}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EVIDENCE */}
          <div className="mt-8">
            <Evidence title="Observed Lesson 17 results">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["None", "Not estimated"],
                  ["0.0", "0.0"],
                  ["3.5", "3.5"],
                  ["5.0", "5.0"],
                ].map(([source, output]) => (
                  <div
                    key={source}
                    className="rounded-xl border border-[#cfe3d5] bg-white p-5 text-center"
                  >
                    <p className="font-mono text-lg font-extrabold">{source}</p>

                    <LuArrowDown className="mx-auto my-3 h-5 w-5 text-[#276749]" />

                    <p className="font-bold text-[#205c38]">{output}</p>
                  </div>
                ))}
              </div>
            </Evidence>
          </div>

          {/* WHY ZERO SURVIVES */}
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Look closely at zero
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              We fixed the business rule without special-casing zero.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Notice that our new expression never says:
            </p>

            <div className="mt-4 rounded-xl border border-[#cfe3d5] bg-white p-4">
              <p className="font-mono text-sm text-gray-500">
                if Estimated Hours equals 0, preserve it
              </p>
            </div>

            <p className="mt-4 leading-8 text-gray-700">
              We do not need that rule. We simply ask the correct question:
            </p>

            <div className="mt-4 rounded-xl border border-[#b8d9c3] bg-white p-4">
              <code className="font-bold text-[#205c38]">
                aa.estimated_hours is none
              </code>
            </div>

            <p className="mt-4 leading-8 text-gray-700">
              Zero survives naturally because zero is <strong>not None</strong>.
              So do
              <code> 3.5</code> and <code>5.0</code>.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-[#17452a]">
              Better logic often comes from asking a more precise question—not
              from adding more exceptions.
            </p>
          </div>

          {/* IMPORTANT: JINJA VS PIPELINE CONDITION */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Keep the execution layers separate
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              This is a Jinja decision—not a Quickbase Pipeline Condition step.
            </h3>

            <p className="mt-4 leading-8 text-violet-950">
              Lesson 13 used a Quickbase <strong>Condition</strong> to decide
              which Pipeline path the current record should follow. That was
              workflow orchestration.
            </p>

            <p className="mt-4 leading-8 text-violet-950">
              Here, the Pipeline is still executing the same{" "}
              <strong>Update Record</strong> step. Jinja is deciding what value
              that step should receive for <strong>Pipeline Results</strong>.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-violet-200 bg-white p-5">
                <p className="font-extrabold text-violet-950">
                  Quickbase Pipeline Condition
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-900">
                  Decides which workflow path or Pipeline steps should execute.
                </p>
              </div>

              <div className="rounded-2xl border border-violet-200 bg-white p-5">
                <p className="font-extrabold text-violet-950">
                  Jinja <code>if</code>
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-900">
                  Controls what a Jinja evaluation produces inside the step that
                  is already executing.
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-violet-950">
              Both make decisions. They operate at different layers.
            </p>
          </div>

          {/* PROGRAMMING VOCAB */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              Programming vocabulary
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <code className="font-bold text-blue-950">if</code>
                <p className="mt-1 leading-7 text-blue-900">
                  Begins a conditional decision: if this condition is True,
                  execute this part of the template.
                </p>
              </div>

              <div>
                <code className="font-bold text-blue-950">else</code>
                <p className="mt-1 leading-7 text-blue-900">
                  Means otherwise: use this part when the <code>if</code>{" "}
                  condition was False.
                </p>
              </div>

              <div>
                <code className="font-bold text-blue-950">endif</code>
                <p className="mt-1 leading-7 text-blue-900">
                  Marks the end of the Jinja <code>if</code> structure.
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              Together, these form a <strong>conditional</strong>: programming
              logic that chooses what to do based on whether a condition is True
              or False.
            </p>
          </div>

          {/* GENERALIZED PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Tests let Jinja ask precise questions about runtime data.
              Conditional statements let Jinja use those answers to decide what
              value to produce. The goal is not merely to make valid Jinja—it is
              to make the expression represent the actual business rule.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Structured values"
            title="One Quickbase field can carry more than one useful piece of data."
          >
            <p>
              Most of our Lesson 17 examples have started with simple values: a
              Task Name is text, Estimated Hours is numeric, and Notes may
              contain text or no value.
            </p>

            <p className="mt-4">
              <strong>Assigned To</strong> is different. It is a Quickbase{" "}
              <strong>User</strong> field, and the runtime value can expose
              several related pieces of information about the same user.
            </p>
          </Heading>

          {/* SIMPLE VS STRUCTURED */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              From simple values to structured values
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The field you see in Quickbase is not always a single piece of
              runtime information.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              When we reference <code>aa.task_name</code>, we are primarily
              interested in one text value:
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
              <p className="font-mono text-sm text-gray-800">
                Validate November Report Data
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              But a User represents a person in Quickbase. That person has
              several related properties that may be useful to a Pipeline.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["first_name", "Darian"],
                ["last_name", "Ross"],
                ["id", "63578510.bjcc"],
                ["email", "User email, when exposed"],
              ].map(([property, example]) => (
                <div
                  key={property}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-5 shadow-sm"
                >
                  <code className="font-bold text-[#205c38]">{property}</code>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {example}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-5">
              <p className="font-bold leading-7 text-[#17452a]">
                One Assigned To value can give Jinja access to multiple related
                properties without turning those properties into separate
                Quickbase fields.
              </p>
            </div>
          </div>

          {/* RECONNECT TO PRIOR LESSON */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              This should look familiar
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              We encountered this earlier when studying Pipeline runtime
              references. The reference picker showed that{" "}
              <strong>Assigned To</strong> was not limited to the name Quickbase
              displays in the table. It exposed related properties such as the
              user&apos;s ID, first name, last name, and other user information
              available in that runtime context.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              Lesson 17 is not reteaching how those runtime references become
              available. We already handled that.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-blue-950">
              Now our question is: what can we do with the pieces once Jinja has
              them?
            </p>
          </div>

          {/* STRUCTURE MODEL */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Read the reference from left to right
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The dots help us move deeper into the value.
            </h3>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-2xl border border-[#b8d9c3] bg-white p-5 text-center">
                <p className="font-mono text-lg font-extrabold text-[#17452a]">
                  aa
                </p>
                <p className="mt-2 text-sm text-gray-600">Current Task</p>
              </div>

              <LuArrowDown className="mx-auto h-5 w-5 text-[#276749] md:-rotate-90" />

              <div className="rounded-2xl border border-[#b8d9c3] bg-white p-5 text-center">
                <p className="font-mono text-lg font-extrabold text-[#17452a]">
                  assigned_to
                </p>
                <p className="mt-2 text-sm text-gray-600">User value</p>
              </div>

              <LuArrowDown className="mx-auto h-5 w-5 text-[#276749] md:-rotate-90" />

              <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5 text-center">
                <p className="font-mono text-lg font-extrabold text-[#17452a]">
                  last_name
                </p>
                <p className="mt-2 text-sm text-gray-600">One property</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-slate-950 p-5">
              <code className="font-mono text-sm text-slate-100">
                {"{{ aa.assigned_to.last_name }}"}
              </code>
            </div>

            <p className="mt-4 leading-8 text-gray-700">
              Read that reference as:
            </p>

            <p className="mt-3 rounded-xl border border-[#cfe3d5] bg-[#f7faf8] p-4 font-bold leading-7 text-[#17452a]">
              From the current Task in <code>aa</code>, get Assigned To, then
              get that user&apos;s last name.
            </p>
          </div>

          {/* BUSINESS GOAL */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Our transformation goal
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Build our own representation of the Assigned To user.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Quickbase may normally display the assigned user as:
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-[#f7faf8] p-4">
              <p className="font-mono font-bold text-gray-800">Darian Ross</p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              For our laboratory, suppose the next step needs a representation
              with the last name first, the last name capitalized, and the
              Quickbase User ID included:
            </p>

            <div className="mt-4 rounded-xl border border-[#b8d9c3] bg-[#f0fff4] p-4">
              <p className="font-mono font-bold text-[#17452a]">
                ROSS, Darian [63578510.bjcc]
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              We are not changing the user. We are deciding how information
              about that user should be represented in our output.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.user} />
          </div>

          {/* READ CODE */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Read the expression in layers
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% if aa.assigned_to is none %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  First, protect the expression from a missing Assigned To
                  value. We already learned why precise missing-value tests
                  matter.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">UNASSIGNED</code>

                <p className="mt-3 leading-7 text-blue-900">
                  If Assigned To is <code>None</code>, produce a useful business
                  representation instead of trying to reach properties that are
                  not available from a user value.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">{"{% else %}"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Otherwise, we have a User value to work with, so we can begin
                  assembling the representation we want.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="break-all font-bold text-blue-950">
                  {
                    "{{ aa.assigned_to.last_name | upper }}, {{ aa.assigned_to.first_name }} [{{ aa.assigned_to.id }}]"
                  }
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Read several properties from the same structured User value,
                  transform the last name with <code>upper</code>, and combine
                  the pieces with literal punctuation and spaces.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">{"{% endif %}"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Close the decision.
                </p>
              </div>
            </div>
          </div>

          {/* BREAK APART TRANSFORMATION */}
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Structured User",
                  text: "Assigned To",
                },
                {
                  title: "Select properties",
                  text: "last_name · first_name · id",
                },
                {
                  title: "Transform",
                  text: "last_name | upper",
                },
                {
                  title: "Compose",
                  text: "ROSS, Darian [63578510.bjcc]",
                },
              ]}
            />
          </div>

          {/* EVIDENCE */}
          <div className="mt-8">
            <Evidence title="Structured User representation">
              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-xl border border-[#cfe3d5] bg-white p-5 text-center">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                    Familiar display
                  </p>
                  <p className="mt-2 font-mono font-bold">Darian Ross</p>
                </div>

                <LuArrowDown className="mx-auto h-6 w-6 text-[#276749] md:-rotate-90" />

                <div className="rounded-xl border border-[#b8d9c3] bg-[#f0fff4] p-5 text-center">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Jinja output
                  </p>
                  <p className="mt-2 font-mono font-bold text-[#17452a]">
                    ROSS, Darian [63578510.bjcc]
                  </p>
                </div>
              </div>

              <p className="mt-5 leading-8">
                The user did not change. Jinja produced a different
                representation of information exposed by the same structured
                runtime value.
              </p>
            </Evidence>
          </div>

          {/* IDENTITY VS REPRESENTATION */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Identity
              </p>

              <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                Who is this?
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                The underlying Quickbase User represents the same person
                throughout our expression.
              </p>

              <p className="mt-4 font-bold text-[#205c38]">
                Jinja did not create another user.
              </p>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Representation
              </p>

              <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                How do we want to express information about this user?
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                Jinja can select properties, transform individual pieces, add
                literal text and punctuation, and produce a new textual
                representation.
              </p>

              <p className="mt-4 font-bold text-[#205c38]">
                Representation changed. Identity did not.
              </p>
            </div>
          </div>

          {/* IMPORTANT PIPELINE DISTINCTION */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Representation is not automatically interchangeable with identity
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              The next Pipeline field still determines what kind of value it
              expects.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              Our output <code>ROSS, Darian [63578510.bjcc]</code> is useful
              text for a report, message, log, or Text field. But producing that
              string does not turn it into a Quickbase User value.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              If a later Pipeline action needs to populate a Quickbase{" "}
              <strong>User field</strong>, the user&apos;s ID may be the
              appropriate runtime property to pass instead of our formatted
              display string, depending on what that action expects.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-white p-5">
                <p className="font-bold text-amber-950">
                  Human-readable output
                </p>

                <p className="mt-2 font-mono text-sm text-amber-900">
                  ROSS, Darian [63578510.bjcc]
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-5">
                <p className="font-bold text-amber-950">
                  Machine-useful identity
                </p>

                <p className="mt-2 font-mono text-sm text-amber-900">
                  63578510.bjcc
                </p>
              </div>
            </div>

            <p className="mt-5 font-extrabold leading-7 text-amber-950">
              Choose the property or representation that matches what the
              destination actually needs.
            </p>
          </div>

          {/* BRIDGE TO LISTS */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              We have changed another kind of shape
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Earlier, <code>split()</code> changed one string into a
              collection. Here, we took a structured value, selected several
              properties from it, transformed one of those properties, and
              composed them into new text.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-blue-950">
              Next we are going the other direction again: one Text field will
              become several values that Jinja can process individually.
            </p>
          </div>

          {/* GENERALIZED PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Structured runtime values can expose multiple related properties.
              Jinja can select, transform, and combine those properties into the
              representation a later step needs without changing the identity of
              the original value.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Create a list"
            title="One Quickbase Text value can become a collection of individual items."
          >
            <p>
              Earlier, we used <code>split()</code> to change the shape of a
              Task Name. Now we are going to use the same idea for a more
              important reason: we want Jinja to work with several individual
              values that currently live inside one Quickbase Text field.
            </p>

            <p className="mt-4">
              This is our bridge from <strong>transforming one value</strong> to{" "}
              <strong>processing a collection of values</strong>.
            </p>
          </Heading>

          {/* THE SOURCE VALUE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Start with what Quickbase actually stores
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Task Tags is still just one Text field.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              One of our Lesson 17 Tasks contains this value in{" "}
              <strong>Task Tags</strong>:
            </p>

            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
              <code className="font-mono font-bold text-gray-800">
                November,Reporting,Finance
              </code>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              A person can immediately recognize three tags. But Quickbase gave
              us one Text value containing characters separated by commas.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#cfe3d5] bg-white p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  What we see
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {["November", "Reporting", "Finance"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#e6f4ea] px-3 py-1 text-sm font-bold text-[#205c38]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Three meaningful concepts.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-white p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  What the source field contains
                </p>

                <p className="mt-3 font-mono font-bold text-gray-800">
                  November,Reporting,Finance
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  One Text value.
                </p>
              </div>
            </div>
          </div>

          {/* WHY CHANGE SHAPE */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              The problem is shape
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Suppose we eventually want to ask whether one of those tags is{" "}
              <strong>Reporting</strong>, clean each tag individually, or
              perform the same operation once for every tag.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              Working with the entire string makes those individual pieces
              harder to address. What we really want is:
            </p>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-5">
              <code className="font-mono font-bold text-blue-950">
                {"['November', 'Reporting', 'Finance']"}
              </code>
            </div>

            <p className="mt-4 font-extrabold leading-7 text-blue-950">
              Instead of one string containing three tags, we want one
              collection containing three separate items.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.tags} />
          </div>

          {/* READ CODE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Read the transformation
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">aa.task_tags</code>

                <p className="mt-3 leading-7 text-gray-700">
                  Start with the current Task&apos;s Task Tags value exposed
                  through our Search Records runtime reference.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">{"split(',')"}</code>

                <p className="mt-3 leading-7 text-gray-700">
                  Call <code>split</code> and supply a comma as the separator.
                  Each comma tells the operation where one item ends and the
                  next begins.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-5">
                <code className="font-bold text-[#205c38]">
                  {"{% set tags = aa.task_tags.split(',') %}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  Store the resulting list in a Jinja-local name called{" "}
                  <code>tags</code>.
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Remember Lesson 16: <code>tags</code> is a name created inside
                  this Jinja evaluation. It does not become a new Quickbase
                  field or a Pipeline-wide runtime reference.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">{"{{ tags }}"}</code>

                <p className="mt-3 leading-7 text-gray-700">
                  Render the new value so we can inspect what our transformation
                  produced.
                </p>
              </div>
            </div>
          </div>

          {/* SHAPE FLOW */}
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Quickbase Text",
                  text: "November,Reporting,Finance",
                },
                {
                  title: "split(',')",
                  text: "Separate at each comma",
                },
                {
                  title: "Jinja List",
                  text: "['November', 'Reporting', 'Finance']",
                },
                {
                  title: "Three Items",
                  text: "Ready for individual processing",
                },
              ]}
            />
          </div>

          {/* WHAT IS A LIST */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Programming vocabulary
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              What exactly is a list?
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              A <strong>list</strong> is one value that contains an ordered
              collection of individual items.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-6">
              <p className="font-mono font-bold text-blue-950">
                {"['November', 'Reporting', 'Finance']"}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Item 1", "November"],
                  ["Item 2", "Reporting"],
                  ["Item 3", "Finance"],
                ].map(([position, value]) => (
                  <div
                    key={position}
                    className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">
                      {position}
                    </p>
                    <p className="mt-2 font-mono font-bold text-blue-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              The square brackets in the rendered representation help us
              recognize the collection, while the quoted values show its
              individual string items.
            </p>

            <p className="mt-4 font-bold leading-7 text-blue-950">
              The important change is conceptual: Jinja can now work with the
              tags as individual items instead of treating the entire source as
              one piece of text.
            </p>
          </div>

          {/* EVIDENCE */}
          <div className="mt-8">
            <Evidence title="Observed Lesson 17 transformation">
              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                    Quickbase Task Tags
                  </p>

                  <p className="mt-2 font-mono text-sm font-bold">
                    November,Reporting,Finance
                  </p>
                </div>

                <LuArrowDown className="mx-auto h-6 w-6 text-[#276749] md:-rotate-90" />

                <div className="rounded-xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Jinja value after split
                  </p>

                  <p className="mt-2 font-mono text-sm font-bold text-[#17452a]">
                    {"['November', 'Reporting', 'Finance']"}
                  </p>
                </div>
              </div>

              <p className="mt-5 leading-8">
                The Quickbase field remained Text. Our Jinja evaluation created
                a list from that runtime text value.
              </p>
            </Evidence>
          </div>

          {/* SOURCE VS TRANSFORMED */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Source data
              </p>

              <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                Task Tags is still Text in Quickbase.
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                We did not alter the Quickbase field type or rewrite the source
                just because Jinja needed a different shape.
              </p>

              <p className="mt-4 font-mono text-sm text-gray-600">
                November,Reporting,Finance
              </p>
            </div>

            <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Jinja working value
              </p>

              <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                Jinja temporarily has a list.
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                We reshaped the runtime value into something better suited to
                the operation we want to perform.
              </p>

              <p className="mt-4 font-mono text-sm font-bold text-[#205c38]">
                {"['November', 'Reporting', 'Finance']"}
              </p>
            </div>
          </div>

          {/* VERY IMPORTANT DISTINCTION */}
          <div className="mt-8 rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Transformation does not require changing the source
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              Quickbase did not suddenly turn Task Tags into a List field.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              The source field remains exactly what we created:{" "}
              <strong>Text</strong>.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              The list exists inside the current Jinja evaluation because we
              took the runtime Text value and transformed it with{" "}
              <code>split(&apos;,&apos;)</code>.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-amber-200 bg-white p-5 text-center">
                <p className="font-extrabold text-amber-950">Quickbase</p>
                <p className="mt-2 text-sm text-amber-900">Stores Text</p>
              </div>

              <div className="flex items-center justify-center">
                <LuArrowDown className="h-6 w-6 text-amber-700 md:-rotate-90" />
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-5 text-center">
                <p className="font-extrabold text-amber-950">Jinja</p>
                <p className="mt-2 text-sm text-amber-900">
                  Works with a temporary List
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-amber-950">
              Transformation changes the value Jinja is working with. It does
              not automatically mutate the source field.
            </p>
          </div>

          {/* PREPARE FOR ITERATION */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Why we wanted a collection
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              A collection gives us something to iterate over.
            </h3>

            <p className="mt-4 leading-8 text-violet-950">
              We now have three individual items:
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["November", "Reporting", "Finance"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-200 bg-white px-4 py-2 font-mono font-bold text-violet-950"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 leading-8 text-violet-950">
              What if we want Jinja to perform the same operation once for{" "}
              <strong>November</strong>, again for <strong>Reporting</strong>,
              and again for <strong>Finance</strong>?
            </p>

            <p className="mt-4 font-extrabold leading-7 text-violet-950">
              We need iteration.
            </p>

            <p className="mt-4 leading-8 text-violet-950">
              And that brings us to something we have deliberately avoided until
              now: our first real <strong>Jinja loop</strong>.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              When one runtime value contains several meaningful pieces, Jinja
              can reshape that value into a collection so those pieces can be
              processed individually. The source does not have to change just
              because the current operation needs a different data shape.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="The first real Jinja loop"
            title="Now Jinja owns an iteration."
          >
            <p>
              Until this point, the repeating behavior in our Pipeline has
              belonged to Quickbase. Search Records returned Tasks, and the
              Quickbase Loop made one Task current at a time.
            </p>

            <p className="mt-4">
              We are about to introduce a second kind of repetition—one that
              happens
              <strong> inside a single Jinja evaluation</strong>.
            </p>
          </Heading>

          {/* WHY WE NEED ANOTHER LOOP */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              We already have a collection
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Our current Task now contains a Jinja list of tags.
            </h3>

            <div className="mt-5 rounded-xl border border-[#cfe3d5] bg-white p-5">
              <code className="font-mono font-bold text-[#17452a]">
                {"['November', 'Reporting', 'Finance']"}
              </code>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              We know Jinja has three separate items. But creating the list does
              not automatically process them.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Suppose we want the same block of Jinja to run once for{" "}
              <strong>November</strong>, once for <strong>Reporting</strong>,
              and once for <strong>Finance</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="font-extrabold text-[#17452a]">
                That is an iteration problem.
              </p>

              <p className="mt-2 leading-7 text-gray-700">
                We need Jinja to take one item from the list, make it current,
                evaluate a block, then move to the next item.
              </p>
            </div>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.forLoop} />
          </div>

          {/* TRANSLATE THE LOOP */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Translate the Jinja into ordinary language
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% for tag in tags %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  For each item inside the collection named <code>tags</code>,
                  temporarily call the current item <code>tag</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">{"[{{ tag }}]"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Render the current item. On each pass through the loop,{" "}
                  <code>tag</code> refers to a different member of the
                  collection.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% endfor %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  End the repeating block. If more items remain, Jinja returns
                  to the top with the next one.
                </p>
              </div>
            </div>
          </div>

          {/* WALK THROUGH ITERATIONS */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Watch the loop run
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The same Jinja block is evaluated three times.
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ["Iteration 1", "tag", "November", "[November]"],
                ["Iteration 2", "tag", "Reporting", "[Reporting]"],
                ["Iteration 3", "tag", "Finance", "[Finance]"],
              ].map(([iteration, name, value, output]) => (
                <div
                  key={iteration}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    {iteration}
                  </p>

                  <p className="mt-4 text-sm text-gray-500">
                    Current <code>{name}</code>
                  </p>

                  <p className="mt-2 font-mono text-lg font-extrabold text-[#17452a]">
                    {value}
                  </p>

                  <LuArrowDown className="my-4 h-5 w-5 text-[#276749]" />

                  <p className="font-mono font-bold text-[#205c38]">{output}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TEMPORARY CURRENT ITEM */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              What is tag?
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              tag is the temporary name for the current item.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              The list is still named <code>tags</code>. That is the collection.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              The word <code>tag</code> is the name we chose for whichever item
              Jinja is currently processing.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <p className="font-extrabold text-[#17452a]">Collection</p>

                <p className="mt-3 font-mono text-sm">tags</p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Holds all three items.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-5">
                <p className="font-extrabold text-[#17452a]">Current item</p>

                <p className="mt-3 font-mono text-sm">tag</p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Refers to one item at a time while the loop is running.
                </p>
              </div>
            </div>

            <p className="mt-6 font-bold leading-7 text-[#205c38]">
              The collection stays the same. The current-item reference changes
              on each iteration.
            </p>
          </div>

          {/* MAJOR DISTINCTION */}
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-white p-7 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Two loops. Two owners.
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Quickbase Loop ≠ Jinja Loop
            </h3>

            <p className="mt-4 max-w-4xl leading-8 text-gray-700">
              Both structures repeat work, but they belong to different
              execution layers and they repeat different things.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-[#f0fff4] p-6">
                <LuWorkflow className="h-7 w-7 text-[#276749]" />

                <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                  Quickbase Pipeline Loop
                </p>

                <p className="mt-3 leading-7 text-gray-700">
                  Quickbase iterates over the records returned by Search
                  Records.
                </p>

                <div className="mt-5 rounded-xl bg-white p-4">
                  <code className="font-mono text-sm">current Task = aa</code>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Its job is to establish which Task is current and execute
                  Pipeline steps for that Task.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <LuBraces className="h-7 w-7 text-slate-700" />

                <p className="mt-3 text-xl font-extrabold text-slate-900">
                  Jinja for-loop
                </p>

                <p className="mt-3 leading-7 text-gray-700">
                  Jinja iterates over the collection created inside the current
                  template evaluation.
                </p>

                <div className="mt-5 rounded-xl bg-white p-4">
                  <code className="font-mono text-sm">
                    tag #1 → tag #2 → tag #3
                  </code>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Its job is to process the items inside <code>tags</code> while
                  the same Pipeline step is being evaluated.
                </p>
              </div>
            </div>
          </div>

          {/* NESTED MENTAL MODEL */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Picture the nesting
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              The Jinja loop runs inside one Quickbase Loop iteration.
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-violet-200 bg-white p-5">
                <p className="font-extrabold text-violet-950">
                  Quickbase current Task
                </p>

                <p className="mt-2 font-mono text-sm text-violet-900">
                  aa = Validate November Report Data
                </p>

                <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                  <p className="font-bold text-violet-950">
                    Update Record evaluates Jinja
                  </p>

                  <p className="mt-3 font-mono text-sm text-violet-900">
                    tags = [&apos;November&apos;, &apos;Reporting&apos;,
                    &apos;Finance&apos;]
                  </p>

                  <div className="mt-5 space-y-3">
                    {["tag = November", "tag = Reporting", "tag = Finance"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-violet-200 bg-white px-4 py-3 font-mono text-sm text-violet-950"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-violet-950">
              Quickbase still owns the Task. Jinja temporarily owns the
              iteration over that Task&apos;s tags.
            </p>
          </div>

          {/* EXECUTION MODEL */}
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Quickbase Loop",
                  text: "Current Task = aa",
                },
                {
                  title: "Jinja evaluation",
                  text: "Create tags list",
                },
                {
                  title: "Jinja for-loop",
                  text: "Current item = tag",
                },
                {
                  title: "Rendered output",
                  text: "[November] [Reporting] [Finance]",
                },
              ]}
            />
          </div>

          {/* OBSERVED RESULT */}
          <div className="mt-8">
            <Evidence title="Observed Jinja loop output">
              <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                <p className="font-mono leading-7">
                  [November]
                  <br />
                  [Reporting]
                  <br />
                  [Finance]
                </p>
              </div>

              <p className="mt-5 leading-8">
                One Jinja evaluation processed all three items from the{" "}
                <code>tags</code> list. Quickbase did not create three new
                Pipeline records or three new Update Record steps. The
                repetition occurred inside Jinja.
              </p>
            </Evidence>
          </div>

          {/* PREVENT BIG MISCONCEPTION */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Do not merge these concepts in your head
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              A Jinja for-loop does not create another Quickbase Pipeline Loop.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              The Pipeline designer still contains the same Quickbase Loop and
              the same Update Record action.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              The Jinja loop exists inside the expression being evaluated for
              that action. It repeats template logic, not Pipeline steps.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-white p-5">
                <p className="font-bold text-amber-950">Quickbase repetition</p>

                <p className="mt-2 text-sm leading-6 text-amber-900">
                  Repeats Pipeline work for records.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-5">
                <p className="font-bold text-amber-950">Jinja repetition</p>

                <p className="mt-2 text-sm leading-6 text-amber-900">
                  Repeats template logic for items in a collection.
                </p>
              </div>
            </div>
          </div>

          {/* PROGRAMMING VOCAB */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold uppercase tracking-[0.12em] text-blue-800">
              Programming vocabulary
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-extrabold text-blue-950">Iteration</p>

                <p className="mt-2 leading-7 text-blue-900">
                  Repeating a block of logic once for each item in a collection.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-extrabold text-blue-950">Loop variable</p>

                <p className="mt-2 leading-7 text-blue-900">
                  The temporary name used for the current item. In our example,
                  that name is <code>tag</code>.
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              The syntax may be new, but the idea is simple:{" "}
              <strong>
                take one item, do the work, move to the next item.
              </strong>
            </p>
          </div>

          {/* BRIDGE TO LOOP INDEXES */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Jinja knows more than the item
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              While a Jinja <code>for</code> loop is running, Jinja also
              provides information about the loop itself.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              For example, it can tell us whether we are processing the first
              item, second item, third item, and so on.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-[#17452a]">
              That gives us another useful comparison with the Quickbase Loop
              metadata we studied earlier.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              A Quickbase Pipeline Loop and a Jinja <code>for</code> loop can
              exist at the same time because they operate at different layers.
              Quickbase orchestrates records and Pipeline steps. Jinja iterates
              over values inside the current template evaluation.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Loop position"
            title="Two loops. Two owners. Don't confuse what each index is counting."
          >
            <p>
              We now have a Quickbase Pipeline Loop processing Tasks and, inside
              one Pipeline step, a Jinja <code>for</code> loop processing that
              Task&apos;s tags.
            </p>

            <p className="mt-4">
              Both loops can expose a position. But those positions describe
              <strong>
                {" "}
                different current items at different execution layers
              </strong>
              .
            </p>
          </Heading>

          {/* START WITH THE BIG PICTURE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              First ask: what is current?
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              At this moment, Quickbase and Jinja can each have their own
              current item.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Quickbase may currently be processing one Task from the Search
              Records result.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Inside that Task&apos;s Update Record step, Jinja may
              simultaneously be processing one tag from the <code>tags</code>{" "}
              list.
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-6">
                <LuWorkflow className="h-7 w-7 text-[#276749]" />

                <p className="mt-3 font-extrabold text-[#17452a]">
                  Quickbase current item
                </p>

                <p className="mt-3 font-mono text-sm text-gray-700">
                  aa = current Task
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Quickbase is asking:
                  <br />
                  <strong>&quot;Which Task am I processing?&quot;</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
                <LuBraces className="h-7 w-7 text-violet-700" />

                <p className="mt-3 font-extrabold text-violet-950">
                  Jinja current item
                </p>

                <p className="mt-3 font-mono text-sm text-violet-900">
                  tag = current tag
                </p>

                <p className="mt-4 text-sm leading-6 text-violet-900">
                  Jinja is asking:
                  <br />
                  <strong>
                    &quot;Which tag inside this Task am I processing?&quot;
                  </strong>
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-[#205c38]">
              Once there are two current items, there can also be two different
              positions.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.indexes} />
          </div>

          {/* JINJA SPECIAL LOOP VALUE */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Jinja creates loop information during its own for-loop
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              Inside a Jinja for-loop, <code>loop</code> has a special meaning.
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              The <code>loop</code> value is not our Quickbase Search Records
              reference, and it is not the Quickbase Pipeline Loop.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              It is Jinja&apos;s own loop helper, available while Jinja is
              executing a <code>for</code> block.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">loop.index</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Current Jinja iteration position starting at{" "}
                  <strong>1</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">loop.index0</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Current Jinja iteration position starting at{" "}
                  <strong>0</strong>.
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              They describe the same Jinja iteration. They simply use different
              numbering systems.
            </p>
          </div>

          {/* WALK THE JINJA LOOP */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Watch Jinja count its own items
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Our three tags produce three Jinja positions.
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ["November", "1", "0"],
                ["Reporting", "2", "1"],
                ["Finance", "3", "2"],
              ].map(([tag, index, index0]) => (
                <div
                  key={tag}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Current tag
                  </p>

                  <p className="mt-2 font-mono text-xl font-extrabold text-[#17452a]">
                    {tag}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl bg-[#f7faf8] p-3">
                      <p className="text-xs text-gray-500">loop.index</p>
                      <p className="mt-1 font-mono font-bold">{index}</p>
                    </div>

                    <div className="rounded-xl bg-[#f7faf8] p-3">
                      <p className="text-xs text-gray-500">loop.index0</p>
                      <p className="mt-1 font-mono font-bold">{index0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EVIDENCE */}
          <div className="mt-8">
            <Evidence title="Observed Jinja indexes">
              <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                <p className="font-mono leading-7">
                  [1/0:November]
                  <br />
                  [2/1:Reporting]
                  <br />
                  [3/2:Finance]
                </p>
              </div>

              <p className="mt-5 leading-8">
                For each tag, the first number came from <code>loop.index</code>{" "}
                and the second came from <code>loop.index0</code>.
              </p>

              <p className="mt-3 leading-8">
                Both values belonged to the Jinja <code>for</code> loop
                processing the tag list.
              </p>
            </Evidence>
          </div>

          {/* QUICKBASE INDEX */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Quickbase has a different position
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Quickbase is counting Tasks, not tags.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              In our earlier Pipeline Loop experiments, Quickbase exposed the
              current item&apos;s Loop position through runtime metadata:
            </p>

            <div className="mt-5 rounded-xl bg-slate-950 p-5">
              <code className="font-mono text-sm text-slate-100">
                metadata.aa.loop.index
              </code>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              In our laboratory, that value was observed as zero-based:
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                ["First Task", "0"],
                ["Second Task", "1"],
                ["Third Task", "2"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#cfe3d5] bg-[#f7faf8] p-5 text-center"
                >
                  <p className="text-sm font-bold text-gray-600">{label}</p>
                  <p className="mt-2 font-mono text-2xl font-extrabold text-[#17452a]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 font-bold leading-7 text-[#205c38]">
              That position belongs to Quickbase&apos;s iteration over the
              Search Records results.
            </p>
          </div>

          {/* SIDE BY SIDE */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#cfe3d5] bg-white shadow-sm">
            <table className="min-w-full text-left">
              <thead className="bg-[#e6f4ea]">
                <tr>
                  {[
                    "Owner",
                    "What is being counted?",
                    "Reference",
                    "Behavior",
                  ].map((x) => (
                    <th key={x} className="p-4 font-extrabold text-[#17452a]">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4 font-bold">Quickbase Pipeline Loop</td>
                  <td className="p-4">Tasks returned by Search Records</td>
                  <td className="p-4 font-mono text-sm">
                    metadata.aa.loop.index
                  </td>
                  <td className="p-4">Observed zero-based</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Jinja for-loop</td>
                  <td className="p-4">Items in the tags list</td>
                  <td className="p-4 font-mono text-sm">loop.index</td>
                  <td className="p-4">One-based</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Jinja for-loop</td>
                  <td className="p-4">Items in the tags list</td>
                  <td className="p-4 font-mono text-sm">loop.index0</td>
                  <td className="p-4">Zero-based</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* THE NESTED EXAMPLE */}
          <div className="mt-8 rounded-3xl border-2 border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              The important mental model
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              One Quickbase position can contain several Jinja positions.
            </h3>

            <p className="mt-4 leading-8 text-violet-950">
              Imagine Quickbase is processing its third Task.
            </p>

            <div className="mt-5 rounded-2xl border border-violet-200 bg-white p-6">
              <p className="font-extrabold text-violet-950">Quickbase Loop</p>

              <p className="mt-2 font-mono text-sm text-violet-900">
                metadata.aa.loop.index = 2
              </p>

              <p className="mt-3 text-sm leading-6 text-violet-900">
                Current Task: one particular record from Search Records.
              </p>

              <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <p className="font-extrabold text-violet-950">
                  Jinja evaluates that Task&apos;s tags
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    ["November", "loop.index = 1", "loop.index0 = 0"],
                    ["Reporting", "loop.index = 2", "loop.index0 = 1"],
                    ["Finance", "loop.index = 3", "loop.index0 = 2"],
                  ].map(([tag, oneBased, zeroBased]) => (
                    <div
                      key={tag}
                      className="rounded-xl border border-violet-200 bg-white p-4"
                    >
                      <p className="font-mono font-bold text-violet-950">
                        {tag}
                      </p>
                      <p className="mt-2 font-mono text-xs text-violet-800">
                        {oneBased}
                      </p>
                      <p className="mt-1 font-mono text-xs text-violet-800">
                        {zeroBased}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-violet-950">
              Quickbase can remain on Task index 2 while Jinja moves through tag
              indexes 0, 1, and 2.
            </p>
          </div>

          {/* GRID MODEL */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Think of it as coordinates
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The two indexes answer different location questions.
            </h3>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full overflow-hidden rounded-2xl border border-[#cfe3d5] bg-white text-left">
                <thead className="bg-[#e6f4ea]">
                  <tr>
                    <th className="p-4 font-extrabold text-[#17452a]">
                      Quickbase Task Index
                    </th>
                    <th className="p-4 font-extrabold text-[#17452a]">
                      Jinja Tag Index
                    </th>
                    <th className="p-4 font-extrabold text-[#17452a]">
                      Meaning
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {[
                    ["2", "0", "Third Task · first tag"],
                    ["2", "1", "Third Task · second tag"],
                    ["2", "2", "Third Task · third tag"],
                  ].map(([taskIndex, tagIndex, meaning]) => (
                    <tr key={`${taskIndex}-${tagIndex}`}>
                      <td className="p-4 font-mono">{taskIndex}</td>
                      <td className="p-4 font-mono">{tagIndex}</td>
                      <td className="p-4">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              Thinking this way helps prevent the indexes from becoming
              mysterious numbers. One locates us in Quickbase&apos;s record
              iteration; the other locates us inside Jinja&apos;s collection
              iteration.
            </p>
          </div>

          {/* WHO CREATED THE REFERENCE */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                Quickbase-owned
              </p>

              <p className="mt-3 text-xl font-extrabold text-[#17452a]">
                metadata.aa.loop.index
              </p>

              <p className="mt-3 leading-8 text-gray-700">
                Quickbase exposes runtime metadata describing its Pipeline Loop.
              </p>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Jinja can read that value, but Jinja did not create the
                Quickbase Loop or its metadata.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-violet-800">
                Jinja-owned
              </p>

              <p className="mt-3 text-xl font-extrabold text-violet-950">
                loop.index / loop.index0
              </p>

              <p className="mt-3 leading-8 text-violet-950">
                Jinja supplies these helpers while its own <code>for</code> loop
                is executing.
              </p>

              <p className="mt-4 text-sm leading-6 text-violet-900">
                They describe the Jinja loop, not Quickbase&apos;s Pipeline
                iteration.
              </p>
            </div>
          </div>

          {/* HUGE CONNECTION TO LESSON 15 */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              This resolves something from Lesson 15
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              Why did plain loop.index fail in our earlier Pipeline Loop?
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              In Lesson 15, Quickbase was looping through records, but there was
              no Jinja <code>for</code> loop running inside that expression.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              That meant Jinja had no reason to create its special{" "}
              <code>loop</code> helper for that expression.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-bold text-blue-950">Quickbase Loop exists</p>

                <p className="mt-2 font-mono text-sm text-blue-900">
                  metadata.aa.loop.index
                </p>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Read Quickbase&apos;s runtime metadata.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-bold text-blue-950">Jinja for-loop exists</p>

                <p className="mt-2 font-mono text-sm text-blue-900">
                  loop.index
                </p>

                <p className="mt-3 text-sm leading-6 text-blue-900">
                  Read Jinja&apos;s own loop helper.
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-blue-950">
              Quickbase doing the looping does not automatically place Jinja
              inside a Jinja loop.
            </p>
          </div>

          {/* DON'T MEMORIZE JUST THE NUMBERS */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Do not memorize only &quot;zero-based&quot; and
              &quot;one-based&quot;
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              Ownership matters more than the starting number.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              Both <code>metadata.aa.loop.index</code> and{" "}
              <code>loop.index0</code> may show <code>0</code> for a first item
              in our examples.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              That does <strong>not</strong> make them interchangeable.
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-white p-5">
              <p className="font-bold text-amber-950">
                Same number ≠ same meaning.
              </p>

              <p className="mt-2 leading-7 text-amber-900">
                One zero may mean &quot;first Task in Quickbase&apos;s
                Loop.&quot; Another zero may mean &quot;first tag in
                Jinja&apos;s loop.&quot;
              </p>
            </div>
          </div>

          {/* NEXT STEP */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Position is only the beginning
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              Jinja now knows which tag is current and where that tag sits in
              the collection.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              That means we can combine iteration with the decision logic we
              learned earlier.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-[#17452a]">
              Instead of merely printing every tag, we can ask a different
              question for every tag as the loop encounters it.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              An index only makes sense when you know which loop owns it.
              Quickbase Pipeline Loop metadata describes Quickbase&apos;s
              current record iteration. Jinja&apos;s <code>loop</code> helpers
              describe Jinja&apos;s current collection iteration.
            </p>

            <p className="mt-3 font-extrabold leading-7 text-[#205c38]">
              Two loops. Two current items. Two positions. Two owners.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Decisions inside iteration"
            title="Each tag reaches its own decision."
          >
            <p>
              We now have two useful ideas working together: a Jinja{" "}
              <code>for</code> loop gives us one tag at a time, and a Jinja{" "}
              <code>if</code> lets us make a decision about that current tag.
            </p>

            <p className="mt-4">
              Because the <code>if</code> is nested inside the <code>for</code>,
              the decision is repeated once for every item in the collection.
            </p>
          </Heading>

          {/* COMBINE TWO IDEAS */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Combine iteration with decision logic
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              The loop chooses the current tag. The if decides what that tag
              means.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Our Jinja loop already knows how to move through:
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["November", "Reporting", "Finance"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#b8d9c3] bg-white px-4 py-2 font-mono font-bold text-[#17452a]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              Now suppose our business rule is:
            </p>

            <div className="mt-4 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="text-lg font-extrabold text-[#17452a]">
                If the current tag equals <code>Reporting</code>, mark it as a
                match.
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              That rule has to be evaluated separately for each tag, because
              each tag can produce a different answer.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.nested} />
          </div>

          {/* READ STRUCTURE */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Read the nesting
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              One structure lives inside another.
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% for tag in tags %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Start the Jinja loop. Jinja selects one item from{" "}
                  <code>tags</code> and temporarily calls it <code>tag</code>.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border-2 border-blue-300 bg-[#f8fbff] p-5 md:ml-8">
                <code className="font-bold text-blue-950">
                  {"{% if tag == 'Reporting' %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  While that one tag is current, ask whether its value is
                  exactly <code>Reporting</code>.
                </p>

                <div className="mt-4 rounded-xl border border-blue-200 bg-white p-4">
                  <p className="text-sm leading-6 text-blue-900">
                    This <code>if</code> belongs to the body of the{" "}
                    <code>for</code> loop, so it runs once for every tag.
                  </p>
                </div>
              </div>

              <div className="ml-0 rounded-2xl border border-blue-200 bg-white p-5 md:ml-8">
                <code className="font-bold text-blue-950">
                  {"[{{ loop.index }}:{{ tag }}:MATCH]"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  If the comparison is True, render the tag and mark it as{" "}
                  <strong>MATCH</strong>.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border border-blue-200 bg-white p-5 md:ml-8">
                <code className="font-bold text-blue-950">{"{% else %}"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Otherwise, render the tag without the MATCH marker.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border border-blue-200 bg-white p-5 md:ml-8">
                <code className="font-bold text-blue-950">{"{% endif %}"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  Close the decision for the current tag.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% endfor %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Close the loop. If another tag remains, Jinja begins the same
                  decision process again with the next item.
                </p>
              </div>
            </div>
          </div>

          {/* LOOP + DECISION MODEL */}
          <div className="mt-8">
            <Flow
              items={[
                {
                  title: "Current tag",
                  text: "tag",
                },
                {
                  title: "Test",
                  text: "tag == 'Reporting'",
                },
                {
                  title: "Decision",
                  text: "True or False",
                },
                {
                  title: "Output",
                  text: "MATCH or normal tag",
                },
              ]}
            />
          </div>

          {/* WALK EACH ITEM */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Watch each tag reach the decision
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ["November", "November == Reporting", "False", "[1:November]"],
                [
                  "Reporting",
                  "Reporting == Reporting",
                  "True",
                  "[2:Reporting:MATCH]",
                ],
                ["Finance", "Finance == Reporting", "False", "[3:Finance]"],
              ].map(([tag, test, result, output]) => (
                <div
                  key={tag}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                    Current tag
                  </p>

                  <p className="mt-2 font-mono text-xl font-extrabold text-[#17452a]">
                    {tag}
                  </p>

                  <div className="mt-5 rounded-xl bg-[#f7faf8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                      Comparison
                    </p>

                    <p className="mt-2 font-mono text-sm text-gray-800">
                      {test}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#f7faf8] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                      Result
                    </p>

                    <p className="mt-2 font-bold text-gray-800">{result}</p>
                  </div>

                  <LuArrowDown className="my-4 h-5 w-5 text-[#276749]" />

                  <p className="font-mono font-bold text-[#205c38]">{output}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EVIDENCE */}
          <div className="mt-8">
            <Evidence title="Reporting identified">
              <div className="rounded-xl border border-[#cfe3d5] bg-white p-5">
                <p className="font-mono leading-7">
                  [1:November]
                  <br />
                  [2:Reporting:MATCH]
                  <br />
                  [3:Finance]
                </p>
              </div>

              <p className="mt-5 leading-8">
                The loop still processed all three tags. The nested{" "}
                <code>if</code> changed only the output for the tag whose
                comparison evaluated to True.
              </p>
            </Evidence>
          </div>

          {/* EXPLAIN NESTING */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Programming vocabulary
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              This is called nesting.
            </h3>

            <p className="mt-4 leading-8 text-violet-950">
              <strong>Nesting</strong> means placing one control structure
              inside another.
            </p>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-white p-6">
              <p className="font-mono font-bold text-violet-950">for</p>

              <div className="mt-4 ml-6 rounded-xl border border-violet-200 bg-violet-50 p-4">
                <p className="font-mono font-bold text-violet-950">if</p>

                <p className="mt-2 text-sm leading-6 text-violet-900">
                  The decision exists inside the repeating block.
                </p>
              </div>

              <p className="mt-4 font-mono font-bold text-violet-950">endfor</p>
            </div>

            <p className="mt-5 leading-8 text-violet-950">
              Because the <code>if</code> is inside the <code>for</code>, the
              decision belongs to each iteration.
            </p>
          </div>

          {/* IMPORTANT COUNTEREXAMPLE */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Position changes meaning
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              Moving the if outside the loop would create a different program.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              Inside the loop, <code>tag</code> means the current item, so each
              tag can be tested independently.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              Once the loop ends, that per-item decision structure is no longer
              being evaluated once for each tag.
            </p>

            <div className="mt-6 rounded-xl border border-amber-200 bg-white p-5">
              <p className="font-extrabold text-amber-950">
                Where logic is placed determines how often it runs and which
                current values it can work with.
              </p>
            </div>
          </div>

          {/* QUICKBASE VS JINJA LAYERS */}
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-white p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Keep the layers straight
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              We now have decisions happening inside a Jinja loop that itself is
              happening inside a Quickbase Pipeline Loop.
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
                <p className="font-extrabold text-[#17452a]">
                  Quickbase Pipeline Loop
                </p>

                <p className="mt-2 leading-7 text-gray-700">
                  Establishes the current Task.
                </p>

                <div className="mt-4 rounded-xl border border-[#cfe3d5] bg-white p-4">
                  <p className="font-mono text-sm">aa = current Task</p>
                </div>
              </div>

              <div className="ml-0 rounded-2xl border border-violet-200 bg-violet-50 p-5 md:ml-8">
                <p className="font-extrabold text-violet-950">Jinja for-loop</p>

                <p className="mt-2 leading-7 text-violet-900">
                  Establishes the current tag inside that Task.
                </p>

                <div className="mt-4 rounded-xl border border-violet-200 bg-white p-4">
                  <p className="font-mono text-sm text-violet-950">
                    tag = current Task Tag
                  </p>
                </div>

                <div className="mt-4 ml-0 rounded-xl border border-blue-200 bg-blue-50 p-4 md:ml-8">
                  <p className="font-extrabold text-blue-950">Jinja if</p>

                  <p className="mt-2 text-sm leading-6 text-blue-900">
                    Decides whether the current tag equals Reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMPORTANT SHIFT */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              We are doing more than formatting now
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Earlier transformations changed capitalization, spacing, fallback
              text, or representation.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              This expression is doing something richer:
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["Iterate", "Take one item at a time"],
                ["Evaluate", "Ask a question about that item"],
                ["Respond", "Produce different output from the answer"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-xl border border-blue-200 bg-white p-5"
                >
                  <p className="font-extrabold text-blue-950">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-blue-900">{text}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 font-extrabold leading-7 text-blue-950">
              Jinja is now processing a collection with conditional logic.
            </p>
          </div>

          {/* SET UP NEXT PROBLEM */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              A new question appears
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              We successfully identified the Reporting tag while the loop was
              running.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              But what if, after the loop finishes, we want to know something
              about what happened during all of those iterations?
            </p>

            <div className="mt-5 rounded-2xl border border-[#b8d9c3] bg-white p-5">
              <p className="font-extrabold text-[#17452a]">
                For example: how many Reporting matches did we find?
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              That sounds simple: start a counter at zero and increase it
              whenever a match occurs.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-[#205c38]">
              And that is where Jinja is about to teach us something surprising
              about scope.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Nesting a decision inside an iteration causes that decision to be
              evaluated separately for each current item. The loop controls{" "}
              <strong>which item</strong> is current; the conditional controls{" "}
              <strong>what happens</strong> for that item.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="Prediction first"
            title="The counter looks correct. What will it print?"
          >
            <p>
              We can identify <code>Reporting</code> while the loop is running.
              The next obvious idea is to count how many Reporting tags we
              encounter.
            </p>

            <p className="mt-4">
              The code looks reasonable. The match definitely occurs. Most
              people seeing this for the first time expect the final answer to
              be <code>1</code>.
            </p>
          </Heading>

          {/* THE BUSINESS GOAL */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The goal sounds simple
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Remember something that happened during the loop.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">Our tags are:</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["November", "Reporting", "Finance"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#b8d9c3] bg-white px-4 py-2 font-mono font-bold text-[#17452a]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              Only one of those values equals <code>Reporting</code>, so our
              intended algorithm is easy to describe:
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#cfe3d5] bg-white p-5 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  Start
                </p>
                <p className="mt-2 font-mono text-xl font-extrabold text-[#17452a]">
                  matches = 0
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-white p-5 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                  When Reporting appears
                </p>
                <p className="mt-2 font-mono text-xl font-extrabold text-[#17452a]">
                  matches + 1
                </p>
              </div>

              <div className="rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5 text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                  Expected finish
                </p>
                <p className="mt-2 font-mono text-xl font-extrabold text-[#17452a]">
                  matches = 1
                </p>
              </div>
            </div>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.counter} />
          </div>

          {/* READ THE PROGRAM */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Read the program before running it
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% set matches = 0 %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Create a Jinja-local name called <code>matches</code> and
                  begin at zero.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% for tag in tags %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Iterate over each tag in the collection.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border border-blue-200 bg-[#f8fbff] p-5 md:ml-8">
                <code className="font-bold text-blue-950">
                  {"{% if tag == 'Reporting' %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Test the current tag. Only <code>Reporting</code> should enter
                  this decision branch.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border-2 border-blue-300 bg-white p-5 md:ml-12">
                <code className="font-bold text-blue-950">
                  {"{% set matches = matches + 1 %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Take the current counter value, add one, and assign the result
                  back to <code>matches</code>.
                </p>

                <p className="mt-3 text-sm leading-6 text-blue-800">
                  At first glance, this looks exactly like the counter logic
                  many programmers would expect.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"Reporting Matches: {{ matches }}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  After the loop finishes, render the final counter.
                </p>
              </div>
            </div>
          </div>

          {/* PREDICTION */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Predict before looking at the evidence
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Follow the three tags mentally.
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ["November", "No match", "matches stays 0"],
                ["Reporting", "MATCH", "matches becomes 1"],
                ["Finance", "No match", "matches stays 1"],
              ].map(([tag, decision, expected]) => (
                <div
                  key={tag}
                  className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-6"
                >
                  <p className="font-mono text-xl font-extrabold text-[#17452a]">
                    {tag}
                  </p>

                  <p className="mt-4 text-sm font-bold text-gray-700">
                    {decision}
                  </p>

                  <LuArrowDown className="my-4 h-5 w-5 text-[#276749]" />

                  <p className="font-bold text-[#205c38]">{expected}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="font-extrabold text-[#17452a]">
                Prediction: <code>Reporting Matches: 1</code>
              </p>
            </div>
          </div>

          {/* OBSERVED FAILURE */}
          <div className="mt-8 rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 sm:p-8">
            <div className="flex gap-4">
              <LuCircleAlert className="mt-1 h-7 w-7 shrink-0 text-rose-700" />

              <div className="min-w-0">
                <Badge type="OBSERVED" />

                <h3 className="mt-3 text-2xl font-extrabold text-rose-950">
                  Reporting Matches: 0
                </h3>

                <p className="mt-4 leading-8 text-rose-900">
                  The loop encountered <strong>Reporting</strong>. The{" "}
                  <code>if</code> condition evaluated as expected. The increment
                  statement ran inside that loop iteration.
                </p>

                <p className="mt-4 leading-8 text-rose-900">
                  And yet the value rendered after the loop was still{" "}
                  <code>0</code>.
                </p>
              </div>
            </div>
          </div>

          {/* VERY IMPORTANT: WHAT DIDN'T FAIL */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Diagnose the right failure
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              This was not a syntax failure.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              Jinja accepted the program. The Pipeline ran. The loop executed.
              The Reporting tag was encountered.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              That rules out several explanations:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["The for-loop failed", "No—the tags were iterated."],
                [
                  "Reporting was not found",
                  "No—we already observed the match.",
                ],
                [
                  "The if syntax was invalid",
                  "No—the template evaluated successfully.",
                ],
                [
                  "Addition was impossible",
                  "No syntax error prevented the statement.",
                ],
              ].map(([idea, result]) => (
                <div
                  key={idea}
                  className="rounded-xl border border-amber-200 bg-white p-5"
                >
                  <p className="font-bold text-amber-950">{idea}</p>
                  <p className="mt-2 text-sm leading-6 text-amber-900">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-lg font-extrabold leading-8 text-amber-950">
              The problem is not whether the assignment happened. The problem is
              whether that changed value survives outside the scope where it was
              assigned.
            </p>
          </div>

          {/* BRING BACK SCOPE */}
          <div className="mt-8 rounded-3xl border-2 border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Lesson 16 comes back
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              We have reached another scope boundary.
            </h3>

            <p className="mt-4 leading-8 text-violet-950">
              Lesson 16 taught us that a name can exist in one runtime or
              evaluation scope without automatically becoming available
              somewhere else.
            </p>

            <p className="mt-4 leading-8 text-violet-950">
              We saw that with a Jinja-local variable created in one Pipeline
              field: the data could continue through a Pipeline step output, but
              the local Jinja name itself did not become a Pipeline-wide
              variable.
            </p>

            <p className="mt-4 leading-8 text-violet-950">
              Now we are seeing a similar idea{" "}
              <strong>inside one Jinja evaluation</strong>.
            </p>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-white p-6">
              <p className="font-bold text-violet-950">
                The assignment inside the loop does not behave like a persistent
                outer counter.
              </p>

              <p className="mt-3 leading-7 text-violet-900">
                When we later render the outer <code>matches</code>, its value
                is still the original <code>0</code>.
              </p>
            </div>
          </div>

          {/* SCOPE VISUAL */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              A useful mental picture
            </p>

            <div className="mt-6 rounded-2xl border border-[#b8d9c3] bg-white p-6">
              <p className="font-extrabold text-[#17452a]">
                Outer Jinja evaluation
              </p>

              <div className="mt-4 rounded-xl border border-[#cfe3d5] bg-[#f0fff4] p-4">
                <p className="font-mono font-bold text-[#17452a]">
                  matches = 0
                </p>
              </div>

              <div className="mt-6 rounded-2xl border-2 border-violet-200 bg-violet-50 p-5">
                <p className="font-extrabold text-violet-950">for-loop scope</p>

                <div className="mt-4 rounded-xl border border-violet-200 bg-white p-4">
                  <p className="font-mono text-sm text-violet-950">
                    Reporting encountered
                  </p>
                  <p className="mt-2 font-mono text-sm font-bold text-violet-950">
                    matches = matches + 1
                  </p>
                </div>
              </div>

              <LuArrowDown className="mx-auto my-5 h-6 w-6 text-[#276749]" />

              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                <p className="font-mono font-bold text-rose-950">
                  Reporting Matches: 0
                </p>
              </div>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              The diagram is a mental model, not a claim about Quickbase&apos;s
              internal implementation. What our experiment establishes is the
              observable scope behavior: the ordinary assignment inside the loop
              did not produce a persistent outer counter value.
            </p>
          </div>

          {/* EVIDENCE LABELS */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm">
              <Badge type="OBSERVED" />

              <p className="mt-4 font-extrabold text-[#17452a]">
                What the experiment proves
              </p>

              <ul className="mt-4 space-y-3 leading-7 text-gray-700">
                <li>• Reporting was encountered during iteration.</li>
                <li>• The template completed successfully.</li>
                <li>• The final ordinary counter rendered as 0.</li>
                <li>
                  • The assignment inside the loop did not persist as the outer
                  counter value we expected.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-extrabold uppercase tracking-[0.12em] text-amber-800">
                What we should not claim
              </p>

              <p className="mt-4 leading-7 text-amber-900">
                We do not need to invent an internal Quickbase implementation
                story to explain the result.
              </p>

              <p className="mt-4 leading-7 text-amber-900">
                The useful conclusion is about Jinja variable behavior and
                scope: ordinary assignment inside this loop does not give us the
                persistent counter we intended.
              </p>
            </div>
          </div>

          {/* WHY THIS MATTERS */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              This is more than a counter problem
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              A counter is simply the easiest way to expose the issue.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              The same problem appears whenever we want to inspect many items
              and remember something about the collection as a whole:
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Count", "How many matches occurred?"],
                ["Flag", "Did November appear anywhere?"],
                ["Flag", "Did Reporting appear anywhere?"],
                ["State", "What did we learn across all iterations?"],
              ].map(([type, question]) => (
                <div
                  key={`${type}-${question}`}
                  className="rounded-xl border border-blue-200 bg-white p-5"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">
                    {type}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-blue-950">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-extrabold leading-7 text-blue-950">
              We need a way for Jinja to maintain shared state while the
              iterations are happening.
            </p>
          </div>

          {/* BRIDGE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              The failed experiment tells us what tool we need next
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              We do not need another loop. We do not need another condition.
              Both of those already worked.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              We need a place where the loop iterations can update shared state
              that remains available when the loop is finished.
            </p>

            <div className="mt-5 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="text-xl font-extrabold text-[#17452a]">
                Jinja has a tool for exactly that problem:{" "}
                <code>namespace()</code>.
              </p>
            </div>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              A variable can be valid and change inside one scope without that
              change becoming the persistent state another scope sees. When
              logic needs to remember information across iterations, scope
              becomes part of the design.
            </p>

            <p className="mt-3 font-extrabold leading-7 text-[#205c38]">
              The code was valid. The assumption about variable lifetime was
              wrong.
            </p>
          </div>
        </section>

        <section>
          <Heading
            eyebrow="namespace()"
            title="Give the Jinja loop a shared place to remember what happened."
          >
            <p>
              Our ordinary counter failed because the value we changed inside
              the loop did not become the persistent outer value we expected.
            </p>

            <p className="mt-4">
              Jinja gives us another tool for this situation:{" "}
              <code>namespace()</code>. It creates a small shared container
              whose properties can be updated during the loop and read afterward
              within the same Jinja evaluation.
            </p>
          </Heading>

          {/* START WITH AN ANALOGY */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              First, forget the word namespace
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Imagine the loop has a shared scoreboard.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Three players walk past the scoreboard one at a time:
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["November", "Reporting", "Finance"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#b8d9c3] bg-white px-4 py-2 font-mono font-bold text-[#17452a]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              The scoreboard starts at:
            </p>

            <div className="mt-4 rounded-xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="font-mono text-xl font-extrabold text-[#17452a]">
                matches = 0
              </p>
            </div>

            <p className="mt-5 leading-8 text-gray-700">
              November walks by. No Reporting match, so the scoreboard stays at
              zero.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Reporting walks by. The loop changes the scoreboard to one.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              Finance walks by. Nothing changes.
            </p>

            <div className="mt-6 rounded-2xl border border-[#9fc9ad] bg-white p-5">
              <p className="font-extrabold text-[#17452a]">
                When the loop is finished, the shared scoreboard still says:
              </p>

              <p className="mt-3 font-mono text-2xl font-extrabold text-[#276749]">
                matches = 1
              </p>
            </div>
          </div>

          {/* ANOTHER ANALOGY */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Another way to picture it
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              A namespace is like a shared notepad on the table.
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              Each loop iteration is like a person walking up to the same
              notepad.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["November", "Reads the notepad", "No change"],
                [
                  "Reporting",
                  "Reads the notepad",
                  "Changes matches from 0 to 1",
                ],
                ["Finance", "Reads the same notepad", "Leaves matches at 1"],
              ].map(([tag, action, result]) => (
                <div
                  key={tag}
                  className="rounded-2xl border border-blue-200 bg-white p-5"
                >
                  <p className="font-mono text-lg font-extrabold text-blue-950">
                    {tag}
                  </p>

                  <p className="mt-3 text-sm font-bold text-blue-900">
                    {action}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-blue-800">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-extrabold leading-7 text-blue-950">
              The important part is that every iteration is working with the
              same shared container.
            </p>
          </div>

          {/* CODE */}
          <div className="mt-8">
            <CodeBlock value={code.namespace} />
          </div>

          {/* READ THE CODE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Read the code in plain language
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">
                  {"{% set ns = namespace(matches=0) %}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  Create a namespace and call it <code>ns</code>.
                </p>

                <p className="mt-3 leading-7 text-gray-700">
                  Inside that namespace, create a property named{" "}
                  <code>matches</code> and begin its value at <code>0</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">
                  {"{% for tag in tags %}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  Process each tag one at a time, just as before.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border border-[#cfe3d5] bg-[#f0fff4] p-5 md:ml-8">
                <code className="font-bold text-[#205c38]">
                  {"{% if tag == 'Reporting' %}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  Ask whether the current tag is Reporting.
                </p>
              </div>

              <div className="ml-0 rounded-2xl border-2 border-[#9fc9ad] bg-white p-5 md:ml-12">
                <code className="font-bold text-[#205c38]">
                  {"{% set ns.matches = ns.matches + 1 %}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  If Reporting is found, update the <code>matches</code>{" "}
                  property inside the shared namespace.
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Notice the dot: <code>ns.matches</code> means &quot;the
                  matches property stored inside ns.&quot;
                </p>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">
                  {"Reporting Matches: {{ ns.matches }}"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">
                  After the loop finishes, read the shared value from the
                  namespace.
                </p>
              </div>
            </div>
          </div>

          {/* BREAK DOWN NAMESPACE */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              What does ns.matches mean?
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-2xl border border-violet-200 bg-white p-5 text-center">
                <p className="font-mono text-xl font-extrabold text-violet-950">
                  ns
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-900">
                  The namespace container
                </p>
              </div>

              <div className="text-center text-3xl font-extrabold text-violet-700">
                .
              </div>

              <div className="rounded-2xl border border-violet-200 bg-white p-5 text-center">
                <p className="font-mono text-xl font-extrabold text-violet-950">
                  matches
                </p>

                <p className="mt-2 text-sm leading-6 text-violet-900">
                  One property stored inside it
                </p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-violet-950">
              You can think of <code>ns</code> as a small box and{" "}
              <code>matches</code> as one labeled compartment inside that box.
            </p>

            <div className="mt-5 rounded-xl border border-violet-200 bg-white p-5">
              <p className="font-mono font-bold text-violet-950">ns.matches</p>

              <p className="mt-2 text-sm leading-6 text-violet-900">
                &quot;Go to the box named ns and read the value stored under
                matches.&quot;
              </p>
            </div>
          </div>

          {/* SHOW STATE CHANGE */}
          <div className="mt-8 rounded-3xl border border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Shared scoreboard
            </p>

            <div className="mt-6 space-y-4">
              {[
                ["Before loop", "ns.matches = 0"],
                ["November", "ns.matches = 0"],
                ["Reporting found", "ns.matches = 1"],
                ["Finance", "ns.matches = 1"],
                ["After loop", "ns.matches = 1"],
              ].map(([moment, state], i) => (
                <div
                  key={`${moment}-${state}`}
                  className="grid gap-3 rounded-2xl border border-[#cfe3d5] bg-white p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] text-sm font-extrabold text-white">
                    {i + 1}
                  </span>

                  <p className="font-bold text-[#17452a]">{moment}</p>

                  <code className="font-mono text-sm font-bold text-[#205c38]">
                    {state}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* COMPARE ORDINARY VARIABLE AND NAMESPACE */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Compare the two experiments
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Evidence title="Ordinary counter">
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                  <p className="font-mono font-bold text-rose-950">
                    Reporting encountered
                  </p>

                  <LuArrowDown className="my-4 h-5 w-5 text-rose-700" />

                  <p className="font-mono font-bold text-rose-950">
                    final matches = 0
                  </p>
                </div>

                <p className="mt-4 leading-7">
                  The assignment inside the loop did not provide the persistent
                  outer counter we intended.
                </p>
              </Evidence>

              <Evidence title="Namespace counter">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-mono font-bold text-emerald-950">
                    Reporting encountered
                  </p>

                  <LuArrowDown className="my-4 h-5 w-5 text-emerald-700" />

                  <p className="font-mono font-bold text-emerald-950">
                    final ns.matches = 1
                  </p>
                </div>

                <p className="mt-4 leading-7">
                  The namespace property preserved the state we changed during
                  iteration.
                </p>
              </Evidence>
            </div>
          </div>

          {/* INTRODUCE PROGRAMMING TERM AFTER ANALOGY */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              Programming vocabulary
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              Now we can introduce the phrase mutable state.
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              <strong>State</strong> means information that describes the
              current situation at a particular moment.
            </p>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-5">
              <p className="font-mono text-blue-950">ns.matches = 0</p>

              <p className="mt-2 text-sm text-blue-900">
                This is one state of our counter.
              </p>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              <strong>Mutable</strong> means the value is allowed to change.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Start", "0"],
                ["Reporting found", "1"],
                ["Finish", "1"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-blue-200 bg-white p-4 text-center"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                    {label}
                  </p>
                  <p className="mt-2 font-mono text-xl font-extrabold text-blue-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 font-extrabold leading-7 text-blue-950">
              Mutable state simply means information we intentionally allow to
              change while the program is running.
            </p>
          </div>

          {/* WHY NOT JUST SAY VARIABLE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Why not just use a normal variable?
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              That was exactly what our previous experiment tried.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              The problem was not that Jinja cannot create variables. We already
              used <code>set</code> successfully several times.
            </p>

            <p className="mt-4 leading-8 text-gray-700">
              The problem appeared when we needed changes made during loop
              iterations to remain available afterward.
            </p>

            <div className="mt-6 rounded-2xl border border-[#b8d9c3] bg-[#f0fff4] p-5">
              <p className="font-extrabold text-[#17452a]">
                namespace() solves a specific scope problem.
              </p>

              <p className="mt-2 leading-7 text-gray-700">
                It gives us an object whose properties can carry changing state
                across those Jinja loop iterations.
              </p>
            </div>
          </div>

          {/* IMPORTANT BOUNDARY */}
          <div className="mt-8 rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-amber-800">
              Very important boundary
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-amber-950">
              namespace() does not create a Pipeline-wide global variable.
            </h3>

            <p className="mt-4 leading-8 text-amber-900">
              Our scoreboard analogy has limits.
            </p>

            <p className="mt-4 leading-8 text-amber-900">
              The scoreboard is shared by the iterations taking part in this{" "}
              <strong>current Jinja evaluation</strong>. It is not posted on the
              wall for every Pipeline step to use forever.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-amber-200 bg-white p-5">
                <p className="font-extrabold text-amber-950">
                  namespace() can do this
                </p>

                <p className="mt-3 leading-7 text-amber-900">
                  Preserve changing values across iterations of the current
                  Jinja loop and let later code in that same Jinja evaluation
                  read them.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-5">
                <p className="font-extrabold text-amber-950">
                  namespace() does not automatically do this
                </p>

                <p className="mt-3 leading-7 text-amber-900">
                  Turn <code>ns</code> into a Quickbase runtime reference that
                  another Pipeline step can automatically read.
                </p>
              </div>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-amber-950">
              The namespace lives in Jinja&apos;s evaluation scope—not across
              the whole Pipeline.
            </p>
          </div>

          {/* CONNECT TO LESSON 16 */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Lesson 16 still applies
            </p>

            <p className="mt-3 leading-8 text-violet-950">
              Remember our Lesson 16 rule:
            </p>

            <div className="mt-5 rounded-xl border border-violet-200 bg-white p-5">
              <p className="text-lg font-extrabold text-violet-950">
                The variable does not need to escape its scope for its data to
                continue through the workflow.
              </p>
            </div>

            <p className="mt-5 leading-8 text-violet-950">
              If we need the result of <code>ns.matches</code> in a later
              Pipeline step, we can render or write that result through the
              current step and then use the step&apos;s output as a new runtime
              reference.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-violet-950">
              The namespace itself does not escape. The value it helps us
              produce can.
            </p>
          </div>

          {/* BIGGER THAN COUNTER */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              A namespace can remember more than a number
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              We started with a counter because it made the scope behavior easy
              to see. But a shared Jinja namespace can hold other kinds of state
              too.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                [
                  "Counter",
                  "matches = 1",
                  "How many times did something occur?",
                ],
                [
                  "Boolean flag",
                  "has_reporting = true",
                  "Did we see Reporting anywhere?",
                ],
                [
                  "Another flag",
                  "has_november = true",
                  "Did we see November anywhere?",
                ],
              ].map(([kind, example, meaning]) => (
                <div
                  key={kind}
                  className="rounded-2xl border border-blue-200 bg-white p-5"
                >
                  <p className="font-extrabold text-blue-950">{kind}</p>

                  <p className="mt-3 font-mono text-sm font-bold text-blue-900">
                    {example}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-blue-800">
                    {meaning}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-extrabold leading-7 text-blue-950">
              That is exactly what we are going to use in the finale.
            </p>
          </div>

          {/* BRIDGE TO FINALE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              We have all the pieces now
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Reshape", "split(',')"],
                ["Iterate", "for tag in tags"],
                ["Normalize", "trim | lower"],
                ["Remember", "namespace()"],
              ].map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#cfe3d5] bg-white p-5"
                >
                  <p className="font-extrabold text-[#17452a]">{title}</p>
                  <p className="mt-2 font-mono text-sm text-[#205c38]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 leading-8 text-gray-700">
              We can now inspect an entire list of tags, remember whether
              certain tags were found, and make one final decision after all of
              the items have been examined.
            </p>

            <p className="mt-4 text-xl font-extrabold leading-8 text-[#17452a]">
              Time to put everything together.
            </p>
          </div>

          {/* PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              A Jinja namespace is a shared container for state that needs to
              change across iterations of a Jinja loop and remain readable later
              in the same Jinja evaluation.
            </p>

            <p className="mt-3 font-extrabold leading-7 text-[#205c38]">
              Think shared scoreboard first. Then remember the programming term:
              mutable state.
            </p>
          </div>
        </section>

        <section>
          <Heading eyebrow="The Hail Mary" title="Can you read this now?">
            <p>
              At the beginning of Lesson 17, this program might have looked like
              a wall of unfamiliar symbols. Now there is nothing in it that we
              have not already studied.
            </p>

            <p className="mt-4">
              You do not need to write this from memory. That is not the finish
              line. The finish line is being able to slow down, read it from top
              to bottom, recognize the pieces, and explain what the program is
              trying to accomplish.
            </p>
          </Heading>

          {/* THE CHALLENGE */}
          <div className="mt-8 rounded-3xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              One final challenge
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Read the program before reading our explanation.
            </h3>

            <p className="mt-4 leading-8 text-gray-700">
              Do not worry about memorizing the punctuation. Instead, see
              whether you can answer these questions:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Where does the original data come from?",
                "Where does Text become a collection?",
                "What information must survive the loop?",
                "What value becomes current during iteration?",
                "Where is messy text normalized?",
                "What questions are asked about each tag?",
                "How are discoveries remembered?",
                "Where is the final business decision made?",
              ].map((question, i) => (
                <div
                  key={question}
                  className="flex gap-4 rounded-2xl border border-[#cfe3d5] bg-white p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#276749] text-sm font-extrabold text-white">
                    {i + 1}
                  </span>

                  <p className="font-bold leading-6 text-[#17452a]">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FINAL PROGRAM */}
          <div className="mt-8">
            <CodeBlock value={code.finale} label="Transformation program" />
          </div>

          {/* COMMENTS */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              The comments are part of the lesson
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              Jinja comments let us explain the program without changing its
              output.
            </h3>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-5">
              <code className="font-mono font-bold text-blue-950">
                {"{# This is a Jinja comment #}"}
              </code>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              Text between <code>{"{#"}</code> and <code>{"#}"}</code> is a
              Jinja comment. It is there for the person reading the template. It
              does not become part of the rendered business value.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              Comments are especially useful when an expression contains several
              stages of logic. A future builder should not have to
              reverse-engineer every line just to understand why the expression
              exists.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-blue-950">
              Good comments explain intent—not merely repeat the syntax.
            </p>
          </div>

          {/* WALK THE WHOLE PROGRAM */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Read the program as a process
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
              Eight stages turn raw runtime text into one business
              classification.
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "1 · Acquire",
                  "aa.task_tags",
                  "Read the current Task's runtime data.",
                ],
                [
                  "2 · Reshape",
                  "split(',')",
                  "Turn one comma-separated Text value into a list.",
                ],
                [
                  "3 · Prepare state",
                  "namespace(...)",
                  "Create shared facts that can survive Jinja loop iterations.",
                ],
                [
                  "4 · Iterate",
                  "for tag in tags",
                  "Process each tag in the collection one at a time.",
                ],
                [
                  "5 · Normalize",
                  "trim | lower",
                  "Remove surrounding spaces and make capitalization irrelevant.",
                ],
                [
                  "6 · Evaluate",
                  "if clean_tag ==",
                  "Ask what the current normalized tag means.",
                ],
                [
                  "7 · Remember",
                  "ns.has_... = true",
                  "Preserve discoveries while later tags are processed.",
                ],
                [
                  "8 · Decide",
                  "if / elif / else",
                  "Use the accumulated facts to produce one business value.",
                ],
              ].map(([a, b, c]) => (
                <div
                  key={a}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-5 shadow-sm"
                >
                  <p className="font-extrabold text-[#205c38]">{a}</p>

                  <code className="mt-3 block rounded-lg bg-slate-100 p-2 text-xs">
                    {b}
                  </code>

                  <p className="mt-3 text-sm leading-6 text-gray-600">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ACQUIRE + RESHAPE */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-[#f7faf8] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              1–2 · Acquire and reshape
            </p>

            <div className="mt-5">
              <Flow
                items={[
                  {
                    title: "Quickbase runtime",
                    text: "aa.task_tags",
                  },
                  {
                    title: "Source Text",
                    text: "November,Reporting,Finance",
                  },
                  {
                    title: "split(',')",
                    text: "Separate at commas",
                  },
                  {
                    title: "Jinja List",
                    text: "November · Reporting · Finance",
                  },
                ]}
              />
            </div>

            <p className="mt-6 leading-8 text-gray-700">
              We are already using two major ideas from earlier in the lesson:
              Quickbase supplies the runtime value, and Jinja reshapes that
              value into something better suited to the work ahead.
            </p>
          </div>

          {/* PREPARE STATE */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              3 · Prepare what we need to remember
            </p>

            <div className="mt-5 rounded-xl border border-violet-200 bg-white p-5">
              <code className="font-mono font-bold text-violet-950">
                {
                  "{% set ns = namespace(has_november=false, has_reporting=false) %}"
                }
              </code>
            </div>

            <p className="mt-5 leading-8 text-violet-950">
              This time our namespace is not counting matches. It is remembering
              two yes-or-no facts.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-violet-200 bg-white p-5">
                <code className="font-bold text-violet-950">
                  ns.has_november = false
                </code>

                <p className="mt-3 leading-7 text-violet-900">
                  We have not found a November tag yet.
                </p>
              </div>

              <div className="rounded-2xl border border-violet-200 bg-white p-5">
                <code className="font-bold text-violet-950">
                  ns.has_reporting = false
                </code>

                <p className="mt-3 leading-7 text-violet-900">
                  We have not found a Reporting tag yet.
                </p>
              </div>
            </div>

            <p className="mt-5 font-extrabold leading-7 text-violet-950">
              We begin knowing nothing. The loop will gather the facts.
            </p>
          </div>

          {/* ITERATE + NORMALIZE */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              4–5 · Iterate and normalize
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Jinja now examines each tag one at a time.
            </p>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-5">
              <code className="font-mono font-bold text-blue-950">
                {"{% set clean_tag = tag | trim | lower %}"}
              </code>
            </div>

            <p className="mt-5 leading-8 text-blue-950">
              But notice that we do not immediately compare the raw tag. We
              normalize it first.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-bold text-blue-950">Raw value</p>
                <p className="mt-2 font-mono text-sm text-blue-900">
                  {"  Reporting "}
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-bold text-blue-950">trim</p>
                <p className="mt-2 font-mono text-sm text-blue-900">
                  Reporting
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5">
                <p className="font-bold text-blue-950">lower</p>
                <p className="mt-2 font-mono text-sm text-blue-900">
                  reporting
                </p>
              </div>
            </div>

            <p className="mt-5 font-extrabold leading-7 text-blue-950">
              Normalize first. Compare second.
            </p>
          </div>

          {/* EVALUATE + REMEMBER */}
          <div className="mt-8 rounded-3xl border border-[#cfe3d5] bg-white p-6 shadow-sm sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              6–7 · Evaluate and remember
            </p>

            <p className="mt-3 leading-8 text-gray-700">
              Each normalized tag now reaches two questions:
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">
                  {"clean_tag == 'november'"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">If True, change:</p>

                <code className="mt-3 block rounded-lg bg-white p-3 text-sm">
                  ns.has_november = true
                </code>
              </div>

              <div className="rounded-2xl border border-[#cfe3d5] bg-[#f7faf8] p-5">
                <code className="font-bold text-[#205c38]">
                  {"clean_tag == 'reporting'"}
                </code>

                <p className="mt-3 leading-7 text-gray-700">If True, change:</p>

                <code className="mt-3 block rounded-lg bg-white p-3 text-sm">
                  ns.has_reporting = true
                </code>
              </div>
            </div>

            <p className="mt-6 leading-8 text-gray-700">
              Notice what the loop is doing now. It is not producing the final
              classification yet.
            </p>

            <p className="mt-4 font-extrabold leading-7 text-[#17452a]">
              The loop&apos;s job is to gather facts.
            </p>
          </div>

          {/* WALK STATE */}
          <div className="mt-8 rounded-3xl border border-[#9fc9ad] bg-[#f0fff4] p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              Watch the shared scoreboard
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full overflow-hidden rounded-2xl border border-[#cfe3d5] bg-white text-left">
                <thead className="bg-[#e6f4ea]">
                  <tr>
                    {[
                      "Moment",
                      "clean_tag",
                      "has_november",
                      "has_reporting",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="p-4 font-extrabold text-[#17452a]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {[
                    ["Before loop", "—", "false", "false"],
                    ["November", "november", "true", "false"],
                    ["Reporting", "reporting", "true", "true"],
                    ["Finance", "finance", "true", "true"],
                    ["After loop", "—", "true", "true"],
                  ].map(([moment, tag, november, reporting]) => (
                    <tr key={moment}>
                      <td className="p-4 font-bold">{moment}</td>
                      <td className="p-4 font-mono text-sm">{tag}</td>
                      <td className="p-4 font-mono text-sm">{november}</td>
                      <td className="p-4 font-mono text-sm">{reporting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 font-extrabold leading-7 text-[#17452a]">
              By the time iteration ends, Jinja has turned a collection of raw
              tags into two useful business facts.
            </p>
          </div>

          {/* FINAL DECISION */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              8 · Decide
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-blue-950">
              The loop is finished. Now classify the Task.
            </h3>

            <p className="mt-4 leading-8 text-blue-950">
              We no longer need to inspect individual tags. The namespace
              contains the facts our final decision needs.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% if ns.has_november and ns.has_reporting %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  If both facts are True:
                </p>

                <p className="mt-3 font-extrabold text-blue-950">
                  NOVEMBER REPORTING TASK
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">
                  {"{% elif ns.has_reporting %}"}
                </code>

                <p className="mt-3 leading-7 text-blue-900">
                  Otherwise, if Reporting alone was found:
                </p>

                <p className="mt-3 font-extrabold text-blue-950">
                  REPORTING TASK
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-white p-5">
                <code className="font-bold text-blue-950">{"{% else %}"}</code>

                <p className="mt-3 leading-7 text-blue-900">
                  If neither earlier classification applies:
                </p>

                <p className="mt-3 font-extrabold text-blue-950">
                  GENERAL TASK
                </p>
              </div>
            </div>
          </div>

          {/* ELIF */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-extrabold text-blue-950">
              <code>elif</code> means: &quot;Otherwise, if this other condition
              is true...&quot;
            </p>

            <p className="mt-3 leading-7 text-blue-900">
              It lets us test another condition when the previous{" "}
              <code>if</code> was False without starting an entirely separate
              decision structure.
            </p>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-4">
              <p className="font-bold text-blue-950">
                Read the whole decision as:
              </p>

              <p className="mt-3 leading-7 text-blue-900">
                If November <strong>and</strong> Reporting were found, classify
                it as a November Reporting Task. Otherwise, if Reporting was
                found, classify it as a Reporting Task. Otherwise, classify it
                as a General Task.
              </p>
            </div>
          </div>

          {/* BUSINESS OUTPUT EXAMPLES */}
          <div className="mt-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
              From messy data to business meaning
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                [
                  "November,Reporting,Finance",
                  "NOVEMBER REPORTING TASK",
                  "Both flags became true.",
                ],
                [
                  "Reporting,Compliance",
                  "REPORTING TASK",
                  "Reporting was found without November.",
                ],
                [
                  "Archive,Cleanup",
                  "GENERAL TASK",
                  "Neither classification flag was set.",
                ],
              ].map(([source, result, why]) => (
                <div
                  key={source}
                  className="rounded-2xl border border-[#cfe3d5] bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-gray-500">
                    Task Tags
                  </p>

                  <p className="mt-3 font-mono text-sm font-bold text-gray-800">
                    {source}
                  </p>

                  <LuArrowDown className="my-5 h-5 w-5 text-[#276749]" />

                  <p className="font-extrabold text-[#17452a]">{result}</p>

                  <p className="mt-3 text-sm leading-6 text-gray-600">{why}</p>
                </div>
              ))}
            </div>
          </div>

          {/* THE COMPLETE MODEL */}
          <div className="mt-8 rounded-3xl border-2 border-[#276749] bg-[#17452a] p-6 text-white sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-white/75">
              The Lesson 17 transformation model
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["SOURCE", "Get runtime data"],
                ["INSPECT", "Understand what arrived"],
                ["NORMALIZE", "Make values consistent"],
                ["RESHAPE", "Change the data structure"],
                ["ITERATE", "Process collection items"],
                ["TEST", "Ask precise questions"],
                ["REMEMBER", "Maintain needed state"],
                ["DECIDE", "Produce business meaning"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5"
                >
                  <p className="font-extrabold">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{text}</p>
                </div>
              ))}
            </div>

            <LuArrowDown className="mx-auto my-6 h-7 w-7 text-white/80" />

            <div className="rounded-2xl bg-white p-6 text-center text-[#17452a]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Output
              </p>

              <p className="mt-2 text-2xl font-extrabold">
                A value the next Pipeline step can use
              </p>
            </div>
          </div>

          {/* LOOK BACK */}
          <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-violet-800">
              Look at how far the code traveled
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-violet-950">
              None of the finale was actually introduced in the finale.
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["aa.task_tags", "Runtime references"],
                ["split(',')", "Reshaping Text into a List"],
                ["namespace()", "Shared mutable state"],
                ["for tag in tags", "Jinja iteration"],
                ["trim | lower", "Filter chaining and normalization"],
                ["if", "Conditional decisions"],
                ["==", "Comparison"],
                ["true / false", "Boolean state"],
                ["and", "Combining conditions"],
                ["elif", "An additional decision branch"],
              ].map(([syntax, idea]) => (
                <div
                  key={syntax}
                  className="flex items-center justify-between gap-4 rounded-xl border border-violet-200 bg-white p-4"
                >
                  <code className="font-bold text-violet-950">{syntax}</code>
                  <p className="text-right text-sm text-violet-900">{idea}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 font-extrabold leading-7 text-violet-950">
              The large program became readable because we learned the small
              ideas first.
            </p>
          </div>

          {/* FINAL LESSON FINISH */}
          <div className="mt-8 overflow-hidden rounded-3xl border-2 border-[#9fc9ad] bg-[#f0fff4]">
            <div className="p-7 sm:p-9">
              <LuBadgeCheck className="h-9 w-9 text-[#276749]" />

              <p className="mt-5 font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Lesson 17 finish line
              </p>

              <h3 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#17452a]">
                You are no longer just inserting Jinja into a Pipeline field.
              </h3>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-700">
                You can look at runtime data, determine what shape you received,
                decide what shape you need, transform it, handle missing values,
                inspect structured values, build collections, iterate over them,
                test individual items, maintain state across those iterations,
                and turn the result into a business value.
              </p>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
                More importantly, when an expression behaves differently than
                you expected, you now have a way to investigate it instead of
                treating Jinja like magic.
              </p>

              <div className="mt-8 rounded-2xl border border-[#b8d9c3] bg-white p-6">
                <p className="text-xl font-extrabold leading-8 text-[#17452a]">
                  SOURCE → INSPECT → NORMALIZE → RESHAPE → ITERATE → TEST →
                  REMEMBER → DECIDE → OUTPUT
                </p>
              </div>

              <div className="mt-8 border-t border-[#b8d9c3] pt-8">
                <p className="text-2xl font-extrabold leading-9 text-[#17452a]">
                  At the beginning of this lesson, the finale was the scary
                  code.
                </p>

                <p className="mt-3 text-2xl font-extrabold leading-9 text-[#276749]">
                  Now it is just a series of ideas you already understand.
                </p>
              </div>
            </div>
          </div>

          {/* FINAL CONNECTION */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="font-extrabold uppercase tracking-[0.14em] text-blue-800">
              One last connection
            </p>

            <p className="mt-3 leading-8 text-blue-950">
              Quickbase still owns the Pipeline. It found the Task, established
              the runtime context, executed the Loop, and called the Update
              Record step.
            </p>

            <p className="mt-4 leading-8 text-blue-950">
              Jinja did not replace any of that. Jinja worked inside the runtime
              world Quickbase provided and transformed the available data into
              the value our step needed.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-6">
              <p className="text-xl font-extrabold leading-8 text-blue-950">
                Quickbase creates the runtime world.
                <br />
                Jinja lets us reach into it.
                <br />
                Lesson 17 taught us how to reshape what we find there.
              </p>
            </div>
          </div>

          {/* FINAL PRINCIPLE */}
          <div className="mt-8 rounded-2xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#17452a]">
              Generalized Principle
            </p>

            <p className="mt-2 leading-8 text-gray-700">
              Jinja becomes much less intimidating when a large expression is
              treated as a sequence of small data problems. Identify the source,
              understand the value, reshape it when necessary, iterate when it
              becomes a collection, test precisely, preserve only the state you
              need, and produce the value required by the next step.
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

        <section className="mt-16 border-t border-[#cfe3d5] pt-12">
          <div className="overflow-hidden rounded-3xl border border-[#9fc9ad] bg-[#f0fff4]">
            <div className="p-7 sm:p-9">
              <p className="font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                Lesson 17 Complete
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17452a]">
                You learned to transform runtime data instead of merely passing
                it along.
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
                We started with individual values and gradually built toward a
                complete transformation program: normalize text, handle missing
                values, inspect structured data, reshape strings into
                collections, iterate through those collections, make decisions,
                and preserve state with a Jinja namespace.
              </p>

              <p className="mt-4 max-w-4xl leading-8 text-gray-700">
                Keep the Lesson 17 Pipeline and Tasks table intact. Like our
                earlier lab Pipelines, they are now evidence of what we learned
                and can become useful reference points in later lessons.
              </p>

              <div className="mt-8 rounded-2xl border border-[#b8d9c3] bg-white p-6">
                <p className="font-extrabold text-[#17452a]">
                  Carry this mental model forward:
                </p>

                <p className="mt-3 text-lg font-extrabold leading-8 text-[#276749]">
                  SOURCE → INSPECT → NORMALIZE → RESHAPE → ITERATE → TEST →
                  REMEMBER → DECIDE → OUTPUT
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link
              href="/lessons/18"
              className="group rounded-3xl border-2 border-[#276749] bg-[#276749] p-7 text-white transition hover:bg-[#205c38]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white/75">
                    Continue Learning
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold">
                    Continue to Lesson 18
                  </h3>

                  <p className="mt-3 leading-7 text-white/90">
                    Carry the runtime, scope, and transformation model into the
                    next Pipeline investigation.
                  </p>
                </div>

                <LuArrowRight className="mt-1 h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/lessons"
              className="group rounded-3xl border-2 border-[#cfe3d5] bg-white p-7 transition hover:border-[#9fc9ad] hover:bg-[#f7faf8]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#276749]">
                    Course Navigation
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#17452a]">
                    View All Lessons
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    Return to the lesson index to review earlier labs or see
                    where the Automation Developer Lab goes next.
                  </p>
                </div>

                <LuList className="mt-1 h-7 w-7 shrink-0 text-[#276749]" />
              </div>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#cfe3d5] pt-8">
            <Link
              href="/lessons/16"
              className="font-bold text-[#276749] transition hover:text-[#17452a]"
            >
              ← Lesson 16
            </Link>

            <Link
              href="/lessons"
              className="font-bold text-[#276749] transition hover:text-[#17452a]"
            >
              Table of Contents
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
