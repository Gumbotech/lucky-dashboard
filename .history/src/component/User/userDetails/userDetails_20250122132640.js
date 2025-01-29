import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Empty, Spin } from 'antd';
import AstrologicalCalendar from './components/astrologicalCalendar';
import PredictionModal from './components/predictionModel';
import { UserDetailsHeader, AccountInformation } from './components/userDetailsComponents';
import { isDateWithinRange } from '../../../utils/utils';
import { getUserCalendar } from '../../../services/user/userCalendarService';


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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserCalendar(DateTime.now().toFormat('MM-yyyy')); 
      fetchUserCalendar(DateTime.now().plus({ month: 1 }).toFormat('MM-yyyy')); 
    }
  }, [user]);

  const fetchUserCalendar = async (date) => {
    setLoading(true); 
    try {
      const response = await getUserCalendar(user.id, date); // Fetch data
      const luckStatus = response.luckStatus; 

      const month = DateTime.fromFormat(date,'MM-yyyy').toFormat('MM')

      // Convert luckStatus object into an array of predictions
      const newPredictions = Object.keys(luckStatus).map(day => {
        const date = `2025-${month}-${day.padStart(2, '0')}`; // Format date as '2025-01-DD'
        return {
          date,
          type: luckStatus[day],
          description: '',
        };
      });
      
      if(predictions != initialPredictions){
        setPredictions((prevPredictions) => [...prevPredictions, ...newPredictions]);
      }else{
        setPredictions(newPredictions);
      }

      console.log('Data:', newPredictions);
      console.log('Data month :', month);
      console.log('Data date :', date);
    } catch (error) {
      console.error('Failed to fetch user calendar:', error);
    } finally {
      setLoading(false); 
    }
  };

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

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', paddingBottom: '48px' }}>
      <Spin spinning={loading}>
        <UserDetailsHeader />
        <AccountInformation user={user} />
        <AstrologicalCalendar
          predictions={predictions}
          onDateSelect={handleDateSelect}
          onSavePredictions={() => console.log('Predictions saved:', predictions)}
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
      </Spin>
    </div>
  );
}
