import React, { useState } from 'react';
import { DateTime } from 'luxon'; // Luxon for date manipulation
import { Calendar, Modal, Typography } from 'antd';

const { Text } = Typography;

const DateRangePopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeStart] = useState(DateTime.now());
  const [rangeEnd] = useState(DateTime.now().plus({ days: 30 }));

  const handleDateSelect = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());

    if (luxonDate < rangeStart || luxonDate > rangeEnd) {
      setSelectedDate(luxonDate);
      setIsModalOpen(true);
    } else {
      // Logic for valid dates
      console.log(`Selected date ${luxonDate.toISODate()} is within range!`);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
      <Text style={{ fontSize: 16, fontWeight: 500 }}>
        Select a date from the calendar:
      </Text>
      <Calendar onSelect={handleDateSelect} />
      <Modal
        title="Invalid Date Selected"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <Text>
          The selected date{' '}
          <Text strong>{selectedDate?.toLocaleString(DateTime.DATE_MED)}</Text>{' '}
          is not within the valid range.
        </Text>
        <br />
        <Text>
          Valid range: <br />
          <Text strong>{rangeStart.toLocaleString(DateTime.DATE_MED)}</Text> to{' '}
          <Text strong>{rangeEnd.toLocaleString(DateTime.DATE_MED)}</Text>.
        </Text>
      </Modal>
    </div>
  );
};

export default DateRangePopup;
