import React, { useState } from "react";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import "./addButtons.css";

function AddButtons({ handleAddLine, handleAddItem }) {
  const [showCustomItemInput, setShowCustomItemInput] = useState(false);
  const [customItemName, setCustomItemName] = useState("");

  const handleAddCustomItem = () => {
    if (customItemName !== "") {
      const customItem = {
        iId: customItemName,
        iTitle: customItemName,
        iType: "vlastná položka",
      };
      handleAddItem(customItem);
      console.log(customItem);
    }
    setShowCustomItemInput(false);
    setCustomItemName("");
  };
  return (
    <div>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        className="add-group-btn"
        onClick={handleAddLine}
      >
        <HorizontalRuleIcon fontSize="small" /> &nbsp; Pridať čiaru
      </motion.button>
      {!showCustomItemInput && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="add-group-btn"
          onClick={() => setShowCustomItemInput(true)}
        >
          <AppRegistrationIcon fontSize="small" /> &nbsp; Pridať vlastnú
          položku
        </motion.button>
      )}
      {showCustomItemInput && (
        <div>
          <input
            className="input-custom"
            type="text"
            value={customItemName}
            onChange={(e) => setCustomItemName(e.target.value)}
            placeholder="Zadajte názov vlastnej položky"
          />
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="add-custom-btn"
            onClick={handleAddCustomItem}
          >
            <CheckCircleOutlineIcon fontSize="small" />
            Pridať
          </motion.button>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="cancel-custom-btn"
            onClick={() => setShowCustomItemInput(false)}
          >
            <HighlightOffIcon fontSize="small" />
            Zrušiť
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default AddButtons;