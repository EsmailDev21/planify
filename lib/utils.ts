import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
  addHours,
  addYears,
  differenceInMonths,
  endOfYear,
  startOfYear,
} from "date-fns";
import { TaskModel } from "./types/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generates weeks for a given month
export const generateWeeksForMonth = (
  currentMonth: Date,
  topRow: any[],
  dayColumnWidth: number
) => {
  const startOfMonthDate = startOfMonth(currentMonth);
  const endOfMonthDate = endOfMonth(currentMonth);
  console.log({ startOfMonthDate, endOfMonthDate });
  const daysInMonth = differenceInDays(endOfMonthDate, startOfMonthDate) + 1;

  // Calculate number of weeks by checking the day of the week of the start and end of the month
  const startWeek = Math.floor(startOfMonthDate.getDate() / 7);
  const endWeek = Math.floor(endOfMonthDate.getDate() / 7);
  const numberOfWeeks = endWeek - startWeek;

  for (let i = 0; i < numberOfWeeks; i++) {
    topRow.push({
      label: `${format(currentMonth, "MMMM yyyy")} - Week ${i + 1}`,
      width: dayColumnWidth * 7, // Assuming full weeks (7 days)
    });
  }
};

// Generates months
export const generateMonths = (
  startDate: Date,
  totalDays: number,
  topRow: any[],
  dayColumnWidth: number
) => {
  let currentMonth = startDate;
  while (isBefore(currentMonth, addDays(startDate, totalDays))) {
    const daysInMonth =
      differenceInDays(endOfMonth(currentMonth), startOfMonth(currentMonth)) +
      1;
    topRow.push({
      label: format(currentMonth, "MMMM yyyy"),
      width: daysInMonth * dayColumnWidth,
    });
    currentMonth = addMonths(currentMonth, 1);
  }
};

// Generates weeks
export const generateWeeks = (
  startDate: Date,
  totalDays: number,
  bottomRow: any[],
  dayColumnWidth: number
) => {
  let currentWeek = startDate;
  const numberOfWeeks = Math.ceil(totalDays / 7); // Total weeks needed

  for (let i = 0; i < numberOfWeeks; i++) {
    bottomRow.push({
      label: `Week ${format(currentWeek, "w")}`,
      width: 7 * dayColumnWidth,
      date: currentWeek,
    });
    currentWeek = addWeeks(currentWeek, 1);
  }
};

// Generates days
export const generateDays = (
  startDate: Date,
  totalDays: number,
  bottomRow: any[],
  dayColumnWidth: number
) => {
  for (let i = 0; i < totalDays; i++) {
    const date = addDays(startDate, i);
    bottomRow.push({
      label: `${format(date, "dd")} ${format(date, "EEE")}`,
      width: dayColumnWidth,
      date: date,
    });
  }
};

