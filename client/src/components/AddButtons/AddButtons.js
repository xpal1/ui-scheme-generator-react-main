import React from "react";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./addButtons.css";

function AddButtons({ handleAddGroup }) {
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
        onClick={handleAddGroup}
      >
        <AddCircleOutlineIcon fontSize="small" /> &nbsp; Pridať čiaru
      </motion.button>
    </div>
  );
}

export default AddButtons;