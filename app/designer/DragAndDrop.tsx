import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface DraggableProps {
    id: string;
    shape: string;
    size: number;
}

interface DroppableProps {
    id: string;
    children?: React.ReactNode;
}

// Shape Components
const YellowSquare = ({ size }: { size: number }) => (
    <div style={{ width: size, height: size, backgroundColor: 'yellow' }} />
);

const BlueSquare = ({ size }: { size: number }) => (
    <div style={{ width: size, height: size, backgroundColor: 'blue' }} />
);

// Triangle from top-left to bottom-right (yellow and blue)
const TopLeftToBottomRightTriangle = ({ size }: { size: number }) => (
    <div style={{ position: 'relative', width: size, height: size, overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid yellow`,
            borderBottom: `${size}px solid blue`
        }} />
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderRight: `${size}px solid blue`,
            borderTop: `${size}px solid yellow`,
            right: 0,
            bottom: 0
        }} />
    </div>
);

// Triangle from top-right to bottom-left (yellow and blue)
const TopRightToBottomLeftTriangle = ({ size }: { size: number }) => (
    <div style={{ position: 'relative', width: size, height: size, overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderRight: `${size}px solid yellow`,
            borderBottom: `${size}px solid blue`
        }} />
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid blue`,
            borderTop: `${size}px solid yellow`,
            right: 0,
            bottom: 0
        }} />
    </div>
);

// Triangle from bottom-left to top-right (yellow and blue)
const BottomLeftToTopRightTriangle = ({ size }: { size: number }) => (
    <div style={{ position: 'relative', width: size, height: size, overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid yellow`,
            borderTop: `${size}px solid blue`
        }} />
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderRight: `${size}px solid blue`,
            borderBottom: `${size}px solid yellow`,
            right: 0,
            bottom: 0
        }} />
    </div>
);

// Triangle from bottom-right to top-left (yellow and blue)
const BottomRightToTopLeftTriangle = ({ size }: { size: number }) => (
    <div style={{ position: 'relative', width: size, height: size, overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderRight: `${size}px solid yellow`,
            borderTop: `${size}px solid blue`
        }} />
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid blue`,
            borderBottom: `${size}px solid yellow`,
            right: 0,
            bottom: 0
        }} />
    </div>
);

const DraggableItem = ({ id, shape, size }: DraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        width: size,
        height: size,
        marginBottom: "10px",
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {shape === 'yellowSquare' && <YellowSquare size={size} />}
            {shape === 'blueSquare' && <BlueSquare size={size} />}
            {shape === 'topLeftToBottomRightTriangle' && <TopLeftToBottomRightTriangle size={size} />}
            {shape === 'topRightToBottomLeftTriangle' && <TopRightToBottomLeftTriangle size={size} />}
            {shape === 'bottomLeftToTopRightTriangle' && <BottomLeftToTopRightTriangle size={size} />}
            {shape === 'bottomRightToTopLeftTriangle' && <BottomRightToTopLeftTriangle size={size} />}
        </div>
    );
};

const DroppableArea = ({ id, children }: DroppableProps) => {
    const { setNodeRef } = useDroppable({ id });

    const style = {
        width: 100,
        height: 100,
        backgroundColor: "lightgreen",
        transition: "background-color 0.2s",
        position: "relative",
        overflow: "hidden",
    };

    return <div ref={setNodeRef} style={style}>{children}</div>;
};

const DragAndDrop = () => {
    const numRows = 4;
    const numCols = 4;
    const dropZones = Array.from({ length: numRows * numCols }, (_, i) => `drop${i + 1}`);

    const initialDraggables = [
        { id: 'drag1', shape: 'yellowSquare' },
        { id: 'drag2', shape: 'blueSquare' },
        { id: 'drag3', shape: 'topLeftToBottomRightTriangle' },
        { id: 'drag4', shape: 'topRightToBottomLeftTriangle' },
        { id: 'drag5', shape: 'bottomLeftToTopRightTriangle' },
        { id: 'drag6', shape: 'bottomRightToTopLeftTriangle' },
    ];

    const [droppedItems, setDroppedItems] = useState<{ [key: string]: { dropId: string; shape: string } | null }>({});
    const [sidebarShapes] = useState(initialDraggables); // Sidebar shapes don't change after the initial load

    const handleDragEnd = (event: any) => {
        const { id } = event.active;
        const overId = event.over?.id;

        const isTileOccupied = Object.values(droppedItems).some(item => item?.dropId === overId);

        if (!isTileOccupied && overId) {
            const draggedItem = sidebarShapes.find(item => item.id === id);

            if (draggedItem) {
                const newId = `grid-item-${Date.now()}`;
                setDroppedItems(prevItems => ({
                    ...prevItems,
                    [newId]: { dropId: overId, shape: draggedItem.shape },
                }));
            } else {
                // If the shape is already on the grid, move it
                setDroppedItems(prevItems => ({
                    ...prevItems,
                    [id]: { dropId: overId, shape: prevItems[id]?.shape || 'yellowSquare' },
                }));
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", height: "50vh" }}>
                <div style={{
                    padding: "5vh",
                    backgroundColor: "#2e6171",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: "0px 5px 5px 0px"
                }}>
                    {sidebarShapes.map(({ id, shape }) => (
                        <DraggableItem key={id} id={id} shape={shape} size={50} />
                    ))}
                </div>

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
                        {dropZones.map((dropId) => (
                            <DroppableArea key={dropId} id={dropId}>
                                {Object.keys(droppedItems).map(dragId => (
                                    droppedItems[dragId]?.dropId === dropId && (
                                        <DraggableItem
                                            key={dragId}
                                            id={dragId}
                                            shape={droppedItems[dragId]?.shape || 'yellowSquare'}
                                            size={100}
                                        />
                                    )
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
