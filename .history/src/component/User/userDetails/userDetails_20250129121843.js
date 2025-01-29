import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Empty, Spin } from 'antd';
import AstrologicalCalendar from './components/astrologicalCalendar';
import PredictionModal from './components/predictionModel';
import { UserDetailsHeader, AccountInformation } from './components/userDetailsComponents';
import { getMonthsBetween, isDateWithinRange, timeout } from '../../../utils/utils';
import { getUserCalendar } from '../../../services/user/userCalendarService';



export default function UserDetailsPage({ configData, user }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionType, setPredictionType] = useState('average');
  const [description, setDescription] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataAsPerDate();
  }, [user]);

  const fetchDataAsPerDate = () => {
    if (user) {
      setLoading(true);
      const months = getMonthsBetween(DateTime.now().toMillis(), user.calendarStatusData.endTime);
      //get data for all months from - CURRENT MONTH to PREMIUM END MONTH..
      months.forEach(async month => {
        await fetchUserCalendar(month);
      });
      timeout(500)
      setLoading(false);
    }
  }

  const fetchUserCalendar = async (date) => {
    try {
      const response = await getUserCalendar(user?.userDetailsResponse?.userId, date); // Fetch data
      const luckStatus = response.luckStatus;

      const month = DateTime.fromFormat(date, 'MM-yyyy').toFormat('MM')

      // Convert luckStatus object into an array of predictions
      const newPredictions = Object.keys(luckStatus).map(day => {
        const date = `2025-${month}-${day.padStart(2, '0')}`; // Format date as '2025-01-DD'
        return {
          date,
          type: luckStatus[day],
          description: '',
        };
      });

      setPredictions((prevPredictions) => [...prevPredictions, ...newPredictions]);

      console.log('Data:', newPredictions);
      console.log('Data month :', month);
      console.log('Data date :', date);
    } catch (error) {
      console.error('Failed to fetch user calendar:', error);
    }
  };

  const handleDateSelect = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());
    setSelectedDate(luxonDate);

    const prediction = predictions.find(
      (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate()
    );

    if (user?.calendarStatusData?.endTime && isDateWithinRange(luxonDate, user.calendarStatusData.endTime)) {
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
      <Spin size='large' spinning={loading}>
        <UserDetailsHeader />
        <AccountInformation user={user} />
        <AstrologicalCalendar
          user={user}
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
