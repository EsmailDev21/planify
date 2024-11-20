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
} from "date-fns";

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
