import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const tasks = [
    { id: "1", content: "First task" },
    { id: "2", content: "Second task" },
    { id: "3", content: "Third task" },
    { id: "4", content: "Fourth task" },
    { id: "5", content: "Fifth task" },
    { id: "6", content: "6 task" },
    { id: "7", content: "7 task" },
    { id: "8", content: "8 task" },
    { id: "9", content: "9 task" },
    { id: "10", content: "10 task" },
    { id: "11", content: "11 task" },
    { id: "12", content: "12 task" },
    { id: "13", content: "13 task" },
];

const taskStatus = {
    requested: {
        name: "Requested",
        items: [],
    },
    toDo: {
        name: "To do",
        items: tasks,
    },
    inProgress: {
        name: "In Progress",
        items: [],
    },
    done: {
        name: "Done",
        items: [],
    },
};

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

const handleScroll = (e) => {
    console.log("sdfdsf");
    // Check if the user is dragging and if they are near the top or bottom of the container
    if (e.clientY < 100) {
      // Scroll up
      e.currentTarget.scrollTop -= 20;
    } else if (e.clientY > window.innerHeight - 100) {
      // Scroll down
      e.currentTarget.scrollTop += 20;
    }
  };

//   var root = document.documentElement;
// const lists = document.querySelectorAll('.item_main'); 



function  DragAndDrop() {
    const [columns, setColumns] = useState(taskStatus);
    return (

        <div style={{ overflowX: "auto" }}>
            <h1 style={{ textAlign: "center" }}>Jira Board</h1>
            <div
                style={{
                    display: "flex",
                    height: "500px",
                    overflowX: "auto", 
                    
                }}
                className="item_main"
            >
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                key={columnId}
                                className="items_wrap"
                            >
                                <h2>{column.name}</h2>
                                <div style={{ margin: 8, minWidth: 250, }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 4,
                                                        minHeight: 500,
                                                        // overflow: "auto"
                                                    }}
                                                    onDragOver={handleScroll}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style,
                                                                            }}
                                                                        >
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default DragAndDrop;
