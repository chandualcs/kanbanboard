export type GroupBy = "status" | "user" | "priority";
export type SortBy = "priority" | "title";

export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

export interface User {
  id: string;
  name: string;
  available: boolean;
}

export interface TicketServiceApiResponse {
  tickets: Ticket[];
  users: User[];
}
