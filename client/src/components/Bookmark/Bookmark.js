import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ConstructionIcon from "@mui/icons-material/Construction";
import "./bookmark.css";

function Bookmark({ active, itemsToAdd }) {
  const [tabCount, setTabCount] = useState(1);
  const [tabs, setTabs] = useState([{ id: tabCount, items: [] }]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceTab = tabs.find((tab) => tab.id === source.droppableId);
    const destinationTab = tabs.find(
      (tab) => tab.id === destination.droppableId
    );

    if (!sourceTab || !destinationTab) {
      return;
    }

    const sourceItems = Array.from(sourceTab.items);
    const destinationItems = Array.from(destinationTab.items);

    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === sourceTab.id) {
        return { ...tab, items: sourceItems };
      }
      if (tab.id === destinationTab.id) {
        return { ...tab, items: destinationItems };
      }
      return tab;
    });

    setTabs(updatedTabs);
  };

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
          <DragDropContext onDragEnd={handleDragEnd}>
            {itemsToAdd.map((item, index) => (
              <div key={item.iId}>
                <h2 className="zalozka-nadpis">Záložka č.{index + 1}</h2>
              </div>
            ))}
          </DragDropContext>
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