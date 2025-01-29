import React, { useState } from 'react';
import { Typography, Table, Input, Select, Space, Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const dummyUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    pictureUrl: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    status: 'VERIFIED',
    globalRole: 'ADMIN',
    subscriptions: [{ status: 'ACTIVE' }],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    pictureUrl: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    status: 'PENDING',
    globalRole: 'USER',
    subscriptions: [{ status: 'INACTIVE' }],
  },
  {
    id: '102513343597849249606',
    name: 'mohit pardeshi',
    email: 'mohitsinghpardeshi46@gmail.com',
    profileImgUrl: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    bgRemovedUrl: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    status: 'PENDING',
    role: 'USER',
    number: '9454876464',
    dob: '2025-01-19',
    createdAt: 1736831001862,
    updatedAt: '2025-01-19',
    description: '7:47,Nashik, Maharashtra',
    subscriptions: [{ status: 'INACTIVE' }],
  },
  {
    "userId": "102513343597849249606",
    "appUserId": 2,
    "role": "USER",
    "profileImgUrl": null,
    "bgRemovedUrl": null,
    "name": "mohit pardeshi",
    "description": "7:47,Nashik, Maharashtra",
    "email": "mohitsinghpardeshi46@gmail.com",
    "number": "9454876464",
    "username": null,
    "gender": null,
    "dob": "2025-01-19",
    "createdAt": 1736831001862,
    "updatedAt": 1737253071193,
    "metaTags": []
  },
];

const UserListPage = ({ onManageClick }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState(null);

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());

    if (subscriptionFilter === null) return matchesSearch;
    if (subscriptionFilter === 'premium') {
      return (
        matchesSearch && user.subscriptions.some(sub => sub.status === 'ACTIVE')
      );
    }
    return (
      matchesSearch && !user.subscriptions.some(sub => sub.status === 'ACTIVE')
    );
  });

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: record => (
        <Space>
          <img
            src={record.pictureUrl || 'https://i.imgur.com/ZdJSK3Y.jpeg'}
            alt={record.name || 'User'}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'globalRole',
      key: 'role',
      render: role => (
        <Tag color={role === 'ADMIN' ? 'blue' : 'default'}>{role}</Tag>
      ),
    },
    {
      title: 'Subscription',
      key: 'subscription',
      render: record => {
        const hasActiveSub = record.subscriptions.some(
          sub => sub.status === 'ACTIVE',
        );
        return (
          <Tag color={hasActiveSub ? 'gold' : 'default'}>
            {hasActiveSub ? 'Premium' : 'Free'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: record => (
        <Button
          type="primary"
          onClick={() => onManageClick(record)}
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <div>
          <Title level={2}>User Management</Title>
          <Text type="secondary">
            Manage users and their subscriptions in the system
          </Text>
        </div>

        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input
            placeholder="Search by name or email"
            allowClear
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            style={{ width: 200 }}
            placeholder="Filter by subscription"
            allowClear
            onChange={setSubscriptionFilter}
            options={[
              { value: 'premium', label: 'Premium Users' },
              { value: 'free', label: 'Free Users' },
            ]}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: total => `Total ${total} users`,
          }}
        />
      </Space>
    </div>
  );
};

export default UserListPage;
