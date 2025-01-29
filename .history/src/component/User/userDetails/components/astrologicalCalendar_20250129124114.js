import React, { useMemo } from 'react';
import { Button, Calendar, Card, Tag } from 'antd';
import { DateTime } from 'luxon';
import { capFirst, isDateWithinRange } from '../../../../utils/utils';

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

const AstrologicalCalendar = ({ user, predictions, onDateSelect, onSavePredictions, onFetchPredictions }) => {
  // Memoize the `dateCellRender` to avoid unnecessary re-renders
  const dateCellRender = useMemo(() => {
    return (date) => {
      const luxonDate = DateTime.fromJSDate(date.toDate());
      const cellContent = [];

      // Add underline highlight for dates within range
      if (user?.calendarStatusData?.endTime && isDateWithinRange(luxonDate, user.calendarStatusData.endTime)) {
        cellContent.push(<div key="highlight" style={highlightStyle} />);
      }

      // Find and render predictions
      const prediction = predictions.find(
        (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate()
      );

      if (prediction) {
        const color =
          prediction.type === 'lucky' ? 'green' : prediction.type === 'unlucky' ? 'red' : 'blue';

        cellContent.push(
          <Tag key="badge" color={color} style={tagStyle}>
            {capFirst(prediction.type)}
          </Tag>
        );
      }

      return <div>{cellContent}</div>;
    };
  }, [predictions]);

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="las la-calendar-alt" style={{ marginRight: 8 }}></i>
            <span>Astrological Predictions</span>
          </div>
          <div>
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
      <Calendar onSelect={onDateSelect} cellRender={dateCellRender} />
    </Card>
  );
};

export default AstrologicalCalendar;
