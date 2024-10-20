import { DndContext } from '@dnd-kit/core';
import React, { useState } from 'react';
import DraggableItem from '../../components/DraggableItem';
import DroppableArea from '../../components/DroppableArea';
import { SHAPES } from '../../utils/shapeTypes';

const DragAndDrop: React.FC = () => {
    const numRows = 4;
    const numCols = 4;
    const dropZones = Array.from({ length: numRows * numCols }, (_, i) => `drop${i + 1}`);

    const [droppedItems, setDroppedItems] = useState<{ [key: string]: { dropId: string; shape: string } | null }>({});

    const handleDragEnd = (event: any) => {
        const { id } = event.active;
        const overId = event.over?.id;

        if (!overId) {
            setDroppedItems((prevItems) => {
                const newItems = { ...prevItems };
                delete newItems[id];
                return newItems;
            });
        } else {
            const draggedShape = SHAPES[id];
            const newId = `grid-item-${Date.now()}`;
            setDroppedItems(prevItems => ({
                ...prevItems,
                [newId]: { dropId: overId, shape: id }
            }));
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', height: '50vh' }}>
                <div style={{
                    width: 200,
                    backgroundColor: '#2e6171',
                    padding: '20px',
                    gap: '10px'
                }}>
                    {Object.keys(SHAPES).map((key) => (
                        <DraggableItem key={key} id={key} shape={key} size={100} />
                    ))}
                </div>

                <div style={{
                    // flexGrow: 1,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                    gap: '10px',
                    padding: '20px',
                    alignContent: 'center'
                }}>
                    {dropZones.map((dropId) => (
                        <DroppableArea key={dropId} id={dropId}>
                            {Object.keys(droppedItems).map(dragId => (
                                droppedItems[dragId]?.dropId === dropId && (
                                    <DraggableItem
                                        key={dragId}
                                        id={dragId}
                                        shape={droppedItems[dragId]?.shape}
                                        size={100}
                                    />
                                )
                            ))}
                        </DroppableArea>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

export default DragAndDrop;
