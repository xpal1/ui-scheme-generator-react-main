import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./itemsList.css";

function ItemsList({ schema, newState, itemKey, index, setState }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {schema.iTitle}
      <input
        type={schema.iType}
        field={schema.iField}
        required={schema.iIsRequired}
        max={schema.iMaxValue}
        maxLength={schema.iMaxLength}
        tabIndex={schema.iTabIndex}
      />
      <button
        type="button"
        className="delete-btn"
        onClick={() => {
          newState[itemKey] = newState[itemKey] || [];
          newState[itemKey].splice(index, 1);
          setState(newState.filter((group) => group.length));
        }}
      >
        <DeleteOutlineIcon />
      </button>
    </div>
  );
}

export default ItemsList;