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

  const onDragStart = useCallback(
    (
      event: MouseEvent | PointerEvent | TouchEvent,
      info: PanInfo,
      task: GanttTaskProps
    ) => {
      event.preventDefault();
      setDraggedTask(task);
    },
    []
  );

  const onDragEnd = (event: any, info: PanInfo, task: GanttTaskProps) => {
    event.preventDefault();
    const offsetX = info.offset.x;
    const ColsMoved = Math.round(offsetX / dayColumnWidth);
    if (Math.abs(ColsMoved) > 0) {
      dispatch(
        updateTask({
          id: task.id,
          updates: {
            ...task,
            startDate:
              ZoomLevel === 2
                ? addDays(task.startDate, ColsMoved)
                : ZoomLevel === 1
                ? addWeeks(task.startDate, ColsMoved)
                : addHours(task.startDate, ColsMoved),
            endDate:
              ZoomLevel === 2
                ? addDays(task.endDate, ColsMoved)
                : ZoomLevel === 1
                ? addWeeks(task.endDate, ColsMoved)
                : addHours(task.endDate, ColsMoved),
          },
        })
      );
    }
    onForceRerender();
    setDraggedTask(null);
  };

  return { draggedTask, onDragStart, onDragEnd };
};
