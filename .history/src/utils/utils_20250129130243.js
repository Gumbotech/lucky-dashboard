import { DateTime } from 'luxon';

export const isDateWithinRange = (date, endDate) => {
  const today = DateTime.now().startOf('day');

  // Check if endDate is valid (is a number and not undefined)
  if (typeof endDate !== 'number' || isNaN(endDate)) {
    console.error("Invalid endDate: ", endDate);
    return false;
  }

  const end = DateTime.fromMillis(endDate);
  const rangeEnd = today.plus({ days: 30 });

  const finalEndDate = end > rangeEnd ? end : rangeEnd;
  return date >= today && date <= finalEndDate;
};


export const formatTimestamp = (timestamp) => {
  if (typeof timestamp === 'number' && timestamp > 0) {
    try {
      return DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATETIME_MED);
    } catch {
      return timestamp;
    }
  }
  return timestamp;
};

// utils.js
export const capFirst = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}

// Function to calculate the number of months from the current month to the month of 'endTime'
export const getMonthsBetween = (startDate, endDate) => {
  const start = DateTime.fromMillis(startDate); // Convert start date (current date)
  const end = DateTime.fromMillis(endDate).plus; // Convert end time (from user data)

  let months = [];
  let currentMonth = start;

  while (currentMonth.month <= end.month) {
    months.push(currentMonth.toFormat('MM-yyyy')); // Add current month to the array
    currentMonth = currentMonth.plus({ months: 1 }); // Move to the next month
  }

  return months;
};

