import type { FC } from "react";
import { getAvatarColor, getInitials } from "../utils";
import { PRIORITY_ICONS, PRIORITY_MAP, STATUS_ICONS } from "../constants";
import type { GroupBy, Ticket, User } from "../types";

interface KanbanCardProps {
  ticket: Ticket;
  groupBy: GroupBy;
  userMap: _.Dictionary<User>;
}

const KanbanCard: FC<KanbanCardProps> = ({ ticket, groupBy, userMap }) => {
  return (
    <div key={ticket.id} className="kanban-card">
      <div className="card-header">
        <span style={{ color: "grey" }}>{ticket.id}</span>
        {groupBy !== "user" && (
          <div
            className={`user-avatar ${
              userMap[ticket.userId]?.available ? "available" : "not-available"
            }`}
            style={{
              backgroundColor: getAvatarColor(ticket.userId),
            }}
          >
            {getInitials(userMap[ticket.userId]?.name || "Unknown User")}
            <div className="status-dot" />
          </div>
        )}
      </div>
      <div className="card-row">
        {groupBy !== "status" && (
          <img
            src={STATUS_ICONS[ticket.status]}
            alt={ticket.status}
            className="group-icon"
          />
        )}
        <h5>{ticket.title}</h5>
      </div>
      <div className="card-row">
        {groupBy !== "priority" && (
          <div className="card-footer">
            <img
              src={PRIORITY_ICONS[PRIORITY_MAP[ticket.priority]]}
              alt={PRIORITY_MAP[ticket.priority]}
              className="priority-icon"
            />
          </div>
        )}
        {ticket.tag.map((tag, index) => (
          <div className="card-footer">
            <span className="tag-dot" />
            <h6 key={index} style={{ margin: 0 }}>
              {tag}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanCard;
