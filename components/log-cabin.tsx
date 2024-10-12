import Head from 'next/head';
import React, { useState } from 'react';

const borderStyles = ['Flying Geese', 'Herringbone', 'Delectable Mountain', 'Pinwheels', 'Tipped Bricks', 'Crossovers'];

const LogCabinCalculator: React.FC = () => {
    const [blockSize, setBlockSize] = useState(12); // Default block size in inches
    const [rows, setRows] = useState(5); // Default quilt rows
    const [cols, setCols] = useState(5); // Default quilt columns
    const [seamAllowance, setSeamAllowance] = useState(0.25); // Default seam allowance in inches
    const [quiltWidth, setQuiltWidth] = useState<number | null>(null); // Total quilt width
    const [quiltHeight, setQuiltHeight] = useState<number | null>(null); // Total quilt height
    const [centerColor, setCenterColor] = useState("#ff0000"); // Default center color (red)
    const [stripColors, setStripColors] = useState<string[]>(["#ffcc00", "#ff9900", "#ff6600", "#ff3300"]); // Default strip colors
    const [diagramUrl, setDiagramUrl] = useState<string | null>(null);
    const [borderStyle, setBorderStyle] = useState(borderStyles[0]); // Default border style
    const [borderWidth, setBorderWidth] = useState(4); // Default border width in inches

    // Calculate block size automatically if quilt width and height are provided
    const calculateBlockSize = () => {
        if (quiltWidth && quiltHeight) {
            const newBlockSize = Math.min(quiltWidth / cols, quiltHeight / rows);
            setBlockSize(newBlockSize);
        }
    };

    // Function to handle drawing the quilt diagram including borders
    const drawQuiltDiagram = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Set canvas size based on quilt size and border
        const scale = 40; // pixels per inch
        const totalWidth = cols * blockSize + 2 * borderWidth;
        const totalHeight = rows * blockSize + 2 * borderWidth;
        const width = totalWidth * scale;
        const height = totalHeight * scale;
        canvas.width = width;
        canvas.height = height;

        // Draw the quilt blocks
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                drawLogCabinBlock(ctx, (col * blockSize + borderWidth) * scale, (row * blockSize + borderWidth) * scale);
            }
        }

        // Draw the selected border style
        drawBorder(ctx, borderStyle, totalWidth * scale, totalHeight * scale);

        // Export the diagram as a data URL
        setDiagramUrl(canvas.toDataURL());
    };

    // Function to draw a single log cabin block
    const drawLogCabinBlock = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const stripWidth = blockSize / 5;
        const colors = [centerColor, ...stripColors];

        for (let i = 0; i < colors.length; i++) {
            ctx.fillStyle = colors[i];
            const size = blockSize - i * stripWidth;
            ctx.fillRect(x + i * stripWidth, y + i * stripWidth, size * 40, size * 40);
        }
    };

    // Function to draw a border based on the selected style
    const drawBorder = (ctx: CanvasRenderingContext2D, style: string, width: number, height: number) => {
        switch (style) {
            case 'Flying Geese':
                drawFlyingGeese(ctx, width, height);
                break;
            case 'Herringbone':
                drawHerringbone(ctx, width, height);
                break;
            case 'Delectable Mountain':
                drawDelectableMountain(ctx, width, height);
                break;
            case 'Pinwheels':
                drawPinwheels(ctx, width, height);
                break;
            case 'Tipped Bricks':
                drawTippedBricks(ctx, width, height);
                break;
            case 'Crossovers':
                drawCrossovers(ctx, width, height);
                break;
            default:
                break;
        }
    };

// Function to draw a Flying Geese border
const drawFlyingGeese = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  const scale = 40; // pixels per inch for scaling

  // Set the color for the flying geese triangles
  ctx.fillStyle = "#bada55";

  // Draw triangles for the top and bottom borders
  for (let i = 0; i < width / (borderWidth * scale); i++) {
    // Top border
    drawTriangle(ctx, i * borderWidth * scale, 0, borderWidth * scale, true);
    // Bottom border
    drawTriangle(ctx, i * borderWidth * scale, height - borderWidth * scale, borderWidth * scale, false);
  }

  // Draw triangles for the left and right borders
  for (let i = 0; i < height / (borderWidth * scale); i++) {
    // Left border
    drawTriangle(ctx, 0, i * borderWidth * scale, borderWidth * scale, true, true);
    // Right border
    drawTriangle(ctx, width - borderWidth * scale, i * borderWidth * scale, borderWidth * scale, false, true);
  }
};

// Function to draw a single triangle (used for Flying Geese)
const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  pointingUp: boolean,
  vertical: boolean = false
) => {
  ctx.beginPath();
  if (!vertical) {
    ctx.moveTo(x, y); // base
    ctx.lineTo(x + size / 2, pointingUp ? y + size : y - size); // top
    ctx.lineTo(x + size, y); // base other side
  } else {
    ctx.moveTo(x, y); // base
    ctx.lineTo(pointingUp ? x + size : x - size, y + size / 2); // top (side point)
    ctx.lineTo(x, y + size); // base other side
  }
  ctx.closePath();
  ctx.fill();
};

