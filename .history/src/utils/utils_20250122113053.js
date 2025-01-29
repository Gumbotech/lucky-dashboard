import { DateTime } from 'luxon';

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


