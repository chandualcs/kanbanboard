import type { FC } from "react";
import { useEffect, useRef } from "react";
import type { GroupBy, SortBy } from "../types";

interface NavHeaderProps {
  groupBy: string;
  sortBy: string;
  isMenuOpen: boolean;
  setGroupBy: (groupBy: GroupBy) => void;
  setSortBy: (sortBy: SortBy) => void;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const NavHeader: FC<NavHeaderProps> = ({
  groupBy,
  sortBy,
  isMenuOpen,
  setGroupBy,
  setSortBy,
  setIsMenuOpen,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleCardVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <button className="navbar-button" onClick={toggleCardVisibility}>
          <img src="/Display.svg" alt="Menu Icon" className="icon" />
          Display
          <img src="/down.svg" alt="Menu Icon" className="icon" />
        </button>
      </nav>
      {isMenuOpen && (
        <div className="dropdown-card" ref={cardRef}>
          <div className="card-options">
            <h5 style={{ margin: 0 }}>Grouping</h5>
            <select
              value={groupBy}
              className="dropdown"
              onChange={e => {
                setGroupBy(e.target.value as GroupBy);
                toggleCardVisibility();
              }}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="card-options">
            <h5 style={{ margin: 0 }}>Ordering</h5>
            <select
              value={sortBy}
              className="dropdown"
              onChange={e => {
                setSortBy(e.target.value as SortBy);
                toggleCardVisibility();
              }}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default NavHeader;
