import React, { useState } from "react";
import { motion } from "framer-motion";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ConstructionIcon from "@mui/icons-material/Construction";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import "./bookmark.css";

function Bookmark({ active, itemsToAdd, newItem }) {
  const [tabCount, setTabCount] = useState(1);
  const [tabs, setTabs] = useState([{ id: tabCount, items: [] }]);
  const [activeTab, setActiveTab] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [newTitle, setNewTitle] = useState("");

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
    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      updatedTabs[index].showContent = !updatedTabs[index].showContent;
      return updatedTabs;
    });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setNewTitle(tabs[index].title);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSave = (index) => {
    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs];
      updatedTabs[index].title = newTitle;
      console.log(newTitle);
      return updatedTabs;
    });
    setEditIndex(null);
  };

  const handleRemove = (index) => {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    setTabs(updatedTabs);
  };

  const generateSchema = () => {
    const schema = itemsToAdd.reduce((acc, item) => {
      return [
        ...acc,
        [
          {
            nazovZalozky: newTitle,
          },
          [
            [
              {
                title: item.iTitle,
                type: item.iType,
                field: item.iField,
                required: item.iIsRequired,
                maxValue: item.iMaxValue,
                maxLength: item.iMaxLength,
                tabIndex: item.iTabIndex,
              },
            ],
          ],
          [
            [
              {
                vlastnaPolozka: newItem.iTitle,
              },
            ]
          ],
        ],
      ];
    }, []);


    const schemaJson = JSON.stringify(schema, null, 2);
    console.log(schemaJson);

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
                  {index}.&nbsp;
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={handleTitleChange}
                        className="zalozka-nazov"
                        required="true"
                        autoFocus="true"
                        placeholder="Zadajte názov záložky"
                      />
                      <SaveIcon
                        className="save-btn"
                        onClick={() => handleSave(index)}
                      />
                    </>
                  ) : (
                    <>
                      {tab.title}
                      <EditIcon
                        className="edit-btn"
                        onClick={() => handleEditClick(index)}
                      />
                      <DeleteIcon
                      className="delete-bookmark-btn"
                      onClick={() => handleRemove(index)}
                    />
                    </>
                  )}
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