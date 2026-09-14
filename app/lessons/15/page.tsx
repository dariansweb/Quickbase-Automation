"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LuActivity,
  LuArrowDown,
  LuBadgeCheck,
  LuBookOpen,
  LuBraces,
  LuCircleAlert,
  LuCircleCheck,
  LuCircleHelp,
  LuCode,
  LuDatabase,
  LuFileSearch,
  LuGitBranch,
  LuLayers,
  LuList,
  LuNetwork,
  LuPlay,
  LuRefreshCw,
  LuSearch,
  LuWorkflow,
} from "react-icons/lu";

type Evidence = "DOCUMENTED" | "OBSERVED" | "INFERRED";

const evidenceStyles: Record<Evidence, string> = {
  DOCUMENTED: "border-blue-200 bg-blue-50 text-blue-900",
  OBSERVED: "border-emerald-200 bg-emerald-50 text-emerald-900",
  INFERRED: "border-amber-200 bg-amber-50 text-amber-900",
};

function EvidenceBadge({ type }: { type: Evidence }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold tracking-wide ${evidenceStyles[type]}`}>
      {type}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#276749]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">{children}</div>}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-950 px-1.5 py-0.5 font-mono text-[0.92em] text-emerald-200">
      {children}
    </code>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-2 text-[#276749]" aria-hidden="true">
      <LuArrowDown className="h-6 w-6" />
    </div>
  );
}

const quiz = [
  {
    q: "Inside the Lesson 15 Loop, what did aa represent?",
    choices: [
      "The Loop itself",
      "The current Search Records item being processed",
      "The final database value",
      "The output of Update Record ab",
    ],
    answer: 1,
    explanation:
      "The Loop iterated the Search Records result and made the current item available under the name aa. aa was not the Loop itself.",
  },
  {
    q: "True or false: after ab changed Pipeline Results, aa.pipeline_results automatically changed to ab's new value.",
    choices: ["True", "False"],
    answer: 1,
    explanation:
      "False. The experiment showed aa could still expose the earlier Search/current-item value while ab exposed the newer value produced by the action.",
  },
  {
    q: "A later step needs the Pipeline Results value produced by Update Record ab. Which reference matches that need?",
    choices: ["aa.pipeline_results", "ab.pipeline_results", "metadata.aa.loop.index", "loop.index"],
    answer: 1,
    explanation:
      "ab.pipeline_results refers to the value exposed by the earlier Update Record step.",
  },
  {
    q: "What did metadata.aa.loop.index describe?",
    choices: [
      "The Record ID",
      "The number of returned fields",
      "The current item's zero-based position in the Quickbase Pipeline Loop",
      "A Jinja for-loop counter",
    ],
    answer: 2,
    explanation:
      "The observed values were 0 through 5 for six Tasks. This was Quickbase Pipeline runtime metadata.",
  },
  {
    q: "True or false: being inside a Quickbase Pipeline Loop means Jinja's {{loop.index}} is automatically available.",
    choices: ["True", "False"],
    answer: 1,
    explanation:
      "False. A Quickbase Pipeline Loop and a Jinja {% for %} loop are different layers.",
  },
  {
    q: "Execution reaches End of loop. What happens to the current-item name defined by Refer to each item as?",
    choices: [
      "It permanently becomes the last record",
      "It becomes a global Pipeline variable",
      "Its current-item scope ends",
      "The Quickbase record is deleted",
    ],
    answer: 2,
    explanation:
      "The current-item name is scoped to the Loop body. The underlying Quickbase record still exists.",
  },
  {
    q: "An inner nested Loop is executing. According to the documented scope rule, what can it reference?",
    choices: [
      "Only its inner current item",
      "Its own current-item name and names from enclosing Loops",
      "Only values outside every Loop",
      "No current-item references",
    ],
    answer: 1,
    explanation:
      "Quickbase documents that nested Loops can access names from enclosing Loops.",
  },
  {
    q: "Why could ac read different states of the same Quickbase record?",
    choices: [
      "Quickbase duplicated the record",
      "Different references exposed information from different points in execution",
      "The Loop randomly cached fields",
      "Jinja queried the database separately for every expression",
    ],
    answer: 1,
    explanation:
      "aa exposed the earlier current-item state while ab exposed the newer action output: same record, same iteration, different runtime references.",
  },
];

export default function Lesson15Page() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const score = quiz.reduce(
    (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
    0,
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div aria-hidden="true" className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab · Lesson 15
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Advanced Loop Processing and Runtime Scope
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Follow the current item, earlier step outputs, and execution metadata through a Loop—and learn why the same Quickbase record can appear as different runtime states during one Pipeline run.
          </p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
            Lessons 13 and 14 established what a Loop does and where its collection comes from. This lesson asks the more advanced question: what is actually available while one item is being processed?
          </p>
          <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5">
            <p className="font-bold">The teaching apex</p>
            <p className="mt-2 leading-7 text-white/90">
              Low-code did not remove scope. Quickbase orchestrated much of it for us. Understanding that runtime scope is what turns a simple reference into a powerful Pipeline tool.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/lessons/14" className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white hover:bg-white/10">
              ← Previous Lesson
            </Link>
            <Link href="/lessons/16" className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white hover:bg-white/10">
              Next Lesson →
            </Link>
            <Link href="/lessons" className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]">
              Table of Contents
            </Link>
            <a href="#quiz" className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold text-white">
              <LuCircleHelp className="h-5 w-5" /> Skip to quiz
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <section className="mb-16">
          <SectionHeading eyebrow="The shift" title="The Loop was never the hard part">
            <p>
              By Lesson 15, repeating an action for every record in a returned list is familiar. The interesting part now is the runtime world Quickbase creates while that repetition is happening.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              [LuRefreshCw, "Lesson 13", "How does a Loop process the items in a returned list?"],
              [LuSearch, "Lesson 14", "How does Search Records decide which items enter that list?"],
              [LuLayers, "Lesson 15", "What is in scope while one of those items is being processed?"],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof LuLayers;
              return (
                <div key={String(title)} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <I className="h-7 w-7 text-[#276749]" />
                  <h3 className="mt-4 text-xl font-extrabold">{String(title)}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{String(text)}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7">
            <div className="flex items-start gap-4">
              <LuBookOpen className="mt-1 h-7 w-7 shrink-0 text-[#276749]" />
              <div>
                <h3 className="text-xl font-extrabold text-[#17452a]">Runtime scope</h3>
                <p className="mt-3 text-lg leading-8 text-slate-800">
                  <strong>Runtime scope is the set of references that are available at a particular point while the Pipeline is executing.</strong>
                </p>
                <p className="mt-3 leading-7 text-slate-700">
                  A Quickbase Loop does more than repeat steps. Its configured current-item name gives the steps inside the Loop a way to work with the item being processed. Earlier steps can expose outputs, and Quickbase can expose metadata describing execution itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Why Quickbase matters" title="Low-code did not make scope disappear">
            <p>
              Traditional programming loops can become difficult when iteration, nested scopes, returned values, asynchronous work, callbacks, and variable lifetimes begin interacting. Quickbase presents much of that orchestration through a visual Pipeline instead.
            </p>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="flex items-center gap-3">
                <LuCode className="h-7 w-7 text-slate-700" />
                <h3 className="text-xl font-extrabold">Traditional programming concern</h3>
              </div>
              <div className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
                <div>{"for (const aa of searchResults) {"}</div>
                <div className="pl-5">{"const ab = await updateRecord(aa);"}</div>
                <div className="pl-5 text-emerald-300">{"// aa and ab are both available here"}</div>
                <div>{"}"}</div>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                The developer must reason about iteration and the lifetime of values. Real programs can add functions, promises, callbacks, errors, and nested scopes on top of that.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7">
              <div className="flex items-center gap-3">
                <LuWorkflow className="h-7 w-7 text-[#276749]" />
                <h3 className="text-xl font-extrabold text-[#17452a]">Quickbase&apos;s abstraction</h3>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "For each item in: Search Records",
                  "Refer to each item as: aa",
                  "Run the steps inside the Loop",
                  "Expose earlier outputs and runtime metadata",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-white p-3">
                    <LuCircleCheck className="h-5 w-5 shrink-0 text-[#276749]" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                <strong>Low-code does not mean the underlying programming concept disappeared. Quickbase gave the concept a simpler interface.</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-950 p-6 text-white">
            <p className="text-xl font-extrabold">The impressive part is not that Quickbase can loop through records.</p>
            <p className="mt-2 leading-7 text-slate-300">
              The impressive part is how much usable runtime scope Quickbase manages for the builder while that Loop is running.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="The specimen" title="One Pipeline, studied deeply">
            <p>
              In my Lesson 15 study, one controlled Pipeline exposed several important runtime concepts at once. The strength of the experiment came from following the same data through multiple points in execution.
            </p>
          </SectionHeading>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mx-auto max-w-2xl">
              {[
                [LuFileSearch, "Search Records — aa", "Record ID > 24 · six Tasks returned"],
                [LuRefreshCw, "Quickbase Loop", "For each item in Search Records · Refer to each item as aa"],
                [LuDatabase, "Update Record — ab", 'Pipeline Results = "Hello from the 1st update!"'],
                [LuBraces, "Update Record — ac", "Reads aa, ab, and metadata.aa.loop.index"],
              ].map(([Icon, title, detail], index) => {
                const I = Icon as typeof LuLayers;
                return (
                  <div key={String(title)}>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex gap-4">
                        <I className="mt-1 h-6 w-6 shrink-0 text-[#276749]" />
                        <div>
                          <p className="font-extrabold">{String(title)}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{String(detail)}</p>
                        </div>
                      </div>
                    </div>
                    {index < 3 && <FlowArrow />}
                  </div>
                );
              })}
              <FlowArrow />
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-4 text-center font-extrabold text-slate-700">
                End of loop
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-extrabold text-amber-950">Be precise about <Code>aa</Code></p>
            <p className="mt-2 leading-7 text-amber-900">
              <Code>aa</Code> is not a synonym for &quot;the Loop.&quot; In this configured Loop, Quickbase iterated over the Search Records result and made the <strong>current item</strong> available under the name <Code>aa</Code>.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[27, 28, 26, 30, 29, 25].map((id, index) => (
              <div key={id} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Observed item {index + 1}</p>
                <p className="mt-1 text-2xl font-extrabold">Record #{id}</p>
                <p className="mt-1 text-sm text-slate-600">Loop index {index}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            This was the observed return and processing sequence. I am not treating it as a guaranteed Quickbase ordering rule.
          </p>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="The centerpiece" title="Three references, three questions">
            <p>
              The second Update Record step combined three kinds of runtime information into one field. That one expression became the clearest specimen in the study.
            </p>
          </SectionHeading>

          <div className="overflow-x-auto rounded-2xl bg-slate-950 p-6 text-sm leading-8 text-slate-100 sm:text-base">
            <code className="font-mono">
              {"Original: {{aa.pipeline_results}}"}<br />
              {"| After Step A: {{ab.pipeline_results}}"}<br />
              {"| Index: {{metadata.aa.loop.index}}"}
            </code>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {[
              [LuDatabase, "Current-item business data", "aa.pipeline_results", "What value did this current Search Records item bring into the iteration?"],
              [LuActivity, "Earlier step output", "ab.pipeline_results", "What newer value did the earlier Update Record action produce in this iteration?"],
              [LuLayers, "Runtime metadata", "metadata.aa.loop.index", "Where is this current item in the Quickbase Loop's processing sequence?"],
            ].map(([Icon, label, ref, text]) => {
              const I = Icon as typeof LuLayers;
              return (
                <div key={String(ref)} className="rounded-2xl border border-slate-200 p-6">
                  <I className="h-7 w-7 text-[#276749]" />
                  <p className="mt-4 text-sm font-extrabold uppercase tracking-wide text-[#276749]">{String(label)}</p>
                  <p className="mt-2 font-mono text-sm font-bold">{String(ref)}</p>
                  <p className="mt-3 leading-7 text-slate-700">{String(text)}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-7 text-center">
            <p className="text-2xl font-extrabold text-[#17452a]">
              Same record. Same iteration. Different references. Different runtime states.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="My observation" title="Updating the record did not rewrite the earlier reference">
            <p>This was the point where the experiment became much more than a Loop exercise.</p>
          </SectionHeading>
          <div className="mb-5 flex items-center gap-3">
            <EvidenceBadge type="OBSERVED" />
            <span className="text-sm font-semibold text-slate-600">Lesson 15 laboratory result</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-slate-500">Search / current item</p>
              <p className="mt-3 font-mono font-bold">aa.pipeline_results</p>
              <p className="mt-3 leading-7 text-slate-700">
                Could still resolve the earlier value exposed through the Search/current-item reference.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-slate-500">First update</p>
              <p className="mt-3 font-mono font-bold">ab.pipeline_results</p>
              <p className="mt-3 leading-7 text-slate-700">
                Exposed the newer value: <strong>Hello from the 1st update!</strong>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm font-extrabold uppercase tracking-wide text-slate-500">Second update</p>
              <p className="mt-3 font-mono font-bold">ac</p>
              <p className="mt-3 leading-7 text-slate-700">
                Could use both runtime references together, plus Loop metadata.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-xl border-l-4 border-[#276749] bg-slate-50 p-6">
            <p className="text-lg font-extrabold">
              A Pipeline reference is not simply asking, “What is this database field right now?”
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              My experiment showed that different references can expose information associated with different points in Pipeline execution. Updating the Quickbase record did not retroactively rewrite the earlier value exposed through <Code>aa</Code>.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Runtime evidence" title="The Activity Log preserved the execution story">
            <p>
              Looking only at the final Tasks table would hide the first update because the second update replaced it. The Activity Log preserved the successive states.
            </p>
          </SectionHeading>
          <div className="mb-5"><EvidenceBadge type="OBSERVED" /></div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1fr_1.3fr] bg-slate-100 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-slate-600">
              <span>Runtime point</span><span>Observed updated_at</span>
            </div>
            {[
              ["aa / Search state", "≈ 19:02:55.566"],
              ["ab / first update output", "≈ 19:18:41.829"],
              ["ac / second update output", "≈ 19:18:42.260"],
            ].map(([point, time]) => (
              <div key={point} className="grid grid-cols-[1fr_1.3fr] border-t border-slate-200 px-5 py-4">
                <span className="font-bold">{point}</span>
                <span className="font-mono text-sm text-slate-700">{time}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 leading-7 text-slate-700">
            The important lesson is not the exact clock time. The Activity Log showed more than “Record 27 three times.” It showed information exposed or returned at distinct points as the Pipeline progressed.
          </p>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-extrabold">Final state is not the complete execution story.</p>
            <p className="mt-2 leading-7 text-slate-700">
              The Tasks table showed the final write. Activity preserved evidence that the first write happened before the second one replaced it.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Execution metadata" title="Quickbase also tells us about the iteration itself">
            <p>Business fields answer questions about the record. Metadata can answer questions about how that record is being processed.</p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold">Batch size</h3><EvidenceBadge type="OBSERVED" />
              </div>
              <p className="mt-4 text-4xl font-extrabold text-[#276749]">6</p>
              <p className="mt-3 leading-7 text-slate-700">Loop Target Item metadata showed <Code>batch.size = 6</Code>.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold">Loop index</h3><EvidenceBadge type="OBSERVED" />
              </div>
              <p className="mt-4 font-mono text-lg font-extrabold text-[#276749]">{"{{metadata.aa.loop.index}}"}</p>
              <p className="mt-3 leading-7 text-slate-700">It resolved to 0, 1, 2, 3, 4, and 5 across the six current items.</p>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-amber-300 bg-amber-50 p-7">
            <div className="flex items-start gap-4">
              <LuCircleAlert className="mt-1 h-7 w-7 shrink-0 text-amber-700" />
              <div>
                <h3 className="text-2xl font-extrabold text-amber-950">Quickbase Pipeline Loop ≠ Jinja Loop</h3>
                <p className="mt-3 leading-7 text-amber-950">
                  Being inside a Loop in the Pipeline designer does not mean Jinja itself is executing a <Code>{"{% for ... %}"}</Code> loop.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-5">
                    <p className="font-extrabold">Quickbase Pipeline Loop</p>
                    <p className="mt-2 font-mono text-sm">{"{{metadata.aa.loop.index}}"}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">Quickbase runtime metadata associated with the current source item in this Pipeline Loop.</p>
                  </div>
                  <div className="rounded-xl bg-white p-5">
                    <p className="font-extrabold">Jinja for-loop</p>
                    <p className="mt-2 font-mono text-sm">{"{{loop.index}}"}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">Jinja's own helper when Jinja itself is executing a <Code>{"{% for %}"}</Code> loop.</p>
                  </div>
                </div>
                <p className="mt-5 font-bold">Quickbase creates the runtime environment. Jinja evaluates values available in that runtime environment.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="The boundary" title="End of loop means something">
            <p>Quickbase visibly marks the end of the Loop body. That boundary helps us reason about scope.</p>
          </SectionHeading>
          <div className="mb-5"><EvidenceBadge type="DOCUMENTED" /></div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              [LuList, "Outside", "Search Records produces the collection."],
              [LuPlay, "Enter Loop", "The current item becomes available under the configured Refer to each item as name."],
              [LuNetwork, "Inside", "Current-item data, available earlier outputs, and Loop metadata can be used by later steps."],
              [LuGitBranch, "End of loop", "The temporary current-item name from this Loop is no longer available outside its body."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof LuLayers;
              return (
                <div key={String(title)} className="rounded-2xl border border-slate-200 p-5">
                  <I className="h-6 w-6 text-[#276749]" />
                  <h3 className="mt-4 font-extrabold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{String(text)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl bg-[#276749] p-6 text-white">
            <p className="text-xl font-extrabold">The Quickbase record does not disappear.</p>
            <p className="mt-2 leading-7 text-white/90">
              What ends is the temporary current-item reference defined for that Loop body. It does not become a permanent “last item” variable after the Loop finishes.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Advanced implication" title="Nested scope works inward">
            <p>
              I did not turn this into a nested-Loop lab because that would add complexity without enough new teaching value. Quickbase Help does, however, document an important scope rule.
            </p>
          </SectionHeading>
          <div className="mb-5"><EvidenceBadge type="DOCUMENTED" /></div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="rounded-xl border-2 border-[#276749] bg-white p-6">
              <p className="font-extrabold text-[#17452a]">Outer Loop · current department</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">The department name is in scope throughout this Loop body.</p>
              <div className="ml-4 mt-5 rounded-xl border-2 border-dashed border-emerald-300 bg-[#f0fff4] p-6 sm:ml-10">
                <p className="font-extrabold text-[#17452a]">Inner Loop · current employee</p>
                <p className="mt-2 leading-7 text-slate-700">
                  Inside here, the employee name is available <strong>and the enclosing department name remains available.</strong>
                </p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                After the inner Loop ends, the employee name leaves scope while the department name remains available until the outer Loop ends.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border-l-4 border-[#276749] bg-[#f0fff4] p-6">
            <p className="text-xl font-extrabold text-[#17452a]">Loop scope works inward, not outward.</p>
            <p className="mt-2 leading-7 text-slate-700">
              A nested step can use names from enclosing Loops. A step after a Loop cannot keep using a current-item name whose Loop has ended.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="What one experiment revealed" title="Advanced study does not require random complexity">
            <p>
              The strength of this study came from extracting several confirmed ideas from one controlled specimen instead of constantly changing the Pipeline.
            </p>
          </SectionHeading>
          <div className="space-y-3">
            {[
              "Search Records created the collection used by the Loop.",
              "The Loop established a temporary current-item scope.",
              "In this Loop, aa named the current Search Records item.",
              "ab produced a newer runtime state after updating the same record.",
              "ac could reference both the earlier current-item data and the newer ab output.",
              "metadata.aa.loop.index described the current iteration rather than a business field.",
              "End of loop established the current-item scope boundary.",
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-xl border border-slate-200 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">{index + 1}</div>
                <p className="pt-1 leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Evidence board" title="What is established, and how strongly?">
            <p>The lesson separates Quickbase documentation, direct laboratory observations, and the smallest inference needed to form a useful model.</p>
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <EvidenceBadge type="DOCUMENTED" />
              <ul className="mt-5 space-y-3 text-sm leading-6 text-blue-950">
                <li>• A Refer to each as name is scoped to its Loop body.</li>
                <li>• Steps outside that Loop cannot reference that name.</li>
                <li>• Nested Loops can access names from enclosing Loops.</li>
                <li>• Quickbase supports nested lists and Loops.</li>
                <li>• Earlier/upstream references can remain independently available where Quickbase exposes them.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <EvidenceBadge type="OBSERVED" />
              <ul className="mt-5 space-y-3 text-sm leading-6 text-emerald-950">
                <li>• Six Tasks were returned and processed.</li>
                <li>• Batch size was 6 and Loop indexes were 0–5.</li>
                <li>• metadata.aa.loop.index resolved successfully.</li>
                <li>• aa preserved the earlier exposed Pipeline Results value.</li>
                <li>• ab exposed the newer first-update value.</li>
                <li>• ac combined aa, ab, and Loop metadata.</li>
                <li>• Activity preserved successive runtime states.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <EvidenceBadge type="INFERRED" />
              <p className="mt-5 text-sm leading-6 text-amber-950">
                A useful model is that Quickbase maintains a runtime context in which current items and outputs from earlier execution are made available as references to later steps.
              </p>
              <p className="mt-4 text-sm font-bold text-amber-950">
                This model explains the evidence without claiming undocumented details about Quickbase's internal engine.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Common misconceptions" title="Where scope thinking prevents mistakes" />
          <div className="space-y-4">
            {[
              ["“A Loop just repeats some steps.”", "It repeats work, but it also establishes a current-item scope that makes the current item available to steps inside the Loop."],
              ["“If the record changes, every reference to it automatically changes.”", "Our experiment showed that references associated with different steps can expose different runtime states."],
              ["“aa.pipeline_results and ab.pipeline_results are two ways to ask for the current database value.”", "In this specimen, aa represented current-item data exposed by Search/Loop context while ab represented output from the later Update Record action."],
              ["“metadata.aa.loop.index is just Jinja's loop.index.”", "No. It is Quickbase Pipeline runtime metadata accessed with Jinja expression syntax. Jinja's own loop helper belongs to a Jinja for-loop."],
              ["“After End of loop, aa should mean the last record.”", "The documented current-item name is scoped to the Loop body. It does not become a permanent last-item variable outside the Loop."],
            ].map(([myth, correction]) => (
              <div key={myth} className="grid gap-3 rounded-2xl border border-slate-200 p-6 md:grid-cols-[0.9fr_1.5fr]">
                <p className="font-extrabold text-slate-950">{myth}</p>
                <p className="leading-7 text-slate-700">{correction}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Final mental model" title="Reason about what exists here">
            <p>
              The advanced habit is no longer merely “Which field do I need?” Before using a runtime reference, identify where you are in execution and which reference owns the state you want.
            </p>
          </SectionHeading>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mx-auto max-w-2xl">
              {[
                ["SEARCH RECORDS", "Creates the collection"],
                ["ENTER LOOP", "Current item becomes available as aa"],
                ["aa", "Earlier/current-item state"],
                ["ab", "Action executes and exposes newer output"],
                ["ac", "Can reference aa + ab + metadata.aa.loop.index"],
                ["END LOOP", "Current-item aa scope ends"],
              ].map(([title, text], index, all) => (
                <div key={title}>
                  <div className={`rounded-xl border p-5 ${title === "ac" ? "border-[#276749] bg-[#f0fff4]" : "border-slate-200 bg-white"}`}>
                    <p className="font-extrabold text-[#17452a]">{title}</p>
                    <p className="mt-1 leading-6 text-slate-700">{text}</p>
                  </div>
                  {index < all.length - 1 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {[
              ["Runtime scope", "determines which references exist at this point."],
              ["Step references", "determine which execution state you are reading."],
              ["Metadata", "describes the execution rather than the business record itself."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-5">
                <p className="font-extrabold text-[#17452a]">{title}</p>
                <p className="mt-2 leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl bg-slate-950 p-7 text-white">
            <p className="text-2xl font-extrabold">Quickbase creates the runtime world. Jinja lets us reach into it.</p>
            <p className="mt-3 leading-7 text-slate-300">
              Jinja is not the Pipeline orchestration engine. Quickbase Pipelines perform the orchestration; Jinja gives supported fields a concise way to evaluate values Quickbase has made available in the current runtime context.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Lesson outcome" title="From building Pipelines to reasoning about them">
            <p>The goal is not to memorize another syntax trick. It is to recognize the execution model visible beneath the low-code surface.</p>
          </SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Explain runtime scope in a Quickbase Pipeline.",
              "Explain how a Loop establishes a temporary current-item reference.",
              "Explain why aa and ab can expose different states of the same record.",
              "Distinguish business data, step output, and runtime metadata.",
              "Distinguish Quickbase Pipeline Loop metadata from Jinja's own Loop helper.",
              "Explain what becomes unavailable at End of loop.",
              "Describe the documented nested-Loop visibility rule.",
              "Explain what Quickbase's low-code Loop interface abstracts for the builder.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4">
                <LuBadgeCheck className="mt-1 h-5 w-5 shrink-0 text-[#276749]" />
                <p className="leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quiz" className="scroll-mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <SectionHeading eyebrow="Knowledge check" title="Can you reason about the runtime?">
            <p>These questions focus on what a later step can actually see and why—not simple vocabulary recall.</p>
          </SectionHeading>
          <div className="space-y-7">
            {quiz.map((item, qIndex) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-extrabold">{qIndex + 1}. {item.q}</p>
                <div className="mt-4 space-y-2">
                  {item.choices.map((choice, cIndex) => {
                    const selected = answers[qIndex] === cIndex;
                    const correct = item.answer === cIndex;
                    const showCorrect = checked && correct;
                    const showWrong = checked && selected && !correct;
                    return (
                      <button
                        type="button"
                        key={`${qIndex}-${cIndex}`}
                        onClick={() => {
                          setAnswers((prev) => ({ ...prev, [qIndex]: cIndex }));
                          setChecked(false);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                          showCorrect ? "border-emerald-400 bg-emerald-50" :
                          showWrong ? "border-red-300 bg-red-50" :
                          selected ? "border-[#276749] bg-[#f0fff4]" :
                          "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                          selected ? "border-[#276749] bg-[#276749] text-white" : "border-slate-300"
                        }`}>
                          {String.fromCharCode(65 + cIndex)}
                        </span>
                        <span className="leading-6">{choice}</span>
                      </button>
                    );
                  })}
                </div>
                {checked && (
                  <div className="mt-4 rounded-lg bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                    <strong>Why:</strong> {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => setChecked(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-extrabold text-white hover:bg-[#205c38]">
              <LuCircleCheck className="h-5 w-5" /> Check answers
            </button>
            <button type="button" onClick={() => { setAnswers({}); setChecked(false); }} className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 hover:bg-slate-100">
              Reset quiz
            </button>
            {checked && <p className="font-extrabold text-[#17452a]">Score: {score} / {quiz.length}</p>}
          </div>
        </section>

        <section className="mt-16 border-t border-slate-200 pt-12">
          <SectionHeading eyebrow="Next" title="Lesson 16 — Explicit Runtime References with Jinja">
            <p>
              Jinja has appeared here mainly as syntax for retrieving values such as <Code>aa.pipeline_results</Code> and <Code>metadata.aa.loop.index</Code>. Lesson 15 established where those values come from and why they are available. Lesson 16 can now focus on deliberately using Jinja to work with that runtime context.
            </p>
          </SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["13", "How does a Loop process items?"],
              ["14", "How is the list constructed?"],
              ["15", "What is in scope while an item is processed?"],
              ["16", "How can Jinja deliberately use those references?"],
            ].map(([lesson, text]) => (
              <div key={lesson} className={`rounded-xl border p-4 ${lesson === "15" ? "border-[#276749] bg-[#f0fff4]" : "border-slate-200"}`}>
                <p className="text-sm font-extrabold uppercase tracking-wide text-[#276749]">Lesson {lesson}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/lessons/14" className="rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749] hover:bg-[#f0fff4]">← Lesson 14</Link>
            <Link href="/lessons/16" className="rounded-lg bg-[#276749] px-5 py-3 font-bold text-white hover:bg-[#205c38]">Continue to Lesson 16 →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
