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
    status: "current",
  },
  {
    number: "15",
    title: "Advanced Loop Processing and Runtime Scope",
    description:
      "Build on the list-and-loop model established in Lesson 13 by investigating what happens as each loop iteration becomes more complex. Follow multiple steps within an iteration, inspect loop metadata and runtime references, explore what data is available inside and after a loop, and compare item-by-item processing with other ways of handling collections.",
    link: "/lessons/15",
    phase: "Advanced Pipeline Logic",
    status: "planned",
  },
  {
    number: "16",
    title: "Jinja: Referencing Pipeline Data",
    description:
      "Turn the runtime data model from earlier lessons into explicit Jinja expressions. Learn how Ref IDs, fields, structured values, loop items, metadata, and previous-step outputs are addressed so later steps can retrieve exactly the information they need.",
    link: "/lessons/16",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "17",
    title: "Transforming Data With Jinja",
    description:
      "Move beyond retrieving runtime values and use Jinja to reshape them for downstream work. Combine values, manipulate strings and numbers, apply filters and defaults, handle missing data, and build conditional expressions while tracing every transformed value back to its runtime source.",
    link: "/lessons/17",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "18",
    title: "Dates, Time, and Scheduling",
    description:
      "Apply Pipeline expressions to dates and time while investigating timestamps, UTC, application-local time, parsing, formatting, relative date calculations, and scheduled execution. Connect the timing evidence already seen in Activity with deliberate time-driven workflow design.",
    link: "/lessons/18",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "19",
    title: "Controlled Record Mutations",
    description:
      "Move beyond simply knowing how to use Create Record and Update Record and study how Pipeline-driven mutations should be designed. Examine field mappings, execution identity, permissions, before-and-after record state, data integrity, execution order, and the new events created when a Pipeline changes Quickbase data.",
    link: "/lessons/19",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "20",
    title: "Secondary Events and Automation Loops",
    description:
      "Investigate what happens after a Pipeline mutation creates another Quickbase event. Determine when Pipeline-driven changes can trigger additional automation, trace self-triggering and cross-workflow execution, and develop controlled strategies for preventing unintended repeated or recursive processing.",
    link: "/lessons/20",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "21",
    title: "Relationships and Cross-Record Workflows",
    description:
      "Extend automation across related Quickbase data by following reference fields, lookups, parent records, and child records through real workflows. Query and act on connected records while separating native Quickbase relationships from Pipeline linking mechanisms such as Linked Items.",
    link: "/lessons/21",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "22",
    title: "Reliable Pipeline Engineering",
    description:
      "Bring the complete Pipeline execution model together and learn how to engineer automation that remains understandable and dependable over time. Investigate failures, retries, permissions, duplicate execution, schema changes, bulk and background processing, accounts, YAML, Connection Central, Activity evidence, observability, maintenance, and systematic troubleshooting.",
    link: "/lessons/22",
    phase: "Automation Engineering",
    status: "planned",
  },
];
