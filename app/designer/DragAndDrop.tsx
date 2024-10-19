import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface DraggableProps {
    name: string;
    id: string;
}

interface DroppableProps {
    isOver: boolean;
    name: string;
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
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {name}
        </div>
    );
};

const DroppableArea = ({ name, id, isOver, children }: DroppableProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    const style = {
        width: 100,
        height: 100,
        backgroundColor: isOver ? "lightcoral" : "lightgreen",
        textAlign: "center",
        lineHeight: "200px",
        transition: "background-color 0.2s",
        position: "relative",
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children || name}
        </div>
    );
};

const DragAndDrop = () => {
    // Track the current dropbox for each draggable item
    const [droppedItems, setDroppedItems] = useState<{ [key: string]: string | null }>({
        drag1: null,
        drag2: null,
        drag3: null,
    });

    // Track which drop areas are already filled
    const filledDropBoxes = Object.values(droppedItems);

    const [overId, setOverId] = useState<string | null>(null);

    const handleDragEnd = (event: any) => {
        const { id } = event.active; // The ID of the dragged item
        const overId = event.over?.id; // The ID of the droppable area

        if (overId && !filledDropBoxes.includes(overId)) {
            // Check if the drop area is not already filled
            setDroppedItems((prevItems) => ({
                ...prevItems,
                [id]: overId, // Update which dropbox the item is in
            }));
        }
    };

    const handleDragOver = (event: any) => {
        setOverId(event.over?.id || null); // Track which droppable is being hovered
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div>
                {/* Draggable Items */}
                {!droppedItems.drag1 && <DraggableItem id="drag1" name="squarey1" />}
                {!droppedItems.drag2 && <DraggableItem id="drag2" name="squarey2" />}
                {!droppedItems.drag3 && <DraggableItem id="drag3" name="squarey3" />}
            </div>

            <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}>
                {/* Droppable Areas */}
                <DroppableArea
                    id="drop1"
                    name="droppy1"
                    isOver={overId === "drop1"}>
                    {droppedItems.drag1 === "drop1" && <DraggableItem id="drag1" name="squarey1" />}
                    {droppedItems.drag2 === "drop1" && <DraggableItem id="drag2" name="squarey2" />}
                    {droppedItems.drag3 === "drop1" && <DraggableItem id="drag3" name="squarey3" />}
                </DroppableArea>

                <DroppableArea id="drop2" name="droppy2" isOver={overId === "drop2"}>
                    {droppedItems.drag1 === "drop2" && <DraggableItem id="drag1" name="squarey1" />}
                    {droppedItems.drag2 === "drop2" && <DraggableItem id="drag2" name="squarey2" />}
                    {droppedItems.drag3 === "drop2" && <DraggableItem id="drag3" name="squarey3" />}
                </DroppableArea>
            </div>
        </DndContext>
    );
};

export default DragAndDrop;