// Function to draw a Herringbone border
const drawHerringbone = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 2;

  // Draw zigzags for top and bottom borders
  for (let i = 0; i < width / (borderWidth * 2); i++) {
    drawZigzag(ctx, i * borderWidth * 2 * 40, 0, borderWidth * 40);
    drawZigzag(ctx, i * borderWidth * 2 * 40, height - borderWidth * 40, borderWidth * 40);
  }

  // Draw zigzags for left and right borders
  for (let i = 0; i < height / (borderWidth * 2); i++) {
    drawZigzag(ctx, 0, i * borderWidth * 2 * 40, borderWidth * 40, true);
    drawZigzag(ctx, width - borderWidth * 40, i * borderWidth * 2 * 40, borderWidth * 40, true);
  }
};

// Function to draw zigzags (used for Herringbone)
const drawZigzag = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, vertical: boolean = false) => {
  ctx.beginPath();
  if (!vertical) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x + size, y);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x, y + size);
  }
  ctx.stroke();
};

// Function to draw a Delectable Mountain border
const drawDelectableMountain = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  ctx.fillStyle = "#ff69b4";

  // Draw mountain-like peaks for top and bottom borders
  for (let i = 0; i < width / (borderWidth * 40); i++) {
    drawMountain(ctx, i * borderWidth * 40, 0, borderWidth * 40);
    drawMountain(ctx, i * borderWidth * 40, height - borderWidth * 40, borderWidth * 40, false);
  }

  // Draw mountain-like peaks for left and right borders
  for (let i = 0; i < height / (borderWidth * 40); i++) {
    drawMountain(ctx, 0, i * borderWidth * 40, borderWidth * 40, true);
    drawMountain(ctx, width - borderWidth * 40, i * borderWidth * 40, borderWidth * 40, true, false);
  }
};

// Function to draw mountains (used for Delectable Mountain)
const drawMountain = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  vertical: boolean = false,
  pointingUp: boolean = true
) => {
  ctx.beginPath();
  if (!vertical) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2, pointingUp ? y + size : y - size);
    ctx.lineTo(x + size, y);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(pointingUp ? x + size : x - size, y + size / 2);
    ctx.lineTo(x, y + size);
  }
  ctx.closePath();
  ctx.fill();
};

// Function to draw Pinwheels border
const drawPinwheels = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  const scale = 40; // pixels per inch
  ctx.fillStyle = "#ffb6c1";

  // Draw pinwheels along the top and bottom borders
  for (let i = 0; i < width / (borderWidth * scale); i++) {
    drawPinwheel(ctx, i * borderWidth * scale, 0, borderWidth * scale);
    drawPinwheel(ctx, i * borderWidth * scale, height - borderWidth * scale, borderWidth * scale);
  }

  // Draw pinwheels along the left and right borders
  for (let i = 0; i < height / (borderWidth * scale); i++) {
    drawPinwheel(ctx, 0, i * borderWidth * scale, borderWidth * scale);
    drawPinwheel(ctx, width - borderWidth * scale, i * borderWidth * scale, borderWidth * scale);
  }
};

// Function to draw a single pinwheel (used for Pinwheels)
const drawPinwheel = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size / 2, y - size / 2);
  ctx.closePath();
  ctx.fill();
};

// Function to draw Tipped Bricks border
const drawTippedBricks = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  ctx.fillStyle = "#8a2be2";

  // Draw rectangles along the top and bottom borders
  for (let i = 0; i < width / (borderWidth * 40); i++) {
    ctx.fillRect(i * borderWidth * 40, 0, borderWidth * 40, borderWidth * 20);
    ctx.fillRect(i * borderWidth * 40, height - borderWidth * 40, borderWidth * 40, borderWidth * 20);
  }

  // Draw rectangles along the left and right borders
  for (let i = 0; i < height / (borderWidth * 40); i++) {
    ctx.fillRect(0, i * borderWidth * 40, borderWidth * 20, borderWidth * 40);
    ctx.fillRect(width - borderWidth * 40, i * borderWidth * 40, borderWidth * 20, borderWidth * 40);
  }
};

// Function to draw Crossovers border
const drawCrossovers = (ctx: CanvasRenderingContext2D, width: number, height: number, borderWidth: number) => {
  ctx.fillStyle = "#ff6347";

  // Draw cross shapes along the top and bottom borders
  for (let i = 0; i < width / (borderWidth * 40); i++) {
    drawCross(ctx, i * borderWidth * 40, 0, borderWidth * 40);
    drawCross(ctx, i * borderWidth * 40, height - borderWidth * 40, borderWidth * 40);
  }

  // Draw cross shapes along the left and right borders
  for (let i = 0; i < height / (borderWidth * 40); i++) {
    drawCross(ctx, 0, i * borderWidth * 40, borderWidth * 40);
    drawCross(ctx, width - borderWidth * 40, i * borderWidth * 40, borderWidth * 40);
  }
};

