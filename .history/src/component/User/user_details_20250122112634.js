import React, { useState } from 'react';
import { DateTime } from 'luxon'; // Import Luxon
import { Badge, Empty, Button, Calendar, Card, Descriptions, Input, Modal, Radio, Tag, Typography } from 'antd';
import { formatTimestamp } from '../../utils/utils';

const { Title, Text } = Typography;

// Dummy user data
const defaultUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'USER',
  number: '9454876464',
  dob: '2025-01-19',
  description: '7:47,Nashik, Maharashtra',
  createdAt: '2023-01-01',
};

// Initial dummy predictions
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

const isDateWithinRange = (date) => {
  const today = DateTime.now().startOf('day');
  const rangeEnd = today.plus({ days: 30 });
  return date >= today && date <= rangeEnd;
};

const UserDetailsHeader = () => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
    <i className="las la-user-circle" style={{ fontSize: 32, marginRight: 12 }}></i>
    <Title level={2} style={{ margin: 0 }}>
      User Details
    </Title>
  </div>
);

const AccountInformation = ({ user }) => (
  <Card style={{ marginBottom: 24 }}>
    <Descriptions title="Account Information" bordered column={1}>
      <Descriptions.Item label="Name">{user.name ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Contact">{user.number ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Date of birth">{user.dob ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Time of birth , Place of birth">{user.description ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Member Since"> {formatTimestamp(user.createdAt) ?? '--'}</Descriptions.Item>
    </Descriptions>
  </Card>
);

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

const PredictionModal = ({
  luckStatuses,
  isOpen,
  selectedDate,
  predictionType,
  description,
  onClose,
  onSave,
  onTypeChange,
  onDescriptionChange,
}) => (
  <Modal
    title="Add/Edit Prediction"
    open={isOpen}
    onCancel={onClose}
    footer={[
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="save" type="primary" onClick={onSave}>
        Save
      </Button>,
    ]}
  >
    <div style={{ marginBottom: 16 }}>
      <Text>Date: {selectedDate?.toLocaleString(DateTime.DATE_MED)}</Text>
    </div>
    <Radio.Group value={predictionType} onChange={onTypeChange} style={{ marginBottom: 16 }}>
      <Radio.Button value="lucky">Lucky</Radio.Button>
      <Radio.Button value="normal">Normal</Radio.Button>
      <Radio.Button value="unlucky">Unlucky</Radio.Button>
    </Radio.Group>
    {/* <Input.TextArea
      placeholder="Enter prediction description"
      value={description}
      onChange={onDescriptionChange}
      rows={4}
    /> */}
  </Modal>
);

export default function UserDetailsPage({configData, user }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionType, setPredictionType] = useState('average');
  const [description, setDescription] = useState('');

  // Manage predictions dynamically
  const [predictions, setPredictions] = useState(initialPredictions);

  const handleDateSelect = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());
    setSelectedDate(luxonDate); // Convert to Luxon DateTime

    const prediction = predictions.find(
      (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate() // Compare without time
    );

    if (isDateWithinRange(luxonDate)) {
      if (prediction) {
        setPredictionType(prediction.type);
        setDescription(prediction.description);
      } else {
        setPredictionType('normal');
        setDescription('');
      }
      setIsModalOpen(true);
    }
  };

  const handleSavePrediction = () => {
    if (selectedDate) {
      const newPrediction = {
        date: selectedDate.toISO(), // Save date in ISO format
        type: predictionType,
        description,
      };

      const existingIndex = predictions.findIndex(
        (p) => DateTime.fromISO(p.date).toISODate() === selectedDate.toISODate()
      );

      if (existingIndex !== -1) {
        const updatedPredictions = [...predictions];
        updatedPredictions[existingIndex] = newPrediction;
        setPredictions(updatedPredictions);
      } else {
        setPredictions([...predictions, newPrediction]);
      }

      setIsModalOpen(false);
      setDescription(newPrediction.description);
      setPredictionType(newPrediction.type);
    }
  };

  const handleSavePredictions = () => {
    console.log('Predictions saved:', predictions);
  };

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
          {prediction.type}
        </Tag>
      );
    }

    return <div>{cellContent}</div>;
  };

  const dummyUser = user ;

  if(!dummyUser){
    return  <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Empty description={'User Not Selected!'} />
    </div>
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', paddingBottom: '48px' }}>
      <UserDetailsHeader />
      <AccountInformation user={dummyUser} />

      {/* Astrological Calendar */}
      <AstrologicalCalendar
        predictions={predictions}
        onDateSelect={handleDateSelect}
        dateCellRender={dateCellRender}
        onSavePredictions={handleSavePredictions}
      />

      {/* Prediction Modal */}
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
      <div style={{ height: '448px' }}></div>
    </div>
  );
}
