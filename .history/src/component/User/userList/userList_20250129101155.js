import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Select, Space, Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserWithStatus } from '../../../services/user/userCalendarService';

const { Title, Text } = Typography;

const UserListPage = ({ configData, onManageClick }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState(null);
  const [userData, setUserData] = useState([]);

  const fetchData = async (status = 'PENDING') => {
    try {
      const response = await getUserWithStatus(status);
      setUserData(response.items || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };  

  useEffect(() => {
    // Fetch user data on mount
    
    fetchData();
  }, []);

  const filteredUsers = userData.filter(user => {
    const matchesSearch =
      user.userDetailsResponse.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.userDetailsResponse.email?.toLowerCase().includes(searchText.toLowerCase());

    if (subscriptionFilter === null) return matchesSearch;

    const hasActiveSub = user.calendarStatusData.status === 'ACTIVE';
    return subscriptionFilter === 'premium' ? hasActiveSub && matchesSearch : !hasActiveSub && matchesSearch;
  });

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: record => (
        <Space>
          <img
            src={record.userDetailsResponse.profileImgUrl || 'https://i.imgur.com/ZdJSK3Y.jpeg'}
            alt={record.userDetailsResponse.name || 'User'}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <Space direction="vertical" size={0}>
            <Text strong>{record.userDetailsResponse.name}</Text>
            <Text type="secondary">{record.userDetailsResponse.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: ['userDetailsResponse', 'role'],
      key: 'role',
      render: role => (
        <Tag color={role === 'ADMIN' ? 'blue' : 'default'}>{role}</Tag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: record => {
        const status = record.calendarStatusData.status;
        return (
          <Tag color={status === 'COMPLETED' ? 'green' : 'default'}>
            {status}
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
    <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>
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
            placeholder="Filter by status"
            defaultValue="PENDING"
            allowClear
            onChange={fetchData()}
            options={[
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'PARTIAL', label: 'Partial' },
            ]}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey={record => record.userDetailsResponse.userId}
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
