import { DateTime } from 'luxon';

export const isDateWithinRange = (date) => {
  const today = DateTime.now().startOf('day');
  const rangeEnd = today.plus({ days: 30 });
  return date >= today && date <= rangeEnd;
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



