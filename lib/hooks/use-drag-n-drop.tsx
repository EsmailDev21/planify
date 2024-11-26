import { useState, useCallback } from "react";
import { PanInfo } from "framer-motion";
import { addDays, addHours, addWeeks } from "date-fns";
import { GanttTaskProps } from "@/components/app/tasks/views/GanttTask.component";
import { updateTask } from "../redux/slices/taskSlice";

export const useDragAndDrop = (
  ZoomLevel: number,
  dispatch: any,
  dayColumnWidth: number,
  onForceRerender: () => void
) => {
  const [draggedTask, setDraggedTask] = useState<GanttTaskProps | null>(null);
  const [isDragging, setIsDragging] = useState(false); // Using a boolean for clarity
  const [draggedTaskPosition, setDraggedTaskPosition] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const onDrag = useCallback(
    (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
      event.preventDefault();
      if (draggedTask) {
        // Calculate the movement in terms of the grid columns (days, weeks, or hours)
        const offsetX = info.offset.x;
        const ColsMoved = Math.round(offsetX / dayColumnWidth);

        // Dynamically update the task's position
        const updatedStartDate = adjustDate(draggedTask.startDate, ColsMoved);
        const updatedEndDate = adjustDate(draggedTask.endDate, ColsMoved);

        // Update the position of the task in real-time
        setDraggedTaskPosition({
          startDate: updatedStartDate,
          endDate: updatedEndDate,
        });
      }
    },
    [draggedTask, dayColumnWidth]
  );

  const onDragStart = useCallback(
    (
      event: MouseEvent | PointerEvent | TouchEvent,
      info: PanInfo,
      task: GanttTaskProps
    ) => {
      event.preventDefault();
      setDraggedTask(task);
      setIsDragging(true);
    },
    []
  );

  const onDragEnd = (event: any, info: PanInfo, task: GanttTaskProps) => {
    event.preventDefault();
    const offsetX = info.offset.x;
    const ColsMoved = Math.round(offsetX / dayColumnWidth);

    // Update the task in the Redux store once dragging ends
    if (Math.abs(ColsMoved) > 0) {
      dispatch(
        updateTask({
          id: task.id,
          updates: {
            ...task,
            startDate: adjustDate(task.startDate, ColsMoved),
            endDate: adjustDate(task.endDate, ColsMoved),
          },
        })
      );
    }

    // Re-render the component
    onForceRerender();
    setIsDragging(false);
    setDraggedTask(null);
  };

  // Helper function to adjust the date based on the zoom level
  const adjustDate = (date: Date, movement: number) => {
    if (ZoomLevel === 2) return addDays(date, movement);
    if (ZoomLevel === 1) return addWeeks(date, movement);
    return addHours(date, movement);
  };

  return {
    draggedTask,
    draggedTaskPosition, // Contains the task's new position while dragging
    onDragStart,
    onDragEnd,
    isDragging,
    onDrag,
  };
};
