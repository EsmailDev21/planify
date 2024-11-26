import React, { useState } from "react";
import { Status, Priority } from "@/lib/types/models";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, updateTask } from "@/lib/redux/slices/taskSlice";
import { DroppableColumn } from "@/components/app/quote/KanbanDroppableColumn.component";
import BoardTask from "./BoardTask.component";

// Define status labels for the Task columns
const statusLabels: Record<Status, string> = {
  [Status.TODO]: "à Faire",
  [Status.IN_PROGRESS]: "En cours",
  [Status.DONE]: "Terminé",
};

// Mapping from sortable IDs to statuses
const idToStatus: Record<string, Status> = {
  "Sortable-0": Status.TODO,
  "Sortable-1": Status.IN_PROGRESS,
  "Sortable-2": Status.DONE,
};

const BoardView = () => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const { tasks } = useSelector(selectTasks);
  const dispatch = useDispatch();

  // Group tasks by status
  const tasksByStatus = {
    [Status.TODO]: tasks.filter((t) => t.status === Status.TODO),
    [Status.IN_PROGRESS]: tasks.filter((t) => t.status === Status.IN_PROGRESS),
    [Status.DONE]: tasks.filter((t) => t.status === Status.DONE),
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDraggingTaskId(event.currentTarget.getAttribute("data-id") || null);
    document.body.classList.add("no-scroll");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const targetColumnId = event.currentTarget.getAttribute("data-id");
    setActiveColumnId(targetColumnId || null);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const targetColumnId = event.currentTarget.getAttribute("data-id");
    if (activeColumnId === targetColumnId) {
      setActiveColumnId(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const targetColumnId = event.currentTarget.getAttribute("data-id");
    if (activeColumnId && draggingTaskId && targetColumnId) {
      const sourceStatus = idToStatus[activeColumnId];
      const destinationStatus = idToStatus[targetColumnId];

      // Find the task being dragged
      const task = tasks.find((t) => t.id === draggingTaskId);

      if (task) {
        // Update the task's status if moved to a different column
        console.log({ sourceStatus, destinationStatus });
        dispatch(
          updateTask({
            id: task.id,
            updates: {
              ...task,
              status: destinationStatus,
            },
          })
        );
      }

      // Reset dragging state
      setDraggingTaskId(null);
      setActiveColumnId(null);
    }

    document.body.classList.remove("no-scroll");
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setActiveColumnId(null);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <DroppableColumn
          key={status}
          id={`Sortable-${status}`}
          label={statusLabels[status as unknown as Status]}
          isActive={activeColumnId === `Sortable-${status}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onTouchStart={function (
            event: React.TouchEvent<HTMLDivElement>
          ): void {
            throw new Error("Function not implemented.");
          }}
          onTouchMove={function (
            event: React.TouchEvent<HTMLDivElement>
          ): void {
            throw new Error("Function not implemented.");
          }}
          onTouchEnd={function (event: React.TouchEvent<HTMLDivElement>): void {
            throw new Error("Function not implemented.");
          }}
        >
          {tasks.map((task) => (
            <BoardTask
              onTouchStart={function (
                event: React.TouchEvent<HTMLDivElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              onTouchEnd={function (
                event: React.TouchEvent<HTMLDivElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              key={task.id}
              {...task}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </DroppableColumn>
      ))}
    </div>
  );
};

export default BoardView;
