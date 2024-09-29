"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  format,
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  isBefore,
  differenceInHours,
  differenceInWeeks,
} from "date-fns";
import { BiMove } from "react-icons/bi";
import { Button } from "@/components/ui/button"; // Adjust if using different Shadcn components
import GanttTask, { GanttTaskProps } from "./GanttTask.component"; // Adjust the import path if necessary
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, updateTask } from "@/lib/redux/slices/taskSlice";
import {
  generateWeeksForMonth,
  generateDays,
  generateMonths,
  generateWeeks,
} from "@/lib/utils";

interface GanttChartProps {
  zoomLevel: number;
  tasks: GanttTaskProps[];
  onForceRerender: () => void;
}

const AnimatedDiv = motion.div;

const GanttChart: React.FC<GanttChartProps> = ({
  zoomLevel,
  tasks,
  onForceRerender,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingTask, setIsDraggingTask] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [startDragColumn, setStartDragColumn] = useState(0);
  const [endDragColumn, setEndDragColumn] = useState(0);
  const [draggedTask, setDraggedTask] = useState<GanttTaskProps | null>(null);
  const [draggedTaskPosition, setDraggedTaskPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOver, setIsOver] = useState<number>(0);

  // horizontal scroll logic
  const handleScroll = (event: Event) => {
    const target = event.currentTarget as HTMLDivElement;
    if (target === headerRef.current && bodyRef.current) {
      bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
    } else if (target === bodyRef.current && headerRef.current) {
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setScrollStartX(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && bodyRef.current) {
      const deltaX = scrollStartX - event.clientX;
      bodyRef.current.scrollLeft += deltaX;
      setScrollStartX(event.clientX);

      // Update the position of the dragged task
      if (draggedTask) {
        setDraggedTaskPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const headerEl = headerRef.current;
    const bodyEl = bodyRef.current;

    headerEl?.addEventListener("scroll", handleScroll);
    bodyEl?.addEventListener("scroll", handleScroll);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      headerEl?.removeEventListener("scroll", handleScroll);
      bodyEl?.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollStartX]);

  //gantt params
  const startDate = addDays(new Date(), -3);
  const totalDays = 100;
  const dayColumnWidth = zoomLevel * 10;
  const topRow: any[] = [];
  const bottomRow: { label: string; width: number; date: Date }[] = [];
  const gridTemplateRows = `repeat(${tasks.length + 5}, auto)`;

  const handleMouseEnterGridItem = (index: number) => {
    setIsOver(index);
  };
  const onDragStart = useCallback(
    (
      event: MouseEvent | PointerEvent | TouchEvent,
      info: PanInfo,
      task: GanttTaskProps
    ) => {
      event.preventDefault();
      setIsDraggingTask(true);
      setDraggedTask(task);
      setStartDragColumn(
        Math.trunc(differenceInHours(task.startDate, startDate) / 24) + 1
      );
      setEndDragColumn(
        Math.trunc(differenceInHours(task.endDate, startDate) / 24) + 1
      );
    },
    [startDate]
  );

  const [tasksUpdated, setTasksUpdated] = useState<boolean>(false);

  const onDragEnd = (event: any, info: PanInfo, task: GanttTaskProps) => {
    event.preventDefault();
    const offsetX = info.offset.x;
    const daysMoved = Math.round(offsetX / dayColumnWidth);
    if (Math.abs(daysMoved) > 0) {
      dispatch(
        updateTask({
          ...task,
          startDate: addDays(task.startDate, daysMoved),
          endDate: addDays(task.endDate, daysMoved),
        })
      );
    }
    onForceRerender();
    setDraggedTask(null);
    setDraggedTaskPosition(null);
  };

  const dispatch = useDispatch();

  //zoom logic
  if (zoomLevel > 5) {
    let currentMonth = startDate;
    while (isBefore(currentMonth, addDays(startDate, totalDays))) {
      generateWeeksForMonth(currentMonth, topRow, dayColumnWidth);
      currentMonth = addMonths(currentMonth, 1);
    }
    generateDays(startDate, totalDays, bottomRow, dayColumnWidth);
  } else if (zoomLevel > 2 && zoomLevel <= 5) {
    generateMonths(startDate, totalDays, topRow, dayColumnWidth);
    generateWeeks(startDate, totalDays, bottomRow, dayColumnWidth);
  } else {
    let currentYear = startDate;
    for (
      let i = 0;
      i < differenceInDays(addDays(startDate, totalDays), startDate) / 365;
      i++
    ) {
      topRow.push({
        label: format(currentYear, "yyyy"),
        width: 12 * 30 * dayColumnWidth,
      });
      currentYear = addMonths(currentYear, 12);
    }

    let currentMonth = startDate;
    while (isBefore(currentMonth, addDays(startDate, totalDays))) {
      bottomRow.push({
        label: format(currentMonth, "MMMM"),
        width:
          differenceInDays(endOfMonth(currentMonth), currentMonth) *
          dayColumnWidth,
        date: currentMonth,
      });
      currentMonth = addMonths(currentMonth, 1);
    }
  }

  useEffect(() => {
    if (tasksUpdated) {
      setTasksUpdated(false); // Reset the state
    }
  }, [tasksUpdated]);

  return (
    <div className="max-w-xl">
      <div
        ref={headerRef}
        className="whitespace-nowrap border-b border-gray-300  w-full bg-gray-50"
      >
        <div
          className="grid grid-cols-auto"
          style={{
            gridTemplateColumns: `repeat(${topRow.length}, auto)`,
          }}
        >
          {topRow.map((item, index) => (
            <AnimatedDiv
              key={index}
              className="text-center border-r border-gray-300 text-gray-600 font-semibold bg-gray-50"
              style={{ width: `${item.width}px` }}
            >
              {item.label}
            </AnimatedDiv>
          ))}
        </div>
        <div
          className="grid grid-cols-auto"
          style={{ gridTemplateColumns: `repeat(${bottomRow.length}, auto)` }}
        >
          {bottomRow.map((item, index) => (
            <AnimatedDiv
              key={index}
              className="text-center bg-white text-gray-700 border-r border-gray-300 text-xs"
              style={{ width: `${item.width}px` }}
            >
              {item.label}
            </AnimatedDiv>
          ))}
        </div>
      </div>

      <div
        ref={bodyRef}
        className="overflow-x-visible  overflow-y-visible scroll-smooth whitespace-nowrap w-full"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="grid h-screen"
          style={{
            gridTemplateRows: gridTemplateRows,
            gridTemplateColumns: `repeat(${
              zoomLevel > 5 ? bottomRow.length : bottomRow.length * 7
            }, auto)`,
            // Add border for debugging
          }}
        >
          {bottomRow.map((i, index) => (
            <div
              key={index}
              style={{
                gridRow: index,
                gridColumn: index,
                width: `${i.width}px`,
              }}
            ></div>
          ))}
          {Array(7)
            .fill("1")
            .map((i, rowIndex) =>
              bottomRow.map((_, colIndex) => (
                <div
                  onPointerEnter={() => handleMouseEnterGridItem(colIndex + 1)}
                  onMouseEnter={() => handleMouseEnterGridItem(colIndex + 1)}
                  key={`${rowIndex}-${colIndex}`}
                  className={`border-r-[1px] border-b-[1px] text-xs p-1 border-slate-300 ${
                    isOver === colIndex + 1 && "bg-slate-200"
                  }`}
                  style={{
                    gridColumn: colIndex + 1,
                    gridRow: rowIndex + 1,
                    height: "50px",
                  }}
                ></div>
              ))
            )}

          {tasks.map((task, index) => {
            const gridDayColStart =
              // Math.trunc(differenceInHours(task.startDate, startDate)/24)
              differenceInDays(task.startDate, bottomRow[0].date) + 2;
            const gridDayColEnd =
              differenceInDays(task.endDate, bottomRow[0].date) + 3;

            const gridWeekColStart =
              // Math.trunc(differenceInHours(task.startDate, startDate)/24)
              differenceInWeeks(task.startDate, bottomRow[0].date) + 2;
            const gridWeekColEnd =
              differenceInWeeks(task.endDate, bottomRow[0].date) + 3;
            return (
              <GanttTask
                onDrag={() => null}
                onDragStart={onDragStart}
                key={task.id}
                teamMembers={task.teamMembers}
                description={task.description}
                endDate={task.endDate}
                startDate={task.startDate}
                id={task.id}
                title={task.title}
                gridRow={index + 1}
                onDragEnd={(e: any, info: PanInfo, task: GanttTaskProps) => onDragEnd(e, info, task)}
                gridColStart={gridDayColStart}
                gridColEnd={gridDayColEnd}
                priority={task.priority}
                tags={task.tags}
                status={task.status}
                progress={task.progress}
                color={task.color} onResize={function (dir: string, task: any): void {
                  throw new Error("Function not implemented.");
                } }              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
