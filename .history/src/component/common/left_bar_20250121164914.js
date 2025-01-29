import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

export const Leftbar = ({ keySelected, items, itemsBottom }) => {
  if (items.length === 0) {
    return null;
  }

  const renderItems = (menuItems) => {
    return menuItems.map(item => (
      <Menu.Item key={item.key} icon={item.icon}>
        {item.label}
      </Menu.Item>
    ));
  };

  return (
    <div style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e8e8e8', padding: '16px' }}>
      <Menu
        mode="inline"
        selectedKeys={[keySelected]}
        style={{ width: '100%', border: 'none' }}
      >
        {renderItems(items)}
      </Menu>

      {itemsBottom && (
        <Menu
          mode="inline"
          selectedKeys={[keySelected]}
          style={{ width: '100%', border: 'none' }}
        >
          {renderItems(itemsBottom)}
        </Menu>
      )}
    </div>
  );
};

// Example usage:
const items = [
  { key: 'userList', label: 'User List', icon: <UserOutlined /> },
  { key: 'userDetails', label: 'User Details', icon: <HomeOutlined /> },
];

const itemsBottom = [
  { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
];

// You can pass these items into the `Leftbar` as props when using it.
