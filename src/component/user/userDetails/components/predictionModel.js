import React from 'react';
import { Modal, Button, Radio, Typography, Space } from 'antd';
import { DateTime } from 'luxon';

const { Text } = Typography;

const PredictionModal = ({
  luckStatuses,
  isOpen,
  selectedDate,
  selectedDates,
  predictionType,
  onClose,
  onSave,
  onTypeChange,
  onClearAll,
}) => (
  <Modal
    title="Add/Edit Prediction"
    open={isOpen}
    onCancel={onClose}
    footer={[
      <Button key="clear" onClick={onClearAll} disabled={selectedDates.length === 0}>
        Clear All
      </Button>,
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="save" type="primary" onClick={onSave}>
        Save
      </Button>,
    ]}
  >
    {selectedDates.length > 0 ? (
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <Text>Dates:</Text>
        </div>
        <Space wrap size={[8, 8]}>
          {selectedDates.map((dateString) => (
            <div
              key={dateString}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '8px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '100px',
              }}
            >
              {DateTime.fromISO(dateString).toFormat('MMM d, yyyy')}
            </div>
          ))}
        </Space>
      </div>
    ) : (
      <div style={{ marginBottom: 16 }}>
        <Text>Date: {selectedDate?.toLocaleString(DateTime.DATE_MED)}</Text>
      </div>
    )}

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