// Function to draw a single cross (used for Crossovers)
const drawCross = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.fillRect(x, y + size / 4, size, size / 2);
  ctx.fillRect(x + size / 4, y, size / 2, size);
};


    // Function to calculate fabric requirements, including seam allowance and borders
    const calculateFabric = () => {
        const numBlocks = rows * cols;
        const borderFabric = calculateBorderFabric(borderStyle, borderWidth, cols, rows, blockSize);

        const totalFabric = {
            center: numBlocks * ((blockSize / 5) + 2 * seamAllowance) ** 2, // Adding seam allowance to center block
            strips: stripColors.map((color, index) => ({
                color,
                area: numBlocks * ((blockSize - (index + 1) * blockSize / 5) + 2 * seamAllowance) ** 2, // Adding seam allowance to strips
            })),
            border: borderFabric,
        };
        return totalFabric;
    };

    const calculateBorderFabric = (style: string, borderWidth: number, cols: number, rows: number, blockSize: number) => {
        const perimeter = (2 * (cols * blockSize + rows * blockSize)) + 4 * borderWidth;
        switch (style) {
            case 'Flying Geese':
                return perimeter * 2; // Example calculation
            case 'Herringbone':
                return perimeter * 1.5;
            case 'Delectable Mountain':
                return perimeter * 2.5;
            case 'Pinwheels':
                return perimeter * 3;
            case 'Tipped Bricks':
                return perimeter * 2.8;
            case 'Crossovers':
                return perimeter * 1.8;
            default:
                return perimeter;
        }
    };

    return (
        <>
            <Head>
                <title>Log Cabin Quilt Calculator</title>
            </Head>
            <div className="container">
                <h1>Log Cabin Quilt Calculator</h1>

                <div className="controls">
                    <label>
                        Total Quilt Width (inches):
                        <input
                            type="number"
                            value={quiltWidth ?? ''}
                            onChange={(e) => setQuiltWidth(Number(e.target.value))}
                            placeholder="Enter total quilt width"
                            style={{ color: 'black' }}
                        />
                    </label>
                    <label>
                        Total Quilt Height (inches):
                        <input
                            type="number"
                            value={quiltHeight ?? ''}
                            onChange={(e) => setQuiltHeight(Number(e.target.value))}
                            placeholder="Enter total quilt height"
                            style={{ color: 'black' }}
                        />
                    </label>
                    <button onClick={calculateBlockSize}>Calculate Block Size</button>

                    <label>
                        Block Size (inches) {quiltWidth && quiltHeight ? '(Calculated)' : '(Manual)'}:
                        <input
                            type="number"
                            value={blockSize}
                            onChange={(e) => setBlockSize(Number(e.target.value))}
                            style={{ color: 'black' }}
                            disabled={quiltWidth !== null && quiltHeight !== null}  // Disable manual input if calculated
                        />
                    </label>
                    <label>
                        Rows:
                        <input
                            type="number"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            style={{ color: 'black' }}
                        />
                    </label>
                    <label>
                        Columns:
                        <input
                            type="number"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            style={{ color: 'black' }}
                        />
                    </label>

                    <label>
                        Seam Allowance (inches):
                        <input
                            type="number"
                            step="0.01"
                            value={seamAllowance}
                            onChange={(e) => setSeamAllowance(Number(e.target.value))}
                            style={{ color: 'black' }}
                        />
                    </label>

                    <label>
                        Border Style:
                        <select
                            value={borderStyle}
                            onChange={(e) => setBorderStyle(e.target.value)}
                            style={{ color: 'black' }}
                        >
                            {borderStyles.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Border Width (inches):
                        <input
                            type="number"
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value))}
                            style={{ color: 'black' }}
                        />
                    </label>

                    <label>
                        Center Color:
                        <input
                            type="color"
                            value={centerColor}
                            onChange={(e) => setCenterColor(e.target.value)}
                            style={{ color: 'black' }}
                        />
                    </label>

                    {stripColors.map((color, index) => (
                        <label key={index}>
                            Strip Color {index + 1}:
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => {
                                    const newColors = [...stripColors];
                                    newColors[index] = e.target.value;
                                    setStripColors(newColors);
                                }}
                                style={{ color: 'black' }}
                            />
                        </label>
                    ))}
                </div>

                <button onClick={drawQuiltDiagram}>Generate Diagram</button>

                {diagramUrl && (
                    <>
                        <h2>Quilt Diagram</h2>
                        <img src={diagramUrl} alt="Log Cabin Quilt" />
                    </>
                )}

                <h2>Fabric Requirements</h2>
                <pre>{JSON.stringify(calculateFabric(), null, 2)}</pre>

                <style jsx>{`
          .container {
            padding: 20px;
            max-width: 800px;
            margin: auto;
          }
          .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          label {
            display: block;
            margin: 10px 0;
          }
          input, select {
            margin-left: 10px;
            color: black;  /* Ensure the font color is black */
          }
          button {
            padding: 10px 20px;
            background-color: #0070f3;
            color: white;
            border: none;
            cursor: pointer;
            margin-top: 20px;
          }
        `}</style>
            </div>
        </>
    );
};

export default LogCabinCalculator;
