"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  format,
  addDays,
  addMonths,
  addWeeks,
  differenceInDays,
  endOfMonth,
  startOfMonth,
  differenceInWeeks,
  isBefore,
  differenceInHours,
} from "date-fns";
import { BiMove } from "react-icons/bi";
import { Button } from "@/components/ui/button"; // Adjust if using different Shadcn components
import GanttTask, { GanttTaskProps } from "./GanttTask.component"; // Adjust the import path if necessary
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, updateTask } from "@/lib/redux/slices/taskSlice";

interface GanttChartProps {
  zoomLevel: number;
  tasks: GanttTaskProps[];
}

interface TaskCategory {
  name: string;
  tasks: GanttTaskProps[];
}
const AnimatedDiv = motion.div;

const GanttChart: React.FC<GanttChartProps> = ({ zoomLevel, tasks }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingTask, setIsDraggingTask] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [startDragColumn, setStartDragColumn] = useState(0);
  const [endDragColumn, setEndDragColumn] = useState(0);
  const initialDragPos = useRef(0);
  const finalDragPos = useRef(0);

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
  const startDate = new Date();
  const totalDays = 365;
  const dayColumnWidth = zoomLevel * 10;
  const topRow = [];
  const bottomRow: { label: string; width: number; date: Date }[] = [];
  const gridTemplateRows = `repeat(${7}, auto)`;
  //gantt task categories

  //task update on drag

  const handleMouseEnterGridItem = (index: number) => {
    console.log(index);
    setIsOver(index);
  };

  // Handles the start of dragging.
  console.log(tasks);
  const onDragStart = useCallback(
    (
      event: MouseEvent | PointerEvent | TouchEvent,
      info: PanInfo,
      task: GanttTaskProps
    ) => {
      // Prevent the default behavior and prevent conflicts with other elements.
      event.preventDefault();
      setIsDraggingTask(true);
      setStartDragColumn(
        Math.trunc(differenceInHours(task.startDate, startDate) / 24) + 1
      );
      setEndDragColumn(
        Math.trunc(differenceInHours(task.endDate, startDate) / 24) + 1
      );

      /* // Set dragging state to true.
      initialDragPos.current = info.offset.x;
      console.log({ initialDragPos, offset: info.offset.x }); */ // Set the initial position when dragging starts.
    },
    [] // No dependencies are needed here unless you update more variables inside this function.
  );

  const getGridItemEquivalentDate = (index: number) => {
    console.log(new Date(bottomRow[index].date));
    return new Date(bottomRow[index].date);
  };

  const onDrag = useCallback(
    (
      event: MouseEvent | PointerEvent | TouchEvent,
      info: PanInfo,
      task: Partial<GanttTaskProps>
    ) => {
      // Find the index of the grid cell currently hovered
      if (info.offset.x < 0) {
        setStartDragColumn((prev) => prev - 1);
        setEndDragColumn((prev) => prev - 1);
      } else {
        setEndDragColumn((prev) => prev + 1);
        setStartDragColumn((prev) => prev + 1);
      }
    },
    [dayColumnWidth]
  );
  const dispatch = useDispatch();
  const onDragEnd = (event: any, info: PanInfo, task: GanttTaskProps) => {
    event.preventDefault();

    const offsetX = info.offset.x;

    // Convert the drag distance to days
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
  }; //month weeks generator
  const generateWeeksForMonth = (currentMonth: Date) => {
    const daysInMonth =
      differenceInDays(endOfMonth(currentMonth), startOfMonth(currentMonth)) +
      1;
    const weekWidth = Math.round(daysInMonth / 4) * dayColumnWidth;

    for (let i = 0; i < 4; i++) {
      topRow.push({
        label: `${format(currentMonth, "MMMM yyyy")} - Week ${i + 1}`,
        width: weekWidth,
      });
    }
  };
  //months generator
  const generateMonths = () => {
    let currentMonth = startDate;
    while (isBefore(currentMonth, addDays(startDate, totalDays))) {
      topRow.push({
        label: format(currentMonth, "MMMM yyyy"),
        width:
          differenceInDays(endOfMonth(currentMonth), currentMonth) *
          dayColumnWidth,
      });
      currentMonth = addMonths(currentMonth, 1);
    }
  };
  //weeks generator
  const generateWeeks = () => {
    let currentWeek = startDate;
    for (
      let i = 0;
      i < differenceInWeeks(addDays(startDate, totalDays), startDate);
      i++
    ) {
      bottomRow.push({
        label: `Week ${format(currentWeek, "w")}`,
        width: 7 * dayColumnWidth,
        date: currentWeek,
      });
      currentWeek = addWeeks(currentWeek, 1);
    }
  };
  //days generator
  const generateDays = () => {
    for (let i = 0; i < totalDays; i++) {
      const date = addDays(startDate, i);
      bottomRow.push({
        label: `${format(date, "dd")} ${format(date, "EEE")}`,
        width: dayColumnWidth,
        date: date,
      });
    }
  };
  //zoom logic
  if (zoomLevel > 5) {
    let currentMonth = startDate;
    while (isBefore(currentMonth, addDays(startDate, totalDays))) {
      generateWeeksForMonth(currentMonth);
      currentMonth = addMonths(currentMonth, 1);
    }
    generateDays();
  } else if (zoomLevel > 2 && zoomLevel <= 5) {
    generateMonths();
    generateWeeks();
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

  return (
    <div className="max-w-6xl">
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
            gridTemplateColumns: `repeat(${bottomRow.length}, auto)`,
            // Add border for debugging
          }}
        >
          {bottomRow.map((i, index) => (
            <div
              key={index + 1}
              style={{
                gridRow: index + 1,
                gridColumn: index + 1,
                width: `${i.width}px`,
              }}
            ></div>
          ))}
          {Array(15)
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
                >
                  {colIndex + 1}
                </div>
              ))
            )}

          {tasks.map((task, index) => {
            const gridColStart =
              // Math.trunc(differenceInHours(task.startDate, startDate)/24)
              Math.trunc(differenceInHours(task.startDate, startDate) / 24) + 1;
            const gridColEnd =
              Math.trunc(differenceInHours(task.endDate, startDate) / 24) + 2;
            console.log({ gridColEnd, gridColStart });

            return (
              <GanttTask
                onDrag={() => null}
                onDragStart={onDragStart}
                key={task.id}
                assignee={task.assignee}
                endDate={task.endDate}
                startDate={task.startDate}
                id={task.id}
                title={task.title}
                gridRow={index + 1}
                onDragEnd={(e, info, task) => onDragEnd(e, info, task)}
                gridColStart={gridColStart}
                gridColEnd={gridColEnd}
                priority={task.priority}
                tags={task.tags}
                status={task.status}
                progress={task.progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
