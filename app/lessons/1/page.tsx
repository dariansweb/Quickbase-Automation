import Link from "next/link";

/* ============================================================
   REUSABLE LESSON COMPONENTS
   ============================================================ */

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
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 font-bold uppercase tracking-[0.12em] text-[#276749]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold text-[#205c38] sm:text-4xl">{title}</h2>

      {children && (
        <div className="mt-4 max-w-4xl text-lg leading-8">{children}</div>
      )}
    </div>
  );
}

function ConceptCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#205c38]">{title}</h3>

      <div className="mt-4 leading-8">{children}</div>
    </div>
  );
}

function VocabularyCard({
  term,
  subtitle,
  children,
}: {
  term: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-bold text-[#205c38]">{term}</h3>

        {subtitle && (
          <span className="rounded-full bg-[#e6f4ea] px-3 py-1 text-sm font-bold text-[#276749]">
            {subtitle}
          </span>
        )}
      </div>

      <div className="mt-4 leading-8 text-gray-800">{children}</div>
    </div>
  );
}

function MentalModel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border-2 border-[#276749] bg-[#f0fff4]">
      {title && (
        <div className="border-b border-[#9fc9ad] bg-[#e6f4ea] px-6 py-4">
          <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
            Mental Model
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#205c38]">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto p-6">
        <pre className="min-w-max font-mono text-[15px] leading-8 sm:text-base">
          {children}
        </pre>
      </div>
    </div>
  );
}

function Remember({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-xl border-2 border-[#d4a72c] bg-[#fffaf0] p-6">
      <p className="font-bold uppercase tracking-[0.12em] text-[#7a5200]">
        Remember This
      </p>

      <h3 className="mt-2 text-xl font-bold">{title}</h3>

      <div className="mt-3 leading-8">{children}</div>
    </div>
  );
}

function QuestionCard({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-[#9fc9ad] bg-[#f0fff4] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#276749]">
        Central Question
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#205c38] sm:text-3xl">
        {question}
      </h2>

      <div className="mt-4 max-w-4xl text-lg leading-8">{children}</div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function LessonOnePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* ======================================================
          FULL-WIDTH LESSON HEADER
      ====================================================== */}

      <header className="relative overflow-hidden border-b border-[#17452a] bg-[#276749] text-white">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
          <p className="mb-3 font-bold uppercase tracking-[0.18em] text-white/80">
            Quickbase Automation Developer Lab
          </p>

          <p className="mb-2 text-lg font-semibold text-white/90">
            Lesson 1
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
            The Automation Landscape
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-9 text-white">
            Before configuring notifications, reminders, subscriptions, Custom
            Emails, or Pipelines, we need a vocabulary for describing what
            Quickbase automation is actually doing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/lessons"
              className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#276749] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
            >
              Table of Contents
            </Link>

            <Link
              href="/lessons/2"
              className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#276749]"
            >
              Next Lesson →
            </Link>
          </div>
        </div>
      </header>

      {/* ======================================================
          CONSTRAINED LESSON CONTENT
      ====================================================== */}

      <article className="mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-8">
        {/* Central Question */}

        <section className="mb-14">
          <QuestionCard question="What does “automation” actually mean inside Quickbase?">
            <p>
              It is tempting to treat every automatic behavior as the same
              thing. Something happens, Quickbase reacts, and therefore it must
              all be “automation.”
            </p>

            <p className="mt-4">
              But Quickbase contains several mechanisms that react to different
              kinds of events, operate at different times, communicate in
              different ways, and have very different capabilities.
            </p>

            <p className="mt-4">
              Before we build anything, we need to know which kind of mechanism
              we are looking at.
            </p>
          </QuestionCard>
        </section>

        <section className="mb-14">
          <SectionHeading
            eyebrow="Course Premise"
            title="Start With the Event, Not the Button"
          >
            <p>
              This course will not begin by memorizing where Quickbase places
              automation controls in its interface.
            </p>

            <p className="mt-4">
              Instead, every automation problem begins with three more
              fundamental questions.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="1. What happened?">
              <p>
                Did a record change? Did a date arrive? Did a schedule run? Did
                something external occur?
              </p>
            </ConceptCard>

            <ConceptCard title="2. What does Quickbase know?">
              <p>
                Does Quickbase know merely that a record changed, which field
                changed, the record&apos;s current state, or something about its
                previous state?
              </p>
            </ConceptCard>

            <ConceptCard title="3. What should happen next?">
              <p>
                Should someone receive information, should another record
                change, should data be queried, or should an entire workflow
                execute?
              </p>
            </ConceptCard>
          </div>

          <MentalModel title="The progression of the course">
            {`INFORMATION
    ↓
COMMUNICATION
    ↓
EVENTS
    ↓
TIME
    ↓
CONDITIONS
    ↓
STATE CHANGES
    ↓
WORKFLOW
    ↓
PIPELINES`}
          </MentalModel>

          <p className="max-w-4xl text-lg leading-8">
            By the time Pipelines appears later in the lab, it should not feel
            like an unrelated advanced feature. It should feel like the natural
            continuation of concepts we have already been using.
          </p>
        </section>

        {/* ======================================================
            VOCABULARY
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Vocabulary"
            title="The Main Automation Terms You Will Encounter"
          >
            <p>
              Quickbase automation terminology has evolved over time. Some
              mechanisms are older, some are newer, and some overlap in
              capability. For now, our goal is not to memorize every option.
            </p>

            <p className="mt-4">
              We only want to establish a useful first-pass definition for each
              term.
            </p>
          </SectionHeading>

          <div className="grid gap-5 lg:grid-cols-2">
            <VocabularyCard term="Alerts" subtitle="Platform communication">
              <p>
                Alerts are Quickbase-generated communications associated with
                the platform or application environment.
              </p>

              <p className="mt-3">
                They are conceptually different from builder-created workflow
                emails that react to your application&apos;s records.
              </p>
            </VocabularyCard>

            <VocabularyCard term="Notifications" subtitle="Legacy">
              <p>
                Notifications are legacy event-driven automatic emails that
                respond to record activity.
              </p>

              <p className="mt-3">
                A record may be added, modified, or deleted, and a Notification
                can react to that event.
              </p>
            </VocabularyCard>

            <VocabularyCard term="Reminders" subtitle="Legacy">
              <p>
                Reminders are legacy automatic emails driven primarily by dates
                stored in Quickbase records.
              </p>

              <p className="mt-3">
                Their defining characteristic is that time can cause the
                communication even when nobody edits the record.
              </p>
            </VocabularyCard>

            <VocabularyCard term="Subscriptions" subtitle="Report delivery">
              <p>
                Subscriptions deliver report information according to a
                schedule.
              </p>

              <p className="mt-3">
                Instead of asking what changed on one record, a Subscription
                asks what information a report should deliver and when it should
                be delivered.
              </p>
            </VocabularyCard>

            <VocabularyCard term="Custom Emails" subtitle="Modern">
              <p>
                Custom Emails are the newer Quickbase automatic-email system.
              </p>

              <p className="mt-3">
                They bring several record-change and scheduled communication
                capabilities into one contemporary configuration system.
              </p>
            </VocabularyCard>

            <VocabularyCard term="Pipelines" subtitle="Workflow automation">
              <p>Pipelines go beyond merely communicating information.</p>

              <p className="mt-3">
                A Pipeline can perform sequences of operations such as querying
                records, evaluating conditions, creating or updating data,
                interacting with other systems, and continuing through multiple
                workflow steps.
              </p>
            </VocabularyCard>
          </div>
        </section>

        {/* ======================================================
            MAJOR DISTINCTION
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="First Major Distinction"
            title="Communication and Workflow Are Not the Same Thing"
          >
            <p>
              We are going to deliberately simplify the automation landscape for
              our first mental model.
            </p>

            <p className="mt-4">
              Later lessons will refine it, challenge it, and expose exceptions.
              For Lesson 1, however, this distinction is extremely useful.
            </p>
          </SectionHeading>

          <MentalModel title="A deliberately simplified starting model">
            {`QUICKBASE TELLS YOU SOMETHING
        │
        └── Alert


YOUR APP TELLS SOMEONE SOMETHING
        │
        └── Automatic Email


YOUR APP DOES SOMETHING
        │
        └── Pipeline`}
          </MentalModel>

          <Remember title="Automation does not automatically mean Pipeline">
            <p>
              A requirement that says “send someone information” may be
              completely satisfied by a native Quickbase email mechanism.
            </p>

            <p className="mt-3">
              Building a Pipeline simply because Pipelines are more powerful can
              create unnecessary complexity.
            </p>
          </Remember>
        </section>

        {/* ======================================================
            INFORMATION VS ACTION
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Communication vs. Action"
            title="Ask What Result the Business Actually Needs"
          >
            <p>
              Consider three requirements that initially sound very similar.
            </p>
          </SectionHeading>

          <div className="space-y-5">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Requirement A
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                Tell Alice that her Task changed.
              </h3>

              <p className="mt-3 leading-8">
                The required result is communication. Nothing else necessarily
                needs to happen to the application.
              </p>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Requirement B
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                Remind Alice two days before the Task Due Date.
              </h3>

              <p className="mt-3 leading-8">
                The required result is still communication, but the cause is now
                the passage of time rather than a record modification.
              </p>
            </div>

            <div className="rounded-xl border-2 border-[#276749] bg-[#f0fff4] p-6">
              <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
                Requirement C
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#205c38]">
                When the Task becomes Complete, create a history record and
                update another related record.
              </h3>

              <p className="mt-3 leading-8">
                The requirement has crossed from communication into workflow.
                Quickbase must now perform operations against data.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            NOT ALL AUTOMATION STARTS THE SAME WAY
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Different Causes"
            title="Not Every Automation Begins With a Record Change"
          >
            <p>
              One of the most important habits in this course will be
              identifying what caused something to matter.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            <ConceptCard title="Record Activity">
              <p>A record is added, modified, or deleted.</p>

              <p className="mt-3 font-semibold text-[#276749]">
                Something changed.
              </p>
            </ConceptCard>

            <ConceptCard title="Record Date">
              <p>
                A stored date becomes important because time has moved closer to
                it or past it.
              </p>

              <p className="mt-3 font-semibold text-[#276749]">
                Time changed the meaning of the record.
              </p>
            </ConceptCard>

            <ConceptCard title="Schedule">
              <p>
                A recurring clock reaches Monday morning, the first day of the
                month, or another scheduled time.
              </p>

              <p className="mt-3 font-semibold text-[#276749]">
                The calendar caused the automation to run.
              </p>
            </ConceptCard>
          </div>

          <MentalModel title="Three causes we will investigate">
            {`RECORD CHANGE          RECORD DATE          SCHEDULE
      │                   │                  │
      ▼                   ▼                  ▼
 something changed     time relative       scheduled
 in the data           to the record       execution`}
          </MentalModel>
        </section>

        {/* ======================================================
            WHY PIPELINES COME LATER
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Course Design"
            title="Why We Are Not Starting With Pipelines"
          >
            <p>
              Pipelines can perform sophisticated automation, but beginning
              there would hide several simpler concepts underneath a large
              workflow tool.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            <ConceptCard title="First understand communication">
              <p>
                We need to understand triggers, recipients, dates, conditions,
                permissions, reports, and record values before those concepts
                become steps inside a workflow.
              </p>
            </ConceptCard>

            <ConceptCard title="Then understand workflow">
              <p>
                Once a business requirement requires operations beyond
                communication, Pipelines will enter naturally because the
                simpler tools no longer satisfy the requirement.
              </p>
            </ConceptCard>
          </div>

          <Remember title="Power is not the same thing as appropriateness">
            <p>
              The most sophisticated Quickbase feature is not automatically the
              best feature for a requirement.
            </p>

            <p className="mt-3">
              Throughout this lab, we will favor the least complicated mechanism
              that correctly solves the problem.
            </p>
          </Remember>
        </section>

        {/* ======================================================
            ORIENTATION CHECK
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Orientation Check"
            title="Classify the Requirement Before Choosing a Tool"
          >
            <p>
              We are not trying to produce perfect answers yet. The purpose is
              simply to begin separating communication, time, reports, and
              workflow.
            </p>
          </SectionHeading>

          <div className="space-y-5">
            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <h3 className="text-xl font-bold text-[#205c38]">
                “Tell the Assigned To user when this Task changes.”
              </h3>

              <details className="mt-4 rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4">
                <summary className="cursor-pointer font-bold text-[#276749]">
                  Show Discussion
                </summary>

                <p className="mt-4 leading-8">
                  This is fundamentally a communication requirement caused by a
                  record event. We should investigate Quickbase automatic-email
                  tools before assuming a Pipeline is necessary.
                </p>
              </details>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <h3 className="text-xl font-bold text-[#205c38]">
                “Send managers the Open Tasks report every Monday.”
              </h3>

              <details className="mt-4 rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4">
                <summary className="cursor-pointer font-bold text-[#276749]">
                  Show Discussion
                </summary>

                <p className="mt-4 leading-8">
                  This is scheduled delivery of a view of the data. A report and
                  Subscription immediately deserve investigation.
                </p>
              </details>
            </div>

            <div className="rounded-xl border border-gray-300 bg-white p-6">
              <h3 className="text-xl font-bold text-[#205c38]">
                “Create another Quickbase record when a Task reaches a specific
                state.”
              </h3>

              <details className="mt-4 rounded-lg border border-[#9fc9ad] bg-[#f0fff4] p-4">
                <summary className="cursor-pointer font-bold text-[#276749]">
                  Show Discussion
                </summary>

                <p className="mt-4 leading-8">
                  The requested result is an operation against application data,
                  not merely communication. This is the kind of requirement that
                  eventually moves us toward Pipelines.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ======================================================
            NO EXPERIMENT
        ====================================================== */}

        <section className="mb-14">
          <div className="rounded-2xl border border-gray-300 bg-[#f7f8fa] p-6 sm:p-8">
            <p className="font-bold uppercase tracking-[0.12em] text-[#276749]">
              Experiment
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#205c38]">
              No Quickbase Experiment Yet
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8">
              Lesson 1 is intentionally an orientation lesson. We have not
              configured any automation because we first need enough vocabulary
              to recognize what Quickbase is doing when we begin experimenting.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-8">
              Starting in Lesson 2, we will move to a simple Tasks table and
              begin observing how Quickbase interprets record activity.
            </p>
          </div>
        </section>

        {/* ======================================================
            STUDENT OUTCOME
        ====================================================== */}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Student Outcome"
            title="What You Should Understand Before Moving On"
          />

          <div className="rounded-2xl border-2 border-[#276749] bg-[#f0fff4] p-6 sm:p-8">
            <p className="text-lg leading-8">
              At the end of Lesson 1, you should be able to hear the word
              <strong> automation</strong> without immediately translating it
              into <strong>Pipeline</strong>.
            </p>

            <p className="mt-4 text-lg leading-8">Instead, begin by asking:</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "What caused this requirement to matter?",
                "Is the requirement communication or workflow?",
                "Is a record event involved?",
                "Is time involved?",
                "Is a report involved?",
                "Does Quickbase need to change data or merely communicate it?",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-lg border border-[#9fc9ad] bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#276749] font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
            NEXT LESSON
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[#17452a] bg-[#205c38] text-white">
          <div className="p-7 sm:p-9">
            <p className="font-bold uppercase tracking-[0.15em] text-white/75">
              Next: Lesson 2
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Records as Events
            </h2>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/90">
              We will create a simple Tasks table and investigate what Quickbase
              actually means when it says a record was added, modified, or
              deleted.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/90">
              More importantly, we will begin separating the event itself from
              the resulting state of the record.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons/2"
                className="inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#205c38] transition hover:-translate-y-0.5 hover:bg-[#f0fff4]"
              >
                Continue to Lesson 2 →
              </Link>

              <Link
                href="/lessons"
                className="inline-flex rounded-lg border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#205c38]"
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

