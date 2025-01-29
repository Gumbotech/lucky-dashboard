import { Flex, Menu } from 'antd';
import { useDesignSystem } from '~/designSystem/provider';
import { Theme } from '~/designSystem/theme/theme';

export const Leftbar = ({ keySelected, items, itemsBottom }) => {
  const { isMobile } = useDesignSystem();

  if (isMobile || items.length === 0) {
    return null;
  }

  return (
    <Flex
      vertical
      justify="space-between"
      className="py-4"
      style={{
        width: '250px',
        backgroundColor: Theme.components?.Layout?.siderBg,
        borderRight: Theme.components?.Layout?.siderBorderRight,
      }}
    >
      <Menu
        mode="inline"
        inlineIndent={16}
        items={items}
        selectedKeys={[keySelected]}
        style={{ width: '100%' }}
      />
      {itemsBottom && (
        <Menu
          mode="inline"
          inlineIndent={16}
          items={itemsBottom}
          selectedKeys={[keySelected]}
          style={{ width: '100%' }}
        />
      )}
    </Flex>
  );
};