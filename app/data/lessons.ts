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
    phase: "Understanding Quickbase Communication",
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
      "Investigate what Quickbase evaluates when record activity occurs by separating record events, changed-field criteria, previous values, current values, and conditions that are true after the change.",
    link: "/lessons/3a",
    phase: "Event-Driven Communication",
    status: "complete",
  },
  {
    number: "3B",
    title: "Notification Logic: Conditions & Boolean Evaluation",
    description:
      "Build on Notification mechanics by translating Quickbase criteria into Boolean logic, testing all versus any, combining field-change and after-change conditions, and introducing grouped criteria and evaluation funnels.",
    link: "/lessons/3b",
    phase: "Event-Driven Communication",
    status: "current",
  },
  {
    number: "4",
    title: "Before and After",
    description:
      "Investigate previous and current field values as evidence of a record transition, distinguish resulting state from the path taken to reach it, and explore what Notifications can reveal about that transition.",
    link: "/lessons/4",
    phase: "Understanding Change",
    status: "planned",
  },
  {
    number: "5",
    title: "Building Useful Notification Content",
    description:
      "Turn experimental Notifications into meaningful communication using field references, previous values, Quickbase markers, record links, message formatting, and other dynamic record context.",
    link: "/lessons/5",
    phase: "Understanding Change",
    status: "planned",
  },
  {
    number: "6",
    title: "Who Receives the Message?",
    description:
      "Explore fixed recipients, User fields, email fields, and dynamic recipients while learning how record data can determine who receives an automated message.",
    link: "/lessons/6",
    phase: "People, Recipients, and Security",
    status: "planned",
  },
  {
    number: "7",
    title: "Permissions Are Part of Automation",
    description:
      "Examine recipient access, permission type, authorization context, external recipients, and why deciding who may receive or view automated information is part of automation design.",
    link: "/lessons/7",
    phase: "People, Recipients, and Security",
    status: "planned",
  },
  {
    number: "8",
    title: "Nothing Changed, but Something Happened",
    description:
      "Leave record-change events behind temporarily and introduce time-driven communication through Reminders, where dates stored in records can matter even when nobody edits the record.",
    link: "/lessons/8",
    phase: "Time-Driven Communication",
    status: "planned",
  },
  {
    number: "9",
    title: "Event Time Versus Record Time",
    description:
      "Compare automation caused by record changes with automation driven by dates and time, and learn to recognize which timing model a business requirement actually describes.",
    link: "/lessons/9",
    phase: "Time-Driven Communication",
    status: "planned",
  },
  {
    number: "10",
    title: "Report Subscriptions",
    description:
      "Use reports to define what information matters and Subscriptions to define when that information is delivered, introducing report-driven communication as a third automation model.",
    link: "/lessons/10",
    phase: "Report-Driven Communication",
    status: "planned",
  },
  {
    number: "11",
    title: "Personalized Reports and Execution Context",
    description:
      "Explore how permissions, users, and execution context can cause the same report to expose different information to different recipients.",
    link: "/lessons/11",
    phase: "Report-Driven Communication",
    status: "planned",
  },
  {
    number: "12",
    title: "Custom Emails",
    description:
      "Bring record-change and scheduled communication concepts together using Quickbase's modern Custom Email system, comparing its capabilities with the Notification model already explored.",
    link: "/lessons/12",
    phase: "The Modern Email Model",
    status: "planned",
  },
  {
    number: "13",
    title: "Choosing the Simplest Correct Tool",
    description:
      "Compare Notifications, Reminders, Subscriptions, and Custom Emails through realistic requirements and learn to choose the simplest native Quickbase mechanism that correctly solves the problem.",
    link: "/lessons/13",
    phase: "The Modern Email Model",
    status: "planned",
  },
  {
    number: "14",
    title: "When Sending an Email Isn't Enough",
    description:
      "Identify requirements that exceed communication alone and recognize the boundary where a notification mechanism must give way to a workflow engine capable of taking actions.",
    link: "/lessons/14",
    phase: "Where Email Automation Ends",
    status: "planned",
  },
];
