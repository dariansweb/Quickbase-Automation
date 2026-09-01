# Quickbase Automation Developer Lab

An independent, hands-on study of **Quickbase automation, workflow behavior, and Pipelines** built through documentation, controlled experiments, observation, and progressively deeper technical investigation.

This repository contains the source for a Next.js tutorial site documenting that research as it happens.

> **The goal is not to memorize where Quickbase controls are located.**  
> The goal is to understand what happened, what Quickbase knows about it, how it evaluates the situation, and what should happen next.

---

## What Is This Project?

The **Quickbase Automation Developer Lab** is a growing collection of lessons created while investigating how Quickbase automation actually behaves.

The project begins with relatively simple questions:

- What happens when a record changes?
- What counts as a meaningful change?
- What information does Quickbase have before and after that change?
- When does an automated communication qualify to send?
- How do conditions affect that decision?
- What changes when time, rather than a record event, initiates the automation?

Those questions progressively lead into larger ones:

- When is communication automation enough?
- When does a requirement become a workflow?
- What does workflow orchestration mean in Quickbase?
- What is a Pipeline?
- Where do Pipelines exist relative to Quickbase applications?
- What are Channels and Accounts?
- What is a Trigger actually responsible for?
- How do Actions and Queries differ?
- How does runtime data move between Pipeline steps?
- What happens when a Query returns multiple records?
- Why do Loops appear?
- What are Pipeline step Ref IDs?
- Where does Jinja fit?
- How can execution behavior be observed and debugged?

The lessons grow as those questions are investigated.

This means the curriculum is intentionally **not completely predetermined**.

A lesson may grow, split into multiple lessons, expose a new question, or change direction when actual Quickbase behavior reveals something unexpected.

---

## The Learning Philosophy

This project treats Quickbase as something to **investigate**, not merely something to configure.

Instead of beginning with:

> “Which button do I click?”

the lab tries to begin with:

> **“What is actually happening?”**

The general learning cycle is:

```text
QUESTION
   ↓
RESEARCH
   ↓
PREDICT
   ↓
EXPERIMENT
   ↓
OBSERVE
   ↓
COMPARE
   ↓
REFINE THE MODEL
   ↓
WRITE THE LESSON
```

The finished tutorial comes **after** the investigation.

---

## The Research Method

### 1. Ask a Question

Each investigation begins with something about Quickbase that needs to be understood.

For example:

> If two fields are changed during one record edit, does Quickbase treat that as two automation events or one?

The question comes before the explanation.

---

### 2. Research the Documented Behavior

Quickbase documentation, terminology, configuration options, and available interfaces are examined first.

Documentation establishes what Quickbase officially says the feature should do.

But documentation is not used as a substitute for experimentation when behavior can be tested directly.

---

### 3. Make a Prediction

Before changing the configuration, we try to state what we expect Quickbase to do.

This is important.

Without a prediction, an experiment can easily become:

> “Something happened.”

With a prediction, we can ask:

> “Did Quickbase behave the way our current mental model predicted?”

---

### 4. Change One Important Variable

Whenever practical, experiments are designed to isolate a single meaningful variable.

Instead of changing five configuration options and trying to interpret the result, the lab prefers controlled tests.

For example:

```text
Record #17

Before:
Status = Open

Change:
Status = Complete

Everything else:
Unchanged
```

Then observe the result.

---

### 5. Observe What Quickbase Actually Did

The observed behavior is recorded without rewriting the observation to fit the original expectation.

Screenshots, emails, Pipeline configuration, execution results, runtime references, Activity Log information, and other evidence may all become part of the investigation.

Unexpected behavior is useful.

Sometimes it becomes the most important part of the lesson.

---

### 6. Compare Prediction With Observation

The result is compared against:

- the original prediction
- Quickbase documentation
- previous experiments
- the current working mental model

If they disagree, the disagreement becomes another research question.

---

### 7. Refine the Mental Model

The explanation is updated only after considering the evidence.

The goal is not simply to discover that a configuration works.

The goal is to understand **why the observed behavior makes sense** and how that understanding transfers to unfamiliar Quickbase problems later.

---

## Evidence Matters

Not every statement discovered during research has the same level of certainty.

The project distinguishes among several kinds of knowledge.

### DOCUMENTED

Behavior explicitly described by Quickbase documentation or other authoritative Quickbase material.

### OBSERVED

Behavior directly reproduced during a controlled experiment.

### INFERRED

A model that reasonably explains documented and observed behavior but has not itself been directly confirmed.

### SPECULATIVE

A plausible explanation or architectural hypothesis that still requires additional evidence.

During active experiments, working labels such as **PREDICTED** and **NOT YET** may also be used.

The important rule is:

> **Inference should never silently become fact.**

---

## Documentation Does Not Outrank Reality

Documentation is extremely important, but so is reproducible behavior.

A central principle of the lab is:

> **Documentation and actual Quickbase behavior outrank assumptions—including our own.**

