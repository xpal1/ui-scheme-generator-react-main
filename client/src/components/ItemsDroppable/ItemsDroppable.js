import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ItemsDraggable from "../ItemsDraggable/ItemsDraggable";
import Typewriter from "typewriter-effect";
import "./itemsDroppable.css";

function ItemsDroppable({
  provided,
  getListStyle,
  snapshot,
  schema,
  getItemStyle,
  schema3Data,
  itemKey,
  setState,
}) {
  const newState = [...schema3Data];

  const title = "Pre poskladanie UI schémy presuňte ľubovoľnú položku myšou";

  const [showTypewriter, setShowTypewriter] = useState(false);

  const handleMouseEnter = () => {
    setShowTypewriter(true);
  };

  const handleMouseLeave = () => {
    setShowTypewriter(false);
  };
  return (
    <div
      ref={provided.innerRef}
      style={getListStyle(snapshot.isDraggingOver)}
      {...provided.droppableProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!showTypewriter && (
        <h3 className="uvod-items">
          <Typewriter
            options={{
              strings: [title],
              autoStart: true,
              loop: false,
              cursor: " >>",
              pauseFor: Number.MAX_SAFE_INTEGER,
              delay: 20,
            }}
          />
        </h3>
      )}
      {schema.map((schema, index) => (
        <Draggable key={schema.iId} draggableId={schema.iId} index={index}>
          {(provided, snapshot) => (
            <ItemsDraggable
              provided={provided}
              snapshot={snapshot}
              getItemStyle={getItemStyle}
              schema={schema}
              newState={newState}
              setState={setState}
              itemKey={itemKey}
            />
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
}

export default ItemsDroppable;