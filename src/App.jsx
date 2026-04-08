import './App.css'
import img from '/ms.png';

import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./components/ThemeProvider";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";
import { useState } from "react";
import RangeIndicator from "./components/RangeIndicator";
import heroJan from '/jan.webp';
import heroFeb from '/feb.jpg';
import heroMar from '/mar.webp';
import heroApr from '/apr.jpg';
import heroMay from '/may.jpeg';
import heroJun from '/june.jpg';
import heroJul from '/july.webp';
import heroAug from '/aug.avif';
import heroSep from '/sep.jpg';
import heroOct from '/oct.jpg';
import heroNov from '/nov.jpg';
import heroDec from '/dec.jpg';


function App() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const now = new Date();

  const [selected, setSelected] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  });

  // Range selection state
  const [range, setRange] = useState({ start: null, end: null });
  const [selectionStep, setSelectionStep] = useState(0); // 0: start, 1: end

  const handleRangeSelect = (date) => {
    if (selectionStep === 0) {
      setRange({ start: date, end: null });
      setSelectionStep(1);
    } else if (selectionStep === 1) {
      if (range.start && date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ start: range.start, end: date });
      }
      setSelectionStep(0);
    }
  };

  const handleRangeClear = () => {
    setRange({ start: null, end: null });
    setSelectionStep(0);
  };

  const handleDayClick = (day) => {
    setSelected((prev) => ({
      ...prev,
      day,
    }));
  };

  const handlePrevMonth = () => {
    setSelected((prev) => {
      let month = prev.month - 1;
      let year = prev.year;
      if (month < 0) {
        month = 11;
        year--;
      }
      return { ...prev, month, year };
    });
  };

  const handleNextMonth = () => {
    setSelected((prev) => {
      let month = prev.month + 1;
      let year = prev.year;
      if (month > 11) {
        month = 0;
        year++;
      }
      return { ...prev, month, year };
    });
  };

  



  const monthImages = [
    heroJan, heroFeb, heroMar, heroApr, heroMay, heroJun,
    heroJul, heroAug, heroSep, heroOct, heroNov, heroDec
  ];

  return (
    <ThemeProvider>
      <div className="h-auto lg:h-screen w-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-500">
        {/* Container */}
        <div className="relative h-full w-full max-w-7xl rounded-2xl shadow-xl  pt-2 lg:pt-10 bg-white dark:bg-black dark:text-gray-100 transition-colors duration-500">
          <img
            src={img}
            alt="Metal String"
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-full z-10 rounded-2xl "
          />
          <div className="w-full h-56 sm:h-64 lg:h-[35%] rounded-t-10xl relative overflow-hidden">
            <img
              src={monthImages[selected.month]}
              className="w-full h-full object-cover object-top transition-opacity duration-500"
              width={1920}
              height={1080}
            />
            <div className="absolute bottom-0 left-0 w-full h-32 
bg-gradient-to-t from-white to-transparent 
dark:from-black">
            </div>
            <div className="absolute bottom-4 right-4 flex  items-end z-20">
              <span className="text-[1.5rem] lg:text-[4rem] font-bold text-black dark:text-gray-300 lg:tracking-wide   px-3 py-1 ">
                {monthNames[selected.month]} {selected.year}
              </span>

            </div>
            <div className="absolute top-6 lg:top-14 right-3 lg:right-7">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="w-full h-[65%] flex flex-col md:flex-row gap-0 items-stretch justify-center rounded-b-2xl">

            {/* Calendar */}
            <div className="order-1 md:order-2 md:w-2/3 w-full flex flex-col items-center justify-center p-4">
              <Calendar
                year={selected.year}
                month={selected.month}
                onDayClick={handleDayClick}
                selectedDay={selected.day}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                range={range}
                selectionStep={selectionStep}
                onRangeClear={handleRangeClear}
                onRangeSelect={handleRangeSelect}
              />
            </div>

            {/* Notes */}
            <div className="order-2 md:order-1 md:w-1/3 w-full flex flex-col p-4">
              <Notes
                year={selected.year}
                month={selected.month}
                day={selected.day}
                range={range}
                selectionStep={selectionStep}
              />
            </div>

          </div>
        </div>
      </div>
    
    </ThemeProvider >
  );
}

export default App