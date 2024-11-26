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
  differenceInWeeks,
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
  generateDaysAndHours,
  generateWeeksAndMonths,
} from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import GanttSubTask from "./GanttSubTask.component";
import { useScrollSync } from "@/lib/hooks/use-scroll-sync";
import { useDragToScroll } from "@/lib/hooks/use-drag-scroll";
import { useToggle } from "@/lib/hooks/use-toggle";
import { useDragAndDrop } from "@/lib/hooks/use-drag-n-drop";

interface GanttChartForWeeksAndMonthsProps {
  zoomLevel: number;
  tasks: GanttTaskProps[];
  onForceRerender: () => void;
}

const AnimatedDiv = motion.div;

const GanttChartForWeeksAndMonths: React.FC<
  GanttChartForWeeksAndMonthsProps
> = ({ zoomLevel, tasks, onForceRerender }) => {
  const { headerRef, bodyRef } = useScrollSync();
  const { handleMouseDown } = useDragToScroll(bodyRef);
  const { isExpanded, toggle } = useToggle();
  const dayColumnWidth = 42;
  const dispatch = useDispatch();
  const { draggedTask, onDragStart, onDragEnd } = useDragAndDrop(
    zoomLevel,
    dispatch,
    dayColumnWidth * 7,
    onForceRerender
  );
  const startDate = startOfMonth(new Date()); //addDays(new Date(), -3);
  const { topRow, bottomRow } = generateWeeksAndMonths(
    startDate,
    tasks,
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

  return (
    <div className="max-w-fit">
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
          {bottomRow.map(
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
                className="text-center border-r border-slate-200 dark:border-muted"
                style={{
                  width: `${item.width}px`,
                  fontSize: "10px",
                  lineHeight: "14px",
                }}
              >
                {item.label}
              </AnimatedDiv>
            )
          )}
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
              bottomRow.map((_: any, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`border-r border-b border-slate-200 dark:border-muted text-xs transition-all duration-300 ${
                    isOver === colIndex + 1
                      ? "bg-slate-200/70 dark:bg-muted/70"
                      : ""
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
            {tasks.map((task, index) => {
              const gridDayColStart = differenceInWeeks(
                task.startDate,
                bottomRow[0].date
              );
              const gridDayColEnd = differenceInWeeks(
                task.endDate,
                bottomRow[0].date
              );

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

export default GanttChartForWeeksAndMonths;
