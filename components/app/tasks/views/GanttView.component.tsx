"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, MotionValue, PanInfo } from "framer-motion";
import {
  format,
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  isBefore,
  differenceInHours,
  startOfMonth,
} from "date-fns";
import GanttTask, { GanttTaskProps } from "./GanttTask.component"; // Adjust the import path if necessary
import { useDispatch } from "react-redux";
import { updateTask } from "@/lib/redux/slices/taskSlice";
import {
  generateWeeksForMonth,
  generateDays,
  generateMonths,
  generateWeeks,
  calculateGridRow,
  generateTimelineForMonthsAndDays,
  calculateTaskPosition,
} from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import GanttSubTask from "./GanttSubTask.component";
import { useScrollSync } from "@/lib/hooks/use-scroll-sync";
import { useDragToScroll } from "@/lib/hooks/use-drag-scroll";
import { useToggle } from "@/lib/hooks/use-toggle";
import { useDragAndDrop } from "@/lib/hooks/use-drag-n-drop";
import { TaskModel } from "@/lib/types/models";

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
  const [linesRender, setLinesRender] = useState<Array<any>>([]);
  const { headerRef, bodyRef } = useScrollSync();
  const { handleMouseDown } = useDragToScroll(bodyRef);
  const { isExpanded, toggle } = useToggle();
  const dayColumnWidth = 42;
  const dispatch = useDispatch();
  const {
    draggedTask,
    onDragStart,
    onDragEnd,
    isDragging,
    onDrag,
    draggedTaskPosition,
  } = useDragAndDrop(zoomLevel, dispatch, dayColumnWidth, onForceRerender);
  const startDate = startOfMonth(new Date()); //addDays(new Date(), -3);
  const { topRow, bottomRow } = generateTimelineForMonthsAndDays(
    startDate,
    120,
    dayColumnWidth
  ); // Example function to generate month headers

  // Example function to generate day headers
  const gridTemplateRows = `repeat(${tasks.length}, auto)`; // Set rows dynamically based on tasks

  // State
  const [isOver, setIsOver] = useState<number | null>(null);

  // Event Handlers
  const handleMouseEnterGridItem = (columnIndex: number) => {
    setIsOver(columnIndex);
  };

  const toggleSubtasks = (taskId: string) => {
    toggle(taskId); // Assuming `useToggle` handles array operations for toggling
  };
  const calculateTaskPosition = (
    task: TaskModel,
    bottomRow: Array<{ label: string; width: number; date: Date }>,
    dayColumnWidth: number,
    tasks: TaskModel[]
  ) => {
    // Make sure the task dates are updated and valid
    const startX =
      differenceInDays(task.startDate, bottomRow[0].date) * dayColumnWidth;
    const endX =
      (differenceInDays(task.endDate, bottomRow[0].date) + 1) * dayColumnWidth;

    // Track y position dynamically based on a task's id or position in the grid (e.g., using task.id or task.order)
    const taskPositionIndex = tasks.findIndex((t) => t.id === task.id); // Use task.id to get correct index
    const y =
      calculateGridRow(taskPositionIndex, tasks, isExpanded) * dayColumnWidth +
      dayColumnWidth / 3; // Adjust for vertical spacing

    return { startX, endX, y };
  };

  const calculateDraggedTaskPosition = useCallback(
    (
      task: TaskModel,
      bottomRow: Array<{ label: string; width: number; date: Date }>,
      dayColumnWidth: number,
      tasks: TaskModel[]
    ) => {
      // Make sure the task dates are updated and valid
      const startX =
        differenceInDays(
          draggedTaskPosition.startDate as Date,
          bottomRow[0].date
        ) * dayColumnWidth;
      const endX =
        (differenceInDays(
          draggedTaskPosition.endDate as Date,
          bottomRow[0].date
        ) +
          1) *
        dayColumnWidth;

      // Track y position dynamically based on a task's id or position in the grid (e.g., using task.id or task.order)
      const taskPositionIndex = tasks.findIndex((t) => t.id === task.id); // Use task.id to get correct index
      const y =
        calculateGridRow(taskPositionIndex, tasks, isExpanded) *
          dayColumnWidth +
        dayColumnWidth / 3; // Adjust for vertical spacing

      return { startX, endX, y };
    },
    [isExpanded, tasks, dayColumnWidth] // Only recalculate when necessary (do not rely on isDragging or onDrag here)
  );

  const renderDependencyLinesForAllTasks = useCallback(() => {
    const newLines: { id: string; line: React.ReactNode }[] = [];

    tasks.forEach((task) => {
      task.dependencies?.forEach((dep) => {
        const dependentTask = tasks.find((t) => t.id === dep.taskId);
        if (dependentTask) {
          const fromPos = calculateTaskPosition(
            dependentTask,
            bottomRow,
            dayColumnWidth,
            tasks
          );
          const toPos = calculateTaskPosition(
            task,
            bottomRow,
            dayColumnWidth,
            tasks
          );

          // Calculate control points for the curve
          const midX = (fromPos.endX + toPos.startX) / 2;
          const controlPointOffset = Math.max(
            50,
            Math.abs(toPos.startX - fromPos.endX) / 2
          );

          const lineId = `${fromPos.endX}-${fromPos.y}-${toPos.startX}-${toPos.y}`;
          const offset =
            Math.abs(fromPos.y - toPos.y) > 0
              ? Math.min(20, Math.abs(fromPos.y - toPos.y) / 2)
              : 10;
          newLines.push({
            id: lineId,
            line: (
              <motion.path
                key={lineId}
                d={`
                M ${fromPos.endX},${fromPos.y} 
  C ${fromPos.endX + 50},${fromPos.y} 
    ${toPos.startX - 30},${toPos.y - 40} 
    ${toPos.startX - 10},${toPos.y - 10}
  L ${toPos.startX},${toPos.y}`}
                stroke="url(#line-gradient)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#fancyArrow)"
                markerStart="url(#dotMarker)"
                style={{
                  filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1))",
                  transition: "all 0.2s ease",
                }}
                className="dependency-line"
                animate={{
                  d: `M ${fromPos.endX},${fromPos.y} 
                      C ${fromPos.endX + controlPointOffset},${fromPos.y} 
                        ${midX - controlPointOffset},${toPos.y} 
                        ${toPos.startX},${toPos.y}`,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            ),
          });
        }
      });
    });

    // Handle dragged task dependencies
    draggedTask?.dependencies?.forEach((dep) => {
      const dependentTask = tasks.find((t) => t.id === dep.taskId);
      if (dependentTask) {
        const fromPos = calculateDraggedTaskPosition(
          dependentTask,
          bottomRow,
          dayColumnWidth,
          tasks
        );
        const toPos = calculateDraggedTaskPosition(
          draggedTask,
          bottomRow,
          dayColumnWidth,
          tasks
        );

        const midX = (fromPos.endX + toPos.startX) / 2;
        const controlPointOffset = Math.max(
          50,
          Math.abs(toPos.startX - fromPos.endX) / 2
        );
        const offset =
          Math.abs(fromPos.y - toPos.y) > 0
            ? Math.min(20, Math.abs(fromPos.y - toPos.y) / 2)
            : 10;

        const lineId = `${fromPos.endX}-${fromPos.y}-${toPos.startX}-${toPos.y}`;

        newLines.push({
          id: lineId,
          line: (
            <motion.path
              key={lineId}
              d={`
                M ${fromPos.endX},${fromPos.y} 
                C ${fromPos.endX + 50},${fromPos.y - offset} 
                  ${toPos.startX - 50},${toPos.y + offset} 
                  ${toPos.startX},${toPos.y}
              `}
              stroke="url(#line-gradient)"
              strokeWidth="2.5"
              fill="none"
              markerEnd="url(#fancyArrow)"
              markerStart="url(#dotMarker)"
              style={{
                filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1))",
                transition: "all 0.2s ease",
              }}
              className="dependency-line"
              animate={{
                d: `M ${fromPos.endX},${fromPos.y} 
                    C ${fromPos.endX + controlPointOffset},${fromPos.y} 
                      ${midX - controlPointOffset},${toPos.y} 
                      ${toPos.startX},${toPos.y}`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          ),
        });
      }
    });

    setLinesRender(newLines);
  }, [tasks, draggedTask, bottomRow, dayColumnWidth, calculateTaskPosition]);

  useEffect(() => {
    // Re-render lines whenever task positions or dependencies change
    renderDependencyLinesForAllTasks();
  }, [tasks, draggedTask]); // Re-run on tasks or draggedTask update

  return (
    <div className="max-w-fit relative">
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <marker
            id="dotMarker"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <circle cx="5" cy="5" r="3" fill="currentColor" />

            <circle cx="5" cy="5" r="1.5" fill="white" />
          </marker>
          <linearGradient
            id="gradientArrow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "blue", stopOpacity: 1 }} />
          </linearGradient>
          <marker
            id="gradientArrowMarker"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0,0 L 10,5 L 0,10 Z" fill="url(#gradientArrow)" />
          </marker>
          <marker
            id="fancyArrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0,0 L 10,5 L 0,10 Z" fill="currentColor" />
          </marker>
          <marker
            id="arrowhead"
            markerWidth="6" /* Reduced size */
            markerHeight="6"
            refX="6" /* Ensures it aligns well with the line */
            refY="3" /* Center of the marker */
            orient="auto"
          >
            <path
              d="M 0 0 L 6 3 L 0 6 Z" /* Sleek triangle shape */
              fill="currentColor" /* Matches line color */
            />
          </marker>

          {/* Gradient definition */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        {linesRender.map((l) => l.line)}
      </svg>
      <div
        ref={headerRef}
        className="w-full sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-muted whitespace-nowrap"
      >
        {/* Top Row */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${topRow.length}, auto)`,
          }}
        >
          {topRow.map(
            (
              item: {
                width: any;
                label:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | MotionValue<number>
                  | MotionValue<string>
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <AnimatedDiv
                key={index}
                className="text-center border-r text-sm border-slate-200 dark:border-muted font-semibold"
                style={{ width: `${item.width}px` }}
              >
                {item.label}
              </AnimatedDiv>
            )
          )}
        </div>

        {/* Bottom Row */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${bottomRow.length}, auto)`,
          }}
        >
          {bottomRow.map((item, index: React.Key | null | undefined) => (
            <AnimatedDiv
              key={index}
              className={`"text-center border-r border-slate-200 dark:border-muted" ${
                new Date().toDateString() === item.date.toDateString() &&
                "rounded-r-sm bg-lime-400 font-semibold text-white dark:text-slate-950"
              }`}
              style={{
                width: `${item.width}px`,
                fontSize: "10px",
                lineHeight: "14px",
              }}
            >
              {item.label}
            </AnimatedDiv>
          ))}
        </div>
      </div>

      {/* Scrollable Area */}
      <ScrollArea className="flex-1 h-full max-h-fit">
        <div
          ref={bodyRef}
          className="w-full overflow-x-visible overflow-y-visible scroll-smooth whitespace-nowrap"
          onMouseDown={handleMouseDown}
        >
          <div
            className="grid h-fit"
            style={{
              gridTemplateRows: gridTemplateRows,
              gridTemplateColumns: `repeat(${
                zoomLevel > 5 ? bottomRow.length : bottomRow.length * 7
              }, auto)`,
            }}
          >
            {/* Grid Columns */}
            {bottomRow.map((i: { width: any }, index: number) => (
              <div
                key={index}
                style={{
                  gridRow: index,
                  gridColumn: index,
                  width: `${i.width}px`,
                }}
              ></div>
            ))}

            {/* Grid Rows */}
            {Array.from({ length: 13 }).map((_, rowIndex) =>
              bottomRow.map((i, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`border-r border-b text-xs transition-all duration-300 ${
                    isOver === colIndex + 1
                      ? "bg-slate-200/70 dark:bg-muted/70"
                      : ""
                  } ${
                    i.date.toDateString() === new Date().toDateString()
                      ? "border-l-4 border-l-lime-400 dark:border-l-lime-400"
                      : "border-slate-200 dark:border-muted"
                  }`}
                  style={{
                    gridColumn: colIndex + 1,
                    gridRow: rowIndex + 1,
                    height: `${dayColumnWidth}px`,
                  }}
                  onPointerEnter={() => handleMouseEnterGridItem(colIndex + 1)}
                ></div>
              ))
            )}

            {/* Gantt Tasks */}
            {tasks.map((task, index: number) => {
              const gridDayColStart =
                differenceInDays(task.startDate, bottomRow[0].date) + 1;
              const gridDayColEnd =
                differenceInDays(task.endDate, bottomRow[0].date) + 2;

              return (
                <div
                  key={index}
                  style={{
                    gridRow: calculateGridRow(index, tasks, isExpanded),
                    gridColumnStart: gridDayColStart,
                    gridColumnEnd: gridDayColEnd,
                    position: "relative", // Ensures subtasks are positioned correctly
                  }}
                  className="flex flex-col"
                >
                  {/* Task Header */}
                  <div
                    style={{ height: dayColumnWidth }}
                    className="flex justify-between cursor-pointer"
                    onClick={() => toggleSubtasks(task.id)}
                  >
                    <div className="w-full">
                      <GanttTask
                        comments={task.comments}
                        ddependencyStatus={task.ddependencyStatus}
                        dependencies={task.dependencies}
                        dependencyLog={task.dependencyLog}
                        dependencyNotification={task.dependencyNotification}
                        dependents={task.dependents}
                        isCritical={task.isCritical}
                        lastUpdated={task.lastUpdated}
                        onDrag={() => null}
                        onDragStart={onDragStart}
                        key={task.id}
                        teamMembers={task.teamMembers}
                        description={task.description}
                        endDate={task.endDate}
                        startDate={task.startDate}
                        id={task.id}
                        title={task.title}
                        isExpanded={isExpanded}
                        gridRow={calculateGridRow(index, tasks, isExpanded)}
                        onDragEnd={(e, info, task) => onDragEnd(e, info, task)}
                        gridColStart={gridDayColStart}
                        gridColEnd={gridDayColEnd}
                        priority={task.priority}
                        tags={task.tags}
                        status={task.status}
                        progress={task.progress}
                        color={task.color}
                        onResize={(dir, task) => null}
                      />
                    </div>
                  </div>

                  {/* Subtasks Overlay */}
                  {isExpanded.indexOf(task.id) != -1 && task.subtasks && (
                    <div
                      className="absolute top-full left-0 px-1  w-full space-y-1   rounded"
                      style={{
                        gridColumnStart: gridDayColStart,
                        gridColumnEnd: gridDayColEnd,
                      }}
                    >
                      {task.subtasks.map((subtask, subIndex) => (
                        <GanttSubTask
                          isExpanded={isExpanded}
                          key={subtask.id}
                          comments={subtask.comments}
                          ddependencyStatus={subtask.ddependencyStatus}
                          dependencies={subtask.dependencies}
                          dependencyLog={subtask.dependencyLog}
                          dependencyNotification={
                            subtask.dependencyNotification
                          }
                          dependents={subtask.dependents}
                          isCritical={subtask.isCritical}
                          lastUpdated={subtask.lastUpdated}
                          id={subtask.id}
                          title={subtask.title}
                          tags={subtask.tags}
                          priority={subtask.priority}
                          status={subtask.status}
                          startDate={subtask.startDate}
                          endDate={subtask.endDate}
                          progress={subtask.progress}
                          color={subtask.color}
                          teamMembers={subtask.teamMembers}
                          gridRow={index + subIndex + 2}
                          onDragEnd={(e, info, subtask) =>
                            onDragEnd(e, info, subtask)
                          }
                          gridColStart={
                            differenceInDays(
                              subtask.startDate,
                              bottomRow[0].date
                            ) + 1
                          }
                          gridColEnd={
                            differenceInDays(
                              subtask.endDate,
                              bottomRow[0].date
                            ) + 2
                          }
                          onResize={() => null}
                          onDragStart={onDragStart}
                          onDrag={() => null}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GanttChart;
