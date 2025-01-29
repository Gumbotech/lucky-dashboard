import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar, Flex, Menu, Tag } from 'antd';
import { useUserContext } from '~/core/context';
import { Utility } from '~/core/helpers/utility';
import { useDesignSystem } from '~/designSystem/provider';
import { Theme } from '~/designSystem/theme/theme';

export const Topbar = ({ keySelected, items }) => {
  const router = useNavigate();
  const { user, checkRole } = useUserContext();
  const { isMobile } = useDesignSystem();

  if (isMobile) {
    return null;
  }

  return (
    <Flex
      align="center"
      className="px-4 py-2"
      style={{
        backgroundColor: Theme.components?.Layout?.headerBg,
        borderBottom: Theme.components?.Layout?.headerBorderBottom,
      }}
    >
      <Flex>
        <Logo height={40} />
      </Flex>

      <Flex vertical flex={1} style={{ overflowX: 'hidden' }}>
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[keySelected]}
          overflowedIndicator={<MenuOutlined />}
          style={{ flex: 1 }}
        />
      </Flex>

      <Flex align="center" gap="middle">
        {checkRole('ADMIN') && (
          <Tag color="red" bordered={false}>
            Admin
          </Tag>
        )}
        {user && (
          <Avatar
            src={user.pictureUrl}
            alt={user.name}
            size="default"
            onClick={() => router('/profile')}
            style={{ cursor: 'pointer' }}
          >
            {Utility.stringToInitials(user.name)}
          </Avatar>
        )}
      </Flex>
    </Flex>
  );
};