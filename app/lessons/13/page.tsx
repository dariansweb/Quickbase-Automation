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
  LuGitBranch,
  LuLightbulb,
  LuList,
  LuPlay,
  LuRefreshCw,
  LuRepeat2,
  LuRoute,
  LuSearch,
  LuSettings2,
  LuTable2,
  LuTarget,
  LuTriangleAlert,
  LuWorkflow,
  LuX,
  LuZap,
} from "react-icons/lu";

type EvidenceType = "DOCUMENTED" | "OBSERVED" | "INFERRED" | "SPECULATIVE";
type TFQuestion = { id: number; statement: string; answer: boolean; explanation: string };

const quizQuestions: TFQuestion[] = [
  { id: 1, statement: "Search Records returns only one record at a time.", answer: false, explanation: "Quickbase explicitly describes Search Records as generating a list, and our Activity evidence showed multiple records returned in one run." },
  { id: 2, statement: "A Search Records filter determines which records become members of the returned list.", answer: true, explanation: "The filter controls query membership. It answers which records qualify to be returned by Search Records." },
  { id: 3, statement: "A Loop creates five different Update Record steps if five records are returned.", answer: false, explanation: "There is one Update Record definition inside the Loop. That same step can execute once for each Loop Target Item." },
  { id: 4, statement: "The Loop Target Item represents the item currently being processed.", answer: true, explanation: "Activity used the label Loop Target Item for the individual list member currently moving through the Loop." },
  { id: 5, statement: "A Search filter and a Condition inside a Loop perform the same job.", answer: false, explanation: "The Search filter decides which records enter the list. The Condition decides which path the current Loop item takes." },
  { id: 6, statement: "Every record returned by the Search must follow the same branch.", answer: false, explanation: "Each current item evaluates the Condition using its own runtime data, so different records in the same list can take different branches." },
  { id: 7, statement: "In our controlled experiment, five records followed the true branch and eight followed the false branch.", answer: true, explanation: "All 13 records entered the Search list because they were Open. Five had Assigned To populated and eight had it blank." },
  { id: 8, statement: "A later action in the same Loop iteration can overwrite a value written earlier in that iteration.", answer: true, explanation: "We observed a later branch action replace the earlier Pipeline Results value." },
  { id: 9, statement: "The exact Ref ID letters are guaranteed to remain perfectly sequential.", answer: false, explanation: "Deleted and recreated steps can leave gaps. Ref IDs identify steps but do not need to form a neat aa, ab, ac sequence." },
  { id: 10, statement: "A manually run Query-based Pipeline necessarily has the same ON/OFF toggle behavior as an event-triggered Pipeline.", answer: false, explanation: "Our Query-based Lesson 13 Pipeline used the Run control and did not expose the same trigger ON/OFF behavior seen in earlier event-driven Pipelines." },
];

