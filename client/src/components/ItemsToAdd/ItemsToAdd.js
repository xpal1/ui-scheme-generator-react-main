import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddButtons from "../AddButtons/AddButtons";
import "./itemsToAdd.css";

function ItemsToAdd({
  schema3Data,
  getItemAddStyle,
  getListItemAddStyle,
  itemsToAdd,
  handleAddItem,
}) {
  const handleAddLine = () => {
    setShowLine(true);
  };

  const [showLine, setShowLine] = useState(false);

  const [showFieldAndType, setShowFieldAndType] = useState(false);

  const handleMouseEnter = () => {
    setShowFieldAndType(true);
  };

  const handleMouseLeave = () => {
    setShowFieldAndType(false);
  };

  return (
    <div className="items-to-add-container">
      <AddButtons
        schema3Data={schema3Data}
        setState={schema3Data}
        handleAddLine={handleAddLine}
        handleAddItem={handleAddItem}
      />
      <Droppable key="droppableToAdd" droppableId="droppableToAdd">
        {(provided, snapshot) => (
          <div
            className="items-to-add-container"
            ref={provided.innerRef}
            style={getListItemAddStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {itemsToAdd.map((item, index) => (
              <Draggable
                key={item.iId}
                draggableId={`itemToAdd-${item.iId}`}
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
            {showLine && <div className="line"></div>}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ItemsToAdd;