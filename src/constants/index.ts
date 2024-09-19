export const STATUS_ICONS: { [key: string]: string } = {
  Backlog: "/Backlog.svg",
  Todo: "/To-do.svg",
  "In progress": "/in-progress.svg",
  Done: "/Done.svg",
  Cancelled: "/Cancelled.svg",
};

export const PRIORITY_ICONS: { [key: string]: string } = {
  Urgent: "/SVG - Urgent Priority colour.svg",
  High: "/Img - High Priority.svg",
  Medium: "/Img - Medium Priority.svg",
  Low: "/Img - Low Priority.svg",
  "No priority": "/No-priority.svg",
};

export const PRIORITY_MAP: { [key: number]: string } = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};
