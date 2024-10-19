import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface DraggableProps {
    name: string;
    id: string;
}

interface DroppableProps {
    isOver: boolean;
    id: string;
    children?: React.ReactNode;
}

const DraggableItem = ({ id, name }: DraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        width: 100,
        height: 100,
        backgroundColor: "lightblue",
        textAlign: "center",
        lineHeight: "100px",
        cursor: "grab",
        marginBottom: "10px" // Added margin for spacing between draggable items
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {name}
        </div>
    );
};

const DroppableArea = ({ id, isOver, children }: DroppableProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    const style = {
        width: 100,
        height: 100,
        backgroundColor: isOver ? "lightcoral" : "lightgreen",
        textAlign: "center",
        lineHeight: "100px",
        transition: "background-color 0.2s",
        position: "relative",
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children || id}
        </div>
    );
};

const DragAndDrop = () => {
    // Define droppable grid
    const numRows = 4;
    const numCols = 4;
    const dropZones = Array.from({ length: numRows * numCols }, (_, i) => `drop${i + 1}`);

    // Track the current dropbox for each draggable item
    const [droppedItems, setDroppedItems] = useState<{ [key: string]: string | null }>({
        drag1: null,
        drag2: null,
        drag3: null,
    });

    // Sidebar state for draggable items
    const [draggables, setDraggables] = useState<string[]>(["drag1", "drag2", "drag3"]);

    const [overId, setOverId] = useState<string | null>(null);

    const handleDragEnd = (event: any) => {
        const { id } = event.active; // The ID of the dragged item
        const overId = event.over?.id; // The ID of the droppable area

        if (overId) {
            setDroppedItems((prevItems) => ({
                ...prevItems,
                [id]: overId, // Update which dropbox the item is in
            }));

            // Only add a new draggable box if the item was initially in the sidebar
            if (draggables.includes(id)) {
                setDraggables((prevDraggables) => prevDraggables.filter((draggableId) => draggableId !== id));
                const newId = `drag${Object.keys(droppedItems).length + 1}`;
                setDraggables((prevDraggables) => [...prevDraggables, newId]);
                setDroppedItems((prevItems) => ({
                    ...prevItems,
                    [newId]: null, // Add new draggable to the sidebar
                }));
            }
        }
    };

    const handleDragOver = (event: any) => {
        setOverId(event.over?.id || null); // Track which droppable is being hovered
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div style={{ display: "flex", height: "50vh" }}>
                {/* Sidebar for draggable items */}
                <div style={{
                    width: "10vw",
                    minWidth: "200px",
                    padding: "20px",
                    backgroundColor: "#2e6171",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: "0px 5px 5px 0px"
                }}>
                    {/* Draggable Items */}
                    {draggables.map((dragId) => (
                        !droppedItems[dragId] && <DraggableItem key={dragId} id={dragId} name={dragId} />
                    ))}
                </div>

                {/* Main content area */}
                <div style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                        gap: "1px",
                    }}>
                        {/* Droppable Areas in a Grid */}
                        {dropZones.map((dropId) => (
                            <DroppableArea key={dropId} id={dropId} isOver={overId === dropId}>
                                {Object.keys(droppedItems).map((dragId) => (
                                    droppedItems[dragId] === dropId && <DraggableItem key={dragId} id={dragId} name={dragId} />
                                ))}
                            </DroppableArea>
                        ))}
                    </div>
                </div>
            </div>
        </DndContext>
    );
};

export default DragAndDrop;
