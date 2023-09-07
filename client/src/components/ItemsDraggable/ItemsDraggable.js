import React from "react";
import ItemsList from "../ItemsList/ItemsList";
import "./itemsDraggable.css";

function ItemsDraggable({
  provided,
  getItemStyle,
  snapshot,
  schema,
  newState,
  itemKey,
  setState,
}) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <ItemsList
        schema={schema}
        newState={newState}
        setState={setState}
        itemKey={itemKey}
      />
    </div>
  );
}

export default ItemsDraggable;