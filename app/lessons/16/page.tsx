"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  LuActivity,
  LuArrowDown,
  LuArrowRight,
  LuBraces,
  LuCircleAlert,
  LuCircleCheck,
  LuCircleHelp,
} from "react-icons/lu";

type Evidence = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "SPECULATIVE";

const evidenceStyles: Record<Evidence, string> = {
  DOCUMENTED: "border-blue-200 bg-blue-50 text-blue-900",
  OBSERVED: "border-emerald-200 bg-emerald-50 text-emerald-900",
  INFERRED: "border-amber-200 bg-amber-50 text-amber-900",
  SPECULATIVE: "border-violet-200 bg-violet-50 text-violet-900",
};

function EvidenceBadge({ type }: { type: Evidence }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold tracking-wide ${evidenceStyles[type]}`}
    >
      {type}
    </span>
  );
}

function SectionHeading({
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
      <p className="font-bold uppercase tracking-[0.14em] text-[#276749]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#205c38] sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-lg leading-8 text-gray-800">{children}</div>
      ) : null}
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-950 p-5 font-mono text-sm leading-7 text-gray-100 shadow-sm">
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex h-10 items-center justify-center text-[#276749]/60">
      <LuArrowDown aria-hidden="true" className="text-2xl" />
    </div>
  );
}

function FlowCard({
  label,
  title,
  children,
  strong = false,
}: {
  label?: string;
  title: string;
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-2xl p-5 shadow-sm ${strong ? "border-2 border-[#276749] bg-[#276749] text-white" : "border border-[#b7d8c2] bg-white"}`}
    >
      {label ? (
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.14em] ${strong ? "text-white/70" : "text-[#276749]"}`}
        >
          {label}
        </p>
      ) : null}
      <h3
        className={`mt-1 text-xl font-extrabold ${strong ? "text-white" : "text-[#205c38]"}`}
      >
        {title}
      </h3>
      <div
        className={`mt-2 leading-7 ${strong ? "text-white/90" : "text-gray-700"}`}
      >
        {children}
      </div>
    </div>
  );
}

function Callout({
  title,
  children,
  tone = "green",
}: {
  title: string;
  children: ReactNode;
  tone?: "green" | "gold" | "blue";
}) {
  const cls =
    tone === "gold"
      ? "border-[#d4a72c] bg-[#fffaf0]"
      : tone === "blue"
        ? "border-blue-300 bg-blue-50"
        : "border-[#9fc9ad] bg-[#f0fff4]";
  const text =
    tone === "gold"
      ? "text-[#654700]"
      : tone === "blue"
        ? "text-blue-950"
        : "text-[#205c38]";
  return (
    <div className={`rounded-2xl border-2 p-6 ${cls}`}>
      <h3 className={`text-2xl font-extrabold ${text}`}>{title}</h3>
      <div className="mt-3 leading-8 text-gray-800">{children}</div>
    </div>
  );
}

const quiz = [
  {
    q: "aa.task_name was created by Jinja.",
    a: false,
    e: "Quickbase exposed the runtime data. Jinja addressed that data through aa.task_name.",
  },
  {
    q: "{% set task = aa.task_name %} automatically creates a Pipeline-wide variable.",
    a: false,
    e: "In our experiment, task was local to that Jinja evaluation and was not automatically available to the next Pipeline step.",
  },
  {
    q: "A later Pipeline step can use data produced by an earlier Jinja evaluation through that earlier step's runtime output.",
    a: true,
    e: "Observed: ag successfully consumed ac.pipeline_results.",
  },
  {
    q: "The November Jinja condition caused Search Records to return only four records.",
    a: false,
    e: "Search Records returned 13 Tasks. Jinja classified each current item afterward; four happened to match November.",
  },
  {
    q: "ag continued the same Jinja evaluation that began in ac.",
    a: false,
    e: "ag performed a new evaluation. It consumed runtime data exposed through ac, but it did not inherit ac's local Jinja names.",
  },
  {
    q: "A skipped database Update necessarily means later steps cannot receive useful runtime output from that step.",
    a: false,
    e: "Not in this experiment. ag consumed ac.pipeline_results even when Activity reported ac's same-value Update as skipped.",
  },
  {
    q: "metadata.aa.loop.index and Jinja's loop.index necessarily refer to the same loop.",
    a: false,
    e: "They belong to different iteration mechanisms: Quickbase Pipeline Loop metadata versus a Jinja {% for %} loop.",
  },
  {
    q: "Scope tells us which names are available at a particular point in execution.",
    a: true,
    e: "That is the core scope model used in Lessons 15 and 16.",
  },
];

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-5">
      {quiz.map((item, i) => {
        const chosen = answers[i];
        const answered = chosen !== undefined;
        const correct = answered && chosen === item.a;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-bold leading-7 text-gray-950">
                  True or False: {item.q}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[true, false].map((value) => (
                    <button
                      key={String(value)}
                      onClick={() =>
                        setAnswers((old) => ({ ...old, [i]: value }))
                      }
                      className={`rounded-lg border-2 px-4 py-2 font-bold transition ${chosen === value ? "border-[#276749] bg-[#276749] text-white" : "border-gray-300 bg-white text-gray-800 hover:border-[#276749]"}`}
                    >
                      {value ? "True" : "False"}
                    </button>
                  ))}
                </div>
                {answered ? (
                  <div
                    className={`mt-4 rounded-xl border p-4 ${correct ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
                  >
                    <div className="flex items-center gap-2 font-extrabold">
                      {correct ? (
                        <LuCircleCheck aria-hidden="true" />
                      ) : (
                        <LuCircleAlert aria-hidden="true" />
                      )}
                      {correct
                        ? "Correct"
                        : `Not quite — the answer is ${item.a ? "True" : "False"}.`}
                    </div>
                    <p className="mt-2 leading-7 text-gray-800">{item.e}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Lesson16Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white">
            Quickbase Explained · Automation Developer Lab · Lesson 16
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em]">
              Pipeline Expressions
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em]">
              Intermediate
            </span>
          </div>
          <h1 className="mt-5 max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Jinja, Runtime References, and Scope
          </h1>
          <p className="mt-6 max-w-4xl text-xl font-medium leading-9 text-white">
            Jinja stops being frightening when we stop treating it as mysterious
            syntax and start asking a better question: what runtime data did
            Quickbase make available here, and what is Jinja doing with it?
          </p>
          <p className="mt-5 max-w-4xl text-lg font-medium leading-8 text-white">
            This lesson moves beyond merely inserting a reference into a field.
            We will separate Quickbase runtime scope from Jinja evaluation
            scope, create local Jinja names, pass Jinja-produced data through
            Pipeline step outputs, and use Activity Log evidence to prove the
            handoff.
          </p>
          <div className="mt-8 rounded-xl border border-white/30 bg-white/10 p-5">
            <p className="font-extrabold text-[#d8f3dc]">Central question</p>
            <p className="mt-2 text-lg font-medium leading-8 text-white">
              What can Jinja read from the runtime context Quickbase makes
              available, what belongs only to Jinja, and how can data move from
              one runtime scope to another?
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons/15"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              ← Lesson 15
            </Link>
            <Link
              href="/lessons/17"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white"
            >
              Lesson 17 →
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
              <LuCircleHelp aria-hidden="true" /> Skip to quiz
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="The shift"
          title="Jinja is not the Pipeline engine"
        >
          <p>
            By Lesson 16, you already know that a Pipeline has triggers,
            queries, actions, runtime references, collections, Loops, and an
            Activity Log. Jinja lives{" "}
            <strong>inside that larger runtime world</strong>. It evaluates
            values that Quickbase makes available at a particular execution
            point.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Callout title="Quickbase creates the runtime world.">
            <p>
              Quickbase orchestrates the Pipeline: it runs steps, creates
              collections, establishes the current Loop item, exposes step
              outputs, and carries execution context forward.
            </p>
          </Callout>
          <Callout title="Jinja lets us reach into it." tone="blue">
            <p>
              Jinja reads available runtime values, tests conditions, creates
              temporary local names, and produces resolved values for the
              Pipeline step that is currently evaluating them.
            </p>
          </Callout>
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <FlowCard label="Quickbase" title="Search Records">
              <p>Produces a collection.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Quickbase" title="Pipeline Loop">
              <p>Establishes the current item and runtime references.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Pipeline" title="Step evaluation">
              <p>
                A field can contain a Jinja expression that reads the runtime
                context available here.
              </p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Jinja" title="Local evaluation">
              <p>Jinja may create local names and resolve a value.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Quickbase" title="Step output">
              <p>
                The resolved result can become runtime data exposed by this
                Pipeline step.
              </p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Later step" title="New Jinja evaluation" strong>
              <p>
                A later step can consume the earlier step&apos;s output without
                inheriting the earlier Jinja evaluation&apos;s local variables.
              </p>
            </FlowCard>
          </div>
        </div>
        <Callout title="The strongest idea in this lesson" tone="gold">
          <p className="text-xl font-extrabold">
            The Jinja variable didn&apos;t escape its scope. The data did.
          </p>
        </Callout>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Jinja in three shapes"
            title="Enough syntax to start reasoning"
          >
            <p>
              Quickbase documents its Pipelines environment as Jinja 2.11.3 in a
              limited environment. That does not mean arbitrary Python, modules,
              filesystem access, or network access is available through Jinja.
              For this lesson, we need only three syntax forms.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <FlowCard label="Expression" title="Output a value">
              <CodeBlock>{`{{ value }}`}</CodeBlock>
              <p className="mt-3">
                Evaluate an expression and place its result into the template
                output.
              </p>
            </FlowCard>
            <FlowCard label="Statement" title="Control or logic">
              <CodeBlock>{`{% statement %}`}</CodeBlock>
              <p className="mt-3">
                Perform template logic such as <code>set</code> or{" "}
                <code>if</code>.
              </p>
            </FlowCard>
            <FlowCard label="Comment" title="Leave a note">
              <CodeBlock>{`{# comment #}`}</CodeBlock>
              <p className="mt-3">
                A Jinja comment is not emitted as the resolved output.
              </p>
            </FlowCard>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <EvidenceBadge type="DOCUMENTED" />
            <p className="leading-7 text-gray-800">
              Quickbase&apos;s Pipeline Jinja environment is intentionally
              limited. Learn the environment Quickbase provides rather than
              assuming every general Jinja or Python capability is available.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Runtime references"
          title="Quickbase supplied it. Jinja addressed it."
        >
          <p>
            A runtime reference and a Jinja-created variable are not the same
            thing. This distinction removes a lot of the mystery from
            expressions such as <code>{`{{aa.task_name}}`}</code>.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 p-6 shadow-sm">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Current item data
            </p>
            <CodeBlock>{`{{aa.task_name}}`}</CodeBlock>
            <p className="mt-4 leading-7">
              <code>aa.task_name</code> addresses data Quickbase made available
              through the Pipeline runtime for the current item.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-300 p-6 shadow-sm">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Pipeline runtime
            </p>
            <CodeBlock>{`{{runtime.pipeline_name}}`}</CodeBlock>
            <p className="mt-4 leading-7">
              <code>runtime.pipeline_name</code> addresses Pipeline-level
              runtime information.
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
          <div className="flex items-center gap-3">
            <EvidenceBadge type="OBSERVED" />
            <p className="font-extrabold text-[#205c38]">
              One evaluation, different runtime contexts
            </p>
          </div>
          <CodeBlock>{`Task: {{aa.task_name}} | Pipeline: {{runtime.pipeline_name}}`}</CodeBlock>
          <div className="mt-4 rounded-xl bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-gray-500">
              Observed output
            </p>
            <p className="mt-2 font-mono text-sm leading-7">
              Task: Validate November Report Data | Pipeline: Lesson 16 - Jinja
              Runtime References
            </p>
          </div>
          <p className="mt-4 leading-7">
            Jinja did not create either source value. It evaluated runtime
            information Quickbase exposed at that execution point.
          </p>
        </div>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Local Jinja names"
            title="Now Jinja creates something of its own"
          >
            <p>
              The <code>set</code> statement lets Jinja create a local name
              during an evaluation. This is the first place where we must
              carefully separate a Jinja name from a Quickbase runtime
              reference.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <CodeBlock>{`{% set task = aa.task_name %}\nOriginal: {{aa.task_name}} | Jinja variable: {{task}}`}</CodeBlock>
              <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-5">
                <div className="flex gap-2">
                  <EvidenceBadge type="OBSERVED" />
                  <strong>Resolved output</strong>
                </div>
                <p className="mt-3 font-mono text-sm">
                  Original: Validate November Report Data | Jinja variable:
                  Validate November Report Data
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#b7d8c2] bg-white p-6">
              <ol className="space-y-4 leading-7">
                <li>
                  <strong>1.</strong> Quickbase supplied{" "}
                  <code>aa.task_name</code>.
                </li>
                <li>
                  <strong>2.</strong> Jinja evaluated that reference.
                </li>
                <li>
                  <strong>3.</strong> <code>{`{% set %}`}</code> created the
                  local name <code>task</code>.
                </li>
                <li>
                  <strong>4.</strong> <code>{`{{task}}`}</code> was usable
                  during that Jinja evaluation.
                </li>
              </ol>
            </div>
          </div>
          <Callout title="Use precise language">
            <p>
              <strong>
                Jinja created <code>task</code> during this Jinja evaluation.
              </strong>{" "}
              Do not casually call <code>task</code> a Pipeline variable. That
              wording would hide the scope boundary we are about to prove.
            </p>
          </Callout>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Controlled experiment"
          title="The first important scope boundary"
        >
          <p>
            We created <code>task</code> with <code>set</code> in one Pipeline
            field evaluation. Then a later Update Record tried to use{" "}
            <code>{`{{task}}`}</code> without defining it again.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
            <p className="font-extrabold text-red-900">
              Did not cross automatically
            </p>
            <CodeBlock>{`ac:\n{% set task = aa.task_name %}\n{{task}}\n\nlater step:\n{{task}}`}</CodeBlock>
            <p className="mt-4 leading-7">
              The later step did not receive a resolved <code>task</code> value
              merely because an earlier Jinja evaluation had created that name.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
            <p className="font-extrabold text-emerald-900">
              Quickbase reference remained available
            </p>
            <CodeBlock>{`ac:\n{{aa.task_name}}\n\nlater step:\n{{aa.task_name}}`}</CodeBlock>
            <p className="mt-4 leading-7">
              Both steps could address <code>aa.task_name</code> while they
              remained inside the same Quickbase Loop scope.
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <EvidenceBadge type="OBSERVED" />
          <p className="leading-7">
            <strong>
              A variable created with <code>{`{% set %}`}</code> in one Pipeline
              field&apos;s Jinja evaluation did not automatically become a
              runtime reference available to the next Pipeline step.
            </strong>
          </p>
        </div>
        <Callout
          title="Quickbase Loop scope and Jinja variable scope are not the same thing."
          tone="gold"
        >
          <p>
            Quickbase kept <code>aa</code> available to the steps inside the
            Loop. Jinja&apos;s local name <code>task</code> did not
            automatically become part of that Quickbase runtime context.
          </p>
        </Callout>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Scale the experiment"
            title="Thirteen Tasks, one current item at a time"
          >
            <p>
              We expanded Search Records to return all 13 Tasks. The Pipeline
              remained simple: Search Records <code>aa</code> → Quickbase Loop →
              Update <code>ac</code> → Update <code>ag</code> → End of loop.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["Search Records", "aa", "13 Tasks"],
              ["Quickbase Loop", "current item", "Quickbase owns iteration"],
              ["Update Record", "ac", "first Jinja evaluation"],
              ["Update Record", "ag", "second Jinja evaluation"],
            ].map(([a, b, c]) => (
              <div
                key={a + b}
                className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#276749]">
                  {b}
                </p>
                <h3 className="mt-1 font-extrabold text-[#205c38]">{a}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <CodeBlock>{`QB Index: {{metadata.aa.loop.index}} | Task: {{aa.task_name}}`}</CodeBlock>
              <div className="mt-4 rounded-xl border border-gray-300 bg-white p-5 font-mono text-sm leading-7">
                <p>QB Index: 0 | Task: Validate November Report Data</p>
                <p>QB Index: 1 | Task: Update Training Notes - Changed 6</p>
                <p>QB Index: 2 | Task: Send Application Follow-Up Notices</p>
                <p>QB Index: 3 | Task: Review Pipeline Training Notes</p>
              </div>
            </div>
            <Callout title="Who owns what?">
              <p>
                <strong>Quickbase Loop</strong> controls which item is current
                and when the action executes.
              </p>
              <p className="mt-3">
                <strong>Jinja</strong> reads runtime values available during
                that iteration.
              </p>
              <p className="mt-3 font-extrabold text-[#205c38]">
                At this point Jinja is not performing the loop. Quickbase is.
              </p>
            </Callout>
          </div>
          <p className="mt-6 text-sm leading-6 text-gray-600">
            The observed record sequence is evidence from this run, not a claim
            that Search Records guarantees this ordering.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Conditional evaluation"
          title="Let Jinja reason about the current item"
        >
          <p>
            Now we introduce <code>if</code> and string membership. The question
            is deliberately small: does the current Task Name contain the text{" "}
            <strong>November</strong>?
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <CodeBlock>{`{% if 'November' in aa.task_name %}\nMATCH: {{aa.task_name}}\n{% else %}\nNO MATCH: {{aa.task_name}}\n{% endif %}`}</CodeBlock>
          <div className="rounded-2xl border border-gray-300 p-6">
            <div className="flex gap-2">
              <EvidenceBadge type="OBSERVED" />
              <strong>13 Tasks evaluated</strong>
            </div>
            <p className="mt-4 leading-7">Four Task Names matched:</p>
            <ul className="mt-3 space-y-2 leading-7">
              <li>• Prepare November Reports - Changed 7</li>
              <li>• Draft November Reporting Checklist</li>
              <li>• Validate November Report Data</li>
              <li>• Finalize November Reporting Package</li>
            </ul>
            <p className="mt-4 leading-7">
              The other nine resolved to <code>NO MATCH</code>.
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <FlowCard label="Quickbase" title="Search Records">
              <p>
                Determines <strong>which records enter the collection</strong>.
              </p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Quickbase" title="Loop">
              <p>
                Determines <strong>which record is current</strong>.
              </p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Jinja" title="Current-item test" strong>
              <p>Examines the Task Name string of that current runtime item.</p>
            </FlowCard>
          </div>
        </div>
        <Callout title="Jinja did not search the Tasks table." tone="gold">
          <p>
            Search Records had already selected the 13 records. The Jinja
            condition classified the current item after it entered the runtime
            collection.
          </p>
        </Callout>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Experimental design"
            title="Preserve two outputs instead of overwriting the evidence"
          >
            <p>
              We added a second Text field, <strong>Pipeline Jinja</strong>,
              while keeping the existing <strong>Pipeline Results</strong>{" "}
              field. That let the two Update Record steps preserve separate
              evidence.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FlowCard label="Step ac" title="Pipeline Results">
              <p>
                Stores the first Jinja evaluation: <code>MATCH</code> or{" "}
                <code>NO MATCH</code>.
              </p>
            </FlowCard>
            <FlowCard label="Step ag" title="Pipeline Jinja">
              <p>
                Stores the second Jinja evaluation based on the runtime output
                from <code>ac</code>.
              </p>
            </FlowCard>
          </div>
          <p className="mt-6 leading-8 text-gray-800">
            Keeping separate destination fields prevented the second step from
            erasing the first step&apos;s visible result. That made the runtime
            chain much easier to inspect against the table and Activity Log.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Runtime handoff"
          title="The variable stays local. The produced data moves forward."
        >
          <p>
            This is the intellectual center of Lesson 16. A local Jinja name did
            not cross into the next step. But a value produced by Jinja in{" "}
            <code>ac</code> became available through the Pipeline runtime output
            of <code>ac</code>.
          </p>
        </SectionHeading>
        <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <FlowCard label="Current item" title="aa.task_name">
              <p>Validate November Report Data</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Jinja in ac" title="First evaluation">
              <p>Tests whether the Task Name contains November.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Resolved step data" title="ac.pipeline_results">
              <p>MATCH: Validate November Report Data</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Jinja in ag" title="Second evaluation" strong>
              <p>
                Can now consume <code>ac.pipeline_results</code>.
              </p>
            </FlowCard>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
            <p className="font-extrabold text-red-900">
              Local name did not cross
            </p>
            <CodeBlock>{`{% set task = aa.task_name %}\n\n// next Pipeline step\n{{task}}`}</CodeBlock>
          </div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
            <p className="font-extrabold text-emerald-900">
              Step output did cross
            </p>
            <CodeBlock>{`// ac produces Pipeline Results\n\n// ag can address:\n{{ac.pipeline_results}}`}</CodeBlock>
          </div>
        </div>
        <Callout
          title="The variable didn't escape its scope. The data did."
          tone="gold"
        >
          <p>
            A Jinja-local name and the value produced by a Jinja evaluation are
            not the same thing. Quickbase exposed the earlier step&apos;s result
            through a new runtime address: <code>ac.pipeline_results</code>.
          </p>
        </Callout>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Chained evaluation"
            title="A later Jinja expression can reason about an earlier Jinja result"
          >
            <p>
              The second Update Record, <code>ag</code>, did not return to{" "}
              <code>aa.task_name</code> for its test. It deliberately evaluated
              the value exposed through <code>ac.pipeline_results</code>.
            </p>
          </SectionHeading>
          <div className="mt-8">
            <CodeBlock>{`{% if 'MATCH:' in ac.pipeline_results and 'Reporting' in ac.pipeline_results %}\nSECOND MATCH: {{ac.pipeline_results}}\n{% else %}\nSECOND NO MATCH: {{ac.pipeline_results}}\n{% endif %}`}</CodeBlock>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-5">
            {[
              ["13", "Tasks"],
              ["→", "ac"],
              ["4", "November MATCH"],
              ["→", "ag"],
              ["2", "SECOND MATCH"],
            ].map(([n, l], i) => (
              <div
                key={i}
                className={`rounded-xl p-5 text-center ${n === "→" ? "flex items-center justify-center text-3xl text-[#276749]" : "border border-gray-300 bg-white shadow-sm"}`}
              >
                <div>
                  <p className="text-3xl font-black text-[#205c38]">{n}</p>
                  <p className="mt-1 text-sm font-bold text-gray-600">{l}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-emerald-900">
                Second-stage match
              </p>
              <p className="mt-3 font-semibold">
                Finalize November Reporting Package
              </p>
              <p className="font-semibold">
                Draft November Reporting Checklist
              </p>
              <p className="mt-4 leading-7">
                These satisfied the first November test and the second test
                requiring <code>MATCH:</code> plus <code>Reporting</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-amber-900">
                Independent second evaluation — #24
              </p>
              <p className="mt-3">
                <strong>Task:</strong> Validate November Report Data
              </p>
              <p className="mt-2">
                <strong>ac:</strong> MATCH: Validate November Report Data
              </p>
              <p className="mt-2">
                <strong>ag:</strong> SECOND NO MATCH: MATCH: Validate November
                Report Data
              </p>
            </div>
          </div>
          <Callout title="New evaluation, earlier data">
            <p>
              <code>ag</code> could see that <code>ac</code> produced a match,
              but <code>ag</code> performed its own Jinja evaluation with its
              own condition. A later evaluation can consume an earlier
              evaluation&apos;s result without sharing its local variables.
            </p>
          </Callout>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Activity Log evidence"
          title="Read the runtime chain item by item"
        >
          <p>
            The final run gives us stronger evidence than the table alone.
            Search <code>aa</code> found 13 Tasks, and the run finished in
            approximately 10.2 seconds. Inside the Loop, Activity repeated the
            same execution pattern for each current item.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <LuActivity className="text-2xl text-[#276749]" />
              <h3 className="text-xl font-extrabold text-[#205c38]">
                Run specimen
              </h3>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="font-bold">Pipeline</dt>
                <dd>Lesson 16 - Jinja Runtime References</dd>
              </div>
              <div>
                <dt className="font-bold">Search</dt>
                <dd>aa · 13 Tasks</dd>
              </div>
              <div>
                <dt className="font-bold">First Update</dt>
                <dd>ac</dd>
              </div>
              <div>
                <dt className="font-bold">Second Update</dt>
                <dd>ag</dd>
              </div>
              <div>
                <dt className="font-bold">Duration</dt>
                <dd>≈ 10.2 seconds</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-extrabold text-[#205c38]">
              Observed repeating pattern
            </p>
            <div className="mt-5 space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-[#b7d8c2] bg-white p-4"
                >
                  <span className="rounded-lg bg-[#276749] px-3 py-2 font-bold text-white">
                    Item {i}
                  </span>
                  <LuArrowRight />
                  <span className="rounded-lg bg-gray-100 px-3 py-2 font-bold">
                    ac
                  </span>
                  <LuArrowRight />
                  <span className="rounded-lg bg-gray-100 px-3 py-2 font-bold">
                    ag
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 leading-7">
              For the first Loop Target Item, Activity showed{" "}
              <code>batch.size: 13</code> and <code>loop.index: 0</code>, with
              record #24 as the current item.
            </p>
          </div>
        </div>
        <Callout
          title="Do not redraw the run as ac × 13, then ag × 13."
          tone="gold"
        >
          <p>
            The observed execution pattern was item-by-item:{" "}
            <strong>
              item 0 → ac → ag; item 1 → ac → ag; item 2 → ac → ag
            </strong>
            , and so on. That matters because <code>ag</code> consumes{" "}
            <code>ac</code> within the same current-item iteration.
          </p>
        </Callout>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Runtime state"
            title="The same record can have more than one runtime representation"
          >
            <p>
              Lesson 15 showed that earlier references do not automatically
              become live views of every later mutation. Lesson 16 reinforces
              that model.
            </p>
          </SectionHeading>
          <div className="mt-8 mx-auto max-w-3xl">
            <FlowCard label="Earlier" title="Search-time state — aa">
              <p>State exposed when Search Records executed.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Later" title="ac state">
              <p>First Update step resolves and exposes its result.</p>
            </FlowCard>
            <FlowArrow />
            <FlowCard label="Later still" title="ag state">
              <p>
                Second Update consumes runtime data and produces another state.
              </p>
            </FlowCard>
            <FlowArrow />
            <FlowCard
              label="Application"
              title="Eventual database state"
              strong
            >
              <p>The record after the Pipeline&apos;s mutations complete.</p>
            </FlowCard>
          </div>
          <Callout title="Same record. Different references. Different runtime states.">
            <p>
              A later mutation does not retroactively rewrite the earlier Search
              Records runtime output. The reference you choose matters because
              it identifies which execution state you are reading.
            </p>
          </Callout>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="An anomaly worth keeping"
          title="The skipped Update revealed something more important"
        >
          <p>
            Activity reported{" "}
            <strong>
              “Skipped because set values are the same as in source object.”
            </strong>{" "}
            for <code>ac</code> on records whose Jinja result already matched
            the stored Pipeline Results value.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex gap-2">
              <EvidenceBadge type="OBSERVED" />
              <strong>Same-value Update</strong>
            </div>
            <p className="mt-4 leading-7">
              For #24, <code>ac</code> Input contained{" "}
              <code>
                pipeline_results: MATCH: Validate November Report Data
              </code>
              , which was already present. Activity reported the Update as
              skipped, and the observed record did not receive a newer{" "}
              <code>updated_at</code> from that step.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex gap-2">
              <EvidenceBadge type="OBSERVED" />
              <strong>Runtime handoff still worked</strong>
            </div>
            <p className="mt-4 leading-7">
              Even though <code>ac</code>&apos;s database mutation was skipped,{" "}
              <code>ag</code> still consumed{" "}
              <code>{`{{ac.pipeline_results}}`}</code> and resolved{" "}
              <code>SECOND NO MATCH: MATCH: Validate November Report Data</code>
              .
            </p>
          </div>
        </div>
        <Callout
          title="Runtime output is not the same question as database mutation."
          tone="gold"
        >
          <p>
            A later Pipeline step successfully consumed an earlier step&apos;s
            runtime output even when the earlier Update Record did not perform a
            new database mutation because the desired value was already present.
          </p>
        </Callout>
        <div className="mt-6 rounded-xl border border-dashed border-gray-400 bg-gray-50 p-5">
          <p className="font-extrabold text-gray-800">FOR LATER — LESSON 19</p>
          <p className="mt-2 leading-7 text-gray-700">
            Same-value writes, actual mutations, Date Modified, secondary
            events, and related behavior deserve a controlled lesson of their
            own. We preserve the evidence here without turning Lesson 16 into a
            mutation-semantics lesson.
          </p>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Layered scope model"
            title="Five layers, five different jobs"
          >
            <p>
              When Jinja feels confusing, identify the layer first. Then ask
              which names exist at that layer and who created them.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-5 lg:grid-cols-5">
            {[
              [
                "1",
                "Search collection",
                "Search Records aa → 13 Tasks",
                "Quickbase creates the collection.",
              ],
              [
                "2",
                "Quickbase Loop scope",
                "aa + metadata.aa.loop.index",
                "Quickbase owns current-item iteration.",
              ],
              [
                "3",
                "Jinja evaluation scope",
                "{% set task = aa.task_name %}",
                "task is local to this evaluation in our experiment.",
              ],
              [
                "4",
                "Pipeline step output",
                "ac.pipeline_results",
                "Quickbase exposes data from the earlier step.",
              ],
              [
                "5",
                "New Jinja evaluation",
                "ag reads runtime data",
                "New logic, new evaluation, earlier output available.",
              ],
            ].map(([n, t, c, d]) => (
              <div
                key={n}
                className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">
                  {n}
                </span>
                <h3 className="mt-4 font-extrabold text-[#205c38]">{t}</h3>
                <p className="mt-3 wrap-break-word font-mono text-xs leading-6 text-gray-700">
                  {c}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">{d}</p>
              </div>
            ))}
          </div>
          <Callout title="Scope determines which names are available. Runtime outputs provide a way for data to move between scopes.">
            <p>
              This model is more useful than memorizing isolated braces. It
              tells you why one reference works here, why another does not, and
              how a resolved value can continue through the workflow.
            </p>
          </Callout>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Critical distinction"
          title="Quickbase Loop is not a Jinja loop"
        >
          <p>
            Everything in the 13-record experiment was iterated by Quickbase. We
            have not yet asked Jinja itself to iterate a collection with{" "}
            <code>{`{% for %}`}</code>.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Quickbase Pipeline Loop
            </p>
            <div className="mt-5 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl bg-white p-4 shadow-sm">
                  <strong>Quickbase item {i}</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Run the Pipeline steps for this current item.
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 leading-7">
              Jinja is evaluated separately when a configured step field needs
              it.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-6">
            <p className="font-bold uppercase tracking-[0.12em] text-blue-900">
              Jinja for loop
            </p>
            <CodeBlock>{`{% for item in collection %}\n    ...\n{% endfor %}`}</CodeBlock>
            <p className="mt-5 leading-7">
              Here Jinja itself owns iteration inside one template evaluation.
              That is a different execution layer and a topic we can now
              approach without confusing it with Quickbase orchestration.
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
          <div className="flex items-center gap-3">
            <LuCircleAlert className="text-2xl text-[#7a5200]" />
            <h3 className="text-2xl font-extrabold text-[#654700]">
              Two loops. Two owners. Don&apos;t confuse their indexes.
            </h3>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-white p-5">
              <p className="font-extrabold">Quickbase Pipeline Loop metadata</p>
              <CodeBlock>{`{{metadata.aa.loop.index}}`}</CodeBlock>
              <p className="mt-3 text-sm leading-6">
                Observed as zero-based in our Quickbase Loop experiment.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5">
              <p className="font-extrabold">
                Jinja <code>{"{% for item in collection %}"}</code> helpers
              </p>
              <CodeBlock>{`{{loop.index}}   // documented one-based\n{{loop.index0}}  // documented zero-based`}</CodeBlock>
              <p className="mt-3 text-sm leading-6">
                These belong to a Jinja loop, not automatically to a Quickbase
                Pipeline Loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#9fc9ad] bg-[#f0fff4]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Reference panel"
            title="Only the Jinja we needed today"
          >
            <p>
              Keep this small on purpose. Lesson 17 will transform data more
              aggressively. Lesson 16 is about where the data comes from and how
              scope works.
            </p>
          </SectionHeading>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Output runtime data", "{{aa.task_name}}"],
              ["Pipeline runtime", "{{runtime.pipeline_name}}"],
              ["Create local Jinja name", "{% set task = aa.task_name %}"],
              [
                "Conditional",
                "{% if 'November' in aa.task_name %}\n...\n{% else %}\n...\n{% endif %}",
              ],
              [
                "Boolean combination",
                "{% if 'MATCH:' in ac.pipeline_results and 'Reporting' in ac.pipeline_results %}\n...\n{% endif %}",
              ],
              ["Earlier step output", "{{ac.pipeline_results}}"],
            ].map(([t, c]) => (
              <div
                key={t}
                className="rounded-2xl border border-[#b7d8c2] bg-white p-5 shadow-sm"
              >
                <h3 className="font-extrabold text-[#205c38]">{t}</h3>
                <div className="mt-4">
                  <CodeBlock>{c}</CodeBlock>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Misconceptions"
          title="Six ideas to stop carrying forward"
        >
          <p>
            These mistakes are understandable because the syntax hides which
            execution layer owns the behavior.
          </p>
        </SectionHeading>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            [
              "“Jinja searched the Tasks table for November.”",
              "No. Search Records selected the records. Jinja inspected the Task Name of the current runtime item.",
            ],
            [
              "“aa is a Jinja variable.”",
              "Too simplistic for this model. Quickbase exposes aa as part of Pipeline runtime context; Jinja can address it.",
            ],
            [
              "“A {% set %} variable becomes available to later Pipeline steps.”",
              "Not in our observed experiment. The local name did not automatically cross the Pipeline-step boundary.",
            ],
            [
              "“If Jinja produced a value, its local variable must have survived.”",
              "No. The produced value can be exposed through a Pipeline step output even when the local Jinja name does not survive.",
            ],
            [
              "“ac.pipeline_results means reread Pipeline Results directly from Quickbase.”",
              "Do not use that mental model. It is runtime data exposed through step ac.",
            ],
            [
              "“Quickbase Loop and Jinja {% for %} are basically the same thing.”",
              "No. They are different iteration mechanisms owned by different execution layers.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <LuCircleAlert className="mt-1 shrink-0 text-xl text-[#7a5200]" />
                <div>
                  <h3 className="font-extrabold text-gray-950">{t}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <SectionHeading
            eyebrow="Predict before revealing"
            title="Use the scope model, not guesswork"
          >
            <p>
              Read each scenario and make a prediction before opening the answer
              mentally.
            </p>
          </SectionHeading>
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-extrabold text-[#205c38]">
                Prediction 1 — same evaluation
              </p>
              <CodeBlock>{`{% set x = aa.task_name %}\n{{x}}`}</CodeBlock>
              <p className="mt-4 leading-7">
                <strong>Prediction:</strong> Should <code>x</code> resolve here?{" "}
                <strong>Yes.</strong> It was created and used during the same
                Jinja evaluation.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-extrabold text-[#205c38]">
                Prediction 2 — next Pipeline action
              </p>
              <CodeBlock>{`{{x}}`}</CodeBlock>
              <p className="mt-4 leading-7">
                <strong>Prediction:</strong> Does Lesson 16 evidence say the
                later step automatically receives <code>x</code>?{" "}
                <strong>No.</strong> The local name did not automatically cross
                that boundary.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-extrabold text-[#205c38]">
                Prediction 3 — earlier step output
              </p>
              <CodeBlock>{`{{ac.pipeline_results}}`}</CodeBlock>
              <p className="mt-4 leading-7">
                <strong>Prediction:</strong> Why is this different? Because
                Quickbase exposes runtime data through the earlier Pipeline
                step&apos;s output.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <p className="font-extrabold text-[#205c38]">
                Prediction 4 — November test
              </p>
              <CodeBlock>{`{% if 'November' in aa.task_name %}\nMATCH\n{% endif %}`}</CodeBlock>
              <p className="mt-4 leading-7">
                <strong>Prediction:</strong> Does this alter which records
                Search Records returned? <strong>No.</strong> It operates on the
                current item after Search Records already produced the
                collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quiz"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 py-12 lg:px-8 lg:py-16"
      >
        <SectionHeading
          eyebrow="Lesson 16 quiz"
          title="Can you identify who owns the value?"
        >
          <p>
            The syntax is secondary. The real test is whether you can identify
            the runtime layer, scope, and handoff.
          </p>
        </SectionHeading>
        <div className="mt-8">
          <Quiz />
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6">
          <h3 className="text-xl font-extrabold text-[#205c38]">
            Layer identification drill
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <p>
              <strong>Search Records collection:</strong> Quickbase
              query/runtime
            </p>
            <p>
              <strong>aa:</strong> Quickbase current-item runtime reference
            </p>
            <p>
              <strong>{`{% set task = ... %}`}:</strong> Jinja-local name
            </p>
            <p>
              <strong>ac.pipeline_results:</strong> earlier Pipeline step output
            </p>
            <p>
              <strong>runtime.pipeline_name:</strong> Pipeline-level runtime
              information
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#17452a] bg-[#205c38] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <p className="font-bold uppercase tracking-[0.14em] text-[#d8f3dc]">
            Final mental model
          </p>
          <h2 className="mt-2 max-w-4xl text-3xl font-extrabold sm:text-4xl">
            Follow ownership from data to evaluation to output
          </h2>
          <div className="mt-8 mx-auto max-w-3xl space-y-3">
            {[
              ["QUICKBASE FINDS DATA", "Search Records produces a collection"],
              ["QUICKBASE ORCHESTRATES", "Loop establishes the current item"],
              [
                "QUICKBASE EXPOSES RUNTIME REFERENCES",
                "aa.task_name · metadata.aa.loop.index · runtime.pipeline_name",
              ],
              [
                "JINJA EVALUATES",
                "reads values · creates local names · tests conditions · produces a value",
              ],
              ["PIPELINE STEP EXPOSES OUTPUT", "ac.pipeline_results"],
              ["LATER STEP RECEIVES RUNTIME DATA", "new Jinja evaluation → ag"],
            ].map(([a, b], i) => (
              <div key={a}>
                {i > 0 ? (
                  <div className="flex h-7 justify-center">
                    <LuArrowDown className="text-xl text-white/50" />
                  </div>
                ) : null}
                <div className="rounded-xl border border-white/20 bg-white/10 p-5">
                  <p className="text-xs font-extrabold tracking-[0.14em] text-[#d8f3dc]">
                    {a}
                  </p>
                  <p className="mt-2 font-bold text-white">{b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6">
              <p className="text-xl font-extrabold">
                Jinja does not replace the Pipeline runtime.
              </p>
              <p className="mt-3 leading-8 text-white/90">
                It evaluates the runtime data Quickbase makes available.
              </p>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6">
              <p className="text-xl font-extrabold">
                The variable does not need to escape its scope.
              </p>
              <p className="mt-3 leading-8 text-white/90">
                Its data can continue through the workflow when a Pipeline step
                exposes that resolved value as runtime output.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Bridge to Lesson 17"
          title="Now that Jinja has the data, what can we turn it into?"
        >
          <p>
            Lesson 16 answered where Jinja&apos;s data comes from, what is in
            scope, and how data can move between runtime contexts. That
            foundation lets Lesson 17 become much more deliberate.
          </p>
        </SectionHeading>
        <div className="mt-8 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#276749] text-2xl text-white">
              <LuBraces aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Lesson 17 — Transforming Data With Jinja
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#205c38]">
                Once Jinja can reach runtime data, what can we deliberately turn
                that data into?
              </h3>
              <p className="mt-4 leading-8 text-gray-700">
                Next we can explore text manipulation, formatting, numbers,
                lists, missing/default values, structured values, richer
                conditional transformations, and—where it solves a real
                problem—actual Jinja iteration and its own loop helpers.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/lessons/15"
            className="rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749]"
          >
            ← Lesson 15
          </Link>
          <Link
            href="/lessons/17"
            className="rounded-lg bg-[#276749] px-5 py-3 font-bold text-white"
          >
            Continue to Lesson 17 →
          </Link>
          <Link
            href="/lessons"
            className="rounded-lg border-2 border-gray-300 px-5 py-3 font-bold text-gray-800"
          >
            Table of Contents
          </Link>
        </div>
      </section>
    </main>
  );
}
