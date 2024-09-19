import type { FC } from "react";
import { useState, useEffect, ReactNode } from "react";
import _ from "lodash";
import { useGetTicketsAndUsersQuery } from "./services";
import type { GroupBy, SortBy, Ticket, User } from "./types";
import { getAvatarColor, getInitials } from "./utils";
import { PRIORITY_ICONS, PRIORITY_MAP, STATUS_ICONS } from "./constants";
import { KanbanCard, NavHeader } from "./components";
import "./App.css";

const App: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [groupBy, setGroupBy] = useState<GroupBy>("status");
  const [sortBy, setSortBy] = useState<SortBy>("priority");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const { data: ticketData, isLoading } = useGetTicketsAndUsersQuery();

  const userMap: _.Dictionary<User> = _.keyBy(users, "id");

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  useEffect(() => {
    if (ticketData) {
      setTickets(ticketData.tickets);
      setUsers(ticketData.users);
    }
  }, [ticketData]);

  const groupTickets = (tickets: Ticket[]) => {
    let groupedTickets: { [key: string]: Ticket[] } = {};

    groupedTickets = _.groupBy(tickets, ticket => {
      switch (groupBy) {
        case "user":
          return ticket.userId;
        case "priority":
          return PRIORITY_MAP[ticket.priority] || "Unknown";
        case "status":
        default:
          return ticket.status;
      }
    });

    const allGroups =
      groupBy === "status"
        ? ["Backlog", "Todo", "In progress", "Done", "Cancelled"]
        : groupBy === "priority"
        ? ["No priority", "Urgent", "High", "Medium", "Low"]
        : groupBy === "user"
        ? _.sortBy(Object.keys(groupedTickets), userId =>
            _.get(userMap[userId], "name", "Unknown").toLowerCase()
          )
        : Object.keys(groupedTickets);

    _.forEach(allGroups, group => {
      if (!groupedTickets[group]) {
        groupedTickets[group] = [];
      } else {
        groupedTickets[group] = _.orderBy(
          groupedTickets[group],
          [sortBy === "priority" ? "priority" : "title"],
          [sortBy === "priority" ? "desc" : "asc"]
        );
      }
    });
    return { groupedTickets, allGroups };
  };

  const { groupedTickets, allGroups } = groupTickets(tickets);

  const getHeader = (
    icon: ReactNode,
    title: string,
    numberOfEntities: number
  ) => {
    return (
      <div className="group-header">
        <div className="group-title">
          {icon}
          <span>{title}</span>
          <span>{numberOfEntities}</span>
        </div>
        <div className="group-actions">
          <img src="/add.svg" className="icon" />
          <img src="/3 dot menu.svg" className="icon" />
        </div>
      </div>
    );
  };

  const renderGroupHeader = (group: string) => {
    switch (groupBy) {
      case "status":
        return getHeader(
          <img src={STATUS_ICONS[group]} alt={group} className="group-icon" />,
          group,
          groupedTickets[group].length
        );
      case "priority":
        return getHeader(
          <img
            src={PRIORITY_ICONS[group]}
            alt={group}
            className="group-icon"
          />,
          group,
          groupedTickets[group].length
        );
      case "user":
        const userName = userMap[group]?.name || "Unknown User";
        const availabilityClass = userMap[group]?.available
          ? "available"
          : "not-available";
        return getHeader(
          <div
            className={`user-avatar ${availabilityClass}`}
            style={{ backgroundColor: getAvatarColor(group) }}
          >
            {getInitials(userName)}
            <div className="status-dot" />
          </div>,
          userName,
          1
        );
      default:
        return <span>{group}</span>;
    }
  };

  return (
    <div
      style={{
        opacity: isLoading ? 0.25 : 1,
        pointerEvents: isLoading ? "none" : "auto",
      }}
    >
      <NavHeader
        groupBy={groupBy}
        sortBy={sortBy}
        isMenuOpen={isMenuOpen}
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div className="kanban-board">
        {allGroups.map(group => (
          <div key={group} className="kanban-column">
            {renderGroupHeader(group)}
            {groupedTickets[group].length > 0 ? (
              groupedTickets[group].map(ticket => (
                <KanbanCard
                  ticket={ticket}
                  groupBy={groupBy}
                  userMap={userMap}
                />
              ))
            ) : (
              <p>No tickets available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
