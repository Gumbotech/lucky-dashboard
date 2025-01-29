import React, { useState } from 'react';
import { DateTime } from 'luxon'; // Import Luxon
import { Badge, Button, Calendar, Card, Descriptions, Input, Modal, Radio, Typography } from 'antd';
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
      <Descriptions.Item label="Name">{user.name ?? "--"}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email ?? "--"}</Descriptions.Item>
      <Descriptions.Item label="Contact">{user.number ?? "--"}</Descriptions.Item>
      <Descriptions.Item label="Date of birth">{user.dob ?? "--"}</Descriptions.Item>
      <Descriptions.Item label="Time of birth , Place of birth">{user.description ?? "--"}</Descriptions.Item>
      <Descriptions.Item label="Member Since"> {formatTimestamp(user.createdAt) ?? "--"}</Descriptions.Item>
    </Descriptions>
  </Card>
);

const AstrologicalCalendar = ({ predictions, onDateSelect, dateCellRender }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <i className="las la-calendar-alt" style={{ marginRight: 8 }}></i>
        <span>Astrological Predictions</span>
      </div>
    }
  >
    <Calendar onSelect={onDateSelect} dateCellRender={dateCellRender} />
  </Card>
);

const PredictionModal = ({
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
    <Radio.Group
      value={predictionType}
      onChange={onTypeChange}
      style={{ marginBottom: 16 }}
    >
      <Radio.Button value="lucky">Lucky</Radio.Button>
      <Radio.Button value="normal">Normal</Radio.Button>
      <Radio.Button value="unlucky">Unlucky</Radio.Button>
    </Radio.Group>
    <Input.TextArea
      placeholder="Enter prediction description"
      value={description}
      onChange={onDescriptionChange}
      rows={4}
    />
  </Modal>
);

export default function UserDetailsPage({ user }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionType, setPredictionType] = useState('normal');
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
    if (selectedDate && description) {
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
      setDescription('');
      setPredictionType('normal');
    }
  };

  const dateCellRender = (date) => {
    const luxonDate = DateTime.fromJSDate(date.toDate());

    // Highlight eligible dates within the next 30 days
    if (isDateWithinRange(luxonDate)) {
      return (
        <div
          style={{
            backgroundColor: VideoColorSpace., // Light green tint for eligible dates
            width: '100%',
            height: '5px', // Adjust height for a bar at the bottom
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        />
      );
    }

    const prediction = predictions.find(
      (p) => DateTime.fromISO(p.date).toISODate() === luxonDate.toISODate() // Compare without time
    );

    if (prediction) {
      const color =
        prediction.type === 'lucky' ? 'green' : prediction.type === 'unlucky' ? 'red' : 'blue';

      return (
        <Badge
          color={color}
          text={
            <Text ellipsis style={{ width: 100 }}>
              {prediction.description}
            </Text>
          }
        />
      );
    }

    return null;
  };

  const dummyUser = user || defaultUser;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <UserDetailsHeader />
      <AccountInformation user={dummyUser} />

      {/* Astrological Calendar */}
      <AstrologicalCalendar
        predictions={predictions}
        onDateSelect={handleDateSelect}
        dateCellRender={dateCellRender}
      />

      {/* Prediction Modal */}
      <PredictionModal
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
