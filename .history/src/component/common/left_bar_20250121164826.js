import { Menu } from 'antd';

export const Leftbar = ({ keySelected, items, itemsBottom }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e8e8e8', padding: '16px' }}>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[keySelected]}    
        style={{ width: '100%', border: 'none' }}
      />
      {itemsBottom && (
        <Menu
          mode="inline"
          items={itemsBottom}
          selectedKeys={[keySelected]}
          style={{ width: '100%', border: 'none' }}
        />
      )}
    </div>
  );
};