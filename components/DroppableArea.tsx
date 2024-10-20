// DroppableArea.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
    id: string;
    children?: React.ReactNode;
}

const DroppableArea = ({ id, children }: DroppableAreaProps) => {
    const { setNodeRef } = useDroppable({ id });

    const style = {
        width: 100,
        height: 100,
        backgroundColor: 'lightgreen',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.2s',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
};

export default DroppableArea;
