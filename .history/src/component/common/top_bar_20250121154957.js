import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu } from 'antd';

export const Topbar = ({ keySelected, items, user }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#f0f2f5', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ marginRight: 'auto' }}>
        <h2 style={{ margin: 0 }}>Logo</h2>
      </div>

      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={[keySelected]}
        overflowedIndicator={<MenuOutlined />}
        style={{ flex: 1, borderBottom: 'none' }}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user && (
          <Avatar
            src={user.pictureUrl}
            alt={user.name}
            size="default"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            {user.name ? user.name.charAt(0) : 'U'} {/* Initials or placeholder */}
          </Avatar>
        )}
      </div>
    </div>
  );
};