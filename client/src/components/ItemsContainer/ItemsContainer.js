import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ItemsDroppable from "../ItemsDroppable/ItemsDroppable";
import ItemsToAdd from "../ItemsToAdd/ItemsToAdd";
import Bookmark from "../Bookmark/Bookmark";
import "./itemsContainer.css";

function ItemsContainer({
  schema3Data,
  getListStyle,
  getListItemAddStyle,
  getItemStyle,
  getItemAddStyle,
  setState,
}) {
  const [itemsToAdd, setItemsToAdd] = React.useState([]);

  const handleAddItem = (newItem) => {
    setItemsToAdd((prevItems) => [...prevItems, newItem]);
    console.log("newItem", newItem);
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // ak neexistuje pole tak sa vytvori nove
    if (!schema3Data[sInd]) {
      schema3Data[sInd] = [];
    }

    const draggedItem = schema3Data[sInd].find(
      (item) => item.iId === draggableId
    );

    setState((prevState) => {
      const newState = [...prevState];

      // ak neexistuje pole tak sa vytvori nove
      if (!newState[sInd]) {
        newState[sInd] = [];
      }

      if (!newState[dInd]) {
        newState[dInd] = [];
      }

      newState[sInd].splice(source.index, 1);
      newState[dInd].splice(destination.index, 0, draggedItem);
      return newState;
    });

    if (source.droppableId === "droppableToAdd") {
      setItemsToAdd((prevItems) =>
        prevItems.filter((item) => item.iId !== draggableId)
      );
      setState((prevState) => {
        const newState = [...prevState];
        if (!newState[dInd]) {
          newState[dInd] = [];
        }
        newState[dInd].splice(destination.index, 0, draggedItem);
        return newState;
      });
    } else if (destination.droppableId === "droppableToAdd") {
      setItemsToAdd((prevItems) => [...prevItems, draggedItem]);
      setState((prevState) => {
        const newState = [...prevState];
        newState[sInd].splice(source.index, 1);
        return newState;
      });
    }
  };

  const [tabs] = useState([{ items: [], active: true }]);

  return (
    <div className="items-div">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="items-container">
          {schema3Data.map((schema, key) => (
            <Droppable key={key} droppableId={`${key}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <ItemsDroppable
                    snapshot={snapshot}
                    provided={provided}
                    schema3Data={schema3Data}
                    schema={schema}
                    setState={setState}
                    itemKey={key}
                    getListStyle={getListStyle}
                    getItemStyle={getItemStyle}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
        <ItemsToAdd
          handleAddItem={handleAddItem}
          itemsToAdd={itemsToAdd}
          getListItemAddStyle={getListItemAddStyle}
          getItemAddStyle={getItemAddStyle}
          schema3Data={schema3Data}
        />
        {tabs.map((tab, index) => (
          <Bookmark key={index} itemsToAdd={itemsToAdd} active={tab.active} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default ItemsContainer;