import React from "react"
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"

interface DraggableProps {
  name: string
  id: string
}

const DraggableItem = ({ id, name }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width: 100,
    height: 100,
    backgroundColor: "lightblue",
    textAlign: "center",
    lineHeight: "100px",
    cursor: "grab",
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          { name }
    </div>
  )
}

const DroppableArea = ({ isOver }: { isOver: boolean }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  })

  const style = {
    width: 200,
    height: 200,
    backgroundColor: isOver ? "lightcoral" : "lightgreen",
    textAlign: "center",
    lineHeight: "200px",
    transition: "background-color 0.2s",
  }

  return (
    <div ref={setNodeRef} style={style}>
      Drop here
    </div>
  )
}

const DragAndDrop = () => {
  const [isOver, setIsOver] = React.useState(false)

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === "droppable") {
      alert("Dropped in the correct zone!")
    }
  }

  const handleDragOver = (event: any) => {
    setIsOver(event.over?.id === "droppable")
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "50px" }}>
        <DraggableItem id="1" name="square1" />
        <DraggableItem id="2" name="square2" />
        <DroppableArea isOver={isOver} />
      </div>
    </DndContext>
  )
}

export default DragAndDrop
