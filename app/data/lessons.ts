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
    status: "current",
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
    status: "planned",
  },

  {
    number: "7",
    title: "When Communication Is Not Enough",
    description:
      "Identify requirements that cannot be solved by sending information alone and establish the boundary between communication automation and workflows that must perform actions on data.",
    link: "/lessons/7",
    phase: "From Communication to Workflow",
    status: "planned",
  },

  {
    number: "8",
    title: "Introduction to Quickbase Pipelines",
    description:
      "Cross from automated communication into workflow automation by examining what Pipelines are, how they differ from native email mechanisms, and how triggers, steps, channels, and actions form an executable workflow.",
    link: "/lessons/8",
    phase: "Pipeline Foundations",
    status: "planned",
  },

  {
    number: "9",
    title: "Pipeline Triggers and Actions",
    description:
      "Build the first controlled Pipeline experiments and separate the event that starts a workflow from the actions Quickbase performs after that event occurs.",
    link: "/lessons/9",
    phase: "Pipeline Foundations",
    status: "planned",
  },

  {
    number: "10",
    title: "Passing Data Through a Pipeline",
    description:
      "Follow record data from one Pipeline step to another and learn how outputs from earlier steps become inputs to later actions.",
    link: "/lessons/10",
    phase: "Pipeline Foundations",
    status: "planned",
  },

  {
    number: "11",
    title: "Pipeline Conditions and Branching",
    description:
      "Carry the Boolean reasoning developed in Notification lessons into executable workflows by controlling whether Pipeline steps continue, branch, or stop according to data and conditions.",
    link: "/lessons/11",
    phase: "Pipeline Logic",
    status: "planned",
  },

  {
    number: "12",
    title: "Queries in Automation",
    description:
      "Introduce Quickbase queries as a precise language for identifying records, connecting familiar field conditions and Boolean logic with the query expressions used by more advanced automation.",
    link: "/lessons/12",
    phase: "Query-Driven Automation",
    status: "planned",
  },

  {
    number: "13",
    title: "Jinja in Pipelines",
    description:
      "Introduce Jinja as the expression and templating layer encountered in Pipelines, beginning with values and variables before progressing into transformations and conditional expressions.",
    link: "/lessons/13",
    phase: "Pipeline Logic",
    status: "planned",
  },

  {
    number: "14",
    title: "Dates, Time, and Jinja",
    description:
      "Apply Jinja to dates and time so Pipeline logic can calculate relative dates, evaluate temporal conditions, and build dynamic values from the execution context.",
    link: "/lessons/14",
    phase: "Pipeline Logic",
    status: "planned",
  },

  {
    number: "15",
    title: "Finding and Processing Records",
    description:
      "Combine queries, Pipeline steps, and Jinja to find qualifying Quickbase records and process the resulting data as part of a workflow.",
    link: "/lessons/15",
    phase: "Query-Driven Automation",
    status: "planned",
  },

  {
    number: "16",
    title: "Creating and Updating Records",
    description:
      "Move beyond communication by using Pipelines to create and modify Quickbase records, while considering execution order, conditions, data integrity, and unintended automation loops.",
    link: "/lessons/16",
    phase: "Workflow Automation",
    status: "planned",
  },

  {
    number: "17",
    title: "Relationships in Automated Workflows",
    description:
      "Use Quickbase relationships in automation by following reference and lookup data across related tables and reasoning about parent and child records inside workflow logic.",
    link: "/lessons/17",
    phase: "Workflow Automation",
    status: "planned",
  },

  {
    number: "18",
    title: "Designing Reliable Automations",
    description:
      "Bring triggers, conditions, queries, Jinja, relationships, and record actions together while examining duplicate execution, loops, failure handling, observability, and maintainable workflow design.",
    link: "/lessons/18",
    phase: "Automation Engineering",
    status: "planned",
  },
];
