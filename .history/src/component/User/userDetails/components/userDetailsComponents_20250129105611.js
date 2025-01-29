import React from 'react';
import { Card, Descriptions, Typography } from 'antd';
import { formatTimestamp } from '../../../../utils/utils';

const { Title } = Typography;

export const UserDetailsHeader = () => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
    <i className="las la-user-circle" style={{ fontSize: 32, marginRight: 12 }}></i>
    <Title level={2} style={{ margin: 0 }}>
      User Details
    </Title>
  </div>
);

export const AccountInformation = ({ user }) => {
  const userDetails = user.userDetailsResponse || {};
  const calendarStatus = user.calendarStatusData || {};

  return (
    <Card style={{ marginBottom: 24 }}>
      <Descriptions title="Account Information" bordered column={1}>
        <Descriptions.Item label="Name">{userDetails.name ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Email">{userDetails.email ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Contact">{userDetails.number ?? '--'}</Descriptions.Item>
        <Descriptions.Item span={filled} label="Date of Birth">{userDetails.dob ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Time of Birth, Place of Birth">{userDetails.description ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Member Since">{formatTimestamp(userDetails.createdAt) ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Subscription Status">{calendarStatus.status ?? '--'}</Descriptions.Item>
        <Descriptions.Item label="Subscription Start">{calendarStatus.startTime ? formatTimestamp(calendarStatus.startTime) : '--'}</Descriptions.Item>
        <Descriptions.Item label="Subscription End">{calendarStatus.endTime ? formatTimestamp(calendarStatus.endTime) : '--'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
