import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { SHAPES } from '../utils/shapeTypes';

const DraggableItem = ({ id, shape, size }: { id: string, shape: string, size: number }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        width: isDragging ? 100 : size,
        height: isDragging ? 100 : size,
        zIndex: isDragging ? 1000 : 'auto',
        cursor: "grab",
        position: isDragging ? 'fixed' : 'relative',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {SHAPES[shape]} {/* Render shape from shapeTypes */}
        </div>
    );
};

export default DraggableItem;
