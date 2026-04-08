import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RangeIndicator from "./RangeIndicator";
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper to get first day of week (0=Sun, 1=Mon, ...)
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar({
  year,
  month,
  onDayClick,
  selectedDay,
  onPrevMonth,
  onNextMonth,
  range,
  selectionStep,
  onRangeClear,
  onRangeSelect
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const weeks = [];
  let day = 1 - firstDay;

  // Build weeks for calendar grid
  // Calculate previous and next month days for leading/trailing cells
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++, day++) {
      if (day < 1) {
        // Previous month
        week.push({ day: prevMonthDays + day, type: "prev" });
      } else if (day > daysInMonth) {
        // Next month
        week.push({ day: day - daysInMonth, type: "next" });
      } else {
        week.push({ day, type: "current" });
      }
    }
    weeks.push(week);
    if (day > daysInMonth) break;
  }

  // Range selection helpers
  function isInRange(day) {
    if (!range || !range.start || !range.end) return false;
    const d = new Date(year, month, day);
    return d >= range.start && d <= range.end;
  }
  function isStart(day) {
    return range && range.start && new Date(year, month, day).getTime() === range.start.getTime();
  }
  function isEnd(day) {
    return range && range.end && new Date(year, month, day).getTime() === range.end.getTime();
  }

  return (
    <div className="w-full  h-full flex flex-col justify-start p-4">
      {/* Range Indicator */}
      {range && (range.start || range.end) && (
        <div className="mb-2">
          <RangeIndicator range={range} selectionStep={selectionStep} onClear={onRangeClear} />
        </div>
      )}
      {/* Calendar Header */}
      <div className="w-full  flex items-center justify-between mb-6">
        <button
          onClick={onPrevMonth}
          className=" w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center rounded-lg bg-gray-800/80 dark:bg-gray-300 text-gray-300 dark:text-gray-700 hover:bg-gray-700"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={onNextMonth}
          className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center rounded-lg bg-gray-800/80 dark:bg-gray-300 text-gray-300 dark:text-gray-700 hover:bg-gray-700"
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Calendar Table */}
      <table className="w-full h-[80%] mt-2 text-center select-none">
        <thead>
          <tr className="text-red-400 text-sm lg:text-xl">
            <th className="font-bold">SUN</th>
            <th className="font-bold">MON</th>
            <th className="font-bold">TUE</th>
            <th className="font-bold">WED</th>
            <th className="font-bold">THU</th>
            <th className="font-bold">FRI</th>
            <th className="font-bold">SAT</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((cell, j) => {
                let baseColor = "";
                if (j === 0 || j === 6) {
                  baseColor = "text-red-600 dark:text-red-400";
                } else {
                  baseColor = "text-black dark:text-white";
                }
                let rangeClass = "";
                if (cell.type === "current" && isInRange(cell.day)) {
                  rangeClass = "bg-blue-200 dark:bg-blue-900 text-black dark:text-white";
                }
                if (cell.type === "current" && isStart(cell.day)) {
                  rangeClass = "bg-green-400 dark:bg-green-700 text-white border-2 border-green-700";
                }
                if (cell.type === "current" && isEnd(cell.day)) {
                  rangeClass = "bg-red-400 dark:bg-red-700 text-white border-2 border-red-700";
                }
                let opacityClass = "";
                if (cell.type !== "current") {
                  opacityClass = "opacity-40 pointer-events-none";
                }
                return (
                  <td
                    key={j}
                    className={`py-2 px-2 h-12 w-12 cursor-pointer rounded-xl transition-all duration-150 text-sm lg:text-xl
                      ${cell.type === "current" && cell.day === selectedDay ? "bg-black dark:bg-white text-white dark:text-black border-2 border-gray-600" :
                        `hover:bg-black/80 dark:hover:bg-white/80 hover:text-white dark:hover:text-black ${baseColor}`}
                      ${rangeClass} ${opacityClass}
                    `}
                    onClick={() => cell.type === "current"
                      ? (onRangeSelect ? onRangeSelect(new Date(year, month, cell.day)) : (onDayClick && onDayClick(cell.day)))
                      : undefined}
                  >
                    {cell.day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
