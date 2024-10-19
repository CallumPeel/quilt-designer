import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface DraggableProps {
    name: string;
    id: string;
}

interface DroppableProps {
    isOver: boolean;
    name: string;
    id: string;
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

const DroppableArea = ({ name, id, isOver }: DroppableProps) => {
    const { setNodeRef } = useDroppable({
        id, // Unique ID for each droppable area
    });

    const style = {
        width: 200,
        height: 200,
        backgroundColor: isOver ? "lightcoral" : "lightgreen",
        textAlign: "center",
        lineHeight: "200px",
        transition: "background-color 0.2s",
    };

    return (
        <div ref={setNodeRef} style={style}>
            {name}
        </div>
    );
};

const DragAndDrop = () => {
    const [overId, setOverId] = React.useState<string | null>(null); // Track the ID of the droppable currently hovered

    const handleDragEnd = (event: any) => {
        if (event.over && event.over.id) {
            alert(`Dropped on: ${event.over.id}`);
        }
        setOverId(null); // Reset after drop
    };

    const handleDragOver = (event: any) => {
        setOverId(event.over?.id || null); // Track the ID of the currently hovered drop area
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "50px" }}>
                <DraggableItem id="drag1" name="squarey1" />
                <DraggableItem id="drag2" name="squarey2" />

                <DroppableArea id="drop1" name="droppy1" isOver={overId === "drop1"} />
                <DroppableArea id="drop2" name="droppy2" isOver={overId === "drop2"} />
            </div>
        </DndContext>
    );
};

export default DragAndDrop;
