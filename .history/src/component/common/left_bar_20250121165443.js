import React from 'react';
import { Menu } from 'antd';

export const Leftbar = ({ keySelected, items, itemsBottom, onItemClick }) => {
  if (items.length === 0) {
    return null;
  }

  const renderItems = (menuItems) => {
    return menuItems.map((item) => (
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
        onClick={({ key }) => onItemClick(key)} // Trigger onItemClick when a menu item is clicked
        style={{ width: '100%', border: 'none' }}
      >
        {renderItems(items)}
      </Menu>

      {itemsBottom && (
        <Menu
          mode="inline"
          selectedKeys={[keySelected]}
          onClick={({ key }) => onItemClick(key)} // Handle bottom menu clicks as well
          style={{ width: '100%', border: 'none' }}
        >
          {renderItems(itemsBottom)}
        </Menu>
      )}
    </div>
  );
};