If an experiment contradicts an assumption, the assumption changes.

If an experiment appears to contradict documentation, the discrepancy becomes something to investigate rather than something to ignore.

---

# The Automation Journey

The project intentionally builds concepts progressively.

## Information

Automation ultimately operates on information:

- Apps
- Tables
- Records
- Fields
- Relationships
- Users
- Permissions
- Reports
- Queries

Understanding the underlying Quickbase data model remains important even when the subject becomes automation.

↓

## Communication

The first automation studies investigate Quickbase mechanisms that primarily communicate information:

- Notifications
- Reminders
- Subscriptions
- Custom Emails
- Scheduled Custom Emails
- Alerts

↓

## Events

The next question becomes:

> What caused Quickbase to consider doing something?

This introduces:

- record additions
- record modifications
- field changes
- previous values
- current values
- resulting record state

↓

## Conditions

An event does not necessarily mean an action should occur.

Conditions introduce rule evaluation:

```text
EVENT
   ↓
RELEVANT CHANGE?
   ↓
RESULTING STATE?
   ↓
BOOLEAN CONDITIONS?
   ↓
QUALIFIES
```

This leads into concepts such as:

- AND
- OR
- grouped conditions
- watched fields
- state evaluation
- changed-field criteria

↓

## Time

Not every important situation begins with a record edit.

Time introduces another initiator:

```text
TIME ARRIVES
   ↓
EVALUATE CURRENT INFORMATION
   ↓
COMMUNICATE
```

This creates an important distinction between:

**event-driven automation**

and

**time-driven automation**

↓

## Workflow

Eventually a requirement stops being:

> “Should Quickbase send something?”

and becomes:

> “What needs to happen next?”

A workflow may need to:

1. detect something
2. retrieve additional information
3. pass data forward
4. evaluate conditions
5. make a decision
6. perform an action
7. process multiple records
8. continue with additional work
9. communicate the final result

That is the boundary where workflow orchestration becomes important.

↓

# Pipelines

Quickbase Pipelines are where many of the earlier concepts begin to converge.

The working model developed through the lab is:

```text
REALM
  ↓
PIPELINE
  ↓
INITIATION
  ↓
EXECUTION
  ↓
STEPS
  ↓
CHANNELS
  ↓
ACCOUNTS
  ↓
RUNTIME DATA
  ↓
LATER STEPS
  ↓
COLLECTION DECISIONS
  ↓
ACTIVITY LOG
```

A useful current description is:

> **A Pipeline is a realm-level workflow orchestrator whose executions proceed through defined steps, use Channels to interact with systems, authenticate through appropriate Accounts or connections, and move runtime data from earlier work into later work.**

The Pipeline research is intentionally being developed from the bottom up.

---

## Pipeline Anatomy

The lab has begun dissecting real Pipeline steps rather than treating the designer as a collection of forms.

Three fundamental step roles have emerged:

### Trigger

Something happened.

The Trigger establishes why an execution begins and can contribute event/runtime information to the workflow.

### Query

Go find something.

A Query retrieves information that later steps may need.

A Query can also introduce an important new concept:

> **a collection of records**

### Action

Do something.

An Action changes something or performs work using its configured inputs.

---

## Important Pipeline Distinctions

Several distinctions have become especially important during the Pipeline research.

### Trigger Field ≠ Downstream Field ≠ Target Field

These answer different questions.

**Trigger Fields**

> Which changes matter for initiation?

**Fields for subsequent steps**

> Which business information should be exposed for later work?

**Fields to update**

> Which fields should this Action modify?

They may reference the same Quickbase fields, but they serve different purposes.

---

### Step Position ≠ Step Identity

Moving a Pipeline step changes where it executes.

It does not necessarily change which step it is.

Pipeline Ref IDs have provided an important clue for understanding this distinction.

A useful working model is:

> **Position tells us WHERE. Ref ID tells Quickbase WHICH STEP.**

---

### Available Data ≠ Instruction

Making runtime information available to a later step does not tell that step what to do with it.

A value can exist in runtime context without automatically becoming an update instruction.

---

### Literal Value ≠ Runtime Reference

Pipeline fields may receive:

- literal values
- runtime values from earlier steps
- more customized expressions

Understanding where a value comes from becomes increasingly important as workflows become more complex.

---

### One Record ≠ Collection

A Query can return multiple records.

That changes the shape of the workflow.

```text
QUERY
  ↓
COLLECTION
  ↓
LOOP
  ↓
CURRENT ITEM
  ↓
ACTION
```

The difference between the **entire collection** and the **current Loop item** becomes essential once Pipelines begin processing multiple records.

---

### Execution Flow ≠ Data Flow

Two related things are happening inside a Pipeline.

**Execution flow** asks:

> Which step runs next?

**Data flow** asks:

> What information is available to that step?

Understanding both is necessary for reasoning about larger workflows.

---

# Communication Automation vs Workflow Orchestration

