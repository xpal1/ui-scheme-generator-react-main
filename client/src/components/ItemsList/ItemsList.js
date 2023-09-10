import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InfoIcon from "@mui/icons-material/Info";
import "./itemsList.css";

function ItemsList({ schema }) {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="items-list-container">
      <div className="items-list-header">
        {schema.iTitle} &nbsp;{" "}
        <InfoIcon onClick={toggleInfo} sx={{ color: "#0e94e2" }} />
        <button
          type="button"
          className="info-dropdown-btn"
          onClick={toggleInfo}
        >
          {showInfo ? (
            <ExpandLessIcon sx={{ ml: "-1rem" }} />
          ) : (
            <ExpandMoreIcon sx={{ ml: "-1rem" }} />
          )}
        </button>
      </div>
      {showInfo && (
        <div className="info-dropdown-content">
          <p>Názov položky: {schema.iTitle}</p>
          <p>Typ položky: {schema.iType}</p>
          <p>Popis (pole) položky: {schema.iField}</p>
          <p>Je povinná: {schema.iIsRequired ? "áno" : "nie"}</p>
          <p>
            Maximálna hodnota:{" "}
            {schema.iMaxValue ? schema.iMaxValue : "nie je určená"}
          </p>
          <p>
            Maximálna dĺžka:{" "}
            {schema.iMaxLength ? schema.iMaxLength : "nie je určená"}
          </p>
          <p>Tab Index: {schema.iTabIndex}</p>
        </div>
      )}
    </div>
  );
}

export default ItemsList;