import React, { useState } from "react";
import { schema3Data } from "../../jsonTemplates/schema_3.js";
import ItemsContainer from "../ItemsContainer/ItemsContainer.js";
import "./mainContainer.css";

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const getItemTitle = (data) => {
      if (Array.isArray(data)) {
        const titles = [];
        data.forEach((item) => {
          const iTitle = getItemTitle(item);
          if (iTitle) {
            titles.push(iTitle);
          }
        });
        return titles;
      } else if (typeof data === "object" && data !== null) {
        if ("title" in data) {
          return data.title;
        } else {
          const titles = [];
          Object.values(data).forEach((item) => {
            const iTitle = getItemTitle(item);
            if (iTitle) {
              titles.push(iTitle);
            }
          });
          return titles;
        }
      } else {
        return undefined;
      }
    };

    const getItemType = (data) => {
      if (Array.isArray(data)) {
        const types = [];
        data.forEach((item) => {
          const iType = getItemType(item);
          if (iType) {
            types.push(iType);
          }
        });
        return types;
      } else if (typeof data === "object" && data !== null) {
        if ("type" in data) {
          return data.type;
        } else {
          const types = [];
          Object.values(data).forEach((item) => {
            const iType = getItemType(item);
            if (iType) {
              types.push(iType);
            }
          });
          return types;
        }
      } else {
        return undefined;
      }
    };

    const getItemField = (data) => {
      if (Array.isArray(data)) {
        const fields = [];
        data.forEach((item) => {
          const iField = getItemField(item);
          if (iField) {
            fields.push(iField);
          }
        });
        return fields;
      } else if (typeof data === "object" && data !== null) {
        if ("field" in data) {
          return data.field;
        } else {
          const fields = [];
          Object.values(data).forEach((item) => {
            const iField = getItemField(item);
            if (iField) {
              fields.push(iField);
            }
          });
          return fields;
        }
      } else {
        return undefined;
      }
    };

    const isRequiredItem = (data) => {
      if (Array.isArray(data)) {
        const reqItems = [];
        data.forEach((item) => {
          const isRequired = isRequiredItem(item);
          if (isRequired !== undefined) {
            reqItems.push(isRequired);
          }
        });
        return reqItems;
      } else if (typeof data === "object" && data !== null) {
        if ("required" in data) {
          return data.required;
        } else {
          const reqItems = [];
          Object.values(data).forEach((item) => {
            const isRequired = isRequiredItem(item);
            if (isRequired !== undefined) {
              reqItems.push(isRequired);
            }
          });
          return reqItems;
        }
      } else {
        return undefined;
      }
    };

    const maxInputitemValue = (data) => {
      if (Array.isArray(data)) {
        const maxValueItems = [];
        data.forEach((item) => {
          const iMaxValue = maxInputitemValue(item);
          if (iMaxValue !== undefined) {
            maxValueItems.push(iMaxValue);
          }
        });
        return maxValueItems;
      } else if (typeof data === "object" && data !== null) {
        if ("max" in data) {
          return data.max;
        } else {
          const maxValueItems = [];
          Object.values(data).forEach((item) => {
            const iMaxValue = maxInputitemValue(item);
            if (iMaxValue !== undefined) {
              maxValueItems.push(iMaxValue);
            }
          });
          return maxValueItems;
        }
      } else {
        return undefined;
      }
    };

    const maxInputitemLength = (data) => {
      if (Array.isArray(data)) {
        const maxLengthItems = [];
        data.forEach((item) => {
          const iMaxLength = maxInputitemLength(item);
          if (iMaxLength !== undefined) {
            maxLengthItems.push(iMaxLength);
          }
        });
        return maxLengthItems;
      } else if (typeof data === "object" && data !== null) {
        if ("maxLength" in data) {
          return data.maxLength;
        } else {
          const maxLengthItems = [];
          Object.values(data).forEach((item) => {
            const iMaxLength = maxInputitemLength(item);
            if (iMaxLength !== undefined) {
              maxLengthItems.push(iMaxLength);
            }
          });
          return maxLengthItems;
        }
      } else {
        return undefined;
      }
    };

    const getTabIndex = (data) => {
      if (Array.isArray(data)) {
        const tabIndexItems = [];
        data.forEach((item) => {
          const iTabIndex = getTabIndex(item);
          if (iTabIndex !== undefined) {
            tabIndexItems.push(iTabIndex);
          }
        });
        return tabIndexItems;
      } else if (typeof data === "object" && data !== null) {
        if ("tabIndex" in data) {
          return data.tabIndex;
        } else {
          const tabIndexItems = [];
          Object.values(data).forEach((item) => {
            const iTabIndex = getTabIndex(item);
            if (iTabIndex !== undefined) {
              tabIndexItems.push(iTabIndex);
            }
          });
          return tabIndexItems;
        }
      } else {
        return undefined;
      }
    };

    const itemTitle = getItemTitle(schema3Data)[k + offset];
    const itemType = getItemType(schema3Data)[k + offset];
    const itemField = getItemField(schema3Data)[k + offset];
    const itemIsRequired = isRequiredItem(schema3Data)[k + offset];
    const itemMaxValue = maxInputitemValue(schema3Data)[k + offset];
    const itemMaxLength = maxInputitemLength(schema3Data)[k + offset];
    const itemTabIndex = getTabIndex(schema3Data)[k + offset];

    // console.log(itemTitle);
    // console.log(itemType);
    // console.log(itemField);
    // console.log(itemIsRequired);
    // console.log(itemMaxValue);
    // console.log(itemMaxLength);
    // console.log(itemTabIndex);

    return {
      iId: `item-${k + offset}-${new Date().getTime()}`,
      iTitle: itemTitle,
      iType: itemType,
      iField: itemField,
      iIsRequired: itemIsRequired,
      iMaxValue: itemMaxValue,
      iMaxLength: itemMaxLength,
      iTabIndex: itemTabIndex
    };
  });

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  width: "85%",
  borderRadius: "10px",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "whitesmoke",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getItemAddStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "15px 15px 0px 15px",
  borderRadius: "10px",
  margin: `0 0 ${grid}px 0`,
  width: "auto",
  height: "10%",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "whitesmoke",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  paddingLeft: grid * 1.8,
  paddingTop: grid * 1.8,
  paddingBottom: grid,
  width: 400,
  height: 620,
  borderRadius: "10px",
  marginLeft: "0.5rem",
  marginRight: "1rem",
  marginTop: "0.5rem",
  marginBottom: "0.6rem",
  overflowY: "auto",
  overflowX: "hidden",
});

const getListItemAddStyle = (isDraggingOver) => ({
  background: "rgb(133, 187, 250)",
  padding: grid,
  width: "auto",
  height: 550,
  borderRadius: "10px",
  marginBottom: "0.85rem",
  overflow: "auto",
  borderStyle: "dashed",
  borderColor: "whitesmoke",
  borderWidth: "5px",
  backgroundImage: isDraggingOver
    ? "repeating-linear-gradient(-45deg, whitesmoke, rgb(89, 165, 253) 2px, transparent 2px, transparent 20px)"
    : "none",
});

function MainContainer() {
  const [schema3Data, setState] = useState([getItems(20)]);

  return (
    <div className="main-container">
      <ItemsContainer
        schema3Data={schema3Data}
        setState={setState}
        getListStyle={getListStyle}
        getItemStyle={getItemStyle}
        getItemAddStyle={getItemAddStyle}
        getListItemAddStyle={getListItemAddStyle}
      />
    </div>
  );
}

export default MainContainer;