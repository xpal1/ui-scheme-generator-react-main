import React, { useState } from "react";
import { motion } from "framer-motion";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ConstructionIcon from "@mui/icons-material/Construction";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./bookmark.css";

function Bookmark({ active, itemsToAdd }) {
  const [tabCount, setTabCount] = useState(1);
  const [tabs, setTabs] = useState([{ id: tabCount, items: [] }]);
  const [activeTab, setActiveTab] = useState(0);

  const handleAddTab = () => {
    const newTabItems = itemsToAdd.map((item) => ({
      title: item.iTitle,
      type: item.iType,
      field: item.iField,
      required: item.iIsRequired,
      maxValue: item.iMaxValue,
      maxLength: item.iMaxLength,
      tabIndex: item.iTabIndex,
    }));
    const newTab = { id: tabCount + 1, items: newTabItems, active: false };
    setTabs([...tabs, newTab]);
    setTabCount(tabCount + 1);
    console.log(newTab);
  };

  const toggleTabContent = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].showContent = !updatedTabs[index].showContent;
    setTabs(updatedTabs);
  };

  const generateSchema = () => {
    const schema = itemsToAdd.reduce((acc, item) => {
      return {
        ...acc,
        [item.iId]: {
          title: item.iTitle,
          type: item.iType,
          field: item.iField,
          required: item.iIsRequired,
          maxValue: item.iMaxValue,
          maxLength: item.iMaxLength,
          tabIndex: item.iTabIndex,
        },
      };
    }, {});

    console.log(JSON.stringify(schema));

    const schemaJson = JSON.stringify(schema);
    const file = new Blob([schemaJson], { type: "application/json" });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generovana_schema.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bookmark-container">
      {active && (
        <div className="bookmark-container-list">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              style={{ display: activeTab === index ? "none" : "block" }}
            >
              <div
                onClick={() => toggleTabContent(index)}
                className="toggle-area"
              >
                <h2 className="zalozka-nadpis">
                  Záložka č.{index}
                  <span className="zalozka-toggle">
                    {tab.showContent ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </span>
                </h2>
              </div>

              {tab.showContent && (
                <div className="zalozka-obsah">
                  {tab.items.map((item, itemIndex) => (
                    <p key={itemIndex}>
                     {item.title} | {item.type}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-tab"
            onClick={handleAddTab}
          >
            <BookmarkAddIcon fontSize="small" /> &nbsp; Pridať záložku
          </motion.button>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="generate-schema"
            onClick={generateSchema}
          >
            <ConstructionIcon fontSize="small" /> &nbsp; Generovať schému
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Bookmark;