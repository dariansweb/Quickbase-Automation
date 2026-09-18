export type Lesson = {
  number: string;
  title: string;
  description: string;
  link: string;
  phase: string;
  status: "planned" | "current" | "complete";
};

export const lessons: Lesson[] = [
  {
    number: "1",
    title: "The Automation Landscape",
    description:
      "Establish the vocabulary and conceptual boundaries of Quickbase automation, distinguishing record-driven, time-driven, report-driven, and workflow-driven behavior before building anything.",
    link: "/lessons/1",
    phase: "Understanding Quickbase Automation",
    status: "complete",
  },

  {
    number: "2",
    title: "Records as Events - Notifications",
    description:
      "Use a Task record and a laboratory Notification to discover what Quickbase means by modification, how persisted changes differ from editing activity, and how changed fields and resulting record state participate in automation.",
    link: "/lessons/2",
    phase: "Event-Driven Communication",
    status: "complete",
  },

  {
    number: "3A",
    title: "Notification Mechanics: Events, Changes & Record State",
    description:
      "Investigate how Notifications evaluate record activity by separating Add, Modify, and Delete events, watched-field changes, previous and current values, and conditions that become true after a change.",
    link: "/lessons/3a",
    phase: "Event-Driven Communication",
    status: "complete",
  },

  {
    number: "3B",
    title: "Notification Logic: Boolean Rules & Operation Scope",
    description:
      "Build compound Notification rules with all, any, and grouped criteria, then investigate how individual form edits and Grid Edit produce single-record and multiple-record notification behavior.",
    link: "/lessons/3b",
    phase: "Event-Driven Communication",
    status: "complete",
  },

  {
    number: "4",
    title: "Custom Email: Why Does It Exist?",
    description:
      "Compare Custom Email with Notifications while investigating dynamic recipients, recipient permissions, record-change elements, bulk behavior, and the richer controls that distinguish the modern Custom Email system.",
    link: "/lessons/4",
    phase: "Event-Driven Communication",
    status: "complete",
  },

  {
    number: "5",
    title: "Scheduled Custom Email",
    description:
      "Shift from event-driven to time-driven communication and learn how recurring Custom Emails use schedules, reports, recipient permissions, empty-report behavior, and UTC timing to communicate current Quickbase state.",
    link: "/lessons/5",
    phase: "Time-Driven Communication",
    status: "complete",
  },
  {
    number: "5A",
    title: "Report Subscriptions",
    description:
      "Compare Report Subscriptions with Scheduled Custom Email and learn when simple recurring report delivery is a better fit than building a composed scheduled communication.",
    link: "/lessons/5a",
    phase: "Time-Driven Communication",
    status: "planned",
  },
  {
    number: "5C",
    title: "Reminders",
    description:
      "Explore date-relative communication and learn when automation should be driven by the relationship between the current time and a Date field stored on each record.",
    link: "/lessons/5c",
    phase: "Time-Driven Communication",
    status: "planned",
  },

  {
    number: "6",
    title: "Choosing the Correct Automation Tool",
    description:
      "Compare Notifications, Custom Emails, scheduled Custom Emails, Subscriptions, Reminders, and Quickbase Alerts through realistic requirements and learn to identify the simplest native mechanism that naturally expresses the business need.",
    link: "/lessons/6",
    phase: "Automation Architecture",
    status: "complete",
  },

  {
    number: "7",
    title: "When Communication Is Not Enough",
    description:
      "Identify requirements that cannot be solved by sending information alone and establish the boundary between communication automation and workflows that must perform actions on data.",
    link: "/lessons/7",
    phase: "From Communication to Workflow",
    status: "complete",
  },

  {
    number: "8",
    title: "Crossing Into Workflow Automation",
    description:
      "Cross from native communication automation into executable workflows and build a mental model of the Pipeline machine. Establish realm scope, workflow initiation, definitions versus runtime executions, steps, channels, accounts, runtime data, collections, and the role of execution evidence before opening the Pipeline designer.",
    link: "/lessons/8",
    phase: "Pipeline Foundations",
    status: "complete",
  },
  {
    number: "9",
    title: "Anatomy of a Pipeline",
    description:
      "Open the Pipeline designer and dissect real Trigger, Query, and Action steps through controlled experiments. Investigate channels, accounts, step identity and Ref IDs, field roles, runtime references, data flow, literals versus dynamic values, Query collections, and the Loop structure that appears when multiple records must be processed.",
    link: "/lessons/9",
    phase: "Pipeline Foundations",
    status: "complete",
  },
  {
    number: "10",
    title: "Our First Pipeline Execution",
    description:
      "Build and execute a Pipeline from a clean definition. Trace a Task mutation through its Trigger and Action, test runtime data availability and field updates, use controlled experiments to prove when the Pipeline runs, and investigate how relationship-derived fields behave when child and parent records change.",
    link: "/lessons/10",
    phase: "Pipeline Foundations",
    status: "complete",
  },
  {
    number: "11",
    title: "Reading the Activity Log",
    description:
      "Read the Pipeline Activity Log as runtime evidence. Trace a Pipeline from trigger through completion, connect Ref IDs to executed steps, inspect inputs, targets, outputs, record state, metadata, and timing, and learn how Activity can preserve execution evidence beyond what the current Quickbase record can show.",
    link: "/lessons/11",
    phase: "Pipeline Foundations",
    status: "complete",
  },
  {
    number: "12",
    title: "How Pipeline Steps Work Together",
    description:
      "Follow a Pipeline as each step receives runtime information, performs work, and makes new outputs available downstream. Trace field values, records, references, and other step outputs through Activity Log evidence while introducing how linked resources can persist beyond a single run.",
    link: "/lessons/12",
    phase: "Pipeline Runtime Data",
    status: "complete",
  },
  {
    number: "13",
    title: "Conditions, Loops, and Branching",
    description:
      "Move beyond single-record Pipeline logic by searching for multiple matching records, processing each returned item in a Loop, and using Conditions to decide which path each record follows. Learn the difference between filtering a list, evaluating the current Loop item, and applying different actions to different records at runtime.",
    link: "/lessons/13",
    phase: "Pipeline Logic",
    status: "complete",
  },
  {
    number: "14",
    title: "Queries: Finding Records",
    description:
      "Learn how Pipelines locate Quickbase records by separating single-record lookups from queries that can return collections. Build controlled searches, inspect their results, and reason about filtering, result size, and the downstream consequences of retrieving multiple records.",
    link: "/lessons/14",
    phase: "Query-Driven Automation",
    status: "complete",
  },
  {
    number: "15",
    title: "Advanced Loop Processing and Runtime Scope",
    description:
      "Explore how runtime scope works inside a Quickbase Pipeline Loop. Follow the current item, earlier step outputs, and loop metadata through the same iteration, and learn why different references can expose different runtime states of the same record before that current-item scope ends.",
    link: "/lessons/15",
    phase: "Advanced Pipeline Logic",
    status: "complete",
  },
  {
    number: "16",
    title: "Jinja, Runtime References, and Scope",
    description:
      "Investigate how Jinja works with the runtime data Quickbase makes available. Compare native Pipeline references with Jinja expressions, work with current items and earlier step outputs, explore Jinja variables and loops, and test where Jinja scope ends compared with Quickbase Pipeline scope.",
    link: "/lessons/16",
    phase: "Pipeline Expressions",
    status: "complete",
  },
  {
    number: "17",
    title: "Transforming Data With Jinja",
    description:
      "Move beyond accessing runtime values and deliberately reshape them for downstream work. Normalize and format values, handle missing data, work with structured values and collections, iterate through lists, make conditional decisions, and preserve state across Jinja loop iterations while tracing every transformation back to its runtime source.",
    link: "/lessons/17",
    phase: "Pipeline Expressions",
    status: "current",
  },
  {
    number: "18",
    title: "Dates, Time, and Scheduling",
    description:
      "Investigate what time actually means inside a Pipeline. Trace dates and timestamps from Quickbase fields into runtime data, distinguish UTC from application-local time and displayed time, then test parsing, formatting, relative calculations, and scheduled execution against the evidence recorded in Activity.",
    link: "/lessons/18",
    phase: "Pipeline Expressions",
    status: "current",
  },
  {
    number: "19",
    title: "Controlled Record Mutations",
    description:
      "Study what happens when a Pipeline deliberately changes Quickbase data. Examine the values sent to record actions, the resulting record state, execution identity and permissions, execution order, and the runtime evidence produced when Pipeline actions create or update records.",
    link: "/lessons/19",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "20",
    title: "Secondary Events and Automation Loops",
    description:
      "Investigate what happens when a Pipeline-driven data change becomes another automation event. Trace secondary execution, distinguish intentional workflow chains from unintended repeated processing, and develop evidence-based strategies for controlling automation loops.",
    link: "/lessons/20",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "21",
    title: "Relationships and Cross-Record Workflows",
    description:
      "Extend Pipeline logic across connected Quickbase records. Investigate how relationships, reference fields, lookups, parent and child records, searches, and record lookups affect cross-record automation while distinguishing Quickbase table relationships from Pipeline-specific linking mechanisms.",
    link: "/lessons/21",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "22",
    title: "Reliable Pipeline Engineering",
    description:
      "Bring the Pipeline execution model together and apply it to dependable automation design. Use Activity evidence to investigate failures, retries, permissions, duplicate execution, changing schemas, performance, maintenance, and systematic troubleshooting while identifying the tools and practices needed for long-term Pipeline reliability.",
    link: "/lessons/22",
    phase: "Automation Engineering",
    status: "planned",
  },
];
