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
    status: "current",
  },
  {
    number: "11",
    title: "Reading the Activity Log",
    description:
      "Use the Pipeline Activity Log as an experimental instrument for observing workflow execution. Inspect runs, individual steps, inputs, outputs, runtime values, execution order, and errors so future Pipeline behavior can be investigated from evidence rather than assumptions.",
    link: "/lessons/11",
    phase: "Pipeline Foundations",
    status: "planned",
  },
  {
    number: "12",
    title: "Passing Data Through a Pipeline",
    description:
      "Follow runtime data from one Pipeline step to another and learn how outputs produced by earlier steps become inputs to later steps. Establish the data-flow model needed to understand step references, conditions, queries, actions, and eventually Jinja.",
    link: "/lessons/12",
    phase: "Pipeline Data Flow",
    status: "planned",
  },
  {
    number: "13",
    title: "Conditions, Branches, and Stops",
    description:
      "Carry the Boolean reasoning developed in the Notification lessons into executable workflows. Use conditions to determine whether Pipeline execution continues, follows a branch, takes an alternate path, or stops based on runtime data.",
    link: "/lessons/13",
    phase: "Pipeline Logic",
    status: "planned",
  },
  {
    number: "14",
    title: "Queries: Finding Records",
    description:
      "Learn how Pipelines locate Quickbase records by separating single-record lookups from queries that can return collections. Build controlled searches, inspect their results, and reason about filtering, result size, and the downstream consequences of retrieving multiple records.",
    link: "/lessons/14",
    phase: "Query-Driven Automation",
    status: "planned",
  },
  {
    number: "15",
    title: "Collections, Loops, and Record Processing",
    description:
      "Distinguish a single record from a collection of records and examine how Pipelines process query results. Follow collections into loops, inspect individual loop iterations, and learn how downstream actions operate once per qualifying item.",
    link: "/lessons/15",
    phase: "Query-Driven Automation",
    status: "planned",
  },
  {
    number: "16",
    title: "Jinja: Referencing Pipeline Data",
    description:
      "Introduce Jinja from the perspective of Pipeline runtime data rather than syntax memorization. Learn how step references expose earlier outputs, how fields and objects are addressed, and how expressions retrieve the values needed by later workflow steps.",
    link: "/lessons/16",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "17",
    title: "Transforming Data With Jinja",
    description:
      "Move beyond simple references and use Jinja to transform Pipeline data. Work with strings, numbers, filters, defaults, conditional expressions, combined values, and missing data while tracing every transformation back to its runtime source.",
    link: "/lessons/17",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "18",
    title: "Dates, Time, and Scheduling",
    description:
      "Apply Pipeline expressions to dates and time while examining Quickbase's UTC execution model, parsing, formatting, relative date calculations, time zones, and scheduled Pipelines. Compare scheduled workflow execution with the scheduled communication mechanisms studied earlier.",
    link: "/lessons/18",
    phase: "Pipeline Expressions",
    status: "planned",
  },
  {
    number: "19",
    title: "Creating and Updating Records",
    description:
      "Move from observing and retrieving data to deliberately changing Quickbase through Pipeline actions. Create and update records while examining field mappings, execution identity, permissions, data integrity, execution order, and the events produced by Pipeline-driven mutations.",
    link: "/lessons/19",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "20",
    title: "Secondary Events and Automation Loops",
    description:
      "Investigate what happens after a Pipeline changes Quickbase data. Determine when Pipeline-created mutations can trigger additional automation, identify self-triggering and cross-workflow loop risks, and develop controlled strategies for preventing unintended repeated execution.",
    link: "/lessons/20",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "21",
    title: "Relationships and Cross-Record Workflows",
    description:
      "Use Quickbase relationships inside automated workflows by following reference, lookup, parent, and child data across related tables. Find related records, act on connected data, and distinguish native Quickbase relationships from Pipeline linking mechanisms.",
    link: "/lessons/21",
    phase: "Workflow Automation",
    status: "planned",
  },
  {
    number: "22",
    title: "Reliable Pipeline Engineering",
    description:
      "Bring the Pipeline execution model together by investigating failures, retries, permissions, schema changes, duplicate execution, bulk operations, background steps, accounts, YAML, Connection Central, observability, maintenance, and troubleshooting practices for dependable automation.",
    link: "/lessons/22",
    phase: "Automation Engineering",
    status: "planned",
  },
];
