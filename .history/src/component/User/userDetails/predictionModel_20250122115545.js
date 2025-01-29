import React from 'react';
import { Modal, Button, Radio, Typography } from 'antd';
import { DateTime } from 'luxon';

const { Text } = Typography;

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
      {luckStatuses.map((status) => (
        <Radio.Button key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Radio.Button>
      ))}
    </Radio.Group>
  </Modal>
);

export default PredictionModal;
