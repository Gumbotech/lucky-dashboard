import React, { useMemo, useState } from 'react';
import { Button, Calendar, Card, Tag, Checkbox } from 'antd';
import { DateTime } from 'luxon';
import { capFirst, inRange } from '../../../../utils/utils';

const highlightStyle = {
  backgroundColor: '#ccedcc',
  width: '100%',
  height: '4px',
  position: 'absolute',
  bottom: -2,
  left: 0,
};

const tagStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  width: '100%',
};

// Disable text selection
const noSelectStyle = {
  userSelect: 'none', // Disables text selection
  WebkitUserSelect: 'none', // Safari
  MozUserSelect: 'none', // Firefox
};

const AstrologicalCalendar = ({
  user,
  predictions,
  onDateSelect,
  onSavePredictions,
  onFetchPredictions,
  selectedDates,
  setSelectedDates,
}) => {

  //for checkbox selected dates..
  const handleDateSelect = (date) => {
    console.log(`Date Select Called :`, date);
    const luxonDate = DateTime.fromJSDate(date.toDate());
    const dateString = luxonDate.toISODate();

    setSelectedDates((prevSelectedDates) => {
      console.log(`Date Select to add :`, dateString);
      console.log(`Date Select PREV Dates :`, prevSelectedDates);
      if (prevSelectedDates.includes(dateString)) {
        return prevSelectedDates.filter((d) => d !== dateString); // Deselect if already selected
      } else {
        return [...prevSelectedDates, dateString]; // Select the date
      }
    });
  };

  const dateCellRender = useMemo(() => {
    return (date) => {
      const luxonDate = DateTime.fromJSDate(date.toDate());
      const dateString = luxonDate.toISODate();
      const isSelected = selectedDates.includes(dateString);

      const cellContent = [];

      // Add underline highlight for dates within range
      const isInRange = user?.calendarStatusData?.endTime && inRange(luxonDate, user);
      if (isInRange) {
        cellContent.push(<div key="highlight" style={highlightStyle} />);
      }

      // Find and render predictions
      const prediction = predictions.find(
        (p) => DateTime.fromISO(p.date).toISODate() === dateString
      );

      if (prediction) {
        const color =
          prediction.type === 'lucky' ? 'green' : prediction.type === 'unlucky' ? 'red' : 'blue';

        cellContent.push(
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '8px',
            height: '100%',
          }}>
            <Tag key="badge" color={color} style={tagStyle}>
              {capFirst(prediction.type)}
            </Tag>
          </div>
        );
      }

      return (
        <div
          style={noSelectStyle} // Apply no selection style here
        >
          {/* Clickable area for the date */}
          <div onClick={(event) => {
            if (event.ctrlKey) {
              handleDateSelect(date);
            } else {
              onDateSelect(date);
            }
            console.log(`THIS ONEDate clicked: ${dateString}`);
          }} 
          style={{ 
            position: 'absolute', 
            backgroundColor: isSelected ? 'rgba(173, 216, 230, 0.5)' : '', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0 
          }}>
            {cellContent}
          </div>
          {/* Checkbox for date selection */}
          {isInRange && <Checkbox
            checked={isSelected}
            onChange={() => handleDateSelect(date)}
            style={{ position: 'absolute', top: 4, left: 4 }}
          />}
        </div>
      );
    };
  }, [predictions, selectedDates]);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="las la-calendar-alt" style={{ marginRight: 8 }}></i>
            <span>Astrological Predictions</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button type="default" onClick={onFetchPredictions}>
              Fetch Predictions
            </Button>
            <Button type="primary" onClick={onSavePredictions}>
              Save Predictions
            </Button>
          </div>
        </div>
      }
    >
      <Calendar cellRender={dateCellRender} />
    </Card>
  );
};

export default AstrologicalCalendar;
