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

export const AccountInformation = ({ user }) => (
  <Card style={{ marginBottom: 24 }}>
    <Descriptions title="Account Information" bordered column={1}>
      <Descriptions.Item label="Name">{user.name ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Contact">{user.number ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Date of birth">{user.dob ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Time of birth, Place of birth">{user.description ?? '--'}</Descriptions.Item>
      <Descriptions.Item label="Member Since">
        {formatTimestamp(user.createdAt) ?? '--'}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);