function SectionHeading({ eyebrow, title, icon, children }: { eyebrow?: string; title: string; icon?: ReactNode; children?: ReactNode }) {
  return <div className="mb-6">
    {eyebrow && <p className="mb-2 font-bold uppercase tracking-[0.12em] text-[#276749]">{eyebrow}</p>}
    <div className="flex items-start gap-4">
      {icon && <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4ea] text-2xl text-[#276749]">{icon}</span>}
      <div>
        <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">{title}</h2>
        {children && <div className="mt-4 max-w-4xl text-lg leading-8">{children}</div>}
      </div>
    </div>
  </div>;
}

function ConceptCard({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9fc9ad] hover:shadow-md">
    <div className="flex items-start gap-4">
      {icon && <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0fff4] text-xl text-[#276749]">{icon}</span>}
      <h3 className="pt-1 text-xl font-bold text-[#205c38]">{title}</h3>
    </div>
    <div className="mt-4 leading-8">{children}</div>
  </div>;
}

function Remember({ title, children }: { title: string; children: ReactNode }) {
  return <div className="my-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xl text-[#7a5200] shadow-sm"><LuLightbulb /></span>
      <div>
        <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">Remember This</p>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
      </div>
    </div>
    <div className="mt-4 leading-8">{children}</div>
  </div>;
}

function EvidenceBadge({ type }: { type: EvidenceType }) {
  const styles: Record<EvidenceType,string> = {
    DOCUMENTED: "border-blue-300 bg-blue-50 text-blue-800",
    OBSERVED: "border-[#9fc9ad] bg-[#f0fff4] text-[#205c38]",
    INFERRED: "border-amber-300 bg-amber-50 text-amber-800",
    SPECULATIVE: "border-violet-300 bg-violet-50 text-violet-800",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${styles[type]}`}>{type}</span>;
}

function FlowArrow(){ return <div className="flex h-9 items-center justify-center"><LuArrowDown className="text-xl text-[#276749]/60" /></div>; }
function FlowStep({ icon, title, text, final=false }: { icon:ReactNode; title:string; text?:string; final?:boolean }) {
  return <div className={`w-full rounded-xl border p-4 shadow-sm ${final ? "border-[#276749] bg-[#276749] text-white" : "border-[#b7d8c2] bg-white"}`}>
    <div className="flex items-start gap-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${final ? "bg-white/15 text-white" : "bg-[#f0fff4] text-[#276749]"}`}>{icon}</span>
      <div><h4 className={`font-bold ${final ? "text-white" : "text-[#205c38]"}`}>{title}</h4>{text && <p className={`mt-1 text-sm leading-6 ${final ? "text-white/85" : "text-gray-600"}`}>{text}</p>}</div>
    </div>
  </div>;
}

function CodeBlock({ title, children }: { title?: string; children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 text-gray-100 shadow-sm">
    {title && <div className="border-b border-gray-700 bg-gray-900 px-4 py-3 text-sm font-bold text-gray-300">{title}</div>}
    <pre className="overflow-x-auto p-5 text-sm leading-7"><code>{children}</code></pre>
  </div>;
}

function MistakeCard({ title, wrong, correction }: { title:string; wrong:ReactNode; correction:ReactNode }) {
  return <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
    <div className="border-b border-gray-200 bg-red-50 p-5">
      <p className="font-bold uppercase tracking-[0.12em] text-red-700">Common First-Timer Confusion</p>
      <h3 className="mt-2 text-xl font-bold text-[#205c38]">{title}</h3>
    </div>
    <div className="grid md:grid-cols-2">
      <div className="border-b border-gray-200 p-5 md:border-b-0 md:border-r"><p className="font-bold text-red-700">What goes wrong</p><div className="mt-3 leading-7">{wrong}</div></div>
      <div className="bg-[#f0fff4] p-5"><p className="font-bold text-[#276749]">Better model</p><div className="mt-3 leading-7">{correction}</div></div>
    </div>
  </div>;
}

function LessonQuiz(){
  const [answers,setAnswers]=useState<Record<number,boolean>>({});
  const [showResults,setShowResults]=useState(false);
  const complete=Object.keys(answers).length===quizQuestions.length;
  const score=useMemo(()=>quizQuestions.reduce((t,q)=>t+(answers[q.id]===q.answer?1:0),0),[answers]);
  return <section id="quiz" className="scroll-mt-8 pt-4">
    <div className="overflow-hidden rounded-3xl border-2 border-[#276749] bg-[#f0fff4]">
      <div className="bg-[#205c38] p-7 text-white sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="font-bold uppercase tracking-[0.15em] text-white/75">Lesson 13 Quiz</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Search, Loop, Condition, or Action?</h2><p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">Test whether you can separate list membership, current-item context, branching, and work.</p></div>
          <div className="rounded-xl bg-white/10 px-5 py-4 text-center"><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Progress</p><p className="mt-1 text-2xl font-extrabold">{Object.keys(answers).length}/{quizQuestions.length}</p></div>
        </div>
      </div>
      <div className="space-y-6 p-6 sm:p-8">
        {quizQuestions.map((q,index)=>{
          const selected=answers[q.id]; const correct=selected===q.answer;
          return <div key={q.id} className="rounded-2xl border border-[#9fc9ad] bg-white p-6">
            <div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#276749] font-extrabold text-white">{index+1}</span><p className="text-lg font-semibold leading-8 text-[#205c38]">{q.statement}</p></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{[true,false].map(choice=>{
              const chosen=selected===choice; const isAnswer=q.answer===choice;
              let cls="border-gray-300 bg-white hover:border-[#9fc9ad]";
              if(chosen&&!showResults) cls="border-[#276749] bg-[#f0fff4]";
              if(showResults&&isAnswer) cls="border-[#276749] bg-[#f0fff4]";
              if(showResults&&chosen&&!isAnswer) cls="border-red-300 bg-red-50";
              return <button key={String(choice)} type="button" disabled={showResults} onClick={()=>setAnswers(a=>({...a,[q.id]:choice}))} className={`rounded-xl border-2 p-4 text-left font-bold transition ${cls}`}>{choice?"TRUE":"FALSE"}</button>;
            })}</div>
            {showResults && <div className={`mt-5 rounded-xl border p-5 ${correct?"border-[#9fc9ad] bg-[#f0fff4]":"border-red-200 bg-red-50"}`}><div className="flex items-center gap-3">{correct?<LuBadgeCheck className="text-xl text-[#276749]"/>:<LuX className="text-xl text-red-700"/>}<p className="font-bold">{correct?"Correct.":"Revisit that responsibility."}</p></div><p className="mt-3 leading-7">{q.explanation}</p></div>}
          </div>;
        })}
        <div className="rounded-2xl border border-[#9fc9ad] bg-white p-6">
          {!showResults ? <><h3 className="text-xl font-bold text-[#205c38]">Ready to grade it?</h3><p className="mt-2 leading-7">Answer all ten questions first.</p><button type="button" disabled={!complete} onClick={()=>setShowResults(true)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#276749] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"><LuBadgeCheck/>Grade Lesson 13 Quiz</button></> : <div className="flex flex-wrap items-center justify-between gap-5"><div><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Final Score</p><p className="mt-2 text-4xl font-extrabold text-[#205c38]">{score} / 10</p><p className="mt-3 max-w-3xl leading-7">{score===10?"Loop Navigator — You are separating the four responsibilities cleanly.":score>=8?"Strong Model — Review any misses around Search filters vs Loop Conditions.":score>=6?"Getting There — Revisit list vs current item and source choice inside Conditions.":"Rebuild the Model — Search finds the list. Loop selects the current item. Condition selects the path. Action performs the work."}</p></div><button type="button" onClick={()=>{setAnswers({});setShowResults(false);}} className="inline-flex items-center gap-2 rounded-lg border-2 border-[#276749] px-5 py-3 font-bold text-[#276749]"><LuRefreshCw/>Retake Quiz</button></div>}
        </div>
      </div>
    </div>
  </section>;
}

export default function LessonThirteenPage(){
  return <main className="min-h-screen bg-white text-black">
    <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
      <div aria-hidden="true" className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"/>
      <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
        <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">Quickbase Automation Developer Lab · Lesson 13</p>
        <h1 className="max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl">Conditions and Loops</h1>
        <p className="mt-6 max-w-4xl text-xl leading-9 text-white">What happens when a Pipeline needs to find several records, process them one at a time, and make a different decision for each record?</p>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">Lesson 12 taught us how runtime values become available downstream. Lesson 13 adds a Query that can return several records and a Loop that can give each returned item its own decision path.</p>
        <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5"><p className="font-bold">The crucial question is not “How do I add a Condition?”</p><p className="mt-2 leading-7 text-white/90">It is: <strong>why isn&apos;t the Search filter enough anymore?</strong> If that boundary is unclear, Conditions and Loops feel like extra machinery instead of necessary workflow tools.</p></div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/lessons/12" className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white">← Previous Lesson</Link>
          <Link href="/lessons/14" className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white">Next Lesson →</Link>
          <Link href="/lessons" className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749]">Table of Contents</Link>
          <a href="#quiz" className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-5 py-3 font-bold text-white"><LuTarget/>Skip to Lesson 13 Quiz ↓</a>
        </div>
      </div>
    </header>

    <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
      <section className="mb-14">
        <SectionHeading eyebrow="Part 1" title="Trigger, Query, and Action — Three Different Jobs" icon={<LuWorkflow/>}><p>Before we add a Loop, separate the three jobs already present in Pipeline design.</p></SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          <ConceptCard title="Trigger" icon={<LuZap/>}><p className="font-bold text-[#205c38]">Something happened. Should this run begin?</p><p className="mt-3">Examples include Record Created, Record Updated, and Record Deleted.</p></ConceptCard>
          <ConceptCard title="Query" icon={<LuSearch/>}><p className="font-bold text-[#205c38]">Go find the records we need.</p><p className="mt-3">This lesson focuses on Quickbase → Search Records.</p></ConceptCard>
          <ConceptCard title="Action" icon={<LuSettings2/>}><p className="font-bold text-[#205c38]">Now do something with what we found.</p><p className="mt-3">Our main action remains Quickbase → Update Record.</p></ConceptCard>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 2–4" title="Why Filters Alone Stop Being Enough" icon={<LuGitBranch/>}><p>Filters are familiar. The new problem is what happens when we intentionally need every returned record, but different records require different work.</p></SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 bg-white p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Search Filter Question</p><p className="mt-3 text-2xl font-bold text-[#205c38]">Should this record be in my list?</p><div className="mt-5"><CodeBlock>{`Search Records
Filter: Status starts with Open`}</CodeBlock></div><p className="mt-4 leading-7">Records that fail the filter do not become members of the returned list.</p></div>
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Loop Condition Question</p><p className="mt-3 text-2xl font-bold text-[#205c38]">This record is already in my list. What should happen to it?</p><div className="mt-5"><CodeBlock>{`Current item
Assigned To has value?
  YES → Action A
  NO  → Action B`}</CodeBlock></div><p className="mt-4 leading-7">Both groups stay in the workflow because both groups need work—just different work.</p></div>
        </div>
        <Remember title="A Filter removes records from consideration. A Condition keeps the current record in the workflow and decides what should happen to it."><p>This is the reason Conditions become necessary. If the record still needs processing even when a test is false, filtering it away would solve the wrong problem.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 5" title="Create a Fresh Lesson 13 Pipeline" icon={<LuPlay/>}><p>Preserve earlier Activity and isolate the new experiments in a separate definition.</p></SectionHeading>
        <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Pipeline Name</p><p className="mt-2 text-2xl font-extrabold text-[#205c38]">Lesson 13 - Conditions and Loops</p><p className="mt-5 leading-8">Unlike our earlier event-driven Pipelines, this one begins with a Query and can be started manually with <strong>Run</strong>. We observed Run, Schedule, Activity, and Statistics controls rather than the same event-trigger ON/OFF experience.</p></div>
        <div className="mt-6 rounded-xl border border-gray-300 bg-white p-5"><EvidenceBadge type="OBSERVED"/><p className="mt-3 leading-7">Activity still displayed <strong>Pipeline triggered</strong> even for our manual run. The runtime metadata showed remote event fields with no value. We record that wording without inventing internal meaning.</p></div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 6–10" title="Search Records Gives Us a List — the Loop Gives Us the Current Item" icon={<LuList/>}><p>Quickbase&apos;s own UI gives us the vocabulary we need: Search Records “generates a list,” and the Loop processes “each item.”</p></SectionHeading>
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6">
          <FlowStep icon={<LuSearch/>} title="Search Records" text="Status starts with Open"/>
          <FlowArrow/>
          <FlowStep icon={<LuList/>} title="LIST OF MATCHING RECORDS" text="The Search result"/>
          <FlowArrow/>
          <FlowStep icon={<LuRepeat2/>} title="LOOP" text="For each item in: Search Records"/>
          <FlowArrow/>
          <FlowStep icon={<LuDatabase/>} title="CURRENT ITEM" text="One record for this iteration" final/>
        </div>
        <Remember title="The Search gives us the pile. The Loop picks up one record at a time."><p>The Search creates the list. The Loop does not create another mysterious set—it gives us an individual-record context for each item already in that list.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 7–9" title="Known-Good Search Records Configuration" icon={<LuSearch/>}><p>Keep the first Query intentionally simple so every later result is easy to explain.</p></SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ConceptCard title="App" icon={<LuDatabase/>}><p><strong>Automation</strong></p></ConceptCard>
          <ConceptCard title="Table" icon={<LuTable2/>}><p><strong>Tasks</strong></p></ConceptCard>
          <ConceptCard title="Filter" icon={<LuGitBranch/>}><p><strong>Status starts with Open</strong></p></ConceptCard>
          <ConceptCard title="Limit" icon={<LuList/>}><p><strong>Unlimited</strong></p></ConceptCard>
        </div>
        <div className="mt-6 rounded-xl border border-gray-300 bg-white p-5"><p className="font-bold text-[#205c38]">Fields for subsequent steps</p><p className="mt-2 leading-7">Due Date · Assigned To · Task Name · Status · Pipeline Results</p><p className="mt-3 leading-7">Pipeline Results was added later during research, but the final student setup should include it from the beginning.</p></div>
        <div className="mt-5"><EvidenceBadge type="OBSERVED"/></div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 9" title="Quickbase Automatically Created the Loop in Our Experiment" icon={<LuRepeat2/>}><p>When we added Search Records, Quickbase created a Loop with <strong>For each item in: Search Records</strong>.</p></SectionHeading>
        <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6"><p className="text-lg font-bold text-[#205c38]">Observed Loop language</p><div className="mt-4"><CodeBlock>{`For each item in: Search Records
Refer to each item as: aa`}</CodeBlock></div><p className="mt-4 leading-7">We keep this finding bounded to our Search Records experiment rather than claiming every Query always creates a Loop.</p></div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 11" title="Why Use a Loop Instead of Just Adding More Steps?" icon={<LuRoute/>}><p>The value of a Loop is not simply that it repeats. It gives us a stable individual-item context for each record in the list.</p></SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 bg-white p-6"><p className="font-bold uppercase tracking-[0.12em] text-red-700">Without Individual-Item Organization</p><div className="mt-4"><CodeBlock>{`aa — Search Records
↓
ab — Update Records
↓
ac — Update Records
↓
ad — Update Records`}</CodeBlock></div><p className="mt-4 leading-7">We can keep stacking operations against a result, but the business question “what does each record need?” stays muddy.</p></div>
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Loop-Oriented Design</p><div className="mt-4"><CodeBlock>{`aa — Search Records
      ↓
     LOOP
      ↓
 Current item
      ↓
 decision
      ↓
 action
      ↓
 next item`}</CodeBlock></div><p className="mt-4 leading-7">Now the workflow can inspect one record, make one or more decisions, perform one or more actions, then move to the next item.</p></div>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 12–16" title="First Loop Experiment — Prove One Action Can Run Many Times" icon={<LuRepeat2/>}><p>Before adding Conditions, prove the Loop itself with a literal update.</p></SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          <ConceptCard title="Inside Do" icon={<LuSettings2/>}><p>Quickbase → Update Record</p></ConceptCard>
          <ConceptCard title="Destination" icon={<LuDatabase/>}><p>Pipeline Results</p></ConceptCard>
          <ConceptCard title="Literal Test Value" icon={<LuCheck/>}><p><strong>Processed by Lesson 13 Loop</strong></p></ConceptCard>
        </div>
        <div className="mt-8 rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Runtime Proof</p><p className="mt-2 text-2xl font-extrabold text-[#205c38]">Found 5 Records of Tasks type</p><p className="mt-4 leading-8">Activity reported five returned records, and Metadata reported <code>batch.size: 5</code>.</p><div className="mt-5"><CodeBlock>{`Loop Target Item
Updated Record

Loop Target Item
Updated Record

Loop Target Item
Updated Record

Loop Target Item
Updated Record

Loop Target Item
Updated Record`}</CodeBlock></div></div>
        <Remember title="One action inside a Loop can execute many times during a single Pipeline run."><p>There was one Update Record step in the definition, but Activity showed it execute once for each Loop Target Item.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 15–17" title="Loop Target Item, Loop Metadata, and Ref IDs" icon={<LuDatabase/>}><p>Activity gives us runtime language that helps separate definition from execution.</p></SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          <ConceptCard title="Loop Target Item" icon={<LuTarget/>}><p>The individual member currently being processed from the Search list.</p></ConceptCard>
          <ConceptCard title="Loop Metadata" icon={<LuList/>}><p><code>batch.size: 5</code><br/><code>loop.index: 4</code> on the final item. That is consistent with zero-based indexing in this specimen.</p></ConceptCard>
          <ConceptCard title="Ref IDs" icon={<LuWorkflow/>}><p>Deleted and recreated steps caused IDs such as ad, af, am, and an. Gaps are not evidence of missing runtime work.</p></ConceptCard>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 18–19" title="Now Add a Condition Inside the Loop" icon={<LuGitBranch/>}><p>A Condition evaluates the current item&apos;s available runtime information and sends that item down the appropriate branch.</p></SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConceptCard title="Search Filter" icon={<LuSearch/>}><p className="text-xl font-bold text-[#205c38]">Which records enter the list?</p><p className="mt-3">Example: Status starts with Open.</p></ConceptCard>
          <ConceptCard title="Loop Condition" icon={<LuGitBranch/>}><p className="text-xl font-bold text-[#205c38]">For this current item, which path should it take?</p><p className="mt-3">Example: Assigned To has value.</p></ConceptCard>
        </div>
        <Remember title="The Search filter decides who gets into the room. The Loop Condition decides what happens to each person once they are inside."><p>That analogy is the shortest way to remember the boundary.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 20–22" title="The Reference Can Be Technically Available and Still Be the Wrong Teaching Choice" icon={<LuTriangleAlert/>}><p>The first confusing design evaluated an Update Record output rather than the original Search Records current item.</p></SectionHeading>
        <MistakeCard title="Should the first Condition point to Search Records or Update Record?" wrong={<><p>We built:</p><div className="mt-3"><CodeBlock>{`Search Records
↓
Loop
↓
Update Record
↓
Condition referencing Update Record`}</CodeBlock></div><p className="mt-3">Now we had to ask whether we were testing the original searched record or the result of the update action.</p></>} correction={<><p>For the foundational experiment, evaluate the current searched item directly:</p><div className="mt-3"><CodeBlock>{`Search Records
↓
Loop
↓
Condition: Search Records → Assigned To → has value
↙                           ↘
YES                         NO`}</CodeBlock></div><p className="mt-3">Referencing Update Record was not inherently invalid. It was unnecessarily indirect for the business question we were trying to teach.</p></>}/>
        <Remember title="Pipeline design is not only about whether Quickbase allows a reference."><p>The reference should represent the business question you are actually asking.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 23–25" title="Clean Controlled Experiment — 13 Records, Two Branches" icon={<LuBadgeCheck/>}><p>Remove the research chaos and create two obvious populations before pressing Run.</p></SectionHeading>
        <div className="rounded-2xl border border-gray-300 bg-white p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Before the Run</p><ol className="mt-4 list-decimal space-y-3 pl-6 leading-7"><li>Set every Task to <strong>Status = Open</strong>.</li><li>Clear Pipeline Results for all records.</li><li>Leave Assigned To populated on five records.</li><li>Leave Assigned To blank on eight records.</li></ol></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">Assigned To Has Value — 5</p><p className="mt-3 leading-7">#17 · #18 · #19 · #21 · #22</p><p className="mt-4 font-bold">Expected branch result: Loop condition met</p></div>
          <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6"><p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">Assigned To Blank — 8</p><p className="mt-3 leading-7">#23 · #24 · #25 · #26 · #27 · #28 · #29 · #30</p><p className="mt-4 font-bold">Expected branch result: Loop condition is not met</p></div>
        </div>
        <Remember title="Predict before you Run"><p><strong>Search = 13 · TRUE branch = 5 · FALSE branch = 8.</strong> If the evidence does not match those numbers, something in our configuration or mental model needs investigation.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 24" title="Final Branch Actions" icon={<LuSettings2/>}><p>Both branches update the current searched Task. Only the value written to Pipeline Results differs.</p></SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConceptCard title="If condition is met" icon={<LuCheck/>}><p><strong>Update Record am</strong></p><p className="mt-3">Target: Search Records — Tasks</p><p className="mt-3">Pipeline Results: <strong>Loop condition met</strong></p></ConceptCard>
          <ConceptCard title="If condition is not met" icon={<LuX/>}><p><strong>Update Record an</strong></p><p className="mt-3">Target: Search Records — Tasks</p><p className="mt-3">Pipeline Results: <strong>Loop condition is not met</strong></p></ConceptCard>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 25" title="Final Result — One List, Thirteen Decisions, Two Paths" icon={<LuGitBranch/>}><p>The clean CSV matched the prediction exactly.</p></SectionHeading>
        <div className="rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8"><div className="mx-auto max-w-2xl"><FlowStep icon={<LuSearch/>} title="13 Open Tasks" text="All entered the Search list"/><FlowArrow/><FlowStep icon={<LuRepeat2/>} title="One Loop Definition" text="Processes each current item"/><FlowArrow/><FlowStep icon={<LuGitBranch/>} title="13 Individual Evaluations" text="Assigned To has value?"/><FlowArrow/><div className="grid gap-4 md:grid-cols-2"><FlowStep icon={<LuCheck/>} title="5 → TRUE" text="Loop condition met" final/><FlowStep icon={<LuX/>} title="8 → FALSE" text="Loop condition is not met" final/></div></div></div>
        <Remember title="The branch belongs to the current item, not to the entire Search result."><p>The same Loop processed all 13 records, but each individual item followed the branch appropriate to its own data.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 26–28" title="The Final Runtime Mental Model" icon={<LuWorkflow/>}><p>Keep four responsibilities separate and the Loop stops looking mysterious.</p></SectionHeading>
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
          <FlowStep icon={<LuSearch/>} title="SEARCH" text="Who gets into the list?"/>
          <FlowArrow/>
          <FlowStep icon={<LuList/>} title="LIST" text="13 matching records"/>
          <FlowArrow/>
          <FlowStep icon={<LuRepeat2/>} title="LOOP" text="Which item are we working with right now?"/>
          <FlowArrow/>
          <FlowStep icon={<LuGitBranch/>} title="CONDITION" text="Which path should this current item take?"/>
          <FlowArrow/>
          <FlowStep icon={<LuSettings2/>} title="ACTION" text="What work should happen on that path?" final/>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
          ["SEARCH","Determines membership."],["LOOP","Determines the current item."],["CONDITION","Determines the path."],["ACTION","Determines what happens."],
        ].map(([a,b])=><div key={a} className="rounded-xl border border-[#9fc9ad] bg-white p-5 text-center"><p className="font-bold uppercase tracking-[0.12em] text-[#276749]">{a}</p><p className="mt-2 font-bold text-[#205c38]">{b}</p></div>)}</div>
        <Remember title="A Loop is not merely “repeat this action.”"><p>It creates a controlled process for each item returned by the Query. One iteration can eventually contain an entire mini-workflow before the Loop advances to the next item.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Parts 29–31" title="Terminology, Overwrites, and Activity Evidence" icon={<LuBookOpen/>}><p>Precise language and runtime evidence keep us from inventing what happened.</p></SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConceptCard title="Use Quickbase's words" icon={<LuList/>}><p>Prefer <strong>list</strong>, <strong>item</strong>, and <strong>Loop Target Item</strong> rather than inventing “static set” and “dynamic set.”</p></ConceptCard>
          <ConceptCard title="Later actions can overwrite earlier ones" icon={<LuRefreshCw/>}><p>We observed an earlier literal Pipeline Results value replaced by a later condition-branch value during the same iteration.</p></ConceptCard>
        </div>
        <Remember title="The table tells us the final state. Activity tells us how the Pipeline got there."><p>As learned in Lesson 11, Activity can prove Search count, batch size, Loop Target Items, repeated action executions, record IDs, branch outcomes, loop index, and runtime duration.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 32" title="Common First-Timer Confusions" icon={<LuCircleHelp/>}><p>These are worth teaching because we ran into several of them ourselves.</p></SectionHeading>
        <div className="space-y-6">
          <MistakeCard title="Search returned several records. Why can't I think of them as one record?" wrong={<p>That erases the distinction between the whole list and the individual item currently being processed.</p>} correction={<p>The Search result is a <strong>list</strong>. The Loop provides a <strong>current item</strong> from that list.</p>}/>
          <MistakeCard title="Does the Loop return a new set?" wrong={<p>That makes it sound like the Loop performs another Query.</p>} correction={<p>The Search creates the list. The Loop processes each item already in that list.</p>}/>
          <MistakeCard title="Should my first Condition point to Search Records or Update Record?" wrong={<p>Pointing to Update Record introduced an unnecessary extra layer for our first experiment.</p>} correction={<p>For this lesson, point directly to the original Search Records current item.</p>}/>
          <MistakeCard title="Does a Filter update records?" wrong={<p>A filter only determines what qualifies.</p>} correction={<p>Actions perform updates. Filters and Conditions make qualification or path decisions.</p>}/>
          <MistakeCard title="Does one Update Record inside a Loop run only once?" wrong={<p>That confuses one step definition with one runtime execution.</p>} correction={<p>One definition can execute once for every Loop Target Item.</p>}/>
          <MistakeCard title="Do I need to turn this Pipeline ON?" wrong={<p>Importing the event-trigger habit without looking at the current Pipeline type.</p>} correction={<p>Our manually run Query-based Pipeline used <strong>Run</strong>. Check the controls actually presented by the Pipeline you built.</p>}/>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 33" title="Evidence Classification" icon={<LuBookOpen/>}><p>Keep the research boundary visible.</p></SectionHeading>
        <div className="space-y-5">
          <div className="rounded-2xl border border-blue-300 bg-blue-50 p-6"><EvidenceBadge type="DOCUMENTED"/><ul className="mt-4 space-y-2 leading-7"><li>Search Records “generates a list.”</li><li>Each item can be processed with a Loop, batch action, or Jinja.</li><li>Loop uses “For each item in.”</li><li>Search Records supports filtering and Fields for subsequent steps.</li><li>System-generated fields are included automatically according to the UI/help encountered.</li></ul></div>
          <div className="rounded-2xl border border-[#9fc9ad] bg-[#f0fff4] p-6"><EvidenceBadge type="OBSERVED"/><ul className="mt-4 space-y-2 leading-7"><li>Search Records automatically created a Loop in our experiment.</li><li>The first clean run returned five records and batch.size = 5.</li><li>Activity produced five Loop Target Items and one Update Record definition executed five times.</li><li>A Condition could reference earlier-step fields.</li><li>Search Records and Update Record exposed downstream data differently.</li><li>Directly referencing Search Records made the foundational condition model clearer.</li><li>All 13 Open records entered the list; five took TRUE and eight took FALSE.</li><li>The manual Query Pipeline used Run instead of the earlier trigger toggle pattern.</li></ul></div>
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6"><EvidenceBadge type="INFERRED"/><p className="mt-4 leading-8">Our teaching model: the Loop creates an individual-item processing context over the list returned by Search Records. This is strongly supported by “For each item in,” Loop Target Item, repeated actions, and branch-specific outcomes.</p></div>
          <div className="rounded-2xl border border-violet-300 bg-violet-50 p-6"><EvidenceBadge type="SPECULATIVE"/><p className="mt-4 leading-8">Do not invent internal memory/storage mechanics, internal loop-engine details, parallelism beyond what Activity proves, undocumented $prev behavior, or reasons for UI behavior we did not test.</p></div>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 34" title="Lesson Boundary" icon={<LuTriangleAlert/>}><p>Lesson 13 is intentionally enough.</p></SectionHeading>
        <div className="rounded-2xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6"><p className="text-xl font-bold text-[#7a5200]">Not yet:</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{["Nested loops","Advanced Jinja","$prev","Loop variable scoping","Bulk actions","Deduplication","Batching","Linked Items","Loop performance tuning","Error handling inside loops","Complex multi-service orchestration"].map(x=><div key={x} className="rounded-lg border border-[#e5c56c] bg-white p-3 font-semibold">{x}</div>)}</div></div>
        <Remember title="Lesson 13 is Search → List → Loop → Current Item → Condition → Branch → Action"><p>That is enough foundation for later Pipeline work to make sense.</p></Remember>
      </section>

      <section className="mb-14">
        <SectionHeading eyebrow="Part 35" title="Key Takeaways" icon={<LuCheck/>}><p>Keep the responsibilities crisp.</p></SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">{[
          "Trigger, Query, and Action steps solve different problems.",
          "Search Records is a Query that can return a list.",
          "A Loop processes each item from that list.",
          "Activity identifies the current item as a Loop Target Item.",
          "One action inside a Loop can execute many times in one run.",
          "A Search filter decides which records enter the list.",
          "A Condition inside the Loop decides what path each current item takes.",
          "Different items in the same list can take different branches.",
          "The cleanest first-loop design evaluates the original Search Records current item directly.",
          "Later actions can overwrite earlier changes during the same iteration.",
          "Activity shows the execution story; the table usually shows the final state.",
        ].map(item=><div key={item} className="flex items-start gap-3 rounded-xl border border-[#9fc9ad] bg-[#f0fff4] p-5"><LuCheck className="mt-1 shrink-0 text-xl text-[#276749]"/><p className="font-semibold leading-7">{item}</p></div>)}</div>
      </section>

      <LessonQuiz/>

      <section className="mt-14">
        <div className="overflow-hidden rounded-3xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-8 text-center sm:p-12">
            <p className="font-bold uppercase tracking-[0.18em] text-white/70">Lesson 13 Complete</p>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">Four Responsibilities. One Repeatable Pattern.</h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">{[
              ["SEARCH","finds the list"],["LOOP","chooses the current item"],["CONDITION","chooses the path"],["ACTION","performs the work"],
            ].map(([a,b])=><div key={a} className="rounded-xl border border-white/20 bg-white/10 p-5"><p className="font-extrabold">{a}</p><p className="mt-2 text-white/85">{b}</p></div>)}</div>
            <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/90">What looked chaotic during experimentation becomes predictable once list membership, current-item context, branching, and actions stop being blended together.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/lessons/14" className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38]">Continue to Lesson 14 →</Link><Link href="/lessons" className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white">View All Lessons</Link></div>
          </div>
        </div>
      </section>
    </article>
  </main>;
}