export const generateRandomColor = () => {
  const colors = [
    "#f43f5e", // Light Pink
    "#fbbf24", // Gold
    "#3b82f6", // Light Sky Blue
    "#22c55e", // Light Green
    "#ef4444", // Light Salmon
    "#8b5cf6", // Light Purple
    "#2dd4bf", // Light Teal
    "#fb923c", // Light Orange
    "#d946ef", // Light Indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomAvatar = () => {
  const avatars = [
    "avatar1", // Light Pink
    "avatar2", // Gold
    "avatar3", // Light Sky Blue
    "avatar4", // Light Green
    "avatar5", // Light Salmon
    "avatar6", // Light Purple
    "avatar7", // Light Teal
    "avatar8", // Light Orange
    "avatar9",
    "avatar10", // Light Indigo
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};
// Function to get a lighter shade of the given color
export const getLighterColor = (color: string) => {
  switch (color) {
    case "#f43f5e":
      return "#fb7185";
    case "#fbbf24":
      return "#fcd34d";
    case "#3b82f6":
      return "#60a5fa";
    case "#22c55e":
      return "#4ade80";
    case "#ef4444":
      return "#f87171";
    case "#8b5cf6":
      return "#a78bfa";
    case "#2dd4bf":
      return "#5eead4";
    case "#fb923c":
      return "#fdba74";
    case "#d946ef":
      return "#e879f9";
    default:
      return "#94a3b8"; // Fallback color
  }
};

export const calculateGridRow = (
  taskIndex: number,
  tasks: any[],
  isExpanded: string[]
) => {
  let row = taskIndex + 1; // Base row index
  for (let i = 0; i < taskIndex; i++) {
    const task = tasks[i];
    if (isExpanded.includes(task.id) && task.subtasks) {
      row += task.subtasks.length; // Add rows for expanded subtasks
    }
  }
  return row;
};

export const generateTimelineForMonthsAndDays = (
  startDate: Date,
  totalDays: number,
  dayColumnWidth: number
) => {
  const topRow: any[] = [];
  const bottomRow: { label: string; width: number; date: Date }[] = [];

  let currentMonth = startDate;
  while (isBefore(currentMonth, addDays(startDate, totalDays))) {
    generateWeeksForMonth(currentMonth, topRow, dayColumnWidth);
    currentMonth = addMonths(currentMonth, 1);
  }
  generateDays(startDate, totalDays, bottomRow, dayColumnWidth);

  return { topRow, bottomRow };
};
export const generateDaysAndHours = (
  startDate: Date,
  tasks: TaskModel[],
  hourColumnWidth: number
) => {
  // Calculate the last task date efficiently
  const lastTaskDate = tasks.reduce(
    (maxDate, task) => (task.endDate > maxDate ? task.endDate : maxDate),
    startDate
  );

  // Calculate total days with a buffer of 5 days
  const totalDays = differenceInDays(lastTaskDate, startDate) + 5;

  const topRow: { label: string; width: number; date: Date }[] = [];
  const bottomRow: { label: string; width: number; date: Date }[] = [];

  for (let i = 0; i < totalDays; i++) {
    const currentDay = addDays(startDate, i);
    topRow.push({
      label: format(currentDay, "dd MMM yyyy"),
      width: 24 * hourColumnWidth,
      date: currentDay,
    });

    // Generate 24 hours for the current day
    for (let j = 0; j < 24; j++) {
      const currentHour = addHours(currentDay, j);
      bottomRow.push({
        label: `${format(currentHour, "HH:mm")}`,
        width: hourColumnWidth,
        date: currentHour,
      });
    }
  }

  return { topRow, bottomRow };
};
export const generateWeeksAndMonths = (
  startDate: Date,
  tasks: TaskModel[],
  dayColumnWidth: number
) => {
  // Determine the end date of tasks
  const lastTaskDate = tasks.reduce(
    (maxDate, task) => (task.endDate > maxDate ? task.endDate : maxDate),
    startDate
  );

  // Calculate total days including a buffer of 7 days
  const totalDays = differenceInDays(lastTaskDate, startDate) + 30;

  const topRow: { label: string; width: number }[] = [];
  const bottomRow: { label: string; width: number; date: Date }[] = [];

  // Generate months
  let currentMonth = startDate;

  // Generate weeks
  let currentWeek = startDate;
  const numberOfWeeks = Math.ceil(totalDays / 7);

  for (let i = 0; i < numberOfWeeks; i++) {
    bottomRow.push({
      label: `Week ${format(currentWeek, "w")}`,
      width: 7 * dayColumnWidth,
      date: currentWeek,
    });
    currentWeek = addWeeks(currentWeek, 1);
  }
  while (isBefore(currentMonth, addDays(startDate, totalDays))) {
    const startOfMonthDate = startOfMonth(currentMonth);
    const endOfMonthDate = endOfMonth(currentMonth);
    const daysInMonth = differenceInDays(endOfMonthDate, startOfMonthDate) + 1;

    topRow.push({
      label: format(currentMonth, "MMMM yyyy"),
      width: bottomRow[1].width * 4,
    });

    currentMonth = addMonths(currentMonth, 1);
  }

  return { topRow, bottomRow };
};

export const generateMonthsAndYears = (
  startDate: Date,
  totalMonths: number,
  monthColumnWidth: number
) => {
  const topRow: { label: string; width: number }[] = [];
  const bottomRow: { label: string; width: number }[] = [];

  let currentYear = startOfYear(startDate);
  const totalYears = Math.ceil(totalMonths / 12);

  for (let i = 0; i < totalYears; i++) {
    const monthsInYear =
      differenceInMonths(endOfYear(currentYear), startOfYear(currentYear)) + 1;

    bottomRow.push({
      label: format(currentYear, "yyyy"),
      width: monthsInYear * monthColumnWidth,
    });

    for (let j = 0; j < 12; j++) {
      const currentMonth = addMonths(startOfYear(currentYear), j);
      if (differenceInMonths(currentMonth, startDate) >= totalMonths) break;

      topRow.push({
        label: format(currentMonth, "MMMM"),
        width: monthColumnWidth,
      });
    }

    currentYear = addYears(currentYear, 1);
  }

  return { topRow, bottomRow };
};
