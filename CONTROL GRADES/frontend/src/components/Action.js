import React from "react";

export default function Action({ onActionClick, id, type }) {
  function handleIconClick() {
    onActionClick(id, type);
  }
  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: "pointer" }}
    >
      {type}
    </span>
  );
}
