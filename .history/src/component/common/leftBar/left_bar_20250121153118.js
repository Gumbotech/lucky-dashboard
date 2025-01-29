import React from 'react';
import { Layout, Menu, Avatar, Tag } from 'antd';
import { useNavigate } from '@remix-run/react';
import { useUserContext } from '~/core/context';
import { Utility } from '~/core/helpers/utility';
import { Theme } from '~/designSystem/theme/theme';

const { Sider } = Layout;

const LeftBar = ({ keySelected, items }) => {
  const router = useNavigate();
  const { user, checkRole } = useUserContext();

  return (
    <Sider
      width={250}
      style={{
        backgroundColor: Theme.components?.Layout?.sidebarBg,
        borderRight: Theme.components?.Layout?.sidebarBorderRight,
      }}
    >
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[keySelected]}
        style={{ height: '100%', borderRight: 0 }}
      />

      <div style={{ padding: '16px', textAlign: 'center' }}>
        {checkRole('ADMIN') && (
          <Tag color="red" bordered={false}>
            Admin
          </Tag>
        )}

        {user && (
          <Avatar
            src={user.pictureUrl}
            alt={user.name}
            size="large"
            onClick={() => router('/profile')}
            style={{ cursor: 'pointer', marginTop: '16px' }}
          >
            {Utility.stringToInitials(user.name)}
          </Avatar>
        )}
      </div>
    </Sider>
  );
};

export default LeftBar;
