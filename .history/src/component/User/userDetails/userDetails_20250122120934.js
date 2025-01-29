import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Empty } from 'antd';
import AstrologicalCalendar from './astrologicalCalendar';
import PredictionModal from './predictionModel';
import { UserDetailsHeader, AccountInformation } from './userDetailsComponents';
import { isDateWithinRange } from '../../../utils/utils';


const initialPredictions = [
  {
    date: '2025-01-25',
    type: 'lucky',
    description: 'It’s a great day to take risks!',
  },
  {
    date: '2025-01-26',
    type: 'unlucky',
    description: 'Avoid making big decisions today.',
  },
];

export default function UserDetailsPage({ configData, user }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionType, setPredictionType] = useState('average');
  const [description, setDescription] = useState('');
  const [predictions, setPredictions] = useState(initialPredictions);

  const handleDateSelect = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());
    setSelectedDate(luxonDate);

    const prediction = predictions.find(
      (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate()
    );

    if (isDateWithinRange(luxonDate)) {
      setPredictionType(prediction?.type ?? 'average');
      setDescription(prediction?.description ?? '');
      setIsModalOpen(true);
    }
  };

  const handleSavePrediction = () => {
    const newPrediction = { date: selectedDate.toISO(), type: predictionType, description };
    const updatedPredictions = [...predictions];
    const existingIndex = predictions.findIndex(
      (p) => DateTime.fromISO(p.date).toISODate() === selectedDate.toISODate()
    );

    if (existingIndex !== -1) {
      updatedPredictions[existingIndex] = newPrediction;
    } else {
      updatedPredictions.push(newPrediction);
    }
    setPredictions(updatedPredictions);
    setIsModalOpen(false);
  };

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Empty description={'User Not Selected!'} />
      </div>
    );
  }

  const dateCellRender = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());

    // green background underline for 30 days from today..
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', paddingBottom: '48px' }}>
      <UserDetailsHeader />
      <AccountInformation user={user} />
      <AstrologicalCalendar
        predictions={predictions}
        onDateSelect={handleDateSelect}
        onSavePredictions={() => console.log('Predictions saved:', predictions)}
        dateCellRender={dateCellRender}
      />
      <PredictionModal
        luckStatuses={configData?.luckStatuses}
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        predictionType={predictionType}
        description={description}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePrediction}
        onTypeChange={(e) => setPredictionType(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