One of the most important boundaries in the project is recognizing when a requirement has stopped being primarily about communication.

A Notification may be perfect when the requirement is:

> When a Task becomes Complete, tell the supervisor.

But consider:

> When a Task becomes Complete, identify the Assigned To user, find that person's other Open Tasks, determine which are overdue, check whether Follow-Up records already exist, create missing Follow-Ups, count the overdue work, update a tracking record, and send the supervisor a summary.

That is no longer merely an email problem.

It is a workflow orchestration problem.

The goal is not to use Pipelines simply because they are more powerful.

The goal is to recognize **what kind of problem is being solved**.

---

# Automation Design Principle

> **Use the least complicated mechanism that correctly satisfies the requirement.**

More powerful automation is not automatically better automation.

Depending on the requirement, the correct solution might be:

- Notification
- Reminder
- Subscription
- Custom Email
- Scheduled Custom Email
- another native Quickbase capability
- Pipeline
- REST API
- an external integration

The architecture should follow the requirement.

The requirement should not be forced into the most sophisticated available tool.

---

# Connection to Quickbase Development

The Automation Developer Lab did not begin in isolation.

Earlier Quickbase developer studies focused more directly on communicating programmatically with Quickbase data:

- Apps
- Tables
- Records
- Fields
- DBIDs
- FIDs
- Relationships
- QBL
- JSON
- JavaScript
- REST APIs
- CRUD operations
- Pagination
- Schema discovery

The Automation Developer Lab moves upward from that foundation.

Instead of asking only:

> **How do I communicate programmatically with Quickbase data?**

the automation research asks:

> **How does Quickbase respond when something needs to happen?**

The underlying data model never disappears.

```text
QUICKBASE DATA MODEL
Apps
Tables
Records
Fields
Relationships
Permissions
        ↓
QUERY & DATA LANGUAGES
QBL
Jinja
JSON
        ↓
AUTOMATION & INTERFACES
Native Quickbase
Pipelines
REST API
```

These are related layers of the same broader Quickbase study.

---

# Technologies

The tutorial website is built with:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Icons**

The Quickbase research currently touches technologies and concepts including:

- Quickbase native automation
- Quickbase Pipelines
- Quickbase REST API
- JSON
- QBL
- Jinja
- reports
- relationships
- permissions
- runtime data
- workflow orchestration

---

# Repository Structure

The site uses the Next.js App Router.

A simplified structure looks like:

```text
app/
├── page.tsx
├── layout.tsx
├── globals.css
│
├── get-started/
│   └── page.tsx
│
├── lessons/
│   ├── page.tsx
│   ├── 1/
│   │   └── page.tsx
│   ├── 2/
│   │   └── page.tsx
│   ├── ...
│   ├── 8/
│   │   └── page.tsx
│   └── 9/
│       └── page.tsx
│
└── data/
    └── lessons.ts
```

Each lesson is intended to stand on its own while remaining part of the larger learning progression.

---

# Lessons Grow From Research

This repository should not be interpreted as a frozen course syllabus.

The lesson directory grows as research progresses.

A planned topic might:

- become larger than expected
- split into multiple lessons
- move later in the sequence
- reveal a prerequisite
- expose undocumented or unexpected behavior
- create an entirely new research question

That is intentional.

The site documents the journey **after Quickbase has had a chance to teach us something**.

---

# Current Direction

The project has crossed from native communication automation into **Quickbase Pipelines**.

Current and upcoming research moves deeper into areas such as:

- Pipeline execution
- Activity Log evidence
- runtime data
- step outputs
- dynamic references
- Queries
- collections
- Loops
- Actions
- branching
- Jinja
- error handling
- bulk behavior
- execution context
- secondary events
- workflow reliability
- integration boundaries

The exact order may change as experiments uncover new dependencies.

---

# Who Is This For?

This repository may be useful to someone who:

- is learning Quickbase beyond basic application building
- wants to understand why automation behaves the way it does
- is beginning to explore Pipelines
- wants practical experiments rather than only feature descriptions
- works with Quickbase APIs and wants to understand how automation fits into the larger platform
- enjoys investigating software behavior from the bottom up

It is also my own research notebook.

That distinction matters.

These pages preserve the experiments, mistakes, corrections, observations, and mental models developed while learning Quickbase rather than presenting the project as an official or authoritative Quickbase training curriculum.

---

# Independent Project

This is an independent learning and research project.

It is **not an official Quickbase repository, product, training course, or documentation site**.

Quickbase product names, features, and terminology belong to their respective owners.

When authoritative product behavior is required, consult the current official Quickbase documentation.

---

# The Short Version

If the entire project had to be reduced to one process, it would be:

```text
Ask the question.
Read the documentation.
Predict the behavior.
Build the experiment.
Run it.
Observe Quickbase.
Preserve the evidence.
Correct the model.
Explain what we learned.
Then make the next experiment harder.
```

**Predict it. Test it. Observe it. Understand why it happened.**