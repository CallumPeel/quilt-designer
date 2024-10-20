import React from 'react';

interface ShapeProps {
    size: number;
    color1?: string;
    color2?: string;
}

export const YellowSquare = ({ size }: ShapeProps) => (
    <div style={{ width: size, height: size, backgroundColor: 'yellow' }} />
);

export const BlueSquare = ({ size }: ShapeProps) => (
    <div style={{ width: size, height: size, backgroundColor: 'blue' }} />
);

export const HalfSquareTriangle = ({ size, color1, color2 }: ShapeProps & { color1: string; color2: string }) => (
    <div style={{ position: 'relative', width: size, height: size, overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: `${size}px solid ${color1}`,
            borderBottom: `${size}px solid ${color2}`
        }} />
    </div>
);

// Add more shapes like QuarterSquareTriangle, FlyingGeese, etc.
