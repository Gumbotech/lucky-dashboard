import React from 'react';
import { Button, Calendar, Card } from 'antd';

const AstrologicalCalendar = ({ predictions, onDateSelect, dateCellRender, onSavePredictions }) => (
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

export default AstrologicalCalendar;
