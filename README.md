# Calendar-TUF

A modern calendar application built with React and Tailwind CSS. This app features a calendar view, a range indicator for date selection, and a notes system for adding reminders or comments to specific dates. Below you'll find a detailed explanation of the implementation and instructions for running the project locally.

---

## Table of Contents
- [Features](#features)
- [Implementation Details](#implementation-details)
  - [Calendar Component](#calendar-component)
  - [Range Indicator](#range-indicator)
  - [Notes System](#notes-system)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [License](#license)

---

## Features
- **Interactive Calendar**: View days, select dates, and navigate between months.
- **Range Selection**: Select a range of dates with visual feedback.
- **Notes**: Add, view, and manage notes for specific dates.
- **Theme Toggle**: Switch between light and dark modes.

---

## Implementation Details

### Calendar Component
- **File**: `src/components/Calendar.jsx`
- **Description**: Renders the main calendar grid, handles month navigation, and manages date selection. Integrates with the range indicator and notes system.
- **Key Features**:
  - Displays days of the current month.
  - Allows navigation to previous/next months.
  - Handles click events for selecting single dates or a range.
  - Highlights selected and ranged dates.

### Range Indicator
- **File**: `src/components/RangeIndicator.jsx`
- **Description**: Visually indicates the selected date range on the calendar. Works in tandem with the calendar component to show the start and end of the range.
- **Key Features**:
  - Receives start and end dates as props.
  - Highlights all dates within the selected range.
  - Updates dynamically as the user selects new ranges.

### Notes System
- **File**: `src/components/Notes.jsx`
- **Description**: Allows users to add, view, and delete notes for specific dates. Notes are typically stored in local state or local storage for persistence.
- **Key Features**:
  - Associates notes with specific dates.
  - Provides UI for adding and removing notes.
  - Displays notes when a date is selected.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/PidadhDinesh5095/calender-tuf.git/
   cd calender-tuf
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running Locally
Start the development server with:
```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Project Structure
```
calender-tuf/
├── public/                # Static assets
├── src/
│   ├── App.jsx            # Main app component
│   ├── components/
│   │   ├── Calendar.jsx   # Calendar UI and logic
│   │   ├── Notes.jsx      # Notes system
│   │   ├── RangeIndicator.jsx # Range highlighting
│   │   └── ...            # Other UI components
│   └── ...
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── ...
```

---

## Customization
- **Themes**: Modify `ThemeProvider.jsx` and `ThemeToggle.jsx` for custom themes.
- **Styling**: Edit Tailwind classes in component files or update `tailwind.config.js`.
- **Assets**: Add images or icons to the `public/` or `src/assets/` folders.

---


