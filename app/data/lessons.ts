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
      "Establish the vocabulary and conceptual boundaries of Quickbase automation before building anything.",
    link: "/lessons/1",
    phase: "Understanding Quickbase Communication",
    status: "current",
  },
  {
    number: "2",
    title: "Records as Events",
    description:
      "Explore what Quickbase means when a record is added, modified, or deleted, and separate an event from the resulting record state.",
    link: "/lessons/2",
    phase: "Event-Driven Communication",
    status: "planned",
  },
  {
    number: "3",
    title: "Your First Record-Change Email",
    description:
      "Build a deliberately broad automatic email triggered by record modification and observe which changes cause it to send.",
    link: "/lessons/3",
    phase: "Event-Driven Communication",
    status: "planned",
  },
  {
    number: "4",
    title: "Watching a Specific Field",
    description:
      "Refine record-change automation so Quickbase reacts only when a particular field participates in the modification.",
    link: "/lessons/4",
    phase: "Event-Driven Communication",
    status: "planned",
  },
  {
    number: "5",
    title: "Conditions: Change Versus State",
    description:
      "Distinguish between a field changing and the record ending in a particular state.",
    link: "/lessons/5",
    phase: "Event-Driven Communication",
    status: "planned",
  },
  {
    number: "6",
    title: "Before and After",
    description:
      "Investigate what Quickbase knows about previous and current record values during a modification.",
    link: "/lessons/6",
    phase: "Understanding Change",
    status: "planned",
  },
  {
    number: "7",
    title: "Building Useful Email Content",
    description:
      "Combine static text, current values, previous values, record links, reports, forms, and other Quickbase content into meaningful automated communication.",
    link: "/lessons/7",
    phase: "Understanding Change",
    status: "planned",
  },
  {
    number: "8",
    title: "Who Receives the Message?",
    description:
      "Explore fixed recipients, User fields, email fields, dynamic recipients, and the idea that the recipient can itself be record data.",
    link: "/lessons/8",
    phase: "People, Recipients, and Security",
    status: "planned",
  },
  {
    number: "9",
    title: "Permissions Are Part of Automation",
    description:
      "Examine recipient permissions, owner permissions, authorization context, external recipients, and the security consequences of automated communication.",
    link: "/lessons/9",
    phase: "People, Recipients, and Security",
    status: "planned",
  },
  {
    number: "10",
    title: "Nothing Changed, but Something Happened",
    description:
      "Introduce time-driven automation and Reminders using dates stored in Quickbase records.",
    link: "/lessons/10",
    phase: "Time-Driven Communication",
    status: "planned",
  },
  {
    number: "11",
    title: "Event Time Versus Record Time",
    description:
      "Compare record-change events, record-relative dates, and calendar schedules before choosing an automation mechanism.",
    link: "/lessons/11",
    phase: "Time-Driven Communication",
    status: "planned",
  },
  {
    number: "12",
    title: "Report Subscriptions",
    description:
      "Use reports to define what information matters and Subscriptions to define when that information is delivered.",
    link: "/lessons/12",
    phase: "Report-Driven Communication",
    status: "planned",
  },
  {
    number: "13",
    title: "Personalized Reports and Execution Context",
    description:
      "Explore how permissions and execution context can cause the same report to produce different information for different recipients.",
    link: "/lessons/13",
    phase: "Report-Driven Communication",
    status: "planned",
  },
  {
    number: "14",
    title: "Custom Emails",
    description:
      "Bring record-change and scheduled communication concepts together using Quickbase's modern Custom Email system.",
    link: "/lessons/14",
    phase: "The Modern Email Model",
    status: "planned",
  },
  {
    number: "15",
    title: "Choosing the Simplest Correct Tool",
    description:
      "Compare Notifications, Reminders, Subscriptions, Custom Emails, and Pipelines through realistic business scenarios.",
    link: "/lessons/15",
    phase: "The Modern Email Model",
    status: "planned",
  },
  {
    number: "16",
    title: "When Sending an Email Isn't Enough",
    description:
      "Identify the boundary where communication tools stop being sufficient and a workflow engine becomes necessary.",
    link: "/lessons/16",
    phase: "Where Email Automation Ends",
    status: "planned",
  },
  {
    number: "17",
    title: "What Is a Pipeline?",
    description:
      "Introduce Pipelines through the foundational concepts of Trigger, Query, and Action.",
    link: "/lessons/17",
    phase: "Pipelines Foundations",
    status: "planned",
  },
  {
    number: "18",
    title: "Channels, Connections, and Steps",
    description:
      "Understand how Pipelines access Quickbase and other systems through channels, authorized connections, and individual workflow steps.",
    link: "/lessons/18",
    phase: "Pipelines Foundations",
    status: "planned",
  },
  {
    number: "19",
    title: "Your First Pipeline Trigger",
    description:
      "Build a minimal Quickbase record-triggered Pipeline and inspect what information becomes available during execution.",
    link: "/lessons/19",
    phase: "Pipelines Foundations",
    status: "planned",
  },
  {
    number: "20",
    title: "Current State and Previous State",
    description:
      "Use current and previous values in a Pipeline to reason about real record transitions rather than merely resulting state.",
    link: "/lessons/20",
    phase: "Pipelines Foundations",
    status: "planned",
  },
  {
    number: "21",
    title: "Conditions and Decision Making",
    description:
      "Control Pipeline execution with conditions and introduce Jinja only where dynamic values or logic require it.",
    link: "/lessons/21",
    phase: "Pipelines Foundations",
    status: "planned",
  },
  {
    number: "22",
    title: "Create a Change History Record",
    description:
      "Build the first genuinely useful Pipeline by creating persistent history data when a record moves through a specific state transition.",
    link: "/lessons/22",
    phase: "From Communication to Workflow",
    status: "planned",
  },
  {
    number: "23",
    title: "Query Before Acting",
    description:
      "Retrieve additional related information when the trigger record does not contain everything the workflow needs.",
    link: "/lessons/23",
    phase: "From Communication to Workflow",
    status: "planned",
  },
  {
    number: "24",
    title: "Multiple Actions and Workflow Sequences",
    description:
      "Chain actions together and use earlier step output as input for later workflow operations.",
    link: "/lessons/24",
    phase: "From Communication to Workflow",
    status: "planned",
  },
  {
    number: "25",
    title: "Branching",
    description:
      "Create decision paths where different record states or conditions cause different workflow behavior.",
    link: "/lessons/25",
    phase: "Control Flow",
    status: "planned",
  },
  {
    number: "26",
    title: "Searching and Looping",
    description:
      "Search for collections of records and iterate through them when one event affects many records.",
    link: "/lessons/26",
    phase: "Control Flow",
    status: "planned",
  },
  {
    number: "27",
    title: "Scheduling Pipelines",
    description:
      "Compare scheduled workflow execution with Reminders, Subscriptions, and scheduled Custom Emails.",
    link: "/lessons/27",
    phase: "Control Flow",
    status: "planned",
  },
  {
    number: "28",
    title: "QBL Inside Pipelines",
    description:
      "Combine Quickbase Query Language with dynamic Pipeline values and distinguish query syntax from workflow logic.",
    link: "/lessons/28",
    phase: "Connecting the Developer Labs",
    status: "planned",
  },
  {
    number: "29",
    title: "Jinja Is Not Pipelines",
    description:
      "Separate the Pipeline workflow itself from Jinja expressions, QBL queries, JSON data, channels, and individual steps.",
    link: "/lessons/29",
    phase: "Connecting the Developer Labs",
    status: "planned",
  },
  {
    number: "30",
    title: "REST API Inside a Pipeline",
    description:
      "Reconnect REST endpoints, JSON, FIDs, DBIDs, and QBL with Pipelines as an orchestration layer.",
    link: "/lessons/30",
    phase: "Connecting the Developer Labs",
    status: "planned",
  },
  {
    number: "31",
    title: "Pipeline Run History and Debugging",
    description:
      "Inspect execution history, step inputs, outputs, failures, and unexpected conditions using a deliberate debugging method.",
    link: "/lessons/31",
    phase: "Reliability and Engineering",
    status: "planned",
  },
  {
    number: "32",
    title: "Failure Is Part of Automation",
    description:
      "Investigate missing records, empty queries, permissions, connection failures, downstream errors, and partial workflow completion.",
    link: "/lessons/32",
    phase: "Reliability and Engineering",
    status: "planned",
  },
  {
    number: "33",
    title: "Bulk Events and Scale",
    description:
      "Explore what changes when automation processes many records rather than one and examine performance and bulk-event behavior.",
    link: "/lessons/33",
    phase: "Reliability and Engineering",
    status: "planned",
  },
  {
    number: "34",
    title: "Notification, Custom Email, or Pipeline?",
    description:
      "Use business scenarios to choose among Quickbase communication and workflow mechanisms based on actual requirements.",
    link: "/lessons/34",
    phase: "Designing Automation Well",
    status: "planned",
  },
  {
    number: "35",
    title: "Don't Automate What Quickbase Already Does Well",
    description:
      "Learn when native Quickbase capabilities are preferable to constructing custom workflow machinery.",
    link: "/lessons/35",
    phase: "Designing Automation Well",
    status: "planned",
  },
  {
    number: "36",
    title: "Automation Laboratory",
    description:
      "Combine communication, reports, state transitions, permissions, queries, workflows, scheduling, and debugging in a realistic capstone application.",
    link: "/lessons/36",
    phase: "Capstone",
    status: "planned",
  },
  {
    number: "Final",
    title: "The Automation Mental Model",
    description:
      "Bring the entire course together into one decision model connecting Quickbase data, communication tools, Pipelines, QBL, Jinja, JSON, and REST APIs.",
    link: "/lessons/final",
    phase: "Capstone",
    status: "planned",
  },
];
