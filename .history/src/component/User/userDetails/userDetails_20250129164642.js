import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Empty, Spin, message } from 'antd';
import AstrologicalCalendar from './components/astrologicalCalendar';
import PredictionModal from './components/predictionModel';
import { UserDetailsHeader, AccountInformation } from './components/userDetailsComponents';
import { getMonthsBetween, isDateWithinRange, timeout } from '../../../utils/utils';
import { getUserCalendar, updateUserCalendar } from '../../../services/user/userCalendarService';



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

  const fetchDataAsPerDate = async () => {
    if (user) {
      setLoading(true);
      setPredictions([]);//reset data..

      const months = getMonthsBetween(DateTime.now().toMillis(), user.calendarStatusData.endTime);
      //get data for all months from - CURRENT MONTH to PREMIUM END MONTH..
      for (let month of months) {
        await fetchUserCalendar(month);
      }
      setLoading(false);
    }
  }

  const handleSavePredictionApiCaller = async () => {
    setLoading(true)

    const groupedPredictions = {};

    // Group predictions by month
    predictions.forEach((prediction) => {
      const month = DateTime.fromISO(prediction.date).toFormat('MM-yyyy');
      if (!groupedPredictions[month]) {
        groupedPredictions[month] = [];
      }
      groupedPredictions[month].push(prediction);
    });

    // Iterate over each month and prepare the payload for the API
    for (const [month, predictionsForMonth] of Object.entries(groupedPredictions)) {
      // Filter predictions that are within the date range for the month
      const filteredPredictions = predictionsForMonth.filter((prediction) =>
        isDateWithinRange(DateTime.fromISO(prediction.date), user.calendarStatusData.endTime)
      );

      // Format the luckStatus object for the API
      const formattedLuckStatus = filteredPredictions.reduce((acc, prediction) => {
        const day = DateTime.fromISO(prediction.date).day;
        acc[day] = prediction.type;
        return acc;
      }, {});

      const payload = {
        userId: user.userDetailsResponse.userId,
        subscriptionId: user.calendarStatusData.subscriptionId,
        month: month,
        luckStatus: formattedLuckStatus,
      };

      try {
        const response = await updateUserCalendar(user.userDetailsResponse.userId, user.calendarStatusData.subscriptionId, month, formattedLuckStatus);
        message.success(`Predictions for ${month} saved successfully:`);
        console.log(`Predictions for ${month} saved successfully:`, response);
      } catch (error) {
        message.error(`Failed to save predictions for ${month}:`, error);
        console.error(`Failed to save predictions for ${month}:`, error);
      }
    }
    setIsModalOpen(false);
  };



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

      setPredictions((prevPredictions) => {
        // Create a map to track unique dates
        const predictionMap = new Map();
        prevPredictions.forEach(prediction => predictionMap.set(prediction.date, prediction));
        newPredictions.forEach(prediction => predictionMap.set(prediction.date, prediction));
        return Array.from(predictionMap.values());
      });

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
    const newPrediction = { date: selectedDate.toISODate(), type: predictionType, description };

    const updatedPredictions = [...predictions];
    const existingIndex = predictions.findIndex(
      (p) => DateTime.fromISO(p.date).toISODate() === selectedDate.toISODate()
    );
    console.log('EXISTING INDEX : ',existingIndex);
    console.log('BEFORE PREDICTIONS : ',predictions);

    
    if (existingIndex !== -1) {
      updatedPredictions[existingIndex] = newPrediction;
    } else {
      updatedPredictions.push(newPrediction);
    }
    setPredictions(updatedPredictions);
    setIsModalOpen(false);

    console.log('UPDATED PREDICTIONS : ',updatedPredictions);
    console.log('ALL PREDICTIONS : ',predictions);
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

      <UserDetailsHeader />
      <AccountInformation user={user} />
      <Spin size='large' spinning={loading}>
        <AstrologicalCalendar
          user={user}
          predictions={predictions}
          onDateSelect={handleDateSelect}
          onFetchPredictions={fetchDataAsPerDate}
          onSavePredictions={(handleSavePredictionApiCaller)}
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
