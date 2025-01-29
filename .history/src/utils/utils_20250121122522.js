import { DateTime } from 'luxon';

// Utility to convert timestamp to readable date and time
export const formatTimestamp = (timestamp) => {
  return DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATETIME_MED);
};
