import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddButtons from "../AddButtons/AddButtons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./itemsToAdd.css";

function ItemsToAdd({
  schema3Data,
  getItemAddStyle,
  getListItemAddStyle,
  itemsToAdd,
  handleAddItem,
}) {
  const handleAddLine = () => {
    setShowLine((prevLines) => [...prevLines, <div className="line"></div>]);
  };
  const [showLine, setShowLine] = useState([]);

  const [showFieldAndType, setShowFieldAndType] = useState(false);

  const handleMouseEnter = () => {
    setShowFieldAndType(true);
  };

  const handleMouseLeave = () => {
    setShowFieldAndType(false);
  };

  const [showAddItem, setShowAddItem] = useState(true);

  const handleMouseEnter1 = () => {
    setShowAddItem(false);
  };

  const handleMouseLeave1 = () => {
    setShowAddItem(true);
  };

  useEffect(() => {
    setShowAddItem(true);
  }, []);

  return (
    <div className="items-to-add-container">
      <AddButtons
        schema3Data={schema3Data}
        setState={schema3Data}
        handleAddLine={handleAddLine}
        handleAddItem={handleAddItem}
      />
      <Droppable key="droppableToAdd" droppableId="droppableToAdd">
        {(provided, snapshot) => {
          const isDraggingOver = snapshot.isDraggingOver;
          const listItemAddStyle = getListItemAddStyle(isDraggingOver);

          return (
            <div
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
              className="items-to-add-container"
              ref={provided.innerRef}
              style={listItemAddStyle}
              {...provided.droppableProps}
            >
              {showAddItem && !isDraggingOver && (
                <div className="add-item-div">
                  <p className="add-item-text">Sem pridajte UI položku</p>
                  <p className="add-item-text-add">
                    <AddCircleOutlineIcon fontSize="large" />
                  </p>
                </div>
              )}

              {itemsToAdd.map((item, index) => (
                <Draggable
                  key={`itemToAdd-${index}`}
                  draggableId={`itemToAdd-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemAddStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      onClick={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {showFieldAndType ? (
                        <>
                          <div className="field-type-item">
                            {item.iField} | {item.iType}
                          </div>
                        </>
                      ) : (
                        <>{item.iTitle}</>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {showLine.map((line, index) => (
                <Draggable
                  key={`line-${index}`}
                  draggableId={`line-${index}`}
                  index={index + itemsToAdd.length}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "10px",
                        backgroundColor: "#3592fc",
                        borderRadius: "3px",
                        margin: "8px 0 2.5rem 0",
                        ...provided.draggableProps.style,
                      }}
                    ></div>
                  )}
                </Draggable>
              ))}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default ItemsToAdd;