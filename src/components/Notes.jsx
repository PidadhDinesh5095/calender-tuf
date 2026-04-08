import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

function getDateKey(date) {
  return `notes-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getDatesInRange(start, end) {
  const dates = [];
  let d = new Date(start);
  while (d <= end) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

export default function Notes({ year, month, day, range, selectionStep }) {
  // If a valid range is selected, use it; if only start is selected, treat as single day
  const isRange = range && range.start && range.end;
  const isSingleRange = range && range.start && !range.end;
  const dates = isRange
    ? getDatesInRange(range.start, range.end)
    : isSingleRange
      ? [range.start]
      : [new Date(year, month, day)];

  // For range, show a combined note if all notes are the same, otherwise blank
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isRange) {
      const notes = dates.map((d) => localStorage.getItem(getDateKey(d)) || "");
      // If all notes are the same, show it; else blank
      const allSame = notes.every((n) => n === notes[0]);
      setNote(allSame ? notes[0] : "");
    } else {
      setNote(localStorage.getItem(getDateKey(dates[0])) || "");
    }
  }, [year, month, day, range?.start, range?.end]);

  const handleChange = (e) => {
    setNote(e.target.value);
    if (isRange) {
      dates.forEach((d) => localStorage.setItem(getDateKey(d), e.target.value));
    } else {
      localStorage.setItem(getDateKey(dates[0]), e.target.value);
    }
  };

  const label = isRange
    ? `${dates[0].toLocaleDateString()} → ${dates[dates.length - 1].toLocaleDateString()}`
    : dates[0].toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' });

  return (
    <div className="flex flex-col h-full p-4  rounded-xl  w-full ">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 lg:w-8 lg:h-8 text-orange-300" />
        <span className="font-semibold text-lg lg:text-[2rem] text-gray-700 dark:text-gray-100">Notes</span>
        <span className="text-gray-400 text-sm lg:text-xl ml-2">— {label}</span>
      </div>
      <textarea
        className="flex-1 resize-none rounded lg:text-lg  shadow-lg bg-transparent border border-gray-400 p-2 text-gray-700 dark:text-gray-100  focus:outline-none focus:ring-2  placeholder-gray-400"
        value={note}
        onChange={handleChange}
        placeholder={`Add notes for ${label}...`}
        rows={10}
      />
    </div>
  );
}
