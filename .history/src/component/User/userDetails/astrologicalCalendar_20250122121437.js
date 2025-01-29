import React from 'react';
import { Button, Calendar, Card, Tag } from 'antd';
import { DateTime } from 'luxon';
import { capFirst, isDateWithinRange } from '../../../utils/utils';

const AstrologicalCalendar = ({ predictions, onDateSelect, onSavePredictions }) => {
  const dateCellRender = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());

    // Green background underline for 30 days from today
    const cellContent = [];
    if (isDateWithinRange(luxonDate)) {
      cellContent.push(
        <div
          key="highlight"
          style={{
            backgroundColor: '#ccedcc',
            width: '100%',
            height: '4px',
            position: 'absolute',
            bottom: -2,
            left: 0,
          }}
        />
      );
    }

    // Check for prediction and render the badge accordingly
    const prediction = predictions.find(
      (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate() // Compare without time
    );

    if (prediction) {
      const color =
        prediction.type === 'lucky' ? 'green' : prediction.type === 'unlucky' ? 'red' : 'blue';

      cellContent.push(
        <Tag
          key="badge"
          color={color}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            width: '100%',
          }}
        >
          {capFirst(prediction.type)}
        </Tag>
      );
    }

    return <div>{cellContent}</div>;
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="las la-calendar-alt" style={{ marginRight: 8 }}></i>
            <span>Astrological Predictions</span>
          </div>
          <Button type="primary" onClick={onSavePredictions}>
            Save Predictions
          </Button>
        </div>
      }
    >
      <Calendar onSelect={onDateSelect} cellRender={dateCellRender} />
    </Card>
  );
};

export default AstrologicalCalendar;
